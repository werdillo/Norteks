import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs()],
  site: "https://tkani-nortex.ru",
  trailingSlash: "never",
  build: {
    format: "directory",
    assets: "_astro",
  },
  compressHTML: true,
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          entryFileNames: "_astro/[name].[hash].js",
          chunkFileNames: "_astro/[name].[hash].js",
          assetFileNames: "_astro/[name].[hash][extname]",
        },
      },
    },
  },
});
