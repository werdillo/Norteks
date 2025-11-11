import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server", // SSR mode
  adapter: vercel(),
  integrations: [solidJs()],
  site: "https://tkani-nortex.ru",
  trailingSlash: "never",
  build: {
    format: "directory",
    assets: "_astro",
  },
});
