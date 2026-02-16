#!/usr/bin/env python3
"""
Islamic Economics Automated Newspaper Generator

Fetches news from RSS feeds, filters for Islamic economics relevance,
generates original articles using Claude API, and publishes to static website.
"""

import os
import sys
import json
import logging
import argparse
import re
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Optional, Tuple
import math

try:
    import feedparser
    from jinja2 import Environment, FileSystemLoader
    import anthropic
except ImportError as e:
    print(f"Error: Missing required package. Please install: feedparser, jinja2, anthropic")
    print(f"Details: {e}")
    sys.exit(1)

from config import (
    RSS_FEEDS, RELEVANCE_KEYWORDS, CATEGORIES, CLAUDE_MODEL, CLAUDE_MAX_TOKENS,
    CLAUDE_TEMPERATURE, ARTICLES_PER_DAY, MAX_ARTICLE_AGE_DAYS,
    ARTICLE_WORD_COUNT_TARGET, SYSTEM_PROMPTS, TEMPLATE_DIR
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def get_project_root() -> Path:
    """Get the project root directory based on script location."""
    script_dir = Path(__file__).resolve().parent
    return script_dir.parent

def fetch_rss_feeds() -> List[Dict]:
    """
    Fetch articles from configured RSS feeds.

    Returns:
        List of dicts with: title, link, summary, published, source, category
    """
    articles = []
    project_root = get_project_root()

    for category, feed_urls in RSS_FEEDS.items():
        for feed_url in feed_urls:
            try:
                logger.info(f"Fetching RSS feed: {feed_url}")
                feed = feedparser.parse(feed_url)

                if feed.bozo:
                    logger.warning(f"Feed parsing warning for {feed_url}: {feed.bozo_exception}")

                for entry in feed.entries[:10]:
                    article = {
                        'title': entry.get('title', 'Untitled'),
                        'link': entry.get('link', ''),
                        'summary': entry.get('summary', ''),
                        'published': entry.get('published', ''),
                        'source': feed_url,
                        'category': category
                    }
                    articles.append(article)

            except Exception as e:
                logger.error(f"Error fetching RSS feed {feed_url}: {e}")
                continue

    logger.info(f"Fetched {len(articles)} articles from RSS feeds")
    return articles

def _score_article_relevance(title: str, summary: str) -> int:
    """
    Score article relevance based on keyword matches.

    Args:
        title: Article title
        summary: Article summary

    Returns:
        Integer score (number of keyword matches)
    """
    text = (title + " " + summary).lower()
    score = 0

    for keyword in RELEVANCE_KEYWORDS:
        if keyword.lower() in text:
            score += 1

    return score

def _titles_similar(title1: str, title2: str, threshold: float = 0.85) -> bool:
    """
    Check if two titles are similar (simple deduplication).

    Args:
        title1: First title
        title2: Second title
        threshold: Similarity threshold (default 0.85 = 85% words match)

    Returns:
        True if titles are similar, False otherwise
    """
    def normalize(text):
        return set(text.lower().split())

    words1 = normalize(title1)
    words2 = normalize(title2)

    if not words1 or not words2:
        return title1.lower() == title2.lower()

    intersection = len(words1 & words2)
    union = len(words1 | words2)
    similarity = intersection / union if union > 0 else 0

    return similarity >= threshold

def filter_relevant_articles(articles: List[Dict]) -> List[Dict]:
    """
    Filter articles by relevance score and deduplicate by title.

    Args:
        articles: List of article dicts

    Returns:
        Filtered list of relevant, unique articles
    """
    relevant = []

    for article in articles:
        score = _score_article_relevance(article['title'], article['summary'])
        if score >= 2:
            article['relevance_score'] = score
            relevant.append(article)

    logger.info(f"Filtered to {len(relevant)} relevant articles (score >= 2)")

    deduped = []
    for article in relevant:
        is_duplicate = False
        for existing in deduped:
            if _titles_similar(article['title'], existing['title']):
                is_duplicate = True
                break

        if not is_duplicate:
            deduped.append(article)

    logger.info(f"Deduplicated to {len(deduped)} unique articles")
    return deduped

def _categorize_article(title: str, summary: str) -> str:
    """
    Assign category to article based on keyword matching.

    Args:
        title: Article title
        summary: Article summary

    Returns:
        Category name
    """
    text = (title + " " + summary).lower()

    category_keywords = {
        'markets': ['sukuk', 'market', 'commodity', 'price', 'trading', 'financial market', 'stock', 'bond'],
        'policy': ['central bank', 'regulation', 'policy', 'imf', 'world bank', 'government', 'regulatory'],
        'analysis': ['analysis', 'economic', 'trend', 'outlook', 'forecast', 'research', 'study'],
        'scripture': ['quranic', 'hadith', 'islamic principle', 'scripture', 'theology', 'shariah principle'],
        'opinion': ['opinion', 'commentary', 'column', 'perspective', 'view', 'editorial'],
        'oic': ['oic', 'muslim-majority', 'gulf', 'arab', 'southeast asia', 'south asia', 'regional']
    }

    scores = {}
    for category, keywords in category_keywords.items():
        score = sum(1 for kw in keywords if kw in text)
        scores[category] = score

    best_category = max(scores, key=scores.get)
    return best_category if scores[best_category] > 0 else 'analysis'

def select_top_articles(articles: List[Dict], n: int = 3) -> List[Dict]:
    """
    Select top N articles spread across different categories.

    Args:
        articles: List of article dicts
        n: Number of articles to select

    Returns:
        List of selected articles with category assignment
    """
    for article in articles:
        article['assigned_category'] = _categorize_article(
            article['title'],
            article['summary']
        )

    sorted_articles = sorted(
        articles,
        key=lambda a: (a['assigned_category'], -a.get('relevance_score', 0))
    )

    selected = []
    categories_used = set()

    for article in sorted_articles:
        if len(selected) >= n:
            break

        if article['assigned_category'] not in categories_used or len(selected) < n:
            selected.append(article)
            categories_used.add(article['assigned_category'])

    logger.info(f"Selected {len(selected)} top articles for processing")
    return selected

def generate_article(news_item: Dict, category: str) -> Optional[Dict]:
    """
    Generate original article using Claude API.

    Args:
        news_item: Dict with title, summary, source
        category: Article category for system prompt

    Returns:
        Dict with generated article data or None if generation fails
    """
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        logger.error("ANTHROPIC_API_KEY environment variable not set")
        return None

    try:
        client = anthropic.Anthropic(api_key=api_key)

        system_prompt = SYSTEM_PROMPTS.get(category, SYSTEM_PROMPTS['analysis'])

        user_message = f"""Based on the following news item, write an original 800-1000 word article:

Title: {news_item['title']}
Summary: {news_item['summary']}
Source: {news_item['source']}

Please structure the article as follows:
1. An engaging headline (different from the source)
2. 6-8 sections with clear subheadings
3. Key takeaways (3-5 bullet points at the end)
4. Professional journalistic tone suitable for educated readers

Format your response as JSON with the following structure:
{{
    "title": "article headline here",
    "content_html": "the article content in HTML format with <p>, <h2>, <h3>, <ul>, <li> tags",
    "excerpt": "a 150-200 character excerpt",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}}

Do not include any markdown formatting, only HTML."""

        logger.info(f"Calling Claude API to generate article for: {news_item['title']}")

        message = client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=CLAUDE_MAX_TOKENS,
            temperature=CLAUDE_TEMPERATURE,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_message}
            ]
        )

        response_text = message.content[0].text

        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if not json_match:
            logger.error("Could not extract JSON from Claude response")
            return None

        article_data = json.loads(json_match.group())

        article_data['author'] = 'Al-Tijarah Analysis Desk'
        article_data['category'] = CATEGORIES.get(category, category)
        article_data['date'] = datetime.now().isoformat()
        article_data['date_formatted'] = datetime.now().strftime('%B %d, %Y')
        article_data['source'] = news_item['source']
        article_data['source_title'] = news_item['title']

        word_count = len(article_data.get('content_html', '').split())
        article_data['reading_time'] = max(1, round(word_count / 200))

        logger.info(f"Generated article: {article_data['title']}")
        return article_data

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse Claude response as JSON: {e}")
        return None
    except anthropic.APIError as e:
        logger.error(f"Claude API error: {e}")
        return None
    except Exception as e:
        logger.error(f"Unexpected error generating article: {e}")
        return None

