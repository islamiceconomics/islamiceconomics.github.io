#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
import sys
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup, Comment, NavigableString, Tag
from deep_translator import GoogleTranslator


ROOT = Path(__file__).resolve().parents[1]
WEBSITE = ROOT / "Website"
CACHE_PATH = ROOT / "scripts" / ".translation-cache.json"
SITE_URL = "https://islamiceconomics.github.io"

TOP_LEVEL_PAGES = [
    "about.html",
    "blog.html",
    "comparative.html",
    "dashboard.html",
    "foundations.html",
    "history.html",
    "index.html",
    "library.html",
    "podcast.html",
    "research.html",
    "scriptures.html",
    "theory.html",
]

TRANSLATABLE_ATTRS = {"aria-label", "placeholder", "title", "alt"}
SKIP_TAGS = {"script", "style", "svg", "path", "code", "pre"}
PAGE_LINKS = set(TOP_LEVEL_PAGES)
ROOT_ASSET_PREFIXES = (
    "css/",
    "js/",
    "images/",
    "podcast/",
    "theory/",
    "foundations/",
    "comparative/",
    "social/",
    "data/",
    "blog/",
)


@dataclass(frozen=True)
class LocaleConfig:
    code: str
    native_label: str
    html_dir: str
    date_locale: str
    theme_toggle: str
    nav_toggle: str
    back_to_top: str
    language_nav: str


LOCALES: dict[str, LocaleConfig] = {
    "en": LocaleConfig(
        code="en",
        native_label="EN",
        html_dir="ltr",
        date_locale="en-US",
        theme_toggle="Toggle dark mode",
        nav_toggle="Toggle navigation",
        back_to_top="Back to top",
        language_nav="Language selector",
    ),
    "ur": LocaleConfig(
        code="ur",
        native_label="اردو",
        html_dir="rtl",
        date_locale="ur-PK",
        theme_toggle="ڈارک موڈ ٹوگل",
        nav_toggle="نیویگیشن ٹوگل",
        back_to_top="اوپر جائیں",
        language_nav="زبان منتخب کریں",
    ),
    "ar": LocaleConfig(
        code="ar",
        native_label="العربية",
        html_dir="rtl",
        date_locale="ar",
        theme_toggle="تبديل الوضع الداكن",
        nav_toggle="تبديل التنقل",
        back_to_top="العودة إلى الأعلى",
        language_nav="اختيار اللغة",
    ),
    "tr": LocaleConfig(
        code="tr",
        native_label="Türkçe",
        html_dir="ltr",
        date_locale="tr-TR",
        theme_toggle="Koyu modu degistir",
        nav_toggle="Gezinmeyi ac/kapat",
        back_to_top="Yukariya don",
        language_nav="Dil secici",
    ),
}

TRANSLATION_TARGETS = ("ar", "tr")
DATA_TARGETS = ("ur", "ar", "tr")


