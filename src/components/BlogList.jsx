import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";


export default function BlogList() {
	const [items, setItems] = createSignal([]);
	
	onMount(async () => {
		try {
            const res = await client.collection("blog").getFullList(50, {
                fields: "id, collectionId, image, path, title, description:excerpt(200, true)",
            });
			setItems(res);
		} catch (err) {
			console.error('Error fetching items:', err); 
			setError(err);
		}
	});


	return <>
		<div class="blog">
			<For each={items()} fallback={
				<>
					<div class="skeleton blog"></div>
					<div class="skeleton blog"></div>
					<div class="skeleton blog"></div>
					<div class="skeleton blog"></div>
					<div class="skeleton blog"></div>
					<div class="skeleton blog"></div>
				</>
			}>
				{(item) => (
					<a href={`/post?name=${item.path}`}>
                        <img
                            src={getImageUrl(item)}
                            class="-img"
                            alt={item.title}
                        />
                        <div class="-title">{item.title}</div>
                        <div class="-description">
                            {item.description}
                        </div>
                    </a>
                    )	
				}
			</For>
		</div>
	</>
}