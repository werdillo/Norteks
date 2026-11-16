import { client } from "#/core/pocketbase";

/** All types (categories) for the grid on /textile and on the home page. */
export const getTypes = async () => (await client.collection("categories").getList(1, 50)).items;

/** A type with its collections, for /textile/[type]. Build time and browser. */
export const getTypeWithCollections = (type: string) =>
  Promise.all([
    client.collection("collections").getList(1, 50, {
      filter: `category.path?="${type}"`,
    }),
    client.collection("categories").getFirstListItem(`path="${type}"`, {
      fields: "id, collectionId, path, name, description, rich_description, description_extended, image",
    }),
  ]).then(([collections, category]) => ({ collections, category }));

/** One collection by its path, for /textile/[type]/[collection] in the browser. */
export const getCollection = (collectionPath: string) =>
  client.collection("collections").getFirstListItem(`path="${collectionPath}"`, { expand: "category" });

/** Build time: one collection under its type, with its category expanded, for /textile/[type]/[collection]. */
export const getCollectionOf = (type: string, collectionPath: string) =>
  client
    .collection("collections")
    .getFirstListItem(`path="${collectionPath}" && category.path="${type}"`, { expand: "category" });

/** Build time: every type with its name, for the pages made at build (see src/app/paths.ts). */
export const listTypes = async () =>
  (await client.collection("categories").getFullList(500, { fields: "id, path, name, description" })).map((type) => ({
    path: String(type.path),
    name: String(type.name ?? ""),
    description: String(type.description ?? ""),
  }));

/** Build time: every collection with the path of its type. A collection without a type gets no page. */
export async function listCollections() {
  const [collections, categories] = await Promise.all([
    client.collection("collections").getFullList(500, { fields: "id, path, name, description, category" }),
    client.collection("categories").getFullList(500, { fields: "id, path" }),
  ]);
  const typeOf = new Map(categories.map((category) => [category.id, String(category.path)]));
  return collections.flatMap((collection) => {
    const categoryId = Array.isArray(collection.category) ? collection.category[0] : collection.category;
    const type = typeOf.get(categoryId);
    if (!type) return [];
    return [
      {
        type,
        path: String(collection.path),
        name: String(collection.name ?? ""),
        description: String(collection.description ?? ""),
      },
    ];
  });
}