SCRIPT_REPLACEMENTS: dict[str, dict[str, dict[str, str]]] = {
    "scriptures.html": {
        "ar": {
            "Related Sources": "مصادر ذات صلة",
            "Quran": "القرآن",
            "Hadith": "الحديث",
            "Context:": "السياق:",
            "Showing <strong>${filtered.length}</strong> source${filtered.length !== 1 ? 's' : ''} &mdash; <strong>${quranCount}</strong> Quranic ayah${quranCount !== 1 ? 's' : ''}, <strong>${hadithCount}</strong> hadith": "عرض <strong>${filtered.length}</strong> مصدر${filtered.length !== 1 ? 's' : ''} &mdash; <strong>${quranCount}</strong> آية قرآنية${quranCount !== 1 ? 's' : ''}، و<strong>${hadithCount}</strong> حديث",
            "${thisEntries.length} sources &middot; ${connectedTopics.size} connected topics": "${thisEntries.length} مصادر &middot; ${connectedTopics.size} موضوعات مترابطة",
        },
        "tr": {
            "Related Sources": "Ilgili kaynaklar",
            "Quran": "Kur'an",
            "Hadith": "Hadis",
            "Context:": "Baglam:",
            "Showing <strong>${filtered.length}</strong> source${filtered.length !== 1 ? 's' : ''} &mdash; <strong>${quranCount}</strong> Quranic ayah${quranCount !== 1 ? 's' : ''}, <strong>${hadithCount}</strong> hadith": "<strong>${filtered.length}</strong> kaynak gosteriliyor &mdash; <strong>${quranCount}</strong> Kur'an ayeti, <strong>${hadithCount}</strong> hadis",
            "${thisEntries.length} sources &middot; ${connectedTopics.size} connected topics": "${thisEntries.length} kaynak &middot; ${connectedTopics.size} bagli konu",
        },
    },
    "blog.html": {
        "ar": {
            "d.toLocaleDateString('en-US', opts)": "d.toLocaleDateString('ar', opts)",
            "Loading market data...": "جار تحميل بيانات السوق...",
            "Islamic Finance AUM": "أصول التمويل الإسلامي",
            "Global Sukuk": "الصكوك العالمية",
            "IEA Reserve Release": "سحب احتياطي وكالة الطاقة",
            "IRN Inflation": "تضخم إيران",
            "Hormuz Disruption": "اضطراب هرمز",
            "IDN Growth": "نمو إندونيسيا",
            "Gold": "الذهب",
            "Brent Crude": "خام برنت",
            "LIVE": "مباشر",
        },
        "tr": {
            "d.toLocaleDateString('en-US', opts)": "d.toLocaleDateString('tr-TR', opts)",
            "Loading market data...": "Piyasa verileri yukleniyor...",
            "Islamic Finance AUM": "Islami finans varliklari",
            "Global Sukuk": "Kuresel sukuk",
            "IEA Reserve Release": "IEA rezerv salimi",
            "IRN Inflation": "Iran enflasyonu",
            "Hormuz Disruption": "Hurmuz kesintisi",
            "IDN Growth": "Endonezya buyumesi",
            "Gold": "Altin",
            "Brent Crude": "Brent petrolu",
            "LIVE": "CANLI",
        },
        "ur": {
            "Loading market data...": "مارکیٹ ڈیٹا لوڈ ہو رہا ہے...",
        },
    },
    "podcast.html": {
        "ur": {
            "Watch Explainer": "وضاحتی ویڈیو",
            "Watch Short": "مختصر ویڈیو",
        },
    },
    "dashboard.html": {
        "ur": {
            "const ratingClass = o.rating.toLowerCase();": "const ratingClass = o.rating.toLowerCase();\n      const ratingLabelMap = { Stable: 'مستحکم', Cautious: 'محتاط' };\n      const ratingLabel = ratingLabelMap[o.rating] || o.rating;",
            "country-header-rating rating-${ratingClass}\">${o.rating} نقطہ نظر</span>": "country-header-rating rating-${ratingClass}\">${ratingLabel} نقطہ نظر</span>",
        },
        "ar": {
            "const ratingClass = o.rating.toLowerCase();": "const ratingClass = o.rating.toLowerCase();\n      const ratingLabelMap = { Stable: 'مستقرة', Cautious: 'حذرة' };\n      const ratingLabel = ratingLabelMap[o.rating] || o.rating;",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.totalCountries}</div><div class=\"agg-stat-label\">OIC Nations</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.totalCountries}</div><div class=\"agg-stat-label\">دول منظمة التعاون الإسلامي</div></div>",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">$${a.combinedGDP}T</div><div class=\"agg-stat-label\">Combined GDP</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">$${a.combinedGDP}T</div><div class=\"agg-stat-label\">الناتج المحلي المجمع</div></div>",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.population}B</div><div class=\"agg-stat-label\">Population</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.population}B</div><div class=\"agg-stat-label\">السكان</div></div>",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.landArea}%</div><div class=\"agg-stat-label\">World Land Area</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.landArea}%</div><div class=\"agg-stat-label\">من مساحة اليابسة العالمية</div></div>",
            "GDP (Nominal)": "الناتج المحلي الاسمي",
            "Inflation (CPI)": "التضخم (مؤشر الأسعار)",
            "Debt/GDP": "الدين/الناتج",
            "FDI Inflows": "تدفقات الاستثمار الأجنبي",
            "Reserves": "الاحتياطيات",
            "OIC ": "منظمة التعاون الإسلامي ",
            "Population": "السكان",
            "country-header-rating rating-${ratingClass}\">${o.rating} Outlook</span>": "country-header-rating rating-${ratingClass}\">${ratingLabel} النظرة</span>",
            "Sectoral GDP Mix": "تركيب الناتج حسب القطاعات",
            "Key Exports": "أهم الصادرات",
            "Main Trade Partners": "الشركاء التجاريون الرئيسيون",
            "trade openness": "الانفتاح التجاري",
            "Islamic finance share": "حصة التمويل الإسلامي",
            "Indicator": "المؤشر",
            "2025 (est.)": "2025 (تقديري)",
            "2026 (f)": "2026 (متوقع)",
            "2027 (f)": "2027 (متوقع)",
            "Real GDP Growth (%)": "نمو الناتج الحقيقي (%)",
            "Inflation (%)": "التضخم (%)",
            "Current Account (% GDP)": "الحساب الجاري (% من الناتج)",
            "Key Risks": "المخاطر الرئيسية",
            "Growth Drivers": "محركات النمو",
            "Model available": "النموذج متاح",
            "In progress": "قيد الإعداد",
            "Planned": "مخطط له",
            "Model Features": "خصائص النموذج",
            "Shock Analysis": "تحليل الصدمات",
            "Calibrated:": "المعايرة:",
            "View ${c.name} DSGE Model &rarr;": "عرض نموذج DSGE لـ ${c.name} &rarr;",
            "Foundations &rarr;": "الأسس &rarr;",
            "DSGE Model In Progress": "نموذج DSGE قيد الإعداد",
        },
        "tr": {
            "const ratingClass = o.rating.toLowerCase();": "const ratingClass = o.rating.toLowerCase();\n      const ratingLabelMap = { Stable: 'Dengeli', Cautious: 'Temkinli' };\n      const ratingLabel = ratingLabelMap[o.rating] || o.rating;",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.totalCountries}</div><div class=\"agg-stat-label\">OIC Nations</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.totalCountries}</div><div class=\"agg-stat-label\">IKT ulkeleri</div></div>",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">$${a.combinedGDP}T</div><div class=\"agg-stat-label\">Combined GDP</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">$${a.combinedGDP}T</div><div class=\"agg-stat-label\">Toplam GSYH</div></div>",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.population}B</div><div class=\"agg-stat-label\">Population</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.population}B</div><div class=\"agg-stat-label\">Nufus</div></div>",
            "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.landArea}%</div><div class=\"agg-stat-label\">World Land Area</div></div>": "<div class=\"agg-stat\"><div class=\"agg-stat-value\">${a.landArea}%</div><div class=\"agg-stat-label\">Dunya kara alani</div></div>",
            "GDP (Nominal)": "GSYH (nominal)",
            "Inflation (CPI)": "Enflasyon (TUIK)",
            "Debt/GDP": "Borc/GSYH",
            "FDI Inflows": "DYY girisleri",
            "Reserves": "Rezervler",
            "Population": "Nufus",
            "country-header-rating rating-${ratingClass}\">${o.rating} Outlook</span>": "country-header-rating rating-${ratingClass}\">${ratingLabel} gorunumu</span>",
            "Sectoral GDP Mix": "Sektorel GSYH dagilimi",
            "Key Exports": "Temel ihracatlar",
            "Main Trade Partners": "Baslica ticaret ortaklari",
            "trade openness": "ticarete aciklik",
            "Islamic finance share": "Islami finans payi",
            "Indicator": "Gosterge",
            "2025 (est.)": "2025 (tahmini)",
            "2026 (f)": "2026 (tahmin)",
            "2027 (f)": "2027 (tahmin)",
            "Real GDP Growth (%)": "Reel GSYH buyumesi (%)",
            "Inflation (%)": "Enflasyon (%)",
            "Current Account (% GDP)": "Cari denge (% GSYH)",
            "Key Risks": "Temel riskler",
            "Growth Drivers": "Buyume surukleyicileri",
            "Model available": "Model hazir",
            "In progress": "Hazirlaniyor",
            "Planned": "Planlandi",
            "Model Features": "Model ozellikleri",
            "Shock Analysis": "Sok analizi",
            "Calibrated:": "Kalibrasyon:",
            "View ${c.name} DSGE Model &rarr;": "${c.name} DSGE modelini gor &rarr;",
            "Foundations &rarr;": "Temeller &rarr;",
            "DSGE Model In Progress": "DSGE modeli hazirlaniyor",
        },
    },
}

