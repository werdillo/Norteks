import { For, createSignal, onMount } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";

export const getImage = (collectionId, fileId, fileName) => {
	const url = 'https://eliza-norteks.pockethost.io/';

	return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
};

export default function CollectionItem() {
	const [loading, setLoading] = createSignal(true);
	const [items, setItems] = createSignal([]);
	const [description, setDescription] = createSignal([]);
	const [descriptionType, setDescriptionType] = createSignal([]);
	const [title, setTitle] = createSignal([]);
	const [collectionId, setCollectionId] = createSignal([]);
	const [fileId, setFileId] = createSignal([]);
	const [plotnost, setPlotnost] = createSignal();
	const [sostav, setSostav] = createSignal();
	const [istiranie, setIstiranie] = createSignal("");
	const [error, setError] = createSignal(null);

	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());

	onMount(async () => {
		const param = params.name;
		try {
			const res = await client.collection('collections').getList(1, 100, {
				filter: `path="${param}"`,
			});

			// Process the items to filter out empty strings
			const processedItems = res.items.map(item => {
				const combined = [];
				for (let i = 1; i <= 100; i++) {
					const img = item[`img${i}`];
					const textile = item[`textile${i}`];
					if (img && textile) {
						combined.push({ img, textile });
					}
				}
				return { ...item, combined };
			});
			setLoading(false)
			setItems(processedItems);
			setTitle(res.items[0].name);
			setDescription(res.items[0].description);
			setDescriptionType(res.items[0].description_type);

			setCollectionId(res.items[0].collectionId);
			setFileId(res.items[0].id);
			
			setPlotnost(res.items[0].plotnost);
			setSostav(res.items[0].sostav);
			setIstiranie(res.items[0].istiranie);
		} catch (err) {
			console.error('Error fetching items:', err);
			setError(err);
		}
	});

	return <>
		<div class="title s">
			{title()}
		</div>
		<div class="text small-width ">
			{description()}
		</div>
		<div class="text small-width s">
			{descriptionType()}
		</div>
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
		<br/>
		{plotnost() && 
			<div class="spec">
				<div class="-name">Плотность</div>
				<div class="-value">{plotnost()}</div>
			</div>
		}
		{sostav() && 
			<div class="spec">
				<div class="-name">Состав</div>
				<div class="-value">{sostav()}</div>
			</div>
		}
		{istiranie() && 
			<div class="spec">
				<div class="-name">Тест на истирание</div>
				<div class="-value">{istiranie()}</div>
			</div>
		}
		<div class="product-list colors">
			<Show when={loading()}>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
				<div class="skeleton product"></div>
			</Show>
			<Show when={!loading()}>
				<For each={items()}>
					{item =>
						item.combined.map((pair, index) => (
							<div key={item.id} class="-item">
								<div>
									<div class="-text">{pair.textile}</div>
									<img class="-img product" src={getImage(collectionId(), fileId(), pair.img)} alt={pair.textile} />
								</div>
							</div>
						))
					}
				</For>
			</Show>
		</div>

	</>
}
