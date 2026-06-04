import assert from 'node:assert/strict';
import {
  RELATIVE_BASE,
  ensureTrailingSlash,
  detectBaseFromAssetUrl,
  assetPathMarker,
} from '../dist/shared.js';

assert.equal(RELATIVE_BASE, './');

const origin = 'https://example.com';
assert.equal(
  detectBaseFromAssetUrl(`${origin}/demo/assets/index.js`, origin, '/assets/'),
  '/demo/',
);
assert.equal(
  detectBaseFromAssetUrl(`${origin}/assets/index.js`, origin, '/assets/'),
  '/',
);
assert.equal(
  detectBaseFromAssetUrl(`${origin}/demo/static/index.js`, origin, assetPathMarker('static')),
  '/demo/',
);

assert.equal(ensureTrailingSlash('/demo'), '/demo/');
assert.equal(ensureTrailingSlash(''), '/');

assert.equal(detectBaseFromAssetUrl('', origin, '/assets/'), null);
assert.equal(detectBaseFromAssetUrl(`${origin}/other/bundle.js`, origin, '/assets/'), null);
assert.equal(assetPathMarker('static'), '/static/');
assert.equal(assetPathMarker('/static/'), '/static/');

console.log('verify-logic: all assertions passed');
