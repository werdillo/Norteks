# Norteks

Website of Нортекс, a wholesaler of decorative fabrics for furniture and curtains in Moscow. It shows the fabric catalog by type and collection, furniture fittings, fabric care advice, the blog and the company pages. The site is a static build: each page is a file, and the data pages fill themselves from PocketBase in the browser (see "Data" below).

## Tree

```text
src/
  core/                 PocketBase client, image URLs, browser helpers (status, templates, page metadata)
  components/           UI kit with no business subject
    typography/         the nine text styles: H1-H6, P1-P3
    card/               surface with padding, shadow or border
    container/          page column in three widths
    image-tile/         picture with a caption, as a link or a tile
    slider/             hero slider (Swiper web component)
  catalog/              the fabric catalog
    textile/            fabric types and the collections inside them
    furniture/          furniture fittings page
    search/             header search over types and collections
    cleaning/           fabric care advice page
  blog/
    posts/              blog list and single post page
  company/              the company itself
    home/               landing page: hero slider and introduction
    about/              about page
    contacts/           contacts page
    advantages/         advantages list
    shared/             icons used by more than one company box
  app/                  composition root: layout, frame, styles, assets, tests
    frame/              header, footer, mobile menu, their links and social accounts
  pages/                Astro routes, thin: they compose boxes through their doors
    shell/              one page per data route, filled by the browser
```

## Commands

```sh
bun install
cp .env.dist .env          # set PUBLIC_POCKETBASE_URL
bun run dev                # http://localhost:4321
bun run build              # static site in dist/
bun run preview            # serves dist/ with the rules of deploy/nginx.conf, http://localhost:4321
bun run check              # typecheck, lint, tests
```

## Data

PocketBase is read in the browser. A page is a static frame (header, headings, layout, empty states) with one `<template>` per kind of item. Its `<script>` loads the records through the box's `api.ts`, clones the template and fills it with `textContent`, `src` and `href`. The only HTML from PocketBase is set with `innerHTML`: the description of a type and the content of a post, which the editors write as HTML.

- `PUBLIC_POCKETBASE_URL` is read at build time and written into the files, so set it before `bun run build`.
- The browser calls PocketBase directly. Either allow the site's origin in PocketBase's CORS, or proxy `/api/` through nginx on the same host (see `deploy/nginx.conf`) and point `PUBLIC_POCKETBASE_URL` at the site.
- The data shells are `src/pages/shell/textile-type.astro` (`/textile/<type>`), `textile-collection.astro` (`/textile/<type>/<collection>`) and `post.astro` (`/post/<path>`). nginx serves them for every such address, and the URL in the browser does not change.
- Content changes in PocketBase reach the site on the next visit: nothing is rebuilt. Changes to the code or the static copy need `bun run build` and a copy of `dist/`.

## Deploy (VDS)

```sh
bun run build
rsync -a --delete dist/ /var/www/norteks/dist/
sudo nginx -t && sudo nginx -s reload
```

`deploy/nginx.conf` holds the server block: the rewrites of the data routes, the trailing-slash redirect, the `/sitemap.xml` name, long caching of `/_astro/` and short caching of pages, gzip, and an optional `/api/` proxy to PocketBase.

## SEO

Each static page has its own title, description, canonical URL, Open Graph and Twitter card, and the organization JSON-LD. The sitemap (`/sitemap-index.xml`, also at `/sitemap.xml`) lists the static pages; the shells are left out. The data pages set their title, description, canonical, Open Graph and their breadcrumb (and a Product on a collection) once the record is loaded. Known limit by choice: the content of the data pages is not in the HTML a crawler receives without running JavaScript. Until the script runs, a shell's canonical points to its section (`/textile`, `/blog`).

## Stack

- Astro 7.4.12, `output: "static"`, no adapter; `@astrojs/sitemap` 3.7.5
- UnoCSS 66.13.0 with `@unocss/astro` 66.13.0 (`presetWind4`, reset off). Tokens in `src/app/styles/tokens.css`; the text styles in `src/components/typography/typography.css`, exposed as `text-h1` ... `text-p3`
- `pocketbase` 0.29.0 (in the browser), `swiper` 14.4.0 (`swiper/element/bundle`)
- Dev: `@astrojs/check` 0.9.12, `typescript` 6.0.3, `oxlint` 1.93.0, `vitest` 5.1.0, `@types/node` 24
- Node 22.23.4 or newer is required by Astro 7.

Deviations from the latest-everything baseline, and why:

- No Solid: the two islands (search, hero slider) are plain Astro components with a small script each. `@astrojs/solid-js`, `solid-js` and `eslint-plugin-solid` are removed.
- No Vercel adapter: the site is static and runs on the VDS behind nginx.
- TypeScript 6.0.3 instead of 7.0.2: `@astrojs/check` 0.9.12 supports only TypeScript 5 and 6.
- Breakpoints are generated by a small variant in `uno.config.ts`: UnoCSS's own `max-*` stops 0.1px short, and the site's `max-width` rules are inclusive.
- The type matrix is nine styles (H1-H6, P1-P3). Two exceptions, the hero title and the image tile caption, are listed in `src/components/typography/README.md` and in `src/app/tests/typography.test.ts`, which fails on any other raw font size, weight or line height.
- The data shells live under `src/pages/shell/`, not `_`-prefixed files: Astro does not build files whose names start with `_`.
- No `features/` layer: the site has no i18n and no analytics.
- `@types/node` added: the layer test and the vitest config use `node:` modules.
- `@astrojs/sitemap` replaces `public/sitemap.xml`; `robots.txt` no longer disallows `/_astro/`, because the browser needs the bundles.
- Not added: `astro-compress`, `astro-relative-links`, `@tabler/icons`, `zod`, `class-variance-authority`, `clsx`. The site imports none of them.
- `tsconfig.json` extends `astro/tsconfigs/strict`.

Architecture: ../docs_web/README.md
