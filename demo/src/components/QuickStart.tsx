import { SectionHeader } from './SectionHeader';
import { CodeBlock } from './CodeBlock';

export function QuickStart() {
  return (
    <section className="doc-section">
      <SectionHeader
        id="install"
        eyebrow="Quick start"
        title="Up and running in two minutes"
        lead="Works with React, Vue, Svelte, or plain Vite. Add the plugin and build."
      />
      <div className="steps-cards">
        <div className="step-card">
          <span className="step-card-num">01</span>
          <h3>Install</h3>
          <CodeBlock code="npm install vite-basepath --save-dev" />
        </div>
        <div className="step-card">
          <span className="step-card-num">02</span>
          <h3>Configure Vite</h3>
          <CodeBlock
            lang="ts"
            title="vite.config.ts"
            code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteBasepath from 'vite-basepath';

export default defineConfig({
  plugins: [react(), viteBasepath()],
});`}
          />
        </div>
        <div className="step-card">
          <span className="step-card-num">03</span>
          <h3>Build & deploy</h3>
          <CodeBlock
            code={`npm run build
# Upload dist/ anywhere — it just works`}
          />
        </div>
      </div>
      <aside className="tip-card">
        <strong>Local preview</strong>
        <p>
          Use <code>npm run dev</code> or <code>vite preview</code>. Opening index.html
          via file:// is not supported (browser module restrictions).
        </p>
      </aside>
    </section>
  );
}
