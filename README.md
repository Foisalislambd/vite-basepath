# vite-basepath

> Vite plugin that automatically fixes asset paths so your app works when deployed to **any subdirectory or domain path** — without changing your `vite.config.js` every time.

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
import react from '@vitejs/plugin-react'; // তোমার existing framework plugin
import dynamicBase from 'vite-basepath'; // ← এই import টা যোগ করো

export default defineConfig({
  plugins: [
    react(),
    dynamicBase(), // ← এই line টা যোগ করো
  ],
});
```

> **ব্যস।** এখন `npm run build` করো — build যেকোনো folder-এ কাজ করবে।

---

### Router ব্যবহার করলে? (React Router / Vue Router)

একটা extra step লাগবে — router-কে বলতে হবে app কোথায় আছে।

**React Router v6:**

```jsx
// src/main.jsx
import { BrowserRouter } from 'react-router-dom';
import { getBase } from 'vite-basepath/runtime'; // ← এটা import করো

root.render(
  <BrowserRouter basename={getBase()}> {/* ← basename যোগ করো */}
    <App />
  </BrowserRouter>
);
```

**Vue Router:**

```js
// src/router/index.js
import { createWebHistory, createRouter } from 'vue-router';
import { getBase } from 'vite-basepath/runtime'; // ← এটা import করো

const router = createRouter({
  history: createWebHistory(getBase()), // ← getBase() দিয়ে wrap করো
  routes: [...],
});
```

> Router না থাকলে (plain Vite, no BrowserRouter) এই step দরকার নেই।

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
import dynamicBase from 'vite-basepath';

export default defineConfig({
  plugins: [
    dynamicBase()  // That's it! ✅
  ]
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
  </BrowserRouter>
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
</BrowserRouter>
```

---

## Deploying to a Specific Path

If you know the subfolder ahead of time, pass it explicitly:

### Option A: Plugin config

```js
// vite.config.js
export default defineConfig({
  plugins: [
    dynamicBase({ base: '/demo/template' })
  ]
});
```

### Option B: Environment variable

```bash
# In terminal
APP_BASE_URL=/demo/template npx vite build

# In .env file
APP_BASE_URL=/demo/template
```

### Option C: CLI tool

```bash
# Install globally (optional)
npm install -g vite-basepath

# Build with base path
vite-basepath build --base /demo/template

# Build to custom output folder
vite-basepath build --base /demo/template --outDir public

# Preview the built app
vite-basepath preview --base /demo/template
```

---

## Runtime Helpers

Import from `vite-basepath/runtime`:

```js
import { getBase, getAbsoluteBase, resolveUrl } from 'vite-basepath/runtime';

// Get the base path (relative to origin)
getBase()           // e.g. "/demo/template/"

// Get the full absolute URL
getAbsoluteBase()   // e.g. "https://website.com/demo/template/"

// Build a URL relative to the base
resolveUrl('api/users')  // e.g. "/demo/template/api/users"
```

---

## CLI Reference

```
vite-basepath <command> [options]

Commands:
  build      Build for production (default)
  preview    Preview the production build

Options:
  --base,   -b <path>    Deployment base path (default: ./)
  --outDir, -o <dir>     Output directory    (default: dist)
  --config, -c <file>    Vite config file
  --mode,   -m <mode>    Vite mode (production/staging/etc.)
  --help,   -h           Show help

Environment Variables:
  APP_BASE_URL           Same as --base flag
  VITE_APP_BASE_URL      Same as --base flag
```

---

## Plugin Options

```js
dynamicBase({
  // Explicit base path. Overrides env vars.
  // Default: reads APP_BASE_URL env var, or falls back to './'
  base: '/my-app',

  // Inject a tiny runtime script to detect base path automatically.
  // Needed for getBase() to work in relative (./) mode.
  // Default: true
  injectRuntime: true,

  // Print base path info in the terminal during build.
  // Default: true
  verbose: true,
})
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

### Deploy to GitHub Pages (project page)

```bash
vite-basepath build --base /your-repo-name
```

### Deploy to Nginx subfolder

```nginx
location /demo/template/ {
  alias /var/www/my-app/dist/;
  try_files $uri $uri/ /demo/template/index.html;
}
```

```bash
vite-basepath build --base /demo/template
```

---

## Compatibility

| Vite version | Supported |
|---|---|
| Vite 3.x | ✅ |
| Vite 4.x | ✅ |
| Vite 5.x | ✅ |
| Vite 6.x | ✅ |

Works with all Vite-based frameworks:
- ⚛️ React (Create React App via Vite, Vite + React)
- 💚 Vue 3 / Vue 2
- 🟠 Svelte
- 🔷 SolidJS
- 🔶 Qwik
- ⚡ Astro (partial support)

---

## License

MIT
