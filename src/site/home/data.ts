import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";
import type { SliderSlide } from "#/components/slider";
import homeImage from "./homeImage.jpg";
import textileImage from "./textile.jpg";

/**
 * A slide background: the slider paints it as a CSS background, so it cannot take
 * `<Image>`; the original JPEG (2.5 MB) was sent as is. A 1920px WebP is a fraction.
 */
const background = async (src: ImageMetadata) =>
  (await getImage({ src, width: 1920, format: "webp", quality: 72 })).src;

/** The hero slides of the home page. */
export const heroSlides: SliderSlide[] = [
  {
    title: "Стильный гардероб мягкой мебели",
    href: "mailto:firma.nortex@gmail.com",
    label: "Оставить заявку",
    image: await background(homeImage),
  },
  {
    title: "Широкий выбор тканей",
    href: "/textile/",
    label: "Текстиль",
    image: await background(textileImage),
  },
];

/** The three plain paragraphs under the catalog of the home page. */
export const homeParagraphs: string[] = [
  "Наши сотрудники имеют более 20-ти летний опыт продаж тканей на Российский рынок. Наши клиенты это крупные производства, частные дизайнеры и декораторы, дизайнерские студии, архитектурные бюро, государственные заказы. Имеем огромный ассортимент лучших мировых тканей для мебели и штор, таких как велюр, замша, микрофибра, экокожа, рогожка, негорючие ткани, мировые тренды, уличные ткани outdoor, Trevira CS с нитью из полиэстера, шенилл, ткани с рисунком, букле, шерсть, лен, хлопок, бархат, мех, ткани с сертификатом AVIO/IMO, блэкаут, тюль и многие другие с широким спектром цветов.",
  "Наша главная задача быть уверенными в высоко-технологичности, безупречном качестве продукции и широком спектре цветов, а также соответствовать высочайшим стандартам качества и обслуживания, успешно реализовать даже самые сложные запросы клиентов.",
  "Помимо тканей поставляем фурнитуру для мебели в виде ножек и мебельных деталей. Для удобства предлагаем продажу тканей по рулонам или отрезам в метрах, располагаем складом и гибкой доставкой. У нас Вы можете найти ткань на любой вкус и цвет, выбрать необходимую ценовую категорию и страну производителя. Являемся лидерами и новаторами индустрии.",
];
