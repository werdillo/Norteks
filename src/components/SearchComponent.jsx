import { createSignal, onMount, Show, For } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';

export default function SearchComponent() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const [filteredResults, setFilteredResults] = createSignal([]);
	const [showResults, setShowResults] = createSignal(false);
	const [loading, setLoading] = createSignal(false);
	let searchTimeout;

	console.log('SearchComponent loaded');

	const searchData = async (searchTerm) => {
		console.log('Searching for:', searchTerm);
		
		if (searchTerm.length < 2) {
			setShowResults(false);
			return;
		}

		setLoading(true);
		
		try {
			// Поиск в категориях, как в примере
			const categoriesRes = await client.collection("categories").getList(1, 10, {
				filter: client.filter(
					"name ~ {:search}",
					{ search: searchTerm }
				),
				fields: 'id, collectionId, name, path, image'
			});
			
			console.log('Categories found:', categoriesRes.items.length);

			// Поиск в коллекциях, как в примере  
			const collectionsRes = await client.collection("collections").getList(1, 10, {
				filter: client.filter(
					"name ~ {:search}", 
					{ search: searchTerm }
				),
				fields: 'id, collectionId, name, path, image'
			});
			
			console.log('Collections found:', collectionsRes.items.length);

			// Объединяем результаты
			const results = [
				...categoriesRes.items.map(item => ({
					...item,
					type: 'category',
					url: `/collection?name=${item.path}`
				})),
				...collectionsRes.items.map(item => ({
					...item,
					type: 'collection', 
					url: `/product?name=${item.path}`
				}))
			];
			
			console.log('Total results:', results.length);
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
		
		console.log('Search query:', query);
		
		if (query.length === 0) {
			setShowResults(false);
			return;
		}

		// Очищаем предыдущий таймаут
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		// Добавляем debounce для предотвращения частых запросов
		searchTimeout = setTimeout(() => {
			searchData(query);
		}, 300); // 300ms задержка
	};

	const handleResultClick = (item) => {
		window.location.href = item.url;
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
			<input 
				type="text" 
				class="-search-input" 
				placeholder="Поиск коллекций"
				value={searchQuery()}
				onInput={handleInput}
				autocomplete="off"
				autocapitalize="off"
				autocorrect="off"
				spellcheck="false"
			/>
			<Show when={showResults()}>
				<div class="-search-results" style="display: block !important;">
					<Show 
						when={loading()}
						fallback={
							<Show 
								when={filteredResults().length > 0}
								fallback={<div class="-result-item">Ничего не найдено</div>}
							>
								<For each={filteredResults().slice(0, 5)}>
									{(item) => (
										<div 
											class="-result-item" 
											onClick={() => handleResultClick(item)}
										>
											<div style="display: flex; align-items: center; gap: 8px;">
												<Show when={item.image}>
													<img 
														src={getImageUrl(item)} 
														alt={item.name}
														style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; flex-shrink: 0;"
													/>
												</Show>
												<div style="flex: 1;">
													<span style="color: #aaa; font-size: 11px; margin-right: 8px;">
														{item.type === 'category' ? 'Категория' : 'Коллекция'}
													</span>
													<div style="color: #fff; font-size: 14px;">
														{item.name}
													</div>
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