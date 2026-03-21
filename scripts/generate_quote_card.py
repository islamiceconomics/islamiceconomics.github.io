#!/usr/bin/env python3
"""Generate Instagram quote cards for Islamic Economics posts.

Creates 1080x1080 images with:
- Dark background (#0d3d25 primary dark)
- Islamic geometric border pattern (gold accents)
- Playfair Display for the quote text
- Inter for the attribution/handle
- 8-pointed star ornament
- Brand-consistent with islamiceconomics.github.io

Usage:
    python3 scripts/generate_quote_card.py "Your quote text here"
    python3 scripts/generate_quote_card.py --text "Quote" --output social/cards/card.png
    python3 scripts/generate_quote_card.py --batch social/campaigns/2026-03-20-*.json
"""

from __future__ import annotations

import argparse
import json
import math
import os
import sys
import textwrap
from pathlib import Path
from typing import List, Optional, Tuple

from PIL import Image, ImageDraw, ImageFont

# ── Dimensions ──────────────────────────────────────────────────────────
SIZE = 1080
PADDING = 120
TEXT_AREA_WIDTH = SIZE - (PADDING * 2)

# ── Colors (from website CSS) ──────────────────────────────────────────
BG_COLOR = (13, 61, 37)          # #0d3d25 primary dark
BG_GRADIENT_TOP = (13, 61, 37)   # #0d3d25
BG_GRADIENT_BOT = (26, 39, 68)   # #1a2744 secondary navy
TEXT_COLOR = (250, 249, 247)      # #faf9f7 warm off-white
TEXT_SECONDARY = (212, 183, 106)  # #d4b76a accent light gold
GOLD = (184, 150, 46)            # #b8962e accent gold
GOLD_LIGHT = (212, 183, 106)     # #d4b76a
GOLD_DIM = (184, 150, 46, 40)    # Low opacity gold for patterns
BORDER_COLOR = (184, 150, 46, 80)

# ── Paths ───────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
FONTS_DIR = PROJECT_ROOT / "assets" / "fonts"
OUTPUT_DIR = PROJECT_ROOT / "social" / "cards"
# Cards also saved here so GitHub Pages auto-hosts them at
# https://islamiceconomics.github.io/social/cards/<filename>.png
WEBSITE_CARDS_DIR = PROJECT_ROOT / "Website" / "social" / "cards"
CARDS_BASE_URL = "https://islamiceconomics.github.io/social/cards"

HANDLE = "@theislamicecon"
BRAND = "Islamic Economics"


def get_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    """Load a bundled font at the given size."""
    font_map = {
        "playfair": FONTS_DIR / "PlayfairDisplay.ttf",
        "inter": FONTS_DIR / "Inter.ttf",
    }
    path = font_map.get(name)
    if not path or not path.exists():
        # Fallback to default
        return ImageFont.load_default()
    return ImageFont.truetype(str(path), size)


def draw_gradient_bg(img: Image.Image) -> None:
    """Draw a subtle vertical gradient background."""
    draw = ImageDraw.Draw(img)
    for y in range(SIZE):
        ratio = y / SIZE
        r = int(BG_GRADIENT_TOP[0] + (BG_GRADIENT_BOT[0] - BG_GRADIENT_TOP[0]) * ratio)
        g = int(BG_GRADIENT_TOP[1] + (BG_GRADIENT_BOT[1] - BG_GRADIENT_TOP[1]) * ratio)
        b = int(BG_GRADIENT_TOP[2] + (BG_GRADIENT_BOT[2] - BG_GRADIENT_TOP[2]) * ratio)
        draw.line([(0, y), (SIZE - 1, y)], fill=(r, g, b))


def draw_geometric_border(draw: ImageDraw.Draw) -> None:
    """Draw a subtle Islamic geometric border frame."""
    margin = 40
    inner_margin = 56
    corner_size = 24

    # Outer thin line
    draw.rectangle(
        [margin, margin, SIZE - margin - 1, SIZE - margin - 1],
        outline=GOLD + (60,) if len(GOLD) == 3 else GOLD,
        width=1,
    )

    # Inner thin line
    draw.rectangle(
        [inner_margin, inner_margin, SIZE - inner_margin - 1, SIZE - inner_margin - 1],
        outline=GOLD + (40,) if len(GOLD) == 3 else GOLD,
        width=1,
    )

    # Corner ornaments (small diamond shapes at each corner)
    corners = [
        (margin, margin),
        (SIZE - margin, margin),
        (SIZE - margin, SIZE - margin),
        (margin, SIZE - margin),
    ]
    for cx, cy in corners:
        d = corner_size // 2
        diamond = [(cx, cy - d), (cx + d, cy), (cx, cy + d), (cx - d, cy)]
        draw.polygon(diamond, fill=GOLD_LIGHT + (70,) if len(GOLD_LIGHT) == 3 else GOLD_LIGHT)