COMMON_TEXT_FIXES: dict[str, dict[str, str]] = {
    "ar": {
        ">بيت<": ">الرئيسية<",
        ">يتعلم <span": ">تعلّم <span",
        ">أسس<": ">الأسس<",
        ">بحث<": ">الأبحاث<",
        ">مقارن<": ">الاقتصاد المقارن<",
        ">الكتب المقدسة<": ">النصوص الشرعية<",
        ">عن<": ">من نحن<",
        "استكشاف أسس": "استكشف الأسس",
        "الاقتصاد الاسلامي | أسس والبحث والاقتصاد الحي": "الاقتصاد الإسلامي | الأسس والأبحاث والاقتصاد الحي",
    },
    "tr": {
        ">Ev<": ">Ana Sayfa<",
        ">Öğrenmek <span": ">Öğren <span",
        ">Karşılaştırmalı<": ">Mukayeseli Ekonomi<",
        ">kutsal yazılar<": ">Ayet ve Hadis<",
        "Vakıflar, Araştırma ve Modern İslam Ekonomisi": "Temeller, Araştırma ve Modern İslam Ekonomisi",
        "Bunun Vakıflarla Nasıl Bağlantısı Var?": "Bunun Temellerle Baglantisi Nedir?",
        "Vakıf Vakıfları": "Vakıf",
    },
}


