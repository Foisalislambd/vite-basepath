/**
 * vite-basepath — Runtime helpers (relative ./ build + detected deploy path).
 */

import {
  WINDOW_VAR,
  META_ASSET_MARKER,
  assetPathMarker,
  ensureTrailingSlash,
  detectBaseFromAssetUrl,
} from './shared.js';

/**
 * Detected deploy base (always ends with /). e.g. "/", "/demo/", "/app/v2/"
 * @returns {string}
 */
export function getBase() {
  if (typeof window === 'undefined') return '/';

  if (window[WINDOW_VAR]) {
    return ensureTrailingSlash(window[WINDOW_VAR]);
  }

  return detectBaseFromAssets() || '/';
}

/**
 * @returns {string}
 */
export function getAbsoluteBase() {
  if (typeof window === 'undefined') return '';
  return window.location.origin + getBase();
}

/**
 * @param {string} path
 * @returns {string}
 */
export function resolveUrl(path) {
  const base = getBase();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base + cleanPath;
}

function getAssetMarker() {
  const meta = document.querySelector(`meta[name="${META_ASSET_MARKER}"]`);
  return meta?.getAttribute('content') || assetPathMarker();
}

function detectBaseFromAssets() {
  try {
    const marker = getAssetMarker();
    const nodes = document.querySelectorAll('script[src], link[href]');
    const origin = window.location.origin;

    for (const el of nodes) {
      const url = el.src || el.href || '';
      const detected = detectBaseFromAssetUrl(url, origin, marker);
      if (detected) return detected;
    }
  } catch (_) {}
  return null;
}
