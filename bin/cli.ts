import { execSync } from 'node:child_process';

const args = process.argv.slice(2);

function getFlag(name: string, short?: string): string | null {
  const longIdx = args.indexOf(`--${name}`);
  const shortIdx = short ? args.indexOf(`-${short}`) : -1;
  const idx = longIdx !== -1 ? longIdx : shortIdx;
  if (idx === -1) return null;
  return args[idx + 1] ?? null;
}

function hasFlag(name: string, short?: string): boolean {
  return args.includes(`--${name}`) || (short ? args.includes(`-${short}`) : false);
}

const firstArg = args[0];
const command = firstArg && !firstArg.startsWith('-') ? firstArg : 'build';
const outDir = getFlag('outDir', 'o');
const configFile = getFlag('config', 'c');
const showHelp = hasFlag('help', 'h');
const mode = getFlag('mode', 'm');

if (showHelp) {
  console.log(`
  vite-basepath — build with relative base (./)

  USAGE
    vite-basepath <command> [options]

  COMMANDS
    build      Build for production (default)
    preview    Preview the production build

  OPTIONS
    --outDir, -o <dir>     Output directory (default: dist)
    --config, -c <file>    Vite config file
    --mode,   -m <mode>    Vite mode
    --help,   -h           Show this help

  EXAMPLES
    vite-basepath build
    vite-basepath build --outDir public
    vite-basepath preview
`);
  process.exit(0);
}

const ALLOWED = ['build', 'preview'] as const;
if (!ALLOWED.includes(command as (typeof ALLOWED)[number])) {
  console.error(`  ✗ Unknown command: "${command}"`);
  console.error(`  Allowed: ${ALLOWED.join(', ')}\n`);
  process.exit(1);
}

const parts = ['npx', 'vite', command];
if (outDir) parts.push('--outDir', outDir);
if (configFile) parts.push('--config', configFile);
if (mode) parts.push('--mode', mode);

const cmd = parts.join(' ');
const successLabel = command === 'preview' ? 'Preview ready' : 'Build complete';

console.log(`\n  vite-basepath → vite ${command} (base ./)\n`);

try {
  execSync(cmd, {
    stdio: 'inherit',
    shell: process.platform === 'win32' ? (process.env.ComSpec ?? 'cmd.exe') : '/bin/sh',
  });
  console.log(`\n  ✅ ${successLabel}!\n`);
} catch {
  console.error(`\n  ✗ ${command} failed.\n`);
  process.exit(1);
}
