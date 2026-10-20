/* Portfolio behaviour. Vanilla JS, no build step.
   Sections: helpers · theme · intro · reveals · chrome · work · index · journey · stats · case · palette · contact */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = root.classList.contains('reduce-motion');
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const EMAIL = 'mpoelessy839@gmail.com';
  const all = typeof projects !== 'undefined' ? projects : [];
  const work = all.filter(p => p.category !== 'Learning');
  const learning = all.filter(p => p.category === 'Learning');
  const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  const HUES = [14, 20, 26, 32];            // fallback covers stay in the orange family
  const thumbOf = p => p.cover.replace('.webp', '-640.webp');
  const hue = id => HUES[[...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 997, 7) % HUES.length];

  let toastTimer;
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* Show the right shortcut for the platform (Ctrl K on Windows and Linux) */
  if (!/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent)) $$('.kbd-hint').forEach(k => { k.textContent = 'Ctrl K'; });

  /* ───────── Theme ───────── */
  const themeBtn = $('#theme-toggle');
  const meta = $('meta[name="theme-color"]');
  function applyTheme(theme) {
    root.dataset.theme = theme; root.style.colorScheme = theme;
    themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    meta && meta.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#f5f1ea');
  }
  const toggleTheme = () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('lessy-theme', next); } catch {}
    applyTheme(next);
  };
  applyTheme(root.dataset.theme);
  themeBtn.addEventListener('click', toggleTheme);

  /* ───────── Word-split headings ───────── */
  function split(el) {
    let i = 0;
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(tok => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const s = document.createElement('span'); s.textContent = tok; s.style.setProperty('--i', i++);
          w.appendChild(s); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el);
  }
  if (!reduce) $$('[data-split]').forEach(split);

  /* ───────── Intro: "Hello. I am Finehas Mpoe." ───────── */
  const heroEls = $$('#top [data-split], #top [data-reveal]');
  const enterHero = () => {
    root.classList.add('ready');
    heroEls.forEach((el, i) => { el.style.setProperty('--d', `${i * .12}s`); el.classList.add('in'); });
  };
  const boot = $('#boot');
  if (boot && !root.classList.contains('booted') && !reduce) {
    let finished = false, stage2 = false;
    const count = $('.boot-count', boot);
    const DURATION = 2300;
    const t0 = performance.now();
    const behind = $$('.site-header, main, footer');
    behind.forEach(el => { el.inert = true; });           // keep keyboard focus and screen readers on the welcome screen
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => boot.classList.add('play')));
    const tickCount = now => {
      if (finished || stage2) return;
      const k = Math.min(1, (now - t0) / DURATION);
      count.textContent = String(Math.round(k * k * (3 - 2 * k) * 100)).padStart(3, '0');
      if (k < 1) requestAnimationFrame(tickCount); else goLanding();
    };
    requestAnimationFrame(tickCount);

    // Stage two: the interactive logo.
    function goLanding() {
      if (finished || stage2) return;
      if (!window.LessyLanding) { finish(); return; }
      stage2 = true;
      count.textContent = '100';
      boot.classList.add('stage2');
      window.LessyLanding.start($('#logo-canvas'));
      $('#enter').focus({ preventScroll: true });
      window.removeEventListener('keydown', skipIntro); boot.removeEventListener('pointerdown', skipIntro);
      $('#enter').addEventListener('click', finish);
      window.addEventListener('keydown', onLandingKey);
      boot.addEventListener('wheel', onWheel, { passive: true });
      let ty = null;
      boot.addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
      boot.addEventListener('touchmove', e => { if (ty !== null && ty - e.touches[0].clientY > 70) finish(); }, { passive: true });
      setTimeout(finish, 9000);                           // nobody is stuck here
    }
    const onLandingKey = e => { if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') { e.preventDefault(); finish(); } };
    const onWheel = e => { if (Math.abs(e.deltaY) > 20) finish(); };
    // Skipping during the intro text goes straight to the site.
    function skipIntro() { finish(); }
    window.addEventListener('keydown', skipIntro); boot.addEventListener('pointerdown', skipIntro);

    function finish() {
      if (finished) return; finished = true;
      boot.classList.add('done');
      document.body.style.overflow = '';
      behind.forEach(el => { el.inert = false; });
      try { sessionStorage.setItem('lessy-booted', '1'); } catch {}
      setTimeout(enterHero, 380);
      setTimeout(() => { window.LessyLanding && window.LessyLanding.stop(); boot.remove(); }, 1500);
      window.removeEventListener('keydown', skipIntro); window.removeEventListener('keydown', onLandingKey);
      boot.removeEventListener('pointerdown', skipIntro); boot.removeEventListener('wheel', onWheel);
    }
    setTimeout(finish, DURATION + 12000);                  // failsafe
  } else {
    requestAnimationFrame(enterHero);
  }

  /* ───────── Reveal on scroll ───────── */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal],[data-split],#wall').forEach(el => { if (!el.closest('#top')) io.observe(el); });

  /* ───────── Chrome: header, progress, nav state, glow, tip, magnet ───────── */
  const header = $('.site-header');
  const bar = $('#progress');
  const navLinks = $$('[data-nav]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
      header.classList.toggle('scrolled', y > 24);
      if (y < 320) navLinks.forEach(l => l.removeAttribute('aria-current'));
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      updateWork();
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const navIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.setAttribute('aria-current', String(a.dataset.nav === e.target.id)));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'index', 'journey', 'about', 'contact'].forEach(id => { const s = document.getElementById(id); s && navIO.observe(s); });

  if (finePointer) {
    const glow = $('#glow'), tip = $('#tip');
    window.addEventListener('pointermove', e => {
      glow.classList.add('on');
      glow.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      tip.style.transform = `translate3d(${e.clientX + 18}px,${e.clientY + 18}px,0)`;
    }, { passive: true });
    document.addEventListener('pointerleave', () => glow.classList.remove('on'));
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor]');
      if (t) { tip.textContent = t.dataset.cursor; tip.classList.add('on'); } else tip.classList.remove('on');
    });
    if (!reduce) $$('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * .28, y = (e.clientY - (r.top + r.height / 2)) * .28;
        el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ───────── Rotating role line ───────── */
  const roleEl = $('#role');
  if (roleEl && !reduce) {
    const roles = ['design things that grow', 'build WordPress websites', 'ship AI agents', 'automate the boring parts', 'train the next developers'];
    let ri = 0, ci = roles[0].length, del = false;
    const typeLoop = () => {
      const word = roles[ri];
      ci += del ? -1 : 1;
      roleEl.textContent = word.slice(0, ci);
      let wait = del ? 28 : 62;
      if (!del && ci === word.length) { del = true; wait = 1700; }
      else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 350; }
      setTimeout(typeLoop, wait);
    };
    setTimeout(typeLoop, 3600);
  }

  /* ───────── Selected work: fill + pinned horizontal scroll ───────── */
  $$('.slide').forEach(slide => {
    const p = all.find(x => x.id === slide.dataset.slide); if (!p) return;
    $('[data-fill="summary"]', slide).textContent = p.summary;
    $('[data-fill="stack"]', slide).innerHTML = p.stack.split(',').slice(0, 5).map(s => `<li>${esc(s.trim())}</li>`).join('');
  });

  const workSec = $('#work'), track = $('#work-track'), viewport = $('.work-viewport');
  const slides = $$('.slide'), counter = $('#work-current'), workBar = $('#work-bar');
  const mq = window.matchMedia('(min-width: 901px)');
  let pinned = false, travel = 0, secTop = 0, padTop = 0, curX = 0, tgtX = 0, wraf = 0, lastIdx = -1;

  function layoutWork() {
    const should = mq.matches && !reduce;
    if (should !== pinned) { pinned = should; workSec.classList.toggle('is-pinned', pinned); }
    if (!pinned) { workSec.style.height = ''; track.style.transform = ''; slides.forEach(s => $('.slide-media', s).style.removeProperty('--px')); return; }
    padTop = parseFloat(getComputedStyle(workSec).paddingTop) || 0;
    travel = Math.max(0, track.scrollWidth - window.innerWidth);
    workSec.style.height = `${travel + window.innerHeight + padTop}px`;
    secTop = workSec.getBoundingClientRect().top + window.scrollY;
    updateWork(true);
  }
  function updateWork(snap) {
    if (!pinned || !travel) return;
    const p = Math.min(1, Math.max(0, (window.scrollY - (secTop + padTop)) / travel));
    tgtX = -p * travel;
    if (snap) curX = tgtX;
    workBar.style.transform = `scaleX(${p})`;
    const idx = Math.round(p * (slides.length - 1));
    if (idx !== lastIdx) { lastIdx = idx; counter.textContent = String(idx + 1).padStart(2, '0'); }
    if (!wraf) wraf = requestAnimationFrame(glide);
  }
  function glide() {
    curX += (tgtX - curX) * .12;
    if (Math.abs(tgtX - curX) < .1) curX = tgtX;
    track.style.transform = `translate3d(${curX.toFixed(2)}px,0,0)`;
    slides.forEach(s => {
      const r = s.getBoundingClientRect();
      const d = (r.left + r.width / 2 - window.innerWidth / 2);
      $('.slide-media', s).style.setProperty('--px', `${Math.max(-70, Math.min(70, -d * .07)).toFixed(1)}px`);
    });
    wraf = curX === tgtX ? 0 : requestAnimationFrame(glide);
  }
  viewport.addEventListener('scroll', () => { viewport.scrollLeft = 0; });
  track.addEventListener('focusin', e => {
    if (!pinned) return;
    const s = e.target.closest('.slide'); if (!s) return;
    const i = slides.indexOf(s);
    window.scrollTo({ top: secTop + padTop + (slides.length > 1 ? i / (slides.length - 1) : 0) * travel, behavior: 'instant' });
    viewport.scrollLeft = 0;
  });
  mq.addEventListener('change', layoutWork);
  let wz; window.addEventListener('resize', () => { clearTimeout(wz); wz = setTimeout(layoutWork, 120); });
  window.addEventListener('load', layoutWork);
  layoutWork();

  /* ───────── Index: tiles + filters + stack explorer ───────── */
  const TECH = [
    ['WordPress', /wordpress/i], ['Elementor', /elementor/i], ['React', /\breact\b/i], ['TypeScript', /typescript/i],
    ['JavaScript', /javascript/i], ['Next.js', /next\.js/i], ['Supabase', /supabase/i], ['Tailwind', /tailwind/i],
    ['.NET', /\.net/i], ['AI agents', /ai agents|llm|gemini/i], ['Node.js', /node\.js/i], ['PHP', /\bphp\b/i], ['n8n', /n8n/i]
  ];
  const techOf = p => new Set(TECH.filter(([, re]) => re.test(p.stack)).map(([n]) => n));
  work.forEach(p => { p.techs = techOf(p); });
  const techs = TECH.map(([n]) => [n, work.filter(p => p.techs.has(n)).length]).filter(([, c]) => c >= 2);
  const CAT_VAR = { Web: '--c-react', AI: '--c-js', Design: '--c-html' };
  const tilesEl = $('#tiles'), techsEl = $('#techs'), statusEl = $('#index-status'), searchEl = $('#search');
  let cat = 'All', tech = null, preview = null, q = '';

  techsEl.innerHTML = techs.map(([n, c]) => `<button class="tech" type="button" aria-pressed="false" data-tech="${esc(n)}">${esc(n)} <b>${c}</b></button>`).join('');
  tilesEl.innerHTML = work.map(p => {
    const thumb = p.cover
      ? `<img src="${esc(thumbOf(p))}" alt="" width="640" height="400" loading="lazy" decoding="async">`
      : `<span class="tile-fallback" style="--h:${hue(p.id)}" aria-hidden="true">${esc(p.name.replace(/ \/ .*/, ''))}</span>`;
    return `<button class="tile" type="button" data-project="${esc(p.id)}" style="--dot:var(${CAT_VAR[p.category] || '--accent'})" data-cursor="Open">
    <span class="tile-thumb">${thumb}</span>
    <span class="tile-body"><span class="tile-cat"><i></i>${esc(p.category === 'Design' ? 'Gallery & design' : p.category === 'AI' ? 'AI & automation' : 'Web & product')}</span>
    <span><span class="tile-name">${esc(p.name)}</span><span class="tile-focus">${esc(p.focus)}</span></span></span><span class="tile-arrow">${arrow}</span></button>`;
  }).join('');
  const tiles = $$('.tile', tilesEl);

  function renderIndex() {
    const active = preview || tech, term = q.trim().toLowerCase();
    let n = 0;
    work.forEach((p, i) => {
      const ok = (cat === 'All' || p.category === cat) && (!active || p.techs.has(active)) && (!term || `${p.name} ${p.focus} ${p.stack} ${p.context}`.toLowerCase().includes(term));
      tiles[i].classList.toggle('is-dim', !ok);
      tiles[i].tabIndex = ok ? 0 : -1;
      tiles[i].setAttribute('aria-hidden', String(!ok));
      if (ok) n++;
    });
    statusEl.textContent = `${n} of ${work.length} projects${active ? ` · ${active}` : ''}${cat !== 'All' ? ` · ${cat}` : ''}`;
    $$('.tech', techsEl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tech === tech)));
  }
  $$('[data-cat]').forEach(b => b.addEventListener('click', () => {
    cat = b.dataset.cat; $$('[data-cat]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); renderIndex();
  }));
  techsEl.addEventListener('click', e => { const b = e.target.closest('.tech'); if (!b) return; tech = tech === b.dataset.tech ? null : b.dataset.tech; preview = null; renderIndex(); });
  if (finePointer) {
    techsEl.addEventListener('pointerover', e => { const b = e.target.closest('.tech'); if (b && !tech) { preview = b.dataset.tech; renderIndex(); } });
    techsEl.addEventListener('pointerleave', () => { if (preview) { preview = null; renderIndex(); } });
  }
  searchEl.addEventListener('input', () => { q = searchEl.value; renderIndex(); });
  tilesEl.addEventListener('pointermove', e => {
    const t = e.target.closest('.tile'); if (!t) return;
    const r = t.getBoundingClientRect(); t.style.setProperty('--mx', `${e.clientX - r.left}px`); t.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
  renderIndex();

  /* ───────── Journey wall ───────── */
  const TRACKS = { js: ['JavaScript', '--c-js'], html: ['HTML', '--c-html'], react: ['React', '--c-react'], py: ['Python', '--c-py'], proj: ['Projects & challenges', '--c-proj'] };
  const trackOf = name => {
    const n = name.toLowerCase();
    if (/python|^py|p3-|p4-|ipdb|wsgi|formik/.test(n)) return 'py';
    if (/react|hooks/.test(n)) return 'react';
    if (/project|challenge|wk\d|assignment|new-/.test(n)) return 'proj';
    if (/html/.test(n)) return 'html';
    return 'js';
  };
  const wall = $('#wall'), tip = $('#wall-tip');
  const counts = {};
  wall.innerHTML = learning.map((p, i) => {
    const t = trackOf(p.name); counts[t] = (counts[t] || 0) + 1;
    const url = (p.links[0] && p.links[0][1]) || 'https://github.com/Mpoelesiamon';
    return `<a class="cell" role="listitem" href="${esc(url)}" target="_blank" rel="noopener noreferrer" style="--c:var(${TRACKS[t][1]});--i:${i}" data-label="${esc(p.name)} · ${TRACKS[t][0]}" aria-label="${esc(p.name)}, ${TRACKS[t][0]}, opens GitHub"></a>`;
  }).join('');
  $('#repo-count').textContent = learning.length;
  $('#legend').innerHTML = Object.entries(TRACKS).map(([k, [label, v]]) => `<span style="--c:var(${v})"><i></i>${label} ${counts[k] || 0}</span>`).join('');
  const setTip = e => { const c = e.target.closest('.cell'); if (c) tip.textContent = c.dataset.label; };
  wall.addEventListener('pointerover', setTip); wall.addEventListener('focusin', setTip);
  // One tab stop for the whole wall; arrow keys, Home and End move between squares.
  const cells = $$('.cell', wall);
  cells.forEach((c, i) => { c.tabIndex = i === 0 ? 0 : -1; });
  wall.addEventListener('keydown', e => {
    const i = cells.indexOf(document.activeElement); if (i < 0) return;
    const perRow = Math.max(1, Math.round(wall.clientWidth / (cells[0].offsetWidth + 9)));
    const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: perRow, ArrowUp: -perRow }[e.key];
    let n = step !== undefined ? i + step : e.key === 'Home' ? 0 : e.key === 'End' ? cells.length - 1 : null;
    if (n === null) return;
    e.preventDefault(); n = Math.max(0, Math.min(cells.length - 1, n));
    cells[i].tabIndex = -1; cells[n].tabIndex = 0; cells[n].focus();
  });

  /* ───────── Stats ───────── */
  const statsEl = $('#stats');
  const stats = [[work.length, 'Projects'], [learning.length, 'Repositories'], [techs.length, 'Tools in rotation']];
  statsEl.innerHTML = stats.map(([n, l]) => `<div class="stat"><b data-to="${n}">${reduce ? n : 0}</b><span>${l}</span></div>`).join('');
  if (!reduce) new IntersectionObserver((en, ob) => {
    if (!en[0].isIntersecting) return; ob.disconnect();
    $$('b[data-to]', statsEl).forEach(b => {
      const to = +b.dataset.to, t0 = performance.now();
      const run = now => { const k = Math.min(1, (now - t0) / 1400); b.textContent = Math.round(to * (1 - (1 - k) ** 3)); if (k < 1) requestAnimationFrame(run); };
      requestAnimationFrame(run);
    });
  }, { threshold: .5 }).observe(statsEl);

  /* ───────── Case notes drawer ───────── */
  const caseDlg = $('#case'), caseBody = $('#case-body');
  let lastTrigger = null, currentId = null;
  function openCase(id, trigger) {
    const p = all.find(x => x.id === id); if (!p) return;
    lastTrigger = trigger || document.activeElement; currentId = id;
    const next = work[(work.findIndex(x => x.id === id) + 1) % work.length];
    const visual = p.cover
      ? `<img src="${esc(p.cover)}" alt="Screenshot of ${esc(p.name)}" width="1280" height="800">`
      : `<div class="mono-initial" aria-hidden="true">${esc(p.name.trim()[0])}</div>`;
    caseBody.innerHTML = `
      <div class="case-visual" style="--hue:${hue(id)}">${visual}</div>
      <p class="eyebrow case-context">${esc(p.context)}</p>
      <h2 id="case-title">${esc(p.name)}</h2>
      <p class="case-summary">${esc(p.summary)}</p>
      <dl class="facts"><div><dt>Focus</dt><dd>${esc(p.focus)}</dd></div><div><dt>Built with</dt><dd>${esc(p.stack)}</dd></div></dl>
      <p class="case-notes">${esc(p.notes)}</p>
      ${p.tools ? `<ul class="case-tools" aria-label="Tools in ${esc(p.name)}">${p.tools.map(t => `<li><b>${esc(t.name)}</b><span>${esc(t.text)}</span></li>`).join('')}</ul>` : ''}
      <div class="case-links">${p.links.map(([l, u]) => `<a class="btn btn-primary" href="${esc(u)}" target="_blank" rel="noopener noreferrer"><span>${esc(l)}</span>${arrow}</a>`).join('')}<a class="btn btn-ghost" href="mailto:${EMAIL}?subject=${encodeURIComponent('About ' + p.name)}"><span>Ask about this</span></a></div>
      ${work.length > 1 && next.id !== id ? `<div class="case-next"><span class="eyebrow">Next project</span><button class="btn btn-ghost" type="button" data-next="${esc(next.id)}"><span>${esc(next.name)}</span>${arrow}</button></div>` : ''}`;
    caseDlg.setAttribute('aria-labelledby', 'case-title');
    caseDlg.scrollTop = 0;
    if (!caseDlg.open) caseDlg.showModal();
    if (location.hash !== `#project=${id}`) history.replaceState(null, '', `#project=${id}`);
    $('#case-close').focus({ preventScroll: true });
  }
  document.addEventListener('click', e => {
    const next = e.target.closest('[data-next]');
    if (next) { openCase(next.dataset.next, lastTrigger); return; }
    const b = e.target.closest('[data-project]');
    if (b) openCase(b.dataset.project, b);
  });
  $('#case-close').addEventListener('click', () => caseDlg.close());
  caseDlg.addEventListener('click', e => { if (e.target === caseDlg) caseDlg.close(); });
  caseDlg.addEventListener('close', () => {
    currentId = null;
    if (location.hash.startsWith('#project=')) history.replaceState(null, '', location.pathname + location.search);
    lastTrigger && lastTrigger.isConnected && lastTrigger.focus({ preventScroll: true });
  });
  // Shared links and old addresses like /projects/rena arrive as #project=rena.
  const openFromHash = () => { const m = /^#project=([\w-]+)$/.exec(location.hash); if (m && all.some(p => p.id === m[1]) && currentId !== m[1]) openCase(m[1], null); };
  window.addEventListener('hashchange', openFromHash);
  setTimeout(openFromHash, 0);
  // If a cover ever fails to load, fall back to the designed cover instead of a broken image.
  document.addEventListener('error', e => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    if (img.closest('.tile-thumb')) { const name = img.closest('.tile').querySelector('.tile-name').textContent; img.replaceWith(Object.assign(document.createElement('span'), { className: 'tile-fallback', textContent: name, ariaHidden: 'true' })); }
    else if (img.closest('.case-visual')) { img.replaceWith(Object.assign(document.createElement('div'), { className: 'mono-initial', textContent: ($('#case-title') || {}).textContent ? $('#case-title').textContent.trim()[0] : '' })); }
  }, true);

  /* ───────── Command menu (⌘K) ───────── */
  const pal = $('#palette'), palQ = $('#palette-q'), palList = $('#palette-list');
  const go = hash => { const el = $(hash); el && el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
  const copyText = async (text, message = 'Copied to clipboard') => {
    try { await navigator.clipboard.writeText(text); toast(message); return true; }
    catch {
      const t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(t); t.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch {}
      t.remove(); toast(ok ? message : text); return ok;
    }
  };
  const WORK_EMAIL = 'lessy@prospergenics.com';
  const commands = [
    ...[['Work', '#work'], ['Index', '#index'], ['Journey', '#journey'], ['About', '#about'], ['Contact', '#contact']].map(([l, h]) => ({ label: `Go to ${l}`, hint: 'Section', run: () => go(h) })),
    { label: 'Toggle light / dark theme', hint: 'Action', run: toggleTheme },
    { label: 'Copy work email', hint: WORK_EMAIL, run: () => copyText(WORK_EMAIL, 'Work email copied') },
    { label: 'Copy personal email', hint: EMAIL, run: () => copyText(EMAIL, 'Personal email copied') },
    { label: 'Open GitHub profile', hint: 'Link', run: () => window.open('https://github.com/Mpoelesiamon', '_blank', 'noopener') },
    { label: 'Visit Prospergenics', hint: 'Link', run: () => window.open('https://prospergenics.com/', '_blank', 'noopener') },
    ...work.map(p => ({ label: p.name, hint: p.category === 'AI' ? 'AI project' : p.category === 'Design' ? 'Design project' : 'Web project', keys: `${p.focus} ${p.stack}`, run: () => openCase(p.id, $('#open-palette')) }))
  ];
  let results = [], sel = 0;
  function renderPalette() {
    const terms = palQ.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    results = commands.filter(c => terms.every(t => `${c.label} ${c.hint} ${c.keys || ''}`.toLowerCase().includes(t))).slice(0, 12);
    sel = Math.min(sel, Math.max(0, results.length - 1));
    palList.innerHTML = results.length
      ? results.map((c, i) => `<li role="option" id="opt-${i}" aria-selected="${i === sel}" data-i="${i}">${esc(c.label)}<small>${esc(c.hint)}</small></li>`).join('')
      : '<li class="palette-empty" role="option" aria-disabled="true" aria-selected="false">Nothing matches — try “react” or “AI”.</li>';
    palQ.setAttribute('aria-activedescendant', results.length ? `opt-${sel}` : '');
    const cur = $(`#opt-${sel}`); cur && cur.scrollIntoView({ block: 'nearest' });
  }
  function openPalette() { if (pal.open) return; palQ.value = ''; sel = 0; renderPalette(); pal.showModal(); palQ.focus(); }
  function runSelected(i = sel) { const c = results[i]; if (!c) return; pal.close(); setTimeout(c.run, 60); }
  palQ.addEventListener('input', () => { sel = 0; renderPalette(); });
  palQ.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(1, results.length); renderPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + results.length) % Math.max(1, results.length); renderPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); runSelected(); }
  });
  palList.addEventListener('click', e => { const li = e.target.closest('[data-i]'); if (li) runSelected(+li.dataset.i); });
  palList.addEventListener('pointermove', e => { const li = e.target.closest('[data-i]'); if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; $$('li', palList).forEach((x, i) => x.setAttribute('aria-selected', String(i === sel))); } });
  pal.addEventListener('click', e => { if (e.target === pal) pal.close(); });
  $('#open-palette').addEventListener('click', openPalette);
  $$('[data-open-palette]').forEach(b => b.addEventListener('click', openPalette));
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.open ? pal.close() : openPalette(); }
  });

  /* ───────── Contact: clipboard icons, mail links, Nairobi clock ───────── */
  const checkIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>';
  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-copy]');
    if (b) {
      const original = b.innerHTML;
      if (await copyText(b.dataset.copy, `Copied ${b.dataset.copy}`)) {
        b.innerHTML = checkIcon; b.classList.add('done');
        setTimeout(() => { b.innerHTML = original; b.classList.remove('done'); }, 1600);
      }
      return;
    }
    // Not everyone has a mail app set up, so a mail link also leaves the address on the clipboard.
    const m = e.target.closest('a[href^="mailto:"]');
    if (m) copyText(decodeURIComponent(m.getAttribute('href').slice(7).split('?')[0]), 'Email address copied, in case your mail app does not open');
  });

  /* Socials come from socials.js (built by scripts/build-socials.mjs) */
  const SOCIALS = typeof socials !== 'undefined' ? socials : [];
  if (SOCIALS.length) {
    $('#socials-list').innerHTML = SOCIALS.map(s => `<li><a class="social" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="${esc(s.path)}"/></svg><span>${esc(s.name)}</span></a></li>`).join('');
    $('#socials').hidden = false;
  }
  const clock = $('#clock');
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', hour12: false });
  const tickClock = () => { clock.textContent = fmt.format(new Date()); clock.dateTime = new Date().toISOString(); };
  tickClock(); setInterval(tickClock, 15000);

  onScroll();
})();
