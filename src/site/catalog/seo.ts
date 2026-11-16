import type { RecordModel } from "pocketbase";
import type { Crumb } from "#/core/seo";

/** The meta description's length limit, and the shortest description the record's own text may have. */
const LIMIT = 160;
const SHORT = 50;

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  laquo: "«",
  raquo: "»",
  mdash: "—",
  ndash: "–",
};

/** The text of an HTML fragment: tags out, entities decoded, spaces collapsed. */
export function plainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
      if (entity[0] === "#") {
        const code = entity[1] === "x" || entity[1] === "X" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
        return String.fromCodePoint(code);
      }
      return ENTITIES[entity.toLowerCase()] ?? match;
    })
    .replace(/\s+/g, " ")
    .trim();
}

/** At most 160 characters, cut at a word boundary. */
function clip(text: string): string {
  if (text.length <= LIMIT) return text;
  const cut = text.slice(0, LIMIT - 1);
  const word = cut.lastIndexOf(" ");
  return `${(word > 0 ? cut.slice(0, word) : cut).replace(/[\s,;:—–-]+$/, "")}…`;
}

/** The record's own text when it is long enough, else the fallback sentence; never longer than 160 characters. */
function description(own: unknown, fallback: string): string {
  const text = plainText(String(own ?? ""));
  return clip(text.length < SHORT ? fallback : text);
}

/** The first category of a collection (the relation may come as one record or a list). */
export function categoryOf(collection: RecordModel): RecordModel | undefined {
  return ([] as RecordModel[]).concat(collection.expand?.category ?? [])[0];
}

/** Meta description of a type's page. */
export const typeDescription = (category: RecordModel): string =>
  description(
    category.description,
    `Ткани ${category.name} — коллекции оптом от Нортекс, Москва. Расцветки, характеристики, фото.`,
  );

/** Meta description of a collection's page; `typeName` names the type the collection belongs to. */
export function collectionDescription(collection: RecordModel, typeName?: string): string {
  const of = typeName ? `коллекция ${typeName}` : "коллекция";
  return description(collection.description, `Ткань ${collection.name} — ${of} оптом от Нортекс, Москва. Характеристики, фото расцветок.`);
}

/** The crumbs of a type's page: home, the collections, the type. */
export const typeTrail = (type: string, name: string): Crumb[] => [
  ["Главная", "/"],
  ["Коллекции", "/textile/"],
  [name, `/textile/${type}/`],
];

/** The crumbs of a collection's page; the type's crumb is left out when the type's name is not known. */
export function collectionTrail(type: string, path: string, name: string, typeName?: string): Crumb[] {
  const trail: Crumb[] = [
    ["Главная", "/"],
    ["Коллекции", "/textile/"],
  ];
  if (typeName !== undefined) trail.push([typeName, `/textile/${type}/`]);
  trail.push([name, `/textile/${type}/${path}/`]);
  return trail;
}
