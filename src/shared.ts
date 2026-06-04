export const PLUGIN_NAME = 'vite-basepath';
export const META_NAME = 'vite-app-base';
export const META_ASSET_MARKER = 'vite-app-asset-marker';
export const WINDOW_VAR = '__VITE_BASE__';
export const RELATIVE_BASE = './';
export const DEFAULT_ASSET_DIR = 'assets';

export function assetPathMarker(assetDir: string = DEFAULT_ASSET_DIR): string {
  const dir = assetDir.replace(/^\/+|\/+$/g, '');
  return `/${dir}/`;
}

export function ensureTrailingSlash(path: string): string {
  if (!path) return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function detectBaseFromAssetUrl(
  url: string,
  origin: string,
  marker: string,
): string | null {
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const raw = url.substring(0, idx + 1).replace(origin, '');
  return ensureTrailingSlash(raw) || '/';
}
