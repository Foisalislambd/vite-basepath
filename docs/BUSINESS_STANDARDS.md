# Business Standards

Product, packaging, and release rules for **vite-basepath** on npm.

## Product definition

| Field            | Standard                                                                             |
| ---------------- | ------------------------------------------------------------------------------------ |
| **Name**         | `vite-basepath` (npm package name)                                                   |
| **Purpose**      | Vite build plugin: relative `base: './'` + runtime deploy-path detection for routers |
| **Audience**     | Teams deploying Vite SPAs to unknown subfolders / shared hosting                     |
| **Not in scope** | Fixed-path builds (`/demo/`), SSR base config, non-Vite bundlers                     |

## Value proposition

- **One build, many deploy paths** — copy `dist/` to any subdirectory without rebuilding.
- **Zero required config** — `plugins: [viteBasepath()]`.
- **Router-ready** — `getBase()` from `vite-basepath/runtime`.

## Licensing

- **License:** MIT (`LICENSE` file required in repo and npm tarball).
- **Copyright:** Year + contributor name in `LICENSE`; update `package.json` `author` before publish.

## Versioning (SemVer)

| Change                           | Bump      |
| -------------------------------- | --------- |
| Breaking API / behavior          | **MAJOR** |
| New feature, backward compatible | **MINOR** |
| Bug fix, docs, internal          | **PATCH** |

Document all user-visible changes in `CHANGELOG.md` ([Keep a Changelog](https://keepachangelog.com/)).

## npm package metadata (required before publish)

Update `package.json`:

```json
{
  "author": "Your Name <email@example.com>",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Foisalislambd/vite-basepath.git"
  },
  "bugs": "https://github.com/Foisalislambd/vite-basepath/issues",
  "homepage": "https://github.com/Foisalislambd/vite-basepath#readme"
}
```

| Field                   | Rule                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `description`           | One sentence, ≤ 140 chars, no trailing period in npm search if possible               |
| `keywords`              | 5–12 relevant terms (`vite`, `plugin`, `base`, `subdirectory`, …)                     |
| `engines.node`          | `>=18.0.0`                                                                            |
| `peerDependencies.vite` | `>=3.0.0` (test against 8.x in CI)                                                    |
| `files`                 | Only publish: `dist/`, `bin/vite-basepath.js`, `README.md`, `LICENSE`, `CHANGELOG.md` |
| `sideEffects`           | `false`                                                                               |

## Release checklist

1. `npm run test` (lint + typecheck + verify + verify:build)
2. Bump version in `package.json` (SemVer)
3. Move `[Unreleased]` → `[x.y.z] - date` in `CHANGELOG.md`
4. Git tag `vX.Y.Z`
5. `npm publish` (runs `prepublishOnly` → build)
6. GitHub Release notes from changelog

## Support & communication

- **Issues:** GitHub Issues for bugs and feature requests.
- **Security:** Follow `SECURITY.md` (no public CVE discussion before fix).
- **Breaking changes:** Major version + migration notes in README.

## Branding (CLI / build logs)

- Use package name **vite-basepath** in console banners.
- Keep logs short; `verbose: false` disables banners for CI.

## Quality bar (release gate)

| Gate               | Command                      |
| ------------------ | ---------------------------- |
| Lint               | `npm run lint`               |
| Format             | `npm run format:check`       |
| Types              | `npm run check`              |
| Logic tests        | `node test/verify-logic.mjs` |
| Vite 8 integration | `npm run verify:build`       |

No publish if any gate fails.

## Dependencies policy

- **peer:** `vite` only (consumer supplies version).
- **dev:** `typescript`, `tsup`, `vite`, `@types/node`, eslint stack.
- Avoid runtime dependencies — keeps install size minimal.
