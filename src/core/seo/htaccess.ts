import type { AstroIntegration } from "astro";

/**
 * The .htaccess of the built site, for the Apache that serves the HTML on the hosting
 * (nginx in front, ISPmanager). It answers a missing address with the site's 404 page and
 * sends the addresses of the old site (before 2.0) to their pages, with a 301:
 *
 *   /collection?name=<type>     →  /textile/<type>/
 *   /product?name=<collection>  →  /textile/<type>/<collection>/
 *   /post?name=<post>           →  /post/<post>/
 *
 * A name that has no page, or no name, goes to the section (/textile/, /blog/).
 */
export interface BuiltPaths {
  types: string[];
  collections: { type: string; path: string }[];
  posts: string[];
}

/** A path as a browser writes it in an address: every byte outside A–Z a–z 0–9 - _ . ~ percent-encoded. */
const encode = (path: string) => encodeURIComponent(path).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

/** The condition `name=<path>` in the query: the encoded form, a space also as `+`; NC ignores the case of the hex digits. */
function nameCondition(path: string): string {
  const pattern = encode(path).replace(/[.]/g, "\\.").replace(/%20/g, "(?:%20|\\+)");
  return `RewriteCond %{QUERY_STRING} (^|&)name=${pattern}(&|$) [NC]`;
}

/**
 * Apache sits behind nginx and sees plain http, so a relative target would send the visitor to
 * http:// and nginx would redirect once more. The targets name https and the host themselves.
 */
const HTTPS = "https://%{HTTP_HOST}";

function redirect(from: string, path: string, to: string): string[] {
  // The `?` at the end drops the old query; NE keeps the encoded target as it is.
  return [nameCondition(path), `RewriteRule ^${from}/?$ ${HTTPS}${to}? [R=301,L,NE]`];
}

export function htaccess(paths: BuiltPaths): string {
  const lines = [
    "# Made by the build (src/core/seo/htaccess.ts): do not edit on the server.",
    "ErrorDocument 404 /404.html",
    "",
    "RewriteEngine On",
    "",
    "# A folder without its slash (/about-us): one redirect, straight to https (Apache's own goes to http).",
    "RewriteCond %{REQUEST_FILENAME} -d",
    `RewriteRule ^(.*[^/])$ ${HTTPS}/$1/ [R=301,L]`,
    "",
    "# The old site's addresses, to their pages.",
    ...paths.types.flatMap((type) => redirect("collection", type, `/textile/${encode(type)}/`)),
    ...paths.collections.flatMap((c) => redirect("product", c.path, `/textile/${encode(c.type)}/${encode(c.path)}/`)),
    ...paths.posts.flatMap((post) => redirect("post", post, `/post/${encode(post)}/`)),
    "",
    "# An old address whose record has no page: its section.",
    `RewriteRule ^(collection|product)/?$ ${HTTPS}/textile/? [R=301,L]`,
    `RewriteRule ^post/?$ ${HTTPS}/blog/? [R=301,L]`,
  ];
  return `${lines.join("\n")}\n`;
}

/** Writes dist/.htaccess from dist/paths.json after the build. Used by astro.config.mjs. */
export function htaccessIntegration(): AstroIntegration {
  return {
    name: "htaccess",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const { readFile, writeFile } = await import("node:fs/promises");
        const paths = JSON.parse(await readFile(new URL("paths.json", dir), "utf8")) as BuiltPaths;
        await writeFile(new URL(".htaccess", dir), htaccess(paths));
      },
    },
  };
}
