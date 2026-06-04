# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-06-04

### Changed

- README: English-only documentation
- `package.json` author, repository, bugs, and homepage linked to [GitHub](https://github.com/Foisalislambd/vite-basepath)

## [1.0.0] - 2026-06-04

### Added

- Vite plugin with relative `base: './'` for subdirectory-safe builds
- TypeScript source, `tsup` build, published `.d.ts` types
- Runtime helpers: `getBase`, `getAbsoluteBase`, `resolveUrl`
- CLI wrapper (`vite-basepath build` / `preview`)
- Verification scripts (`npm run verify`, `verify:build`)

[Unreleased]: https://github.com/Foisalislambd/vite-basepath/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/Foisalislambd/vite-basepath/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Foisalislambd/vite-basepath/releases/tag/v1.0.0
