import { getImageUrl } from "#/core/pocketbase";
import { articleLd } from "#/core/seo";
import type { BlogPost } from "./api";

const SHORT = 50;
const LIMIT = 160;
const LEAD = "статья блога Нортекс: декоративные ткани для мебели и штор оптом.";
const LEAD_ALONE = "Статья блога Нортекс: декоративные ткани для мебели и штор оптом.";

/**
 * The post's description as plain text for a meta tag. Its own description when it is long enough,
 * else a sentence built from the title; at most 160 characters.
 */
export function postDescription(post: { title?: string; description?: unknown }): string {
  const title = String(post.title ?? "").trim();
  const own = String(post.description ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const text = own.length >= SHORT ? own : title ? `${title} — ${LEAD}` : LEAD_ALONE;
  return text.length <= LIMIT ? text : `${text.slice(0, LIMIT - 1).replace(/\s+\S*$/, "")}…`;
}

/** An ISO 8601 date-time from a PocketBase timestamp ("2024-06-25 14:08:04.494Z"); undefined when it is not one. */
export function isoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value.replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

/** The Article of a post. The URL is the post's own address, absolute on `site`. */
export function postArticle(post: BlogPost, site: URL | string) {
  return articleLd({
    headline: post.title,
    description: postDescription(post),
    image: getImageUrl(post),
    url: new URL(`/post/${post.path}/`, site).href,
    published: isoDate(post.created),
    modified: isoDate(post.updated),
    publisher: "Нортекс",
  });
}
