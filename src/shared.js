/**
 * Shared constants and pure helpers (used by plugin, runtime, and tests).
 */

export const PLUGIN_NAME = 'vite-basepath';
export const META_NAME = 'vite-app-base';
export const META_ASSET_MARKER = 'vite-app-asset-marker';
export const WINDOW_VAR = '__VITE_BASE__';
export const RELATIVE_BASE = './';
export const DEFAULT_ASSET_DIR = 'assets';

/** @param {string} assetDir */
export function assetPathMarker(assetDir = DEFAULT_ASSET_DIR) {
  const dir = assetDir.replace(/^\/+|\/+$/g, '');
  return `/${dir}/`;
}

/**
 * @param {string} path
 * @returns {string}
 */
export function ensureTrailingSlash(path) {
  if (!path) return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

/**
 * Detect app base from a resolved asset URL (script src / link href).
 *
 * @param {string} url
 * @param {string} origin
 * @param {string} marker  e.g. "/assets/"
 * @returns {string | null}
 */
export function detectBaseFromAssetUrl(url, origin, marker) {
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const raw = url.substring(0, idx + 1).replace(origin, '');
  return ensureTrailingSlash(raw) || '/';
}
