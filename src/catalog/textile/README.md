# catalog/textile

Browses the fabric catalog by type, then by collection. Three components: the types grid (home page and `/textile`), the page of one type and the page of one collection. The last two are shells: `src/pages/shell/` serves them for every address under `/textile/`, and the browser reads the type or the collection from the address.

Door (`index.ts`): `TypesGrid`, `TypeCollections`, `CollectionPage`. `api.ts` (`getTypes`, `getTypeWithCollections`, `getCollection`) and `services.ts` (the colour pictures and the specs of a collection) are used by the scripts.
