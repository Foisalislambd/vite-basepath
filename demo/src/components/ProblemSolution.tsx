export function ProblemSolution() {
  return (
    <>
      <section id="problem" className="section">
        <div className="container narrow">
          <h2 className="section-title">The problem</h2>
          <p className="section-lead">
            Vite defaults to root-absolute asset paths. That works on{' '}
            <code>https://yoursite.com/</code> but breaks when users open{' '}
            <code>https://yoursite.com/my-app/</code> or GitHub Pages at{' '}
            <code>username.github.io/repo-name/</code>.
          </p>
          <div className="compare-grid">
            <article className="compare-card compare-bad">
              <h3>
                Root base <code>/</code>
              </h3>
              <ul>
                <li>
                  <code>&lt;script src="/assets/index.js"&gt;</code>
                </li>
                <li>Browser loads from domain root</li>
                <li className="text-bad">404 in subfolders</li>
              </ul>
            </article>
            <article className="compare-card compare-good">
              <h3>
                Relative base <code>./</code> + vite-basepath
              </h3>
              <ul>
                <li>
                  <code>&lt;script src="./assets/index.js"&gt;</code>
                </li>
                <li>
                  Resolves next to <code>index.html</code>
                </li>
                <li className="text-good">Works in any folder</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="solution" className="section section-alt">
        <div className="container narrow">
          <h2 className="section-title">The solution</h2>
          <p className="section-lead">
            Add one plugin. Your production build uses relative assets. Routers get the
            real deploy path from <code>getBase()</code> — no hard-coded{' '}
            <code>/repo-name/</code> in config.
          </p>
          <ol className="steps-list">
            <li>
              <strong>Build time</strong> — plugin sets Vite <code>base: './'</code>
            </li>
            <li>
              <strong>HTML inject</strong> — tiny script detects where{' '}
              <code>/assets/</code> loaded
            </li>
            <li>
              <strong>Runtime</strong> — <code>getBase()</code> returns e.g.{' '}
              <code>/vite-basepath/</code>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
