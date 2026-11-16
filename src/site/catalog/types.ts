import type { RecordModel } from "pocketbase";

/** A search hit: a type (category) or a collection, with the page it links to. */
export type SearchResult = RecordModel & {
  type: "category" | "collection";
  url: string;
};

/** A type as read at build: its category and its collections. */
export interface TypeRecord {
  category: RecordModel;
  collections: RecordModel[];
}
