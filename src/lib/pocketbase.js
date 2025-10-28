// lib/pocketbase.js
import PocketBase from "pocketbase";

export const url = "http://80.87.198.50:8090";
export const client = new PocketBase(url);

export const getImageUrl = (item) => {
  if (!item.image) return "";

  const collectionId = item.collectionId;
  const fileId = item.id;
  const fileName = item.image;
  return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
};

export async function fetchItems() {
  const resultList = await client.collection("types").getList(1, 50);
  return resultList.items;
}
