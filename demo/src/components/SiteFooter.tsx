import { SITE } from '../data/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          <strong>{SITE.title}</strong> — MIT License
        </p>
        <nav className="footer-nav" aria-label="Footer links">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={SITE.npmUrl} target="_blank" rel="noopener noreferrer">
            npm
          </a>
          <a href="#install">Documentation</a>
        </nav>
        <p className="footer-meta">
          Built with Vite + React. Deployed via GitHub Pages with vite-basepath.
        </p>
      </div>
    </footer>
  );
}
