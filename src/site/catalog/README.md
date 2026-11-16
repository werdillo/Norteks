# catalog

Browses the fabric catalog: the types (categories), the collections inside them, and the header search
over both. The record pages are made once per record at build; the browser loads the record for the
address. `/textile/item/` is the fallback for a type or a collection created after the build.

Slices:

- `api/` — `records.ts` reads categories and collections; `search.ts` finds them by name.
- `ui/` — `TypesGrid`, `TypeCollections`, `CollectionPage`, `Search`.
- `services.ts` — the pictures and the specification rows of a collection.
- `links.ts` — the address of a type or a collection, its own page or the fallback.
- `route.ts` — what the address asks for.
- `types.ts` — a search hit.

Door (`index.ts`): `TypesGrid`, `TypeCollections`, `CollectionPage`, `Search`, `listTypes`,
`listCollections` (read at build), `headerNav`, `mobileNav`.
