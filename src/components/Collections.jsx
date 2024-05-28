import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";


export default function Callection() {
	const [items, setItems] = createSignal([]);
	const [error, setError] = createSignal(null);
	
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	onMount(async () => {
		const param = params.name;
		try {
			const res = await client.collection('collections').getList(1, 50,
				 {filter: `category.path="${param}"`,}
				);

			setItems(res.items);
		} catch (err) {
			console.error('Error fetching items:', err); 
			setError(err);
		}
	});


	return <>
		<div class="product-list collection">
			{error() && <p>Error loading items: {error().message}</p>}
			<For each={items()} fallback={<p>Loading...</p>}>
				{(item) => 
					<a href={"/collection?name=" + item.path}>
						<div key={item.id} class="-item">
							<div class="-text">{item.name}</div>
							<img class="-img" src={getImageUrl(item)} alt={item.name} />
						</div>
					</a>
				}
			</For>
		</div>
	</>
}
