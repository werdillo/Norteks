import { builtPaths } from "#/app/paths";

// The manifest of the record pages the build made. The browser reads it to choose a
// record's own address, or the fallback address when the record came after the build.
export async function GET() {
  const { types, collections, posts } = await builtPaths();
  const body = {
    types: types.map((t) => t.path),
    collections: collections.map((c) => ({ type: c.type, path: c.path })),
    posts: posts.map((p) => p.path),
  };
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json; charset=utf-8" } });
}