class TranslationCache:
    def __init__(self, path: Path) -> None:
        self.path = path
        if path.exists():
            self.data = json.loads(path.read_text(encoding="utf-8"))
        else:
            self.data = {}

    def get(self, target: str, text: str) -> str | None:
        return self.data.get(target, {}).get(text)

    def set(self, target: str, text: str, translated: str) -> None:
        self.data.setdefault(target, {})[text] = translated

    def save(self) -> None:
        self.path.write_text(
            json.dumps(self.data, ensure_ascii=False, indent=2, sort_keys=True),
            encoding="utf-8",
        )


CACHE = TranslationCache(CACHE_PATH)
TRANSLATORS: dict[str, GoogleTranslator] = {}


def log(msg: str) -> None:
    print(msg, flush=True)


def get_translator(target: str) -> GoogleTranslator:
    translator = TRANSLATORS.get(target)
    if translator is None:
        translator = GoogleTranslator(source="auto", target=target)
        TRANSLATORS[target] = translator
    return translator


def normalize_spaces(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip())


def needs_translation(text: str) -> bool:
    core = normalize_spaces(text)
    if not core:
        return False
    if re.fullmatch(r"[\d\s.,:%$€£¥+\-–—/()#&'\"*]+", core):
        return False
    if core.startswith("http://") or core.startswith("https://"):
        return False
    if "@" in core and "." in core and " " not in core:
        return False
    if re.search(r"[\u0600-\u06FF]", core) and not re.search(r"[A-Za-z]", core):
        return False
    return bool(re.search(r"[A-Za-z]", core))


def translate_text(text: str, target: str) -> str:
    if not needs_translation(text):
        return text

    leading = re.match(r"^\s*", text).group(0)
    trailing = re.search(r"\s*$", text).group(0)
    core = text[len(leading) : len(text) - len(trailing) if trailing else len(text)]
    if not core:
        return text

    cached = CACHE.get(target, core)
    if cached is not None:
        return f"{leading}{cached}{trailing}"

    translate_core_many([core], target)
    translated = CACHE.get(target, core) or core
    CACHE.set(target, core, translated)
    return f"{leading}{translated}{trailing}"


