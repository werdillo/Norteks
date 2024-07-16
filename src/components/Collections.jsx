import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";
import EmailBottom from "./EmailBottom";


export default function Callection() {
	const [items, setItems] = createSignal([]);
	const [description, setDescription] = createSignal("");
	const [title, setTitle] = createSignal("");
	const [loading, setLoading] = createSignal(true);
	
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	onMount(async () => {
		const param = params.name;
		try {
			const res = await client.collection('collections').getList(1, 50,
				 {filter: `category.path?="${param}"`,}
			);
			const text = await client.collection('categories').getList(1, 50, {
				filter: `path="${param}"`,
				fields: "name, description"
			});

			setItems(res.items);
			setDescription(text.items[0].description);
			setTitle(text.items[0].name);
			setLoading(false)
		} catch (err) {
			console.error('Error fetching items:', err); 
		}
	});


	return <>
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
			<div className="title">
				{title}
			</div>
			<div className="text small-width">
				{description}
			</div>
			<div class="product-list collection">
				<Show when={loading()}>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
					<div class="skeleton furniture"></div>
				</Show>
				<Show when={!loading()}>
					<For each={items()}>
						{(item) => 
							<a href={"/product?name=" + item.path}>
								<div key={item.id} class="-item">
									<div class="-text">{item.name}</div>
									<img class="-img collection" src={getImageUrl(item)} alt={item.name} />
								</div>
							</a>
						}
					</For>
				</Show>
			</div>
		</div>
		{/* <Show when={!loading()}>
			<EmailBottom />
		</Show> */}
	</>
}