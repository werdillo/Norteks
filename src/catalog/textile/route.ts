import { pathParts } from "#/core/dom";

/** Whether the address is the fallback page (/textile/item/), which shows what its query names. */
export const isTextileFallback = (): boolean => pathParts()[1] === "item";

export interface TextileRoute {
  type: string;
  /** Absent on a type's page. */
  collection?: string;
}

/**
 * What the address asks for: /textile/<type>/ or /textile/<type>/<collection>/ on the
 * built pages, or the fallback /textile/item/?type=&collection= (collection optional).
 */
export function textileRoute(): TextileRoute {
  const [section, first, second] = pathParts();
  if (section === "textile" && first === "item") {
    const query = new URLSearchParams(location.search);
    return { type: query.get("type") ?? "", collection: query.get("collection") || undefined };
  }
  return { type: first ?? "", collection: second };
}
