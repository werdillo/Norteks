import type { RecordModel } from "pocketbase";

export interface CollectionImage {
  img: string;
  textile: string;
  id: string;
}

/** The colour pictures of a collection: a picture and its fabric name, up to 100 slots. */
export function collectionImages(collection: RecordModel): CollectionImage[] {
  const items: CollectionImage[] = [];
  for (let i = 1; i <= 100; i++) {
    const img = collection[`img${i}`];
    const textile = collection[`textile${i}`];
    if (img && textile) {
      items.push({ img, textile, id: `${collection.id}-${i}` });
    }
  }
  return items;
}

/** The specification rows of a collection that have a value. */
export function collectionSpecs(collection: RecordModel) {
  return [
    { name: "Плотность", value: collection.plotnost },
    { name: "Состав", value: collection.sostav },
    { name: "Тест на истирание", value: collection.istiranie },
  ].filter((spec) => spec.value);
}
