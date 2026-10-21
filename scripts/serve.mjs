// Tiny static server for local development and tests. No dependencies.
// Usage: npm run dev   (PORT=4173 by default)
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 4173);
// Apply the same response headers as production (vercel.json), so the CSP is tested locally too.
const RULES = JSON.parse(readFileSync(path.join(ROOT, '..', 'vercel.json'), 'utf8')).headers.map(r => ({ re: new RegExp(`^${r.source}$`), headers: Object.fromEntries(r.headers.map(h => [h.key, h.value])) }));
const REDIRECTS = JSON.parse(readFileSync(path.join(ROOT, '..', 'vercel.json'), 'utf8')).redirects.filter(r => !r.has).map(r => ({ re: new RegExp(`^${r.source.replace(/:([a-z]+)/g, '(?<$1>[^/]+)')}$`), to: r.destination, code: r.permanent ? 308 : 307 }));
const redirectFor = p => { for (const r of REDIRECTS) { const m = r.re.exec(p); if (m) return { code: r.code, to: r.to.replace(/:([a-z]+)/g, (_, k) => m.groups[k]) }; } };
const prodHeaders = p => Object.assign({}, ...RULES.filter(r => r.re.test(p)).map(r => r.headers));
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon',
};

http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const redirect = redirectFor(p);
    if (redirect) { res.writeHead(redirect.code, { Location: redirect.to }).end(); return; }
    if (p.endsWith('/')) p += 'index.html';
    else if (!path.extname(p)) p += '.html';              // cleanUrls: /about serves about.html
    const file = path.normalize(path.join(ROOT, p));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }
    if (!(await stat(file)).isFile()) throw new Error('not a file');
    res.writeHead(200, { ...prodHeaders(p), 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch {
    // Like production: unknown addresses get the friendly 404 page with a real 404 status.
    try { res.writeHead(404, { ...prodHeaders('/404.html'), 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-store' }).end(await readFile(path.join(ROOT, '404.html'))); }
    catch { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found'); }
  }
}).listen(PORT, '127.0.0.1', () => console.log(`Serving dist/ at http://127.0.0.1:${PORT}`));
