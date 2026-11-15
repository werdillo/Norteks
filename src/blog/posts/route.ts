import { pathParts } from "#/core/dom";

/** The post the address asks for: /post/<path>/, or the fallback /post/item/?post=<path>. */
export function postRoute(): string {
  const [section, first] = pathParts();
  if (section === "post" && first === "item") return new URLSearchParams(location.search).get("post") ?? "";
  return first ?? "";
}
