#!/usr/bin/env python3
"""
Generate social campaign packs from existing Islamic Economics site content.

The script discovers current blog articles and podcast episodes, creates
channel-specific assets for X, LinkedIn, Instagram, and short-form video, and
optionally queues X/LinkedIn/Instagram posts to Buffer when credentials are
available.
"""

import argparse
import hashlib
import json
import logging
import os
import random
import re
import sys
from dataclasses import asdict, dataclass, field
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

try:
    import feedparser
    import requests
    from lxml import html as lxml_html
except ImportError as exc:
    print(
        "Error: Missing required package. Install scripts/requirements.txt first.\n"
        f"Details: {exc}"
    )
    sys.exit(1)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


BASE_URL = "https://islamiceconomics.github.io"
DEFAULT_IMAGE_URL = f"{BASE_URL}/images/islamiceconomy.jpeg"
PODCAST_COVER_URL = f"{BASE_URL}/podcast/cover-art-series1.jpg"
BUFFER_GRAPHQL_ENDPOINT = "https://api.buffer.com"
DEFAULT_RECYCLE_AFTER_DAYS = 45
X_POST_LIMIT = 250
X_THREAD_LIMIT = 260
LINKEDIN_POST_LIMIT = 1400
INSTAGRAM_CAPTION_LIMIT = 1800
UPSCROLLED_POST_LIMIT = 450
SHORT_VIDEO_CAPTION_LIMIT = 1000
SHORT_VIDEO_WORD_LIMIT = 110
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-5-mini")
OPENAI_MAX_OUTPUT_TOKENS = 2200
OPENAI_REASONING_EFFORT = os.environ.get("OPENAI_REASONING_EFFORT", "low")

# ---------------------------------------------------------------------------
# X voice patterns — weighted selection for natural variety
# ---------------------------------------------------------------------------
BUFFER_SCHEDULE_DELAY_MINUTES = max(1, int(os.environ.get("BUFFER_SCHEDULE_DELAY_MINUTES", "5")))

# Stagger posts across the day instead of dumping them all at once.
# The workflow runs at 14:00 UTC. We spread posts across a window so they
# appear at natural-looking intervals (morning, midday, afternoon, evening).
# Each call to next_staggered_due_at() returns the next slot.
_STAGGER_SLOTS_UTC_HOURS = [9, 12, 15, 18, 20, 22]  # 6 slots for up to 6 posts
_stagger_index = 0

# ---------------------------------------------------------------------------
# X voice patterns — weighted selection for natural variety
# ---------------------------------------------------------------------------
X_VOICE_PATTERNS: List[Dict[str, Any]] = [
    {
        "name": "observation",
        "weight": 30,
        "include_link": False,
        "instruction": (
            "Take one fact or idea from the source and state what it reveals about "
            "a larger truth. Use reframing: show what something actually is versus "
            "what people assume it is. 1-2 sentences. End with a period."
        ),
    },
    {
        "name": "question",
        "weight": 15,
        "include_link": False,
        "instruction": (
            "State a fact or situation from the content, then ask one genuine question "
            "it raised. The question should feel like thinking out loud. Not rhetorical. "
            "Not engagement bait. Something you would actually sit with."
        ),
    },
    {
        "name": "historical_fact",
        "weight": 20,
        "include_link": False,
        "instruction": (
            "State one surprising historical detail or number from the source. "
            "Just the fact, plainly. Let it sit. If the number is dramatic, "
            "repeat it once for weight. Nothing else needed. End with a period."
        ),
    },
    {
        "name": "reframing",
        "weight": 15,
        "include_link": False,
        "instruction": (
            "Take a common assumption about the topic and reveal what is actually true. "
            "Structure: 'Most people think X is about Y. It is actually about Z.' "
            "Or: 'The purpose of X isn't Y, it's Z.' "
            "Calm and direct. State it as something you arrived at, not as an argument."
        ),
    },
    {
        "name": "connection",
        "weight": 10,
        "include_link": False,
        "instruction": (
            "Connect the topic to something from a different field or time period. "
            "State both things plainly and let the reader see the parallel. "
            "Do not explain the connection. Trust the reader. End with a period."
        ),
    },
    {
        "name": "content_share",
        "weight": 10,
        "include_link": True,
        "instruction": (
            "This post will include a link (appended automatically — do not write the URL). "
            "State the most interesting thing you found in the content, as if telling "
            "someone what you spent time reading about. One or two sentences. "
            "No promotional language. No 'new article', 'check out', 'read here'."
        ),
    },
]


