import type { HtmlTagDescriptor, Plugin } from 'vite';
import { buildRuntimeInlineScript } from './inline-bootstrap.js';
import {
  PLUGIN_NAME,
  META_NAME,
  META_ASSET_MARKER,
  RELATIVE_BASE,
  assetPathMarker,
} from './shared.js';
import type { ViteBasepathOptions } from './types.js';

export type { ViteBasepathOptions } from './types.js';

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

        const tags: HtmlTagDescriptor[] = [
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