def translate_core_many(texts: list[str], target: str, batch_size: int = 25) -> None:
    pending = []
    seen = set()
    for text in texts:
        if text in seen:
            continue
        seen.add(text)
        if not needs_translation(text):
            CACHE.set(target, text, text)
            continue
        if CACHE.get(target, text) is None:
            pending.append(text)

    if not pending:
        return

    for start in range(0, len(pending), batch_size):
        batch = pending[start : start + batch_size]
        translated_batch = None
        for attempt in range(3):
            try:
                translated_batch = get_translator(target).translate_batch(batch)
                break
            except Exception:
                time.sleep(1.5 * (attempt + 1))

        if translated_batch is None or len(translated_batch) != len(batch):
            translated_batch = []
            for item in batch:
                translated_batch.append(get_translator(target).translate(item))

        for source, translated in zip(batch, translated_batch):
            CACHE.set(target, source, translated or source)
        CACHE.save()


def maybe_translate_text_node(node: NavigableString, target: str) -> None:
    if isinstance(node, Comment):
        return
    parent = node.parent
    if not parent or parent.name in SKIP_TAGS:
        return
    original = str(node)
    translated = translate_text(original, target)
    if translated != original:
        node.replace_with(NavigableString(translated))


def maybe_translate_attrs(tag: Tag, target: str) -> None:
    if tag.name == "meta":
        key = tag.get("name") or tag.get("property")
        if key in {
            "description",
            "keywords",
            "author",
            "twitter:title",
            "twitter:description",
            "og:title",
            "og:description",
        } and tag.get("content"):
            tag["content"] = translate_text(tag["content"], target)
    for attr in TRANSLATABLE_ATTRS:
        if tag.get(attr):
            tag[attr] = translate_text(tag[attr], target)


def rewrite_relative_path(value: str, locale: str) -> str:
    if not value or value.startswith(("#", "http://", "https://", "mailto:", "tel:", "data:", "javascript:")):
        return value
    if value.startswith("../"):
        return value
    if value in PAGE_LINKS or any(value.startswith(f"{page}#") for page in PAGE_LINKS):
        return value
    if value.startswith(("ur/", "ar/", "tr/")):
        return value
    if value.startswith(ROOT_ASSET_PREFIXES):
        return f"../{value}"
    return value


def rewrite_urls(soup: BeautifulSoup, locale: str) -> None:
    for tag in soup.find_all(True):
        for attr in ("href", "src", "poster"):
            if tag.get(attr):
                tag[attr] = rewrite_relative_path(tag[attr], locale)


def current_locale_for_path(path: Path) -> str:
    if path.parent == WEBSITE:
        return "en"
    return path.parent.name


def build_locale_href(page_name: str, current_locale: str, target_locale: str) -> str:
    if current_locale == target_locale:
        return page_name
    if current_locale == "en":
        return f"{target_locale}/{page_name}"
    if target_locale == "en":
        return f"../{page_name}"
    return f"../{target_locale}/{page_name}"


def replace_lang_switcher(soup: BeautifulSoup, page_name: str, current_locale: str) -> None:
    target = soup.select_one(".lang-switcher")
    if target is None:
        target = soup.select_one(".lang-toggle")
    if not target:
        return

    nav_label = LOCALES[current_locale].language_nav
    switcher = soup.new_tag("div", attrs={"class": "lang-switcher", "aria-label": nav_label})
    for locale in ("en", "ur", "ar", "tr"):
        a = soup.new_tag(
            "a",
            attrs={
                "class": "lang-toggle" + (" active" if locale == current_locale else ""),
                "href": build_locale_href(page_name, current_locale, locale),
                "lang": locale,
            },
        )
        if locale == current_locale:
            a["aria-current"] = "page"
        a.string = LOCALES[locale].native_label
        switcher.append(a)
    target.replace_with(switcher)


