import { loadBuiltPaths } from "#/core/manifest";
import { RESERVED_SEGMENT } from "#/core/manifest";

/** Address of a post: its own page when the build made one, else the fallback that loads it. */
export async function postHref(path: string): Promise<string> {
  const built = await loadBuiltPaths();
  return built.posts.includes(path) ? `/post/${path}/` : `/post/${RESERVED_SEGMENT}/?post=${encodeURIComponent(path)}`;
}
