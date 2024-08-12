import { createSignal, onMount } from "solid-js";
import { client, getImageUrl } from "../lib/pocketbase";
import img3 from "../assets/img/cleaning/img3.jpg";
import EmailBottom from "./EmailBottom";

import "../main.css";

export default function FurnitureList() {
	const [items, setItems] = createSignal([]);
	const [error, setError] = createSignal(null);
	const [loading, setLoading] = createSignal(true);

	onMount(async () => {
		try {
			const res = await client.collection("furniture").getFullList(50, {
				fields: "id, collectionId, name, image, height, title, color, material:excerpt(200, true)",
			});
			setItems(res);
			setLoading(false);
		} catch (err) {
			console.error("Error fetching items:", err);
			setError(err);
			setLoading(false);
		}
	});

	return (
		<>
		<div class="container">
			<div class="furniture">
				{error() && <p>Error loading items: {error().message}</p>}
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
						{(item) => (
							<>
							<div>
								<div key={item.id}>
									<img
										src={getImageUrl(item)}
										class="-img"
										alt={item.title}
									/>
								
									<div class="-title">{item.name}</div>
								</div>
								<br/>
								<div class="spec no-border">
									<div class="-name">Высота</div>
									<div class="-value">{item.height}</div>
								</div>
								<div class="spec no-border">
									<div class="-name">Материал</div>
									<div class="-value">{item.material}</div>
								</div>
								<div class="spec no-border">
									<div class="-name">Цвет</div>
									<div class="-value">{item.color}</div>
								</div>
								</div>
							</>
						)}
					</For>
				</Show>
			</div>
		</div>
		</>
	);
}