def update_language_links(soup: BeautifulSoup, page_name: str, current_locale: str) -> None:
    for tag in soup.find_all("link", attrs={"rel": lambda value: value and "alternate" in value}):
        if tag.get("hreflang") in {"en", "ur", "ar", "tr", "x-default"}:
            tag.decompose()

    canonical = soup.find("link", attrs={"rel": lambda value: value and "canonical" in value})
    if canonical:
        if current_locale == "en":
            canonical["href"] = f"{SITE_URL}/{page_name}"
        else:
            canonical["href"] = f"{SITE_URL}/{current_locale}/{page_name}"

    insert_after = canonical
    for locale in ("en", "ur", "ar", "tr", "x-default"):
        href_locale = "en" if locale == "x-default" else locale
        href = f"{SITE_URL}/{page_name}" if href_locale == "en" else f"{SITE_URL}/{href_locale}/{page_name}"
        alt = soup.new_tag("link", rel="alternate", hreflang=locale, href=href)
        if insert_after:
            insert_after.insert_after(alt)
            insert_after = alt


def update_html_root(soup: BeautifulSoup, locale: str) -> None:
    html = soup.find("html")
    if not html:
        return
    html["lang"] = locale
    if LOCALES[locale].html_dir == "rtl":
        html["dir"] = "rtl"
    elif html.has_attr("dir"):
        del html["dir"]


def patch_localized_scripts(html: str, page_name: str, locale: str) -> str:
    if locale == "en":
        return html

    if page_name == "dashboard.html":
        html = html.replace("../js/economic-data.js", f"../js/economic-data-{locale}.js")
    if page_name == "scriptures.html":
        html = html.replace("../js/scripture-data.js", f"../js/scripture-data-{locale}.js")
    else:
        html = html.replace("../js/scripture-data.js", f"../js/scripture-data-{locale}.js")

    if page_name in SCRIPT_REPLACEMENTS and locale in SCRIPT_REPLACEMENTS[page_name]:
        for old, new in SCRIPT_REPLACEMENTS[page_name][locale].items():
            html = html.replace(old, new)
    if locale in COMMON_TEXT_FIXES:
        for old, new in COMMON_TEXT_FIXES[locale].items():
            html = html.replace(old, new)
    return html


def patch_existing_locale_specifics(html: str, page_name: str, locale: str) -> str:
    if page_name == "dashboard.html" and locale == "ur":
        html = html.replace("../js/economic-data.js", "../js/economic-data-ur.js")
    if page_name in SCRIPT_REPLACEMENTS and locale in SCRIPT_REPLACEMENTS[page_name]:
        for old, new in SCRIPT_REPLACEMENTS[page_name][locale].items():
            html = html.replace(old, new)
    if page_name == "dashboard.html" and locale == "ur":
        html = re.sub(
            r"(const ratingClass = o\.rating\.toLowerCase\(\);\s*)(?:const ratingLabelMap = \{ Stable: 'مستحکم', Cautious: 'محتاط' \};\s*const ratingLabel = ratingLabelMap\[o\.rating\] \|\| o\.rating;\s*)+",
            r"\1const ratingLabelMap = { Stable: 'مستحکم', Cautious: 'محتاط' };\n      const ratingLabel = ratingLabelMap[o.rating] || o.rating;\n",
            html,
        )
    return html


def translate_soup(soup: BeautifulSoup, target: str) -> None:
    batch_inputs = []
    for tag in soup.find_all(True):
        if tag.name == "meta":
            key = tag.get("name") or tag.get("property")
            if key in {
                "description",
                "keywords",
                "author",
                "twitter:title",
                "twitter:description",
                "og:title",
                "og:description",
            } and tag.get("content"):
                batch_inputs.append(tag["content"].strip())
        for attr in TRANSLATABLE_ATTRS:
            if tag.get(attr):
                batch_inputs.append(tag[attr].strip())

    for node in list(soup.find_all(string=True)):
        if isinstance(node, Comment):
            continue
        parent = node.parent
        if parent and parent.name not in SKIP_TAGS:
            core = str(node).strip()
            if core:
                batch_inputs.append(core)

    translate_core_many(batch_inputs, target)

    for tag in soup.find_all(True):
        maybe_translate_attrs(tag, target)

    for node in list(soup.find_all(string=True)):
        maybe_translate_text_node(node, target)


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def serialize_html(soup: BeautifulSoup) -> str:
    return "<!DOCTYPE html>\n" + str(soup)


def load_html_soup(path: Path) -> BeautifulSoup:
    raw = path.read_text(encoding="utf-8")
    clean = re.sub(r"(?is)<!DOCTYPE html>\s*", "", raw)
    return BeautifulSoup(clean, "html.parser")


