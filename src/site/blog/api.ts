import { client } from "#/core/pocketbase";

/** A post as the pages read it. `description` is the editors' text; the lists read its excerpt. */
export interface BlogPost {
  id: string;
  collectionId: string;
  path: string;
  title: string;
  image?: string;
  description?: string;
  content?: string;
  created?: string;
  updated?: string;
}

/**
 * Posts per request. PocketBase loads a whole row, rich text and pasted images included, even when
 * `fields` asks for less, so a list is read a few posts at a time: one request never loads more than this.
 */
export const PAGE_SIZE = 3;

const LIST_FIELDS = "id, collectionId, image, path, title, description:excerpt(200, true)";

/** One page of posts, newest first, with a short excerpt as the description, and whether more pages follow. */
export const getPostsPage = async (page: number): Promise<{ posts: BlogPost[]; hasMore: boolean }> => {
  const result = await client.collection("blog").getList<BlogPost>(page, PAGE_SIZE, { fields: LIST_FIELDS, sort: "-created" });
  return { posts: result.items, hasMore: page < result.totalPages };
};

/** One post by its path. */
export const getPostByPath = (postPath: string) =>
  client.collection("blog").getFirstListItem<BlogPost>(`path="${postPath}"`);

/** Build time: one post with its content and a short excerpt, for the post page made at build. */
export const getPostForBuild = (postPath: string) =>
  client.collection("blog").getFirstListItem<BlogPost>(`path="${postPath}"`, {
    fields: "id, collectionId, image, path, title, content, created, updated, description:excerpt(200, true)",
  });

/** Build time: every post with its title, for the pages made at build (see src/app/paths.ts). Read PAGE_SIZE posts per request. */
export const listPosts = async () =>
  (await client.collection("blog").getFullList({ batch: PAGE_SIZE, fields: "id, path, title, description:excerpt(200, true)" })).map(
    (post) => ({ path: String(post.path), title: String(post.title ?? ""), description: String(post.description ?? "") }),
  );
