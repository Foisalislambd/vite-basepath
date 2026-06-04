import { SITE } from '../data/site';

type Props = {
  onMenuToggle: () => void;
  menuOpen: boolean;
};

export function SiteHeader({ onMenuToggle, menuOpen }: Props) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="menu-btn"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
      >
        <span />
        <span />
        <span />
      </button>
      <a
        href={SITE.github}
        className="topbar-github"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </header>
  );
}
