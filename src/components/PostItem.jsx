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
		<Suspense fallback={<p>Loading...</p>}>
			<ErrorBoundary fallback={<p>Error loading item</p>}>
				{item() && (
					<>
						<img src={getImageUrl(item(), item().imageField)} class="post-image" alt={item().name} />
						<div class="container">
							<div class="post">
								<div class="-title">{item().title}</div>
								<div class="-text" innerHTML={item().content}></div>
							</div>
						</div>
					</>
				)}
			</ErrorBoundary>
		</Suspense>
	);
}

function ErrorBoundary(props) {
	const [error, setError] = createSignal(null);
	return (
		<ErrorBoundary
			fallback={(err) => {
				setError(err);
				return <p>Error loading item</p>;
			}}
		>
			{error() ? props.fallback : props.children}
		</ErrorBoundary>
	);
}
