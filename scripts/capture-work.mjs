// Builds the cover images shown for each project (dist/assets/work/<id>.webp plus a 640px thumbnail).
// Three kinds of source:
//   url    a live website, captured with a headless browser
//   dir    a local project: a static folder is served as is, a Vite or CRA app is started, captured, then stopped
//   file   an existing logo or image, placed on a flat background
// Usage: npm run capture             (everything)
//        npm run capture -- rena art (just these ids)
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import * as icons from 'simple-icons';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'dist', 'assets', 'work');
const PROJECTS = process.env.PROJECTS_DIR || '/Users/mac/Desktop/Lesiamon/Projects';
const RANDOM = '/Users/mac/Desktop/Random';

const TARGETS = [
  // live sites
  { id: 'rena', url: 'https://renafarm.co.ke/' },
  { id: 'bugatti', url: 'https://bugattiinsights.com/' },
  { id: 'prosper', url: 'https://prospergenics.com/' },
  { id: 'nashipae', url: 'https://nashipaeculturaloasis.com/' },
  { id: 'maximillar', url: 'https://maximillar.lesiamon.com/' },
  { id: 'johny', url: 'https://johnyclean.netlify.app/' },
  // built folders on this Mac, served as they are
  { id: 'sprout', static: 'Company-Projects/martiendejong/sprout2grow-agrifood-hub/dist' },
  // a word set in the site's typeface on a flat colour
  { id: 'hazina', text: 'Hazina', bg: '#000000', color: '#ffd500' },
  { id: 'jengo', text: 'Jengo', bg: '#000000', color: '#ffd500' },
  // drawn artwork: WordPress on one side, a gallery on the other, a bridge between them
  { id: 'bridge', art: 'wp-bridge' },
  // a banner strip over a softened copy of itself, with a logo below
  { id: 'grafo', banner: path.join(HERE, '..', 'assets-src', 'grafo-banner.jpg'), logo: path.join(HERE, '..', 'assets-src', 'grafo-quill.png'), logoH: 640 },
  // a chosen photograph, used as is (optionally with a logo plaque on top)
  { id: 'opus', photo: path.join(HERE, '..', 'assets-src', 'opus-hall.jpg'), logo: path.join(HERE, '..', 'assets-src', 'opus-logo.png'), logoH: 236 },
  { id: 'perridon', photo: path.join(HERE, '..', 'assets-src', 'exhibition-hall.jpg') },
  // a brand logo drawn on a flat background
  { id: 'trndy', icon: icons.siYoutube.path, color: '#ff0000', bg: '#ffffff', size: 0.46 },
  // logos on a flat background (the live site sits behind a bot check)
  { id: 'art', file: path.join(RANDOM, 'Artrevisionistlogo.png'), paper: path.join(RANDOM, 'ArtBackground.png'), fit: 0.62 },
  { id: 'vera', file: path.join(PROJECTS, 'Clients-Projects/VeraAI/frontend/src/assets/socialmediahulp.png'), bg: 'auto', fit: 0.56 },
  { id: 'brand', file: path.join(RANDOM, 'Brand2boost.jpeg'), bg: '#ffffff', fit: 0.74 },
  { id: 'persart', file: path.join(PROJECTS, 'Clients-Projects/Persch Gallery images./PERSCHARTLOGO-withoutBG.png'), bg: '#14130f', fit: 0.5 },
];

const only = process.argv.slice(2);
await mkdir(OUT, { recursive: true });
let port = 5300;

async function save(id, buffer) {
  const full = sharp(buffer).resize(1280, 800, { fit: 'cover', position: 'top' }).webp({ quality: 80 });
  await full.toFile(path.join(OUT, `${id}.webp`));
  await sharp(buffer).resize(640, 400, { fit: 'cover', position: 'top' }).webp({ quality: 76 }).toFile(path.join(OUT, `${id}-640.webp`));
  const kb = (await stat(path.join(OUT, `${id}.webp`))).size / 1024;
  console.log(`  saved ${id}.webp (${kb.toFixed(0)} KB)`);
}

async function waitFor(url, ms = 90000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { const r = await fetch(url); if (r.status < 500) return true; } catch {}
    await new Promise(r => setTimeout(r, 800));
  }
  return false;
}

function serveStatic(dir) {
  const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
  const server = http.createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname); if (p.endsWith('/')) p += 'index.html';
      const f = path.join(dir, p); if (!f.startsWith(dir)) throw 0;
      const body = await readFile(f);
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' }).end(body);
    } catch { res.writeHead(404).end('nf'); }
  });
  return new Promise(r => server.listen(++port, '127.0.0.1', () => r({ url: `http://127.0.0.1:${port}/`, stop: () => server.close() })));
}

async function startDev(dir, cra) {
  const p = ++port;
  const bin = path.join(dir, 'node_modules', '.bin', cra ? 'react-scripts' : 'vite');
  if (!existsSync(bin)) throw new Error(`no ${cra ? 'react-scripts' : 'vite'} in ${dir} (run npm install there first)`);
  const args = cra ? ['start'] : ['--host', '127.0.0.1', '--port', String(p), '--strictPort'];
  const child = spawn(bin, args, { cwd: dir, env: { ...process.env, PORT: String(p), BROWSER: 'none', CI: 'true' }, stdio: 'ignore', detached: true });
  const url = `http://127.0.0.1:${p}/`;
  if (!(await waitFor(url))) { try { process.kill(-child.pid); } catch {} throw new Error('dev server did not start'); }
  return { url, stop: () => { try { process.kill(-child.pid); } catch {} } };
}

