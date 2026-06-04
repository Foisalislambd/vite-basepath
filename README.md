# vite-basepath

[![npm version](https://img.shields.io/npm/v/vite-basepath.svg)](https://www.npmjs.com/package/vite-basepath)
[![license](https://img.shields.io/npm/l/vite-basepath.svg)](https://github.com/Foisalislambd/vite-basepath/blob/main/LICENSE)

> Vite plugin that automatically fixes asset paths so your app works when deployed to **any subdirectory or domain path** — without changing your `vite.config.js` every time.

**Repository:** [github.com/Foisalislambd/vite-basepath](https://github.com/Foisalislambd/vite-basepath)

---

## The Problem

By default, Vite builds your app assuming it will be hosted at the **root** of a domain (`/`).

```
✅ Works:  https://website.com/
❌ Breaks: https://website.com/demo/template/
❌ Breaks: https://website.com/projects/my-app/
```

Assets fail to load because their paths start with `/`, which points to the wrong location.

## The Solution

This plugin sets Vite's `base` to `./` (relative paths) by default. Relative paths work **anywhere** — root or subfolder — without any configuration.

```
✅ Works: https://website.com/
✅ Works: https://website.com/demo/template/
✅ Works: https://website.com/projects/my-app/
✅ Works: https://any-domain.com/any/nested/path/
```

---

## Setup (2 steps only)

### Step 1 — Install

```bash
npm install vite-basepath --save-dev
```

### Step 2 — Add to `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // your existing framework plugin
import viteBasepath from 'vite-basepath';

export default defineConfig({
  plugins: [react(), viteBasepath()],
});
```

> **Done.** Run `npm run build` — the output works in any folder on your server.

---

### Using a router? (React Router / Vue Router)

One extra step: tell the router where the app is deployed.

**React Router v6:**

```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router-dom';
import { getBase } from 'vite-basepath/runtime';

root.render(
  <BrowserRouter basename={getBase()}>
    <App />
  </BrowserRouter>,
);
```

**Vue Router:**

```js
// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router';
import { getBase } from 'vite-basepath/runtime';

const router = createRouter({
  history: createWebHistory(getBase()),
  routes: [...],
});
```

> Skip this if you do not use client-side routing (plain Vite, no `BrowserRouter`).

---

## TypeScript

Types ship with the package (`ViteBasepathOptions`, `getBase()`, etc.). No `@types` package needed.

```ts
import { defineConfig } from 'vite';
import viteBasepath, { type ViteBasepathOptions } from 'vite-basepath';
import { getBase } from 'vite-basepath/runtime';
```

---

## Installation

```bash
npm install vite-basepath --save-dev
# or
yarn add vite-basepath --dev
# or
pnpm add vite-basepath --save-dev
```

---

## Quick Start

**1. Add the plugin to `vite.config.js`:**

```js
// vite.config.js
import { defineConfig } from 'vite';
import viteBasepath from 'vite-basepath';

export default defineConfig({
  plugins: [
    viteBasepath(), // That's it! ✅
  ],
});
```

**2. Build normally:**

```bash
npx vite build
```

Your built project will now work in **any folder** on any server.

---

## Usage with Routers (React / Vue)

When using client-side routing, your router needs to know the base path.
Import the `getBase()` helper from the runtime module:

### React Router v6

```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router-dom';
import { getBase } from 'vite-basepath/runtime';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={getBase()}>
    <App />
  </BrowserRouter>,
);
```

### Vue Router

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { getBase } from 'vite-basepath/runtime';

const router = createRouter({
  history: createWebHistory(getBase()),
  routes: [...]
});
```

### React Router v5

```jsx
import { BrowserRouter } from 'react-router-dom';
import { getBase } from 'vite-basepath/runtime';

<BrowserRouter basename={getBase()}>
  <App />
</BrowserRouter>;
```

---

## Runtime Helpers

Import from `vite-basepath/runtime`:

```js
import { getBase, getAbsoluteBase, resolveUrl } from 'vite-basepath/runtime';

// Detected deploy path (from ./ build + where assets load)
getBase(); // e.g. "/demo/template/"

// Get the full absolute URL
getAbsoluteBase(); // e.g. "https://website.com/demo/template/"

// Build a URL relative to the base
resolveUrl('api/users'); // e.g. "/demo/template/api/users"
```

---

## CLI Reference

```
vite-basepath <command> [options]

Commands:
  build      Build for production (default)
  preview    Preview the production build

Options:
  --outDir, -o <dir>     Output directory    (default: dist)
  --config, -c <file>    Vite config file
  --mode,   -m <mode>    Vite mode (production/staging/etc.)
  --help,   -h           Show help

(Build always uses base ./ — no --base flag needed.)
```

---

## Plugin Options

```js
viteBasepath({
  // Inject runtime script so getBase() can detect deploy path. Default: true
  injectRuntime: true,

  // Print build info in the terminal. Default: true
  verbose: true,
});
```

---

## How It Works

1. **Build time:** The plugin sets Vite's `base` option to `./` (relative paths).  
   This makes all asset `<script src>` and `<link href>` tags use relative URLs — so they work no matter what folder the `index.html` is in.

2. **HTML injection:** The plugin injects a tiny `<script>` and `<meta>` tag into `index.html` during build. The script detects the real base path at runtime by looking at where `/assets/` files are loaded from.

3. **Runtime:** `getBase()` reads the detected base and returns the correct path for routers.

---

## Examples

### Deploy same build to multiple paths

```bash
# Build once
npx vite build

# Copy dist/ to multiple locations — all will work!
cp -r dist/ /var/www/html/
cp -r dist/ /var/www/html/demo/
cp -r dist/ /var/www/html/projects/my-app/
```

### Nginx subfolder (same ./ build)

```nginx
location /demo/template/ {
  alias /var/www/my-app/dist/;
  try_files $uri $uri/ /demo/template/index.html;
}
```

Copy `dist/` into that folder — no separate build per path.

---

## Compatibility

| Vite version | Supported |
| ------------ | --------- |
| Vite 3.x     | ✅        |
| Vite 4.x     | ✅        |
| Vite 5.x     | ✅        |
| Vite 6.x     | ✅        |
| Vite 7.x     | ✅        |
| Vite 8.x     | ✅        |

Works with all Vite-based frameworks:

- ⚛️ React (Create React App via Vite, Vite + React)
- 💚 Vue 3 / Vue 2
- 🟠 Svelte
- 🔷 SolidJS
- 🔶 Qwik
- ⚡ Astro (partial support)

---

## Project standards

| Document                                         | Purpose                                |
| ------------------------------------------------ | -------------------------------------- |
| [Code standards](docs/CODE_STANDARDS.md)         | TypeScript, layout, logic invariants   |
| [Business standards](docs/BUSINESS_STANDARDS.md) | npm publish, SemVer, release checklist |
| [Contributing](CONTRIBUTING.md)                  | PR workflow                            |
| [Security](SECURITY.md)                          | Vulnerability reporting                |
| [Changelog](CHANGELOG.md)                        | Version history                        |

## License

MIT — see [LICENSE](LICENSE).
