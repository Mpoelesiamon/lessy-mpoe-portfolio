(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('#theme-toggle');
  const meta = document.querySelector('meta[name="theme-color"]');
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let hasPreference = false;
  try { hasPreference = ['light', 'dark'].includes(localStorage.getItem('lessy-theme')); } catch {}
  function apply(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    toggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
    toggle.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    meta.setAttribute('content', dark ? '#121a17' : '#f5f4ef');
  }
  apply(root.dataset.theme);
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    hasPreference = true;
    try { localStorage.setItem('lessy-theme', next); } catch {}
    apply(next);
  });
  system.addEventListener('change', event => {
    if (!hasPreference) apply(event.matches ? 'dark' : 'light');
  });
})();
