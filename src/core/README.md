# core

No subject: the PocketBase client and the image URL helpers every box uses, and the browser helpers the pages share. Logic only, no markup.

Modules:

- `pocketbase.ts`: `client`, `url`, `fileUrl`, `getImageUrl`, `isNotFound`.
- `dom.ts`: `setStatus` (loading, ready, empty, error states of a box), `pathParts`, `fromTemplate`, `field`, `firstElement`.
- `seo.ts`: `setPageMeta`, `setJsonLd`, `setBreadcrumb`, for the metadata of pages filled in the browser.
