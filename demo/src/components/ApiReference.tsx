import { CodeBlock } from './CodeBlock';

export function ApiReference() {
  return (
    <section id="api" className="section">
      <div className="container narrow">
        <h2 className="section-title">API reference</h2>

        <h3 className="subsection-title">Plugin options</h3>
        <CodeBlock
          lang="ts"
          code={`viteBasepath({
  injectRuntime: true, // default — HTML bootstrap for getBase()
  verbose: true,       // default — log base info on build
});`}
        />

        <h3 className="subsection-title">Runtime</h3>
        <div className="api-table-wrap">
          <table className="api-table">
            <thead>
              <tr>
                <th>Export</th>
                <th>Returns</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>getBase()</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>Deploy path with trailing slash, e.g. <code>/demo/</code></td>
              </tr>
              <tr>
                <td>
                  <code>getAbsoluteBase()</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>Origin + getBase()</td>
              </tr>
              <tr>
                <td>
                  <code>resolveUrl(path)</code>
                </td>
                <td>
                  <code>string</code>
                </td>
                <td>Join path to detected base</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock
          lang="ts"
          code={`import { getBase, getAbsoluteBase, resolveUrl } from 'vite-basepath/runtime';`}
        />
      </div>
    </section>
  );
}
