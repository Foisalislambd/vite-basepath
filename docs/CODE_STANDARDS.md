# Code Standards

Technical rules for `vite-basepath` source code.

## Language & tooling

| Tool           | Purpose                         |
| -------------- | ------------------------------- |
| TypeScript 5.x | Source language (`strict` mode) |
| tsup           | Build ESM + `.d.ts` to `dist/`  |
| ESLint         | Lint (`npm run lint`)           |
| Prettier       | Format (`npm run format`)       |
| Node 18+       | Minimum runtime                 |

## Project layout

```
src/
  index.ts            # Vite plugin (public API)
  runtime.ts          # Browser helpers (public)
  shared.ts             # Pure utilities + constants
  inline-bootstrap.ts   # Injected IIFE string (keep in sync with shared detection)
  types.ts              # Public option interfaces
  global.d.ts           # Window.__VITE_BASE__
bin/
  cli.ts                # CLI implementation
  vite-basepath.js      # Published bin shim → dist/cli.js
test/
  verify-logic.mjs      # Unit-style tests (shared helpers)
  verify-build.mjs      # Integration test (Vite 8 fixture)
```

## Naming

| Item               | Convention             | Example                                    |
| ------------------ | ---------------------- | ------------------------------------------ |
| Files              | `kebab-case.ts`        | `inline-bootstrap.ts`                      |
| Functions          | `camelCase`            | `getBase`, `assetPathMarker`               |
| Constants          | `SCREAMING_SNAKE`      | `RELATIVE_BASE`                            |
| Plugin export      | default `viteBasepath` | `import viteBasepath from 'vite-basepath'` |
| Types / interfaces | `PascalCase`           | `ViteBasepathOptions`                      |

## TypeScript rules

- Prefer `import type` for type-only imports.
- No `any`; use `unknown` + narrowing if needed.
- Prefix intentionally unused params with `_`.
- Browser code lives in `runtime.ts` / `inline-bootstrap.ts` only.
- Plugin hooks must match [Vite 8 plugin API](https://vite.dev/guide/api-plugin.html): `order` + `handler` for `transformIndexHtml`.

## Logic invariants (do not break)

1. **Build base is always `./`** — no fixed `/subpath` build mode.
2. **Asset detection** uses `/${assetsDir}/` marker from `config.build.assetsDir`.
3. **Inline bootstrap** and `detectBaseFromAssetUrl()` must stay aligned.
4. **HTML injection** uses `HtmlTagDescriptor` (Vite escapes attrs); never raw unescaped user input in HTML.
5. **`getBase()`** returns a path starting with `/`, ending with `/`.

## Tests required before merge

```bash
npm run lint
npm run format:check
npm run check
npm run test
```

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new capability
- `fix:` bug fix
- `docs:` documentation only
- `chore:` tooling / deps
- `refactor:` no behavior change

## PR checklist

- [ ] `npm run test` passes
- [ ] `CHANGELOG.md` updated under `[Unreleased]`
- [ ] Public API changes reflected in README + `.d.ts` (via build)
