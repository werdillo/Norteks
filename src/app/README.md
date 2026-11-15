# app

The composition root: the base layout, the page frame (header, footer, mobile menu), the global styles, the list of record pages the build makes, and the layer tests.

- `layout/BaseLayout.astro`: the HTML document every page is rendered in: the head (title, description, canonical, robots, Open Graph, Twitter, the organization JSON-LD) and the frame.
- `frame/`: `Header.astro` with `header/` parts, `Footer.astro` with `footer/` parts, `MobileMenu.astro`; `navigation.ts` and `social.ts` hold the links they render.
- `styles/`: `tokens.css` (colours, shape and layout tokens), `main.css` (the element rules: links, `[hidden]`), `animations.css` (the skeleton shimmer, off under reduced motion).
- `paths.ts`: `builtPaths()`, the types, collections and posts PocketBase holds at build. Used by the `getStaticPaths` of the record pages and by `src/pages/paths.json.ts`.
- `tests/`: `boundaries.test.ts` (the layers and the doors) and `typography.test.ts` (no raw font size, weight or line height outside the type matrix, with its listed exceptions).

Pages in `src/pages/` are thin.
