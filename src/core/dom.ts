/**
 * Helpers for the browser side of the pages. The static HTML carries the frame and
 * one `<template>` per kind of item; a script clones the template and fills it.
 */

/** The states a data box shows: each is an element with `data-status` in the box. The loading one is a skeleton that keeps the final layout. */
export type Status = "loading" | "ready" | "empty" | "error";

/** Shows the element of `status` inside `root`, hides the other states and marks the region busy while loading. */
export function setStatus(root: Element, status: Status): void {
  root.setAttribute("aria-busy", String(status === "loading"));
  root.querySelectorAll<HTMLElement>("[data-status]").forEach((element) => {
    element.hidden = element.dataset.status !== status;
  });
}

/** The path of the page split into its parts: `/textile/velyur` gives `["textile", "velyur"]`. */
export const pathParts = (): string[] =>
  location.pathname
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));

/** A new copy of a template's content, ready to fill. */
export const fromTemplate = (template: HTMLTemplateElement): DocumentFragment =>
  template.content.cloneNode(true) as DocumentFragment;

/** The element marked `data-field="name"` inside `root`. */
export function field<T extends HTMLElement = HTMLElement>(root: ParentNode, name: string): T {
  const element = root.querySelector<T>(`[data-field="${name}"]`);
  if (!element) throw new Error(`No field "${name}" in the template`);
  return element;
}

/** Replaces an element by one of another tag with the same attributes and content: a heading's level, not its look. */
export function retag<T extends Element = HTMLElement>(element: Element, tag: string): T {
  const next = document.createElement(tag);
  for (const { name, value } of Array.from(element.attributes)) next.setAttribute(name, value);
  next.append(...Array.from(element.childNodes));
  element.replaceWith(next);
  return next as unknown as T;
}

/** The first element of a fragment that was cloned from a template. */
export const firstElement = <T extends Element = HTMLElement>(fragment: DocumentFragment): T =>
  fragment.firstElementChild as T;
