# core

No subject: the PocketBase client and the image URL helpers every box uses, and the browser helpers the
pages share. Logic only, no markup.

Modules:

- `pocketbase.ts`: `client`, `url`, `fileUrl`, `getImageUrl`, `isNotFound`.
- `dom.ts`: `setStatus` (loading, ready, empty, error states of a box), `pathParts`, `fromTemplate`,
  `field`, `retag`, `firstElement`.
- `manifest.ts`: `RESERVED_SEGMENT` and `loadBuiltPaths`, the list of record pages the build made, read by
  the boxes that choose a record's address.
- `nav.ts`: `NavItem`, `MobileNavItem` and `isCurrent`, the shape each box declares its menu entry in.
- `seo/`: `browser.ts` — `setPageMeta`, `setJsonLd`, `setBreadcrumb`, for the metadata the browser refreshes; `jsonld.ts` — `jsonLd`, `breadcrumbLd`, `productLd`, `articleLd`, the schema.org a page carries in its built HTML; `robots.ts` — `robotsTxt`, the text of robots.txt (the route is `src/pages/robots.txt.ts`); `sitemap.ts` — `sitemapAlias`, the integration that copies the sitemap to `/sitemap.xml`, and `sitemapExclude`, the page filter for `@astrojs/sitemap`, both used by `astro.config.mjs`. `robots.ts` has its test in `seo/tests/`.
