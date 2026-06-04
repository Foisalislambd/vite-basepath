import { useState } from 'react';

type Props = {
  code: string;
  lang?: string;
  title?: string;
};

export function CodeBlock({ code, lang = 'bash', title }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="code-block group">
      <div className="code-block-header">
        <span className="text-xs font-medium text-slate-400">{title ?? lang}</span>
        <button type="button" onClick={copy} className="code-copy-btn" aria-label="Copy code">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
