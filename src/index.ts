import type { Plugin } from 'vite';
import {
  PLUGIN_NAME,
  META_NAME,
  META_ASSET_MARKER,
  WINDOW_VAR,
  RELATIVE_BASE,
  assetPathMarker,
} from './shared.js';
import type { ViteBasepathOptions } from './types.js';

export type { ViteBasepathOptions } from './types.js';

function buildRuntimeInlineScript(assetMarker: string): string {
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
 * Vite plugin: build with `base: './'` and optional runtime base detection for routers.
 */
export default function viteBasepath(options: ViteBasepathOptions = {}): Plugin {
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

        const tags: import('vite').HtmlTagDescriptor[] = [
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
