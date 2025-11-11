import { createSignal, onMount, Show, For } from "solid-js";
import { client, getImageUrl } from '../lib/pocketbase';

export default function SearchComponent() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const [filteredResults, setFilteredResults] = createSignal([]);
	const [showResults, setShowResults] = createSignal(false);
	const [loading, setLoading] = createSignal(false);
	let searchTimeout;

	const searchData = async (searchTerm) => {
		if (searchTerm.length < 2) {
			setShowResults(false);
			return;
		}

		setLoading(true);
		
		try {
			// Поиск в категориях
			const categoriesRes = await client.collection("categories").getList(1, 5, {
				filter: `name ~ "${searchTerm}"`,
				fields: 'id, collectionId, name, path, image'
			});

			// Поиск в коллекциях с expand для получения category.path
			const collectionsRes = await client.collection("collections").getList(1, 10, {
				filter: `name ~ "${searchTerm}"`,
				fields: 'id, collectionId, name, path, image, category',
				expand: 'category'
			});

			// Получаем все категории для маппинга
			const categoryMap = new Map();
			if (collectionsRes.items.length > 0) {
				const categories = await client.collection("categories").getFullList(100, {
					fields: 'id, path'
				});
				categories.forEach(cat => categoryMap.set(cat.id, cat.path));
			}

			// Объединяем результаты
			const results = [
				// Категории
				...categoriesRes.items.map(item => ({
					...item,
					type: 'category',
					url: `/textile/${item.path}`
				})),
				// Коллекции
				...collectionsRes.items.map(item => {
					const categoryId = Array.isArray(item.category) ? item.category[0] : item.category;
					const categoryPath = categoryMap.get(categoryId);
					return {
						...item,
						type: 'collection',
						url: categoryPath ? `/textile/${categoryPath}/${item.path}` : '#'
					};
				})
			];

			setFilteredResults(results);
			setShowResults(true);
			
		} catch (error) {
			console.error('Search error:', error);
			setFilteredResults([]);
			setShowResults(true);
		} finally {
			setLoading(false);
		}
	};

	const handleInput = (e) => {
		const query = e.target.value.trim();
		setSearchQuery(query);
		
		if (query.length === 0) {
			setShowResults(false);
			return;
		}

		// Debounce
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		searchTimeout = setTimeout(() => {
			searchData(query);
		}, 300);
	};

	const handleResultClick = (item) => {
		if (item.url && item.url !== '#') {
			window.location.href = item.url;
		}
	};

	const handleClickOutside = (e) => {
		if (!e.target.closest('.-search-container')) {
			setShowResults(false);
		}
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	return (
		<div class="-search-container">
			<svg class="-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
				<circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
				<path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			</svg>
			<input 
				type="text" 
				class="-search-input" 
				placeholder="Поиск тканей"
				value={searchQuery()}
				onInput={handleInput}
				autocomplete="off"
			/>
			<Show when={showResults()}>
				<div class="-search-results">
					<Show 
						when={loading()}
						fallback={
							<Show 
								when={filteredResults().length > 0}
								fallback={<div class="-result-item">Ничего не найдено</div>}
							>
								<For each={filteredResults()}>
									{(item) => (
										<div 
											class="-result-item" 
											onClick={() => handleResultClick(item)}
										>
											<div class="-result-content">
												<Show when={item.image}>
													<img 
														src={getImageUrl(item)} 
														alt={item.name}
														class="-result-image"
													/>
												</Show>
												<div class="-result-info">
													<span class="-result-type">
														{item.type === 'category' ? 'Категория' : 'Коллекция'}
													</span>
													<div class="-result-name">{item.name}</div>
												</div>
											</div>
										</div>
									)}
								</For>
							</Show>
						}
					>
						<div class="-result-item">Поиск...</div>
					</Show>
				</div>
			</Show>
		</div>
	);
}
