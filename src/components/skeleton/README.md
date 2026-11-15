# skeleton

Placeholders for content that is loading. Each one keeps the size of the content it stands for, so the page does not move when the data arrives: a `text` skeleton is a line box of the type around it, a `tile` has the aspect ratio of its picture, a `block` takes its size from `class`. The shimmer is the `.skeleton` class in `app/styles/animations.css`; it stops under `prefers-reduced-motion`. Colours are the `--color-skeleton*` tokens.

The regions that load (see `data-status="loading"` in the boxes) repeat their final grid, columns and counts, and carry a visually hidden "Загрузка…" for screen readers.

Door (`index.ts`): `Skeleton`.
