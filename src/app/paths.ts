import { listBlogPosts } from "#/site/blog";
import { listCollections, listTypes } from "#/site/catalog";
import { RESERVED_SEGMENT } from "#/core/manifest";

/**
 * The record pages the build makes: one per type, collection and post PocketBase
 * holds at build time. The browser still loads the record itself, so the list only
 * names the pages. A failing PocketBase fails the build.
 */
export interface BuiltType {
  path: string;
  name: string;
  description: string;
}

export interface BuiltCollection extends BuiltType {
  /** The path of the type the collection belongs to. */
  type: string;
}

export interface BuiltPost {
  path: string;
  title: string;
  description: string;
}

export interface BuiltPages {
  types: BuiltType[];
  collections: BuiltCollection[];
  posts: BuiltPost[];
}

let cache: Promise<BuiltPages> | undefined;

/** Read once per build. */
export function builtPaths(): Promise<BuiltPages> {
  cache ??= read();
  return cache;
}

async function read(): Promise<BuiltPages> {
  if (!import.meta.env.PUBLIC_POCKETBASE_URL) {
    throw new Error("PUBLIC_POCKETBASE_URL is not set: the build reads the record pages from PocketBase.");
  }
  const [types, collections, posts] = await Promise.all([listTypes(), listCollections(), listBlogPosts()]);
  const paths = [...types, ...collections, ...posts].map((record) => record.path);
  if (paths.includes(RESERVED_SEGMENT)) {
    throw new Error(`A record uses the reserved path "${RESERVED_SEGMENT}": rename it in PocketBase.`);
  }
  for (const [what, list] of [
    ["types", types],
    ["collections", collections],
    ["posts", posts],
  ] as const) {
    if (list.length === 0) console.warn(`PocketBase returned no ${what} at build: their pages are not made, the fallback serves them.`);
  }
  return { types, collections, posts };
}
