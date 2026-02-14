#!/usr/bin/env python3
"""
Al-Tijarah Automated Newspaper Generator
=========================================
Fetches Islamic economics news from RSS feeds, generates original articles
via the Claude API, produces HTML article files, and updates blog.html.

Usage:
    python scripts/generate_newspaper.py              # normal daily run
    python scripts/generate_newspaper.py --dry-run    # test without writing files
    python scripts/generate_newspaper.py --seed       # generate initial seed articles
"""

import json
import re
import sys
import hashlib
import logging
import argparse
from datetime import datetime, timedelta, timezone
from pathlib import Path
from difflib import SequenceMatcher

import feedparser
import requests
from jinja2 import Environment, FileSystemLoader

# ── Local imports ────────────────────────────────────────────────────
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import (
    BASE_DIR, WEBSITE_DIR, BLOG_DIR, DATA_DIR, ARCHIVE_DIR,
    TEMPLATES_DIR, ARTICLES_JSON,
    ANTHROPIC_API_KEY, LLM_MODEL, LLM_TEMPERATURE, LLM_MAX_TOKENS,
    ARTICLES_PER_RUN, MAX_ARTICLES_IN_DB, ARCHIVE_AFTER_DAYS, EXCERPT_LENGTH,
    CATEGORIES, RSS_FEEDS,
    SYSTEM_PROMPT, CATEGORY_PROMPTS,
)

# ── Logging ──────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("al-tijarah")

# ── Jinja2 Environment ──────────────────────────────────────────────
jinja_env = Environment(
    loader=FileSystemLoader(str(TEMPLATES_DIR)),
    autoescape=False,
)

# ── Author bios ──────────────────────────────────────────────────────
AUTHOR_BIOS = {
    "Editorial Desk": "The Al-Tijarah Editorial Desk provides daily coverage of Islamic finance markets, OIC economic developments, and policy analysis.",
    "Research Desk": "The Al-Tijarah Research Desk produces in-depth analytical pieces connecting Islamic economic theory to modern practice.",
    "Policy Desk": "The Al-Tijarah Policy Desk covers regulatory developments, central bank actions, and governance across OIC nations.",
    "Scripture Desk": "The Al-Tijarah Scripture Desk explores the connections between Islamic scriptures and contemporary economic challenges.",
    "Guest Contributor": "Guest contributors bring diverse perspectives on Islamic economics from academia, industry, and policy circles.",
    "Analysis Desk": "The Al-Tijarah Analysis Desk provides deep-dive research on Islamic finance instruments, economic models, and comparative studies.",
    "History Desk": "The Al-Tijarah History Desk covers the rich economic history of Islamic civilizations and their modern relevance.",
}

# ── Default ticker data ──────────────────────────────────────────────
DEFAULT_TICKER = [
    {"label": "Brent Crude", "value": "$75.20", "change": "-0.8%", "direction": "down"},
    {"label": "Gold", "value": "$2,842", "change": "+0.3%", "direction": "up"},
    {"label": "SAU GDP Growth", "value": "3.2%", "change": None, "direction": None},
    {"label": "TUR Inflation", "value": "41.5%", "change": "-10.6pp", "direction": "down"},
    {"label": "IDN Growth", "value": "5.0%", "change": "+0.2pp", "direction": "up"},
    {"label": "Islamic Finance AUM", "value": "$4.5T", "change": "+11.3%", "direction": "up"},
    {"label": "Global Sukuk", "value": "$236B", "change": "+8.1%", "direction": "up"},
    {"label": "MYR/USD", "value": "4.47", "change": None, "direction": None},
    {"label": "PKR/USD", "value": "278", "change": "+2.1%", "direction": "up"},
]


# =====================================================================
# 1. NEWS AGGREGATION
# =====================================================================

