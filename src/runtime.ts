import {
  META_ASSET_MARKER,
  assetPathMarker,
  ensureTrailingSlash,
  detectBaseFromAssetUrl,
} from './shared.js';

/** Detected deploy base (always ends with `/`). e.g. `/`, `/demo/` */
export function getBase(): string {
  if (typeof window === 'undefined') return '/';

  if (window.__VITE_BASE__) {
    return ensureTrailingSlash(window.__VITE_BASE__);
  }

  return detectBaseFromAssets() || '/';
}

/** Full URL: origin + {@link getBase} */
export function getAbsoluteBase(): string {
  if (typeof window === 'undefined') return '';
  return window.location.origin + getBase();
}

/** Path joined to detected base (no leading slash on `path`). */
export function resolveUrl(path: string): string {
  const base = getBase();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base + cleanPath;
}

function getAssetMarker(): string {
  const meta = document.querySelector(`meta[name="${META_ASSET_MARKER}"]`);
  return meta?.getAttribute('content') || assetPathMarker();
}

function detectBaseFromAssets(): string | null {
  try {
    const marker = getAssetMarker();
    const nodes = document.querySelectorAll('script[src], link[href]');
    const origin = window.location.origin;

    for (const el of Array.from(nodes)) {
      const url =
        (el as HTMLScriptElement).src ||
        (el as HTMLLinkElement).href ||
        '';
      const detected = detectBaseFromAssetUrl(url, origin, marker);
      if (detected) return detected;
    }
  } catch {
    /* ignore */
  }
  return null;
}
