# blog

The blog: the post list and one post page. Both are filled in the browser. A post is built once per record
under `src/pages/post/[post].astro`; `/post/item/?post=` is the fallback for a post created after the build.

Slices:

- `ui/` — `BlogList`, `PostPage`.
- `api.ts` — the PocketBase reads, including the build-time list.
- `links.ts` — the address of a post, its own page or the fallback.
- `route.ts` — what the address asks for.

Door (`index.ts`): `BlogList`, `PostPage`, `listBlogPosts` (read at build), `postHref`.
