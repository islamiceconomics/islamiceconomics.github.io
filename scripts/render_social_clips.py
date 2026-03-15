#!/usr/bin/env python3
"""
Render vertical short-video teasers from generated social campaign files.

The renderer prefers local source video when available and falls back to an
image-based motion poster when the campaign only has a local image asset.
"""

import argparse
import json
import logging
import shutil
import subprocess
import sys
import tempfile
import textwrap
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


TARGET_WIDTH = 1080
TARGET_HEIGHT = 1920
TARGET_FPS = 30
DEFAULT_DURATION = 45
COMMON_FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]


def get_project_root() -> Path:
    return Path(__file__).resolve().parent.parent


def normalize_whitespace(value: str) -> str:
    return " ".join((value or "").split())


def escape_filter_path(path: Path) -> str:
    return str(path).replace("\\", "/").replace(":", "\\:").replace("'", "\\'")


def require_binary(name: str, dry_run: bool) -> None:
    if dry_run:
        return
    if shutil.which(name):
        return
    raise SystemExit(f"{name} is required to render short clips.")


def find_fontfile() -> Optional[Path]:
    for candidate in COMMON_FONT_PATHS:
        path = Path(candidate)
        if path.exists():
            return path
    return None


def font_clause() -> str:
    fontfile = find_fontfile()
    if fontfile:
        return f"fontfile='{escape_filter_path(fontfile)}'"
    return "font='Sans'"


def wrap_text(value: str, width: int) -> str:
    text = normalize_whitespace(value)
    if not text:
        return ""
    return textwrap.fill(text, width=width)


def parse_time_window(raw: str, fallback_start: float, fallback_end: float) -> Tuple[float, float]:
    match = None
    if raw:
        import re

        match = re.search(r"(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)", raw)

    if not match:
        return fallback_start, fallback_end

    start = float(match.group(1))
    end = float(match.group(2))
    if end <= start:
        return fallback_start, fallback_end
    return start, end


def ffprobe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "json",
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    payload = json.loads(result.stdout)
    return float(payload["format"]["duration"])


def select_clip_start(duration: float, clip_duration: float) -> float:
    if duration <= clip_duration + 3:
        return 0.0
    if duration <= 90:
        return min(12.0, max(0.0, duration - clip_duration - 2))
    return min(max(duration * 0.18, 18.0), max(0.0, duration - clip_duration - 4))


def drawtext_filter(
    input_label: str,
    output_label: str,
    textfile: Path,
    fontsize: int,
    y_expr: str,
    enable_expr: str = "",
    fontcolor: str = "white",
    box_color: str = "0x0F2B24CC",
    box_border: int = 24,
) -> str:
    options = [
        font_clause(),
        f"textfile='{escape_filter_path(textfile)}'",
        f"fontcolor={fontcolor}",
        f"fontsize={fontsize}",
        "line_spacing=10",
        "x=(w-text_w)/2",
        f"y={y_expr}",
        "fix_bounds=true",
        "shadowcolor=black@0.65",
        "shadowx=2",
        "shadowy=2",
        "box=1",
        f"boxcolor={box_color}",
        f"boxborderw={box_border}",
    ]
    if enable_expr:
        options.append(f"enable='{enable_expr}'")

    return f"[{input_label}]drawtext={':'.join(options)}[{output_label}]"


def build_text_assets(temp_dir: Path, campaign: Dict[str, Any], clip_duration: int) -> Dict[str, Any]:
    channels = campaign["channels"]
    short_video = channels["short_video"]
    shots = short_video.get("shot_list") or []
    title = wrap_text(short_video.get("title") or campaign["source"]["title"], 26)
    footer = "IslamicEconomics.org"
    hook = wrap_text(short_video.get("hook") or campaign["source"]["summary"], 28)

    text_files: Dict[str, Any] = {}

    title_path = temp_dir / "title.txt"
    title_path.write_text(title, encoding="utf-8")
    text_files["title"] = title_path

    footer_path = temp_dir / "footer.txt"
    footer_path.write_text(footer, encoding="utf-8")
    text_files["footer"] = footer_path

    segments = []
    fallback_windows = [(0, 5), (5, 12), (12, 24), (24, 36), (36, clip_duration)]
    if not shots:
        shots = [
            {"time": "0-6s", "on_screen_text": hook},
            {"time": "6-18s", "on_screen_text": campaign["source"]["summary"]},
            {"time": "18-32s", "on_screen_text": "Islamic economics, history, and institutions in one clip."},
            {"time": "32-45s", "on_screen_text": "Watch more at IslamicEconomics.org"},
        ]

    for index, shot in enumerate(shots[:5]):
        start, end = parse_time_window(
            str(shot.get("time", "")),
            fallback_windows[min(index, len(fallback_windows) - 1)][0],
            fallback_windows[min(index, len(fallback_windows) - 1)][1],
        )
        text_value = wrap_text(shot.get("on_screen_text") or hook, 22)
        text_path = temp_dir / f"segment-{index}.txt"
        text_path.write_text(text_value, encoding="utf-8")
        segments.append({"path": text_path, "start": start, "end": end})

    text_files["segments"] = segments
    return text_files


