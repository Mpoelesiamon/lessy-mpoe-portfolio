/* Small behaviour shared by the content pages: theme switch, copy buttons, mail links that also copy the address. */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const btn = $('#theme-toggle'), meta = $('meta[name="theme-color"]');
  const apply = theme => {
    root.dataset.theme = theme; root.style.colorScheme = theme;
    if (btn) { btn.setAttribute('aria-pressed', String(theme === 'dark')); btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); }
    meta && meta.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#f5f1ea');
  };
  apply(root.dataset.theme || 'light');
  btn && btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('lessy-theme', next); } catch {}
    apply(next);
  });

  let timer;
  const toast = msg => { const t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(timer); timer = setTimeout(() => t.classList.remove('show'), 2200); };
  const copy = async (text, msg) => {
    try { await navigator.clipboard.writeText(text); toast(msg); return true; }
    catch {
      const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(t); t.select(); let ok = false; try { ok = document.execCommand('copy'); } catch {} t.remove(); toast(ok ? msg : text); return ok;
    }
  };
  const check = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>';
  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-copy]');
    if (b) {
      const original = b.innerHTML;
      if (await copy(b.dataset.copy, `Copied ${b.dataset.copy}`)) { b.innerHTML = check; b.classList.add('done'); setTimeout(() => { b.innerHTML = original; b.classList.remove('done'); }, 1600); }
      return;
    }
    const m = e.target.closest('a[href^="mailto:"]');
    if (m) copy(decodeURIComponent(m.getAttribute('href').slice(7).split('?')[0]), 'Email address copied, in case your mail app does not open');
  });
})();
