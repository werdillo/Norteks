import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";


export default function BlogItem() {
	const [items, setItems] = createSignal([]);
	const [error, setError] = createSignal(null);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	console.log('params', params);
	onMount(async () => {
		try {
			const res = await client.collection('blog').getList();
			setItems(res.items);
		} catch (err) {
			console.error('Error fetching items:', err);
			setError(err);
		}
	});


	return <>
		<div class="blog">
			{error() && <p>Error loading items: {error().message}</p>}
			<For each={items()} fallback={<p>Loading...</p>}>
				{
				(item) => 
					<div key={item.id} class="-item">
						<img src={getImageUrl(item)} class="-img" alt={item.name} />
						<div class="-title">{item.title}</div>
						<div class="-description">{item.description}</div>
					</div>
				}
			</For>
			
		</div>
		<a href="blog?search=govns1">link</a>
		{params.search}
	</>
}
