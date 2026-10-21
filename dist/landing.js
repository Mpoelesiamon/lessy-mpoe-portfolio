/* The landing screen's interactive logo: the "lessy." wordmark built from particles.
   They assemble on arrival, scatter away from the cursor or a finger, and pull back together. */
(() => {
  'use strict';
  let canvas, ctx, parts = [], W = 0, H = 0, dpr = 1, size = 3, raf = 0, running = false, t = 0;
  const pointer = { x: -9999, y: -9999 };
  let colors = ['#15110e', '#ff6a2b'];

  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    colors = [cs.getPropertyValue('--ink').trim() || colors[0], cs.getPropertyValue('--accent').trim() || colors[1]];
  };

  // Sampling happens at CSS-pixel resolution (a fraction of the device pixels), then positions are scaled up.
  function sample() {
    const cw = Math.max(1, Math.round(W / dpr)), ch = Math.max(1, Math.round(H / dpr));
    const off = document.createElement('canvas'); off.width = cw; off.height = ch;
    const c = off.getContext('2d', { willReadFrequently: true });
    const fs = Math.min(cw * 0.37, ch * 0.62);
    c.font = `800 ${fs}px "Bricolage Grotesque", system-ui, sans-serif`;
    try { c.letterSpacing = `${-fs * 0.045}px`; } catch {}
    const word = 'lessy', dot = '.';
    const wW = c.measureText(word).width, dW = c.measureText(dot).width;
    const x0 = (cw - (wW + dW)) / 2, base = ch / 2 + fs * 0.3;
    const gap = Math.max(4, Math.round(fs / 46));                // a few thousand particles at most, fewer on phones
    size = Math.max(2, gap * 0.66 * dpr);
    const out = [];
    const read = (text, x, group) => {
      c.clearRect(0, 0, cw, ch); c.fillStyle = '#000'; c.fillText(text, x, base);
      const d = c.getImageData(0, 0, cw, ch).data;
      for (let y = 0; y < ch; y += gap) for (let xx = 0; xx < cw; xx += gap) if (d[(y * cw + xx) * 4 + 3] > 128) out.push([xx * dpr, y * dpr, group]);
    };
    read(word, x0, 0); read(dot, x0 + wW, 1);
    const cx = W / 2, cy = H / 2;
    parts = out.map(([hx, hy, g]) => {
      const a = Math.random() * Math.PI * 2, r = Math.max(W, H) * (0.5 + Math.random() * 0.7);
      return { hx, hy, g, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, vx: 0, vy: 0 };
    });
  }

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    W = canvas.width = Math.max(1, Math.round(r.width * dpr)); H = canvas.height = Math.max(1, Math.round(r.height * dpr));
    sample();
  }

  function frame(now) {
    if (!running) return;
    if (document.hidden) { raf = requestAnimationFrame(frame); return; }
    t = now;
    ctx.clearRect(0, 0, W, H);
    const R = 120 * dpr, R2 = R * R, mx = pointer.x * dpr, my = pointer.y * dpr;
    const bx = Math.sin(t * .0016) * .9 * dpr, by = Math.cos(t * .0013) * .9 * dpr;   // the whole logo drifts a little
    const groups = [[], []];
    for (const p of parts) {
      const hx = p.hx + bx, hy = p.hy + by;
      p.vx += (hx - p.x) * .05; p.vy += (hy - p.y) * .05;
      const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
      if (d2 < R2 && d2 > 1) { const d = Math.sqrt(d2), f = (1 - d / R) ** 2 * 11 * dpr; p.vx += dx / d * f; p.vy += dy / d * f; }
      p.vx *= .86; p.vy *= .86; p.x += p.vx; p.y += p.vy;
      groups[p.g].push(p);
    }
    groups.forEach((g, i) => { ctx.fillStyle = colors[i]; for (const p of g) ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size); });
    raf = requestAnimationFrame(frame);
  }

  const move = e => { const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; };
  const leave = () => { pointer.x = pointer.y = -9999; };
  const burst = e => {                                  // a click or tap blows the logo apart; it re-forms by itself
    move(e); const mx = pointer.x * dpr, my = pointer.y * dpr, R = 260 * dpr;
    for (const p of parts) { const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy) || 1; if (d < R) { const f = (1 - d / R) * 34 * dpr; p.vx += dx / d * f + (Math.random() - .5) * 6; p.vy += dy / d * f + (Math.random() - .5) * 6; } }
  };
  const onResize = () => { clearTimeout(onResize.t); onResize.t = setTimeout(() => { if (running) layout(); }, 150); };

  window.LessyLanding = {
    async start(el) {
      canvas = el; ctx = canvas.getContext('2d'); readColors();
      try { await document.fonts.load('800 100px "Bricolage Grotesque"'); } catch {}
      layout(); running = true; raf = requestAnimationFrame(frame);
      canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', leave); canvas.addEventListener('pointerdown', burst);
      window.addEventListener('resize', onResize);
    },
    stop() {
      running = false; cancelAnimationFrame(raf);
      if (canvas) { canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', leave); canvas.removeEventListener('pointerdown', burst); }
      window.removeEventListener('resize', onResize);
    },
  };
})();
