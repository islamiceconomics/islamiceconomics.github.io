# Social Automation Handoff

This repo includes a social automation pipeline for the Islamic Economics site.

## Start Here

- Pull the latest GitHub `main` before making changes.
- Do not rely on old local branches or old chat history.
- Read [social/README.md](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/social/README.md) first, then inspect the generator and workflow files below.

## Key Files

- [scripts/generate_social_campaign.py](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/scripts/generate_social_campaign.py)
- [scripts/render_social_clips.py](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/scripts/render_social_clips.py)
- [.github/workflows/social-distribution.yml](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/.github/workflows/social-distribution.yml)
- [social/README.md](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/social/README.md)
- [social/state/social_state.json](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/social/state/social_state.json)
- [social/campaigns](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/social/campaigns)

## Current Strategy

- `X` is the priority channel.
- X single posts should sound like a human sharing a thought, observation, or question about Islamic economics.
- X single posts should not feel like bot marketing.
- X single posts should not contain raw URLs by default.
- X single posts should not contain hashtags by default.
- Threads may include the source URL only in the final post.
- Links to the website should be occasional, not the default pattern.
- `UpScrolled` is draft-only and meant for manual copy/paste publishing.
- `LinkedIn` and `Instagram` exist in the pipeline but are secondary for now.

## Behavior Already Implemented

- Buffer publishing works for `X`.
- X posts no longer force a generic website thumbnail image.
- X posts have URL-preserving safeguards when a source link is required.
- X single posts are sanitized to remove raw URLs, hashtags, and promotional phrasing.
- `UpScrolled` drafts are structured to sound more conversational and less promotional.
- Short-form video render support exists, but short videos are not auto-posted.

## Required Secrets

