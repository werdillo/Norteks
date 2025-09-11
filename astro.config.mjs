import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs()],
  site: 'https://tkani-nortex.ru',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  compressHTML: true
});