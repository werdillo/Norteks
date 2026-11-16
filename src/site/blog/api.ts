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

/** All posts, newest first, with a short excerpt as the description. */
export const getPosts = () =>
  client.collection("blog").getFullList<BlogPost>(50, {
    fields: "id, collectionId, image, path, title, description:excerpt(200, true)",
    sort: "-created",
  });

/** One post by its path. */
export const getPostByPath = (postPath: string) =>
  client.collection("blog").getFirstListItem<BlogPost>(`path="${postPath}"`);

/** Build time: one post with its content and a short excerpt, for the post page made at build. */
export const getPostForBuild = (postPath: string) =>
  client.collection("blog").getFirstListItem<BlogPost>(`path="${postPath}"`, {
    fields: "id, collectionId, image, path, title, content, created, updated, description:excerpt(200, true)",
  });

/** Build time: every post with its title, for the pages made at build (see src/app/paths.ts). */
export const listPosts = async () =>
  (await client.collection("blog").getFullList(500, { fields: "id, path, title, description:excerpt(200, true)" })).map(
    (post) => ({ path: String(post.path), title: String(post.title ?? ""), description: String(post.description ?? "") }),
  );
