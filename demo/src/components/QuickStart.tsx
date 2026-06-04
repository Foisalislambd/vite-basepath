import { CodeBlock } from './CodeBlock';

export function QuickStart() {
  return (
    <section id="install" className="section">
      <div className="container narrow">
        <h2 className="section-title">Install in 2 steps</h2>
        <p className="section-lead">
          Works with React, Vue, Svelte, or plain Vite. Requires Vite 3+ (tested on Vite
          8).
        </p>

        <h3 className="subsection-title">1. Install the package</h3>
        <CodeBlock code="npm install vite-basepath --save-dev" />

        <h3 className="subsection-title">2. Add the plugin</h3>
        <CodeBlock
          lang="ts"
          title="vite.config.ts"
          code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteBasepath from 'vite-basepath';

export default defineConfig({
  plugins: [
    react(),
    viteBasepath(), // relative base (./) + runtime detection
  ],
});`}
        />

        <h3 className="subsection-title">3. Build and deploy</h3>
        <CodeBlock
          code={`npm run build
# Upload dist/ to any folder — same build everywhere`}
        />

        <div className="callout">
          <strong>Tip:</strong> Use <code>npx vite preview</code> locally. Do not open{' '}
          <code>index.html</code> with double-click (<code>file://</code>) — browsers
          block modules.
        </div>
      </div>
    </section>
  );
}
