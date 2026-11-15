import { register } from "swiper/element/bundle";
import { For } from "solid-js";

register();

export interface SliderSlide {
  title: string;
  /** Target of the slide's button: a link or a mailto. */
  href: string;
  label: string;
  /** URL of the slide's background picture. */
  image: string;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "swiper-container": Record<string, unknown>;
      "swiper-slide": Record<string, unknown>;
    }
  }
}

const frame =
  "flex h-[750px] max-768:h-[400px] w-full items-center justify-start bg-cover bg-center";
const content = "ml-60 flex max-w-[800px] flex-col gap-24 max-768:ml-20";
const title = "text-80 max-768:text-40 text-accent";
const button =
  "h-60 max-768:h-[5dvb] w-[280px] max-768:w-[200px] cursor-pointer rounded-pill [border:0] bg-accent text-24 max-768:text-16 font-medium text-on-accent [transition:200ms] hover:elevation-accent-hover hover:[transform:translateY(-2px)] active:elevation-accent-press active:[transform:translateY(1px)]";

export default function Slider(props: { slides: SliderSlide[] }) {
  return (
    <swiper-container
      class="w-full max-w-[100vw]"
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
            <div class={frame} style={{ "background-image": `url(${slide.image})` }}>
              <div class={content}>
                <div class={title}>{slide.title}</div>
                <a href={slide.href}>
                  <button class={button}>{slide.label}</button>
                </a>
              </div>
            </div>
          </swiper-slide>
        )}
      </For>
    </swiper-container>
  );
}
