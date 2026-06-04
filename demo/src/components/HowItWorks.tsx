import { SectionHeader } from './SectionHeader';

const STEPS = [
  {
    title: 'You build',
    desc: 'Vite outputs relative asset URLs in HTML.',
    icon: '🔨',
  },
  {
    title: 'You deploy',
    desc: 'Copy dist/ to root, subfolder, or GitHub Pages.',
    icon: '🚀',
  },
  {
    title: 'App runs',
    desc: 'Script sets __VITE_BASE__ for routers and APIs.',
    icon: '✨',
  },
] as const;

export function HowItWorks() {
  return (
    <section className="doc-section doc-section-muted">
      <SectionHeader
        id="how-it-works"
        eyebrow="Under the hood"
        title="How it works"
        lead="Custom build.assetsDir is supported — the plugin passes the correct marker to runtime."
      />
      <div className="card-grid card-grid-3">
        {STEPS.map((step) => (
          <article key={step.title} className="icon-card">
            <span className="icon-card-emoji" aria-hidden="true">
              {step.icon}
            </span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
