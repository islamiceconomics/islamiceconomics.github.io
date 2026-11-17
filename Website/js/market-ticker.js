/* Dated market reference data. There are deliberately no made-up fallback quotes. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root.document) api.init(root.document, root);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const CACHE_KEY = 'tj_reference_quotes_v1';
  const DAY = 86400000;
  const ORDER = ['BRENT', 'MYR', 'PKR', 'SAR', 'TRY', 'IDR', 'BDT', 'EGP', 'GOLD'];
  const BRIEF_ORDER = ['PKR', 'MYR', 'TRY', 'BRENT'];
  const BRIEF_TEXT = {
    en: { title: 'Daily market brief', note: 'Latest published reference figures. Exchange rates are local currency per US$1; oil is US dollars per barrel. Sources publish on their own schedules, including market holidays.', checked: 'Daily snapshot checked', overdue: 'The daily snapshot is overdue. Check the observation dates below.', source: 'Source', saved: 'Some sources are unavailable. Last valid figures keep their original dates.' },
    ar: { title: 'موجز السوق اليومي', note: 'أحدث الأرقام المرجعية المنشورة. أسعار الصرف بالعملة المحلية لكل دولار أمريكي؛ النفط بالدولار للبرميل. تختلف مواعيد النشر بحسب المصدر والعطلات.', checked: 'آخر فحص للبيانات اليومية', overdue: 'تأخر تحديث البيانات اليومية. يرجى مراجعة تواريخ المشاهدات أدناه.', source: 'المصدر', saved: 'بعض المصادر غير متاحة. تحتفظ الأرقام السابقة بتواريخها الأصلية.' },
    ur: { title: 'روزانہ مارکیٹ کا خلاصہ', note: 'تازہ ترین شائع شدہ حوالہ جاتی اعداد۔ شرحِ مبادلہ ایک امریکی ڈالر کے بدلے مقامی کرنسی میں ہے؛ تیل کی قیمت ڈالر فی بیرل ہے۔ اشاعت کے اوقات اور تعطیلات ہر ذریعے کے مطابق ہیں۔', checked: 'روزانہ اعداد کی آخری جانچ', overdue: 'روزانہ اعداد کی تازہ کاری میں تاخیر ہے۔ نیچے مشاہدات کی تاریخیں دیکھیں۔', source: 'ذریعہ', saved: 'بعض ذرائع دستیاب نہیں۔ سابقہ درست اعداد کی اصل تاریخیں برقرار ہیں۔' },
    tr: { title: 'Günlük piyasa özeti', note: 'Yayımlanan en son referans veriler. Döviz, 1 ABD doları başına yerel para; petrol, varil başına ABD dolarıdır. Yayın takvimleri ve tatiller kaynağa göre değişir.', checked: 'Günlük verilerin son kontrolü', overdue: 'Günlük veri kontrolü gecikti. Aşağıdaki gözlem tarihlerini kontrol edin.', source: 'Kaynak', saved: 'Bazı kaynaklara ulaşılamıyor. Son geçerli veriler özgün tarihleriyle gösteriliyor.' }
  };
  const PROVIDERS = {
    ECB: { quotes: ['MYR', 'TRY', 'IDR'], name: 'European Central Bank', url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html' },
    BDI: { quotes: ['PKR', 'SAR', 'BDT', 'EGP'], name: "Banca d'Italia", url: 'https://tassidicambio.bancaditalia.it/' }
  };
  const TEXT = {
    en: { reference: 'Reference data', unavailable: 'Unavailable', stale: 'Stale', gold: 'Gold', brent: 'Brent spot', released: 'released', pause: 'Pause', resume: 'Resume', note: 'FX: local currency per US$1. Dates shown are observation dates, not live prices.', failed: 'Some feeds could not be refreshed; saved quotes retain their original dates.', noData: 'Market data unavailable.', sources: 'Sources', loading: 'Loading reference data…' },
    ar: { reference: 'بيانات مرجعية', unavailable: 'غير متاح', stale: 'بيانات قديمة', gold: 'الذهب', brent: 'برنت الفوري', released: 'نُشر', pause: 'إيقاف', resume: 'تشغيل', note: 'الصرف: العملة المحلية لكل دولار أمريكي. التواريخ للمشاهدات وليست أسعاراً لحظية.', failed: 'تعذر تحديث بعض المصادر؛ تحتفظ البيانات المحفوظة بتواريخها الأصلية.', noData: 'بيانات السوق غير متاحة.', sources: 'المصادر', loading: 'تحميل البيانات المرجعية…' },
    ur: { reference: 'حوالہ جاتی اعداد', unavailable: 'دستیاب نہیں', stale: 'پرانے اعداد', gold: 'سونا', brent: 'برینٹ اسپاٹ', released: 'اجرا', pause: 'روکیں', resume: 'چلائیں', note: 'شرحِ مبادلہ: ایک امریکی ڈالر کے بدلے مقامی کرنسی۔ تاریخیں مشاہدات کی ہیں، قیمتیں براہِ راست نہیں۔', failed: 'بعض ذرائع تازہ نہیں ہو سکے؛ محفوظ اعداد کی اصل تاریخیں برقرار ہیں۔', noData: 'مارکیٹ کے اعداد دستیاب نہیں۔', sources: 'ذرائع', loading: 'حوالہ جاتی اعداد لوڈ ہو رہے ہیں…' },
    tr: { reference: 'Referans veriler', unavailable: 'Mevcut değil', stale: 'Eski veri', gold: 'Altın', brent: 'Brent spot', released: 'yayın', pause: 'Duraklat', resume: 'Sürdür', note: 'Döviz: 1 ABD doları başına yerel para. Tarihler gözlem tarihleridir; anlık fiyat değildir.', failed: 'Bazı kaynaklar yenilenemedi; kayıtlı veriler özgün tarihleriyle gösteriliyor.', noData: 'Piyasa verileri mevcut değil.', sources: 'Kaynaklar', loading: 'Referans veriler yükleniyor…' }
  };

  function validDate(value, now = Date.now()) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = Date.parse(value + 'T00:00:00Z');
    return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value && value <= new Date(now).toISOString().slice(0, 10);
  }
  function validItem(item, now = Date.now()) {
    if (!item || !ORDER.includes(item.id)) return false;
    if (item.status === 'unavailable') return item.value === null;
    return item.status === 'available' && Number.isFinite(item.value) && item.value > 0 && validDate(item.observedAt, now)
      && (!item.publishedAt || validDate(item.publishedAt, now))
      && typeof item.sourceCode === 'string' && typeof item.sourceUrl === 'string' && /^https:\/\//.test(item.sourceUrl);
  }
  function normalizeFx(rows, provider, retrievedAt, now = Date.now()) {
    if (!Array.isArray(rows) || !PROVIDERS[provider]) throw new Error('Invalid reference feed');
    const spec = PROVIDERS[provider];
    const items = rows.filter(row => row.base === 'USD' && spec.quotes.includes(row.quote)).map(row => ({
      id: row.quote, kind: 'fx', value: row.rate, unit: row.quote + ' per USD', observedAt: row.date,
      source: spec.name, sourceCode: provider, sourceUrl: spec.url, retrievedAt, status: 'available'
    }));
    if (items.length !== spec.quotes.length || new Set(items.map(item => item.id)).size !== spec.quotes.length || items.some(item => !validItem(item, now))) throw new Error('Incomplete or invalid reference feed');
    return items;
  }
  function mergeItems(existing, incoming, now = Date.now()) {
    const values = new Map();
    [...existing, ...incoming].filter(item => validItem(item, now)).forEach(item => {
      const previous = values.get(item.id);
      if (previous && previous.status === 'available' && item.status !== 'available') return;
      if (!previous || (item.observedAt || '') >= (previous.observedAt || '')) values.set(item.id, item);
    });
    return ORDER.filter(id => values.has(id)).map(id => values.get(id));
  }
  function isStale(item, now = Date.now()) {
    return item.status === 'available' && now - Date.parse(item.observedAt + 'T00:00:00Z') > (item.id === 'BRENT' ? 14 : 7) * DAY;
  }
  function formatValue(item, locale = 'en') {
    const decimals = item.id === 'IDR' ? 0 : item.kind === 'fx' ? 3 : 2;
    const number = item.value.toLocaleString(locale, { minimumFractionDigits: item.kind === 'commodity' ? 2 : 0, maximumFractionDigits: decimals });
    return item.id === 'BRENT' ? 'US$' + number + '/bbl' : number;
  }
  function briefItems(items, now = Date.now()) {
    return BRIEF_ORDER.map(id => items.find(item => item.id === id && item.status === 'available' && validItem(item, now))).filter(Boolean);
  }
  function snapshotOverdue(checkedAt, now = Date.now()) {
    const checked = typeof checkedAt === 'string' ? Date.parse(checkedAt) : NaN;
    return !Number.isFinite(checked) || checked > now || now - checked > 2 * DAY;
  }

  async function init(document, root) {
    const ticker = document.getElementById('tjTicker');
    if (!ticker) return;
    const script = document.currentScript;
    const snapshotUrl = new URL('../data/market-snapshot.json', script ? script.src : new URL('js/market-ticker.js', document.baseURI));
    const language = (document.documentElement.lang || 'en').split('-')[0];
    const words = TEXT[language] || TEXT.en;
    const briefWords = BRIEF_TEXT[language] || BRIEF_TEXT.en;
    const track = document.getElementById('tjTickerTrack');
    const loading = document.getElementById('tjTickerLoading');
    let items = [];
    let failed = false;
    let snapshotErrors = false;
    let snapshotCheckedAt = null;
    const brief = document.createElement('section');
    brief.id = 'tjMarketBrief';
    brief.className = 'tj-market-brief container';
    brief.setAttribute('aria-label', briefWords.title);
    ticker.insertAdjacentElement('afterend', brief);
    ticker.style.display = 'block';
    if (loading) loading.textContent = words.loading;

    function element(tag, className, text) {
      const el = document.createElement(tag);
      el.className = className;
      if (text !== undefined) el.textContent = text;
      return el;
    }
    function dateLabel(value) {
      return new Date(value + 'T00:00:00Z').toLocaleDateString(language, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    }
    function renderBrief() {
      const heading = element('div', 'tj-market-brief-heading');
      heading.appendChild(element('h2', '', briefWords.title));
      if (snapshotCheckedAt && Number.isFinite(Date.parse(snapshotCheckedAt)) && Date.parse(snapshotCheckedAt) <= Date.now()) {
        const checked = element('time', '', briefWords.checked + ': ' + new Date(snapshotCheckedAt).toLocaleString(language, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }) + ' UTC');
        checked.dateTime = snapshotCheckedAt;
        heading.appendChild(checked);
      }
      const grid = element('div', 'tj-market-brief-grid');
      briefItems(items).forEach(item => {
        const card = element('a', 'tj-market-fact');
        card.href = item.sourceUrl;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.appendChild(element('span', 'tj-market-fact-label', item.id === 'BRENT' ? words.brent : 'USD/' + item.id));
        card.appendChild(element('strong', 'tj-market-fact-value', formatValue(item, language)));
        const observed = element('time', 'tj-market-fact-date', dateLabel(item.observedAt));
        observed.dateTime = item.observedAt;
        card.appendChild(observed);
        card.appendChild(element('span', 'tj-market-fact-source', briefWords.source + ': ' + item.sourceCode));
        if (isStale(item)) card.appendChild(element('span', 'tj-market-fact-warning', words.stale));
        grid.appendChild(card);
      });
      brief.replaceChildren(heading, element('p', 'tj-market-brief-note', briefWords.note), grid);
      if (!grid.children.length) brief.appendChild(element('p', 'tj-market-brief-note', words.noData));
      if (snapshotOverdue(snapshotCheckedAt)) brief.appendChild(element('p', 'tj-market-brief-warning', briefWords.overdue));
      if (failed || snapshotErrors) brief.appendChild(element('p', 'tj-market-brief-warning', briefWords.saved));
    }
    function render() {
      renderBrief();
      if (!items.length) {
        if (loading) loading.textContent = words.noData;
        return;
      }
      const inner = element('div', 'tj-ticker-inner');
      inner.appendChild(element('span', 'tj-ticker-status', words.reference));
      items.forEach(item => {
        const available = item.status === 'available';
        const quote = element(available ? 'a' : 'span', 'tj-ticker-item');
        if (available) {
          quote.href = item.sourceUrl;
          quote.target = '_blank';
          quote.rel = 'noopener noreferrer';
          quote.title = item.source + ' · ' + item.unit + ' · ' + item.observedAt + (item.retrievedAt ? ' · Retrieved ' + item.retrievedAt : '');
        }
        const label = item.id === 'BRENT' ? words.brent : item.id === 'GOLD' ? words.gold : 'USD/' + item.id;
        quote.appendChild(element('span', 'tj-ticker-label', label));
        quote.appendChild(element('span', 'tj-ticker-value', available ? formatValue(item, language) : words.unavailable));
        if (available) {
          let metadata = dateLabel(item.observedAt) + ' · ' + item.sourceCode;
          if (item.publishedAt) metadata += ' · ' + words.released + ' ' + dateLabel(item.publishedAt);
          quote.appendChild(element('span', 'tj-ticker-meta', metadata));
          if (isStale(item)) quote.appendChild(element('span', 'tj-ticker-stale', words.stale));
        }
        inner.appendChild(quote);
      });
      const clone = inner.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a').forEach(link => { link.tabIndex = -1; });
      track.replaceChildren(inner, clone);
      track.style.display = 'flex';
      if (loading) loading.hidden = true;
      let note = ticker.querySelector('.tj-ticker-note');
      if (!note) {
        note = element('div', 'tj-ticker-note');
        ticker.appendChild(note);
      }
      note.replaceChildren(element('span', '', words.note + (failed || snapshotErrors ? ' ' + words.failed : '')));
      const sources = element('a', '', words.sources + ': ECB · BDI · EIA');
      sources.href = snapshotUrl.href;
      note.appendChild(sources);
      const toggle = element('button', 'tj-ticker-toggle', ticker.dataset.paused === 'true' ? words.resume : words.pause);
      toggle.type = 'button';
      toggle.setAttribute('aria-pressed', String(ticker.dataset.paused === 'true'));
      toggle.addEventListener('click', () => {
        const paused = ticker.dataset.paused !== 'true';
        ticker.dataset.paused = String(paused);
        toggle.textContent = paused ? words.resume : words.pause;
        toggle.setAttribute('aria-pressed', String(paused));
      });
      note.appendChild(toggle);
    }
    async function fetchJSON(url) {
      const controller = new AbortController();
      const timeout = root.setTimeout(() => controller.abort(), 8000);
      try {
        const response = await root.fetch(url, { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Reference feed unavailable');
        return await response.json();
      } finally { root.clearTimeout(timeout); }
    }
    try {
      const cached = JSON.parse(root.sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && Array.isArray(cached.items)) items = mergeItems(items, cached.items);
    } catch (_) { /* Storage is optional; no data is fabricated when disabled. */ }
    if (items.length) render();
    const requests = [fetchJSON(snapshotUrl.href).then(snapshot => {
      if (snapshot.schemaVersion !== 1 || !Array.isArray(snapshot.items)) throw new Error('Invalid snapshot');
      items = mergeItems(items, snapshot.items);
      snapshotCheckedAt = snapshot.lastAttemptAt;
      snapshotErrors = Array.isArray(snapshot.refreshErrors) && snapshot.refreshErrors.length > 0;
      render();
    }).catch(() => { failed = true; })];
    Object.entries(PROVIDERS).forEach(([provider, spec]) => {
      const url = 'https://api.frankfurter.dev/v2/rates?base=USD&quotes=' + spec.quotes.join(',') + '&providers=' + provider;
      requests.push(fetchJSON(url).then(rows => {
        items = mergeItems(items, normalizeFx(rows, provider, new Date().toISOString()));
        render();
      }).catch(() => { failed = true; }));
    });
    await Promise.all(requests);
    render();
    try { root.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ checkedAt: new Date().toISOString(), items })); }
    catch (_) { /* Cache failure must not hide sourced quotes. */ }
  }
  return { validDate, validItem, normalizeFx, mergeItems, isStale, formatValue, briefItems, snapshotOverdue, init };
});
