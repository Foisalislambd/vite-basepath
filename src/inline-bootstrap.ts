import { WINDOW_VAR } from './shared.js';

/**
 * Minified IIFE injected into built HTML. Must stay aligned with {@link detectBaseFromAssetUrl}.
 */
export function buildRuntimeInlineScript(assetMarker: string): string {
  return `(function () {
  var marker = ${JSON.stringify(assetMarker)};
  var winKey = ${JSON.stringify(WINDOW_VAR)};
  function trail(p) {
    if (!p) return '/';
    return p.charAt(p.length - 1) === '/' ? p : p + '/';
  }
  function detect() {
    var nodes = document.querySelectorAll('script[src], link[href]');
    var origin = window.location.origin;
    for (var i = 0; i < nodes.length; i++) {
      var url = nodes[i].src || nodes[i].href || '';
      var idx = url.indexOf(marker);
      if (idx !== -1) {
        return trail(url.substring(0, idx + 1).replace(origin, '') || '/');
      }
    }
    return null;
  }
  function apply() {
    var detected = detect();
    if (detected) window[winKey] = detected;
  }
  apply();
  if (!window[winKey]) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', apply, { once: true });
    } else {
      apply();
    }
  }
})();`;
}
