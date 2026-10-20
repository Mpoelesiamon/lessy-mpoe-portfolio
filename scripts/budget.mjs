// Fails the build if a referenced file is missing or the site gets heavier than agreed.
// Usage: npm run budget
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const KB = 1024;
const LIMITS = { 'index.html': 26 * KB, 'styles.css': 40 * KB, 'app.js': 36 * KB, 'hero.js': 16 * KB, 'projects.js': 70 * KB, 'socials.js': 8 * KB };
const IMAGE_LIMIT = 450 * KB;     // any single image
const TOTAL_LIMIT = 2.6 * 1024 * KB;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full)); else out.push(full);
  }
  return out;
}

const problems = [];
const files = await walk(DIST);
let total = 0;
for (const f of files) {
  const size = (await stat(f)).size; total += size;
  const rel = path.relative(DIST, f);
  if (LIMITS[rel] && size > LIMITS[rel]) problems.push(`${rel} is ${(size / KB).toFixed(1)} KB, limit ${(LIMITS[rel] / KB)} KB`);
  if (/\.(png|jpe?g|webp)$/i.test(rel) && size > IMAGE_LIMIT) problems.push(`${rel} is ${(size / KB).toFixed(0)} KB, image limit ${IMAGE_LIMIT / KB} KB`);
}
if (total > TOTAL_LIMIT) problems.push(`dist is ${(total / KB / 1024).toFixed(2)} MB, limit ${(TOTAL_LIMIT / KB / 1024).toFixed(1)} MB`);

// Every local file referenced from HTML or CSS must exist.
const refs = new Set();
const html = await readFile(path.join(DIST, 'index.html'), 'utf8');
const css = await readFile(path.join(DIST, 'styles.css'), 'utf8');
for (const m of html.matchAll(/(?:src|href)="([^"#?]+)"/g)) refs.add(m[1]);
for (const m of html.matchAll(/srcset="([^"]+)"/g)) m[1].split(',').forEach(s => refs.add(s.trim().split(/\s+/)[0]));
for (const m of css.matchAll(/url\(([^)]+)\)/g)) refs.add(m[1].replace(/["']/g, ''));
for (const ref of refs) {
  if (/^(https?:|mailto:|data:|tel:)/.test(ref) || ref.startsWith('/')) continue;
  if (!files.includes(path.join(DIST, ref))) problems.push(`missing file referenced in HTML/CSS: ${ref}`);
}
// Referenced from JS data: work screenshots.
const app = await readFile(path.join(DIST, 'app.js'), 'utf8');
for (const m of app.matchAll(/'(assets\/[^']+)'/g)) if (!files.includes(path.join(DIST, m[1]))) problems.push(`missing file referenced in app.js: ${m[1]}`);

// Nothing in dist/assets may sit there unused (keeps the deploy lean).
const corpus = (await Promise.all(['index.html', '404.html', 'styles.css', 'app.js', 'hero.js', 'projects.js', 'socials.js', 'theme-init.js'].map(f => readFile(path.join(DIST, f), 'utf8')))).join('\n');
for (const f of files) {
  const rel = path.relative(DIST, f);
  if (!rel.startsWith('assets/') || /^assets\/(og-image\.jpg|apple-touch-icon\.png)$/.test(rel)) continue;
  const base = rel.replace('-640.webp', '.webp');           // thumbnails are derived from the cover path at runtime
  if (!corpus.includes(rel) && !corpus.includes(base)) problems.push(`unused asset (delete it or reference it): ${rel}`);
}

if (problems.length) { console.error('Budget check failed:\n - ' + problems.join('\n - ')); process.exit(1); }
console.log(`Budget OK: ${files.length} files, ${(total / KB / 1024).toFixed(2)} MB total.`);
