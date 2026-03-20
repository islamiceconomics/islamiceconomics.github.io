#!/usr/bin/env python3
"""
Discover reply-worthy tweets about Islamic economics and suggest draft replies.

Searches X (via the v2 API) for recent conversations relevant to Islamic economics,
filters for quality, and generates suggested replies using OpenAI. Output is a
review-friendly markdown file for manual approval before posting.
"""

import json
import logging
import os
import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

try:
    import requests
except ImportError:
    print("Error: Missing requests package. Install scripts/requirements.txt first.")
    sys.exit(1)

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
X_BEARER_TOKEN = os.environ.get("X_BEARER_TOKEN", "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-5-mini")
OWN_HANDLE = os.environ.get("X_OWN_HANDLE", "theislamicecon")

# Search queries — rotate through these to find relevant conversations
SEARCH_QUERIES = [
    '"Islamic economics" -is:retweet -is:reply lang:en',
    '"Islamic finance" -is:retweet -is:reply lang:en',
    "sukuk -is:retweet -is:reply lang:en",
    "waqf endowment -is:retweet -is:reply lang:en",
    "takaful insurance -is:retweet -is:reply lang:en",
    "shariah compliant finance -is:retweet -is:reply lang:en",
    '"halal investing" -is:retweet -is:reply lang:en',
    "riba interest Islamic -is:retweet -is:reply lang:en",
    '"OIC economy" OR "OIC trade" -is:retweet -is:reply lang:en',
    "tariff trade Muslim -is:retweet -is:reply lang:en",
]

# Minimum engagement to filter out noise
MIN_LIKES = 2
MIN_FOLLOWERS = 100
MAX_RESULTS_PER_QUERY = 10
MAX_OPPORTUNITIES = 8

# Voice for replies
REPLY_SYSTEM_PROMPT = (
    "You write reply tweets for someone who studies Islamic economics seriously. "
    "The voice is calm, wise, and slightly melancholic — like someone writing in a "
    "journal that happens to be public. Never salesy. Never self-promotional. "
    "Never link to anything. Never mention your own website or content. "
    "The reply should add genuine value to the conversation: a fact, a perspective, "
    "a gentle reframing, or an honest question. Keep it short — 1-2 sentences max. "
    "Do not use emoji, hashtags, or exclamation marks. "
    "Do not start with 'Great point', 'This!', 'Exactly', 'So true', or any form of "
    "sycophantic agreement. If you agree, just add your own thought that builds on theirs. "
    "Do not start with the other person's name or @handle. "
    "End with a period. Sound like a person, not a brand."
)


def get_project_root() -> Path:
    return Path(__file__).resolve().parent.parent


def search_tweets(query: str, max_results: int = 10) -> List[Dict[str, Any]]:
    """Search recent tweets using X API v2."""
    if not X_BEARER_TOKEN:
        logger.warning("X_BEARER_TOKEN not set. Cannot search tweets.")
        return []

    url = "https://api.x.com/2/tweets/search/recent"
    headers = {"Authorization": f"Bearer {X_BEARER_TOKEN}"}
    params = {
        "query": query,
        "max_results": min(max_results, 100),
        "tweet.fields": "created_at,public_metrics,author_id,conversation_id",
        "user.fields": "username,name,public_metrics,verified",
        "expansions": "author_id",
    }

    try:
        response = requests.get(url, headers=headers, params=params, timeout=15)
        if response.status_code == 429:
            logger.warning("X API rate limited. Will retry next run.")
            return []
        if not response.ok:
            logger.warning("X API error %s: %s", response.status_code, response.text[:200])
            return []

        data = response.json()
        tweets = data.get("data", [])
        users_list = data.get("includes", {}).get("users", [])
        users_map = {u["id"]: u for u in users_list}

        results = []
        for tweet in tweets:
            author = users_map.get(tweet.get("author_id"), {})
            author_username = author.get("username", "")

            # Skip own tweets
            if author_username.lower() == OWN_HANDLE.lower():
                continue

            metrics = tweet.get("public_metrics", {})
            author_metrics = author.get("public_metrics", {})
            followers = author_metrics.get("followers_count", 0)
            likes = metrics.get("like_count", 0)

            # Filter by minimum engagement and followers
            if likes < MIN_LIKES and followers < MIN_FOLLOWERS:
                continue

            results.append({
                "id": tweet["id"],
                "text": tweet["text"],
                "created_at": tweet.get("created_at", ""),
                "author_username": author_username,
                "author_name": author.get("name", ""),
                "author_followers": followers,
                "author_verified": author.get("verified", False),
                "likes": likes,
                "retweets": metrics.get("retweet_count", 0),
                "replies": metrics.get("reply_count", 0),
                "url": f"https://x.com/{author_username}/status/{tweet['id']}",
            })

        return results

    except Exception as exc:
        logger.warning("X API request failed for query '%s': %s", query[:40], exc)
        return []


