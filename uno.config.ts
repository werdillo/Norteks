import { defineConfig, presetWind4, type Variant } from "unocss";

/**
 * Breakpoints of the site, in px. The site's @media rules are inclusive
 * (`max-width: 768px` matches 768px), while UnoCSS's own `max-*` stops at
 * `width < 768px`, so the variants below are generated from this list instead.
 *
 *   max-768:text-12   ->  @media (max-width: 768px) { ... }
 *   min-1200:hidden   ->  @media (min-width: 1200px) { ... }
 */
const BREAKPOINTS = [380, 385, 550, 700, 768, 1024, 1200, 1300, 1400, 1500, 1600, 1640];

const siteBreakpoint: Variant = {
  name: "site-breakpoint",
  match(matcher) {
    const found = matcher.match(/^(max|min)-(\d+):/);
    if (!found) return;
    const [prefix, value] = [found[1]!, Number(found[2])];
    const index = BREAKPOINTS.indexOf(value);
    if (index === -1) return;
    // max-width rules: the larger breakpoint is emitted first, so the smaller
    // one wins where both apply, as the source order of the old CSS did.
    const parentOrder = prefix === "max" ? 3000 - index : 4000 + index;
    return {
      matcher: matcher.slice(found[0].length),
      handle: (input, next) =>
        next({
          ...input,
          parent: `${input.parent ? `${input.parent} $$ ` : ""}@media (${prefix}-width: ${value}px)`,
          parentOrder,
        }),
    };
  },
  multiPass: true,
};

export default defineConfig({
  presets: [
    // The site has its own reset (the browser defaults plus main.css), so the
    // preset's preflight is off: an unstyled element must look as it did before.
    presetWind4({ preflights: { reset: false } }),
  ],
  variants: [siteBreakpoint],
  // The tokens in src/app/styles/tokens.css, exposed as utilities. The keys
  // follow presetWind4's namespaces: `text` sizes, `radius`, `shadow`, `font`,
  // `container` (max-w-*) and `spacing` (sizes and margins).
  theme: {
    // One spacing unit is 1px, so `p-25` is 25px, the value the site uses.
    spacing: {
      DEFAULT: "1px",
      header: "var(--header-height)",
      "header-mobile": "var(--header-height-mobile)",
    },
    colors: {
      chrome: "var(--color-chrome)",
      surface: "var(--color-surface)",
      "on-dark": "var(--color-on-dark)",
      "on-accent": "var(--color-on-accent)",
      "on-dark-muted": "var(--color-on-dark-muted)",
      "on-dark-faint": "var(--color-on-dark-faint)",
      menu: "var(--color-menu)",
      heading: "var(--color-heading)",
      copy: "var(--color-copy)",
      "copy-soft": "var(--color-copy-soft)",
      body: "var(--color-body)",
      muted: "var(--color-muted)",
      label: "var(--color-label)",
      caption: "var(--color-caption)",
      placeholder: "var(--color-placeholder)",
      divider: "var(--color-divider)",
      line: "var(--color-line)",
      "line-strong": "var(--color-line-strong)",
      hairline: "var(--color-hairline)",
      rule: "var(--color-rule)",
      frame: "var(--color-frame)",
      field: "var(--color-field)",
      panel: "var(--color-panel)",
      track: "var(--color-track)",
      accent: "var(--color-accent)",
      gold: "var(--color-gold)",
      highlight: "var(--color-highlight)",
      "highlight-soft": "var(--color-highlight-soft)",
      cyan: "var(--color-cyan)",
      black: "var(--color-black)",
    },
    font: {
      body: "var(--typeface-body)",
      display: "var(--typeface-display)",
    },
    // Each size is a font-size with its line-height left to `leading-*`, or to normal.
    text: {
      "9": { fontSize: "var(--text-9)", lineHeight: "normal" },
      "10": { fontSize: "var(--text-10)", lineHeight: "normal" },
      "11": { fontSize: "var(--text-11)", lineHeight: "normal" },
      "12": { fontSize: "var(--text-12)", lineHeight: "normal" },
      "13": { fontSize: "var(--text-13)", lineHeight: "normal" },
      "14": { fontSize: "var(--text-14)", lineHeight: "normal" },
      "15": { fontSize: "var(--text-15)", lineHeight: "normal" },
      "16": { fontSize: "var(--text-16)", lineHeight: "normal" },
      "17": { fontSize: "var(--text-17)", lineHeight: "normal" },
      "17-6": { fontSize: "var(--text-17-6)", lineHeight: "normal" },
      "18": { fontSize: "var(--text-18)", lineHeight: "normal" },
      "19-2": { fontSize: "var(--text-19-2)", lineHeight: "normal" },
      "20": { fontSize: "var(--text-20)", lineHeight: "normal" },
      "22": { fontSize: "var(--text-22)", lineHeight: "normal" },
      "24": { fontSize: "var(--text-24)", lineHeight: "normal" },
      "26": { fontSize: "var(--text-26)", lineHeight: "normal" },
      "28": { fontSize: "var(--text-28)", lineHeight: "normal" },
      "32": { fontSize: "var(--text-32)", lineHeight: "normal" },
      "36": { fontSize: "var(--text-36)", lineHeight: "normal" },
      "40": { fontSize: "var(--text-40)", lineHeight: "normal" },
      "42": { fontSize: "var(--text-42)", lineHeight: "normal" },
      "48": { fontSize: "var(--text-48)", lineHeight: "normal" },
      "80": { fontSize: "var(--text-80)", lineHeight: "normal" },
    },
    radius: {
      field: "var(--corner-field)",
      panel: "var(--corner-panel)",
      tile: "var(--corner-tile)",
      card: "var(--corner-card)",
      pill: "var(--corner-pill)",
    },
    container: {
      wide: "var(--page-wide)",
      narrow: "var(--page-narrow)",
      offset: "var(--page-offset)",
    },
  },
  // Box shadows as shortcuts: presetWind4's own shadow utility layers ring and
  // inset shadows, which would change the computed value of the site's shadows.
  shortcuts: {
    "elevation-card": "[box-shadow:var(--elevation-card)]",
    "elevation-panel": "[box-shadow:var(--elevation-panel)]",
    "elevation-tile": "[box-shadow:var(--elevation-tile)]",
    "elevation-image": "[box-shadow:var(--elevation-image)]",
    "elevation-image-small": "[box-shadow:var(--elevation-image-small)]",
    "elevation-menu": "[box-shadow:var(--elevation-menu)]",
    "elevation-focus": "[box-shadow:var(--elevation-focus)]",
    "elevation-accent-hover": "[box-shadow:var(--elevation-accent-hover)]",
    "elevation-accent-press": "[box-shadow:var(--elevation-accent-press)]",
  },
  // @unocss/vite's default scanner skips plain `.ts`, where data.ts arrays
  // may hold utility strings; scan it too.
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|ts|mdx?|astro|elm|php|phtml|marko|html)($|\?)/],
    },
  },
});
