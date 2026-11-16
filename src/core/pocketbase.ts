import PocketBase from "pocketbase";

// Without a trailing slash, so file URLs do not get a double one (`…ru//api/files`).
export const url: string = String(import.meta.env.PUBLIC_POCKETBASE_URL ?? "").replace(/\/+$/, "");
export const client = new PocketBase(url);
// The pages and the build make parallel requests on purpose: the SDK must not cancel one of them.
client.autoCancellation(false);

/** URL of a file stored on a record. */
export const fileUrl = (collectionId: string, recordId: string, fileName: string): string =>
  `${url}/api/files/${collectionId}/${recordId}/${fileName}`;

export const getImageUrl = (item: { image?: unknown; collectionId: string; id: string }): string => {
  if (!item.image) return "";
  return fileUrl(item.collectionId, item.id, String(item.image));
};

/** Whether PocketBase answered that the record does not exist. */
export const isNotFound = (error: unknown): boolean => (error as { status?: number })?.status === 404;
