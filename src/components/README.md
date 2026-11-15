# components

The UI kit: presentational components that know no business subject. They take values and slots as props. One folder per component, with an `index.ts` door. Styles are utilities on the markup (see `uno.config.ts`).

Boxes:

- `card/`: a surface with padding and a shadow (`raised`, `panel`) or a bordered tile (`outlined`).
- `container/`: the page column, in three widths, with its bottom padding optional.
- `image-tile/`: a picture with a caption over its lower part, as a link or a plain tile.
- `slider/`: the swiper slider. It takes its slides as data.
- `title/`: a bold title in three sizes.
