# app

The composition root: the base layout, the page frame (header, footer, mobile menu), the global styles, the page shells and the layer tests.

- `layout/BaseLayout.astro`: the HTML document every page is rendered in: the head (title, description, canonical, Open Graph, Twitter, the organization JSON-LD) and the frame.
- `frame/`: `Header.astro` with `header/` parts, `Footer.astro` with `footer/` parts, `MobileMenu.astro`; `navigation.ts` and `social.ts` hold the links they render.
- `styles/`: `tokens.css` (colours, shape and layout tokens), `main.css` (the element rules: links, `[hidden]`).
- `tests/`: `boundaries.test.ts` (the layers and the doors) and `typography.test.ts` (no raw font size, weight or line height outside the type matrix, with its listed exceptions).

Pages in `src/pages/` are thin; the data shells live in `src/pages/shell/`.
