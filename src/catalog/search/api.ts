import { client } from "#/core/pocketbase";
import type { SearchResult } from "./types";

/**
 * Finds types and collections whose name contains the term.
 * Throws when PocketBase does not answer; the caller decides what to show.
 */
export async function searchCatalog(searchTerm: string): Promise<SearchResult[]> {
	// Поиск в категориях
	const categoriesRes = await client.collection("categories").getList(1, 5, {
		filter: `name ~ "${searchTerm}"`,
		fields: "id, collectionId, name, path, image",
	});

	// Поиск в коллекциях с expand для получения category.path
	const collectionsRes = await client.collection("collections").getList(1, 10, {
		filter: `name ~ "${searchTerm}"`,
		fields: "id, collectionId, name, path, image, category",
		expand: "category",
	});

	// Получаем все категории для маппинга
	const categoryMap = new Map<string, string>();
	if (collectionsRes.items.length > 0) {
		const categories = await client.collection("categories").getFullList(100, {
			fields: "id, path",
		});
		categories.forEach((cat) => categoryMap.set(cat.id, cat.path));
	}

	// Объединяем результаты
	return [
		// Категории
		...categoriesRes.items.map((item) => ({
			...item,
			type: "category" as const,
			url: `/textile/${item.path}`,
		})),
		// Коллекции
		...collectionsRes.items.map((item) => {
			const categoryId = Array.isArray(item.category) ? item.category[0] : item.category;
			const categoryPath = categoryMap.get(categoryId);
			return {
				...item,
				type: "collection" as const,
				url: categoryPath ? `/textile/${categoryPath}/${item.path}` : "#",
			};
		}),
	];
}