def deduplicate_tweets(tweets: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Remove duplicate tweets by ID."""
    seen = set()
    unique = []
    for tweet in tweets:
        if tweet["id"] not in seen:
            seen.add(tweet["id"])
            unique.append(tweet)
    return unique


def rank_tweets(tweets: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Rank tweets by reply-worthiness: engagement + follower reach."""
    for tweet in tweets:
        tweet["_score"] = (
            tweet["likes"] * 3
            + tweet["retweets"] * 5
            + tweet["replies"] * 2
            + min(tweet["author_followers"], 50000) / 1000
        )
    return sorted(tweets, key=lambda t: t["_score"], reverse=True)


def generate_reply(tweet: Dict[str, Any]) -> str:
    """Generate a suggested reply using OpenAI."""
    if not OPENAI_API_KEY or OpenAI is None:
        return "[AI unavailable — write reply manually]"

    user_prompt = (
        f"Someone posted this on X:\n\n"
        f"@{tweet['author_username']}: \"{tweet['text']}\"\n\n"
        f"Write a short reply (1-2 sentences, under 200 characters). "
        f"Add something useful to the conversation. Do not agree just to agree. "
        f"Do not be promotional. End with a period."
    )

    try:
        client = OpenAI(api_key=OPENAI_API_KEY)
        response = client.responses.create(
            model=OPENAI_MODEL,
            reasoning={"effort": "low"},
            max_output_tokens=200,
            input=[
                {"role": "system", "content": REPLY_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
        )
        reply_text = (getattr(response, "output_text", "") or "").strip()
        # Strip any accidental @mentions at the start
        reply_text = re.sub(r"^@\w+\s*", "", reply_text).strip()
        # Strip quotes the AI might wrap around the reply
        reply_text = reply_text.strip('"').strip("'").strip()
        return reply_text or "[Generation failed — write reply manually]"
    except Exception as exc:
        logger.warning("Reply generation failed: %s", exc)
        return "[Generation failed — write reply manually]"


def render_digest(opportunities: List[Dict[str, Any]], replies: List[str]) -> str:
    """Render the daily digest as markdown."""
    now = datetime.now(timezone.utc)
    lines = [
        f"# Reply Opportunities — {now.strftime('%Y-%m-%d')}",
        "",
        f"Generated at {now.isoformat()}",
        "",
        f"Found **{len(opportunities)}** reply-worthy tweets. Review each suggested reply below.",
        "Edit as needed, then post manually from X.",
        "",
        "---",
        "",
    ]

    for i, (tweet, reply) in enumerate(zip(opportunities, replies), start=1):
        lines.extend([
            f"## {i}. @{tweet['author_username']}",
            "",
            f"**Tweet**: {tweet['text']}",
            "",
            f"- Likes: {tweet['likes']} | Retweets: {tweet['retweets']} | "
            f"Replies: {tweet['replies']} | Followers: {tweet['author_followers']:,}",
            f"- Link: {tweet['url']}",
            "",
            f"**Suggested reply**:",
            "",
            f"> {reply}",
            "",
            "**Status**: ⏳ Pending review",
            "",
            "---",
            "",
        ])

    return "\n".join(lines) + "\n"


def main() -> int:
    if not X_BEARER_TOKEN:
        logger.error(
            "X_BEARER_TOKEN not set. You need an X API developer account. "
            "Apply at https://developer.x.com and create a project with "
            "read access. Set the Bearer Token as X_BEARER_TOKEN."
        )
        return 1

    project_root = get_project_root()
    digest_dir = project_root / "social" / "reply-digests"
    digest_dir.mkdir(parents=True, exist_ok=True)

    # Search across all queries
    all_tweets: List[Dict[str, Any]] = []
    for query in SEARCH_QUERIES:
        logger.info("Searching: %s", query[:50])
        results = search_tweets(query, max_results=MAX_RESULTS_PER_QUERY)
        all_tweets.extend(results)
        logger.info("  Found %d qualifying tweets", len(results))

    # Deduplicate and rank
    unique_tweets = deduplicate_tweets(all_tweets)
    logger.info("Total unique tweets: %d", len(unique_tweets))

    ranked = rank_tweets(unique_tweets)
    opportunities = ranked[:MAX_OPPORTUNITIES]

    if not opportunities:
        logger.info("No reply-worthy tweets found today.")
        # Write empty digest
        now = datetime.now(timezone.utc)
        digest_path = digest_dir / f"{now.strftime('%Y-%m-%d')}-replies.md"
        digest_path.write_text(
            f"# Reply Opportunities — {now.strftime('%Y-%m-%d')}\n\n"
            "No reply-worthy tweets found today.\n",
            encoding="utf-8",
        )
        return 0

    # Generate suggested replies
    replies = []
    for tweet in opportunities:
        logger.info(
            "Generating reply for @%s (%d likes)",
            tweet["author_username"],
            tweet["likes"],
        )
        reply = generate_reply(tweet)
        replies.append(reply)

    # Write digest
    now = datetime.now(timezone.utc)
    digest_path = digest_dir / f"{now.strftime('%Y-%m-%d')}-replies.md"
    digest_content = render_digest(opportunities, replies)
    digest_path.write_text(digest_content, encoding="utf-8")
    logger.info("Wrote reply digest: %s", digest_path)

    # Also write machine-readable JSON
    json_path = digest_dir / f"{now.strftime('%Y-%m-%d')}-replies.json"
    json_data = {
        "generated_at": now.isoformat(),
        "opportunities": [
            {**tweet, "suggested_reply": reply, "status": "pending"}
            for tweet, reply in zip(opportunities, replies)
        ],
    }
    json_path.write_text(json.dumps(json_data, indent=2), encoding="utf-8")
    logger.info("Wrote reply JSON: %s", json_path)

    # Print summary to stdout
    print(f"\n{'='*60}")
    print(f"  REPLY DIGEST — {now.strftime('%Y-%m-%d')}")
    print(f"  {len(opportunities)} opportunities found")
    print(f"{'='*60}\n")
    for i, (tweet, reply) in enumerate(zip(opportunities, replies), start=1):
        print(f"  {i}. @{tweet['author_username']} ({tweet['likes']} likes)")
        text_preview = tweet["text"][:80].replace("\n", " ")
        print(f"     \"{text_preview}...\"")
        print(f"     → {reply}")
        print()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
