import { loadBuiltPaths } from "#/core/manifest";
import { RESERVED_SEGMENT } from "#/core/manifest";

/** Address of a type: its own page when the build made one, else the fallback that loads it. */
export async function typeHref(path: string): Promise<string> {
  const built = await loadBuiltPaths();
  return built.types.includes(path) ? `/textile/${path}/` : `/textile/${RESERVED_SEGMENT}/?type=${encodeURIComponent(path)}`;
}

/** Address of a collection: its own page when the build made one, else the fallback. */
export async function collectionHref(type: string, path: string): Promise<string> {
  const built = await loadBuiltPaths();
  const made = built.collections.some((c) => c.type === type && c.path === path);
  return made
    ? `/textile/${type}/${path}/`
    : `/textile/${RESERVED_SEGMENT}/?type=${encodeURIComponent(type)}&collection=${encodeURIComponent(path)}`;
}
