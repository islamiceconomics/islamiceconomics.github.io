const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const ticker = require('../Website/js/market-ticker.js');
const now = Date.parse('2026-08-30T16:00:00Z');
const fx = { id: 'MYR', kind: 'fx', value: 4.026, observedAt: '2026-08-28', sourceCode: 'ECB', sourceUrl: 'https://www.ecb.europa.eu/', status: 'available' };

test('validates observation dates rather than trusting retrieval time', () => {
  assert.equal(ticker.validDate('2026-08-28', now), true);
  for (const date of ['2026-08-31', '2026-02-30', 'not-a-date']) assert.equal(ticker.validDate(date, now), false);
  assert.equal(ticker.validItem({ ...fx, value: null }, now), false);
  assert.equal(ticker.validItem({ ...fx, value: Infinity }, now), false);
});

test('requires every supported currency, USD base, positive numerical values', () => {
  const rows = ['MYR', 'TRY', 'IDR'].map(quote => ({ date: '2026-08-28', base: 'USD', quote, rate: 4 }));
  const items = ticker.normalizeFx(rows, 'ECB', '2026-08-30T16:00:00Z', now);
  assert.equal(items[0].unit, 'MYR per USD');
  assert.equal(items[0].observedAt, '2026-08-28');
  assert.throws(() => ticker.normalizeFx(rows.slice(0, 2), 'ECB', '', now));
  assert.throws(() => ticker.normalizeFx(rows.map(row => ({ ...row, base: 'EUR' })), 'ECB', '', now));
  assert.throws(() => ticker.normalizeFx(rows.map(row => ({ ...row, rate: '4' })), 'ECB', '', now));
});

test('new cache checks cannot make an old observation fresh or roll newer data back', () => {
  const old = { ...fx, observedAt: '2026-07-01', retrievedAt: '2026-08-30T16:00:00Z' };
  assert.equal(ticker.isStale(old, now), true);
  assert.equal(ticker.isStale(fx, now), false);
  assert.equal(ticker.mergeItems([fx], [old], now)[0].observedAt, '2026-08-28');
  assert.equal(ticker.mergeItems([fx], [{ ...fx, value: null, status: 'unavailable' }], now)[0].value, fx.value);
});

test('Brent is USD per barrel; FX is never reciprocally mislabeled', () => {
  assert.equal(ticker.formatValue({ id: 'BRENT', kind: 'commodity', value: 88.24 }), 'US$88.24/bbl');
  assert.equal(ticker.formatValue(fx), '4.026');
});

test('daily brief excludes unavailable, future-dated, and invalid figures', () => {
  const items = [fx, { ...fx, id: 'PKR', value: 277.61 },
    { ...fx, id: 'TRY', observedAt: '2026-08-31' },
    { id: 'BRENT', value: null, status: 'unavailable' }];
  assert.deepEqual(ticker.briefItems(items, now).map(item => item.id), ['PKR', 'MYR']);
  assert.equal(ticker.briefItems(items, now)[1].observedAt, '2026-08-28');
});

test('a missing, future, or overdue server check cannot appear current', () => {
  assert.equal(ticker.snapshotOverdue(null, now), true);
  assert.equal(ticker.snapshotOverdue('2026-08-31T00:00:00Z', now), true);
  assert.equal(ticker.snapshotOverdue('2026-08-27T00:00:00Z', now), true);
  assert.equal(ticker.snapshotOverdue('2026-08-30T10:00:00Z', now), false);
});

test('all language editions and the generator share one ticker, without invented fallbacks', () => {
  for (const file of ['Website/blog.html', 'Website/ar/blog.html', 'Website/ur/blog.html', 'Website/tr/blog.html', 'scripts/templates/blog_template.html']) {
    const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.match(html, /js\/market-ticker\.js/);
    assert.match(html, /css\/market-ticker\.css/);
    assert.match(html, /id="tjTickerTrack"/);
    assert.doesNotMatch(html, /goldapi-demo|api_key=demo|tj_ticker_cache|Fallback ticker items|ticker_items/);
  }
});

test('checked-in snapshot contains only dated, sourced quotes or explicit unavailability', () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../Website/data/market-snapshot.json')));
  const asOf = Date.parse(data.lastAttemptAt);
  assert.equal(data.schemaVersion, 1);
  assert.equal(data.items.length, 9);
  data.items.forEach(item => assert.equal(ticker.validItem(item, asOf), true, item.id));
  assert.equal(data.items.find(item => item.id === 'GOLD').value, null);
});
