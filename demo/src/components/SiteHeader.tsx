import { SITE, NAV } from '../data/site';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="logo">
          <span className="logo-mark" aria-hidden="true" />
          <span>{SITE.title}</span>
        </a>
        <nav className="nav" aria-label="Documentation sections">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            href={SITE.npmUrl}
            className="badge-version"
            target="_blank"
            rel="noopener noreferrer"
          >
            v{SITE.version}
          </a>
          <a
            href={SITE.github}
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
