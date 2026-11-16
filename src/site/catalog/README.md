# catalog

Browses the fabric catalog: the types (categories), the collections inside them, and the header search
over both. Each type and each collection has its own page, and the content is in its HTML: the build
reads the record and writes it into the page, and the browser refreshes it from PocketBase after load.
`/textile/item/` is the fallback for a type or a collection created after the build; it has no build-time
record, so the browser fills it alone.

Slices:

- `api/` — `records.ts` reads categories and collections (build time and browser); `search.ts` finds them by name.
- `ui/` — `TypesGrid`, `TypeCollections`, `CollectionPage`, `Search`. With a build-time record the markup is
  rendered server-side, the same as the browser fills it; without one (the fallback) the browser fills it.
- `services.ts` — the pictures and the specification rows of a collection.
- `seo.ts` — the meta description of a type or a collection (the record's own text, or a fallback sentence
  when it is shorter than 50 characters; at most 160 characters), and the breadcrumb trail.
- `links.ts` — the address of a type or a collection, its own page or the fallback.
- `route.ts` — what the address asks for.
- `types.ts` — a search hit, and a type read at build.

Door (`index.ts`): `TypesGrid`, `TypeCollections`, `CollectionPage`, `Search`, `listTypes`,
`listCollections` (read at build), `getTypes`, `getTypeWithCollections`, `getCollectionOf` (read at build,
for the record pages), `categoryOf`, `typeDescription`, `collectionDescription`, `TypeRecord`, `headerNav`,
`mobileNav`.

Build and browser stay the same in what they show: a built page is refreshed by the script, and when the
refresh fails the built content stays (`data-prerendered` on the root marks it). The `ld+json` blocks
(breadcrumb, and Product on a collection) are written in the HTML too; the browser updates them in place.
