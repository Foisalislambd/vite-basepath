import { useState } from 'react';
import { SectionHeader } from './SectionHeader';

const FAQ = [
  {
    q: 'Can I use base: "/" instead of "./"?',
    a: 'You can, but subfolder and GitHub Pages deploys will break again. vite-basepath always uses ./ on purpose.',
  },
  {
    q: 'Does it work on localhost?',
    a: 'Yes. Use npm run dev or vite preview over HTTP. Same plugin, same relative assets.',
  },
  {
    q: 'Can I open index.html from Windows Explorer?',
    a: 'No. file:// URLs block ES modules in most browsers. Always use a local HTTP server.',
  },
  {
    q: 'Do I need base: "/repo-name/" for GitHub Pages?',
    a: 'No. One ./ build works for root and project pages. getBase() returns the real path at runtime.',
  },
  {
    q: 'What Vite versions are supported?',
    a: 'Vite 3 through 8. transformIndexHtml uses order + handler (required in Vite 7+).',
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="doc-section doc-section-muted">
      <SectionHeader id="faq" eyebrow="FAQ" title="Common questions" />
      <div className="accordion">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={isOpen ? 'accordion-item is-open' : 'accordion-item'}
            >
              <button
                type="button"
                className="accordion-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="accordion-chevron" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen ? <div className="accordion-panel">{item.a}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
