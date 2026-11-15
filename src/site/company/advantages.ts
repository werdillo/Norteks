import type { ImageMetadata } from "astro";
import certificate from "../shared/assets/icons/dark/certificate_mod.svg";
import contract from "../shared/assets/icons/dark/contract.svg";
import ship from "../shared/assets/icons/dark/import.svg";
import industry from "../shared/assets/icons/dark/industry.svg";
import tags from "../shared/assets/icons/dark/money.svg";
import shield from "../shared/assets/icons/dark/shield.svg";
import truck from "../shared/assets/icons/dark/truck-fast.svg";

export interface Feature {
  icon: ImageMetadata;
  title: string;
  text: string;
}

/** The company's advantages, in display order. The icon's alt text is the title. */
export const features: Feature[] = [
  {
    icon: ship,
    title: "Прямой импорт",
    text: "Работаем напрямую с фабриками-производителями, минуя посредников",
  },
  {
    icon: truck,
    title: "Отлаженная логистика",
    text: "Быстрая и надежная доставка товаров со складов в любую точку России",
  },
  {
    icon: contract,
    title: "Прямые контракты",
    text: "Официальные контракты с ведущими производителями тканей",
  },
  {
    icon: industry,
    title: "Сотрудничество с фабриками",
    text: "Партнерство с лучшими фабриками текстильной промышленности",
  },
  {
    icon: certificate,
    title: "Только оригинальная продукция",
    text: "Гарантируем подлинность всех поставляемых тканей и материалов",
  },
  {
    icon: shield,
    title: "Гарантия качества",
    text: "Контроль качества на всех этапах от производства до поставки",
  },
  {
    icon: tags,
    title: "Лучшие цены",
    text: "Конкурентные цены благодаря прямым поставкам и оптимизации расходов",
  },
];
