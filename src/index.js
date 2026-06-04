/**
 * vite-basepath
 *
 * Automatically fixes Vite build asset paths so your app works
 * when deployed to ANY subdirectory or domain path.
 *
 * @example
 * // vite.config.js
 * import dynamicBase from 'vite-basepath';
 *
 * export default defineConfig({
 *   plugins: [dynamicBase()]
 * });
 */

const PLUGIN_NAME = 'vite-basepath';
const META_NAME = 'vite-app-base';
const WINDOW_VAR = '__VITE_BASE__';

/**
 * @typedef {Object} DynamicBaseOptions
 * @property {string}  [base]            - Explicit base path. Overrides env vars.
 * @property {boolean} [injectRuntime]   - Inject runtime base detection script (default: true)
 * @property {boolean} [verbose]         - Print base path info during build (default: true)
 */

/**
 * @param {DynamicBaseOptions} options
 * @returns {import('vite').Plugin}
 */
export default function dynamicBase(options = {}) {
  const {
    base: optionBase,
    injectRuntime = true,
    verbose = true,
  } = options;

  let resolvedBase = './';
  let isRelativeMode = true;

  return {
    name: PLUGIN_NAME,
    enforce: 'pre',

    // ─── Step 1: Set base in Vite config ──────────────────────────────────
    config(userConfig, { command }) {
      if (command !== 'build') return;

      resolvedBase =
        optionBase ||
        process.env.APP_BASE_URL ||
        process.env.VITE_APP_BASE_URL ||
        './';

      // Normalize: ensure trailing slash for non-relative paths
      if (resolvedBase !== './' && resolvedBase !== '.') {
        if (!resolvedBase.endsWith('/')) {
          resolvedBase = resolvedBase + '/';
        }
        if (!resolvedBase.startsWith('/')) {
          resolvedBase = '/' + resolvedBase;
        }
      }

      isRelativeMode = resolvedBase === './' || resolvedBase === '.';

      if (verbose) {
        console.log(`\n  ╔═══════════════════════════════════════╗`);
        console.log(`  ║     vite-basepath          ║`);
        console.log(`  ╠═══════════════════════════════════════╣`);
        console.log(`  ║  Base path : "${resolvedBase}"`);
        if (isRelativeMode) {
          console.log(`  ║  Mode      : Relative (works anywhere)`);
        } else {
          console.log(`  ║  Mode      : Fixed path`);
        }
        console.log(`  ╚═══════════════════════════════════════╝\n`);
      }

      return {
        base: resolvedBase,
      };
    },

    // ─── Step 2: Inject meta tag + runtime script into HTML ───────────────
    transformIndexHtml: {
      enforce: 'post',
      transform(html, ctx) {
        // Skip in dev mode — ctx.bundle only exists during build
        if (!ctx.bundle) return html;
        // 1. Inject <meta> tag so runtime can read the build-time base
        const metaTag = `    <meta name="${META_NAME}" content="${resolvedBase}" />`;

        // 2. Runtime script: detects actual base at page load time
        //    Works by finding a known asset path (/assets/) in <script> srcs
        const runtimeScript = injectRuntime
          ? `    <script data-vite-basepath>
      /* vite-basepath: runtime base detection */
      window["${WINDOW_VAR}"] = (function () {
        var scripts = document.querySelectorAll('script[src]');
        var links   = document.querySelectorAll('link[href]');
        var all     = Array.prototype.slice.call(scripts).concat(Array.prototype.slice.call(links));
        var origin  = window.location.origin;
        for (var i = 0; i < all.length; i++) {
          var url = all[i].src || all[i].href || '';
          var idx = url.indexOf('/assets/');
          if (idx !== -1) {
            return url.substring(0, idx + 1).replace(origin, '') || '/';
          }
        }
        /* Fallback: use current path as base */
        var path = window.location.pathname;
        return path.endsWith('/') ? path : path.substring(0, path.lastIndexOf('/') + 1);
      })();
    </script>`
          : '';

        // Insert before </head>
        const injection = [metaTag, runtimeScript].filter(Boolean).join('\n');
        return html.replace('</head>', `${injection}\n  </head>`);
      },
    },
  };
}
