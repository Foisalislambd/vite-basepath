import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = path.join(__dirname, 'fixtures', 'minimal');
const dist = path.join(fixture, 'dist');

fs.rmSync(dist, { recursive: true, force: true });

execSync('npx vite build', { cwd: fixture, stdio: 'inherit', shell: true });

const htmlPath = path.join(dist, 'index.html');
assert.ok(fs.existsSync(htmlPath), 'dist/index.html must exist');

const html = fs.readFileSync(htmlPath, 'utf8');
assert.match(html, /name="vite-app-base"/, 'meta tag must be injected');
assert.match(html, /data-vite-basepath/, 'runtime script must be injected');
assert.match(html, /__VITE_BASE__/, 'window global must be referenced');
assert.match(html, /\/assets\//, 'built assets must use /assets/ path segment');

// Relative base: script/link hrefs should not be root-absolute-only (no bare "/assets/..." at domain root)
const rootAbsoluteAsset = /(?:src|href)="\/assets\//;
assert.ok(!rootAbsoluteAsset.test(html), 'must not use root-absolute /assets/ paths with base ./');

console.log('verify-build: Vite production build checks passed');
