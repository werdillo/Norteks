import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";


export default function ProductItem() {
	const [items, setItems] = createSignal([]);
	const [description, setDescription] = createSignal([]);
	const [title, setTitle] = createSignal([]);
	const [error, setError] = createSignal(null);
	
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	onMount(async () => {
		const param = params.name;
		try {
			const res = await client.collection('textile').getList(1, 50,
				 {filter: `collection.path="${param}"`,}
				);
			const text = await client.collection('collections').getList(1, 50, {
				filter: `path="${param}"`,
				fields: "name, description:excerpt(200,true)"
			});

			setItems(res.items);
			setDescription(text.items[0].description);
			setTitle(text.items[0].name);
		} catch (err) {
			console.error('Error fetching items:', err); 
			setError(err);
		}
	});


	return <>
		<div className="title small-width s">
			{title}
		</div>
		<div className="text small-width s">
			{description}
		</div>
		<div class="product-list collection">
			<For each={items()} fallback={
				<>
					<div class="skeleton product"></div>
					<div class="skeleton product"></div>
					<div class="skeleton product"></div>
					<div class="skeleton product"></div>
					<div class="skeleton product"></div>
					<div class="skeleton product"></div>
					<div class="skeleton product"></div>
					<div class="skeleton product"></div>
				</>
			}>
				{(item) => 
					<div key={item.id} class="-item">
						<div class="-text">{item.name}</div>
						<img class="-img product" src={getImageUrl(item)} alt={item.name} />
					</div>
						
				}
			</For>
		</div>
	</>
}