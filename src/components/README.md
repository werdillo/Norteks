# components

The UI kit: presentational components that know no business subject. They take values and slots as props. One folder per component, with an `index.ts` door. Styles are utilities on the markup (see `uno.config.ts`), and text is set by the `typography` components.

Boxes:

- `typography/`: the text styles (headings, paragraphs, tile captions), one component per style.
- `card/`: a surface with padding and a shadow (`raised`, `panel`) or a bordered tile (`outlined`).
- `container/`: the page column, in three widths, with its bottom padding optional.
- `image-tile/`: a picture with a caption over its lower part, as a link or a plain tile; `tileFrom` fills a template of one.
- `skeleton/`: placeholders for loading content, sized like the content they stand for.
- `slider/`: the hero slider (Swiper web component). It takes its slides as data.
