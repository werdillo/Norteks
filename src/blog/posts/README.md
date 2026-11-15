# blog/posts

Lists the blog posts (`BlogList`, a static page) and shows one post (`PostPage`), built once per post under `src/pages/post/[post].astro`. `/post/item/?post=` is the fallback for a post created after the build. The browser reads PocketBase through `api.ts`.

Door (`index.ts`): `BlogList`, `PostPage`, `listBlogPosts` (read at build), `postHref`.
