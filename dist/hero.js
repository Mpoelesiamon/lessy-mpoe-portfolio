/* Hero interactions: growth field, kinetic wordmark, portrait "source" lens.
   Pure vanilla; pauses when off-screen; respects reduced motion. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduce = root.classList.contains('reduce-motion');
  const hero = document.getElementById('top');
  const canvas = document.getElementById('field');
  if (!hero || !canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  const letters = [...document.querySelectorAll('#hero-name span')];
  const mouse = { x: -9999, y: -9999, on: false, cx: -9999, cy: -9999 };
  const coarse = window.matchMedia('(pointer:coarse)').matches;

  let W = 0, H = 0, dpr = 1, parts = [], running = false, raf = 0, t = 0, visible = true;
  let bg = '10,10,15', ca = '255,106,43', cb = '110,150,255';

  const rand = (a, b) => a + Math.random() * (b - a);
  const readColors = () => {
    const cs = getComputedStyle(root);
    bg = cs.getPropertyValue('--field-bg').trim() || bg;
    ca = cs.getPropertyValue('--field-a').trim() || ca;
    cb = cs.getPropertyValue('--field-b').trim() || cb;
    ctx.fillStyle = `rgb(${bg})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  function seed(p, anywhere) {
    p.x = rand(0, W);
    p.y = anywhere ? rand(0, H) : H + rand(0, 60 * dpr);
    p.px = p.x; p.py = p.y; p.vx = 0; p.vy = 0;
    p.age = 0; p.life = rand(220, 620);
    p.s = rand(.55, 1.5); p.g = Math.random() < .72 ? 0 : 1;
    return p;
  }

  function resize() {
    const r = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.max(1, Math.round(r.width * dpr));
    H = canvas.height = Math.max(1, Math.round(r.height * dpr));
    const density = (r.width < 700 || coarse) ? 1100 : 620;
    const n = Math.min(2600, Math.round((r.width * r.height) / density));
    parts = Array.from({ length: n }, () => seed({}, true));
    readColors();
    if (reduce) staticFrame();
  }

  const flow = (x, y) => {
    const nx = x / W * 5.2, ny = y / H * 3.6;
    return (Math.sin(nx * 1.3 + t * .00042) + Math.cos(ny * 1.8 - t * .0003) + Math.sin((nx + ny) * .9 + t * .0002)) * 1.05 - 1.35;
  };

  function step() {
    ctx.fillStyle = `rgba(${bg},.085)`;
    ctx.fillRect(0, 0, W, H);
    const R = 170 * dpr, R2 = R * R;
    const groups = [[], []];
    for (const p of parts) {
      const a = flow(p.x, p.y);
      p.vx += Math.cos(a) * .075 * p.s * dpr;
      p.vy += Math.sin(a) * .075 * p.s * dpr;
      if (mouse.on) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 1) {
          const d = Math.sqrt(d2), f = (1 - d / R) ** 2;
          p.vx += (dx / d) * f * 1.5 * dpr + (-dy / d) * f * 1.1 * dpr;
          p.vy += (dy / d) * f * 1.5 * dpr + (dx / d) * f * 1.1 * dpr;
        }
      }
      p.vx *= .94; p.vy *= .94;
      p.px = p.x; p.py = p.y;
      p.x += p.vx; p.y += p.vy;
      p.age++;
      if (p.age > p.life || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 80) { seed(p, false); continue; }
      groups[p.g].push(p);
    }
    ctx.lineWidth = 1.15 * dpr;
    ctx.lineCap = 'round';
    [ca, cb].forEach((c, i) => {
      ctx.strokeStyle = `rgba(${c},${i ? .42 : .6})`;
      ctx.beginPath();
      for (const p of groups[i]) { ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); }
      ctx.stroke();
    });
  }

  function staticFrame() {
    ctx.fillStyle = `rgb(${bg})`;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 220; i++) { t += 16; step(); }
  }

  /* kinetic wordmark: weight / width follow proximity to the cursor (idle wave otherwise) */
  function animateName() {
    if (!letters.length) return;
    letters.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      let p = 0;
      if (mouse.on) {
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const d = Math.hypot(mouse.cx - cx, mouse.cy - cy);
        p = Math.max(0, 1 - d / (r.width * 2.1));
      }
      const idle = (.5 + .5 * Math.sin(t * .0016 + i * .85)) * .28;
      const v = Math.min(1, p + idle);
      el.style.setProperty('--w', Math.round(260 + 540 * v));
      el.style.setProperty('--wd', Math.round(76 + 24 * v));
      el.style.setProperty('--p', v.toFixed(3));
    });
  }

  function loop(now) {
    if (!running) return;
    t = now;
    step();
    animateName();
    raf = requestAnimationFrame(loop);
  }
  const start = () => { if (!running && !reduce && visible && !document.hidden) { running = true; raf = requestAnimationFrame(loop); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  new MutationObserver(readColors).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(resize, 150); });

  hero.addEventListener('pointermove', e => {
    const r = hero.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * dpr; mouse.y = (e.clientY - r.top) * dpr;
    mouse.cx = e.clientX; mouse.cy = e.clientY; mouse.on = true;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { mouse.on = false; });
  hero.addEventListener('pointerdown', e => {
    if (reduce || e.target.closest('a,button,.portrait')) return;
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) * dpr, y = (e.clientY - r.top) * dpr;
    for (let i = 0; i < 90 && i < parts.length; i++) {            // "plant a seed": burst of growth
      const p = parts[(Math.random() * parts.length) | 0];
      p.x = p.px = x; p.y = p.py = y; p.age = 0;
      const a = rand(-Math.PI * 1.1, -Math.PI * -.1 - Math.PI);   // mostly upward fan
      const s = rand(2, 9) * dpr;
      p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s - 2 * dpr;
    }
  });

  resize();
  if (!reduce) start();

  /* ───────── Portrait lens: reveal the photo as live ASCII ───────── */
  const frame = document.querySelector('.portrait-frame');
  const img = frame && frame.querySelector('img');
  const lens = document.getElementById('lens');
  const toggle = document.getElementById('lens-toggle');
  const portrait = document.getElementById('portrait');
  if (!frame || !img || !lens) return;
  const lctx = lens.getContext('2d');
  let ascii = null, w = 0, h = 0, lx = 0, ly = 0, tx = 0, ty = 0, rad = 0, trad = 0, full = false, lraf = 0, demo = 0, demoDone = false;
  const RAMP = ' .:-=+*#%@';

  function build() {
    if (!img.complete || !img.naturalWidth) { img.addEventListener('load', build, { once: true }); return; }
    const r = frame.getBoundingClientRect();
    if (!r.width) return;
    w = Math.round(r.width); h = Math.round(r.height);
    const d = Math.min(window.devicePixelRatio || 1, 2);
    lens.width = w * d; lens.height = h * d;
    lctx.setTransform(d, 0, 0, d, 0, 0);
    const cols = Math.max(36, Math.round(w / 6.5));
    const fs = (w / cols) / .6;
    const rows = Math.max(1, Math.floor(h / fs));
    const tmp = document.createElement('canvas'); tmp.width = cols; tmp.height = rows;
    const tc = tmp.getContext('2d', { willReadFrequently: true });
    const ar = w / h, iar = img.naturalWidth / img.naturalHeight;     // object-fit: cover crop
    let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
    if (iar > ar) { sw = sh * ar; sx = (img.naturalWidth - sw) / 2; } else { sh = sw / ar; sy = (img.naturalHeight - sh) / 2; }
    try { tc.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows); } catch { return; }
    let data; try { data = tc.getImageData(0, 0, cols, rows).data; } catch { return; }
    ascii = document.createElement('canvas'); ascii.width = w * d; ascii.height = h * d;
    const ac = ascii.getContext('2d');
    ac.scale(d, d);
    ac.fillStyle = 'rgba(10,8,12,.92)'; ac.fillRect(0, 0, w, h);
    ac.font = `500 ${fs}px "JetBrains Mono", monospace`; ac.textBaseline = 'top';
    const cw = w / cols;
    // Histogram-equalise luminance so the face separates cleanly from the backdrop.
    const lum = new Float32Array(cols * rows);
    for (let k = 0; k < lum.length; k++) lum[k] = (.2126 * data[k * 4] + .7152 * data[k * 4 + 1] + .0722 * data[k * 4 + 2]) / 255;
    const order = [...lum.keys()].sort((a, b) => lum[a] - lum[b]);
    const eq = new Float32Array(lum.length);
    order.forEach((idx, rank) => { eq[idx] = rank / (lum.length - 1); });
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const l = eq[y * cols + x];
      const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(l * RAMP.length))];
      if (ch === ' ') continue;
      ac.fillStyle = `rgba(255,106,43,${(.35 + .65 * l).toFixed(2)})`;
      ac.fillText(ch, x * cw, y * fs);
    }
    draw();
  }

  function draw() {
    lctx.clearRect(0, 0, w, h);
    if (!ascii || rad < .5) return;
    lctx.globalCompositeOperation = 'source-over';
    lctx.drawImage(ascii, 0, 0, w, h);
    lctx.globalCompositeOperation = 'destination-in';
    const g = lctx.createRadialGradient(lx, ly, rad * .55, lx, ly, rad);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    lctx.fillStyle = g; lctx.fillRect(0, 0, w, h);
    lctx.globalCompositeOperation = 'source-over';
  }

  function tick(now) {
    if (demo && now < demo) {
      const k = 1 - (demo - now) / 3400;
      tx = w * (.5 + .28 * Math.sin(k * 5.2)); ty = h * (.42 + .22 * Math.sin(k * 7.1 + 1));
      trad = Math.min(w, h) * .3;
    } else if (demo) { demo = 0; if (!mouseIn && !full) trad = 0; }
    lx += (tx - lx) * .2; ly += (ty - ly) * .2; rad += (trad - rad) * .14;
    draw();
    if (Math.abs(trad - rad) > .4 || Math.hypot(tx - lx, ty - ly) > .5 || demo) lraf = requestAnimationFrame(tick);
    else { lraf = 0; draw(); }
  }
  const kick = () => { if (!lraf) lraf = requestAnimationFrame(tick); };
  let mouseIn = false;
  const setPos = e => { const r = frame.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (!mouseIn) { lx = tx; ly = ty; } };
  frame.addEventListener('pointerenter', e => { mouseIn = true; demo = 0; setPos(e); if (!full) trad = Math.min(w, h) * .3; portrait.classList.add('touched'); kick(); });
  frame.addEventListener('pointermove', e => { demo = 0; setPos(e); kick(); }, { passive: true });
  frame.addEventListener('pointerleave', () => { mouseIn = false; if (!full) trad = 0; kick(); });
  frame.addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') setTimeout(() => { if (!full) { mouseIn = false; trad = 0; kick(); } }, 900); });

  toggle && toggle.addEventListener('click', () => {
    full = !full;
    toggle.setAttribute('aria-pressed', String(full));
    toggle.firstElementChild.textContent = full ? 'Hide source' : 'View source';
    trad = full ? Math.hypot(w, h) * 1.2 : 0;
    if (full) { tx = lx = w / 2; ty = ly = h / 2; portrait.classList.add('touched'); }
    kick();
  });

  const ready = (document.fonts && document.fonts.load) ? document.fonts.load('12px "JetBrains Mono"') : Promise.resolve();
  ready.catch(() => {}).then(build);
  let lz; window.addEventListener('resize', () => { clearTimeout(lz); lz = setTimeout(() => { build(); if (full) trad = Math.hypot(w, h) * 1.2; kick(); }, 200); });

  // One-time "hey, look" demo when the portrait first appears.
  if (!reduce) new IntersectionObserver((entries, io) => {
    if (entries[0].isIntersecting && !demoDone) {
      demoDone = true; io.disconnect();
      setTimeout(() => { if (!mouseIn && !full) { demo = performance.now() + 3400; kick(); } }, 1800);
    }
  }, { threshold: .6 }).observe(frame);
})();
