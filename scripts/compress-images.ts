#!/usr/bin/env bun
/**
 * Shrinks the source images of the repository in place.
 *
 *   bun scripts/compress-images.ts            # report only: what would shrink and by how much
 *   bun scripts/compress-images.ts --write    # replace the files that got smaller
 *
 * Astro already makes small AVIF/WebP/JPEG variants of every image it imports, so this
 * is not about what a visitor downloads through `<Image>`: it trims the originals — the
 * repository, the build time, and every file served as is (from `public/`, or a raw
 * `import x from "…jpg"` used by its `.src`).
 *
 * - JPEG: re-encoded with mozjpeg at quality 82, metadata dropped, orientation applied.
 * - PNG: lossless — maximum zlib effort, adaptive filtering. No palette: screenshots and
 *   photos saved as PNG would band.
 * - Images under `src/` are scaled down to fit 2560×3840: the sites generate at most 1920px
 *   wide variants, so a portrait photo keeps 1920px of width and nothing is ever enlarged.
 *   Files under `public/` keep their size: they are served as they are (a map to download,
 *   an og:image of an exact size), so only their encoding is tightened.
 * - A file is replaced only when the result is at least 10% smaller.
 *
 * sharp comes with Astro (it is the image service), so no extra dependency is needed.
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

import sharp from "sharp";

const ROOTS = ["src", "public"];
const SKIP = new Set(["node_modules", "dist", ".astro", ".git"]);
const MAX = { width: 2560, height: 3840 };
const MIN_GAIN = 0.1;
const write = process.argv.includes("--write");

async function* images(dir: string): AsyncGenerator<string> {
  let names: string[];
  try {
    names = await readdir(dir);
  } catch {
    return;
  }
  for (const name of names) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) yield* images(path);
    else if (/\.(jpe?g|png)$/i.test(name)) yield path;
  }
}

async function shrink(path: string, input: Buffer): Promise<Buffer> {
  let image = sharp(input, { failOn: "none" }).rotate();
  if (!path.startsWith("public")) {
    image = image.resize({ ...MAX, fit: "inside", withoutEnlargement: true });
  }
  return extname(path).toLowerCase() === ".png"
    ? image
        .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
        .toBuffer()
    : image.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`;
let before = 0;
let after = 0;
let changed = 0;

for (const root of ROOTS) {
  for await (const path of images(root)) {
    const input = await readFile(path);
    const output = await shrink(path, input);
    const gain = 1 - output.length / input.length;
    if (gain < MIN_GAIN) continue;
    before += input.length;
    after += output.length;
    changed++;
    console.log(
      `${kb(input.length).padStart(8)} → ${kb(output.length).padStart(8)}  -${Math.round(gain * 100)}%  ${relative(".", path)}`,
    );
    if (write) await writeFile(path, output);
  }
}

console.log(
  `\n${changed} file(s): ${kb(before)} → ${kb(after)} (-${kb(before - after)})${write ? "" : " — dry run, pass --write to apply"}`,
);
