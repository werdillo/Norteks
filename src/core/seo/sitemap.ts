import type { AstroIntegration } from "astro";

/**
 * Copies the sitemap index's first file to a name a stock web server serves:
 * `sitemap-0.xml` to `sitemap.xml`. Used by astro.config.mjs.
 */
export function sitemapAlias(from = "sitemap-0.xml", to = "sitemap.xml"): AstroIntegration {
  return {
    name: "sitemap-alias",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const { copyFile } = await import("node:fs/promises");
        await copyFile(new URL(from, dir), new URL(to, dir));
      },
    },
  };
}

/**
 * A page filter for @astrojs/sitemap: leaves out every page whose address contains one of
 * `paths`, e.g. `sitemapExclude(["/item/"])` for the fallback pages.
 */
export function sitemapExclude(paths: string[]): (page: string) => boolean {
  return (page) => !paths.some((path) => page.includes(path));
}
