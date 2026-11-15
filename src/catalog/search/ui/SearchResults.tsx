import { For, Show } from "solid-js";
import { getImageUrl } from "#/core/pocketbase";
import type { SearchResult } from "../types";

const panel =
  "absolute top-[calc(100%_+_4px)] right-0 left-0 z-[var(--z-overlay)] max-h-[300px] max-768:max-h-[250px] min-w-[250px] max-768:min-w-[200px] overflow-y-auto rounded-panel border border-solid border-line bg-panel elevation-menu [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-track [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb:hover]:bg-line-strong";
const item =
  "cursor-pointer px-12 py-10 [border-bottom:1px_solid_var(--color-divider)] [transition:background_0.2s] last:[border-bottom:none] hover:bg-field";
const message = item;

export default function SearchResults(props: {
  results: SearchResult[];
  loading: boolean;
  onSelect: (result: SearchResult) => void;
}) {
  return (
    <div class={panel}>
      <Show when={!props.loading} fallback={<div class={message}>Поиск...</div>}>
        <Show
          when={props.results.length > 0}
          fallback={<div class={message}>Ничего не найдено</div>}
        >
          <For each={props.results}>
            {(result) => (
              <div class={item} onClick={() => props.onSelect(result)}>
                <div class="flex items-center gap-10">
                  <Show when={result.image}>
                    <img
                      src={getImageUrl(result)}
                      alt={result.name}
                      class="h-40 w-40 shrink-0 rounded-field object-cover"
                    />
                  </Show>
                  <div class="min-w-0 flex-1">
                    <span class="mb-2 block text-11 tracking-[0.5px] text-caption uppercase">
                      {result.type === "category" ? "Категория" : "Коллекция"}
                    </span>
                    <div class="overflow-hidden text-14 font-medium text-ellipsis whitespace-nowrap text-on-dark">
                      {result.name}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </Show>
      </Show>
    </div>
  );
}