def draw_geometric_pattern(overlay: Image.Image) -> None:
    """Draw subtle repeating geometric pattern in the background."""
    draw = ImageDraw.Draw(overlay)
    tile = 80
    alpha = 12  # Very subtle

    for x in range(0, SIZE, tile):
        for y in range(0, SIZE, tile):
            cx, cy = x + tile // 2, y + tile // 2
            r = tile // 3
            # Small diamond
            pts = [(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)]
            draw.polygon(pts, outline=(*GOLD[:3], alpha))
            # Inner circle suggestion
            draw.ellipse(
                [cx - r // 2, cy - r // 2, cx + r // 2, cy + r // 2],
                outline=(*GOLD[:3], alpha),
            )


def draw_eight_pointed_star(draw: ImageDraw.Draw, cx: int, cy: int, size: int,
                            fill: Tuple[int, ...]) -> None:
    """Draw an 8-pointed star (Islamic motif) at the given center."""
    points = []
    for i in range(8):
        angle = math.radians(i * 45 - 90)
        r = size if i % 2 == 0 else size * 0.4
        px = cx + r * math.cos(angle)
        py = cy + r * math.sin(angle)
        points.append((px, py))
    draw.polygon(points, fill=fill)


def wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int) -> List[str]:
    """Word-wrap text to fit within max_width pixels."""
    words = text.split()
    lines: List[str] = []
    current_line = ""

    for word in words:
        test_line = f"{current_line} {word}".strip()
        bbox = font.getbbox(test_line)
        width = bbox[2] - bbox[0]
        if width <= max_width:
            current_line = test_line
        else:
            if current_line:
                lines.append(current_line)
            current_line = word

    if current_line:
        lines.append(current_line)

    return lines


def choose_font_size(text: str, max_width: int, max_height: int) -> Tuple[ImageFont.FreeTypeFont, List[str]]:
    """Find the largest font size that fits the text in the area."""
    for size in range(52, 24, -2):
        font = get_font("playfair", size)
        lines = wrap_text(text, font, max_width)
        line_height = int(size * 1.5)
        total_height = len(lines) * line_height
        if total_height <= max_height and len(lines) <= 12:
            return font, lines
    # Minimum size fallback
    font = get_font("playfair", 24)
    lines = wrap_text(text, font, max_width)
    return font, lines


