(() => {
  const root = document.documentElement;
  let saved;
  try { saved = localStorage.getItem('lessy-theme'); } catch {}
  const dark = saved === 'dark';                     // light is the default; dark only if the visitor chose it
  root.dataset.theme = dark ? 'dark' : 'light';
  root.style.colorScheme = dark ? 'dark' : 'light';
  root.classList.replace('no-js', 'js');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) root.classList.add('reduce-motion');
  try { if (sessionStorage.getItem('lessy-booted')) root.classList.add('booted'); } catch {}
})();
