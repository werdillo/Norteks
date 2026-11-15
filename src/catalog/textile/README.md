# catalog/textile

Browses the fabric catalog by type, then by collection. Three components: the types grid (home page and `/textile/`), the page of one type and the page of one collection. The last two are built once per record (`src/pages/textile/[type]/`); the browser loads the record for the address. `/textile/item/` is the fallback for a type or a collection created after the build: it reads `?type=` and `?collection=`.

Door (`index.ts`): `TypesGrid`, `TypeCollections`, `CollectionPage`, `listTypes`, `listCollections` (read at build), `typeHref`, `collectionHref` (the address of a record: its own page when the build made one). `api.ts` (the PocketBase reads), `links.ts`, `route.ts` (what the address asks for) and `services.ts` are used by the scripts.
