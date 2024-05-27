import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";


export default function Categories() {
	const [items, setItems] = createSignal([]);
	const [error, setError] = createSignal(null);

	onMount(async () => {
		try {
			const res = await client.collection('categories').getList();
			setItems(res.items);
		} catch (err) {
			console.error('Error fetching items:', err); 
			setError(err);
		}
	});


	return <>
		<div class="product-list">
			{error() && <p>Error loading items: {error().message}</p>}
			<For each={items()} fallback={<p>Loading...</p>}>
				{(item) => (
					<div key={item.id} class="item">
						<h2>{item.name}</h2>
						<img src={getImageUrl(item)} alt={item.name} class="-img" />
					</div>
				)}
			</For>
		</div>
	</>
}
