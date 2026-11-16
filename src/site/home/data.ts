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
    subtitle: "Оптовые поставки декоративных тканей для мебели и штор напрямую от фабрик-производителей.",
    href: "mailto:firma.nortex@gmail.com",
    label: "Оставить заявку",
    secondary: { href: "/textile/", label: "Каталог тканей" },
    image: await background(homeImage),
  },
  {
    title: "Широкий выбор тканей",
    subtitle: "Велюр, рогожка, шенилл, букле, экокожа, негорючие и уличные ткани — рулонами и отрезами от метра.",
    href: "/textile/",
    label: "Смотреть каталог",
    secondary: { href: "/contacts/", label: "Связаться" },
    image: await background(textileImage),
  },
];

/** The introduction under the hero: a heading, a lead and a paragraph. */
export const intro = {
  heading: "Ткани для мебели и штор от ведущих мировых производителей",
  lead: "НОРТЕКС поставляет высококачественные и высокотехнологичные ткани: экологичные, износостойкие, в широком спектре цветов и в разных ценовых категориях. Мы внимательно следим за соотношением цены и качества.",
  text: "Команда НОРТЕКС более 20 лет работает на рынке мебельных тканей. Наша задача — держать высокие стандарты качества и сервиса и успешно решать даже самые сложные запросы клиентов.",
};

/** The figures beside the introduction. `types` is filled with the number of fabric types at build. */
export const stats = (types: number) => [
  { value: "20+", label: "лет на рынке мебельных тканей" },
  { value: types > 0 ? String(types) : "20+", label: "видов тканей в каталоге" },
  { value: "Рулон и метр", label: "продаём рулонами и отрезами" },
  { value: "Россия", label: "доставка со склада в любой регион" },
];

/** The «О компании» section at the bottom: the paragraphs around the list of fabrics. */
export const about = {
  heading: "О компании",
  clients:
    "Наши сотрудники более 20 лет продают ткани на российском рынке. Среди клиентов — крупные мебельные производства, частные дизайнеры и декораторы, дизайнерские студии, архитектурные бюро и государственные заказчики.",
  rangeIntro: "В ассортименте — лучшие мировые ткани для мебели и штор в широком спектре цветов:",
  quality:
    "Мы уверены в технологичности и безупречном качестве каждой ткани, которую поставляем, и держим высокие стандарты обслуживания — даже в самых сложных проектах.",
  service:
    "Помимо тканей поставляем мебельную фурнитуру: опоры и мебельные детали. Продаём ткани рулонами и отрезами в метрах, располагаем складом и гибкой доставкой. Поможем подобрать ткань под любой вкус, бюджет и страну производителя.",
};

/** The fabrics named in «О компании»; a name that matches a catalog type becomes a link to it. */
export const fabrics: string[] = [
  "Велюр", "Замша", "Микрофибра", "Экокожа", "Рогожка", "Негорючие ткани", "Мировые тренды",
  "Уличные ткани Outdoor", "Trevira CS", "Шенилл", "Ткани с рисунком", "Букле", "Шерсть", "Лён",
  "Хлопок", "Бархат", "Мех", "Сертификат AVIO/IMO", "Блэкаут", "Тюль",
];

/** The call to action above the footer. */
export const callToAction = {
  heading: "Подберём ткань под ваш проект",
  text: "Расскажите о задаче — подберём подходящие ткани и подготовим предложение.",
  mail: "firma.nortex@gmail.com",
  label: "Оставить заявку",
};
