# Lessy: portfolio of Finehas Mpoe

Live at **https://lesiamon.com**. A static site with no build step: everything served is in [`dist/`](dist).

## What is in it
- A welcome sequence that ends on a landing screen with an interactive logo: the "lessy." wordmark built from particles that scatter away from your cursor and re-form. Shown once per visit; skipped with reduced motion.
- An intro, a particle field that reacts to the cursor, and a portrait that turns into live ASCII ("View source").
- Selected work in a pinned horizontal scroller, with real screenshots of the live sites.
- A filterable index of every project (type, technology, search), each with a cover image.
- The 87 practice repositories as a wall of squares, a ⌘K command menu, light and dark themes.
- Friendly fallbacks: a 404 page that suggests where you meant to go, short addresses (`/work`, `/about`, `/github`...), and shareable project links (`/projects/rena`).
- An identity icon (favicon, app icons, web manifest) and a share card.
- Work and personal email with copy-to-clipboard icons, social links, a Nairobi clock.

## Run it
```bash
npm install
npm run dev        # http://127.0.0.1:4173
npm test           # lint, content tests, size budget, browsers, accessibility
```

## Layout
| Path | What |
| --- | --- |
| `dist/index.html`, `styles.css`, `app.js`, `hero.js` | The page, styles and behaviour |
| `dist/projects.js` | Every project: copy, stack, links, cover path |
| `dist/landing.js`, `dist/404.js` | The interactive logo, and the 404 page's suggestions |
| `dist/socials.js` | Social links with icons (generated, see `scripts/build-socials.mjs`) |
| `dist/assets/` | Fonts (self-hosted), portrait, logos, `work/` covers, share card |
| `scripts/` | Dev server, cover capture, size budget, image and socials generators |
| `tests/` | `unit` for content, `e2e` for browsers and accessibility |
| `vercel.json` | Security headers (CSP and more), caching, clean URLs |

## Working on it
See [CONTRIBUTING.md](CONTRIBUTING.md): branches, checks, pull requests, deploying and rolling back.

## Notes
- The contact links are plain `mailto:` links. They also copy the address, in case no mail app is set up.
- Project screenshots are regenerated with `npm run capture`. Projects without a public site use a designed cover.
- Repository: https://github.com/Mpoelesiamon/lessy-mpoe-portfolio