def generate_slug(title: str, date_prefix: bool = True) -> str:
    """
    Create URL-friendly slug from title.

    Args:
        title: Article title
        date_prefix: Whether to prepend date (default True)

    Returns:
        URL-friendly slug
    """
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title)
    slug = re.sub(r'\s+', '-', slug.strip())
    slug = slug.lower()
    slug = slug[:60]

    if date_prefix:
        date_str = datetime.now().strftime('%Y%m%d')
        slug = f"{date_str}-{slug}"

    return slug

def write_article_html(article_data: Dict, project_root: Path) -> Optional[str]:
    """
    Render article template and write to file.

    Args:
        article_data: Dict with article metadata and content
        project_root: Path to project root

    Returns:
        Path to written file or None if error
    """
    try:
        template_dir = project_root / TEMPLATE_DIR
        env = Environment(loader=FileSystemLoader(str(template_dir)))
        template = env.get_template('article_template.html')

        article_data['related_articles'] = []

        html_content = template.render(**article_data)

        blog_dir = project_root / 'Website' / 'blog'
        blog_dir.mkdir(parents=True, exist_ok=True)

        slug = generate_slug(article_data['title'])
        article_path = blog_dir / f"{slug}.html"

        with open(article_path, 'w', encoding='utf-8') as f:
            f.write(html_content)

        article_data['url'] = f"blog/{slug}.html"
        article_data['slug'] = slug

        logger.info(f"Wrote article to {article_path}")
        return str(article_path)

    except Exception as e:
        logger.error(f"Error writing article HTML: {e}")
        return None