def build_filter_complex(render_mode: str, text_assets: Dict[str, Any], clip_duration: int) -> str:
    if render_mode == "video":
        filters = [
            f"[0:v]split=2[bgsrc][fgsrc]",
            (
                f"[bgsrc]scale={TARGET_WIDTH}:{TARGET_HEIGHT}:force_original_aspect_ratio=increase,"
                f"crop={TARGET_WIDTH}:{TARGET_HEIGHT},boxblur=18:2[bg]"
            ),
            f"[fgsrc]scale=980:1320:force_original_aspect_ratio=decrease[fg]",
            "[bg][fg]overlay=(W-w)/2:(H-h)/2+40[base0]",
        ]
    else:
        filters = [
            f"[0:v]split=2[bgsrc][fgsrc]",
            (
                f"[bgsrc]scale={TARGET_WIDTH}:{TARGET_HEIGHT}:force_original_aspect_ratio=increase,"
                f"crop={TARGET_WIDTH}:{TARGET_HEIGHT},boxblur=18:2[bg]"
            ),
            "[fgsrc]scale=920:920:force_original_aspect_ratio=decrease[fg]",
            "[bg][fg]overlay=(W-w)/2:(H-h)/2-20[base0]",
        ]

    filters.append(f"[base0]fps={TARGET_FPS},format=yuv420p[base1]")
    filters.append(
        drawtext_filter(
            "base1",
            "base2",
            text_assets["title"],
            fontsize=54,
            y_expr="110",
            box_border=28,
        )
    )
    filters.append(
        drawtext_filter(
            "base2",
            "base3",
            text_assets["footer"],
            fontsize=34,
            y_expr="1820",
            box_color="0x102418D0",
            box_border=18,
        )
    )

    current = "base3"
    for index, segment in enumerate(text_assets["segments"]):
        next_label = f"seg{index}"
        filters.append(
            drawtext_filter(
                current,
                next_label,
                segment["path"],
                fontsize=60,
                y_expr="1460",
                enable_expr=f"between(t,{segment['start']:.2f},{segment['end']:.2f})",
                box_color="0x102418DE",
                box_border=26,
            )
        )
        current = next_label

    fade_out_start = max(0.5, clip_duration - 0.6)
    filters.append(f"[{current}]fade=t=in:st=0:d=0.35,fade=t=out:st={fade_out_start:.2f}:d=0.6[vout]")
    return ";".join(filters)


def load_campaigns(project_root: Path, limit: int, source_content_id: str) -> List[Path]:
    campaign_dir = project_root / "social" / "campaigns"
    files = sorted(campaign_dir.glob("*.json"), key=lambda path: path.stat().st_mtime, reverse=True)
    if source_content_id:
        matched = []
        for path in files:
            payload = json.loads(path.read_text(encoding="utf-8"))
            if payload.get("source", {}).get("content_id") == source_content_id:
                matched.append(path)
        return matched[:limit]
    return files[:limit]


def choose_render_mode(campaign: Dict[str, Any]) -> Tuple[str, Optional[Path]]:
    source = campaign["source"]
    video_path = Path(source.get("local_video_path") or "")
    if video_path and video_path.exists():
        return "video", video_path

    image_path = Path(source.get("local_asset_path") or "")
    if image_path and image_path.exists():
        return "image", image_path

    return "none", None


