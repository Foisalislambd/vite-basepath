import { defineConfig } from 'vite';
import dynamicBase from '../../../src/index.js';

export default defineConfig({
  plugins: [dynamicBase({ verbose: false })],
});
