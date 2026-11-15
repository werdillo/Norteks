# Norteks

Website of Нортекс, a wholesaler of decorative fabrics for furniture and curtains in Moscow. It shows the fabric catalog by type and collection, furniture fittings, fabric care advice, the blog and the company pages. Content is read from PocketBase on each request; the site is server-rendered on Vercel, with two Solid islands (the header search and the home slider).

## Tree

```text
src/
  core/                 PocketBase client and image URL helpers
  components/           UI kit with no business subject
    slider/             swiper slider that shows the slides it is given
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
  pages/                Astro routes, thin: they compose boxes through their doors
```

## Commands

```sh
bun install
bun run dev        # http://localhost:4321
bun run build
bun run check      # typecheck, lint, tests
```

Copy `.env.dist` to `.env` and set `PUBLIC_POCKETBASE_URL` before running the site.

## Stack

- Astro 7.4.12 with `@astrojs/vercel` 11.0.22 (`output: "server"`), `@astrojs/solid-js` 7.1.6 with `solid-js` 1.9.19 (Solid 1, not 2)
- `pocketbase` 0.29.0, `swiper` 14.4.0
- Dev: `@astrojs/check` 0.9.12, `typescript` 6.0.3, `oxlint` 1.93.0 with `eslint-plugin-solid` 0.19.0, `vitest` 5.1.0, `@types/node` 24
- Node 22.23.4 or newer is required by Astro 7; the Vercel adapter runs functions on Node 24.

Deviations from the latest-everything baseline, and why:

- TypeScript 6.0.3 instead of 7.0.2: `@astrojs/check` 0.9.12 supports only TypeScript 5 and 6.
- No UnoCSS layer: the site has no utility-class framework, so there was nothing to replace.
- No `features/` layer: the site has no i18n and no analytics.
- `@types/node` added: the layer test and the vitest config use `node:` modules.
- Removed `@astrojs/node`, `vite`, `terser` and the `start:server` script: nothing used them, and the Vercel adapter does not produce `dist/server/entry.mjs`.
- Not added: `@astrojs/sitemap`, `astro-compress`, `astro-relative-links`, `@tabler/icons`, `zod`, `class-variance-authority`, `clsx`. The site imports none of them; `public/sitemap.xml` is static.
- `tsconfig.json` extends `astro/tsconfigs/strict`.

Architecture: ../docs_web/README.md
