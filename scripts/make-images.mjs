// Regenerates the social share card (og-image.jpg) and the apple-touch-icon from the site's own assets.
// Usage: npm run images
import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '..', 'dist', 'assets');
const browser = await chromium.launch();

const card = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await card.goto(pathToFileURL(path.join(HERE, 'og-template.html')).href);
await card.evaluate(() => document.fonts.ready);
await card.waitForTimeout(400);
await card.screenshot({ path: path.join(OUT, 'og-image.jpg'), type: 'jpeg', quality: 86 });
console.log('wrote og-image.jpg');

const svg = await readFile(path.join(OUT, 'favicon.svg'), 'utf8');
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.setContent(`<body style="margin:0;background:#0a0a0f"><div style="width:180px;height:180px">${svg.replace('<svg ', '<svg width="180" height="180" ')}</div></body>`);
await icon.screenshot({ path: path.join(OUT, 'apple-touch-icon.png'), type: 'png' });
console.log('wrote apple-touch-icon.png');
await browser.close();