def fetch_rss_feeds():
    """Fetch articles from all configured RSS feeds."""
    all_items = []
    for feed_config in RSS_FEEDS:
        try:
            log.info(f"Fetching: {feed_config['name']}")
            feed = feedparser.parse(
                feed_config["url"],
                agent="Al-Tijarah-Newspaper/1.0"
            )
            for entry in feed.entries[:15]:  # max 15 per feed
                item = {
                    "title": entry.get("title", "").strip(),
                    "summary": entry.get("summary", entry.get("description", "")).strip(),
                    "link": entry.get("link", ""),
                    "published": entry.get("published", ""),
                    "source": feed_config["name"],
                }
                if item["title"] and item["summary"]:
                    all_items.append(item)
        except Exception as e:
            log.warning(f"Failed to fetch {feed_config['name']}: {e}")
    log.info(f"Fetched {len(all_items)} total items from RSS feeds")
    return all_items


def score_relevance(item):
    """Score an RSS item for Islamic economics relevance (0-100)."""
    text = f"{item['title']} {item['summary']}".lower()
    score = 0

    # Check against all category keywords
    for cat_key, cat_config in CATEGORIES.items():
        for keyword in cat_config["keywords"]:
            if keyword.lower() in text:
                score += 5 * cat_config["weight"]

    # Bonus for specific high-value terms
    high_value = ["islamic finance", "sukuk", "shariah", "zakat", "waqf", "riba",
                  "OIC", "halal economy", "islamic banking", "takaful"]
    for term in high_value:
        if term.lower() in text:
            score += 10

    return min(score, 100)


def classify_category(item):
    """Assign the best category to an RSS item."""
    text = f"{item['title']} {item['summary']}".lower()
    best_cat = "analysis"  # default
    best_score = 0

    for cat_key, cat_config in CATEGORIES.items():
        score = sum(1 for kw in cat_config["keywords"] if kw.lower() in text)
        weighted = score * cat_config["weight"]
        if weighted > best_score:
            best_score = weighted
            best_cat = cat_key

    return best_cat


def deduplicate(items, threshold=0.65):
    """Remove items with similar titles."""
    unique = []
    for item in items:
        is_dup = False
        for existing in unique:
            sim = SequenceMatcher(None, item["title"].lower(), existing["title"].lower()).ratio()
            if sim > threshold:
                is_dup = True
                break
        if not is_dup:
            unique.append(item)
    return unique


def select_news_items(items, count=5):
    """Select top N diverse news items for article generation."""
    # Score and sort
    for item in items:
        item["relevance"] = score_relevance(item)
        item["category"] = classify_category(item)

    # Filter minimum relevance
    relevant = [i for i in items if i["relevance"] >= 10]
    if not relevant:
        relevant = items[:count]  # fallback: take first N even if low relevance

    # Sort by relevance
    relevant.sort(key=lambda x: x["relevance"], reverse=True)

    # Deduplicate
    relevant = deduplicate(relevant)

    # Select diverse categories
    selected = []
    used_cats = set()
    for item in relevant:
        if len(selected) >= count:
            break
        if item["category"] not in used_cats or len(selected) < 3:
            selected.append(item)
            used_cats.add(item["category"])

    log.info(f"Selected {len(selected)} news items for generation")
    return selected[:count]


# =====================================================================
# 2. ARTICLE GENERATION (Claude API)
# =====================================================================

def generate_article_via_claude(news_item, category):
    """Generate an article using the Claude API."""
    if not ANTHROPIC_API_KEY:
        log.error("ANTHROPIC_API_KEY not set — cannot generate articles")
        return None

    category_prompt = CATEGORY_PROMPTS.get(category, "")
    cat_config = CATEGORIES.get(category, {})

    user_prompt = f"""Based on the following news context, write an original Al-Tijarah article.

NEWS CONTEXT:
Title: {news_item['title']}
Summary: {news_item['summary']}
Source: {news_item['source']}

CATEGORY: {cat_config.get('label', category)}
CATEGORY GUIDANCE: {category_prompt}

Please provide your response in this exact JSON format:
{{
  "title": "Your original article title (compelling, newspaper-style)",
  "content": "<section class=\\"article-section\\">HTML content here with <h2>, <p>, <blockquote class=\\"quranic-verse\\"> tags</section>",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "read_time": 7
}}

IMPORTANT:
- Write 800-1000 words of original content (NOT a summary of the source)
- Use the news as a STARTING POINT, then provide deeper analysis
- Structure with 3-5 sections using <section class="article-section"><h2>...</h2><p>...</p></section>
- Include Islamic economic perspective where natural
- The title should be different from the source headline
- Return ONLY valid JSON, no other text"""

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

        response = client.messages.create(
            model=LLM_MODEL,
            max_tokens=LLM_MAX_TOKENS,
            temperature=LLM_TEMPERATURE,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )

        raw = response.content[0].text.strip()

        # Extract JSON from response (handle markdown code blocks)
        json_match = re.search(r'\{[\s\S]*\}', raw)
        if json_match:
            result = json.loads(json_match.group())
            log.info(f"Generated article: {result.get('title', 'untitled')}")
            return result
        else:
            log.error(f"No JSON found in Claude response")
            return None

    except json.JSONDecodeError as e:
        log.error(f"JSON parse error: {e}")
        return None
    except Exception as e:
        log.error(f"Claude API error: {e}")
        return None


