# GitHub Pages deployment

## Live site

https://foisalislambd.github.io/vite-basepath/

## Automatic deploy

Workflow: `.github/workflows/deploy-pages.yml`

- Triggers on every push to `main`
- Builds the plugin (`npm run build` at repo root)
- Builds the docs app in `demo/`
- Publishes `demo/dist` to GitHub Pages

## One-time repository settings

1. Open https://github.com/Foisalislambd/vite-basepath/settings/pages
2. **Build and deployment → Source:** select **GitHub Actions** (not “Deploy from branch”)
3. Save

After the next push to `main`, check **Actions** for **Deploy GitHub Pages**.

## Manual deploy

**Actions** tab → **Deploy GitHub Pages** → **Run workflow**.

## What gets published

| File                                       | Purpose                               |
| ------------------------------------------ | ------------------------------------- |
| `index.html`                               | Docs SPA                              |
| `404.html`                                 | Same as index (GitHub Pages fallback) |
| `.nojekyll`                                | Skip Jekyll processing                |
| `assets/*`                                 | Relative `./assets/...` URLs          |
| `sitemap.xml`, `robots.txt`, `favicon.svg` | SEO                                   |

## Custom domain (optional)

Add `demo/public/CNAME` with your domain, rebuild, and configure DNS at your registrar. Not required for `*.github.io` URLs.
