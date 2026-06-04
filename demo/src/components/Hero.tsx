import { useEffect, useState } from 'react';
import { getBase, getAbsoluteBase } from 'vite-basepath/runtime';
import { SITE } from '../data/site';
import { CodeBlock } from './CodeBlock';

export function Hero() {
  const [base, setBase] = useState('…');
  const [absolute, setAbsolute] = useState('…');

  useEffect(() => {
    setBase(getBase());
    setAbsolute(getAbsoluteBase());
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Vite plugin · MIT · npm</p>
          <h1 id="hero-title">
            Deploy your Vite app to <span className="text-gradient">any path</span>
          </h1>
          <p className="hero-lead">
            {SITE.tagline} Stop rebuilding for every subfolder, cPanel path, or GitHub Pages
            project site. Set <code>base: './'</code> automatically and detect the real URL at
            runtime.
          </p>
          <div className="hero-cta">
            <a href="#install" className="btn-primary">
              Get started
            </a>
            <a href={SITE.npmUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              View on npm
            </a>
          </div>
          <CodeBlock
            title="Quick install"
            lang="bash"
            code={`npm install ${SITE.npm} --save-dev`}
          />
        </div>
        <aside className="live-panel" aria-label="Live path detection">
          <p className="live-panel-label">Live on this page</p>
          <p className="live-panel-hint">
            This site is built with vite-basepath. Values update from your current URL.
          </p>
          <dl className="live-stats">
            <div>
              <dt>getBase()</dt>
              <dd>
                <code>{base}</code>
              </dd>
            </div>
            <div>
              <dt>getAbsoluteBase()</dt>
              <dd>
                <code className="text-sm">{absolute}</code>
              </dd>
            </div>
            <div>
              <dt>Deploy path</dt>
              <dd>
                <code>{SITE.pagesPath}</code>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
