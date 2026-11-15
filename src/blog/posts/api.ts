import { client } from "#/core/pocketbase";

/** All posts, newest first, with a short excerpt as the description. */
export const getPosts = () =>
	client.collection("blog").getFullList(50, {
		fields: "id, collectionId, image, path, title, description:excerpt(200, true)",
		sort: "-created",
	});

/** One post by its path. */
export const getPostByPath = (postPath: string) =>
	client.collection("blog").getFirstListItem(`path="${postPath}"`);