def update_articles_json(new_articles: List[Dict], project_root: Path) -> List[Dict]:
    """
    Update articles.json with new articles, trim by age, archive old articles.

    Args:
        new_articles: List of new article dicts
        project_root: Path to project root

    Returns:
        Updated list of all articles
    """
    data_dir = project_root / 'Website' / 'data'
    data_dir.mkdir(parents=True, exist_ok=True)

    articles_file = data_dir / 'articles.json'
    archive_dir = data_dir / 'archive'
    archive_dir.mkdir(parents=True, exist_ok=True)

    if articles_file.exists():
        with open(articles_file, 'r', encoding='utf-8') as f:
            all_articles = json.load(f)
    else:
        all_articles = []

    all_articles = new_articles + all_articles

    cutoff_date = datetime.now() - timedelta(days=MAX_ARTICLE_AGE_DAYS)
    current_articles = []
    archived_articles = []

    for article in all_articles:
        article_date_str = article.get('date', '')
        try:
            article_date = datetime.fromisoformat(article_date_str)
        except (ValueError, TypeError):
            article_date = datetime.now()

        if article_date >= cutoff_date:
            current_articles.append(article)
        else:
            archived_articles.append(article)

    with open(articles_file, 'w', encoding='utf-8') as f:
        json.dump(current_articles, f, indent=2, ensure_ascii=False)

    if archived_articles:
        archive_date = datetime.now().strftime('%Y-%m')
        archive_file = archive_dir / f"{archive_date}.json"

        existing_archive = []
        if archive_file.exists():
            with open(archive_file, 'r', encoding='utf-8') as f:
                existing_archive = json.load(f)

        all_archived = archived_articles + existing_archive

        with open(archive_file, 'w', encoding='utf-8') as f:
            json.dump(all_archived, f, indent=2, ensure_ascii=False)

        logger.info(f"Archived {len(archived_articles)} old articles to {archive_file}")

    logger.info(f"Updated articles.json with {len(current_articles)} current articles")
    return current_articles

def regenerate_blog_html(articles_db: List[Dict], project_root: Path) -> bool:
    """
    Regenerate blog.html from articles database.

    Args:
        articles_db: List of all article dicts
        project_root: Path to project root

    Returns:
        True if successful, False otherwise
    """
    try:
        template_dir = project_root / TEMPLATE_DIR
        env = Environment(loader=FileSystemLoader(str(template_dir)))
        template = env.get_template('blog_template.html')

        sorted_articles = sorted(
            articles_db,
            key=lambda a: a.get('date', ''),
            reverse=True
        )

        lead_article = None
        secondary_leads = []

        for article in sorted_articles:
            if lead_article is None:
                lead_article = article
            elif len(secondary_leads) < 3:
                secondary_leads.append(article)
            else:
                break

        analysis_articles = [
            a for a in sorted_articles
            if a.get('category', '').lower() in ['analysis', 'economic analysis', 'markets & commodities']
        ][:3]

        oic_articles = [
            a for a in sorted_articles
            if a.get('category', '').lower() in ['oic economies', 'oic']
        ][:4]

        opinion_articles = [
            a for a in sorted_articles
            if a.get('category', '').lower() in ['opinion & commentary', 'opinion']
        ][:5]

        scripture_articles = [
            a for a in sorted_articles
            if a.get('category', '').lower() in ['islamic principles', 'scripture']
        ][:3]

        ticker_items = [
            {'label': 'Brent Crude', 'value': '$75.20', 'change': '-0.8%', 'direction': 'down'},
            {'label': 'Gold', 'value': '$2,842', 'change': '+0.3%', 'direction': 'up'},
            {'label': 'Islamic Finance AUM', 'value': '$4.5T', 'change': '+11.3%', 'direction': 'up'},
        ]

        context = {
            'current_date': datetime.now().strftime('%A, %B %d, %Y'),
            'lead_article': lead_article,
            'secondary_leads': secondary_leads,
            'analysis_articles': analysis_articles,
            'oic_articles': oic_articles,
            'opinion_articles': opinion_articles,
            'scripture_articles': scripture_articles,
            'ticker_items': ticker_items,
        }

        html_content = template.render(**context)

        blog_file = project_root / 'Website' / 'blog.html'
        blog_file.parent.mkdir(parents=True, exist_ok=True)

        with open(blog_file, 'w', encoding='utf-8') as f:
            f.write(html_content)

        logger.info(f"Regenerated blog.html with {len(sorted_articles)} articles")
        return True

    except Exception as e:
        logger.error(f"Error regenerating blog.html: {e}")
        return False

