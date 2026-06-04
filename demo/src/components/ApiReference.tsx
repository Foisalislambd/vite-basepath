import { SectionHeader } from './SectionHeader';
import { CodeBlock } from './CodeBlock';

export function ApiReference() {
  return (
    <section className="doc-section">
      <SectionHeader
        id="api"
        eyebrow="Reference"
        title="API"
        lead="TypeScript types ship with the package."
      />
      <h3 className="subsection-title">Plugin options</h3>
      <CodeBlock
        lang="ts"
        code={`viteBasepath({
  injectRuntime: true, // default
  verbose: true,       // default — build log
});`}
      />
      <h3 className="subsection-title">Runtime exports</h3>
      <div className="api-table-wrap">
        <table className="api-table">
          <thead>
            <tr>
              <th>Function</th>
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
              <td>Deploy path with trailing slash</td>
            </tr>
            <tr>
              <td>
                <code>getAbsoluteBase()</code>
              </td>
              <td>
                <code>string</code>
              </td>
              <td>Origin + base</td>
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
    </section>
  );
}
