import { CodeBlock } from './CodeBlock';

export function RouterGuide() {
  return (
    <section id="router" className="section">
      <div className="container narrow">
        <h2 className="section-title">Client-side routers</h2>
        <p className="section-lead">
          Relative assets fix loading JS/CSS. Routers still need the deploy path as{' '}
          <code>basename</code>. Import <code>getBase()</code> from the runtime package.
        </p>

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
    </section>
  );
}
