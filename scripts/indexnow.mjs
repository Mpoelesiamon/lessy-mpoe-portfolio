// Tells Bing, Yandex and other IndexNow search engines which pages exist or changed.
// Run it after a deploy:  npm run indexnow
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = 'fc25f944bfc3ce11ecffc014ad1668f2';
const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const sitemap = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'lesiamon.com', key: KEY, keyLocation: `https://lesiamon.com/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, answer ${res.status} ${res.statusText}`);
process.exit(res.status < 300 ? 0 : 1);
