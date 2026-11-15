import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "@unocss/astro";

/** Copies the sitemap to /sitemap.xml: a stock web server serves that name, not the index. */
const sitemapAlias = {
  name: "sitemap-alias",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      const { copyFile } = await import("node:fs/promises");
      await copyFile(new URL("sitemap-0.xml", dir), new URL("sitemap.xml", dir));
    },
  },
};

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
    sitemap({ filter: (page) => !page.includes("/item/") }),
    sitemapAlias,
  ],
});