const browser = await chromium.launch();
for (const t of TARGETS) {
  if (only.length && !only.includes(t.id)) continue;
  console.log(`# ${t.id}`);
  let server;
  try {
    if (t.icon) {
      const scale = (800 * t.size) / 24;                       // the glyph is drawn on a 24-unit grid
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800"><rect width="1280" height="800" fill="${t.bg}"/><g transform="translate(${(1280 - 24 * scale) / 2} ${(800 - 24 * scale) / 2}) scale(${scale})"><path fill="${t.color}" d="${t.icon}"/></g></svg>`;
      await save(t.id, await sharp(Buffer.from(svg)).png().toBuffer()); continue;
    }
    if (t.art === 'wp-bridge') {
      const INK = '#15110e', ORANGE = '#ff6a2b', WP = '#21759b';
      const cableY = (x0, y0, cx, cy, x1, y1, t) => (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1;
      // main cable: tower top (520,330) to tower top (760,330), sagging to the middle; hangers drop to the deck at y=490
      const hangers = [];
      for (let i = 1; i < 8; i++) { const tt = i / 8, x = 520 + 240 * tt, y = cableY(520, 330, 640, 520, 760, 330, tt); hangers.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="490" stroke="${INK}" stroke-width="6"/>`); }
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
        <rect width="1280" height="800" fill="#f6f2ea"/>
        <g transform="translate(112 256) scale(12)"><path fill="${WP}" d="${icons.siWordpress.path}"/></g>
        <g>
          <rect x="884" y="262" width="276" height="276" rx="14" fill="#fffdf8" stroke="${ORANGE}" stroke-width="16"/>
          <circle cx="1070" cy="342" r="24" fill="${ORANGE}"/>
          <path d="M904 520 L984 400 L1042 468 L1098 380 L1140 520 Z" fill="${INK}"/>
        </g>
        <path d="M420 490 L880 490" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
        <path d="M424 486 L520 334 Q640 520 760 334 L876 486" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="508" y="324" width="24" height="176" rx="6" fill="${INK}"/><rect x="748" y="324" width="24" height="176" rx="6" fill="${INK}"/>
        ${hangers.join('')}
        <circle cx="420" cy="490" r="16" fill="${WP}"/><circle cx="880" cy="490" r="16" fill="${ORANGE}"/>
      </svg>`;
      await save(t.id, await sharp(Buffer.from(svg)).png().toBuffer()); continue;
    }
    if (t.text) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      await page.goto(`${pathToFileURL(path.join(HERE, 'text-cover.html')).href}?${new URLSearchParams({ text: t.text, bg: t.bg, color: t.color, suffix: t.suffix || '', suffixColor: t.suffixColor || '' })}`);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      await save(t.id, await page.screenshot({ type: 'png' }));
      await page.close(); continue;
    }
    if (t.banner) {                                         // scene: gradient, the banner through the middle, the logo over its empty centre
      const gradient = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4cfc6"/><stop offset="1" stop-color="#f7e9e4"/></linearGradient></defs><rect width="1280" height="800" fill="url(#g)"/></svg>`);
      const raw = await sharp(t.banner).resize({ width: 1280 }).toBuffer();
      const { height: sh } = await sharp(raw).metadata();
      const fade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${sh}"><defs><linearGradient id="m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff"/><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="1280" height="${sh}" fill="url(#m)"/></svg>`);
      const strip = await sharp(raw).ensureAlpha().composite([{ input: fade, blend: 'dest-in' }]).png().toBuffer();   // feathered top and bottom
      const logo = await sharp(t.logo).resize({ height: t.logoH }).toBuffer();
      const { width: lw, height: lh } = await sharp(logo).metadata();
      await save(t.id, await sharp(gradient).composite([{ input: strip, left: 0, top: Math.round((800 - sh) / 2) }, { input: logo, left: Math.round((1280 - lw) / 2), top: Math.round((800 - lh) / 2) }]).png().toBuffer());
      continue;
    }
    if (t.photo) {
      let img = await sharp(t.photo).resize(1280, 800, { fit: 'cover' }).toBuffer();
      if (t.logo) {                                          // a plaque near the bottom centre
        const plaque = await sharp(t.logo).resize({ height: t.logoH }).toBuffer();
        const { width: pw, height: ph } = await sharp(plaque).metadata();
        const left = Math.round((1280 - pw) / 2), top = 800 - ph - 40;
        img = await sharp(img).composite([{ input: plaque, left, top }]).png().toBuffer();
      }
      await save(t.id, img); continue;
    }
    if (t.file) {
      const logo = await sharp(t.file).resize({ height: Math.round(800 * (t.fit || .6)), fit: 'inside' }).toBuffer();
      if (t.bg === 'auto') {                                  // use the logo's own background colour so no box shows
        const px = await sharp(t.file).extract({ left: 2, top: 2, width: 1, height: 1 }).removeAlpha().raw().toBuffer();
        t.bg = `rgb(${px[0]},${px[1]},${px[2]})`;
      }
      const base = t.paper ? sharp(t.paper).resize(1280, 800, { fit: 'cover' }) : sharp({ create: { width: 1280, height: 800, channels: 3, background: t.bg } });
      // On textured paper, multiply drops the logo's white box so only the mark remains.
      const buf = await base.composite([{ input: logo, gravity: 'center', blend: t.paper ? 'multiply' : 'over' }]).png().toBuffer();
      await save(t.id, buf); continue;
    }
    let url = t.url;
    if (t.static) server = await serveStatic(path.join(PROJECTS, t.static)), url = server.url;
    if (t.dev) server = await startDev(path.join(PROJECTS, t.dev), t.cra), url = server.url;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(t.wait || 3500);
    await save(t.id, await page.screenshot({ type: 'png' }));
    await page.close();
  } catch (e) {
    console.error(`  FAILED ${t.id}: ${String(e.message).split('\n')[0]}`);
  } finally { server && server.stop(); }
}
await browser.close();
