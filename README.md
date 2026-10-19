# Lessy — Portfolio

A buildless portfolio for Finehas Lesiamon Mpoe, with featured projects, searchable project notes, a learning archive, light and dark themes, and direct email contact.

## Edit

- `dist/index.html`: page content and featured project covers.
- `dist/styles.css`: responsive layout, typography, and colours.
- `dist/projects.js`: project catalogue and links.
- `dist/app.js`: filtering, search, project dialogs, and email copying.
- `dist/theme-init.js`, `dist/theme.js`, and `dist/themes.css`: system theme detection, appearance toggle, and saved preference.
- `dist/assets/`: project imagery and favicon.

## Preview

Run `python3 -m http.server 4173 --directory dist` from this directory, then open http://localhost:4173.

## Hosting

The `vercel.json` file configures Vercel to serve the `dist` directory without an installation or build step. Production: https://lesiamon.com

Repository: https://github.com/Mpoelesiamon/lessy-mpoe-portfolio

The `main` branch is connected to the existing Vercel project for automatic production deployments. Push changes to main to publish an update. The site can also be served by any static web host using `dist`.

## Content

Descriptions were assembled from the existing portfolio, project documentation, and public GitHub repositories. Collaborative work is labelled separately. Project imagery comes from the corresponding local project assets. No internal source files or business records are included.

The contact link opens the visitor's email app. The copy button uses the browser clipboard with a visible fallback. There is no unconnected contact form.

The hero portrait uses responsive 640px and 1050px WebP files without EXIF metadata. Prospergenics uses its original green logo in light mode and white logo in dark mode.