def generate_seed_article(category, topic_num):
    """Generate a seed article for initial population (no RSS needed)."""
    if not ANTHROPIC_API_KEY:
        log.error("ANTHROPIC_API_KEY not set")
        return None

    cat_config = CATEGORIES.get(category, {})
    category_prompt = CATEGORY_PROMPTS.get(category, "")

    seed_topics = {
        "markets": [
            "The current state of global sukuk markets and Islamic capital market trends",
            "Growth of takaful (Islamic insurance) industry worldwide",
            "Islamic fintech: digital platforms transforming Shariah-compliant finance",
        ],
        "policy": [
            "Central bank digital currencies and their implications for Islamic finance",
            "Regulatory frameworks for Islamic banking across different jurisdictions",
            "OIC trade integration efforts and economic cooperation initiatives",
        ],
        "analysis": [
            "Comparing Islamic and conventional banking performance during economic downturns",
            "The role of Islamic finance in achieving UN Sustainable Development Goals",
            "Wealth inequality in Muslim-majority nations: causes and Islamic remedies",
        ],
        "scripture": [
            "The economics of Surah Al-Baqarah: debt, charity, and trade",
            "Prophetic traditions on market regulation and consumer protection",
            "Maqasid al-Shariah and their implications for economic policy",
        ],
        "opinion": [
            "Why Islamic green finance is the future of sustainable investing",
            "The case for a unified OIC digital payments infrastructure",
            "Waqf revival: how blockchain could transform Islamic endowments",
        ],
        "oic": [
            "Saudi Vision 2030: economic diversification progress and challenges",
            "Indonesia's emergence as a global Islamic finance hub",
            "Turkey's economic challenges: inflation, monetary policy, and structural reform",
        ],
    }

    topics = seed_topics.get(category, seed_topics["analysis"])
    topic = topics[topic_num % len(topics)]

    user_prompt = f"""Write an original Al-Tijarah newspaper article on this topic:

TOPIC: {topic}
CATEGORY: {cat_config.get('label', category)}
CATEGORY GUIDANCE: {category_prompt}

Please provide your response in this exact JSON format:
{{
  "title": "Your compelling newspaper-style headline",
  "content": "<section class=\\"article-section\\">HTML content here</section>",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "read_time": 7
}}

Write 800-1000 words of substantive, well-researched content.
Structure with 3-5 sections using <section class="article-section"><h2>...</h2><p>...</p></section>.
Include specific data, figures, and Islamic economic principles where relevant.
Return ONLY valid JSON."""

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

        response = client.messages.create(
            model=LLM_MODEL,
            max_tokens=LLM_MAX_TOKENS,
            temperature=LLM_TEMPERATURE,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )

        raw = response.content[0].text.strip()
        json_match = re.search(r'\{[\s\S]*\}', raw)
        if json_match:
            result = json.loads(json_match.group())
            result["_seed_category"] = category
            log.info(f"Generated seed article: {result.get('title', 'untitled')}")
            return result
        return None

    except Exception as e:
        log.error(f"Seed generation error: {e}")
        return None


# =====================================================================
# 3. ARTICLE DATABASE
# =====================================================================

