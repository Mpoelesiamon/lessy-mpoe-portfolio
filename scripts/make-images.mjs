// Regenerates the social share card (og-image.jpg) and the apple-touch-icon from the site's own assets.
// Usage: npm run images
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { writeFile, mkdir } from 'node:fs/promises';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'dist', 'assets');
const browser = await chromium.launch();

const card = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await card.goto(pathToFileURL(path.join(HERE, 'og-template.html')).href);
await card.evaluate(() => document.fonts.ready);
await card.waitForTimeout(400);
await card.screenshot({ path: path.join(OUT, 'og-image.jpg'), type: 'jpeg', quality: 86 });
console.log('wrote og-image.jpg');

// ── Identity icon: the "l" and dot from the wordmark on an orange tile ──
const TILE = (radius, scale = 1) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="#ff6a2b"/><g transform="translate(32 32) scale(${scale}) translate(-32 -32)"><rect x="17" y="9" width="12" height="46" rx="6" fill="#140803"/><circle cx="43" cy="47.5" r="7.5" fill="#fff6ee"/></g></svg>`;
const render = async (svg, size) => sharp(Buffer.from(svg.replace('<svg ', `<svg width="${size}" height="${size}" `)), { density: 384 }).resize(size, size).png().toBuffer();
await writeFile(path.join(OUT, 'favicon.svg'), TILE(16) + '\n');
await mkdir(path.join(OUT, 'icons'), { recursive: true });
await writeFile(path.join(OUT, 'apple-touch-icon.png'), await render(TILE(0, .9), 180));          // iOS rounds the corners itself
await writeFile(path.join(OUT, 'icons', 'icon-192.png'), await render(TILE(16), 192));
await writeFile(path.join(OUT, 'icons', 'icon-512.png'), await render(TILE(16), 512));
await writeFile(path.join(OUT, 'icons', 'icon-maskable-512.png'), await render(TILE(0, .66), 512)); // content inside the safe zone
// favicon.ico (16, 32, 48) with PNG payloads, served from the site root
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(n => render(TILE(n >= 32 ? 10 : 8), n)));
const header = Buffer.alloc(6 + 16 * sizes.length); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((n, i) => { const e = 6 + 16 * i; header[e] = n; header[e + 1] = n; header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6); header.writeUInt32LE(pngs[i].length, e + 8); header.writeUInt32LE(offset, e + 12); offset += pngs[i].length; });
await writeFile(path.join(OUT, '..', 'favicon.ico'), Buffer.concat([header, ...pngs]));
console.log('wrote favicon.svg, favicon.ico, apple-touch-icon.png and icons/');
await browser.close();
