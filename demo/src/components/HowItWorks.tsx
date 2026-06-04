export function HowItWorks() {
  return (
    <section id="how-it-works" className="section section-alt">
      <div className="container narrow">
        <h2 className="section-title">How it works</h2>
        <div className="flow-diagram" role="img" aria-label="Build with relative paths, deploy anywhere, runtime detects path">
          <div className="flow-step">
            <span className="flow-num">1</span>
            <div>
              <h3>Build</h3>
              <p>Vite emits <code>./assets/...</code> URLs in HTML.</p>
            </div>
          </div>
          <div className="flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="flow-step">
            <span className="flow-num">2</span>
            <div>
              <h3>Deploy</h3>
              <p>Copy <code>dist/</code> to root, subfolder, or GitHub Pages.</p>
            </div>
          </div>
          <div className="flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="flow-step">
            <span className="flow-num">3</span>
            <div>
              <h3>Run</h3>
              <p>Injected script sets <code>window.__VITE_BASE__</code> for routers.</p>
            </div>
          </div>
        </div>
        <p className="section-lead mt-8">
          Custom <code>build.assetsDir</code> (e.g. <code>static</code>) is supported — the plugin
          reads it at build time and passes the marker to runtime.
        </p>
      </div>
    </section>
  );
}
