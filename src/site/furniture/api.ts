import { client } from "#/core/pocketbase";

/** All furniture items in display order (by their `order` field). */
export async function getFurniture() {
  const furnitureRes = await client.collection("furniture").getFullList(100, {
    fields: "id, collectionId, name, image, height, title, color, order, material:excerpt(200, true)",
  });
  return furnitureRes.sort((a, b) => a.order - b.order);
}
