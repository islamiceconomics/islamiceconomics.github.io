#!/usr/bin/env python3
"""
Podcast Audio Mixer — Automated post-production for Islamic Economics podcast.

Takes a voice recording and produces a polished podcast episode with:
  - Intro music (fades in, then fades under the voice)
  - Subtle background music throughout (looped if needed)
  - Outro music (fades in as voice ends, then plays out)

Usage:
    python scripts/mix_podcast.py <voice_file> [--output <output_file>]
    python scripts/mix_podcast.py Podcast/episodes/01-islamic-economic-history/The_Forgotten_History.m4a
    python scripts/mix_podcast.py voice.m4a --output Website/podcast/audio/ep01-mixed.m4a
    python scripts/mix_podcast.py voice.m4a --intro my_intro.wav --bg my_bg.wav --outro my_outro.wav

Options:
    --output, -o     Output file path (default: same folder as input, with '-mixed' suffix)
    --intro          Custom intro music file (default: Website/podcast/audio/podcast_intro.wav)
    --bg             Custom background music file (default: Website/podcast/audio/podcast_bg.wav)
    --outro          Custom outro music file (default: Website/podcast/audio/podcast_outro.wav)
    --intro-volume   Intro music volume in dB (default: -3)
    --bg-volume      Background music volume in dB relative to voice (default: -22)
    --outro-volume   Outro music volume in dB (default: -3)
    --crossfade      Crossfade duration in seconds between intro and voice (default: 2.0)
    --no-bg          Skip background music, only add intro and outro
    --preview        Generate a 30-second preview instead of full episode

Requirements:
    pip install pydub
    ffmpeg must be installed (brew install ffmpeg on Mac)
"""

import argparse
import os
import sys
from pathlib import Path

try:
    from pydub import AudioSegment
    from pydub.effects import normalize as pydub_normalize
except ImportError:
    print("Error: pydub is required. Install with: pip install pydub")
    print("Also ensure ffmpeg is installed: brew install ffmpeg")
    sys.exit(1)


def find_project_root():
    """Find the project root directory."""
    current = Path(__file__).resolve().parent
    while current != current.parent:
        if (current / 'Website').is_dir():
            return current
        current = current.parent
    return Path(__file__).resolve().parent.parent


def get_default_music_path(filename):
    """Get default path for music files."""
    root = find_project_root()
    return root / 'Website' / 'podcast' / 'audio' / filename


def load_audio(filepath):
    """Load an audio file, supporting m4a, mp3, wav, ogg, etc."""
    filepath = str(filepath)
    ext = os.path.splitext(filepath)[1].lower().lstrip('.')

    format_map = {
        'm4a': 'mp4',
        'mp4': 'mp4',
        'mp3': 'mp3',
        'wav': 'wav',
        'ogg': 'ogg',
        'flac': 'flac',
        'aac': 'aac',
    }

    fmt = format_map.get(ext, ext)
    print(f"  Loading: {filepath} (format: {fmt})")
    return AudioSegment.from_file(filepath, format=fmt)


