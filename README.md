# Norteks

Website of Нортекс, a wholesaler of decorative fabrics for furniture and curtains in Moscow. It shows the fabric catalog by type and collection, furniture fittings, fabric care advice, the blog and the company pages.

The site is a set of static files. Every page is a directory with an `index.html`, so a stock web server serves it with `root` and `index index.html` and nothing else. Records from PocketBase are read in the browser; the build also makes a page for every record it sees.

## Tree

```text
src/
  core/                 PocketBase client, image URLs, browser helpers (status, templates, page metadata, manifest)
  components/           UI kit with no business subject
    typography/         the nine text styles: H1-H6, P1-P3
    skeleton/           placeholders that keep the size of loading content
    card/               surface with padding, shadow or border
    container/          page column in three widths
    image-tile/         picture with a caption, as a link or a tile
    slider/             hero slider (Swiper web component)
  catalog/              the fabric catalog
    textile/            fabric types and the collections inside them; links, route and build-time lists
    furniture/          furniture fittings page
    search/             header search over types and collections
    cleaning/           fabric care advice page
  blog/
    posts/              blog list and single post page; links, route and build-time list
  company/              the company itself
    home/               landing page: hero slider and introduction
    about/              about page
    contacts/           contacts page
    advantages/         advantages list
    shared/             icons used by more than one company box
  app/                  composition root: layout, frame, styles, assets, tests, the list of built record pages
  pages/                Astro routes, thin: they compose boxes through their doors
    textile/[type]/     one page per type, and one per collection under it (built from PocketBase)
    textile/item/       fallback for a type or collection created after the build
    post/[post].astro   one page per post (built from PocketBase)
    post/item/          fallback for a post created after the build
    paths.json.ts       the list of built record pages, read by the browser to choose links
```

## Commands

```sh
bun install
cp .env.dist .env          # set PUBLIC_POCKETBASE_URL
bun run dev                # http://localhost:4321
bun run build              # static site in dist/
bun run preview            # serves dist/ like a stock web server, http://localhost:4321
bun run check              # typecheck, lint, tests
```

## Addresses

| Address | What it is |
| --- | --- |
| `/`, `/textile/`, `/furniture/`, `/blog/`, `/cleaning/`, `/about-us/`, `/contacts/` | static pages |
| `/textile/<type>/` | a type and its collections, one page per type at build |
| `/textile/<type>/<collection>/` | a collection, one page per collection at build |
| `/post/<post>/` | a post, one page per post at build |
| `/textile/item/?type=<type>[&collection=<collection>]` | fallback for a type or collection made after the build (`noindex`, canonical to its own address) |
| `/post/item/?post=<post>` | fallback for a post made after the build (`noindex`) |
| `/paths.json` | the built record pages, used by the browser to choose the links |
| `/sitemap.xml` | the sitemap (also `/sitemap-index.xml`) |

Every address ends with a slash. A stock server redirects `/about-us` to `/about-us/`; the links and canonicals already use the slash form, so no page links through that redirect.

## Data

PocketBase is read in two places:

- At build, `getStaticPaths` lists the types, collections and posts (`src/app/paths.ts`). Each listed record gets its page, with a title and description from its name at build. If PocketBase cannot be reached, or `PUBLIC_POCKETBASE_URL` is not set, the build fails. A record whose path is `item` also fails the build: that path belongs to the fallback pages.
- In the browser, each page loads its record and its lists through the box's `api.ts`, clones a `<template>` and fills it with `textContent`, `src` and `href`. Until the data arrives the page shows skeletons that keep the final layout. The only HTML from PocketBase is set with `innerHTML`: a type's description and a post's content, which the editors write as HTML.

Links: the browser reads `/paths.json`. A record that the build saw links to its own page; a record created after the build links to the fallback page, which loads it. Nothing needs rebuilding for the fallback to work; a new build (`bun run build`) adds the new record's own page and the links change with it.

