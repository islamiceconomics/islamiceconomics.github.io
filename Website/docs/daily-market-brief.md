# Daily Al-Tijarah market brief

Al-Tijarah's ticker and four market cards use dated reference figures. The daily job does not generate articles, opinions, religious interpretations, or investment recommendations.

The previous automatic article-generation schedule is paused; its manual workflow remains available.

## Run and schedule

Run `python3 scripts/refresh_market_data.py` to refresh `Website/data/market-snapshot.json`.

The existing **Deploy to GitHub Pages** workflow runs daily at **18:17 UTC** (1:17 p.m. Eastern Standard Time / 2:17 p.m. Eastern Daylight Time), as well as on pushes to main and manual workflow runs. Scheduled runs refresh the market data and publish the site without rebuilding the book. GitHub can delay scheduled runs; this is a daily check, not a live trading feed.

To run it immediately, open GitHub Actions, select **Deploy to GitHub Pages**, and choose **Run workflow** on main.

## Sources and dates

- MYR, TRY, IDR: European Central Bank reference rates delivered through Frankfurter v2, with the ECB provider explicitly selected.
- PKR, SAR, BDT, EGP: Banca d'Italia reference rates delivered through Frankfurter v2, with the BDI provider explicitly selected.
- Brent: U.S. Energy Information Administration daily spot observations, released weekly, in US dollars per barrel.
- Gold has no verified feed configured and is shown as unavailable in the ticker.

Exchange rates are local currency per US$1. Every available figure links to its source and displays its observation date. The snapshot check time is separate from the observation dates. A weekend check does not invent weekend market observations.

## Failure and recovery

The script retries transient network failures up to three times. Invalid, future-dated, incomplete or backward-moving source responses are rejected. The workflow saves validated observations in a GitHub Actions cache, with no repository write permission or automatic commits. An unavailable source keeps its last valid observations and dates; newer repository data takes precedence over older cached data.

The page labels FX observations older than seven days and Brent observations older than fourteen days as stale. A daily snapshot not checked for more than 48 hours shows an overdue warning. If a source fails, the site can still publish the available dated figures, but the workflow finishes with a failure status so the outage is visible in GitHub Actions. It does not open a new issue every day.

GitHub may disable schedules in a public repository after 60 days without repository activity. If the overdue warning appears, check that the workflow is enabled and examine its latest run. Ordinary GitHub workflow notification settings control failure emails.

## Validation

Run:

```sh
node --test scripts/test_market_ticker.cjs
python3 -m unittest scripts.test_refresh_market_data
```

Tests cover invalid and future-dated figures, freshness labels, unavailable quotes, source retries, original observation-date preservation, and recovery from cached data without rolling newer data back.
