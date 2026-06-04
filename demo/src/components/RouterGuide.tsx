import { SectionHeader } from './SectionHeader';
import { CodeBlock } from './CodeBlock';

export function RouterGuide() {
  return (
    <section className="doc-section">
      <SectionHeader
        id="router"
        eyebrow="Routers"
        title="Client-side routing"
        lead="Relative assets fix JS/CSS loading. Routers still need the deploy path as basename."
      />
      <div className="card-grid card-grid-2">
        <div>
          <h3 className="subsection-title">React Router</h3>
          <CodeBlock
            lang="tsx"
            title="main.tsx"
            code={`import { BrowserRouter } from 'react-router-dom';
import { getBase } from 'vite-basepath/runtime';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={getBase()}>
    <App />
  </BrowserRouter>,
);`}
          />
        </div>
        <div>
          <h3 className="subsection-title">Vue Router</h3>
          <CodeBlock
            lang="ts"
            title="router/index.ts"
            code={`import { createRouter, createWebHistory } from 'vue-router';
import { getBase } from 'vite-basepath/runtime';

export default createRouter({
  history: createWebHistory(getBase()),
  routes: [/* ... */],
});`}
          />
        </div>
      </div>
    </section>
  );
}