def render_command(
    render_mode: str,
    source_path: Path,
    output_path: Path,
    text_assets: Dict[str, Any],
    clip_duration: int,
    dry_run: bool,
) -> Tuple[List[str], Dict[str, Any]]:
    filter_complex = build_filter_complex(render_mode, text_assets, clip_duration)
    metadata: Dict[str, Any] = {
        "mode": render_mode,
        "output_path": str(output_path),
        "duration": clip_duration,
        "source_path": str(source_path),
    }

    if render_mode == "video":
        require_binary("ffprobe", dry_run)
        duration = ffprobe_duration(source_path) if not dry_run else float(clip_duration)
        start_time = select_clip_start(duration, clip_duration)
        metadata["clip_start"] = round(start_time, 2)
        metadata["source_duration"] = round(duration, 2)

        command = [
            "ffmpeg",
            "-y",
            "-ss",
            f"{start_time:.2f}",
            "-t",
            str(clip_duration),
            "-i",
            str(source_path),
            "-filter_complex",
            filter_complex,
            "-map",
            "[vout]",
            "-map",
            "0:a?",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "21",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-shortest",
            "-movflags",
            "+faststart",
            str(output_path),
        ]
        return command, metadata

    ambient_path = get_project_root() / "Website" / "podcast" / "audio" / "podcast_bg.mp3"
    if not ambient_path.exists():
        ambient_path = get_project_root() / "Website" / "podcast" / "audio" / "podcast_bg.wav"

    command = [
        "ffmpeg",
        "-y",
        "-loop",
        "1",
        "-framerate",
        str(TARGET_FPS),
        "-i",
        str(source_path),
    ]
    if ambient_path.exists():
        command.extend(["-stream_loop", "-1", "-i", str(ambient_path)])
        audio_map = "1:a:0"
        metadata["ambient_audio"] = str(ambient_path)
    else:
        command.extend(["-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100"])
        audio_map = "1:a:0"
        metadata["ambient_audio"] = "generated silence"

    command.extend(
        [
            "-t",
            str(clip_duration),
            "-filter_complex",
            filter_complex,
            "-map",
            "[vout]",
            "-map",
            audio_map,
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "22",
            "-pix_fmt",
            "yuv420p",
            "-c:a",
            "aac",
            "-b:a",
            "128k",
            "-shortest",
            "-movflags",
            "+faststart",
            str(output_path),
        ]
    )
    return command, metadata


def render_campaign(
    campaign_path: Path,
    output_dir: Path,
    clip_duration: int,
    dry_run: bool,
    force: bool,
) -> Optional[Path]:
    campaign = json.loads(campaign_path.read_text(encoding="utf-8"))
    campaign_id = campaign["campaign_id"]
    render_mode, source_path = choose_render_mode(campaign)

    if render_mode == "none" or not source_path:
        logger.warning("Skipping %s: no local video or image asset available.", campaign_id)
        return None

    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{campaign_id}.mp4"
    metadata_path = output_dir / f"{campaign_id}.json"

    if output_path.exists() and not force:
        logger.info("Skipping %s: clip already exists.", campaign_id)
        return output_path

    require_binary("ffmpeg", dry_run)

    with tempfile.TemporaryDirectory(prefix="ie-short-") as temp_name:
        temp_dir = Path(temp_name)
        text_assets = build_text_assets(temp_dir, campaign, clip_duration)
        command, metadata = render_command(
            render_mode=render_mode,
            source_path=source_path,
            output_path=output_path,
            text_assets=text_assets,
            clip_duration=clip_duration,
            dry_run=dry_run,
        )

        metadata["campaign_id"] = campaign_id
        metadata["campaign_path"] = str(campaign_path)

        if dry_run:
            logger.info("Dry run for %s", campaign_id)
            logger.info("Mode: %s", render_mode)
            logger.info("Command: %s", " ".join(command))
            return output_path

        subprocess.run(command, check=True)
        metadata_path.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
        logger.info("Rendered %s", output_path)
        return output_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Render short-video teasers from campaign JSON.")
    parser.add_argument("--limit", type=int, default=1, help="Number of recent campaigns to render.")
    parser.add_argument(
        "--source-content-id",
        default="",
        help="Render the campaign matching a specific source content id.",
    )
    parser.add_argument(
        "--output-dir",
        default="social/shorts/rendered",
        help="Directory for rendered clips and metadata.",
    )
    parser.add_argument(
        "--duration",
        type=int,
        default=DEFAULT_DURATION,
        help="Clip duration in seconds.",
    )
    parser.add_argument("--force", action="store_true", help="Re-render even if the clip already exists.")
    parser.add_argument("--dry-run", action="store_true", help="Print the ffmpeg command without rendering.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    project_root = get_project_root()
    output_dir = project_root / args.output_dir

    campaign_files = load_campaigns(
        project_root=project_root,
        limit=max(1, args.limit),
        source_content_id=args.source_content_id,
    )
    if not campaign_files:
        logger.info("No campaign files found to render.")
        return 0

    for campaign_path in campaign_files:
        render_campaign(
            campaign_path=campaign_path,
            output_dir=output_dir,
            clip_duration=max(10, args.duration),
            dry_run=args.dry_run,
            force=args.force,
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
