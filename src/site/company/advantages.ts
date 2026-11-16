export interface Feature {
  /** An UnoCSS icon class, such as `i-tabler-ship`. */
  icon: string;
  title: string;
  text: string;
}

/** The company's advantages, in display order. The icon's alt text is the title. */
export const features: Feature[] = [
  {
    icon: "i-tabler-ship",
    title: "Прямой импорт",
    text: "Работаем напрямую с фабриками-производителями, минуя посредников",
  },
  {
    icon: "i-tabler-truck-delivery",
    title: "Отлаженная логистика",
    text: "Быстрая и надежная доставка товаров со складов в любую точку России",
  },
  {
    icon: "i-tabler-file-text",
    title: "Прямые контракты",
    text: "Официальные контракты с ведущими производителями тканей",
  },
  {
    icon: "i-tabler-building-factory-2",
    title: "Сотрудничество с фабриками",
    text: "Партнерство с лучшими фабриками текстильной промышленности",
  },
  {
    icon: "i-tabler-certificate",
    title: "Только оригинальная продукция",
    text: "Гарантируем подлинность всех поставляемых тканей и материалов",
  },
  {
    icon: "i-tabler-shield-check",
    title: "Гарантия качества",
    text: "Контроль качества на всех этапах от производства до поставки",
  },
  {
    icon: "i-tabler-moneybag",
    title: "Лучшие цены",
    text: "Конкурентные цены благодаря прямым поставкам и оптимизации расходов",
  },
];
