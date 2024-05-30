import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";

export default function BlogList() {
	const [items, setItems] = createSignal([]);
	const [error, setError] = createSignal(null);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	console.log('params', params);

	onMount(async () => {
		try {
			const res = await client.collection('blog').getFullList(50, {
				fields: "id, collectionId, image,path,title,description:excerpt(200,true)"
			});
			setItems(res);
		} catch (err) {
			console.error('Error fetching items:', err);
			setError(err);
		}
	});

	return (
		<div class="blog">
			{error() && <p>Error loading items: {error().message}</p>}
			<For each={items()} fallback={<p>Loading...</p>}>
				{(item) => (
					<a href={`/post?name=${item.path}`} key={item.id}>
						<div class="-item">
							<img src={getImageUrl(item)} class="-img" alt={item.title} />
							<div class="-title">{item.title}</div>
							<div class="-description">{item.description}</div>
						</div>
					</a>
				)}
			</For>
		</div>
	);
}
