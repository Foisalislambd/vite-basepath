/**
 * vite-basepath — Runtime Helpers
 *
 * Import this in your app to get the correct base path at runtime.
 * Use with React Router, Vue Router, or any router that needs a basename.
 *
 * @example React Router v6
 * import { getBase } from 'vite-basepath/runtime';
 *
 * function App() {
 *   return (
 *     <BrowserRouter basename={getBase()}>
 *       <Routes>...</Routes>
 *     </BrowserRouter>
 *   );
 * }
 *
 * @example Vue Router
 * import { getBase } from 'vite-basepath/runtime';
 *
 * const router = createRouter({
 *   history: createWebHistory(getBase()),
 *   routes: [...]
 * });
 *
 * @example Manual usage
 * import { getBase, getAbsoluteBase } from 'vite-basepath/runtime';
 *
 * console.log(getBase());          // e.g. "/demo/template/"
 * console.log(getAbsoluteBase());  // e.g. "https://website.com/demo/template/"
 */

const WINDOW_VAR = '__VITE_BASE__';
const META_NAME  = 'vite-app-base';

/**
 * Returns the base path of the current deployment.
 * Always ends with '/'. Falls back to '/' if detection fails.
 *
 * @returns {string}  e.g. "/", "/demo/", "/my-app/v2/"
 */
export function getBase() {
  if (typeof window === 'undefined') return '/';

  // 1. Use the value injected by the plugin's runtime script (most reliable)
  if (window[WINDOW_VAR]) {
    return ensureTrailingSlash(window[WINDOW_VAR]);
  }

  // 2. Read from injected <meta> tag
  const meta = document.querySelector(`meta[name="${META_NAME}"]`);
  if (meta) {
    const content = meta.getAttribute('content') || './';

    // Relative mode → detect actual path from script sources
    if (content === './' || content === '.') {
      return detectBaseFromAssets() || '/';
    }

    return ensureTrailingSlash(content);
  }

  // 3. Last resort: detect from loaded assets
  return detectBaseFromAssets() || '/';
}

/**
 * Returns the full absolute base URL including origin.
 *
 * @returns {string}  e.g. "https://website.com/demo/template/"
 */
export function getAbsoluteBase() {
  if (typeof window === 'undefined') return '';
  return window.location.origin + getBase();
}

/**
 * Returns a URL relative to the app's base.
 * Useful for constructing API URLs or asset links.
 *
 * @param {string} path  - Path relative to base (e.g. "api/users")
 * @returns {string}
 *
 * @example
 * resolveUrl('api/data')  // "/demo/template/api/data"
 */
export function resolveUrl(path) {
  const base = getBase();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return base + cleanPath;
}

// ─── Internal helpers ────────────────────────────────────────────────────────

function detectBaseFromAssets() {
  try {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const links   = Array.from(document.querySelectorAll('link[href]'));
    const all     = [...scripts, ...links];
    const origin  = window.location.origin;

    for (const el of all) {
      const url = el.src || el.href || '';
      const idx = url.indexOf('/assets/');
      if (idx !== -1) {
        const raw = url.substring(0, idx + 1).replace(origin, '');
        return ensureTrailingSlash(raw) || '/';
      }
    }
  } catch (_) {}
  return null;
}

function ensureTrailingSlash(path) {
  if (!path) return '/';
  return path.endsWith('/') ? path : path + '/';
}
