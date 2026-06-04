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
    a: 'No. file:// URLs block ES modules in most browsers. Always use a local server.',
  },
  {
    q: 'Do I need base: "/repo-name/" for GitHub Pages?',
    a: 'No. One ./ build works for root and project pages. getBase() returns the real path at runtime.',
  },
  {
    q: 'What Vite versions are supported?',
    a: 'Vite 3 through 8. transformIndexHtml uses order + handler (Vite 7+).',
  },
] as const;

export function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container narrow">
        <h2 className="section-title">FAQ</h2>
        <dl className="faq-list">
          {FAQ.map((item) => (
            <div key={item.q} className="faq-item">
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
