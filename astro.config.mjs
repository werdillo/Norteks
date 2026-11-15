import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import UnoCSS from "@unocss/astro";

// https://astro.build/config
// Static output: every page is a file in dist/, served by nginx (see deploy/).
export default defineConfig({
  output: "static",
  site: "https://tkani-nortex.ru",
  trailingSlash: "never",
  build: {
    format: "directory",
    assets: "_astro",
  },
  integrations: [
    UnoCSS(),
    // The shells of the data pages (under /shell/) are not pages of their own: they
    // are left out of the sitemap.
    sitemap({ filter: (page) => !page.includes("/shell/") }),
  ],
});
