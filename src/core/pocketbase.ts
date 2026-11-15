import PocketBase from "pocketbase";

export const url: string = import.meta.env.PUBLIC_POCKETBASE_URL;
export const client = new PocketBase(url);

/** URL of a file stored on a record. */
export const fileUrl = (collectionId: string, recordId: string, fileName: string): string =>
  `${url}/api/files/${collectionId}/${recordId}/${fileName}`;

export const getImageUrl = (item: { image?: unknown; collectionId: string; id: string }): string => {
  if (!item.image) return "";
  return fileUrl(item.collectionId, item.id, String(item.image));
};

/** Whether PocketBase answered that the record does not exist. */
export const isNotFound = (error: unknown): boolean => (error as { status?: number })?.status === 404;