def run_node_expr(js_path: Path, expr_name: str) -> Any:
    snippet = (
        "const fs=require('fs');"
        "const vm=require('vm');"
        f"const code=fs.readFileSync({json.dumps(str(js_path))},'utf8');"
        f"const value=vm.runInNewContext(code+'; {expr_name}');"
        "process.stdout.write(JSON.stringify(value));"
    )
    out = subprocess.check_output(["node", "-e", snippet], text=True)
    return json.loads(out)


def deep_translate(value: Any, target: str, skip_keys: set[str] | None = None) -> Any:
    if skip_keys is None:
        skip_keys = set()
    if isinstance(value, dict):
        out = {}
        for key, inner in value.items():
            if key in skip_keys:
                out[key] = inner
            else:
                out[key] = deep_translate(inner, target, skip_keys)
        return out
    if isinstance(value, list):
        return [deep_translate(item, target, skip_keys) for item in value]
    if isinstance(value, str):
        return translate_text(value, target)
    return value


def collect_translatable_strings(value: Any, skip_keys: set[str] | None = None) -> list[str]:
    if skip_keys is None:
        skip_keys = set()
    items: list[str] = []
    if isinstance(value, dict):
        for key, inner in value.items():
            if key in skip_keys:
                continue
            items.extend(collect_translatable_strings(inner, skip_keys))
    elif isinstance(value, list):
        for inner in value:
            items.extend(collect_translatable_strings(inner, skip_keys))
    elif isinstance(value, str):
        items.append(value)
    return items


def update_urdu_scripture_name_ar() -> None:
    english = run_node_expr(WEBSITE / "js" / "scripture-data.js", "SCRIPTURE_DATA")
    urdu = run_node_expr(WEBSITE / "js" / "scripture-data-ur.js", "SCRIPTURE_DATA_UR")
    name_ar = {topic["id"]: topic.get("nameAr", "") for topic in english["topics"]}
    for topic in urdu["topics"]:
        topic["nameAr"] = name_ar.get(topic["id"], topic.get("nameAr", ""))
    output = "const SCRIPTURE_DATA_UR = " + json.dumps(urdu, ensure_ascii=False, indent=2) + ";\n"
    write_text(WEBSITE / "js" / "scripture-data-ur.js", output)


def generate_scripture_data() -> None:
    source = run_node_expr(WEBSITE / "js" / "scripture-data.js", "SCRIPTURE_DATA")
    for target in ("ar", "tr"):
        log(f"  scripture-data -> {target}")
        batch_inputs = []
        if target == "tr":
            batch_inputs.extend(topic["name"] for topic in source["topics"])
        batch_inputs.extend(topic["description"] for topic in source["topics"])
        for entry in source["entries"]:
            batch_inputs.extend([entry["translation"], entry["context"]])
            if entry.get("collection"):
                batch_inputs.append(entry["collection"])
        translate_core_many(batch_inputs, target)
        translated = {
            "topics": [],
            "entries": [],
        }
        for topic in source["topics"]:
            translated["topics"].append(
                {
                    **topic,
                    "name": topic["nameAr"] if target == "ar" else translate_text(topic["name"], target),
                    "nameAr": topic["nameAr"],
                    "description": translate_text(topic["description"], target),
                }
            )
        for entry in source["entries"]:
            translated["entries"].append(
                {
                    **entry,
                    "translation": translate_text(entry["translation"], target),
                    "context": translate_text(entry["context"], target),
                    "collection": translate_text(entry["collection"], target) if entry.get("collection") else entry.get("collection"),
                }
            )
        output = "const SCRIPTURE_DATA = " + json.dumps(translated, ensure_ascii=False, indent=2) + ";\n"
        write_text(WEBSITE / "js" / f"scripture-data-{target}.js", output)
        CACHE.save()


