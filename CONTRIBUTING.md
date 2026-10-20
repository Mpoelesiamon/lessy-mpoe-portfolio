# How changes get to production

The site is static: no build step. `dist/` is exactly what gets served at https://lesiamon.com.
Vercel deploys it. `main` is production. Everything else is a branch.

```
branch ─▶ edit ─▶ npm run check ─▶ commit (hook runs checks) ─▶ push ─▶ pull request
   ─▶ CI (lint, tests, browsers, Lighthouse) + Vercel preview ─▶ review ─▶ merge to main
   ─▶ Vercel deploys production ─▶ "Verify production" workflow checks the live site
```

## One-time setup
```bash
npm install                 # also turns on the pre-commit hook
npx playwright install chromium
```

## Everyday commands
| Command | What it does |
| --- | --- |
| `npm run dev` | Serve the site at http://127.0.0.1:4173 with the same security headers as production |
| `npm run check` | HTML lint + content tests + size budget (seconds). The pre-commit hook runs this |
| `npm run test:e2e` | Real-browser tests on desktop and phone, plus accessibility (axe) in light and dark |
| `npm test` | Everything above |
| `npm run capture` | Re-capture project cover screenshots from the live sites (then `npm run covers`) |
| `npm run covers` | Write each project's cover path into `dist/projects.js` |
| `npm run socials` | Rebuild `dist/socials.js` from `scripts/build-socials.mjs` |
| `npm run images` | Regenerate the share card (`og-image.jpg`) and the whole icon set (favicon, `.ico`, app icons) |
| `npm run links` | Check every external link on the site (also runs weekly in GitHub Actions) |

## Addresses and fallbacks
- Unknown addresses get `dist/404.html`, which suggests close matches (see `dist/404.js`).
- Short addresses and social shortcuts live in `vercel.json` under `redirects`. A test checks they land somewhere real.
- `#project=<id>` opens a project's case notes, so any project can be linked to directly.

## Branch names
`fix/short-name` for something broken, `feat/short-name` for something new, `content/short-name` for words or images, `chore/short-name` for tooling.

## Fixing a bug
1. `git switch -c fix/what-is-wrong`
2. Write or extend a test that fails because of the bug (`tests/e2e` for what a visitor sees, `tests/unit` for data and content).
3. Fix it. `npm run check` and `npm run test:e2e` pass.
4. Commit, push, open a pull request using the template.

## Adding a feature or changing content
- **A project:** add it to `dist/projects.js`. If it has a live site, add it to `scripts/capture-work.mjs`, run `npm run capture -- <id>` then `npm run covers`.
- **A social link:** edit `scripts/build-socials.mjs`, run `npm run socials`.
- **Copy or layout:** edit `dist/index.html`, `dist/styles.css`, `dist/app.js`.
- Keep the footer credit exactly as it is (`Build by; prospergenics.com`). A test guards it.

## What CI checks on every pull request
1. **Lint, content tests, size budget.** Valid HTML, every project well-formed, every image present and under budget, no unused files.
2. **Browsers.** Desktop and phone: intro, filters, case notes, command menu, theme, copy buttons, social links, no horizontal scroll, all images load.
3. **Accessibility.** WCAG 2 A and AA with axe, light and dark theme.
4. **Lighthouse.** Performance 85+, accessibility 95+, best practices 90+.

Vercel also builds a **preview URL** for each pull request. Open it on your phone before merging.

## Deploying
Merge the pull request into `main` (squash merge). Vercel deploys to production in about a minute.
The **Verify production** workflow then waits two minutes and checks the live site: home page, `security.txt`, `robots.txt`, share image, security headers and the 404 page.

## Rolling back
- Fastest: Vercel dashboard, Deployments, pick the last good one, **Promote to Production**. No code change needed.
- Then: `git revert <merge-commit>` on a branch and open a pull request, so `main` matches what is live.

## Settings to turn on in GitHub (one time)
Settings, Branches, add a rule for `main`: require a pull request, require the **CI** checks to pass, block force pushes.
