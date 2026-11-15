import { client } from "#/core/pocketbase";

/** All types (categories) for the grid on /textile and on the home page. */
export const getTypes = async () => (await client.collection("categories").getList(1, 50)).items;

/** A type with its collections, for /textile/[type]. */
export const getTypeWithCollections = (type: string) =>
  Promise.all([
    client.collection("collections").getList(1, 50, {
      filter: `category.path?="${type}"`,
    }),
    client.collection("categories").getFirstListItem(`path="${type}"`, {
      fields: "name, description, rich_description, description_extended",
    }),
  ]).then(([collections, category]) => ({ collections, category }));

/** One collection by its path, for /textile/[type]/[collection]. */
export const getCollection = (collectionPath: string) =>
  client.collection("collections").getFirstListItem(`path="${collectionPath}"`, { expand: "category" });