def generate_economic_data() -> None:
    source = run_node_expr(WEBSITE / "js" / "economic-data.js", "ECON_DATA")
    skip = {"lastUpdated", "code", "flag", "currency", "capital", "linkPath", "calibrationDate", "status", "rating"}
    for target in DATA_TARGETS:
        log(f"  economic-data -> {target}")
        translate_core_many(collect_translatable_strings(source, skip), target)
        translated = deep_translate(source, target, skip_keys=skip)
        output = "const ECON_DATA = " + json.dumps(translated, ensure_ascii=False, indent=2) + ";\n"
        write_text(WEBSITE / "js" / f"economic-data-{target}.js", output)
        CACHE.save()


def generate_locale_page(page_name: str, target: str) -> None:
    source_path = WEBSITE / page_name
    target_path = WEBSITE / target / page_name
    soup = load_html_soup(source_path)
    update_html_root(soup, target)
    translate_soup(soup, target)
    rewrite_urls(soup, target)
    replace_lang_switcher(soup, page_name, target)
    update_language_links(soup, page_name, target)
    html = serialize_html(soup)
    html = patch_localized_scripts(html, page_name, target)
    write_text(target_path, html)


def patch_existing_page(path: Path) -> None:
    locale = current_locale_for_path(path)
    page_name = path.name
    soup = load_html_soup(path)
    update_html_root(soup, locale)
    replace_lang_switcher(soup, page_name, locale)
    update_language_links(soup, page_name, locale)
    html = serialize_html(soup)
    if locale == "ur":
        html = patch_existing_locale_specifics(html, page_name, locale)
    write_text(path, html)


def regenerate_sitemap() -> None:
    sitemap_path = WEBSITE / "sitemap.xml"
    original = sitemap_path.read_text(encoding="utf-8")
    lastmod_match = re.search(r"<lastmod>([^<]+)</lastmod>", original)
    default_lastmod = lastmod_match.group(1) if lastmod_match else "2026-04-19"

    priorities = {
        "index.html": "1.0",
        "podcast.html": "0.8",
        "blog.html": "0.8",
        "dashboard.html": "0.7",
    }
    changefreqs = {
        "index.html": "weekly",
        "podcast.html": "monthly",
        "blog.html": "weekly",
        "dashboard.html": "weekly",
    }

    def url_entry(loc: str, page_name: str) -> str:
        return (
            f"<url><loc>{loc}</loc><lastmod>{default_lastmod}</lastmod>"
            f"<changefreq>{changefreqs.get(page_name, 'monthly')}</changefreq>"
            f"<priority>{priorities.get(page_name, '0.7')}</priority></url>"
        )

    urls = []
    for page in TOP_LEVEL_PAGES:
        urls.append(url_entry(f"{SITE_URL}/{page}", page))
    for locale in ("ur", "ar", "tr"):
        for page in TOP_LEVEL_PAGES:
            urls.append(url_entry(f"{SITE_URL}/{locale}/{page}", page))

    existing_extra = re.findall(r"<url>.*?</url>", original, flags=re.DOTALL)
    for entry in existing_extra:
        if any(f"{SITE_URL}/{page}" in entry for page in TOP_LEVEL_PAGES):
            continue
        if any(f"{SITE_URL}/{locale}/" in entry for locale in ("ur", "ar", "tr")) and any(page in entry for page in TOP_LEVEL_PAGES):
            continue
        urls.append(entry.replace("\n", ""))

    body = "\n".join(urls)
    sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" + body + "\n</urlset>\n"
    write_text(sitemap_path, sitemap)


def main() -> int:
    log("Updating localized data assets...")
    update_urdu_scripture_name_ar()
    generate_scripture_data()
    generate_economic_data()
    CACHE.save()

    log("Generating Arabic and Turkish top-level pages...")
    for target in TRANSLATION_TARGETS:
        for page in TOP_LEVEL_PAGES:
            log(f"  {target}/{page}")
            generate_locale_page(page, target)
            CACHE.save()

    log("Patching English and Urdu language switchers + alternates...")
    for locale_dir in (WEBSITE, WEBSITE / "ur", WEBSITE / "ar", WEBSITE / "tr"):
        for page in TOP_LEVEL_PAGES:
            path = locale_dir / page
            if path.exists():
                patch_existing_page(path)

    log("Refreshing sitemap...")
    regenerate_sitemap()
    CACHE.save()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
