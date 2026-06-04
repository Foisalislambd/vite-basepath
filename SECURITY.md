# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 1.x     | Yes       |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security problems.

1. Email the maintainer (see `package.json` `author` or repository owner), or open a **private** security advisory on GitHub.
2. Include steps to reproduce, affected versions, and impact.
3. Allow up to **7 business days** for an initial response.

We will confirm receipt, assess severity, and publish a fix or mitigation before public disclosure when possible.

## Scope

In scope:

- Path handling bugs (XSS via injected HTML, incorrect base detection)
- CLI command injection

Out of scope:

- Misconfiguration of the host server (Nginx, CDN)
- Vite core vulnerabilities (report to [vitejs/vite](https://github.com/vitejs/vite))