def generate_card(text: str, output_path: Optional[str] = None) -> Path:
    """Generate a single quote card image.

    Args:
        text: The quote/insight text.
        output_path: Optional output file path. Auto-generated if not provided.

    Returns:
        Path to the generated image.
    """
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if output_path:
        out = Path(output_path)
    else:
        # Auto-name based on content hash
        import hashlib
        h = hashlib.md5(text.encode()).hexdigest()[:8]
        out = OUTPUT_DIR / f"card_{h}.png"

    # ── Create base image with gradient ─────────────────────────────
    img = Image.new("RGBA", (SIZE, SIZE), BG_COLOR + (255,))
    draw_gradient_bg(img)

    # ── Geometric pattern overlay ───────────────────────────────────
    pattern_overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw_geometric_pattern(pattern_overlay)
    img = Image.alpha_composite(img, pattern_overlay)

    draw = ImageDraw.Draw(img)

    # ── Border frame ────────────────────────────────────────────────
    draw_geometric_border(draw)

    # ── Top ornament (8-pointed star) ───────────────────────────────
    draw_eight_pointed_star(draw, SIZE // 2, 90, 12, GOLD_LIGHT)

    # ── Decorative line under star ──────────────────────────────────
    line_y = 112
    line_half = 80
    draw.line(
        [(SIZE // 2 - line_half, line_y), (SIZE // 2 + line_half, line_y)],
        fill=(*GOLD_LIGHT, 100),
        width=1,
    )

    # ── Quote text ──────────────────────────────────────────────────
    text_top = 160
    text_bottom = SIZE - 220  # Leave room for attribution
    max_text_height = text_bottom - text_top

    font, lines = choose_font_size(text, TEXT_AREA_WIDTH, max_text_height)
    font_size = font.size if hasattr(font, 'size') else 36
    line_height = int(font_size * 1.5)
    total_text_height = len(lines) * line_height

    # Center text block vertically in the available area
    y_start = text_top + (max_text_height - total_text_height) // 2

    for i, line in enumerate(lines):
        bbox = font.getbbox(line)
        line_width = bbox[2] - bbox[0]
        x = (SIZE - line_width) // 2
        y = y_start + i * line_height
        draw.text((x, y), line, font=font, fill=TEXT_COLOR)

    # ── Bottom decorative line ──────────────────────────────────────
    bottom_line_y = SIZE - 200
    draw.line(
        [(SIZE // 2 - line_half, bottom_line_y), (SIZE // 2 + line_half, bottom_line_y)],
        fill=(*GOLD_LIGHT, 100),
        width=1,
    )

    # ── Bottom star ─────────────────────────────────────────────────
    draw_eight_pointed_star(draw, SIZE // 2, bottom_line_y + 22, 8, GOLD_LIGHT)

    # ── Handle / Attribution ────────────────────────────────────────
    handle_font = get_font("inter", 22)
    bbox = handle_font.getbbox(HANDLE)
    handle_width = bbox[2] - bbox[0]
    draw.text(
        ((SIZE - handle_width) // 2, SIZE - 160),
        HANDLE,
        font=handle_font,
        fill=TEXT_SECONDARY,
    )

    brand_font = get_font("inter", 16)
    bbox = brand_font.getbbox(BRAND)
    brand_width = bbox[2] - bbox[0]
    draw.text(
        ((SIZE - brand_width) // 2, SIZE - 130),
        BRAND,
        font=brand_font,
        fill=(*TEXT_SECONDARY[:3], 150) if len(TEXT_SECONDARY) >= 3 else TEXT_SECONDARY,
    )

    # ── Save ────────────────────────────────────────────────────────
    out.parent.mkdir(parents=True, exist_ok=True)
    final = img.convert("RGB")
    final.save(str(out), "PNG", quality=95)

    # Also save to Website directory for GitHub Pages hosting
    WEBSITE_CARDS_DIR.mkdir(parents=True, exist_ok=True)
    web_copy = WEBSITE_CARDS_DIR / out.name
    final.save(str(web_copy), "PNG", quality=95)

    return out


def get_public_url(card_path: Path) -> str:
    """Return the GitHub Pages public URL for a card."""
    return f"{CARDS_BASE_URL}/{card_path.name}"


def generate_card_with_url(text: str, output_path: Optional[str] = None) -> Tuple[Path, str]:
    """Generate a card and return both the local path and public URL."""
    path = generate_card(text, output_path)
    url = get_public_url(path)
    return path, url


def generate_from_campaign(campaign_path: str) -> List[Path]:
    """Generate quote cards from a campaign JSON file."""
    with open(campaign_path, "r") as f:
        campaign = json.load(f)

    cards = []
    channels = campaign.get("channels", {})

    # Use Instagram caption if available, otherwise X single post
    if "instagram" in channels:
        text = channels["instagram"].get("caption", "")
    elif "x" in channels:
        text = channels["x"].get("single_post", "")
    else:
        return cards

    if text:
        card_path = generate_card(text)
        cards.append(card_path)
        print(f"Generated: {card_path}")

    return cards


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate Instagram quote cards")
    parser.add_argument("text", nargs="?", help="Quote text (if not using --batch)")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument(
        "--batch",
        help="Generate cards from campaign JSON file(s)",
        nargs="+",
    )
    parser.add_argument(
        "--preview",
        action="store_true",
        help="Open the generated image after creation (macOS)",
    )
    args = parser.parse_args()

    if args.batch:
        all_cards = []
        for path in args.batch:
            cards = generate_from_campaign(path)
            all_cards.extend(cards)
        print(f"\nGenerated {len(all_cards)} card(s).")
        return 0

    if not args.text:
        parser.error("Provide quote text or use --batch with campaign JSON files.")

    card_path = generate_card(args.text, args.output)
    print(f"Generated: {card_path}")

    if args.preview:
        os.system(f'open "{card_path}"')

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
