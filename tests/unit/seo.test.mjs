// Guards everything search engines read: titles, descriptions, canonicals, structured data, the sitemap and internal links.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const SITE = 'https://lesiamon.com';

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets') out.push(...await walk(f)); } else if (f.endsWith('.html')) out.push(f);
  }
  return out;
}
const files = (await walk(DIST)).filter(f => !f.endsWith('404.html'));
const rel = f => path.relative(DIST, f).replace(/\\/g, '/');
const urlOf = f => { const r = rel(f).replace(/\.html$/, ''); return r === 'index' ? '/' : `/${r}`; };
const pages = await Promise.all(files.map(async f => ({ f, url: urlOf(f), html: await readFile(f, 'utf8') })));
const projects = JSON.parse(JSON.stringify(vm.runInNewContext(`${await readFile(path.join(DIST, 'projects.js'), 'utf8')}; projects`)));
const work = projects.filter(p => p.category !== 'Learning');
const meta = (html, re) => (re.exec(html) || [])[1];
const ldOf = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

test('there is a page for every promise: home, about, services, faq, contact, privacy, projects and one per project', () => {
  const urls = new Set(pages.map(p => p.url));
  for (const u of ['/', '/about', '/services', '/faq', '/contact', '/privacy', '/projects']) assert.ok(urls.has(u), `missing page ${u}`);
  for (const p of work) assert.ok(urls.has(`/projects/${p.id}`), `missing project page for ${p.id} (run npm run pages)`);
});

test('every page has a unique, sensible title and description', () => {
  const titles = new Set();
  for (const { url, html } of pages) {
    const title = decode(meta(html, /<title>([^<]*)<\/title>/) || '');
    const desc = decode(meta(html, /<meta name="description" content="([^"]*)"/) || '');
    assert.ok(title.length >= 15 && title.length <= 75, `${url}: title length ${title.length}: ${title}`);
    assert.ok(desc.length >= 60 && desc.length <= 200, `${url}: description length ${desc.length}`);
    assert.ok(!titles.has(title), `${url}: duplicate title`); titles.add(title);
  }
});

