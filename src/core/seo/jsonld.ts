/**
 * schema.org objects built at build time, for the `<script type="application/ld+json">`
 * a page carries in its HTML. Search engines that run no JavaScript (Yandex mostly)
 * read only these; the browser helpers in `browser.ts` refresh them on the client.
 */

/** A crumb: its name and its path on the site. */
export type Crumb = [name: string, path: string];

/** The JSON of a ld+json script. `<` is escaped, so no value can close the tag. */
export function jsonLd(value: Record<string, unknown>): string {
  return JSON.stringify({ "@context": "https://schema.org", ...value }).replace(/</g, "\\u003c");
}

/** A BreadcrumbList from the home page down to the current one. */
export function breadcrumbLd(trail: Crumb[], site: URL | string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(path, site).href,
    })),
  };
}

/** A Product: a fabric collection. Empty values are left out. */
export function productLd(product: { name: string; description?: string; image?: string; brand: string }) {
  return {
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: product.image || undefined,
    brand: { "@type": "Brand", name: product.brand },
  };
}

/** An Article: a blog post. Empty values are left out. */
export function articleLd(article: {
  headline: string;
  description?: string;
  image?: string;
  url: string;
  published?: string;
  modified?: string;
  publisher: string;
}) {
  return {
    "@type": "Article",
    headline: article.headline,
    description: article.description || undefined,
    image: article.image || undefined,
    mainEntityOfPage: article.url,
    datePublished: article.published || undefined,
    dateModified: article.modified || undefined,
    publisher: { "@type": "Organization", name: article.publisher },
  };
}
