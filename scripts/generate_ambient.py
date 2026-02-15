#!/usr/bin/env python3
"""
Generate ambient Islamic-style tones for podcast intro/outro/background.
Uses numpy for fast synthesis — no external audio files needed.

Creates three audio files:
  - podcast_intro.wav   (8 seconds)
  - podcast_outro.wav   (6 seconds)
  - podcast_bg.wav      (60 seconds — subtle ambient loop)

Usage:
    python scripts/generate_ambient.py
"""

import numpy as np
import wave
import struct
import os

SAMPLE_RATE = 44100

def write_wav(filename, samples):
    """Write numpy float array to 16-bit mono WAV."""
    samples = np.clip(samples, -1.0, 1.0)
    int_samples = (samples * 32767).astype(np.int16)
    with wave.open(filename, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes(int_samples.tobytes())
    print(f"  Created: {filename} ({len(samples)/SAMPLE_RATE:.1f}s)")

def warm_pad(duration_s, base_freq=220):
    """Generate a warm Hijaz-inspired pad using layered oscillators."""
    t = np.arange(int(duration_s * SAMPLE_RATE)) / SAMPLE_RATE
    signal = np.zeros_like(t)

    harmonics = [
        (base_freq, 0.35),
        (base_freq * 1.5, 0.20),
        (base_freq * 2.0, 0.12),
        (base_freq * 0.5, 0.18),
        (base_freq * 1.335, 0.10),
    ]

    for freq, amp in harmonics:
        vibrato = 1.0 + 0.002 * np.sin(2 * np.pi * 4.5 * t)
        drift = 1.0 + 0.001 * np.sin(2 * np.pi * 0.1 * t)
        signal += amp * np.sin(2 * np.pi * freq * vibrato * drift * t)

    return signal

def soft_ambient(duration_s):
    """Generate very soft evolving ambient texture."""
    t = np.arange(int(duration_s * SAMPLE_RATE)) / SAMPLE_RATE
    signal = np.zeros_like(t)

    layers = [
        (110, 0.08, 0.07),
        (165, 0.05, 0.05),
        (220, 0.04, 0.03),
        (330, 0.03, 0.09),
    ]

    for freq, amp, lfo in layers:
        mod = 0.5 + 0.5 * np.sin(2 * np.pi * lfo * t)
        drift = 1.0 + 0.003 * np.sin(2 * np.pi * 0.02 * t)
        signal += amp * mod * np.sin(2 * np.pi * freq * drift * t)

    return signal

def envelope(signal, attack_s, release_s):
    """Apply simple fade-in/fade-out envelope."""
    n = len(signal)
    attack = int(attack_s * SAMPLE_RATE)
    release = int(release_s * SAMPLE_RATE)

    env = np.ones(n)
    if attack > 0:
        env[:attack] = np.linspace(0, 1, attack)
    if release > 0:
        env[-release:] = np.linspace(1, 0, release)

    return signal * env

def normalize(signal, peak=0.85):
    """Normalize to peak amplitude."""
    max_val = np.max(np.abs(signal))
    if max_val > 0:
        signal = signal * peak / max_val
    return signal

def main():
    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                              'Website', 'podcast', 'audio')
    os.makedirs(output_dir, exist_ok=True)

    print("Generating podcast ambient audio...\n")

    # Intro (8 seconds)
    print("1. Generating intro...")
    intro = warm_pad(8.0, base_freq=220)
    intro = envelope(intro, attack_s=2.0, release_s=3.0)
    intro = normalize(intro, peak=0.75)
    write_wav(os.path.join(output_dir, 'podcast_intro.wav'), intro)

    # Outro (6 seconds)
    print("\n2. Generating outro...")
    outro = warm_pad(6.0, base_freq=196)
    outro = envelope(outro, attack_s=1.0, release_s=3.5)
    outro = normalize(outro, peak=0.70)
    write_wav(os.path.join(output_dir, 'podcast_outro.wav'), outro)

    # Background (60 seconds)
    print("\n3. Generating background ambient...")
    bg = soft_ambient(60.0)
    bg = envelope(bg, attack_s=3.0, release_s=3.0)
    bg = normalize(bg, peak=0.25)
    write_wav(os.path.join(output_dir, 'podcast_bg.wav'), bg)

    print(f"\nAll files saved to: {output_dir}")
    print("\nTo use your own music instead, replace these files:")
    print("  - podcast_intro.wav")
    print("  - podcast_outro.wav")
    print("  - podcast_bg.wav")

if __name__ == '__main__':
    main()
