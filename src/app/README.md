# app

The composition root: the base layout, the page frame (header, footer, mobile menu), the global styles and assets, and the layer tests.

- `layout/BaseLayout.astro`: the HTML document every page is rendered in.
- `frame/`: `Header.astro`, `Footer.astro`, `MobileMenu.astro`.
- `styles/`: `tokens.css` (custom properties), `main.css` (global styles).
- `assets/`: the logo and the global icons.
- `tests/`: `boundaries.test.ts`, which checks the layers and the doors.
