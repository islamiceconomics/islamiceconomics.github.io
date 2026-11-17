#!/usr/bin/env python3
"""Refresh dated reference quotes; never substitute invented prices.

Run: python3 scripts/refresh_market_data.py
FX: named central-bank providers via Frankfurter v2 (not blended rates).
Brent: EIA daily spot observations, released weekly; not futures or live quotes.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timedelta, timezone
from html import unescape
import json
import math
from pathlib import Path
import re
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
EIA_URL = "https://www.eia.gov/dnav/pet/hist/rbrted.htm"
PROVIDERS = {
    "ECB": {
        "quotes": ["MYR", "TRY", "IDR"],
        "name": "European Central Bank",
        "url": "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
    },
    "BDI": {
        "quotes": ["PKR", "SAR", "BDT", "EGP"],
        "name": "Banca d'Italia",
        "url": "https://tassidicambio.bancaditalia.it/",
    },
}


def download(url):
    request = Request(url, headers={"User-Agent": "IslamicEconomics-ReferenceData/1.0"})
    for attempt in range(3):
        try:
            with urlopen(request, timeout=25) as response:
                return response.read().decode("utf-8")
        except (URLError, TimeoutError) as error:
            if attempt == 2 or (isinstance(error, HTTPError) and error.code not in (408, 429) and error.code < 500):
                raise
            time.sleep(2 ** attempt)


def valid_date(value, today=None):
    today = today or datetime.now(timezone.utc).date()
    parsed = date.fromisoformat(value)
    if parsed > today:
        raise ValueError("Future observation date rejected: " + value)
    return parsed


def parse_fx(rows, provider, retrieved_at, today=None):
    spec = PROVIDERS[provider]
    expected = set(spec["quotes"])
    result = []
    for row in rows:
        if row.get("base") != "USD" or row.get("quote") not in expected:
            continue
        valid_date(row["date"], today)
        value = row.get("rate")
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or value <= 0:
            raise ValueError("Invalid exchange rate")
        result.append({
            "id": row["quote"], "kind": "fx", "value": value,
            "unit": row["quote"] + " per USD", "observedAt": row["date"],
            "source": spec["name"], "sourceCode": provider, "sourceUrl": spec["url"],
            "dataUrl": fx_url(provider), "frequency": "daily reference",
            "retrievedAt": retrieved_at, "status": "available",
        })
    if {item["id"] for item in result} != expected or len(result) != len(expected):
        raise ValueError("Incomplete or duplicate " + provider + " rates")
    return result


def fx_url(provider):
    return "https://api.frankfurter.dev/v2/rates?base=USD&quotes=" + ",".join(PROVIDERS[provider]["quotes"]) + "&providers=" + provider


def restore_cached_items(items, cache):
    """A runner cache may fill gaps, but cannot replace newer repository data."""
    if cache.get("schemaVersion") != 1 or not isinstance(cache.get("items"), list):
        raise ValueError("Invalid market cache")
    allowed = {"BRENT"} | {code for spec in PROVIDERS.values() for code in spec["quotes"]}
    for item in cache["items"]:
        if not isinstance(item, dict) or item.get("id") not in allowed or item.get("status") != "available":
            continue
        value = item.get("value")
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or value <= 0:
            continue
        try:
            valid_date(item.get("observedAt", ""))
        except (TypeError, ValueError):
            continue
        old = items.get(item["id"])
        if not old or item["observedAt"] > old.get("observedAt", ""):
            items[item["id"]] = item


def parse_brent(html, retrieved_at, today=None):
    """Map Mon-Fri columns to their actual date, skipping missing observations."""
    observations = []
    for row in re.findall(r"<tr\b[^>]*>(.*?)</tr>", html, re.I | re.S):
        cells = [unescape(re.sub(r"<[^>]+>", "", cell)).strip()
                 for cell in re.findall(r"<td\b[^>]*>(.*?)</td>", row, re.I | re.S)]
        if len(cells) != 6:
            continue
        match = re.match(r"(\d{4})\s+([A-Za-z]{3})-\s*(\d{1,2})\s+to", cells[0])
        if not match:
            continue
        monday = datetime.strptime(" ".join(match.groups()), "%Y %b %d").date()
        if monday.weekday() != 0:
            raise ValueError("Unexpected EIA weekly row")
        for offset, text in enumerate(cells[1:]):
            if not re.fullmatch(r"\d+(?:\.\d+)?", text):
                continue
            observed = monday + timedelta(days=offset)
            valid_date(observed.isoformat(), today)
            value = float(text)
            if value > 0:
                observations.append((observed.isoformat(), value))
    if not observations:
        raise ValueError("EIA returned no valid observations")
    observed, value = max(observations)
    published = re.search(r"(?<!Next )Release Date:\s*(\d{1,2}/\d{1,2}/\d{4})", html)
    if not published:
        raise ValueError("EIA publication date missing")
    published_at = datetime.strptime(published.group(1), "%m/%d/%Y").date().isoformat()
    valid_date(published_at, today)
    return [{
        "id": "BRENT", "kind": "commodity", "value": value,
        "unit": "USD per barrel", "observedAt": observed, "publishedAt": published_at,
        "source": "U.S. Energy Information Administration", "sourceCode": "EIA", "sourceUrl": EIA_URL,
        "dataUrl": EIA_URL, "frequency": "daily spot; weekly release",
        "retrievedAt": retrieved_at, "status": "available",
    }]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "Website/data/market-snapshot.json")
    parser.add_argument("--cache", type=Path, help="Optional runner cache preserving the last valid observations between deployments")
    args = parser.parse_args()
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    previous = {}
    if args.output.exists():
        previous = json.loads(args.output.read_text(encoding="utf-8"))
    items = {item["id"]: item for item in previous.get("items", []) if item.get("id")}
    if args.cache and args.cache.exists():
        try:
            restore_cached_items(items, json.loads(args.cache.read_text(encoding="utf-8")))
        except (OSError, ValueError, AttributeError) as error:
            print("Ignoring unusable saved market cache: " + str(error), file=sys.stderr)
    errors = []
    tasks = {key: fx_url(key) for key in PROVIDERS}
    tasks["EIA"] = EIA_URL
    with ThreadPoolExecutor(max_workers=3) as pool:
        futures = {key: pool.submit(download, url) for key, url in tasks.items()}
        for key, future in futures.items():
            try:
                body = future.result()
                values = parse_brent(body, now) if key == "EIA" else parse_fx(json.loads(body), key, now)
                for item in values:
                    old = items.get(item["id"])
                    if old and old.get("observedAt", "") > item["observedAt"]:
                        raise ValueError("Source would roll back a newer observation")
                    items[item["id"]] = item
            except Exception as error:
                errors.append({"source": key, "message": str(error)})
                print(key + ": " + str(error), file=sys.stderr)
    # No free, verified gold feed is configured. A missing quote is not a price.
    items["GOLD"] = {"id": "GOLD", "kind": "commodity", "value": None,
                     "status": "unavailable", "reason": "No verified gold feed configured"}
    output = {
        "schemaVersion": 1, "lastAttemptAt": now,
        "description": "Dated reference data, not live trading quotes. FX in local currency per 1 USD; provider cross-rates delivered by Frankfurter. Brent is EIA daily spot, published weekly.",
        "items": list(items.values()), "refreshErrors": errors,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if args.cache:
        args.cache.parent.mkdir(parents=True, exist_ok=True)
        args.cache.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {sum(i.get('status') == 'available' for i in items.values())} dated quotes to {args.output}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
