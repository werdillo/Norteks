import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server", // SSR mode
  adapter: node({
    mode: "standalone",
  }),
  integrations: [solidJs()],
  site: "https://tkani-nortex.ru",
  trailingSlash: "never",
  build: {
    format: "directory",
    assets: "_astro",
  },
});
