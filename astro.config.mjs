import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "@unocss/astro";
// Relative on purpose: the `#/` alias does not resolve in the config.
import { sitemapAlias, sitemapExclude } from "./src/core/seo/sitemap.ts";
import { htaccessIntegration } from "./src/core/seo/htaccess.ts";

// https://astro.build/config
// Static output with trailing slashes: every page is a directory with an index.html,
// which any web server serves with `root` and `index index.html` alone.
export default defineConfig({
  output: "static",
  site: "https://tkani-nortex.ru",
  trailingSlash: "always",
  build: {
    format: "directory",
    assets: "_astro",
  },
  integrations: [
    UnoCSS(),
    // The fallback pages (…/item/) are not indexed, so they stay out of the sitemap.
    sitemap({ filter: sitemapExclude(["/item/"]) }),
    // A stock web server serves /sitemap.xml, not the index.
    sitemapAlias(),
    // The hosting serves the HTML with Apache: its 404 page and the old site's addresses (src/core/seo/htaccess.ts).
    htaccessIntegration(),
  ],
});