def load_articles():
    """Load the articles database from JSON."""
    if ARTICLES_JSON.exists():
        try:
            with open(ARTICLES_JSON, "r", encoding="utf-8") as f:
                data = json.load(f)
            return data.get("articles", []), data.get("metadata", {})
        except (json.JSONDecodeError, KeyError) as e:
            log.warning(f"Error loading articles.json: {e}")
    return [], {}


def save_articles(articles, metadata=None):
    """Save the articles database to JSON."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if metadata is None:
        metadata = {}
    metadata["last_updated"] = datetime.now(timezone.utc).isoformat()
    metadata["total_articles"] = len(articles)

    data = {"articles": articles, "metadata": metadata}
    with open(ARTICLES_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    log.info(f"Saved {len(articles)} articles to articles.json")


def make_slug(title):
    """Convert a title to a URL-friendly slug."""
    slug = title.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    # Add date prefix for uniqueness
    date_prefix = datetime.now().strftime("%Y-%m-%d")
    return f"{date_prefix}-{slug[:60]}"


def make_excerpt(content, length=200):
    """Extract a plain-text excerpt from HTML content."""
    text = re.sub(r'<[^>]+>', '', content)
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) > length:
        text = text[:length].rsplit(' ', 1)[0] + "..."
    return text


def article_to_db_record(generated, category, source_url=""):
    """Convert a generated article into a database record."""
    now = datetime.now(timezone.utc)
    cat_config = CATEGORIES.get(category, {})
    title = generated.get("title", "Untitled Article")
    content = generated.get("content", "")
    slug = make_slug(title)

    return {
        "id": hashlib.md5(f"{slug}-{now.isoformat()}".encode()).hexdigest()[:12],
        "title": title,
        "slug": slug,
        "category": category,
        "kicker": cat_config.get("kicker", category.title()),
        "author": cat_config.get("author", "Editorial Desk"),
        "date": now.strftime("%Y-%m-%d"),
        "date_formatted": now.strftime("%B %d, %Y"),
        "date_short": now.strftime("%b %d, %Y"),
        "content": content,
        "excerpt": make_excerpt(content, EXCERPT_LENGTH),
        "excerpt_short": make_excerpt(content, 120),
        "tags": generated.get("tags", []),
        "read_time": generated.get("read_time", 7),
        "source_url": source_url,
        "featured": False,
    }


def archive_old_articles(articles):
    """Archive articles older than ARCHIVE_AFTER_DAYS."""
    cutoff = (datetime.now(timezone.utc) - timedelta(days=ARCHIVE_AFTER_DAYS)).strftime("%Y-%m-%d")
    current = []
    archived = []

    for article in articles:
        if article.get("date", "9999") < cutoff:
            archived.append(article)
        else:
            current.append(article)

    if archived:
        ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
        month = datetime.now().strftime("%Y-%m")
        archive_path = ARCHIVE_DIR / f"{month}.json"

        existing_archive = []
        if archive_path.exists():
            try:
                with open(archive_path, "r", encoding="utf-8") as f:
                    existing_archive = json.load(f)
            except json.JSONDecodeError:
                pass

        existing_archive.extend(archived)
        with open(archive_path, "w", encoding="utf-8") as f:
            json.dump(existing_archive, f, indent=2, ensure_ascii=False)

        log.info(f"Archived {len(archived)} old articles to {archive_path.name}")

    return current


def cap_database(articles):
    """Cap the database at MAX_ARTICLES_IN_DB."""
    if len(articles) > MAX_ARTICLES_IN_DB:
        articles = articles[:MAX_ARTICLES_IN_DB]
        log.info(f"Capped database to {MAX_ARTICLES_IN_DB} articles")
    return articles


# =====================================================================
# 4. HTML GENERATION
# =====================================================================

def generate_article_html(article, all_articles):
    """Generate an individual article HTML page."""
    template = jinja_env.get_template("article_template.html")

    # Find related articles (same category, different article)
    related = [
        a for a in all_articles
        if a["category"] == article["category"] and a["id"] != article["id"]
    ][:3]

    cat_config = CATEGORIES.get(article["category"], {})

    html = template.render(
        title=article["title"],
        excerpt=article["excerpt"],
        tags=article["tags"],
        author=article["author"],
        author_bio=AUTHOR_BIOS.get(article["author"], "Al-Tijarah contributor."),
        date_formatted=article["date_formatted"],
        read_time=article["read_time"],
        category=article["category"],
        category_label=cat_config.get("label", article["category"].title()),
        content=article["content"],
        related_articles=related,
    )

    # Write HTML file
    BLOG_DIR.mkdir(parents=True, exist_ok=True)
    filepath = BLOG_DIR / f"{article['slug']}.html"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)
    log.info(f"Wrote article HTML: {filepath.name}")
    return filepath


def generate_blog_index(articles):
    """Regenerate blog.html from template with current articles."""
    template = jinja_env.get_template("blog_template.html")

    # Sort articles by date descending
    sorted_articles = sorted(articles, key=lambda a: a.get("date", ""), reverse=True)

    # Lead story: most recent featured or most recent overall
    featured = [a for a in sorted_articles if a.get("featured")]
    lead = featured[0] if featured else (sorted_articles[0] if sorted_articles else None)

    # Side leads: next 3 different-category articles
    side_leads = []
    used_cats = {lead["category"]} if lead else set()
    for a in sorted_articles:
        if lead and a["id"] == lead["id"]:
            continue
        if a["category"] not in used_cats or len(side_leads) < 3:
            side_leads.append(a)
            used_cats.add(a["category"])
        if len(side_leads) >= 3:
            break

    # Section articles
    analysis_articles = [a for a in sorted_articles if a["category"] in ("analysis", "markets")][:3]
    oic_articles = [a for a in sorted_articles if a["category"] == "oic"][:4]
    opinion_articles = [a for a in sorted_articles if a["category"] == "opinion"][:5]
    scripture_articles = [a for a in sorted_articles if a["category"] == "scripture"][:3]

    # Pad sections if not enough articles
    if len(analysis_articles) < 3:
        analysis_articles.extend([a for a in sorted_articles if a not in analysis_articles][:3 - len(analysis_articles)])
    if len(oic_articles) < 4:
        oic_articles.extend([a for a in sorted_articles if a not in oic_articles][:4 - len(oic_articles)])
    if len(opinion_articles) < 5:
        opinion_articles.extend([a for a in sorted_articles if a not in opinion_articles][:5 - len(opinion_articles)])
    if len(scripture_articles) < 3:
        scripture_articles.extend([a for a in sorted_articles if a not in scripture_articles][:3 - len(scripture_articles)])

    html = template.render(
        lead=lead or _empty_article(),
        side_leads=side_leads,
        analysis_articles=analysis_articles,
        oic_articles=oic_articles,
        opinion_articles=opinion_articles,
        scripture_articles=scripture_articles,
        ticker_items=DEFAULT_TICKER,
    )

    blog_path = WEBSITE_DIR / "blog.html"
    with open(blog_path, "w", encoding="utf-8") as f:
        f.write(html)
    log.info(f"Regenerated blog.html with {len(articles)} articles")


def _empty_article():
    """Return a placeholder article for empty state."""
    return {
        "title": "Welcome to Al-Tijarah",
        "slug": "welcome",
        "kicker": "Editorial",
        "excerpt": "Stay tuned for the latest news and analysis on the global Islamic economy.",
        "excerpt_short": "Stay tuned for the latest news and analysis.",
        "author": "Editorial Desk",
        "date_short": datetime.now().strftime("%b %d, %Y"),
        "read_time": 3,
    }


# =====================================================================
# 5. MAIN ORCHESTRATOR
# =====================================================================

def run_daily(dry_run=False):
    """Main daily run: fetch → generate → write → update index."""
    log.info("=" * 60)
    log.info("Al-Tijarah Daily Newspaper Generation")
    log.info("=" * 60)

    # Load existing articles
    articles, metadata = load_articles()
    log.info(f"Loaded {len(articles)} existing articles")

    # Step 1: Fetch news
    rss_items = fetch_rss_feeds()

    # Step 2: Select best items
    if rss_items:
        selected = select_news_items(rss_items, count=ARTICLES_PER_RUN + 2)
    else:
        log.warning("No RSS items fetched — will use seed generation")
        selected = []

    # Step 3: Generate articles
    new_articles = []
    generated_count = 0

    for item in selected:
        if generated_count >= ARTICLES_PER_RUN:
            break

        category = item.get("category", "analysis")
        log.info(f"Generating article for category '{category}': {item['title'][:60]}...")

        if dry_run:
            log.info("[DRY RUN] Would generate article here")
            continue

        result = generate_article_via_claude(item, category)
        if result:
            record = article_to_db_record(result, category, source_url=item.get("link", ""))
            new_articles.append(record)
            generated_count += 1
        else:
            log.warning(f"Failed to generate article for: {item['title'][:60]}")

    # If no RSS items or all failed, try seed generation
    if not new_articles and not dry_run and ANTHROPIC_API_KEY:
        log.info("Falling back to seed generation...")
        categories_to_seed = ["markets", "oic", "analysis"]
        for i, cat in enumerate(categories_to_seed):
            if len(new_articles) >= ARTICLES_PER_RUN:
                break
            result = generate_seed_article(cat, i)
            if result:
                record = article_to_db_record(result, cat)
                new_articles.append(record)

    if dry_run:
        log.info("[DRY RUN] Complete — no files written")
        return

    # Step 4: Mark first new article as featured
    if new_articles:
        new_articles[0]["featured"] = True

    # Step 5: Add to database
    articles = new_articles + articles

    # Step 6: Archive old articles
    articles = archive_old_articles(articles)

    # Step 7: Cap database
    articles = cap_database(articles)

    # Step 8: Save database
    metadata["last_run"] = datetime.now(timezone.utc).isoformat()
    metadata["articles_generated"] = len(new_articles)
    save_articles(articles, metadata)

    # Step 9: Generate individual article HTML pages
    for article in new_articles:
        generate_article_html(article, articles)

    # Step 10: Regenerate blog.html
    generate_blog_index(articles)

    log.info("=" * 60)
    log.info(f"DONE: Generated {len(new_articles)} new articles")
    log.info("=" * 60)

    return len(new_articles)


def run_seed(count_per_category=2, dry_run=False):
    """Generate initial seed articles for all categories."""
    log.info("=" * 60)
    log.info("Al-Tijarah Seed Article Generation")
    log.info("=" * 60)

    articles, metadata = load_articles()
    new_articles = []

    for cat_key in CATEGORIES:
        for i in range(count_per_category):
            log.info(f"Generating seed article: {cat_key} #{i+1}")

            if dry_run:
                log.info("[DRY RUN] Would generate seed article here")
                continue

            result = generate_seed_article(cat_key, i)
            if result:
                record = article_to_db_record(result, cat_key)
                new_articles.append(record)

    if dry_run:
        log.info(f"[DRY RUN] Would have generated {len(CATEGORIES) * count_per_category} seed articles")
        return

    # Mark first of each category as featured
    seen_cats = set()
    for article in new_articles:
        if article["category"] not in seen_cats:
            article["featured"] = True
            seen_cats.add(article["category"])

    articles = new_articles + articles
    articles = cap_database(articles)

    metadata["last_seed"] = datetime.now(timezone.utc).isoformat()
    metadata["seed_articles"] = len(new_articles)
    save_articles(articles, metadata)

    for article in new_articles:
        generate_article_html(article, articles)

    generate_blog_index(articles)

    log.info(f"SEED DONE: Generated {len(new_articles)} seed articles")
    return len(new_articles)


# =====================================================================
# 6. CLI ENTRY POINT
# =====================================================================

def main():
    parser = argparse.ArgumentParser(description="Al-Tijarah Newspaper Generator")
    parser.add_argument("--dry-run", action="store_true", help="Test without writing files or calling API")
    parser.add_argument("--seed", action="store_true", help="Generate initial seed articles for all categories")
    parser.add_argument("--seed-count", type=int, default=2, help="Articles per category for seeding (default: 2)")
    args = parser.parse_args()

    if args.seed:
        run_seed(count_per_category=args.seed_count, dry_run=args.dry_run)
    else:
        run_daily(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