test('every page has one H1, a canonical on lesiamon.com, and social tags', () => {
  for (const { url, html } of pages) {
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${url}: needs exactly one h1`);
    assert.equal(meta(html, /<link rel="canonical" href="([^"]*)"/), `${SITE}${url === '/' ? '/' : url}`, `${url}: canonical`);
    for (const p of ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name']) assert.ok(html.includes(`property="${p}"`), `${url}: missing ${p}`);
    assert.ok(html.includes('name="twitter:card"'), `${url}: missing twitter:card`);
    assert.ok(html.includes('<html lang="en"'), `${url}: html lang`);
    assert.ok(!/noindex/.test(html), `${url}: public pages must be indexable`);
  }
});

test('the home page names Lessy and Prospergenics where search engines look', () => {
  const home = pages.find(p => p.url === '/').html;
  const title = decode(meta(home, /<title>([^<]*)<\/title>/)), desc = decode(meta(home, /<meta name="description" content="([^"]*)"/));
  for (const text of [title, desc]) { assert.match(text, /Lessy/); assert.match(text, /Prospergenics/); }
  assert.match(title, /Finehas Mpoe/);
  assert.match(home, /Known as Lessy/);
});

test('structured data is valid JSON and describes Lessy, Prospergenics and the site', () => {
  for (const { url, html } of pages) assert.ok(ldOf(html).length >= 1, `${url}: no JSON-LD`);
  const home = ldOf(pages.find(p => p.url === '/').html)[0]['@graph'];
  const person = home.find(n => n['@type'] === 'Person');
  assert.match(person.name, /Lessy/);
  for (const n of ['Lessy', 'Finehas Mpoe', 'Finehas Lesiamon Mpoe']) assert.ok(person.alternateName.includes(n), `alternateName missing ${n}`);
  assert.ok(person.sameAs.length >= 7 && person.sameAs.every(u => u.startsWith('https://')));
  assert.equal(person.worksFor['@id'], 'https://prospergenics.com/#organization');
  assert.ok(home.some(n => n['@type'] === 'Organization' && n.name === 'Prospergenics'));
  assert.ok(home.some(n => n['@type'] === 'WebSite' && n.name === 'Lessy'));
  assert.ok(home.some(n => n['@type'] === 'ProfilePage'));
});

test('breadcrumbs and project pages carry matching structured data', () => {
  for (const p of work) {
    const page = pages.find(x => x.url === `/projects/${p.id}`).html;
    const graph = ldOf(page)[0]['@graph'];
    assert.ok(graph.some(n => n['@type'] === 'CreativeWork' && n.name === p.name), `${p.id}: CreativeWork`);
    const crumbs = graph.find(n => n['@type'] === 'BreadcrumbList');
    assert.equal(crumbs.itemListElement.length, 3);
    assert.equal(crumbs.itemListElement[2].item, `${SITE}/projects/${p.id}`);
  }
});

test('the FAQ markup matches the visible questions exactly', () => {
  const html = pages.find(p => p.url === '/faq').html;
  const faq = ldOf(html)[0]['@graph'].find(n => n['@type'] === 'FAQPage');
  const visible = [...html.matchAll(/<summary>([^<]*)<\/summary>/g)].map(m => decode(m[1]));
  assert.ok(faq.mainEntity.length >= 8);
  assert.deepEqual(faq.mainEntity.map(q => q.name), visible);
  for (const q of faq.mainEntity) assert.ok(q.acceptedAnswer.text.length > 20);
});

test('sitemap lists every page once, with absolute lesiamon.com addresses', async () => {
  const xml = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.equal(new Set(locs).size, locs.length, 'duplicate sitemap entries');
  for (const { url } of pages) assert.ok(locs.includes(`${SITE}${url}`), `sitemap is missing ${url}`);
  assert.equal(locs.length, pages.length, 'sitemap lists pages that do not exist');
  assert.ok([...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].every(m => /^\d{4}-\d{2}-\d{2}$/.test(m[1])));
});

test('robots.txt allows crawling and points at the sitemap; llms.txt and IndexNow key exist', async () => {
  const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8');
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/lesiamon\.com\/sitemap\.xml/);
  const llms = await readFile(path.join(DIST, 'llms.txt'), 'utf8');
  assert.match(llms, /Lessy/); assert.match(llms, /Prospergenics/);
  const script = await readFile(path.join(DIST, '..', 'scripts', 'indexnow.mjs'), 'utf8');
  const key = /const KEY = '([0-9a-f]{32})'/.exec(script)[1];
  assert.equal((await readFile(path.join(DIST, `${key}.txt`), 'utf8')).trim(), key);
});

test('every internal link on every page points at a page or file that exists', async () => {
  const exists = async p => {
    const clean = decodeURIComponent(p.split('#')[0].split('?')[0]);
    if (!clean || clean === '/') return true;
    for (const c of [clean, `${clean}.html`, `${clean}/index.html`]) { try { await access(path.join(DIST, c)); return true; } catch {} }
    return false;
  };
  const redirects = JSON.parse(await readFile(path.join(DIST, '..', 'vercel.json'), 'utf8')).redirects.map(r => r.source);
  for (const { url, html } of pages) {
    for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      const target = m[1];
      if (target.startsWith('//')) continue;
      assert.ok(await exists(target) || redirects.includes(target.split('#')[0]), `${url} links to a missing address: ${target}`);
    }
  }
});

test('the home page has crawlable links to every project page, without needing JavaScript', () => {
  const home = pages.find(p => p.url === '/').html;
  for (const p of work) assert.ok(home.includes(`href="/projects/${p.id}"`), `home is missing a link to ${p.id}`);
  for (const u of ['/about', '/services', '/faq', '/contact', '/privacy', '/projects']) assert.ok(home.includes(`href="${u}"`), `home is missing a link to ${u}`);
});

test('www redirects to the main address permanently', async () => {
  const cfg = JSON.parse(await readFile(path.join(DIST, '..', 'vercel.json'), 'utf8'));
  const r = cfg.redirects.find(x => x.has && x.has[0].value === 'www.lesiamon.com');
  assert.ok(r && r.permanent && r.destination.startsWith('https://lesiamon.com/'));
});

test('the privacy policy states what the site really does', () => {
  const html = pages.find(p => p.url === '/privacy').html;
  for (const phrase of ['no cookies', 'lessy-theme', 'lessy-booted', 'Vercel', 'Cloudflare', 'GDPR', 'Data Protection Act']) assert.ok(html.includes(phrase), `privacy policy should mention: ${phrase}`);
});
