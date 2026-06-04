# Contributing

Thanks for helping improve **vite-basepath**.

## Quick start

```bash
git clone <repo-url>
cd vite-basepath
npm install
npm run test
```

## Standards (required reading)

- [Code standards](docs/CODE_STANDARDS.md) — TypeScript, layout, invariants
- [Business standards](docs/BUSINESS_STANDARDS.md) — releases, npm, SemVer

## Pull requests

1. Branch from `main`: `feat/...`, `fix/...`, `docs/...`
2. Run `npm run test` locally
3. Update `CHANGELOG.md` under `[Unreleased]`
4. Open PR with clear description and test evidence

## Reporting bugs

Include:

- Vite version (`npx vite -v`)
- `vite.config` plugin snippet
- Expected vs actual behavior
- Deploy URL path (e.g. `https://host.com/demo/app/`)

## Feature requests

Explain the deploy scenario. We prioritize **relative `./` builds** and **runtime detection** — fixed-prefix-only workflows are out of scope.
