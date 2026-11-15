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
