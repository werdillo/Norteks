import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";


export default function Callection() {
	const [items, setItems] = createSignal([]);
	const [error, setError] = createSignal(null);
	const [description, setDescription] = createSignal("");
	const [title, setTitle] = createSignal("");
	
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	onMount(async () => {
		const param = params.name;
		try {
			const res = await client.collection('collections').getList(1, 50,
				 {filter: `category.path="${param}"`,}
			);
			const text = await client.collection('categories').getList(1, 50, {
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
		<div className="title">
			{title}
		</div>
		<div className="text">
			{description}
		</div>
		<div class="product-list collection">
			{error() && <p>Error loading items: {error().message}</p>}
			<For each={items()} fallback={
				<>
					<div class="skeleton collection"></div>
					<div class="skeleton collection"></div>
					<div class="skeleton collection"></div>
					<div class="skeleton collection"></div>
					<div class="skeleton collection"></div>
					<div class="skeleton collection"></div>
					<div class="skeleton collection"></div>
					<div class="skeleton collection"></div>
				</>
			}>
				{(item) => 
					<a href={"/product?name=" + item.path}>
						<div key={item.id} class="-item">
							<div class="-text">{item.name}</div>
							<img class="-img collection" src={getImageUrl(item)} alt={item.name} />
						</div>
					</a>
				}
			</For>
		</div>
	</>
}