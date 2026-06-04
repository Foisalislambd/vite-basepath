#!/usr/bin/env node

/**
 * vite-basepath CLI
 *
 * A thin wrapper around `vite build` that lets you pass --base
 * without touching your vite.config.js.
 *
 * Usage:
 *   vite-basepath build
 *   vite-basepath build --base /demo/template
 *   vite-basepath build --base /my-app --outDir dist
 */

import { execSync } from 'child_process';

// ─── Parse args manually (no extra deps) ─────────────────────────────────────

const args = process.argv.slice(2);

function getFlag(name, short) {
  const longIdx  = args.indexOf(`--${name}`);
  const shortIdx = short ? args.indexOf(`-${short}`) : -1;
  const idx = longIdx !== -1 ? longIdx : shortIdx;
  if (idx === -1) return null;
  return args[idx + 1] || null;
}

function hasFlag(name, short) {
  return args.includes(`--${name}`) || (short ? args.includes(`-${short}`) : false);
}

// Command must be the FIRST argument and must not start with '-'.
// This prevents flag values like '/demo/template' from being mistaken as commands.
const firstArg = args[0];
const command  = (firstArg && !firstArg.startsWith('-')) ? firstArg : 'build';
const basePath  = getFlag('base', 'b');
const outDir    = getFlag('outDir', 'o');
const configFile = getFlag('config', 'c');
const showHelp  = hasFlag('help', 'h');
const mode      = getFlag('mode', 'm');

// ─── Help ─────────────────────────────────────────────────────────────────────

if (showHelp) {
  console.log(`
  ╔══════════════════════════════════════════════════════════╗
  ║           vite-basepath  CLI                  ║
  ╚══════════════════════════════════════════════════════════╝

  Builds your Vite project so it works in any subdirectory.

  USAGE
    vite-basepath <command> [options]

  COMMANDS
    build      Build for production (default)
    preview    Preview the production build

  OPTIONS
    --base,   -b <path>    Deployment base path (default: ./)
    --outDir, -o <dir>     Output directory    (default: dist)
    --config, -c <file>    Vite config file
    --mode,   -m <mode>    Vite mode (production / staging / etc.)
    --help,   -h           Show this help

  ENVIRONMENT VARIABLES
    APP_BASE_URL           Base path (same as --base)
    VITE_APP_BASE_URL      Base path (same as --base)

  EXAMPLES
    # Relative mode — works in ANY folder, no config needed
    vite-basepath build

    # Deploy to website.com/demo/template/
    vite-basepath build --base /demo/template

    # Deploy to website.com/my-app/
    vite-basepath build --base /my-app

    # Using env variable
    APP_BASE_URL=/demo/template vite-basepath build

    # Custom output folder
    vite-basepath build --base /app --outDir public

    # With custom config
    vite-basepath build --base /demo --config vite.prod.config.js
`);
  process.exit(0);
}

// ─── Validate command ─────────────────────────────────────────────────────────

const ALLOWED = ['build', 'preview'];
if (!ALLOWED.includes(command)) {
  console.error(`  ✗ Unknown command: "${command}"`);
  console.error(`  Allowed commands: ${ALLOWED.join(', ')}\n`);
  process.exit(1);
}

// ─── Set env var so plugin picks it up ───────────────────────────────────────

const env = { ...process.env };

if (basePath) {
  env.APP_BASE_URL = basePath;
} else if (!env.APP_BASE_URL && !env.VITE_APP_BASE_URL) {
  // Default: relative paths → works anywhere
  env.APP_BASE_URL = './';
}

// ─── Build the vite command ───────────────────────────────────────────────────

const parts = ['npx', 'vite', command];
if (outDir)     parts.push('--outDir', outDir);
if (configFile) parts.push('--config', configFile);
if (mode)       parts.push('--mode', mode);

const cmd = parts.join(' ');

console.log(`\n  ┌──────────────────────────────────────┐`);
console.log(`  │   vite-basepath           │`);
console.log(`  ├──────────────────────────────────────┤`);
console.log(`  │  Command : ${command.padEnd(26)}│`);
console.log(`  │  Base    : ${(env.APP_BASE_URL || './').padEnd(26)}│`);
console.log(`  └──────────────────────────────────────┘\n`);

// ─── Run ──────────────────────────────────────────────────────────────────────

try {
  execSync(cmd, { stdio: 'inherit', env });
  console.log(`\n  ✅ Build complete!\n`);
} catch (_) {
  console.error(`\n  ✗ Build failed.\n`);
  process.exit(1);
}
