import unittest
from datetime import date
from unittest.mock import patch
from urllib.error import URLError, HTTPError
from tempfile import TemporaryDirectory
from pathlib import Path
import json
try:
    from . import refresh_market_data
except ImportError:  # unittest discovery with scripts/ as the top-level directory
    import refresh_market_data

parse_brent = refresh_market_data.parse_brent
parse_fx = refresh_market_data.parse_fx


class MarketDataTests(unittest.TestCase):
    def test_cache_preserves_last_valid_observation_during_outage_without_rolling_back_newer_data(self):
        with TemporaryDirectory() as folder:
            output = Path(folder) / 'market.json'
            cache = Path(folder) / 'saved.json'
            repo = {'id': 'MYR', 'value': 4.1, 'observedAt': '2026-08-28', 'status': 'available'}
            recent = {'id': 'PKR', 'value': 278, 'observedAt': '2026-08-28', 'status': 'available'}
            output.write_text(json.dumps({'schemaVersion': 1, 'items': [repo]}))
            cache.write_text(json.dumps({'schemaVersion': 1, 'items': [{**repo, 'value': 3.9, 'observedAt': '2026-08-01'}, recent, {**recent, 'id': 'TRY', 'observedAt': '2099-01-01'}]}))
            with patch('sys.argv', ['refresh_market_data.py', '--output', str(output), '--cache', str(cache)]), patch.object(refresh_market_data, 'download', side_effect=OSError('Offline')):
                self.assertEqual(refresh_market_data.main(), 1)
            saved = {item['id']: item for item in json.loads(output.read_text())['items']}
            self.assertEqual(saved['MYR'], repo)
            self.assertEqual(saved['PKR'], recent)
            self.assertNotIn('TRY', saved)
            self.assertEqual(json.loads(cache.read_text()), json.loads(output.read_text()))

    def test_transient_download_failures_are_retried(self):
        with patch.object(refresh_market_data, 'urlopen', side_effect=URLError('Temporary failure')) as fetch, patch.object(refresh_market_data.time, 'sleep'):
            with self.assertRaises(URLError):
                refresh_market_data.download('https://www.ecb.europa.eu/')
        self.assertEqual(fetch.call_count, 3)

    def test_missing_feed_is_not_retried(self):
        with patch.object(refresh_market_data, 'urlopen', side_effect=HTTPError('https://www.ecb.europa.eu/', 404, 'Missing', {}, None)) as fetch, patch.object(refresh_market_data.time, 'sleep'):
            with self.assertRaises(HTTPError):
                refresh_market_data.download('https://www.ecb.europa.eu/')
        self.assertEqual(fetch.call_count, 1)

    def test_eia_maps_weekday_columns_and_publication_date(self):
        html = """<table><tr><td>2026 Aug-24 to Aug-28</td><td>92.71</td>
        <td>88.24</td><td></td><td>NA</td><td>-</td></tr></table>
        Release Date: 8/26/2026 Next Release Date: 9/2/2026"""
        quote = parse_brent(html, "2026-08-30T10:00:00Z", date(2026, 8, 30))[0]
        self.assertEqual(quote["observedAt"], "2026-08-25")
        self.assertEqual(quote["publishedAt"], "2026-08-26")
        self.assertEqual(quote["value"], 88.24)
        self.assertEqual(quote["unit"], "USD per barrel")

    def test_future_and_missing_data_rejected(self):
        with self.assertRaises(ValueError):
            parse_brent("no data", "2026-08-30T10:00:00Z")
        rows = [{"base": "USD", "quote": code, "date": "2026-08-31", "rate": 4} for code in ["MYR", "TRY", "IDR"]]
        with self.assertRaises(ValueError):
            parse_fx(rows, "ECB", "2026-08-30T10:00:00Z", date(2026, 8, 30))

    def test_incomplete_or_duplicate_reference_quotes_rejected(self):
        rows = [{"base": "USD", "quote": "MYR", "date": "2026-08-28", "rate": 4}] * 3
        with self.assertRaises(ValueError):
            parse_fx(rows, "ECB", "2026-08-30T10:00:00Z", date(2026, 8, 30))

    def test_failed_refresh_keeps_original_quote_date_and_reports_failure(self):
        with TemporaryDirectory() as folder:
            output = Path(folder) / "market.json"
            old = {"id": "MYR", "value": 4.026, "observedAt": "2026-08-28", "retrievedAt": "2026-08-28T10:00:00Z", "status": "available"}
            output.write_text(json.dumps({"schemaVersion": 1, "items": [old]}))
            with patch("sys.argv", ["refresh_market_data.py", "--output", str(output)]), patch.object(refresh_market_data, "download", side_effect=OSError("Offline")):
                self.assertEqual(refresh_market_data.main(), 1)
            result = json.loads(output.read_text())
            quote = next(item for item in result["items"] if item["id"] == "MYR")
            self.assertEqual(quote, old)
            self.assertEqual(len(result["refreshErrors"]), 3)


if __name__ == "__main__":
    unittest.main()
