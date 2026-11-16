/**
 * Page metadata set by the browser once a record is loaded. The static page
 * carries the site's defaults; these replace them for the page the record is about.
 */

const SITE: string = import.meta.env.SITE ?? location.origin;

const setMeta = (selector: string, value: string | undefined): void => {
  if (value === undefined) return;
  document.querySelector(selector)?.setAttribute("content", value);
};

/**
 * Title, description, canonical URL, Open Graph and Twitter values of the current page.
 * `canonicalPath` names the page's own address when the current one is a fallback.
 */
export function setPageMeta(meta: { title: string; description?: string; image?: string; canonicalPath?: string }): void {
  const url = new URL(meta.canonicalPath ?? location.pathname, SITE).href;
  document.title = meta.title;
  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[name="twitter:title"]', meta.title);
  setMeta('meta[name="twitter:description"]', meta.description);
  if (meta.image) {
    setMeta('meta[property="og:image"]', meta.image);
    setMeta('meta[name="twitter:image"]', meta.image);
  }
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
}

/** Writes a JSON-LD block with the given id, replacing an earlier one. */
export function setJsonLd(id: string, data: Record<string, unknown>): void {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.append(script);
  }
  script.textContent = JSON.stringify({ "@context": "https://schema.org", ...data });
}

/** A BreadcrumbList of `[name, path]` pairs, from the home page down to the current one. */
export function setBreadcrumb(trail: [string, string][]): void {
  setJsonLd("ld-breadcrumb", {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(path, SITE).href,
    })),
  });
}
