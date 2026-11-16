import type { APIRoute } from "astro";
import { robotsTxt } from "#/core/seo/robots";

// /_astro/ is not disallowed: the bundles must stay crawlable, the pages load their records in the browser.
// The fallback pages (…/item/) are not disallowed either: their noindex tag is what keeps them out.
export const GET: APIRoute = ({ site }) =>
  new Response(
    robotsTxt({
      allow: ["/"],
      disallow: ["/api/"],
      sitemap: new URL("sitemap.xml", site).href,
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
