import { SectionHeader } from './SectionHeader';
import { CodeBlock } from './CodeBlock';
import { CopySnippet } from './CopySnippet';

const VITE_CONFIG_EXAMPLE = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteBasepath from 'vite-basepath';

export default defineConfig({
  plugins: [react(), viteBasepath()],
});`;

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
        <div className="step-card step-card-vite">
          <span className="step-card-num">02</span>
          <h3>Configure Vite</h3>
          <p className="step-card-lead">
            In <code>vite.config.ts</code>, add these two pieces from{' '}
            <strong>vite-basepath</strong> — the import at the top and the plugin in your{' '}
            <code>plugins</code> array:
          </p>
          <div className="vite-config-additions" role="list">
            <div className="vite-config-addition" role="listitem">
              <p className="vite-config-addition-title">
                <span className="vite-config-step-badge">1</span>
                Import at the top of the file
              </p>
              <CopySnippet code="import viteBasepath from 'vite-basepath';" />
            </div>
            <div className="vite-config-addition" role="listitem">
              <p className="vite-config-addition-title">
                <span className="vite-config-step-badge">2</span>
                Register in <code>plugins</code>
              </p>
              <CopySnippet code="viteBasepath()" />
            </div>
          </div>
          <p className="step-card-hint">Full <code>vite.config.ts</code> example:</p>
          <CodeBlock
            lang="ts"
            title="vite.config.ts"
            code={VITE_CONFIG_EXAMPLE}
            highlightLines={[
              { line: 3, label: 'Add import' },
              { line: 6, label: 'Add plugin' },
            ]}
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
