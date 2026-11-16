# blog

The blog: the post list and one post page. Both are rendered at build with the PocketBase content, so the
HTML a crawler receives already holds the posts, and the browser refreshes them from PocketBase on each visit.
A post is built once per record under `src/pages/post/[post].astro`; `/post/item/?post=` is the fallback for a
post created after the build, and it is filled in the browser only.

Slices:

- `ui/` — `BlogList`, `PostPage`. Each takes the build's data as an optional prop; without it the page is
  filled in the browser (the fallback).
- `api.ts` — the PocketBase reads: the browser's list and post, and the build's list and post record. Lists are
  read `PAGE_SIZE` posts per request: PocketBase loads whole rows, rich text included, so a request never
  loads more than four. The blog page shows the first four and a «Показать ещё» button for the next ones.
- `content.ts` — `postContent`, the post's HTML as the page shows it: images load lazily, an empty alt gets the title.
- `seo.ts` — the meta description of a post and its Article JSON-LD.
- `links.ts` — the address of a post, its own page or the fallback.
- `route.ts` — what the address asks for.

Door (`index.ts`): `BlogList`, `PostPage`, `getBlogPostsPage` and `listBlogPosts` (read at build), `getPostForBuild`,
`postDescription`, `isoDate`, `BlogPost` (type), `headerNav`, `mobileNav`.

## Images in a post

The images of a post are files of its `content_images` field, linked from `content` by URL; the editor field
`content` takes at most 300 KB, so a pasted (base64) image is refused when the post is saved. To add one: upload
it to `content_images`, save, then in `content` use the editor's image button and pick it from the record's files.
