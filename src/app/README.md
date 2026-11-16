# app

The composition root: the base layout, the page frame (header, footer, mobile menu), the global styles, and the list of record pages the build makes.

- `layout/BaseLayout.astro`: the HTML document every page is rendered in: the head (title, description, canonical, robots, Open Graph, Twitter, the organization JSON-LD) and the frame.
- `frame/`: `Header.astro` with `header/` parts, `Footer.astro` with `footer/` parts, `MobileMenu.astro`;
  each box declares its own menu entry and the frame only lists the entries in `navigation.ts`;
  `social.ts` holds the social links.
- `styles/`: `tokens.css` (colours, shape and layout tokens), `main.css` (the element rules: links, `[hidden]`), `animations.css` (the skeleton shimmer, off under reduced motion).
- `paths.ts`: `builtPaths()`, the types, collections and posts PocketBase holds at build. Used by the `getStaticPaths` of the record pages and by `src/pages/paths.json.ts`.
The structure test is `src/tests/boundaries.test.ts` (the layers and the doors); the type test sits with
its box in `src/components/typography/tests/typography.test.ts`.

Pages in `src/pages/` are thin.
