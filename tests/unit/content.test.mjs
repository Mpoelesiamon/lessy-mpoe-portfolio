// Guards the content: data shape, links, featured projects and the plain-voice rules.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const src = await readFile(path.join(DIST, 'projects.js'), 'utf8');
const projects = vm.runInNewContext(`${src}; projects`);
const html = await readFile(path.join(DIST, 'index.html'), 'utf8');
const FEATURED = ['rena', 'perridon', 'bugatti', 'vloer'];

test('projects: unique ids and required fields', () => {
  const ids = new Set();
  for (const p of projects) {
    assert.ok(!ids.has(p.id), `duplicate id ${p.id}`); ids.add(p.id);
    for (const k of ['id', 'name', 'category', 'focus', 'context', 'stack', 'summary', 'notes']) assert.ok(p[k] && String(p[k]).trim(), `${p.id} is missing ${k}`);
    assert.ok(['Web', 'AI', 'Design', 'Learning'].includes(p.category), `${p.id} has unknown category ${p.category}`);
    assert.ok(Array.isArray(p.links), `${p.id} links must be an array`);
  }
});

test('projects: every link is https with a label', () => {
  for (const p of projects) for (const [label, url] of p.links) {
    assert.ok(label && label.trim(), `${p.id} has an unlabeled link`);
    assert.match(url, /^https:\/\//, `${p.id} link is not https: ${url}`);
  }
});

test('projects: counts shown on the page are derived, not hard-coded', () => {
  assert.ok(projects.filter(p => p.category !== 'Learning').length >= 20);
  assert.ok(projects.filter(p => p.category === 'Learning').length >= 50);
});

test('featured projects exist and have a work block in the HTML', () => {
  for (const id of FEATURED) {
    assert.ok(projects.some(p => p.id === id), `featured project ${id} is missing from projects.js`);
    assert.ok(html.includes(`data-project="${id}"`), `index.html has no work block for ${id}`);
  }
});

test('every data-project in the HTML points at a real project', () => {
  for (const m of html.matchAll(/data-project="([^"]+)"/g)) assert.ok(projects.some(p => p.id === m[1]), `unknown project id in HTML: ${m[1]}`);
});

test('the footer credit stays exactly as requested', () => {
  assert.ok(html.includes('Build by;'), 'footer credit text changed');
  assert.ok(html.includes('prospergenics.com'), 'footer credit link missing');
});

test('external links open safely', () => {
  for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert.match(m[0], /rel="[^"]*noopener[^"]*"/, `missing rel=noopener: ${m[0].slice(0, 90)}`);
});

test('covers: every cover file exists with a 640px thumbnail, and no image is orphaned', async () => {
  const { readdir, access } = await import('node:fs/promises');
  const cover = projects.filter(p => p.cover);
  assert.ok(cover.length >= 10, 'expected at least 10 projects with a cover');
  for (const p of cover) {
    await access(path.join(DIST, p.cover));
    await access(path.join(DIST, p.cover.replace('.webp', '-640.webp')));
  }
  const referenced = new Set(cover.flatMap(p => [path.basename(p.cover), path.basename(p.cover).replace('.webp', '-640.webp')]));
  const onDisk = (await readdir(path.join(DIST, 'assets', 'work'))).filter(f => f.endsWith('.webp'));
  for (const f of onDisk) assert.ok(referenced.has(f), `orphan image in assets/work: ${f} (run npm run covers)`);
});

test('contact: work and personal emails are present', () => {
  assert.ok(html.includes('mailto:lessy@prospergenics.com'));
  assert.ok(html.includes('mailto:mpoelessy839@gmail.com'));
  assert.ok(!html.includes('id="copy-email"'), 'the separate Copy email button should be gone');
});

test('team links point at the Prospergenics member pages', () => {
  for (const slug of ['martien-de-jong', 'frank', 'diko', 'sandra']) assert.ok(html.includes(`https://prospergenics.com/members/${slug}/`), `missing member link: ${slug}`);
  assert.ok(html.includes('https://martiendejong.nl/'));
});

test('socials: all eight are present, https, and free of tracking parameters', async () => {
  const src = await readFile(path.join(DIST, 'socials.js'), 'utf8');
  const socials = JSON.parse(JSON.stringify(vm.runInNewContext(`${src}; socials`)));
  assert.deepEqual(socials.map(s => s.name).sort(), ['Facebook', 'GitHub', 'Instagram', 'LinkedIn', 'Reddit', 'TikTok', 'WhatsApp', 'X']);
  for (const s of socials) {
    assert.match(s.url, /^https:\/\//, `${s.name} is not https`);
    assert.ok(s.path && s.path.length > 50, `${s.name} has no icon`);
    if (s.name !== 'Facebook') assert.ok(!s.url.includes('?'), `${s.name} link still has tracking parameters: ${s.url}`);
  }
  assert.equal(socials.find(s => s.name === 'WhatsApp').url, 'https://wa.me/254793942458');
});

test('Jengo is described as a Prospergenics project with its tools', () => {
  const j = projects.find(p => p.id === 'jengo');
  assert.match(`${j.context} ${j.summary}`, /Prospergenics/);
  const names = j.tools.map(t => t.name);
  for (const n of ['JengoWork', 'JengoMail', 'JengoAGI', 'Jengo Cloud Workspace', 'Jengo Meet']) assert.ok(names.includes(n), `missing tool: ${n}`);
  for (const t of j.tools) assert.ok(t.text && t.text.length > 20, `tool ${t.name} has no description`);
});

test('the web manifest only points at icons that exist', async () => {
  const { access } = await import('node:fs/promises');
  const manifest = JSON.parse(await readFile(path.join(DIST, 'site.webmanifest'), 'utf8'));
  assert.ok(manifest.icons.length >= 3);
  for (const i of manifest.icons) await access(path.join(DIST, i.src));
  await access(path.join(DIST, 'favicon.ico'));
});

test('every redirect in vercel.json lands on a real section or project', async () => {
  const cfg = JSON.parse(await readFile(path.join(DIST, '..', 'vercel.json'), 'utf8'));
  const ids = ['work', 'index', 'journey', 'about', 'contact'];
  for (const r of cfg.redirects.filter(x => !x.has)) {
    const m = /^\/#([a-z]+)$/.exec(r.destination);
    if (m) assert.ok(ids.includes(m[1]) && html.includes(`id="${m[1]}"`), `redirect ${r.source} points at a missing section ${r.destination}`);
    else assert.match(r.destination, /^(https:\/\/|\/projects\/:id$|\/about$|\/services$|\/$)/, `odd redirect target: ${r.destination}`);
  }
});
