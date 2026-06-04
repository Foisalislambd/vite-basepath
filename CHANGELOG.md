# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- TypeScript source, `tsup` build, published `.d.ts` types
- Runtime helpers: `getBase`, `getAbsoluteBase`, `resolveUrl`
- CLI wrapper (`vite-basepath build` / `preview`)
- Verification scripts (`npm run verify`, `verify:build`)

### Changed

- Relative-only model: build always uses `base: './'` (no fixed `/demo/` config)

## [1.0.0] - 2026-06-04

### Added

- Initial release: Vite plugin for subdirectory-safe asset paths

[Unreleased]: https://github.com/your-username/vite-basepath/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-username/vite-basepath/releases/tag/v1.0.0
