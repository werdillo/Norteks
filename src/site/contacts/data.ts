export interface Phone {
  /** The number as the tel: link takes it. */
  number: string;
  /** The number as it is printed. */
  display: string;
}

/** The phone lines of the company, in display order. */
export const phones: Phone[] = [
  { number: "+7(495)2213316", display: "+7 (495) 221 - 33 - 16" },
  { number: "+7(903)2213316", display: "+7 (903) 221 - 33 - 16" },
];

/** The e-mail addresses of the company, in display order. */
export const emails: string[] = ["firma.nortex@gmail.com", "info@tkani-nortex.ru"];

/** The company's address, as the contacts page, the footer and the schema show it. */
export const address = {
  city: "Москва",
  lines: ["Дмитровское шоссе 71Б", "Бизнес-центр 7ONE, ООО \"Нортекс\""],
  /** The full line the map and the schema use. */
  full: "127238 г. Москва, Дмитровское шоссе 71Б, Западное Дегунино, Северный (САО), Бизнес-Центр \"ONE\"",
  /** The postal index, the first number of `full`. */
  postalCode: "127238",
  /** The point the map centres on: the `ll=` of `mapUrl`, which Yandex writes longitude first. */
  geo: { latitude: 55.857771, longitude: 37.541722 },
  mapUrl:
    "https://yandex.ru/map-widget/v1/?ll=37.541722,55.857771&z=16&text=Нортекс%2C%20магазин%20тканей%2C%20Москва%2C%20Дмитровское%20шоссе%2C%2071Б",
};
