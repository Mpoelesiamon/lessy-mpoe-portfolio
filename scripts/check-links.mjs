// Checks that every external link on the site still answers. Social networks block bots, so they are only reported.
// Usage: npm run links
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const load = async (f, v) => JSON.parse(JSON.stringify(vm.runInNewContext(`${await readFile(path.join(DIST, f), 'utf8')}; ${v}`)));
const projects = await load('projects.js', 'projects');
const socials = await load('socials.js', 'socials');
const html = await readFile(path.join(DIST, 'index.html'), 'utf8');

const urls = new Map();
const add = (u, from) => { if (/^https?:/.test(u)) urls.set(u, [...(urls.get(u) || []), from]); };
projects.forEach(p => p.links.forEach(([, u]) => add(u, p.name)));
socials.forEach(s => add(s.url, s.name));
for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) add(m[1], 'page');

const BOT_BLOCKERS = /(instagram|facebook|tiktok|reddit|linkedin|x)\.com|wa\.me|youtube\.com/;   // answer bots with 4xx even when fine
// Sites that are down on purpose or for reasons outside this repo. Remove an entry once the site is back.
const KNOWN_DOWN = new Set(['https://persart.nl/', 'https://brand2boost.com/', 'https://brand2boost.nl/']);
let failed = 0;
for (const [url, from] of urls) {
  try {
    const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 (compatible; portfolio-link-check)' } });
    const ok = r.status < 400 || (BOT_BLOCKERS.test(url) && [403, 429, 999].includes(r.status));
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${r.status} ${url}   (${[...new Set(from)].slice(0, 2).join(', ')})`);
  } catch (e) {
    if (KNOWN_DOWN.has(url)) { console.log(`down ---  ${url}   (known, see KNOWN_DOWN)`); continue; }
    failed++; console.log(`FAIL --- ${url}   (${e.name})`);
  }
}
console.log(failed ? `\n${failed} link(s) need attention.` : `\nAll ${urls.size} links answer.`);
process.exit(failed ? 1 : 0);