- `OPENAI_API_KEY`
- `BUFFER_ACCESS_TOKEN`
- `BUFFER_PROFILE_ID_X`
- `X_BEARER_TOKEN` (for reply discovery — apply at https://developer.x.com)

Optional later:

- `BUFFER_PROFILE_ID_LINKEDIN`
- `BUFFER_PROFILE_ID_INSTAGRAM`

## What The Pipeline Produces

- `social/campaigns/*.json`: machine-readable campaign payloads
- `social/campaigns/*.md`: review-friendly drafts
- `social/state/social_state.json`: posting history and recycling state
- `social/shorts/rendered/*.mp4`: rendered short clips
- `social/shorts/rendered/*.json`: render metadata
- `social/reply-digests/*.md`: daily reply opportunity digests for manual review
- `social/reply-digests/*.json`: machine-readable reply data

## How It Works

1. The generator discovers content from:
   - `Website/blog/*.html`
   - `Website/podcast/feed.xml`
2. It creates campaign packs for:
   - `X`
   - `LinkedIn`
   - `Instagram`
   - `UpScrolled`
   - `short-video`
3. If Buffer secrets are present, it can queue supported channels to Buffer.
4. Campaign packs are saved under `social/campaigns`.

## Important Guardrails

- Do not turn X back into `new article`, `read here`, or `link below` style traffic posts.
- Do not attach generic website thumbnails to X by default.
- Do not paste API keys into code, docs, issues, commits, or chat.
- Do not assume a successful workflow means the social copy is good. Check the generated campaign output.
- Prefer improving the generator over editing one-off posts manually.

## Test Checklist

Before pushing generator changes:

1. Run:
   ```bash
   python3 -m py_compile scripts/generate_social_campaign.py scripts/render_social_clips.py
   ```
2. Generate a local draft without AI:
   ```bash
   python3 scripts/generate_social_campaign.py --source auto --limit 1 --no-ai
   ```
3. Inspect the newest files in `social/campaigns`.
4. Confirm:
   - X single post sounds human
   - X single post does not include a raw URL
   - X thread final post preserves the source URL
   - UpScrolled draft reads like a discussion post
5. Only then test Buffer publishing.

## Common Failure Modes

- Buffer API schema mismatch:
  - Check `generate_social_campaign.py` Buffer GraphQL mutations and queries.
- Workflow shows success but post quality is poor:
  - Inspect the latest `social/campaigns/*.json` and `*.md`.
- X post loses the URL:
  - Check the X single-post sanitizer and source-link preservation logic.
- Generic image posts on X:
  - Check Buffer payload construction for X media handling.
- Bad promotional tone:
  - Check the X prompt instructions and the X single-post sanitization path.

## Current Workflow Notes

- The workflow file is [social-distribution.yml](/Users/hamzazahid/Library/CloudStorage/GoogleDrive-88hzahid@gmail.com/My%20Drive/IslamicEconomics/.github/workflows/social-distribution.yml).
- Scheduled runs are configured there.
- Scheduled runs can auto-publish to Buffer depending on the workflow env settings.
- The workflow prints the latest campaign's Buffer result into the logs.

## X Voice Pattern System (Implemented)

The generator now rotates between 6 voice patterns for X single posts, weighted to avoid repetition:

| Pattern | Weight | Links? | What it does |
|---------|--------|--------|--------------|
| `observation` | 30% | No | States a fact and what it reveals about a larger truth |
| `historical_fact` | 20% | No | One surprising detail or number, stated plainly |
| `question` | 15% | No | Genuine question — thinking out loud, not engagement bait |
| `reframing` | 15% | No | Reveals what something actually is vs. what people assume |
| `connection` | 10% | No | Unexpected parallel to another field |
| `content_share` | 10% | Yes | Only type that includes a link |

- Pattern is selected via weighted random, seeded by item_id + date for reproducibility.
- Recently used patterns (last 4) are down-weighted to ensure variety.
- The voice pattern name is stored in `x_voice_pattern` in both the campaign JSON and `social_state.json`.
- ~90% of posts have NO link. The account builds authority through insight, not traffic.

## Posting Cadence

- The posting workflow runs **daily** at 14:00 UTC.
- Each run generates a **random number of posts between 2 and 6**.
- Manual runs via `workflow_dispatch` can override the limit with a specific number.
- Posts are **staggered across the day** at 6 time slots (9:00, 12:00, 15:00, 18:00, 20:00, 22:00 UTC) with small random jitter so they don't land exactly on the hour.
- Buffer receives each post with a different `dueAt` timestamp — they don't all go out at once.

## Reply Discovery Pipeline

A separate workflow discovers reply-worthy tweets and suggests draft replies for manual posting.

### How it works

1. **Runs daily at 10:00 UTC** (4 hours before the posting pipeline).
2. Searches X API for recent tweets about Islamic economics, Islamic finance, sukuk, waqf, takaful, halal investing, OIC trade, etc.
3. Filters out low-engagement tweets and bot noise (minimum likes/followers thresholds).
4. Ranks the top 8 reply-worthy opportunities by engagement and reach.
5. Generates a suggested reply for each in the same calm, reflective voice.
6. Outputs a digest to `social/reply-digests/YYYY-MM-DD-replies.md`.

### Reply voice rules

- No sycophancy ("Great point!", "This!", "Exactly", "So true").
- No self-promotion. No links. No mentions of our website or content.
- Adds genuine value: a fact, a perspective, a gentle reframing, or an honest question.
- 1-2 sentences max. Ends with a period.

### Workflow

- **You review** the digest, edit replies as needed, then post manually from X.
- Replies are never auto-posted. Human review is the whole point.
- Replying to larger accounts with genuine insight is the primary growth mechanism.

### Key files

- `scripts/discover_replies.py` — search, rank, generate
- `.github/workflows/reply-digest.yml` — daily schedule
- `social/reply-digests/` — output directory

### Required secret

- `X_BEARER_TOKEN` — apply for a developer account at https://developer.x.com

## Recommended Next Improvements

- Add stronger quality gates before Buffer publishing X posts.
- Consider adding standalone "thought of the day" posts not tied to any article.
- A/B test which voice patterns get the most engagement and adjust weights.
- Track which reply digest suggestions get used vs. skipped to improve targeting.

## Working Principle

The objective is not to maximize link clicks per post.

The objective is to make the account feel like a thoughtful human account on Islamic economics, so that strong posts build curiosity and people choose to visit the website from the profile or occasional source-share posts.

## Voice Reference

The X voice is modeled on the tone of @orangebook — calm, wise, and slightly melancholic, like someone writing in a journal that happens to be public. Adapted to Islamic economics:

- State things as quiet truths, not opinions or arguments.
- Use reframing: reveal what something actually is vs. what people assume.
- Short declarative sentences. No hedging. No "I think" or "perhaps".
- Standalone posts end with a period. Always.
- No emoji, no hashtags, no semicolons.
- No AI tells: "Hot take", "Did you know", "Here's the thing", "Buckle up", "Thread:", etc.
- The post should read like a truth someone arrived at after years of studying, stated simply enough that anyone can understand it.

A 1,000-post archive of @orangebook is stored at `social/TwExportly_orangebook_tweets_2026_03_20.csv` for voice reference.
