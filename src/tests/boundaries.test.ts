import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

/**
 * The layers of the site, checked against the imports of every `src` file:
 *
 *   core ← components ← site ← app ← pages
 *
 * `site` is one domain: its boxes never import each other's insides, and a box is
 * reached from outside only through its `index.ts` door. A matrix's `shared/` is
 * read by its own boxes alone.
 */
const SRC = resolve(fileURLToPath(new URL("..", import.meta.url)));

const DOMAINS = ["site"];
const ALLOWED: Record<string, string[]> = {
  core: [],
  components: ["core"],
  site: ["core", "components"],
  app: ["core", "components", ...DOMAINS],
  pages: ["core", "components", "app", ...DOMAINS],
};

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(ts|tsx|astro)$/.test(name) ? [path] : [];
  });
}

const posix = (path: string) => path.split(sep).join("/");
const rel = (path: string) => posix(relative(SRC, path));

/** Static and dynamic module specifiers of a file, as paths under `src` (relative to it). */
function imports(file: string): { spec: string; target: string }[] {
  const text = readFileSync(file, "utf8");
  return [...text.matchAll(/(?:from|import)\s*\(?\s*['"]([^'"\n]+)['"]/g)].flatMap(([, spec]) => {
    const base = spec!.startsWith("#/")
      ? join(SRC, spec!.slice(2))
      : spec!.startsWith(".")
        ? resolve(dirname(file), spec!)
        : undefined;
    if (!base) return [];
    const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}.astro`, join(base, "index.ts"), join(base, "index.tsx")];
    const target = candidates.find((c) => existsSync(c) && statSync(c).isFile());
    return target ? [{ spec: spec!, target: rel(target) }] : [];
  });
}

/** The box a `src`-relative path belongs to, if any. `shared` is not a box. */
function boxOf(path: string): string | undefined {
  const s = path.split("/");
  if (s[0] === "components" && s.length > 2) return `components/${s[1]}`;
  if (DOMAINS.includes(s[0]!) && s.length > 2 && s[1] !== "shared") return `${s[0]}/${s[1]}`;
  return undefined;
}

const all = files(SRC).map((file) => ({ file, path: rel(file), imports: imports(file) }));

test("each layer imports only the layers it may", () => {
  const violations: string[] = [];
  for (const { path, imports: list } of all) {
    const area = path.split("/")[0]!;
    const allowed = ALLOWED[area];
    if (!allowed) continue;
    for (const { spec, target } of list) {
      const to = target.split("/")[0]!;
      if (to !== area && !allowed.includes(to)) violations.push(`${path} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

test("a box is reached from outside only through its door (index.ts)", () => {
  const violations: string[] = [];
  for (const { path, imports: list } of all) {
    for (const { spec, target } of list) {
      const box = boxOf(target);
      if (!box || box === boxOf(path)) continue;
      if (target !== `${box}/index.ts`) violations.push(`${path} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

test("a domain's shared/ is imported by that domain only", () => {
  const violations: string[] = [];
  for (const { path, imports: list } of all) {
    for (const { spec, target } of list) {
      const domain = DOMAINS.find((d) => target.startsWith(`${d}/shared/`));
      if (domain && !path.startsWith(`${domain}/`)) violations.push(`${path} → ${spec}`);
    }
  }
  expect(violations).toEqual([]);
});

test("every layer and every box has its README, and every box its door", () => {
  const missing: string[] = [];
  for (const layer of ["core", "components", "app", ...DOMAINS]) {
    if (!existsSync(join(SRC, layer, "README.md"))) missing.push(`${layer}/README.md`);
  }
  for (const domain of DOMAINS) {
    for (const name of readdirSync(join(SRC, domain))) {
      const dir = join(SRC, domain, name);
      if (name === "shared" || !statSync(dir).isDirectory()) continue;
      for (const doc of ["index.ts", "README.md"]) {
        if (!existsSync(join(dir, doc))) missing.push(`${domain}/${name}/${doc}`);
      }
    }
  }
  const components = join(SRC, "components");
  for (const name of readdirSync(components)) {
    const dir = join(components, name);
    if (statSync(dir).isDirectory() && !existsSync(join(dir, "index.ts"))) missing.push(`components/${name}/index.ts`);
  }
  expect(missing).toEqual([]);
});
