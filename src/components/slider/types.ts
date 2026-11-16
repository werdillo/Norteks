/** A link of a slide: where it goes and what it says. */
export interface SliderLink {
  /** A page, a link or a mailto. */
  href: string;
  label: string;
}

/** One slide of the hero slider. */
export interface SliderSlide {
  title: string;
  /** A line under the title. */
  subtitle?: string;
  /** Target of the slide's button: a link or a mailto. */
  href: string;
  label: string;
  /** A second, outlined button beside the first. */
  secondary?: SliderLink;
  /** URL of the slide's background picture. */
  image: string;
}