def pick_x_voice_pattern(item_id: str, state: Dict[str, Any]) -> Dict[str, Any]:
    """Pick a voice pattern using weighted random selection, avoiding recent repeats."""
    recent_patterns: List[str] = []
    for item_data in (state.get("items") or {}).values():
        for entry in (item_data.get("history") or []):
            pattern_name = entry.get("x_voice_pattern", "")
            if pattern_name:
                recent_patterns.append(pattern_name)
    recent_patterns = recent_patterns[-4:]

    pool: List[Dict[str, Any]] = []
    for pattern in X_VOICE_PATTERNS:
        weight = pattern["weight"]
        if pattern["name"] in recent_patterns:
            weight = max(1, weight // 3)
        pool.extend([pattern] * weight)

    seed = hashlib.md5(f"{item_id}-{datetime.now(timezone.utc).date()}".encode()).hexdigest()
    rng = random.Random(seed)
    return rng.choice(pool)


@dataclass
class ContentItem:
    content_id: str
    kind: str
    title: str
    summary: str
    url: str
    published_at: str
    author: str = ""
    category: str = ""
    tags: List[str] = field(default_factory=list)
    body_text: str = ""
    asset_url: str = DEFAULT_IMAGE_URL
    local_asset_path: str = ""
    local_path: str = ""
    local_video_path: str = ""


def get_project_root() -> Path:
    return Path(__file__).resolve().parent.parent


def normalize_whitespace(value: str) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def slugify(value: str) -> str:
    value = normalize_whitespace(value).lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-{2,}", "-", value)
    return value.strip("-") or "item"


def strip_html(value: str) -> str:
    value = value or ""
    value = re.sub(r"<[^>]+>", " ", value)
    return normalize_whitespace(value)


def truncate_text(value: str, max_chars: int) -> str:
    value = normalize_whitespace(value)
    if len(value) <= max_chars:
        return value
    cutoff = max(0, max_chars - 1)
    truncated = value[:cutoff].rsplit(" ", 1)[0]
    return (truncated or value[:cutoff]).rstrip(" ,;:-") + "…"


def truncate_words(value: str, max_words: int) -> str:
    words = normalize_whitespace(value).split()
    if len(words) <= max_words:
        return " ".join(words)
    return " ".join(words[:max_words]).rstrip(" ,;:-") + "…"


def truncate_text_preserve_paragraphs(value: str, max_chars: int) -> str:
    paragraphs = [normalize_whitespace(part) for part in re.split(r"\n\s*\n", value or "")]
    paragraphs = [part for part in paragraphs if part]
    normalized = "\n\n".join(paragraphs).strip()
    if len(normalized) <= max_chars:
        return normalized

    cutoff = max(0, max_chars - 1)
    truncated = normalized[:cutoff].rsplit(" ", 1)[0]
    return (truncated or normalized[:cutoff]).rstrip(" ,;:-") + "…"


def combine_with_tail(head: str, tail: str, limit: int) -> str:
    head = normalize_whitespace(head)
    tail = normalize_whitespace(tail)

    if not tail:
        return truncate_text(head, limit)
    if len(head) + 1 + len(tail) <= limit:
        return f"{head} {tail}"

    available = max(0, limit - len(tail) - 1)
    return f"{truncate_text(head, available)} {tail}"


def split_sentences(value: str) -> List[str]:
    sentences = re.split(r"(?<=[.!?])\s+", normalize_whitespace(value))
    cleaned = [normalize_whitespace(sentence) for sentence in sentences]
    return [sentence for sentence in cleaned if len(sentence) >= 24]


def first_sentence(value: str) -> str:
    sentences = split_sentences(value)
    return sentences[0] if sentences else normalize_whitespace(value)


def parse_datetime(value: str) -> Optional[datetime]:
    raw = normalize_whitespace(value)
    if not raw:
        return None

    iso_candidate = raw.replace("Z", "+00:00")
    try:
        dt = datetime.fromisoformat(iso_candidate)
        return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except ValueError:
        pass

    for fmt in ("%B %d, %Y", "%b %d, %Y", "%Y-%m-%d", "%Y/%m/%d"):
        try:
            dt = datetime.strptime(raw, fmt)
            return dt.replace(tzinfo=timezone.utc)
        except ValueError:
            continue

    try:
        dt = parsedate_to_datetime(raw)
        return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except (TypeError, ValueError):
        return None


def normalize_date(value: str, fallback: str = "") -> str:
    dt = parse_datetime(value)
    if dt:
        return dt.astimezone(timezone.utc).isoformat()

    match = re.match(r"^(\d{4}-\d{2}-\d{2})", fallback or "")
    if match:
        return f"{match.group(1)}T00:00:00+00:00"

    return datetime.now(timezone.utc).isoformat()


def sort_key_for_item(item: ContentItem) -> datetime:
    return parse_datetime(item.published_at) or datetime(1970, 1, 1, tzinfo=timezone.utc)


def ensure_json_file(path: Path, default_data: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text(json.dumps(default_data, indent=2), encoding="utf-8")


def resolve_local_asset_path(project_root: Path, asset_url: str) -> str:
    asset_url = normalize_whitespace(asset_url)
    if not asset_url.startswith(BASE_URL):
        return ""

    relative = asset_url.removeprefix(BASE_URL).lstrip("/")
    candidate = project_root / "Website" / relative
    return str(candidate.resolve()) if candidate.exists() else ""


def load_state(path: Path) -> Dict[str, Any]:
    ensure_json_file(path, {"items": {}})
    return json.loads(path.read_text(encoding="utf-8"))


def save_state(path: Path, state: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state, indent=2, sort_keys=True), encoding="utf-8")


def xpath_first(tree: Any, expression: str) -> str:
    values = tree.xpath(expression)
    if not values:
        return ""
    first = values[0]
    if isinstance(first, str):
        return normalize_whitespace(first)
    return normalize_whitespace(" ".join(first.itertext()))


def iter_ld_json(raw_text: str) -> Iterable[Dict[str, Any]]:
    raw_text = (raw_text or "").strip()
    if not raw_text:
        return []
    try:
        payload = json.loads(raw_text)
    except json.JSONDecodeError:
        return []

    if isinstance(payload, dict):
        return [payload]
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    return []


def parse_blog_article(path: Path) -> ContentItem:
    document = lxml_html.fromstring(path.read_text(encoding="utf-8"))
    meta_map: Dict[str, str] = {}

    for node in document.xpath("//meta[@content]"):
        key = node.get("property") or node.get("name")
        if key:
            meta_map[key] = node.get("content", "")

    title = (
        xpath_first(document, "//article//h1[1]")
        or xpath_first(document, "//h1[1]")
        or meta_map.get("og:title")
        or meta_map.get("twitter:title")
        or path.stem.replace("-", " ").title()
    )
    summary = (
        meta_map.get("description")
        or meta_map.get("og:description")
        or xpath_first(document, "//article//p[1]")
    )
    canonical = xpath_first(document, "//link[@rel='canonical']/@href") or f"{BASE_URL}/blog/{path.name}"
    author = meta_map.get("author") or xpath_first(document, "//span[contains(@class, 'meta-author')]")
    category = xpath_first(document, "//span[contains(@class, 'meta-category')]//a[1]")

    date_value = ""
    for raw_script in document.xpath("//script[@type='application/ld+json']/text()"):
        for payload in iter_ld_json(raw_script):
            if payload.get("datePublished"):
                date_value = payload["datePublished"]
                break
        if date_value:
            break

    if not date_value:
        date_value = xpath_first(document, "//span[contains(@class, 'meta-date')]")

    keywords = meta_map.get("keywords", "")
    tags = [normalize_whitespace(tag) for tag in keywords.split(",") if normalize_whitespace(tag)]

    if not tags:
        tags = [
            normalize_whitespace(" ".join(anchor.itertext()))
            for anchor in document.xpath("//div[contains(@class, 'article-tags')]//a")
            if normalize_whitespace(" ".join(anchor.itertext()))
        ]

    paragraphs = [
        normalize_whitespace(" ".join(node.itertext()))
        for node in document.xpath("//section[contains(@class, 'article-body')]//p")
    ]
    body_text = " ".join([paragraph for paragraph in paragraphs if paragraph][:8])

    asset_url = meta_map.get("og:image") or DEFAULT_IMAGE_URL

    return ContentItem(
        content_id=f"blog-{path.stem}",
        kind="blog",
        title=title,
        summary=summary,
        url=canonical,
        published_at=normalize_date(date_value, fallback=path.stem),
        author=author,
        category=category,
        tags=tags[:8],
        body_text=truncate_text(body_text, 2400),
        asset_url=asset_url,
        local_asset_path=resolve_local_asset_path(get_project_root(), asset_url)
        or str((get_project_root() / "Website" / "images" / "islamiceconomy.jpeg").resolve()),
        local_path=str(path.resolve()),
    )


def discover_blog_items(project_root: Path) -> List[ContentItem]:
    blog_dir = project_root / "Website" / "blog"
    items = [
        parse_blog_article(path)
        for path in sorted(blog_dir.glob("*.html"))
        if not path.name.startswith(".")
    ]
    return sorted(items, key=sort_key_for_item, reverse=True)


def detect_episode_number(entry: Any) -> Optional[int]:
    if getattr(entry, "itunes_episode", None):
        try:
            return int(str(entry.itunes_episode).strip())
        except ValueError:
            return None

    title = str(entry.get("title", ""))
    match = re.match(r"^\s*(\d+)\.", title)
    if match:
        return int(match.group(1))
    return None


def resolve_podcast_asset_paths(project_root: Path, episode_number: Optional[int]) -> Tuple[str, str]:
    if episode_number:
        thumb_path = project_root / "Website" / "images" / f"yt-thumb-ep{episode_number:02d}.png"
        if thumb_path.exists():
            return f"{BASE_URL}/images/{thumb_path.name}", str(thumb_path.resolve())

    cover_path = project_root / "Website" / "podcast" / "cover-art-series1.jpg"
    return PODCAST_COVER_URL, str(cover_path.resolve())


def resolve_podcast_video_path(project_root: Path, episode_number: Optional[int]) -> str:
    if not episode_number:
        return ""

    episode_glob = f"EP{episode_number:02d}-*.mp4"
    matches = sorted((project_root / "Website" / "podcast" / "youtube").glob(episode_glob))
    if not matches:
        return ""
    return str(matches[0].resolve())


def discover_podcast_items(project_root: Path) -> List[ContentItem]:
    feed_path = project_root / "Website" / "podcast" / "feed.xml"
    feed = feedparser.parse(str(feed_path))

    items: List[ContentItem] = []
    for entry in feed.entries:
        episode_number = detect_episode_number(entry)
        title = normalize_whitespace(entry.get("itunes_title") or strip_html(entry.get("title", "")))
        description = strip_html(entry.get("description", ""))
        subtitle = strip_html(entry.get("itunes_subtitle", ""))
        summary = subtitle or first_sentence(description)

        body_text = description
        if entry.get("content"):
            body_text = strip_html(entry["content"][0].get("value", "")) or description

        keywords = [
            normalize_whitespace(keyword)
            for keyword in str(entry.get("itunes_keywords", "")).split(",")
            if normalize_whitespace(keyword)
        ]
        asset_url, local_asset_path = resolve_podcast_asset_paths(project_root, episode_number)

        episode_anchor = f"#ep-{episode_number}" if episode_number else ""
        entry_url = f"{BASE_URL}/podcast.html{episode_anchor}"

        items.append(
            ContentItem(
                content_id=f"podcast-{entry.get('guid') or slugify(title)}",
                kind="podcast",
                title=title,
                summary=summary,
                url=entry_url,
                published_at=normalize_date(entry.get("published", "")),
                author="Islamic Economics",
                category="Podcast",
                tags=keywords[:8],
                body_text=truncate_text(body_text, 2200),
                asset_url=asset_url,
                local_asset_path=local_asset_path,
                local_path=str(feed_path.resolve()),
                local_video_path=resolve_podcast_video_path(project_root, episode_number),
            )
        )

    return sorted(items, key=sort_key_for_item, reverse=True)


def discover_items(project_root: Path, source: str) -> List[ContentItem]:
    if source == "blog":
        return discover_blog_items(project_root)
    if source == "podcast":
        return discover_podcast_items(project_root)

    combined = discover_blog_items(project_root) + discover_podcast_items(project_root)
    return sorted(combined, key=sort_key_for_item, reverse=True)


def choose_items(
    items: List[ContentItem],
    state: Dict[str, Any],
    limit: int,
    recycle_after_days: int,
    force: bool,
    content_id: str,
) -> List[ContentItem]:
    if content_id:
        selected = [item for item in items if item.content_id == content_id]
        if not selected:
            raise SystemExit(f"Content id not found: {content_id}")
        return selected[:limit]

    if force:
        return items[:limit]

    now = datetime.now(timezone.utc)
    unpublished: List[ContentItem] = []
    recyclable: List[Tuple[datetime, ContentItem]] = []

    for item in items:
        history = state.get("items", {}).get(item.content_id, {}).get("history", [])
        if not history:
            unpublished.append(item)
            continue

        if recycle_after_days < 0:
            continue

        last_generated = parse_datetime(history[-1].get("generated_at", ""))
        if not last_generated:
            unpublished.append(item)
            continue

        if last_generated <= now - timedelta(days=recycle_after_days):
            recyclable.append((last_generated, item))

    recyclable.sort(key=lambda pair: pair[0])
    selected = unpublished + [item for _, item in recyclable]
    return selected[:limit]


def candidate_hashtags(item: ContentItem) -> List[str]:
    base = ["#IslamicEconomics"]
    if item.kind == "podcast":
        base.append("#IslamicHistory")
    else:
        base.append("#IslamicFinance")

    for tag in item.tags:
        tokens = re.findall(r"[A-Za-z0-9]+", tag)
        if not tokens:
            continue
        hashtag = "#" + "".join(token.capitalize() for token in tokens[:3])
        if hashtag not in base:
            base.append(hashtag)
        if len(base) >= 5:
            break

    return base[:5]


def supporting_points(item: ContentItem, count: int = 3) -> List[str]:
    candidates = split_sentences(f"{item.summary} {item.body_text}")
    points: List[str] = []
    seen = set()

    for sentence in candidates:
        normalized = sentence.lower()
        if normalized in seen:
            continue
        seen.add(normalized)
        points.append(truncate_text(sentence, 125))
        if len(points) >= count:
            break

    if len(points) < count and item.tags:
        for tag in item.tags:
            point = f"Key theme: {tag}."
            if point.lower() not in seen:
                points.append(point)
                seen.add(point.lower())
            if len(points) >= count:
                break

    if len(points) < count:
        points.append(
            "The piece connects Islamic economic principles to practical institutions, incentives, and public outcomes."
        )

    return points[:count]


def source_cta(item: ContentItem, style: str = "title") -> str:
    if item.kind == "podcast":
        return "Listen" if style == "title" else "listen"
    return "Read" if style == "title" else "read"


def strip_urls(text: str) -> str:
    return normalize_whitespace(re.sub(r"https?://\S+", " ", text or ""))


def strip_hashtags(text: str) -> str:
    return normalize_whitespace(re.sub(r"(^|\s)#[A-Za-z0-9_]+", " ", text or ""))


def strip_dangling_source_prompt(text: str) -> str:
    text = normalize_whitespace(text)
    patterns = [
        r"(?:read|listen)(?:/listen)?(?:\s+the\s+(?:full\s+)?(?:piece|post|argument|analysis|article|thread|episode))?[.:…!?\-]*$",
        r"(?:read|listen)(?:\s+more)?[.:…!?\-]*$",
        r"(?:at\s+the\s+source|here)[.:…!?\-]*$",
    ]
    for pattern in patterns:
        text = re.sub(pattern, "", text, flags=re.IGNORECASE).strip()
    return text.rstrip(" ,;:-")


def ensure_post_has_source_url(text: str, item: ContentItem, limit: int) -> str:
    text = normalize_whitespace(text)
    if item.url in text:
        return truncate_text(text, limit)

    tail = f"{source_cta(item, style='title')}: {item.url}"
    cleaned = strip_dangling_source_prompt(text)
    return combine_with_tail(cleaned or item.title, tail, limit)


def ensure_thread_has_source_url(posts: List[str], item: ContentItem) -> List[str]:
    sanitized = posts[:4]
    if not sanitized:
        return sanitized
    sanitized[-1] = ensure_post_has_source_url(sanitized[-1], item, X_THREAD_LIMIT)
    return sanitized


def strip_ai_isms(text: str) -> str:
    """Remove common AI-sounding openers and filler phrases."""
    patterns = [
        r"^(new\s+(article|post|episode)\s*:?\s*)",
        r"^(check\s+out\s*:?\s*)",
        r"^(we\s+(just\s+)?published\s*:?\s*)",
        r"^(just\s+dropped\s*:?\s*)",
        r"^(we\s+examine\s+)",
        r"^(this\s+piece\s+)",
        r"^(here'?s\s+(the\s+thing|why)\s*:?\s*)",
        r"^(let'?s\s+talk\s+about\s*:?\s*)",
        r"^(unpopular\s+opinion\s*:?\s*)",
        r"^(hot\s+take\s*:?\s*)",
        r"^(did\s+you\s+know\s*[?:]\s*)",
        r"^(genuine\s+question\s*:?\s*[—–-]?\s*)",
        r"^(spoiler\s+alert\s*:?\s*)",
        r"^(buckle\s+up\s*[.:,]?\s*)",
        r"^(it\s+turns\s+out\s*[,:]\s*)",
        r"^(okay\s+)?so\s+",
        r"^(thread\s*:?\s*)",
    ]
    result = text
    for pattern in patterns:
        result = re.sub(pattern, "", result, flags=re.IGNORECASE).strip()
    # Strip emoji
    result = re.sub(
        r"[\U0001F300-\U0001F9FF\U00002600-\U000027BF\U0001FA00-\U0001FA6F\U0001FA70-\U0001FAFF]",
        "",
        result,
    ).strip()
    return result


def sanitize_x_single_post(text: str, fallback: str, item: ContentItem) -> str:
    candidate = strip_hashtags(strip_urls(text))
    candidate = strip_dangling_source_prompt(candidate)
    candidate = strip_ai_isms(candidate)
    candidate = candidate.rstrip(" ,;:-")
    if len(candidate) < 30:
        candidate = strip_ai_isms(strip_dangling_source_prompt(strip_hashtags(strip_urls(fallback))))
    return truncate_text(candidate, X_POST_LIMIT)


def build_fallback_channels(item: ContentItem, voice_pattern: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    points = supporting_points(item, count=3)
    hashtags = candidate_hashtags(item)
    cta_title = source_cta(item, style="title")
    cta_lower = source_cta(item, style="lower")

    pattern_name = (voice_pattern or {}).get("name", "observation")

    # Build X single post based on voice pattern
    fact = first_sentence(item.summary)
    if pattern_name == "question":
        x_single = truncate_text(
            f"{fact} Why isn't this discussed more?",
            X_POST_LIMIT,
        )
    elif pattern_name == "historical_fact":
        x_single = truncate_text(fact, X_POST_LIMIT)
    elif pattern_name == "reframing":
        x_single = truncate_text(
            f"{fact} The conventional framing misses the point.",
            X_POST_LIMIT,
        )
    elif pattern_name == "connection":
        x_single = truncate_text(
            f"{fact} The parallels to today are hard to ignore.",
            X_POST_LIMIT,
        )
    elif pattern_name == "content_share":
        x_single = truncate_text(
            f"Spent some time on this. {fact}",
            X_POST_LIMIT,
        )
    else:  # observation (default)
        x_single = truncate_text(fact, X_POST_LIMIT)

    x_thread = [
        truncate_text(f"{item.title} — a thread:", X_THREAD_LIMIT),
        truncate_text(points[0], X_THREAD_LIMIT),
        truncate_text(points[1], X_THREAD_LIMIT),
        combine_with_tail(
            f"Why it matters: {points[2]} {cta_title} here:",
            item.url,
            X_THREAD_LIMIT,
        ),
    ]

    linkedin_lines = [
        item.title,
        "",
        truncate_text(item.summary, 320),
        "",
        "Three takeaways:",
        f"• {points[0]}",
        f"• {points[1]}",
        f"• {points[2]}",
        "",
        f"{cta_title} at the source: {item.url}",
    ]
    linkedin_post = combine_with_tail("\n".join(linkedin_lines[:-1]), linkedin_lines[-1], LINKEDIN_POST_LIMIT)

    cover_text = truncate_words(item.title, 6)
    slide_candidates = [
        cover_text,
        truncate_words(points[0], 14),
        truncate_words(points[1], 14),
        truncate_words(points[2], 14),
        "Read more at IslamicEconomics.org",
    ]
    instagram_caption = combine_with_tail(
        (
            f"{item.title}\n\n"
            f"{truncate_text(item.summary, 400)}\n\n"
            f"Swipe through for the core ideas, then go deeper and {cta_lower} here:"
        ),
        f"{item.url} {' '.join(hashtags)}",
        INSTAGRAM_CAPTION_LIMIT,
    )
    topic_source = item.category or (item.tags[0] if item.tags else "Islamic economics")
    topic_suggestion = truncate_words(topic_source, 4)
    reflective_point = points[1] if len(points) > 1 else points[0]
    upscrolled_post = truncate_text_preserve_paragraphs(
        (
            f"{item.title}\n\n"
            f"{truncate_text(first_sentence(item.summary), 180)}\n\n"
            f"What I keep coming back to is this: {truncate_text(reflective_point, 130)}"
        ),
        UPSCROLLED_POST_LIMIT,
    )
    upscrolled_prompt = truncate_text(
        f"How would you apply this idea in a modern economic institution or community setting?",
        120,
    )

    short_video_voiceover = truncate_words(
        (
            f"{item.title}. {first_sentence(item.summary)} "
            f"Here are the key points: {points[0]} {points[1]} {points[2]} "
            f"{cta_title} in full at IslamicEconomics.org."
        ),
        SHORT_VIDEO_WORD_LIMIT,
    )
    short_video_shots = [
        {
            "time": "0-5s",
            "visual": "Bold title card with the episode/article headline.",
            "on_screen_text": truncate_words(item.title, 8),
        },
        {
            "time": "5-12s",
            "visual": "Introduce the main context with archival footage, charts, or a document pull quote.",
            "on_screen_text": truncate_words(points[0], 10),
        },
        {
            "time": "12-22s",
            "visual": "Show the second point with a motion graphic or a close-up of the relevant source material.",
            "on_screen_text": truncate_words(points[1], 10),
        },
        {
            "time": "22-34s",
            "visual": "Highlight why it matters now with contemporary economic visuals.",
            "on_screen_text": truncate_words(points[2], 10),
        },
        {
            "time": "34-45s",
            "visual": "End card with brand, URL, and call to follow for more Islamic economics content.",
            "on_screen_text": "Read more at IslamicEconomics.org",
        },
    ]

    return {
        "x": {
            "single_post": x_single,
            "thread": x_thread,
            "hashtags": hashtags[:3],
        },
        "linkedin": {
            "post": linkedin_post,
            "comment_prompt": truncate_text(
                "Which Islamic economics topic should the next explainer or thread cover?",
                120,
            ),
        },
        "instagram": {
            "caption": instagram_caption,
            "carousel_slides": slide_candidates,
            "reel_caption": combine_with_tail(
                f"{item.title} in under 45 seconds. Full source:",
                f"{item.url} {' '.join(hashtags)}",
                INSTAGRAM_CAPTION_LIMIT,
            ),
            "cover_text": cover_text,
        },
        "upscrolled": {
            "post": upscrolled_post,
            "discussion_prompt": upscrolled_prompt,
            "topic_suggestion": topic_suggestion,
        },
        "short_video": {
            "title": truncate_text(f"{item.title} in 45 seconds", 90),
            "hook": truncate_text(first_sentence(item.summary), 120),
            "voiceover": short_video_voiceover,
            "shot_list": short_video_shots,
            "caption": combine_with_tail(
                f"{item.title}. {cta_title} at the source:",
                f"{item.url} {' '.join(hashtags)}",
                SHORT_VIDEO_CAPTION_LIMIT,
            ),
            "hashtags": hashtags,
        },
    }


def extract_json_object(raw_text: str) -> Optional[Dict[str, Any]]:
    if not raw_text:
        return None

    decoder = json.JSONDecoder()
    for index, char in enumerate(raw_text):
        if char != "{":
            continue
        try:
            payload, _ = decoder.raw_decode(raw_text[index:])
        except json.JSONDecodeError:
            continue
        if isinstance(payload, dict):
            return payload
    return None


def social_campaign_schema() -> Dict[str, Any]:
    return {
        "name": "social_campaign",
        "schema": {
            "type": "object",
            "additionalProperties": False,
            "properties": {
                "x": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "single_post": {"type": "string"},
                        "thread": {
                            "type": "array",
                            "items": {"type": "string"},
                            "minItems": 4,
                            "maxItems": 4,
                        },
                        "hashtags": {
                            "type": "array",
                            "items": {"type": "string"},
                            "minItems": 1,
                            "maxItems": 5,
                        },
                    },
                    "required": ["single_post", "thread", "hashtags"],
                },
                "linkedin": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "post": {"type": "string"},
                        "comment_prompt": {"type": "string"},
                    },
                    "required": ["post", "comment_prompt"],
                },
                "instagram": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "caption": {"type": "string"},
                        "carousel_slides": {
                            "type": "array",
                            "items": {"type": "string"},
                            "minItems": 5,
                            "maxItems": 5,
                        },
                        "reel_caption": {"type": "string"},
                        "cover_text": {"type": "string"},
                    },
                    "required": ["caption", "carousel_slides", "reel_caption", "cover_text"],
                },
                "upscrolled": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "post": {"type": "string"},
                        "discussion_prompt": {"type": "string"},
                        "topic_suggestion": {"type": "string"},
                    },
                    "required": ["post", "discussion_prompt", "topic_suggestion"],
                },
                "short_video": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "title": {"type": "string"},
                        "hook": {"type": "string"},
                        "voiceover": {"type": "string"},
                        "shot_list": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "additionalProperties": False,
                                "properties": {
                                    "time": {"type": "string"},
                                    "visual": {"type": "string"},
                                    "on_screen_text": {"type": "string"},
                                },
                                "required": ["time", "visual", "on_screen_text"],
                            },
                            "minItems": 4,
                            "maxItems": 5,
                        },
                        "caption": {"type": "string"},
                        "hashtags": {
                            "type": "array",
                            "items": {"type": "string"},
                            "minItems": 1,
                            "maxItems": 5,
                        },
                    },
                    "required": ["title", "hook", "voiceover", "shot_list", "caption", "hashtags"],
                },
            },
            "required": ["x", "linkedin", "instagram", "upscrolled", "short_video"],
        },
        "strict": True,
    }


