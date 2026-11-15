import type { RecordModel } from "pocketbase";

/** A search hit: a type (category) or a collection, with the page it links to. */
export type SearchResult = RecordModel & {
	type: "category" | "collection";
	url: string;
};
