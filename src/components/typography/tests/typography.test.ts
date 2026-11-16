import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

/**
 * The type matrix: nine styles (H1-H6, P1-P3), defined in src/components/typography.
 * Outside the matrix, nothing sets a font size, weight or line height: a screen uses
 * a component or a `text-<style>` class. The global styles (app/styles) and the
 * tests are the only other places allowed to name these properties.
 */
const SRC = resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const ALLOWED = ["components/typography/", "app/styles/", "app/tests/"];

/** Text outside the matrix. Each entry names a line by a fragment of it; the reason is in components/typography/README.md. */
const EXCEPTIONS: { file: string; fragment: string; reason: string }[] = [
  {
    file: "site/catalog/ui/TypeCollections.astro",
    fragment: "min-1024:text-[24px]",
    reason: "fabric type description, 24px from 1024px (P1 below), the lead of the type page",
  },
  {
    file: "components/slider/Slider.astro",
    fragment: "text-[80px]",
    reason: "hero slide title, 80px (40px up to 768px), used once per page",
  },
  {
    file: "components/image-tile/ImageTile.astro",
    fragment: "font-size: 36px",
    reason: "image tile caption, 36px, laid over the picture",
  },
  {
    file: "components/image-tile/ImageTile.astro",
    fragment: ".tile-caption { font-size: 16px; }",
    reason: "image tile caption up to 550px, 16px",
  },
];

/** Patterns of a raw font size, weight or line height written in markup, class names or CSS. */
const RAW = [
  /(?<![\w-])(?:[\w-]+:)*text-\[[\d.]/, // text-[80px]
  /(?<![\w-])(?:[\w-]+:)*text-(?:\d+|xs|sm|base|lg|xl|[2-9]xl)(?![\w-])/, // text-14, text-sm
  /(?<![\w-])(?:[\w-]+:)*font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\[)/,
  /(?<![\w-])(?:[\w-]+:)*leading-/,
  /\b(?:font-size|font-weight|line-height)\s*:/,
];

const SCANNED = /\.(astro|ts|tsx|css)$/;

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return SCANNED.test(name) ? [path] : [];
  });
}

/** Raw type settings outside the allowed places, and which exceptions matched. */
function scan() {
  const violations: string[] = [];
  const matched = new Set<number>();
  for (const file of files(SRC)) {
    const path = relative(SRC, file).split(sep).join("/");
    if (ALLOWED.some((area) => path.startsWith(area))) continue;
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, index) => {
        if (!RAW.some((pattern) => pattern.test(line))) return;
        const exception = EXCEPTIONS.findIndex((e) => e.file === path && line.includes(e.fragment));
        if (exception >= 0) matched.add(exception);
        else violations.push(`${path}:${index + 1}: ${line.trim()}`);
      });
  }
  return { violations, matched };
}

test("nothing outside the type matrix sets a font size, weight or line height", () => {
  expect(scan().violations).toEqual([]);
});

test("every exception still matches a raw type setting (stale entries fail)", () => {
  const { matched } = scan();
  const stale = EXCEPTIONS.filter((_, index) => !matched.has(index)).map((e) => `${e.file}: ${e.fragment}`);
  expect(stale).toEqual([]);
});
