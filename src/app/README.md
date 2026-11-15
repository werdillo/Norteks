# app

The composition root: the base layout, the page frame (header, footer, mobile menu), the global styles and assets, and the layer tests.

- `layout/BaseLayout.astro`: the HTML document every page is rendered in.
- `frame/`: `Header.astro` with `header/` parts, `Footer.astro` with `footer/` parts, `MobileMenu.astro`; `navigation.ts` and `social.ts` hold the links they render.
- `styles/`: `tokens.css` (the design tokens as custom properties), `main.css` (the global element reset).
- `assets/`: the logo and the global icons.
- `tests/`: `boundaries.test.ts`, which checks the layers and the doors.
