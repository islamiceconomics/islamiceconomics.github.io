"""
Al-Tijarah Newspaper Generator — Configuration
"""

import os
from pathlib import Path

# ── Paths ────────────────────────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent
WEBSITE_DIR = BASE_DIR / "Website"
BLOG_DIR = WEBSITE_DIR / "blog"
DATA_DIR = WEBSITE_DIR / "data"
ARCHIVE_DIR = DATA_DIR / "archive"
TEMPLATES_DIR = Path(__file__).resolve().parent / "templates"
ARTICLES_JSON = DATA_DIR / "articles.json"

# ── API Keys (from environment / GitHub Secrets) ─────────────────────
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

# ── LLM Settings ─────────────────────────────────────────────────────
LLM_MODEL = "claude-sonnet-4-5-20250929"
LLM_TEMPERATURE = 0.7
LLM_MAX_TOKENS = 4096

# ── Generation Settings ──────────────────────────────────────────────
ARTICLES_PER_RUN = 3          # generate 3 articles per daily run
MAX_ARTICLES_IN_DB = 200      # cap main articles.json at 200
ARCHIVE_AFTER_DAYS = 90       # archive articles older than 90 days
EXCERPT_LENGTH = 200          # characters for article excerpt

# ── Categories ───────────────────────────────────────────────────────
CATEGORIES = {
    "markets": {
        "label": "Markets & Finance",
        "kicker": "Markets & Finance",
        "keywords": [
            "sukuk", "islamic finance", "islamic banking", "halal",
            "shariah compliant", "murabaha", "ijara", "takaful",
            "islamic bond", "islamic fund", "fintech islamic"
        ],
        "author": "Editorial Desk",
        "weight": 2.0,
    },
    "policy": {
        "label": "Policy & Governance",
        "kicker": "Policy & Governance",
        "keywords": [
            "central bank", "monetary policy", "regulation", "OIC",
            "GCC policy", "economic reform", "fiscal policy",
            "trade agreement", "sanctions", "subsidy"
        ],
        "author": "Policy Desk",
        "weight": 2.0,
    },
    "analysis": {
        "label": "Analysis",
        "kicker": "Analysis",
        "keywords": [
            "analysis", "research", "study", "DSGE", "economic model",
            "debt crisis", "inflation", "GDP growth", "trade deficit",
            "poverty", "inequality", "development"
        ],
        "author": "Research Desk",
        "weight": 1.5,
    },
    "scripture": {
        "label": "Scripture & Economy",
        "kicker": "Scripture & Economy",
        "keywords": [
            "quran", "hadith", "fiqh", "shariah", "riba", "zakat",
            "waqf", "maqasid", "sadaqah", "haram", "halal economy"
        ],
        "author": "Scripture Desk",
        "weight": 1.0,
    },
    "opinion": {
        "label": "Opinion",
        "kicker": "Opinion",
        "keywords": [
            "opinion", "editorial", "commentary", "perspective",
            "argument", "case for", "case against", "future of"
        ],
        "author": "Guest Contributor",
        "weight": 1.0,
    },
    "oic": {
        "label": "OIC Economies",
        "kicker": "OIC Economies",
        "keywords": [
            "saudi arabia", "turkey", "malaysia", "indonesia",
            "pakistan", "nigeria", "UAE", "egypt", "qatar", "kuwait",
            "bahrain", "oman", "bangladesh", "iran", "morocco",
            "jordan", "tunisia", "senegal", "kazakhstan"
        ],
        "author": "Editorial Desk",
        "weight": 2.5,
    },
}

# ── RSS Feed Sources ─────────────────────────────────────────────────
RSS_FEEDS = [
    # Islamic finance focused
    {"url": "https://www.reuters.com/finance/rss", "name": "Reuters Finance"},
    {"url": "https://www.imf.org/en/News/Rss", "name": "IMF News"},
    {"url": "https://blogs.worldbank.org/rss.xml", "name": "World Bank Blog"},
    {"url": "https://www.opec.org/opec_web/en/press_room/28.htm", "name": "OPEC News"},
    # Regional news
    {"url": "https://www.arabnews.com/rss.xml", "name": "Arab News"},
    {"url": "https://gulfnews.com/rss", "name": "Gulf News"},
    {"url": "https://www.aljazeera.com/xml/rss/all.xml", "name": "Al Jazeera"},
    {"url": "https://www.dawn.com/feed", "name": "Dawn (Pakistan)"},
    # General finance & economics
    {"url": "https://feeds.bloomberg.com/markets/news.rss", "name": "Bloomberg Markets"},
    {"url": "https://www.ft.com/rss/home", "name": "Financial Times"},
]

# ── Article Generation Prompts ───────────────────────────────────────
SYSTEM_PROMPT = """You are the editorial AI for Al-Tijarah, a respected digital newspaper
covering the global Islamic economy. You write original, well-researched articles that combine
economic analysis with Islamic principles. Your tone is scholarly yet accessible — like The
Economist meets Islamic scholarship.

Key guidelines:
- Write in a professional newspaper style with clear structure
- Include specific data, figures, and institution names when available
- Reference Islamic principles (Quran, Hadith) where naturally relevant
- Maintain objectivity while being informed by Islamic economic thought
- Each article should be 800-1000 words
- Use HTML formatting: <h2> for section headers, <p> for paragraphs, <blockquote class="quranic-verse"> for Quranic references
- Do NOT include the article title in the body (it's in the header)
- Write 3-5 distinct sections with clear analytical flow
"""

CATEGORY_PROMPTS = {
    "markets": "Focus on Islamic finance market trends, sukuk issuance, takaful developments, and Shariah-compliant investment products. Include specific numbers and institutional references.",
    "policy": "Analyze economic policy developments in OIC nations and their implications. Cover central bank actions, regulatory changes, and regional economic integration efforts.",
    "analysis": "Provide deep analytical pieces connecting Islamic economic theory to modern practice. Reference academic research and formal economic concepts where appropriate.",
    "scripture": "Connect Islamic scriptures (Quran and authentic Hadith) to contemporary economic challenges. Structure as: scriptural reference → classical interpretation → modern application.",
    "opinion": "Write a balanced editorial perspective grounded in Islamic principles. Take a clear position while acknowledging counterarguments. Focus on forward-looking policy recommendations.",
    "oic": "Cover economic developments in specific OIC member nations. Include GDP data, trade figures, and sector-specific analysis. Compare with regional peers where relevant.",
}