def loop_audio(audio, target_duration_ms):
    """Loop audio to fill the target duration."""
    if len(audio) >= target_duration_ms:
        return audio[:target_duration_ms]

    loops_needed = (target_duration_ms // len(audio)) + 1
    looped = audio * loops_needed
    return looped[:target_duration_ms]


def mix_podcast(voice_path, output_path=None, intro_path=None, bg_path=None,
                outro_path=None, intro_volume=-3, bg_volume=-22,
                outro_volume=-3, crossfade_s=2.0, no_bg=False, preview=False):
    """
    Mix a podcast episode with intro, background, and outro music.

    Timeline:
    |-- INTRO (plays alone) --|-- CROSSFADE --|-- VOICE + BG --|-- CROSSFADE --|-- OUTRO (plays alone) --|
    """

    print("\n=== Islamic Economics Podcast Mixer ===\n")

    # --- Load voice ---
    print("Loading voice track...")
    voice = load_audio(voice_path)
    voice = pydub_normalize(voice)
    print(f"  Voice duration: {len(voice)/1000:.1f}s")

    if preview:
        # Take first 25 seconds of voice for preview
        voice = voice[:25000]
        print(f"  Preview mode: trimmed to {len(voice)/1000:.1f}s")

    # --- Load music files ---
    intro_path = intro_path or get_default_music_path('podcast_intro.wav')
    bg_path = bg_path or get_default_music_path('podcast_bg.wav')
    outro_path = outro_path or get_default_music_path('podcast_outro.wav')

    has_intro = os.path.exists(intro_path)
    has_bg = os.path.exists(bg_path) and not no_bg
    has_outro = os.path.exists(outro_path)

    if has_intro:
        print("\nLoading intro music...")
        intro = load_audio(intro_path)
        intro = intro + intro_volume  # Adjust volume
        print(f"  Intro duration: {len(intro)/1000:.1f}s at {intro_volume}dB")
    else:
        print(f"\n  No intro found at {intro_path}, skipping...")
        intro = AudioSegment.silent(duration=0)

    if has_bg:
        print("\nLoading background music...")
        bg = load_audio(bg_path)
        # Loop background to match voice duration + some buffer
        bg = loop_audio(bg, len(voice) + 5000)
        bg = bg + bg_volume  # Make it very quiet
        print(f"  Background: looped to {len(bg)/1000:.1f}s at {bg_volume}dB")
    else:
        if no_bg:
            print("\n  Background music disabled (--no-bg)")
        else:
            print(f"\n  No background found at {bg_path}, skipping...")

    if has_outro:
        print("\nLoading outro music...")
        outro = load_audio(outro_path)
        outro = outro + outro_volume
        print(f"  Outro duration: {len(outro)/1000:.1f}s at {outro_volume}dB")
    else:
        print(f"\n  No outro found at {outro_path}, skipping...")
        outro = AudioSegment.silent(duration=0)

    # --- Build the mix ---
    print("\nMixing...")
    crossfade_ms = int(crossfade_s * 1000)

    # Start with silence matching the sample rate/channels of voice
    # 1) Add intro with fade-in
    if has_intro and len(intro) > 0:
        intro_with_fade = intro.fade_in(1500)
        # Create the intro portion that plays alone (before voice starts)
        intro_alone_duration = max(0, len(intro) - crossfade_ms)

        if intro_alone_duration > 0:
            # Intro plays alone, then starts crossfading
            intro_tail = intro[-crossfade_ms:].fade_out(crossfade_ms)

            # Start building: intro alone portion
            mix = intro[:intro_alone_duration]

            # Crossfade region: intro fading out + voice fading in
            voice_start = voice[:crossfade_ms].fade_in(crossfade_ms)
            crossfade_segment = intro_tail.overlay(voice_start)
            mix = mix + crossfade_segment

            # Rest of voice
            voice_remaining = voice[crossfade_ms:]
        else:
            # Intro is shorter than crossfade, just overlay
            mix = intro.overlay(voice[:len(intro)])
            voice_remaining = voice[len(intro):]
    else:
        mix = AudioSegment.silent(duration=0)
        voice_remaining = voice

    # 2) Add the rest of the voice
    mix = mix + voice_remaining

    # 3) Overlay background music on the voice portion
    if has_bg and len(bg) > 0:
        # Background starts when voice starts and runs through the voice
        voice_start_ms = len(intro) - crossfade_ms if has_intro and len(intro) > crossfade_ms else 0
        voice_start_ms = max(0, voice_start_ms)

        # Fade background in and out gently
        bg_for_voice = bg[:len(voice)]
        bg_for_voice = bg_for_voice.fade_in(5000).fade_out(5000)

        mix = mix.overlay(bg_for_voice, position=voice_start_ms)

    # 4) Add outro with crossfade
    if has_outro and len(outro) > 0:
        outro_with_fade = outro.fade_in(1000).fade_out(2500)

        # Crossfade: last part of voice fades out as outro fades in
        if len(mix) > crossfade_ms:
            # Fade out the tail of the mix
            mix_tail = mix[-crossfade_ms:]
            mix_body = mix[:-crossfade_ms]

            mix_tail_faded = mix_tail.fade_out(crossfade_ms)
            outro_start = outro_with_fade[:crossfade_ms].fade_in(crossfade_ms)
            crossfade_out = mix_tail_faded.overlay(outro_start)

            mix = mix_body + crossfade_out + outro_with_fade[crossfade_ms:]
        else:
            mix = mix + outro_with_fade

    # --- Final processing ---
    print("\nFinal processing...")

    # Gentle normalization
    mix = pydub_normalize(mix, headroom=1.0)

    # --- Export ---
    if output_path is None:
        base = os.path.splitext(voice_path)[0]
        ext = os.path.splitext(voice_path)[1]
        output_path = f"{base}-mixed{ext}"

    # Determine export format
    out_ext = os.path.splitext(output_path)[1].lower().lstrip('.')
    format_map = {
        'm4a': ('mp4', {'codec': 'aac', 'bitrate': '192k'}),
        'mp4': ('mp4', {'codec': 'aac', 'bitrate': '192k'}),
        'mp3': ('mp3', {'bitrate': '192k'}),
        'wav': ('wav', {}),
        'ogg': ('ogg', {'codec': 'libvorbis'}),
    }

    fmt, params = format_map.get(out_ext, ('mp4', {'codec': 'aac', 'bitrate': '192k'}))

    print(f"\nExporting: {output_path}")
    print(f"  Format: {fmt}, Duration: {len(mix)/1000:.1f}s")

    os.makedirs(os.path.dirname(output_path) or '.', exist_ok=True)
    mix.export(output_path, format=fmt, **params)

    print(f"\n  Done! Mixed podcast saved to: {output_path}")
    print(f"  Total duration: {len(mix)/1000/60:.1f} minutes")

    return output_path


def main():
    parser = argparse.ArgumentParser(
        description='Mix podcast voice with intro, background, and outro music',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/mix_podcast.py voice.m4a
  python scripts/mix_podcast.py voice.m4a -o output.m4a
  python scripts/mix_podcast.py voice.m4a --intro my_intro.wav --bg-volume -18
  python scripts/mix_podcast.py voice.m4a --no-bg --preview
        """
    )

    parser.add_argument('voice', help='Path to the voice recording file')
    parser.add_argument('--output', '-o', help='Output file path')
    parser.add_argument('--intro', help='Custom intro music file')
    parser.add_argument('--bg', help='Custom background music file')
    parser.add_argument('--outro', help='Custom outro music file')
    parser.add_argument('--intro-volume', type=float, default=-3,
                        help='Intro volume in dB (default: -3)')
    parser.add_argument('--bg-volume', type=float, default=-22,
                        help='Background volume in dB (default: -22, very subtle)')
    parser.add_argument('--outro-volume', type=float, default=-3,
                        help='Outro volume in dB (default: -3)')
    parser.add_argument('--crossfade', type=float, default=2.0,
                        help='Crossfade duration in seconds (default: 2.0)')
    parser.add_argument('--no-bg', action='store_true',
                        help='Skip background music')
    parser.add_argument('--preview', action='store_true',
                        help='Generate 30-second preview')

    args = parser.parse_args()

    if not os.path.exists(args.voice):
        print(f"Error: Voice file not found: {args.voice}")
        sys.exit(1)

    mix_podcast(
        voice_path=args.voice,
        output_path=args.output,
        intro_path=args.intro,
        bg_path=args.bg,
        outro_path=args.outro,
        intro_volume=args.intro_volume,
        bg_volume=args.bg_volume,
        outro_volume=args.outro_volume,
        crossfade_s=args.crossfade,
        no_bg=args.no_bg,
        preview=args.preview,
    )


if __name__ == '__main__':
    main()
