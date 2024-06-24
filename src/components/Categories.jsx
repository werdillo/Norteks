import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import EmailBottom from "./EmailBottom";
import "../main.css";


export default function Categories() {
	const [items, setItems] = createSignal([]);
	const [loading, setLoading] = createSignal(true);

	
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	onMount(async () => {
		const param = params.type;
		try {
			const res = await client.collection('categories').getList(1, 50);
			setItems(res.items);
			setLoading(false);
		} catch (err) {
			console.error('Error fetching items:', err); 
		}
	});
	return <>
		<div class="container">
			<div class="product-list">
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
				</Show>
				<Show when={!loading()}>
					<For each={items()}>
						{(item) => (
							<a href={"/collection?name=" + item.path}>
								<div key={item.id} class="-item">
									<div class="-text">{item.name}</div>
									<img class="-img" src={getImageUrl(item)} alt={item.name} />
								</div>
							</a>
						)}
					</For>	
				</Show>
			</div>
		</div>
		<Show when={!loading()}>
			<EmailBottom />
		</Show>
	</>
}
