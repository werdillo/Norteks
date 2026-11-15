import { createSignal, onMount, Show, For } from "solid-js";
import { getImageUrl } from "#/core/pocketbase";
import { searchCatalog } from "../api";
import type { SearchResult } from "../types";
import "./search.css";

export default function SearchComponent() {
	const [searchQuery, setSearchQuery] = createSignal("");
	const [filteredResults, setFilteredResults] = createSignal<SearchResult[]>([]);
	const [showResults, setShowResults] = createSignal(false);
	const [loading, setLoading] = createSignal(false);
	let searchTimeout: ReturnType<typeof setTimeout> | undefined;

	const searchData = async (searchTerm: string) => {
		if (searchTerm.length < 2) {
			setShowResults(false);
			return;
		}

		setLoading(true);

		try {
			setFilteredResults(await searchCatalog(searchTerm));
			setShowResults(true);
		} catch (error) {
			console.error("Search error:", error);
			setFilteredResults([]);
			setShowResults(true);
		} finally {
			setLoading(false);
		}
	};

	const handleInput = (e: Event) => {
		const query = (e.target as HTMLInputElement).value.trim();
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

	const handleResultClick = (item: SearchResult) => {
		if (item.url && item.url !== "#") {
			window.location.href = item.url;
		}
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (!(e.target as Element).closest(".-search-container")) {
			setShowResults(false);
		}
	};

	onMount(() => {
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
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
														{item.type === "category" ? "Категория" : "Коллекция"}
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
