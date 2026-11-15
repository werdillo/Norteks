import { pathParts } from "#/core/dom";
import { RESERVED_SEGMENT } from "#/core/manifest";

/** The post the address asks for: /post/<path>/, or the fallback /post/item/?post=<path>. */
export function postRoute(): string {
  const [section, first] = pathParts();
  if (section === "post" && first === RESERVED_SEGMENT) return new URLSearchParams(location.search).get("post") ?? "";
  return first ?? "";
}
