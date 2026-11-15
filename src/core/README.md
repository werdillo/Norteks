# core

No subject: the PocketBase client and the image URL helpers every box uses, and the browser helpers the
pages share. Logic only, no markup.

Modules:

- `pocketbase.ts`: `client`, `url`, `fileUrl`, `getImageUrl`, `isNotFound`.
- `dom.ts`: `setStatus` (loading, ready, empty, error states of a box), `pathParts`, `fromTemplate`,
  `field`, `retag`, `firstElement`.
- `manifest.ts`: `RESERVED_SEGMENT` and `loadBuiltPaths`, the list of record pages the build made, read by
  the boxes that choose a record's address.
- `seo.ts`: `setPageMeta`, `setJsonLd`, `setBreadcrumb`, for the metadata of pages filled in the browser.
