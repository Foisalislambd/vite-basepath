import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    runtime: 'src/runtime.ts',
    shared: 'src/shared.ts',
    cli: 'bin/cli.ts',
  },
  format: ['esm'],
  dts: {
    entry: ['src/index.ts', 'src/runtime.ts', 'src/shared.ts'],
  },
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  target: 'node18',
  outDir: 'dist',
});
