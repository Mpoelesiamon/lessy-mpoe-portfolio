/* Suggests where a visitor probably meant to go, based on the address they typed. */
(() => {
  const norm = s => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const typed = norm(decodeURIComponent(location.pathname));
  if (!typed) return;
  const bigrams = s => { const t = s.replace(/ /g, ''); const out = new Map(); for (let i = 0; i < t.length - 1; i++) { const g = t.slice(i, i + 2); out.set(g, (out.get(g) || 0) + 1); } return out; };
  const dice = (a, b) => {                       // similarity between two words, 0 to 1
    const x = bigrams(a), y = bigrams(b); let hits = 0, total = 0;
    x.forEach((n, g) => { hits += Math.min(n, y.get(g) || 0); total += n; }); y.forEach(n => { total += n; });
    return total ? (2 * hits) / total : 0;
  };
  const pages = [['Work', '/#work'], ['All projects', '/#index'], ['Practice', '/#journey'], ['About', '/#about'], ['Contact', '/#contact'], ['Home', '/']];
  const all = typeof projects !== 'undefined' ? projects : [];
  const candidates = [...pages, ...all.filter(p => p.category !== 'Learning').map(p => [p.name, `/#project=${p.id}`])];
  const words = typed.split(' ');
  const scored = candidates.map(([label, href]) => {
    const l = norm(label);
    const best = Math.max(dice(typed, l), ...words.map(w => w.length > 2 ? dice(w, l) : 0), l.includes(typed) || typed.includes(l) ? 0.9 : 0);
    return { label, href, score: best };
  }).filter(c => c.score >= 0.4).sort((a, b) => b.score - a.score).slice(0, 4);
  if (!scored.length) return;
  document.getElementById('suggest-list').innerHTML = scored.map(c => `<li><a href="${c.href}">${c.label.replace(/[&<>"]/g, '')}</a></li>`).join('');
  document.getElementById('suggest').hidden = false;
})();
