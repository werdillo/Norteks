import { field, firstElement, fromTemplate } from "#/core/dom";

/** The values a browser fills into an image tile cloned from a template. */
export interface TileValues {
  /** Only for a tile that is a link: the template's own link is replaced. */
  href?: string;
  src: string;
  alt: string;
  label: string;
}

/** A new tile from a template that holds an ImageTile (see ImageTile.astro). */
export function tileFrom(template: HTMLTemplateElement, values: TileValues): DocumentFragment {
  const fragment = fromTemplate(template);
  const tile = firstElement(fragment);
  if (values.href !== undefined && tile instanceof HTMLAnchorElement) tile.href = values.href;
  const image = field<HTMLImageElement>(fragment, "image");
  if (values.src) image.src = values.src;
  else image.removeAttribute("src");
  image.alt = values.alt;
  field(fragment, "label").textContent = values.label;
  return fragment;
}
