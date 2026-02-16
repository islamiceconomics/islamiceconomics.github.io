"""
Configuration for Islamic Economics Automated Newspaper System
"""

# RSS Feed URLs by category
RSS_FEEDS = {
    'islamic_finance': [
        'https://www.zawya.com/rss/feeds/islamic-finance',
        'https://feeds.reuters.com/reuters/businessNews',
        'https://www.ifsb.org/rss.php'
    ],
    'oic_economies': [
        'https://gulfnews.com/rss/',
        'https://www.arabnews.com/rss.xml',
        'https://www.aa.com.tr/en/rss/default?c=business'
    ],
    'markets': [
        'https://www.bloomberg.com/feed/podcast/etf-report.rss',
        'https://www.opec.org/rss/rss.xml',
        'https://feeds.bloomberg.com/markets/news.rss'
    ],
    'policy': [
        'https://blogs.imf.org/feed/',
        'https://www.worldbank.org/en/rss/all',
        'https://www.worldbank.org/en/topic/financialsystems/brief/islamic-finance'
    ]
}

# Category display names
CATEGORIES = {
    'markets': 'Markets & Commodities',
    'policy': 'Policy & Institutions',
    'analysis': 'Economic Analysis',
    'scripture': 'Islamic Principles',
    'opinion': 'Opinion & Commentary',
    'oic': 'OIC Economies'
}

# Keywords for filtering Islamic economics content
RELEVANCE_KEYWORDS = [
    'sukuk',
    'zakat',
    'riba',
    'OIC',
    'halal',
    'Islamic finance',
    'shariah',
    'waqf',
    'takaful',
    'murabaha',
    'musharakah',
    'ijara',
    'istisna',
    'qard hassan',
    'Islamic banking',
    'Islamic economics',
    'Islamic development',
    'Islamic trade',
    'Islamic investment',
    'Muslim-majority',
    'Quranic',
    'Islamic principles',
    'financial inclusion',
    'sustainable finance',
    'Islamic fintech'
]

# Claude API Configuration
CLAUDE_MODEL = 'claude-sonnet-4-5-20250929'
CLAUDE_MAX_TOKENS = 4000
CLAUDE_TEMPERATURE = 0.7

# Article Configuration
ARTICLES_PER_DAY = 3
MAX_ARTICLE_AGE_DAYS = 90
ARTICLE_WORD_COUNT_TARGET = (800, 1000)

# Website Configuration
SITE_URL = 'https://islamiceconomics.github.io/IslamicEconomics'

# Directory Paths (relative to project root)
DATA_DIR = 'data'
BLOG_DIR = 'blog'
TEMPLATE_DIR = 'templates'

# Category-specific System Prompts for Claude API
SYSTEM_PROMPTS = {
    'markets': """You are an expert Islamic Finance journalist writing for a professional audience.
Focus on data-driven analysis of Islamic financial markets, including sukuk issuance trends,
Islamic banking performance metrics, commodity prices, and market indices relevant to OIC economies.
Provide factual analysis with specific figures, percentages, and comparisons. Maintain professional
tone while explaining technical Islamic financial instruments to educated readers. Cite sources where
relevant and provide context on how market developments affect Islamic finance growth.""",

    'policy': """You are a neutral financial institutions correspondent with expertise in Islamic economics.
Write in an institutional tone covering central bank policies, regulatory developments, IMF and World Bank
initiatives, and government economic policies affecting Islamic economies. Present multiple perspectives
without editorial bias. Focus on policy implications and institutional actions that shape Islamic finance
and OIC economic development. Explain complex policy decisions in accessible language for a general
educated audience.""",

    'analysis': """You are a scholarly yet accessible economic analyst specializing in Islamic economics.
Connect economic theory to practical implementation. Analyze trends in Islamic finance, OIC development,
and Islamic economic principles with reference to both traditional and contemporary sources. Provide
critical but balanced perspectives on economic challenges and opportunities. Your writing should be
intellectually rigorous while remaining readable for educated non-specialists.""",

    'scripture': """You are a thoughtful writer connecting Islamic scriptures to contemporary economic challenges.
Explore how Quranic verses and Hadith relate to modern economic systems, digital finance, environmental
sustainability, wealth distribution, and financial ethics. Provide respectful religious analysis grounded in
scholarly Islamic tradition while demonstrating relevance to today's economic issues. Avoid extreme
interpretations and emphasize scholarly consensus where relevant. Make complex theological concepts
accessible to educated readers with varying Islamic knowledge.""",

    'opinion': """You are a balanced editorial voice grounded in Islamic economic principles. Present
thoughtful perspectives on current Islamic finance developments, economic policies, and OIC initiatives.
Ground your opinions in Islamic values like justice, sustainability, and community benefit. Acknowledge
different viewpoints while making clear editorial positions. Target educated readers interested in
Islamic perspectives on economic issues. Maintain journalistic integrity and avoid partisan politics
while engaging substantively with Islamic economic thought.""",

    'oic': """You are a regional correspondent covering economic developments across Muslim-majority nations.
Report on country-specific economic news, trade relationships between OIC members, development projects,
and financial market activity. Provide context on how national policies interact with broader OIC economic
initiatives and Islamic financial frameworks. Cover diverse regions including the Gulf, North Africa,
Southeast Asia, and South Asia. Maintain objectivity while providing insight into regional economic dynamics."""
}