def main():
    """Main orchestration function."""
    parser = argparse.ArgumentParser(
        description='Generate Islamic Economics newspaper from RSS feeds'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Skip API calls and file writes'
    )
    parser.add_argument(
        '--force',
        action='store_true',
        help='Regenerate blog.html from existing articles.json without fetching new content'
    )

    args = parser.parse_args()
    project_root = get_project_root()

    logger.info("Starting Islamic Economics newspaper generation")

    if args.force:
        logger.info("Using --force flag: regenerating from existing articles")
        articles_file = project_root / 'Website' / 'data' / 'articles.json'

        if articles_file.exists():
            with open(articles_file, 'r', encoding='utf-8') as f:
                articles_db = json.load(f)

            if regenerate_blog_html(articles_db, project_root):
                logger.info("Successfully regenerated blog.html")
                return 0
            else:
                logger.error("Failed to regenerate blog.html")
                return 1
        else:
            logger.error(f"Articles file not found: {articles_file}")
            return 1

    try:
        logger.info("Tier 1: Fetching RSS feeds and generating articles...")

        rss_articles = fetch_rss_feeds()
        if not rss_articles:
            raise Exception("No articles fetched from RSS feeds")

        relevant_articles = filter_relevant_articles(rss_articles)
        if not relevant_articles:
            raise Exception("No relevant articles after filtering")

        selected_articles = select_top_articles(relevant_articles, n=ARTICLES_PER_DAY)
        if not selected_articles:
            raise Exception("No articles selected for generation")

        generated_articles = []
        for article in selected_articles:
            category = article.get('assigned_category', 'analysis')

            if args.dry_run:
                logger.info(f"[DRY RUN] Would generate article from: {article['title']}")
                generated_articles.append({
                    'title': f"Generated: {article['title'][:50]}",
                    'content_html': '<p>Placeholder content</p>',
                    'excerpt': article['summary'][:200],
                    'tags': [category],
                    'author': 'Al-Tijarah Analysis Desk',
                    'category': CATEGORIES.get(category, category),
                    'date': datetime.now().isoformat(),
                    'date_formatted': datetime.now().strftime('%B %d, %Y'),
                    'source': article['source'],
                    'source_title': article['title'],
                    'url': f"blog/placeholder-{len(generated_articles)}.html",
                    'slug': f"placeholder-{len(generated_articles)}",
                    'reading_time': 5,
                })
            else:
                generated = generate_article(article, category)
                if generated:
                    write_article_html(generated, project_root)
                    generated_articles.append(generated)

        if not generated_articles:
            raise Exception("No articles were successfully generated")

        logger.info(f"Generated {len(generated_articles)} articles")

        if not args.dry_run:
            articles_db = update_articles_json(generated_articles, project_root)
        else:
            articles_file = project_root / 'Website' / 'data' / 'articles.json'
            if articles_file.exists():
                with open(articles_file, 'r', encoding='utf-8') as f:
                    articles_db = json.load(f)
            else:
                articles_db = generated_articles

        if regenerate_blog_html(articles_db, project_root):
            logger.info("Successfully regenerated blog.html")
            logger.info(f"Tier 1 complete: Generated {len(generated_articles)} fresh articles")
            return 0
        else:
            raise Exception("Failed to regenerate blog.html")

    except Exception as e:
        logger.error(f"Tier 1 failed: {e}")
        logger.info("Tier 2: Attempting to regenerate blog from existing articles...")

        try:
            articles_file = project_root / 'Website' / 'data' / 'articles.json'

            if articles_file.exists():
                with open(articles_file, 'r', encoding='utf-8') as f:
                    articles_db = json.load(f)

                if regenerate_blog_html(articles_db, project_root):
                    logger.info("Tier 2 complete: Regenerated blog.html from existing articles")
                    return 1
                else:
                    raise Exception("Failed to regenerate blog.html in Tier 2")
            else:
                raise Exception("No articles.json found for Tier 2 fallback")

        except Exception as e2:
            logger.error(f"Tier 2 failed: {e2}")
            logger.info("Tier 3: Keeping existing blog.html unchanged")
            logger.error("Newspaper generation failed at all tiers")
            return 2

if __name__ == '__main__':
    sys.exit(main())
