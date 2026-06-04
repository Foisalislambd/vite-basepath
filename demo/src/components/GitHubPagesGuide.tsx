import { SITE } from '../data/site';
import { SectionHeader } from './SectionHeader';
import { CodeBlock } from './CodeBlock';

export function GitHubPagesGuide() {
  return (
    <section className="doc-section doc-section-muted">
      <SectionHeader
        id="github-pages"
        eyebrow="GitHub Pages"
        title="Host on GitHub Pages"
        lead="This documentation site is the proof — built and deployed with vite-basepath."
      />
      <div className="gh-steps">
        <div className="gh-step">
          <span>1</span>
          <p>
            Add <code>viteBasepath()</code> to your Vite config.
          </p>
        </div>
        <div className="gh-step">
          <span>2</span>
          <p>
            Enable <strong>Settings → Pages → GitHub Actions</strong> as the source.
          </p>
        </div>
        <div className="gh-step">
          <span>3</span>
          <p>
            Push to <code>main</code>. Your site lives at{' '}
            <a href={SITE.liveUrl} className="text-link">
              {SITE.liveUrl}
            </a>
          </p>
        </div>
      </div>
      <div className="tip-card tip-card-success">
        <strong>No base: '/repo-name/' needed</strong>
        <p>
          Keep <code>./</code> — the plugin detects <code>{SITE.pagesPath}</code> at
          runtime automatically.
        </p>
      </div>
      <CodeBlock code="npx vite-basepath build" title="optional CLI" />
    </section>
  );
}
