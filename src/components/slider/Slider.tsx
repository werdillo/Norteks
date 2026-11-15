import { register } from "swiper/element/bundle";
import { For } from "solid-js";

register();

export interface SliderSlide {
	title: string;
	/** Target of the slide's button: a link or a mailto. */
	href: string;
	label: string;
	/** Extra class on the slide's background, e.g. "textile". */
	variant?: string;
}

declare module "solid-js" {
	namespace JSX {
		interface IntrinsicElements {
			"swiper-container": Record<string, unknown>;
			"swiper-slide": Record<string, unknown>;
		}
	}
}

export default function Slider(props: { slides: SliderSlide[] }) {
	return (
		<swiper-container
			slides-per-view="1"
			pagination="true"
			pagination-clickable="true"
			speed="500"
			loop="true"
			autoplay-delay="5000"
		>
			<For each={props.slides}>
				{(slide) => (
					<swiper-slide>
						<div class={slide.variant ? `home-image ${slide.variant}` : "home-image"}>
							<div class="-container">
								<div class="-title">{slide.title}</div>
								<a class="-text link" href={slide.href}>
									<button class="-button">{slide.label}</button>
								</a>
							</div>
						</div>
					</swiper-slide>
				)}
			</For>
		</swiper-container>
	);
}
