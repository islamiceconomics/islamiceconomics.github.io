/**
 * Scripture Floating Search Widget
 * A compact floating button + search panel accessible from every page.
 * Requires scripture-data.js to be loaded first.
 */
(function() {
  'use strict';

  // Don't load on the Sources page itself
  if (window.location.pathname.includes('scriptures.html')) return;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    /* Floating button */
    .scripture-fab {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a5c3a 0%, #0d3d25 100%);
      color: #fff;
      border: none;
      box-shadow: 0 4px 16px rgba(26,92,58,0.35);
      cursor: pointer;
      z-index: 9998;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .scripture-fab:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 20px rgba(26,92,58,0.45);
    }
    .scripture-fab.open {
      transform: rotate(45deg) scale(1.05);
    }

    /* Panel */
    .scripture-panel {
      position: fixed;
      bottom: 5rem;
      right: 1.5rem;
      width: 380px;
      max-height: 520px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.18);
      z-index: 9999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .scripture-panel.visible {
      display: flex;
      animation: swPanelIn 0.25s ease-out;
    }
    @keyframes swPanelIn {
      from { opacity: 0; transform: translateY(12px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Panel header */
    .sw-header {
      background: linear-gradient(135deg, #1a5c3a 0%, #0d3d25 100%);
      color: #fff;
      padding: 0.8rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .sw-header-title {
      flex: 1;
      font-weight: 600;
      font-size: 0.9rem;
    }
    .sw-header-link {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      font-size: 0.75rem;
      white-space: nowrap;
    }
    .sw-header-link:hover { color: #fff; }

    /* Search */
    .sw-search {
      padding: 0.6rem 0.8rem;
      border-bottom: 1px solid #eee;
    }
    .sw-search input {
      width: 100%;
      padding: 0.55rem 0.8rem;
      border: 1.5px solid #e0e0e0;
      border-radius: 20px;
      font-size: 0.85rem;
      outline: none;
      font-family: inherit;
    }
    .sw-search input:focus { border-color: #1a5c3a; }

    /* Quick filters */
    .sw-filters {
      display: flex;
      gap: 0.3rem;
      padding: 0.4rem 0.8rem;
      overflow-x: auto;
      border-bottom: 1px solid #f0f0f0;
      flex-shrink: 0;
    }
    .sw-filter-chip {
      flex-shrink: 0;
      padding: 0.2rem 0.55rem;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      background: #fff;
      font-size: 0.72rem;
      cursor: pointer;
      white-space: nowrap;
      color: #666;
      transition: all 0.15s;
    }
    .sw-filter-chip:hover { border-color: #1a5c3a; color: #1a5c3a; }
    .sw-filter-chip.active { background: #1a5c3a; color: #fff; border-color: #1a5c3a; }

    /* Results */
    .sw-results {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem;
      min-height: 0;
    }
    .sw-result-card {
      padding: 0.65rem 0.7rem;
      border-radius: 8px;
      margin-bottom: 0.4rem;
      border: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
    }
    .sw-result-card:hover { background: #f8f8f8; border-color: #ddd; }
    .sw-result-card.expanded { background: #faf8f0; border-color: #c5a044; }

    .sw-result-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .sw-result-badge {
      font-size: 0.6rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.1rem 0.35rem;
      border-radius: 3px;
      letter-spacing: 0.03em;
    }
    .sw-result-badge.quran { background: #e8f5e9; color: #1b5e20; }
    .sw-result-badge.hadith { background: #e3f2fd; color: #0d47a1; }
    .sw-result-ref {
      font-weight: 600;
      font-size: 0.82rem;
      color: #1a1a2e;
      flex: 1;
    }

    .sw-result-preview {
      font-size: 0.78rem;
      color: #666;
      margin-top: 0.25rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .sw-result-expanded {
      display: none;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 1px solid #eee;
    }
    .sw-result-card.expanded .sw-result-expanded { display: block; }
    .sw-result-card.expanded .sw-result-preview {
      -webkit-line-clamp: unset;
      overflow: visible;
    }

    .sw-result-arabic {
      font-size: 1.05rem;
      text-align: right;
      direction: rtl;
      color: #1a1a2e;
      line-height: 1.8;
      padding: 0.5rem;
      background: #faf8f0;
      border-radius: 6px;
      border-left: 2px solid #c5a044;
      margin-bottom: 0.4rem;
    }
    .sw-result-context {
      font-size: 0.75rem;
      color: #888;
      line-height: 1.4;
    }
    .sw-view-full {
      display: inline-block;
      margin-top: 0.4rem;
      font-size: 0.75rem;
      color: #1a5c3a;
      text-decoration: none;
      font-weight: 600;
    }

    .sw-no-results {
      text-align: center;
      padding: 2rem 1rem;
      color: #aaa;
      font-size: 0.85rem;
    }

    .sw-stats {
      text-align: center;
      font-size: 0.72rem;
      color: #aaa;
      padding: 0.3rem;
      border-top: 1px solid #f0f0f0;
    }

    /* Dark mode for widget */
    [data-theme="dark"] .scripture-panel {
      background: #1a2230;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    }
    [data-theme="dark"] .sw-search { border-bottom-color: #2a3545; }
    [data-theme="dark"] .sw-search input {
      background: #111820;
      border-color: #3a4555;
      color: #f0f4f8;
    }
    [data-theme="dark"] .sw-search input:focus { border-color: #4cc882; }
    [data-theme="dark"] .sw-filters { border-bottom-color: #2a3545; }
    [data-theme="dark"] .sw-filter-chip {
      background: #151d28;
      border-color: #334155;
      color: #b8c4d0;
    }
    [data-theme="dark"] .sw-filter-chip:hover { border-color: #4cc882; color: #4cc882; }
    [data-theme="dark"] .sw-filter-chip.active { background: #4cc882; color: #0b0e11; border-color: #4cc882; }
    [data-theme="dark"] .sw-result-card {
      border-color: #2a3545;
    }
    [data-theme="dark"] .sw-result-card:hover { background: #1f2a3a; border-color: #3a4555; }
    [data-theme="dark"] .sw-result-card.expanded { background: #151d28; border-color: #e8c65a; }
    [data-theme="dark"] .sw-result-ref { color: #f0f4f8; }
    [data-theme="dark"] .sw-result-preview { color: #9ca8b8; }
    [data-theme="dark"] .sw-result-arabic { background: #111820; color: #e8dcc8; border-left-color: #e8c65a; }
    [data-theme="dark"] .sw-result-context { color: #8896a6; }
    [data-theme="dark"] .sw-stats { border-top-color: #2a3545; color: #6b7a8a; }
    [data-theme="dark"] .sw-view-full { color: #5ad994; }

    /* Mobile */
    @media (max-width: 480px) {
      .scripture-panel {
        right: 0.5rem;
        left: 0.5rem;
        width: auto;
        bottom: 4.5rem;
        max-height: 70vh;
      }
      .scripture-fab { bottom: 1rem; right: 1rem; width: 46px; height: 46px; }
    }
  `;
  document.head.appendChild(style);

  // Create FAB button
  const fab = document.createElement('button');
  fab.className = 'scripture-fab';
  fab.innerHTML = '&#128214;';
  fab.title = 'Search Scripture';
  document.body.appendChild(fab);

  // Create panel
  const panel = document.createElement('div');
  panel.className = 'scripture-panel';
  panel.innerHTML = `
    <div class="sw-header">
      <span style="font-size:1.1rem">&#128214;</span>
      <span class="sw-header-title">Scripture Search</span>
      <a href="scriptures.html" class="sw-header-link">Full Library &rarr;</a>
    </div>
    <div class="sw-search">
      <input type="text" placeholder="Search ayahs, hadith, topics..." id="swSearchInput">
    </div>
    <div class="sw-filters" id="swFilters"></div>
    <div class="sw-results" id="swResults"></div>
    <div class="sw-stats" id="swStats"></div>
  `;
  document.body.appendChild(panel);

  // State
  let isOpen = false;
  let swQuery = '';
  let swTopic = null;
  let swExpanded = new Set();

  // Open/close
  fab.addEventListener('click', function() {
    isOpen = !isOpen;
    fab.classList.toggle('open', isOpen);
    panel.classList.toggle('visible', isOpen);
    if (isOpen) {
      document.getElementById('swSearchInput').focus();
      renderWidget();
    }
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (isOpen && !panel.contains(e.target) && !fab.contains(e.target)) {
      isOpen = false;
      fab.classList.remove('open');
      panel.classList.remove('visible');
    }
  });

  // Check if SCRIPTURE_DATA is loaded
  if (typeof SCRIPTURE_DATA === 'undefined') return;

  function getTopic(id) { return SCRIPTURE_DATA.topics.find(t => t.id === id); }

  // Render filters
  function renderWidgetFilters() {
    const el = document.getElementById('swFilters');
    el.innerHTML = SCRIPTURE_DATA.topics.map(t =>
      `<span class="sw-filter-chip${swTopic === t.id ? ' active' : ''}" data-topic="${t.id}">${t.icon} ${t.name}</span>`
    ).join('');
  }

  // Filter & render results
  function renderWidget() {
    renderWidgetFilters();
    let entries = SCRIPTURE_DATA.entries;

    if (swTopic) {
      entries = entries.filter(e => e.topics.includes(swTopic));
    }
    if (swQuery.trim()) {
      const q = swQuery.toLowerCase();
      entries = entries.filter(e =>
        e.reference.toLowerCase().includes(q) ||
        e.translation.toLowerCase().includes(q) ||
        e.context.toLowerCase().includes(q)
      );
    }

    // Show max 20
    const shown = entries.slice(0, 20);
    const resultsEl = document.getElementById('swResults');
    const statsEl = document.getElementById('swStats');

    if (shown.length === 0) {
      resultsEl.innerHTML = '<div class="sw-no-results">No matches found. Try different keywords.</div>';
      statsEl.textContent = '';
      return;
    }

    resultsEl.innerHTML = shown.map(entry => {
      const isExp = swExpanded.has(entry.id);
      return `<div class="sw-result-card${isExp ? ' expanded' : ''}" data-eid="${entry.id}">
        <div class="sw-result-header">
          <span class="sw-result-badge ${entry.type}">${entry.type === 'quran' ? 'Quran' : 'Hadith'}</span>
          <span class="sw-result-ref">${entry.reference}</span>
        </div>
        <div class="sw-result-preview">${entry.translation}</div>
        <div class="sw-result-expanded">
          <div class="sw-result-arabic">${entry.arabic}</div>
          <div class="sw-result-context">${entry.context}</div>
          <a class="sw-view-full" href="scriptures.html?q=${encodeURIComponent(entry.reference)}">View in full library &rarr;</a>
        </div>
      </div>`;
    }).join('');

    statsEl.textContent = entries.length > 20
      ? `Showing 20 of ${entries.length} results`
      : `${entries.length} result${entries.length !== 1 ? 's' : ''}`;
  }

  // Events
  document.getElementById('swSearchInput').addEventListener('input', function() {
    swQuery = this.value;
    renderWidget();
  });

  document.getElementById('swFilters').addEventListener('click', function(e) {
    const chip = e.target.closest('.sw-filter-chip');
    if (!chip) return;
    const tid = chip.dataset.topic;
    swTopic = (swTopic === tid) ? null : tid;
    renderWidget();
  });

  document.getElementById('swResults').addEventListener('click', function(e) {
    const card = e.target.closest('.sw-result-card');
    if (!card || e.target.closest('.sw-view-full')) return;
    const eid = parseInt(card.dataset.eid);
    if (swExpanded.has(eid)) { swExpanded.delete(eid); } else { swExpanded.add(eid); }
    card.classList.toggle('expanded');
  });

  // Initial render when first opened
  renderWidgetFilters();
})();
