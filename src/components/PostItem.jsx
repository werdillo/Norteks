import { createSignal, createResource, Suspense } from "solid-js";
import { client } from '../lib/pocketbase';
import { getImageUrl } from '../lib/pocketbase';
import "../main.css";

const fetchPostItem = async (name) => {
	const res = await client.collection('blog').getList(1, 50, {
		filter: `path="${name}"`,
	});
	if (res.items.length > 0) {
		return res.items[0];
	}
	throw new Error("Item not found");
};

export default function PostItem() {
	const urlSearchParams = new URLSearchParams(window.location.search);
	const params = Object.fromEntries(urlSearchParams.entries());
	const [item, { refetch }] = createResource(() => params.name, fetchPostItem);

	return (
		<Suspense fallback={
			<>
				<div class="skeleton post"></div>
				<div class="left">
					<div class="skeleton text title"></div>
					<div class="skeleton text"></div>
					<div class="skeleton text"></div>
					<div class="skeleton text"></div>
					<div class="skeleton text"></div>
					<div class="skeleton text"></div>
					<div class="skeleton text"></div>
					<div class="skeleton text"></div>
				</div>
			</>
		}>
			{item() && (
				<>
					<img src={getImageUrl(item())} class="post-image" alt={item().name} />
					<div class="container">
						<div class="post">
							<div class="-title">{item().title}</div>
							<div class="-text" innerHTML={item().content}></div>
						</div>
					</div>
				</>
			)}
		</Suspense>
	);
}