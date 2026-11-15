// Serves dist/ with the same rules as deploy/nginx.conf, for a local check:
//   bun run build && bun run preview   ->  http://localhost:4321
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.env.PORT ?? 4321);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

const isFile = (path) => existsSync(path) && statSync(path).isFile();

function resolveFile(pathname) {
  if (pathname === "/sitemap.xml") return join(root, "sitemap-index.xml");
  const file = join(root, pathname);
  if (isFile(file)) return file;
  if (existsSync(join(file, "index.html"))) return join(file, "index.html");
  if (isFile(`${file}.html`)) return `${file}.html`;
  return undefined;
}

createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  let { pathname } = url;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    response.writeHead(301, { Location: pathname.slice(0, -1) + url.search });
    response.end();
    return;
  }
  // Direct requests to the shells are 404, as `location ^~ /shell/ { internal; }` in deploy/nginx.conf.
  if (pathname.startsWith("/shell/")) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  // The shells of the data pages, as deploy/nginx.conf rewrites them (internally, the URL stays).
  if (/^\/textile\/[^/]+\/[^/]+$/.test(pathname)) pathname = "/shell/textile-collection/index.html";
  else if (/^\/textile\/[^/]+$/.test(pathname)) pathname = "/shell/textile-type/index.html";
  else if (/^\/post\/[^/]+$/.test(pathname)) pathname = "/shell/post/index.html";

  const file = resolveFile(pathname);
  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  const headers = { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" };
  headers["Cache-Control"] = pathname.startsWith("/_astro/") ? "public, max-age=31536000, immutable" : "no-cache";
  response.writeHead(200, headers);
  response.end(readFileSync(file));
}).listen(port, () => console.log(`serving dist on http://localhost:${port}`));
