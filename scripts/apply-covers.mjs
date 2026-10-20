// Writes a "cover" path into dist/projects.js for every project that has an image in dist/assets/work/.
// Run after `npm run capture`:   npm run covers
import { readFile, writeFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const file = path.join(DIST, 'projects.js');
const projects = vm.runInNewContext(`${await readFile(file, 'utf8')}; projects`);
const have = new Set((await readdir(path.join(DIST, 'assets', 'work'))).filter(f => /^[\w-]+\.webp$/.test(f) && !f.endsWith('-640.webp')).map(f => f.replace('.webp', '')));
let n = 0;
for (const p of projects) {
  if (have.has(p.id)) { p.cover = `assets/work/${p.id}.webp`; n++; } else delete p.cover;
}
await writeFile(file, `const projects = ${JSON.stringify(projects, null, 2)};\n`);
console.log(`covers set for ${n} of ${projects.filter(p => p.category !== 'Learning').length} projects`);
