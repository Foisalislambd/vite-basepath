import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'demo',
  'dist',
);
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

assert.ok(fs.existsSync(path.join(dist, '.nojekyll')), 'GitHub Pages needs .nojekyll');
assert.ok(fs.existsSync(path.join(dist, '404.html')), 'GitHub Pages needs 404.html');
assert.match(html, /content="\.\/"/, 'vite-app-base must be ./');
assert.match(html, /(?:src|href)="\.\/assets\//, 'assets must be relative');
assert.ok(!/(?:src|href)="\/assets\//.test(html), 'no root-absolute /assets/');
assert.match(html, /__VITE_BASE__/, 'runtime bootstrap injected');

console.log('verify-demo-build: GitHub Pages artifact checks passed');
