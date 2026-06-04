import { SITE } from '../data/site';
import { CodeBlock } from './CodeBlock';

export function GitHubPagesGuide() {
  return (
    <section id="github-pages" className="section section-alt">
      <div className="container narrow">
        <h2 className="section-title">GitHub Pages guide</h2>
        <p className="section-lead">
          This documentation site is hosted at{' '}
          <a href={SITE.liveUrl} className="link">
            {SITE.liveUrl}
          </a>
          . Your project site URL is always{' '}
          <code>https://&lt;username&gt;.github.io/&lt;repo-name&gt;/</code>.
        </p>

        <ol className="steps-list numbered">
          <li>
            Add <code>viteBasepath()</code> to <code>vite.config.ts</code> (see Install).
          </li>
          <li>
            Push your repo to GitHub (repo name = URL path, e.g.{' '}
            <code>vite-basepath</code>).
          </li>
          <li>
            <strong>Settings → Pages → Build and deployment</strong> — Source:{' '}
            <strong>GitHub Actions</strong>.
          </li>
          <li>
            Use the included workflow or build <code>dist/</code> and deploy via Actions.
          </li>
        </ol>

        <div className="callout callout-success">
          You do <strong>not</strong> need <code>base: '/vite-basepath/'</code>. The
          plugin keeps <code>./</code> and detects <code>{SITE.pagesPath}</code> at
          runtime.
        </div>

        <h3 className="subsection-title">Optional: CLI</h3>
        <CodeBlock code="npx vite-basepath build" />
      </div>
    </section>
  );
}