- `PUBLIC_POCKETBASE_URL` is read at build time and written into the files. Set it before `bun run build`, and set it to an address the visitors' browsers can reach.
- The browser calls PocketBase directly. Allow the site's origin in PocketBase's CORS, or serve PocketBase under the site's own domain. Then `PUBLIC_POCKETBASE_URL` is the site's address.
- A record created after the last build opens through the fallback, and its page is only found by its fallback address or by the search and the lists. An old address to a record that did not exist at build (`/textile/<type>/<new>/`) answers 404: a stock server cannot serve the fallback for it.
- Content changes in PocketBase reach the visitors on the next visit, without a build.

## Deploy

```sh
bun run build
rsync -a --delete dist/ /var/www/norteks/dist/
```

That is all. The server needs a root at `dist/`, `index index.html`, and nothing else. `deploy/nginx.conf` is an optional tuning (compression, cache headers) for nginx; the site works without it.

`bun run preview` serves `dist/` the same way (`deploy/serve-dist.mjs`) for a local check.

## SEO

Each static page has its own title, description, canonical URL, Open Graph and Twitter card, and the organization JSON-LD. The record pages get their title and description at build from the record's name, and the browser refreshes them with the loaded record. Once the record is loaded, the browser also sets the canonical, Open Graph, the breadcrumb (and a Product on a collection). The sitemap (`/sitemap.xml`) lists the static pages and every built record page; the fallback pages are left out. `robots.txt` points to it.

Known limit, by choice: the content of a record is not in the HTML a crawler receives without running JavaScript, and a record created after the build is only reachable through its fallback page until the next build.

## Stack

- Astro 7.4.12, `output: "static"`, `trailingSlash: "always"`, no adapter; `@astrojs/sitemap` 3.7.5
- UnoCSS 66.13.0 with `@unocss/astro` 66.13.0 (`presetWind4`, reset off). Tokens in `src/app/styles/tokens.css`; the text styles in `src/components/typography/typography.css`, exposed as `text-h1` ... `text-p3`; the shimmer in `src/app/styles/animations.css`
- `pocketbase` 0.29.0 (at build and in the browser), `swiper` 14.4.0 (`swiper/element/bundle`)
- Dev: `@astrojs/check` 0.9.12, `typescript` 6.0.3, `oxlint` 1.93.0, `vitest` 5.1.0, `@types/node` 24
- Node 22.23.4 or newer is required by Astro 7.

Deviations from the latest-everything baseline, and why:

- No Solid: the two islands (search, hero slider) are plain Astro components with a small script each. `@astrojs/solid-js`, `solid-js` and `eslint-plugin-solid` are removed.
- No Vercel adapter: the site is static and works on a stock web server.
- TypeScript 6.0.3 instead of 7.0.2: `@astrojs/check` 0.9.12 supports only TypeScript 5 and 6.
- Breakpoints are generated by a small variant in `uno.config.ts`: UnoCSS's own `max-*` stops 0.1px short, and the site's `max-width` rules are inclusive.
- The type matrix is nine styles (H1-H6, P1-P3). Two exceptions, the hero title and the image tile caption, are listed in `src/components/typography/README.md` and in `src/app/tests/typography.test.ts`, which fails on any other raw font size, weight or line height.
- The fallback pages are `…/item/` and not `_`-prefixed: Astro does not build files whose names start with `_`. A record may not use the path `item`; the build checks it.
- The browser's PocketBase client has auto-cancellation off: the pages make parallel requests on purpose.
- No `features/` layer: the site has no i18n and no analytics.
- `@types/node` added: the layer test and the vitest config use `node:` modules.
- `@astrojs/sitemap` replaces the hand-written sitemap; `/sitemap.xml` is a copy of its URL list; `robots.txt` no longer disallows `/_astro/`, because the browser needs the bundles.
- Not added: `astro-compress`, `astro-relative-links`, `@tabler/icons`, `zod`, `class-variance-authority`, `clsx`. The site imports none of them.
- `tsconfig.json` extends `astro/tsconfigs/strict`.

Architecture: ../docs_web/README.md
