import { createSignal, onMount, Show } from "solid-js";
import { searchCatalog } from "../api";
import type { SearchResult } from "../types";
import SearchResults from "./SearchResults";

const input =
  "w-[150px] max-768:w-full max-768:max-w-[140px] rounded-field border border-solid border-line bg-field py-8 pr-12 pl-36 text-14 text-on-dark [transition:all_0.2s] placeholder:text-placeholder focus:w-[200px] focus:border-highlight focus:elevation-focus focus:[outline:none] max-768:text-16 max-768:focus:w-full max-768:focus:max-w-[160px]";

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
    if (!(e.target as Element).closest("[data-search]")) {
      setShowResults(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <div class="relative flex items-center" data-search>
      <svg
        class="pointer-events-none absolute top-1/2 left-10 z-[1] h-16 w-16 [transform:translateY(-50%)] text-placeholder"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
        <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input
        type="text"
        class={input}
        placeholder="Поиск тканей"
        value={searchQuery()}
        onInput={handleInput}
        autocomplete="off"
      />
      <Show when={showResults()}>
        <SearchResults results={filteredResults()} loading={loading()} onSelect={handleResultClick} />
      </Show>
    </div>
  );
}