def generate_channels_with_openai(item: ContentItem, voice_pattern: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or OpenAI is None:
        return None

    pattern = voice_pattern or X_VOICE_PATTERNS[0]
    pattern_name = pattern["name"]
    pattern_instruction = pattern["instruction"]

    prompt_item = {
        "kind": item.kind,
        "title": item.title,
        "summary": item.summary,
        "url": item.url,
        "published_at": item.published_at,
        "author": item.author,
        "category": item.category,
        "tags": item.tags,
        "body_excerpt": item.body_text,
        "asset_url": item.asset_url,
        "local_video_available": bool(item.local_video_path),
    }

    system_prompt = (
        "You write X posts for someone who thinks deeply about Islamic economics. "
        "The voice is calm, wise, and slightly melancholic — like someone writing in a journal "
        "that happens to be public. "
        "State things as quiet truths you have observed, not as opinions or arguments. "
        "Use 'you' naturally when addressing the reader. "
        "Use reframing: take something familiar and reveal what it actually is. "
        "Use parallel structure when it fits: 'X is Y. Z is A.' "
        "No hedging. No 'I think' or 'perhaps' or 'arguably'. Just state it. "
        "1-3 sentences. Complete thoughts. Standalone posts end with a period. "
        "Use only the supplied facts. Do not invent scripture references, numbers, or historical claims. "
        "Never use emoji, hashtags, or semicolons. "
        "Never start with 'So', 'Here's the thing', 'Let's talk about', 'Unpopular opinion', "
        "'Hot take', 'Thread', 'Did you know', 'TIL', 'Buckle up', or 'It turns out'. "
        "The post should read like a truth someone arrived at after years of studying, "
        "stated simply enough that anyone can understand it."
    )
    user_prompt = f"""
Create a cross-platform campaign for the content item below.

=== X SINGLE POST (most important — get this right) ===
Voice pattern for this post: **{pattern_name}**
{pattern_instruction}

Critical X rules:
- X single post must be <= 250 characters.
- Do NOT summarize the article. Do NOT write a headline. Do NOT write a teaser.
- The post should read like a personal thought or conclusion, not a content preview.
- Write short declarative sentences. State things plainly. Let the reader draw implications.
- Do NOT use these phrases: "new article", "new episode", "check out", "read here",
  "read the full argument", "link below", "read more", "we examine", "this piece",
  "here's why", "here's the thing", "let's talk about", "a thread", "unpopular opinion",
  "hot take", "did you know", "spoiler alert", "buckle up", "it turns out".
- Do NOT start with "So", "Okay so", "I think", "In my opinion", or "Honestly".
- Do NOT include the raw URL in the X single post.
- Do NOT use hashtags or emoji in the X single post.
- No corporate "we". First person is fine but use it sparingly.
- If the content is about conflict or hardship, stay measured and factual.
- Standalone single posts always end with a period. Not a colon, not an ellipsis, not a dash.

=== X THREAD ===
- 4 posts, each <= 260 characters.
- Build a quiet argument or tell a short story across the posts.
- First post states the most interesting thing. No "Thread:" label.
- Each post should make sense on its own.
- Last post may include the source URL.

=== OTHER CHANNELS ===
- LinkedIn post must be <= 1400 characters. Professional but not dry. Include source URL.
- Instagram caption must be <= 1800 characters. Include source URL and up to 5 hashtags.
- Instagram carousel must contain exactly 5 short slides.
- UpScrolled post: reflective, conversational, <= 450 characters. 2-3 short paragraphs. No raw URL in body.
- UpScrolled: include one discussion prompt and one short topic suggestion.
- Short-video voiceover: target 35-45 seconds, under 110 words.
- Keep hashtags relevant and capped at 5.
- For LinkedIn, Instagram, and short-video, include direct calls to read/listen at the source URL.
- Use content-type-appropriate CTA: `Listen` for podcast episodes and `Read` for articles.

Return this JSON shape:
{{
  "x": {{
    "single_post": "string",
    "thread": ["string", "string", "string", "string"],
    "hashtags": ["string"]
  }},
  "linkedin": {{
    "post": "string",
    "comment_prompt": "string"
  }},
  "instagram": {{
    "caption": "string",
    "carousel_slides": ["string", "string", "string", "string", "string"],
    "reel_caption": "string",
    "cover_text": "string"
  }},
  "upscrolled": {{
    "post": "string",
    "discussion_prompt": "string",
    "topic_suggestion": "string"
  }},
  "short_video": {{
    "title": "string",
    "hook": "string",
    "voiceover": "string",
    "shot_list": [
      {{"time": "string", "visual": "string", "on_screen_text": "string"}}
    ],
    "caption": "string",
    "hashtags": ["string"]
  }}
}}

Content item:
{json.dumps(prompt_item, ensure_ascii=True, indent=2)}
""".strip()

    try:
        client = OpenAI(api_key=api_key)
        response = client.responses.create(
            model=OPENAI_MODEL,
            reasoning={"effort": OPENAI_REASONING_EFFORT},
            max_output_tokens=OPENAI_MAX_OUTPUT_TOKENS,
            input=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            text={
                "format": {
                    "type": "json_schema",
                    "name": social_campaign_schema()["name"],
                    "schema": social_campaign_schema()["schema"],
                    "strict": True,
                }
            },
        )
        response_text = getattr(response, "output_text", "") or ""
        return json.loads(response_text) if response_text else None
    except Exception as exc:
        logger.warning("OpenAI generation failed for %s: %s", item.content_id, exc)
        return None


def sanitize_hashtags(values: Any, fallback: List[str], max_items: int = 5) -> List[str]:
    hashtags: List[str] = []
    for value in values or []:
        tag = normalize_whitespace(str(value))
        if not tag:
            continue
        if not tag.startswith("#"):
            tag = "#" + re.sub(r"\s+", "", tag)
        if tag not in hashtags:
            hashtags.append(tag)
        if len(hashtags) >= max_items:
            break
    return hashtags or fallback[:max_items]


def sanitize_string_list(values: Any, fallback: List[str], max_items: int, max_chars: int) -> List[str]:
    items: List[str] = []
    for value in values or []:
        text = truncate_text(str(value), max_chars)
        if text:
            items.append(text)
        if len(items) >= max_items:
            break
    return items if len(items) == max_items else fallback[:max_items]


def sanitize_shot_list(values: Any, fallback: List[Dict[str, str]]) -> List[Dict[str, str]]:
    shots: List[Dict[str, str]] = []
    for value in values or []:
        if not isinstance(value, dict):
            continue
        shot = {
            "time": truncate_text(str(value.get("time", "")), 20),
            "visual": truncate_text(str(value.get("visual", "")), 180),
            "on_screen_text": truncate_text(str(value.get("on_screen_text", "")), 80),
        }
        if shot["time"] and shot["visual"] and shot["on_screen_text"]:
            shots.append(shot)
        if len(shots) >= 5:
            break
    return shots or fallback


def build_campaign(item: ContentItem, use_ai: bool, voice_pattern: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    fallback_channels = build_fallback_channels(item, voice_pattern=voice_pattern)
    generated_channels = generate_channels_with_openai(item, voice_pattern=voice_pattern) if use_ai else None

    x_payload = generated_channels.get("x", {}) if generated_channels else {}
    linkedin_payload = generated_channels.get("linkedin", {}) if generated_channels else {}
    instagram_payload = generated_channels.get("instagram", {}) if generated_channels else {}
    upscrolled_payload = generated_channels.get("upscrolled", {}) if generated_channels else {}
    short_payload = generated_channels.get("short_video", {}) if generated_channels else {}

    campaign_id = f"{datetime.now(timezone.utc).strftime('%Y-%m-%d')}-{item.content_id}"
    pattern_name = (voice_pattern or {}).get("name", "observation")
    pattern_includes_link = (voice_pattern or {}).get("include_link", False)

    x_single_raw = sanitize_x_single_post(
        x_payload.get("single_post") or fallback_channels["x"]["single_post"],
        fallback_channels["x"]["single_post"],
        item,
    )
    # For content_share pattern, append URL; for others, no link
    if pattern_includes_link:
        x_single_final = combine_with_tail(x_single_raw, item.url, X_POST_LIMIT + len(item.url) + 25)
    else:
        x_single_final = x_single_raw

    return {
        "campaign_id": campaign_id,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "x_voice_pattern": pattern_name,
        "source": asdict(item),
        "channels": {
            "x": {
                "single_post": x_single_final,
                "voice_pattern": pattern_name,
                "thread": ensure_thread_has_source_url(
                    sanitize_string_list(
                        x_payload.get("thread"),
                        fallback_channels["x"]["thread"],
                        max_items=4,
                        max_chars=X_THREAD_LIMIT,
                    ),
                    item,
                ),
                "hashtags": sanitize_hashtags(
                    x_payload.get("hashtags"),
                    fallback_channels["x"]["hashtags"],
                    max_items=3,
                ),
                "source_note": item.url,
            },
            "linkedin": {
                "post": truncate_text(
                    linkedin_payload.get("post") or fallback_channels["linkedin"]["post"],
                    LINKEDIN_POST_LIMIT,
                ),
                "comment_prompt": truncate_text(
                    linkedin_payload.get("comment_prompt")
                    or fallback_channels["linkedin"]["comment_prompt"],
                    120,
                ),
            },
            "instagram": {
                "caption": truncate_text(
                    instagram_payload.get("caption") or fallback_channels["instagram"]["caption"],
                    INSTAGRAM_CAPTION_LIMIT,
                ),
                "carousel_slides": sanitize_string_list(
                    instagram_payload.get("carousel_slides"),
                    fallback_channels["instagram"]["carousel_slides"],
                    max_items=5,
                    max_chars=90,
                ),
                "reel_caption": truncate_text(
                    instagram_payload.get("reel_caption")
                    or fallback_channels["instagram"]["reel_caption"],
                    INSTAGRAM_CAPTION_LIMIT,
                ),
                "cover_text": truncate_text(
                    instagram_payload.get("cover_text") or fallback_channels["instagram"]["cover_text"],
                    50,
                ),
                "image_url": item.asset_url or DEFAULT_IMAGE_URL,
            },
            "upscrolled": {
                "post": truncate_text_preserve_paragraphs(
                    upscrolled_payload.get("post") or fallback_channels["upscrolled"]["post"],
                    UPSCROLLED_POST_LIMIT,
                ),
                "discussion_prompt": truncate_text(
                    upscrolled_payload.get("discussion_prompt")
                    or fallback_channels["upscrolled"]["discussion_prompt"],
                    120,
                ),
                "topic_suggestion": truncate_text(
                    upscrolled_payload.get("topic_suggestion")
                    or fallback_channels["upscrolled"]["topic_suggestion"],
                    40,
                ),
                "source_link": item.url,
            },
            "short_video": {
                "title": truncate_text(
                    short_payload.get("title") or fallback_channels["short_video"]["title"],
                    90,
                ),
                "hook": truncate_text(
                    short_payload.get("hook") or fallback_channels["short_video"]["hook"],
                    120,
                ),
                "voiceover": truncate_words(
                    short_payload.get("voiceover") or fallback_channels["short_video"]["voiceover"],
                    SHORT_VIDEO_WORD_LIMIT,
                ),
                "shot_list": sanitize_shot_list(
                    short_payload.get("shot_list"),
                    fallback_channels["short_video"]["shot_list"],
                ),
                "caption": truncate_text(
                    short_payload.get("caption") or fallback_channels["short_video"]["caption"],
                    SHORT_VIDEO_CAPTION_LIMIT,
                ),
                "hashtags": sanitize_hashtags(
                    short_payload.get("hashtags"),
                    fallback_channels["short_video"]["hashtags"],
                ),
                "source_video_path": item.local_video_path,
            },
        },
    }


def render_markdown(campaign: Dict[str, Any]) -> str:
    source = campaign["source"]
    channels = campaign["channels"]
    lines = [
        f"# Social Campaign: {source['title']}",
        "",
        f"- Campaign ID: `{campaign['campaign_id']}`",
        f"- Generated: `{campaign['generated_at']}`",
        f"- Source type: `{source['kind']}`",
        f"- Source URL: {source['url']}",
        f"- Published: `{source['published_at']}`",
        f"- Asset URL: {source['asset_url']}",
    ]

    if source.get("local_video_path"):
        lines.append(f"- Local video source: `{source['local_video_path']}`")

    voice_pattern = campaign.get("x_voice_pattern", "unknown")

    lines.extend(
        [
            "",
            "## Source Summary",
            "",
            source["summary"],
            "",
            "## X",
            "",
            f"**Voice pattern**: `{voice_pattern}`",
            "",
            "### Single Post",
            "",
            channels["x"]["single_post"],
            "",
            f"Optional source note: {channels['x']['source_note']}",
            "",
            "### Thread",
            "",
        ]
    )

    for index, post in enumerate(channels["x"]["thread"], start=1):
        lines.append(f"{index}. {post}")

    lines.extend(
        [
            "",
            "## LinkedIn",
            "",
            channels["linkedin"]["post"],
            "",
            f"Comment prompt: {channels['linkedin']['comment_prompt']}",
            "",
            "## Instagram",
            "",
            "### Caption",
            "",
            channels["instagram"]["caption"],
            "",
            "### Carousel Slides",
            "",
        ]
    )

    for index, slide in enumerate(channels["instagram"]["carousel_slides"], start=1):
        lines.append(f"{index}. {slide}")

    lines.extend(
        [
            "",
            f"Cover text: {channels['instagram']['cover_text']}",
            "",
            "### Reel Caption",
            "",
            channels["instagram"]["reel_caption"],
            "",
            "## UpScrolled",
            "",
            channels["upscrolled"]["post"],
            "",
            f"Discussion prompt: {channels['upscrolled']['discussion_prompt']}",
            "",
            f"Suggested topic: {channels['upscrolled']['topic_suggestion']}",
            "",
            f"Optional source link: {channels['upscrolled']['source_link']}",
            "",
            "## Short Video",
            "",
            f"Title: {channels['short_video']['title']}",
            "",
            f"Hook: {channels['short_video']['hook']}",
            "",
            "### Voiceover",
            "",
            channels["short_video"]["voiceover"],
            "",
            "### Shot List",
            "",
        ]
    )

    for shot in channels["short_video"]["shot_list"]:
        lines.append(f"- {shot['time']} | {shot['visual']} | Text: {shot['on_screen_text']}")

    lines.extend(
        [
            "",
            "### Caption",
            "",
            channels["short_video"]["caption"],
            "",
            f"Short-video hashtags: {' '.join(channels['short_video']['hashtags'])}",
            "",
        ]
    )

    return "\n".join(lines) + "\n"


def buffer_graphql_request(query: str) -> Dict[str, Any]:
    access_token = os.environ.get("BUFFER_ACCESS_TOKEN")
    if not access_token:
        raise RuntimeError("BUFFER_ACCESS_TOKEN is required for Buffer API access.")

    response = requests.post(
        BUFFER_GRAPHQL_ENDPOINT,
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        },
        json={"query": query},
        timeout=30,
    )

    if not response.ok:
        body = truncate_text(response.text, 400)
        raise RuntimeError(f"Buffer API error {response.status_code}: {body}")

    payload = response.json()
    errors = payload.get("errors") or []
    if errors:
        message = truncate_text("; ".join(str(error.get("message", error)) for error in errors), 400)
        raise RuntimeError(f"Buffer GraphQL error: {message}")

    return payload.get("data") or {}


def load_buffer_channels() -> List[Dict[str, Any]]:
    organizations_query = """
    query GetOrganizations {
      account {
        organizations {
          id
          name
        }
      }
    }
    """.strip()

    data = buffer_graphql_request(organizations_query)
    organizations = data.get("account", {}).get("organizations", [])
    channels: List[Dict[str, Any]] = []

    for organization in organizations:
        organization_id = normalize_whitespace(organization.get("id", ""))
        if not organization_id:
            continue

        channels_query = f"""
        query GetChannels {{
          channels(input: {{
            organizationId: {json.dumps(organization_id)}
          }}) {{
            id
            name
            displayName
            service
            avatar
            isQueuePaused
          }}
        }}
        """.strip()

        channel_data = buffer_graphql_request(channels_query)
        organization_channels = channel_data.get("channels", [])
        for channel in organization_channels:
            channels.append(
                {
                    "id": normalize_whitespace(channel.get("id", "")),
                    "name": normalize_whitespace(channel.get("name", "")),
                    "display_name": normalize_whitespace(channel.get("displayName", "")),
                    "organization_id": organization_id,
                    "organization_name": normalize_whitespace(organization.get("name", "")),
                    "service": normalize_whitespace(channel.get("service", "")).lower(),
                    "avatar": normalize_whitespace(channel.get("avatar", "")),
                    "is_queue_paused": bool(channel.get("isQueuePaused")),
                }
            )

    return channels


def recommended_buffer_secret(service: str) -> Optional[str]:
    normalized = normalize_whitespace(service).lower()
    mapping = {
        "twitter": "BUFFER_PROFILE_ID_X",
        "x": "BUFFER_PROFILE_ID_X",
        "linkedin": "BUFFER_PROFILE_ID_LINKEDIN",
        "instagram": "BUFFER_PROFILE_ID_INSTAGRAM",
    }
    return mapping.get(normalized)


def next_buffer_due_at() -> str:
    """Return the next staggered posting time.

    Posts are spread across the day at natural intervals.  If the current
    UTC time is already past a slot, that slot is pushed to today + a
    small jitter so Buffer accepts it (it rejects past timestamps).
    Falls back to the old delay-based logic if all slots are exhausted.
    """
    global _stagger_index  # noqa: PLW0603
    now = datetime.now(timezone.utc)

    if _stagger_index < len(_STAGGER_SLOTS_UTC_HOURS):
        target_hour = _STAGGER_SLOTS_UTC_HOURS[_stagger_index]
        _stagger_index += 1

        # Add 0-15 min jitter so posts don't land exactly on the hour
        jitter_minutes = hash(now.isoformat()) % 16
        candidate = now.replace(hour=target_hour, minute=jitter_minutes, second=0, microsecond=0)

        # If the slot is in the past, schedule for tomorrow
        if candidate <= now:
            candidate += timedelta(days=1)

        return candidate.isoformat().replace("+00:00", "Z")

    # Fallback: more posts than slots — just space them out from now
    due_at = now + timedelta(minutes=BUFFER_SCHEDULE_DELAY_MINUTES * (_stagger_index + 1))
    _stagger_index += 1
    return due_at.replace(microsecond=0).isoformat().replace("+00:00", "Z")


def build_buffer_post_mutation(channel_id: str, text: str, asset_url: str = "") -> str:
    base_fields = [
        f"channelId: {json.dumps(channel_id)}",
        f"text: {json.dumps(text)}",
        "schedulingType: automatic",
        "mode: customScheduled",
        f"dueAt: {json.dumps(next_buffer_due_at())}",
    ]

    normalized_asset_url = normalize_whitespace(asset_url)
    if normalized_asset_url:
        base_fields.append(
            "assets: { images: ["
            + "{ url: "
            + json.dumps(normalized_asset_url)
            + " }"
            + "] }"
        )

    input_block = "\n          ".join(base_fields)
    return f"""
    mutation CreatePost {{
      createPost(input: {{
          {input_block}
      }}) {{
        __typename
        ... on PostActionSuccess {{
          post {{
            id
            text
          }}
        }}
        ... on MutationError {{
          message
        }}
      }}
    }}
    """.strip()


def create_buffer_post(channel_id: str, text: str, asset_url: str = "") -> Dict[str, Any]:
    mutation = build_buffer_post_mutation(channel_id=channel_id, text=text, asset_url=asset_url)
    data = buffer_graphql_request(mutation)
    result = data.get("createPost") or {}
    typename = result.get("__typename")

    if typename == "PostActionSuccess":
        post = result.get("post") or {}
        return {
            "status": "queued",
            "buffer_update_id": post.get("id"),
        }

    message = truncate_text(result.get("message", "Unknown Buffer mutation failure."), 240)
    return {
        "status": "error",
        "body": message,
    }


def queue_to_buffer(campaign: Dict[str, Any]) -> Dict[str, Any]:
    if not os.environ.get("BUFFER_ACCESS_TOKEN"):
        logger.info("BUFFER_ACCESS_TOKEN not set. Skipping Buffer queue.")
        return {"status": "skipped", "reason": "missing BUFFER_ACCESS_TOKEN"}

    source = campaign["source"]
    channels = campaign["channels"]
    profile_env = {
        "x": "BUFFER_PROFILE_ID_X",
        "linkedin": "BUFFER_PROFILE_ID_LINKEDIN",
        "instagram": "BUFFER_PROFILE_ID_INSTAGRAM",
    }

    results: Dict[str, Any] = {}

    for channel_name, env_key in profile_env.items():
        profile_id = os.environ.get(env_key)
        if not profile_id:
            results[channel_name] = {"status": "skipped", "reason": f"missing {env_key}"}
            continue

        if channel_name == "x":
            text = channels["x"]["single_post"]
        elif channel_name == "linkedin":
            text = channels["linkedin"]["post"]
        else:
            text = channels["instagram"]["caption"]

        try:
            asset_url = source.get("asset_url") or DEFAULT_IMAGE_URL if channel_name == "instagram" else ""
            results[channel_name] = create_buffer_post(
                channel_id=profile_id,
                text=text,
                asset_url=asset_url,
            )
        except RuntimeError as exc:
            results[channel_name] = {
                "status": "error",
                "body": str(exc),
            }

    return results


def list_buffer_profiles() -> None:
    if not os.environ.get("BUFFER_ACCESS_TOKEN"):
        raise SystemExit("BUFFER_ACCESS_TOKEN is required to list Buffer profiles.")

    channels = load_buffer_channels()
    output = []
    for channel in channels:
        output.append(
            {
                "id": channel.get("id"),
                "name": channel.get("name"),
                "display_name": channel.get("display_name"),
                "service": channel.get("service"),
                "is_queue_paused": channel.get("is_queue_paused"),
                "organization_name": channel.get("organization_name"),
                "recommended_secret": recommended_buffer_secret(channel.get("service", "")),
            }
        )
    print(json.dumps(output, indent=2))


def write_campaign_files(
    project_root: Path,
    campaign: Dict[str, Any],
) -> Tuple[Path, Path]:
    campaigns_dir = project_root / "social" / "campaigns"
    campaigns_dir.mkdir(parents=True, exist_ok=True)

    stem = slugify(campaign["campaign_id"])
    json_path = campaigns_dir / f"{stem}.json"
    markdown_path = campaigns_dir / f"{stem}.md"

    json_path.write_text(json.dumps(campaign, indent=2), encoding="utf-8")
    markdown_path.write_text(render_markdown(campaign), encoding="utf-8")
    return json_path, markdown_path


def record_campaign(
    state: Dict[str, Any],
    item: ContentItem,
    campaign: Dict[str, Any],
    json_path: Path,
    markdown_path: Path,
    buffer_result: Optional[Dict[str, Any]],
) -> None:
    item_state = state.setdefault("items", {}).setdefault(item.content_id, {"history": []})
    item_state["history"].append(
        {
            "generated_at": campaign["generated_at"],
            "campaign_id": campaign["campaign_id"],
            "x_voice_pattern": campaign.get("x_voice_pattern", ""),
            "json_path": str(json_path.relative_to(get_project_root())),
            "markdown_path": str(markdown_path.relative_to(get_project_root())),
            "buffer": buffer_result or {},
        }
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate social campaign packs.")
    parser.add_argument(
        "--source",
        choices=["auto", "blog", "podcast"],
        default="auto",
        help="Which content source to use.",
    )
    parser.add_argument(
        "--content-id",
        default="",
        help="Explicit content id to generate, for example blog-understanding-riba.",
    )
    parser.add_argument("--limit", type=int, default=1, help="Number of campaign packs to create.")
    parser.add_argument(
        "--publish-buffer",
        action="store_true",
        help="Queue X, LinkedIn, and Instagram posts to Buffer.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Ignore state and generate for the first matching items immediately.",
    )
    parser.add_argument(
        "--recycle-after-days",
        type=int,
        default=DEFAULT_RECYCLE_AFTER_DAYS,
        help="Allow evergreen content to be reused after N days. Use -1 to disable.",
    )
    parser.add_argument(
        "--no-ai",
        action="store_true",
        help="Use deterministic templates instead of OpenAI generation.",
    )
    parser.add_argument(
        "--list-buffer-profiles",
        action="store_true",
        help="Print Buffer channel ids for account setup, then exit.",
    )
    return parser.parse_args()


def main() -> int:
    global _stagger_index  # noqa: PLW0603
    _stagger_index = 0  # Reset stagger for each run

    args = parse_args()
    if args.list_buffer_profiles:
        list_buffer_profiles()
        return 0

    project_root = get_project_root()
    state_path = project_root / "social" / "state" / "social_state.json"
    state = load_state(state_path)

    items = discover_items(project_root, args.source)
    selected_items = choose_items(
        items=items,
        state=state,
        limit=max(1, args.limit),
        recycle_after_days=args.recycle_after_days,
        force=args.force,
        content_id=args.content_id,
    )

    if not selected_items:
        logger.info("No eligible items found. Nothing to generate.")
        return 0

    publish_failed = False

    for item in selected_items:
        voice_pattern = pick_x_voice_pattern(item.content_id, state)
        logger.info("Generating campaign for %s (X voice: %s)", item.content_id, voice_pattern["name"])
        campaign = build_campaign(item, use_ai=not args.no_ai, voice_pattern=voice_pattern)
        buffer_result = queue_to_buffer(campaign) if args.publish_buffer else None
        if buffer_result:
            campaign["buffer"] = buffer_result
            if any(result.get("status") == "error" for result in buffer_result.values()):
                publish_failed = True

        json_path, markdown_path = write_campaign_files(project_root, campaign)
        record_campaign(state, item, campaign, json_path, markdown_path, buffer_result)
        logger.info("Wrote %s and %s", json_path, markdown_path)

    save_state(state_path, state)
    if publish_failed:
        logger.error("Campaign generation completed, but at least one Buffer publish attempt failed.")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
