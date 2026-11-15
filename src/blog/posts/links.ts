import { loadBuiltPaths } from "#/core/manifest";

/** Address of a post: its own page when the build made one, else the fallback that loads it. */
export async function postHref(path: string): Promise<string> {
  const built = await loadBuiltPaths();
  return built.posts.includes(path) ? `/post/${path}/` : `/post/item/?post=${encodeURIComponent(path)}`;
}
