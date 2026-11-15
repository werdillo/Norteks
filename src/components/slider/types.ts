/** One slide of the hero slider. */
export interface SliderSlide {
  title: string;
  /** Target of the slide's button: a link or a mailto. */
  href: string;
  label: string;
  /** URL of the slide's background picture. */
  image: string;
}
