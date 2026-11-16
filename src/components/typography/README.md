# typography

The text styles of the site: the matrix of nine, `H1`-`H6` and `P1`-`P3`. Each style is one set of variables (size, weight, line height, family) in `typography.css`; each has a component, and the same style is an UnoCSS shortcut (`text-h1`, `text-p2`, ...). Every text on the site goes through one of them: a component, a `.text-<s>` class, or the bare element default (`h1`-`h6` have one; paragraphs do not, so a `<p>` inside CMS HTML keeps its wrapper's size). A screen sets no font size, weight or line height itself.

- Headings, bold: `H1` 48px (40px up to 768px), `H2` 42px (36px up to 1024px), `H3` 32px, `H4` 28px (24px up to 768px), `H5` 22px (20px up to 768px), `H6` 18px (16px up to 768px).
- Paragraphs, regular: `P1` 18px (16px up to 768px), `P2` 16px, `P3` 14px.

`as` sets the tag when the look and the meaning differ (`<H4 as="h1">`). The guard test `src/app/tests/typography.test.ts` fails on any raw font size, weight or line height outside this box, except the exceptions below.

## Exceptions

Text outside the matrix, each one listed in `src/app/tests/typography.test.ts` with the same reason:

- Hero slide title (`src/components/slider/Slider.astro`): 80px, 40px up to 768px, regular weight. A display size used once per page on the home slider; no other text is this large.
- Fabric type description (`src/site/catalog/ui/TypeCollections.astro`): 24px from 1024px, P1 below. The lead of a type page, larger than body text on a wide screen.
- Image tile caption (`src/components/image-tile/ImageTile.astro`): 36px, 16px up to 550px, regular weight. A caption laid over a picture at the size the tiles were designed for; it cannot take a bold heading style without covering the picture.
