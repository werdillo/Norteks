/** The record pages the build made, from /paths.json (see src/pages/paths.json.ts). */
export interface BuiltPaths {
  types: string[];
  collections: { type: string; path: string }[];
  posts: string[];
}

const NONE: BuiltPaths = { types: [], collections: [], posts: [] };

let cache: Promise<BuiltPaths> | undefined;

/** Read once per page. Without the manifest every record links to its fallback address. */
export function loadBuiltPaths(): Promise<BuiltPaths> {
  cache ??= fetch("/paths.json", { cache: "no-cache" })
    .then((response) => (response.ok ? (response.json() as Promise<BuiltPaths>) : NONE))
    .catch(() => NONE);
  return cache;
}
