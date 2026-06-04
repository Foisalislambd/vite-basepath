import { SectionHeader } from './SectionHeader';

export function ProblemSolution() {
  return (
    <>
      <section className="doc-section">
        <SectionHeader
          id="problem"
          eyebrow="Why it matters"
          title="Absolute paths break in subfolders"
          lead="Vite’s default root-based assets work at the domain root — not when your app lives under /my-app/ or on GitHub Pages."
        />
        <div className="card-grid card-grid-2">
          <article className="feature-card feature-card-warn">
            <div className="feature-icon feature-icon-warn" aria-hidden="true">
              ✕
            </div>
            <h3>
              With <code>base: '/'</code>
            </h3>
            <p className="feature-code">
              <code>&lt;script src="/assets/app.js"&gt;</code>
            </p>
            <ul>
              <li>Browser requests from domain root</li>
              <li>404 when hosted in a subpath</li>
            </ul>
          </article>
          <article className="feature-card feature-card-ok">
            <div className="feature-icon feature-icon-ok" aria-hidden="true">
              ✓
            </div>
            <h3>
              With <code>vite-basepath</code>
            </h3>
            <p className="feature-code">
              <code>&lt;script src="./assets/app.js"&gt;</code>
            </p>
            <ul>
              <li>Paths resolve beside index.html</li>
              <li>Same build, any deploy folder</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="doc-section doc-section-muted">
        <SectionHeader
          id="solution"
          eyebrow="How it helps"
          title="One plugin, three simple steps"
          lead="No hard-coded /repo-name/ in config. The plugin handles build and runtime for you."
        />
        <ol className="timeline">
          <li className="timeline-item">
            <span className="timeline-num">1</span>
            <div>
              <h3>Build with relative base</h3>
              <p>
                Sets Vite <code>base: './'</code> automatically on <code>vite build</code>
                .
              </p>
            </div>
          </li>
          <li className="timeline-item">
            <span className="timeline-num">2</span>
            <div>
              <h3>Inject lightweight detection</h3>
              <p>
                A tiny script in HTML finds where <code>/assets/</code> files load from.
              </p>
            </div>
          </li>
          <li className="timeline-item">
            <span className="timeline-num">3</span>
            <div>
              <h3>Use getBase() in your router</h3>
              <p>
                Returns the real path — e.g. <code>/vite-basepath/</code> on this site.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </>
  );
}
