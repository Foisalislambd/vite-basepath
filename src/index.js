/**
 * vite-basepath
 *
 * Sets Vite base to ./ so builds work in any subdirectory.
 * Runtime detection finds the real path (e.g. /demo/) for routers.
 *
 * @example
 * import dynamicBase from 'vite-basepath';
 * export default defineConfig({ plugins: [dynamicBase()] });
 */

import {
  PLUGIN_NAME,
  META_NAME,
  META_ASSET_MARKER,
  WINDOW_VAR,
  RELATIVE_BASE,
  assetPathMarker,
} from './shared.js';

/**
 * @param {string} assetMarker  e.g. "/assets/"
 */
function buildRuntimeInlineScript(assetMarker) {
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

/**
 * @typedef {Object} DynamicBaseOptions
 * @property {boolean} [injectRuntime]  Inject runtime base detection (default: true)
 * @property {boolean} [verbose]        Print info during build (default: true)
 */

/**
 * @param {DynamicBaseOptions} options
 * @returns {import('vite').Plugin}
 */
export default function dynamicBase(options = {}) {
  const { injectRuntime = true, verbose = true } = options;

  let assetMarker = assetPathMarker();

  return {
    name: PLUGIN_NAME,
    apply: 'build',
    enforce: 'pre',

    config(_userConfig, { command }) {
      if (command !== 'build') return;

      if (verbose) {
        console.log(`\n  ╔═══════════════════════════════════════╗`);
        console.log(`  ║     vite-basepath          ║`);
        console.log(`  ╠═══════════════════════════════════════╣`);
        console.log(`  ║  Base path : "${RELATIVE_BASE}"`);
        console.log(`  ║  Mode      : Relative (works anywhere)`);
        console.log(`  ╚═══════════════════════════════════════╝\n`);
      }

      return { base: RELATIVE_BASE };
    },

    configResolved(config) {
      assetMarker = assetPathMarker(config.build.assetsDir);
    },

    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        /** @type {import('vite').HtmlTagDescriptor[]} */
        const tags = [
          {
            tag: 'meta',
            attrs: { name: META_NAME, content: RELATIVE_BASE },
            injectTo: 'head',
          },
          {
            tag: 'meta',
            attrs: { name: META_ASSET_MARKER, content: assetMarker },
            injectTo: 'head',
          },
        ];

        if (injectRuntime) {
          tags.push({
            tag: 'script',
            attrs: { 'data-vite-basepath': '' },
            children: buildRuntimeInlineScript(assetMarker),
            injectTo: 'head',
          });
        }

        return { html, tags };
      },
    },
  };
}
