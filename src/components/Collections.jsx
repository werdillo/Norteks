import { For, createSignal, onMount } from "solid-js";
import { client } from "../lib/pocketbase";
import { getImageUrl } from "../lib/pocketbase";
import "../main.css";

export default function Callection() {
  const [items, setItems] = createSignal([]);
  const [description, setDescription] = createSignal("");
  const [extended, setExtended] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [loading, setLoading] = createSignal(true);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  onMount(async () => {
    const param = params.name;
    try {
      const res = await client
        .collection("collections")
        .getList(1, 50, { filter: `category.path?="${param}"` });
      const text = await client.collection("categories").getList(1, 50, {
        filter: `path="${param}"`,
        fields: "name, description, rich_description, description_extended",
      });

      setItems(res.items);
      setDescription(text.items[0].description);
      setTitle(text.items[0].name);
      console.log(text.items[0].description_extended);
      setExtended(text.items[0].description_extended);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  });

  return (
    <>
      <div className="container">
        <Show when={loading()}>
          <div>
            <div class="skeleton text title"></div>
            <div class="skeleton text"></div>
            <div class="skeleton text"></div>
            <div class="skeleton text"></div>
            <div class="skeleton text"></div>
            <div class="skeleton text"></div>
          </div>
        </Show>
        <div className="title">{title}</div>
        <div className="text small-width">{description}</div>
        <div class="product-list collection">
          <Show when={loading()}>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
          </Show>
          <Show when={!loading()}>
            <For each={items()}>
              {(item) => (
                <a href={"/product?name=" + item.path}>
                  <div key={item.id} class="-item">
                    <div class="-text">{item.name}</div>
                    <img
                      class="-img collection"
                      src={getImageUrl(item)}
                      alt={item.name}
                    />
                  </div>
                </a>
              )}
            </For>
          </Show>
        </div>
        <div class="rich-editor" innerHTML={extended()}></div>
      </div>
      {/* <Show when={!loading()}>
			<EmailBottom />
		</Show> */}
    </>
  );
}
