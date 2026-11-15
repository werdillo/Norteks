// Serves dist/ the way a stock static web server does (root + `index index.html`, nothing
// else): files as they are, directories by their index.html, and a directory requested
// without its slash is redirected to the slash form. Missing paths are 404.
//   bun run build && bun run preview   ->  http://localhost:4321
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
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

const statOf = (path) => {
  try {
    return statSync(path);
  } catch {
    return undefined;
  }
};

createServer((request, response) => {
  const { pathname, search } = new URL(request.url, "http://localhost");
  const file = resolve(join(root, decodeURIComponent(pathname)));
  if (file !== root.slice(0, -1) && !file.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  let target = file;
  let stat = statOf(target);
  if (stat?.isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { Location: `${pathname}/${search}` }).end();
      return;
    }
    target = join(target, "index.html");
    stat = statOf(target);
  }
  if (!stat?.isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": TYPES[extname(target)] ?? "application/octet-stream" });
  response.end(readFileSync(target));
}).listen(port, () => console.log(`serving dist on http://localhost:${port}`));
