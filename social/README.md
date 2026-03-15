# Social Automation

This folder stores generated campaign packs and state for `X`, `LinkedIn`, `Instagram`, `UpScrolled`, and `short-video`.

## What The Pipeline Does

- Discovers existing content directly from `Website/blog/*.html` and `Website/podcast/feed.xml`.
- Generates one campaign pack per selected item:
  - `X`: single post plus 4-post thread
  - `LinkedIn`: one long-form post
  - `Instagram`: caption, carousel slide copy, and reel caption
  - `UpScrolled`: manual-publish draft plus a discussion prompt
  - `short-video`: title, hook, voiceover, shot list, caption, and a renderable teaser package
- Uses OpenAI if `OPENAI_API_KEY` is available.
- Falls back to deterministic templates if no AI key is configured.
- Optionally queues `X`, `LinkedIn`, and `Instagram` posts to Buffer.
- Generates `UpScrolled` drafts for manual copy/paste publishing.
- Renders vertical `1080x1920` short-video teasers from local podcast video files when available, with an image-based fallback for non-video content.

## Local Usage

Generate the next eligible campaign pack:

```bash
python3 scripts/generate_social_campaign.py --source auto --limit 1
```

Generate a specific piece:

```bash
python3 scripts/generate_social_campaign.py --content-id blog-understanding-riba
```

List Buffer channel ids after adding `BUFFER_ACCESS_TOKEN`:

```bash
python3 scripts/generate_social_campaign.py --list-buffer-profiles
```

The output will include `service`, `display_name`, and `recommended_secret` so you can map the right Buffer channel id to `BUFFER_PROFILE_ID_X`.

Queue generated text/image posts to Buffer:

```bash
python3 scripts/generate_social_campaign.py --publish-buffer
```

Render the latest teaser clip locally:

```bash
python3 scripts/render_social_clips.py --limit 1
```

## Workflow

The GitHub Actions workflow at `.github/workflows/social-distribution.yml` runs:

- On a schedule: `Monday`, `Wednesday`, and `Friday` at `14:00 UTC`
- On demand through `workflow_dispatch`

By default it:

- generates `1` campaign pack
- uses `auto` discovery
- recycles evergreen content after `45` days
- renders short-video teasers after campaign generation

## Required GitHub Secrets

- `OPENAI_API_KEY`
- `BUFFER_ACCESS_TOKEN`
- `BUFFER_PROFILE_ID_X` (Buffer channel id for your X account)
- `BUFFER_PROFILE_ID_LINKEDIN` (Buffer channel id for your LinkedIn account)
- `BUFFER_PROFILE_ID_INSTAGRAM` (Buffer channel id for your Instagram account)

## Recommended Model

The workflow defaults to `gpt-5-mini` for the best cost/quality balance on social copy generation.
You can override it by setting `OPENAI_MODEL` in the workflow environment.

## Output

- `social/campaigns/*.json`: machine-readable campaign payloads
- `social/campaigns/*.md`: review-friendly drafts
- `social/state/social_state.json`: history used to avoid reposting too frequently
- `social/shorts/rendered/*.mp4`: rendered teaser clips uploaded as workflow artifacts
- `social/shorts/rendered/*.json`: render metadata for each clip

## Current Limitation

`UpScrolled` is draft-only and is not auto-posted. Short-video clips are rendered automatically, but they are not auto-posted yet.
