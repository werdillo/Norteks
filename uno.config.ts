import { defineConfig, presetIcons, presetWind4, type Variant } from "unocss";

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

/** A text style of src/components/typography/typography.css, as a shortcut. */
const textStyle = (style: string) =>
  `[font-family:var(--text-${style}-family)] [font-size:var(--text-${style}-size)] [font-weight:var(--text-${style}-weight)] [line-height:var(--text-${style}-line-height)]`;

export default defineConfig({
  presets: [
    // The site has its own reset (the browser defaults plus main.css), so the
    // preset's preflight is off: an unstyled element must look as it did before.
    presetWind4({ preflights: { reset: false } }),
    // Icons are Tabler, drawn from @iconify-json/tabler; a box names one as `i-tabler-…`.
    presetIcons({
      scale: 1,
      extraProperties: { display: "inline-block", "vertical-align": "middle" },
    }),
  ],
  variants: [siteBreakpoint],
  // The tokens in src/app/styles/tokens.css, exposed as utilities. The keys
  // follow presetWind4's namespaces: `radius`, `container` (max-w-*), `font`
  // and `spacing` (sizes and margins).
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
      "on-dark-muted": "var(--color-on-dark-muted)",
      "on-dark-faint": "var(--color-on-dark-faint)",
      menu: "var(--color-menu)",
      heading: "var(--color-heading)",
      copy: "var(--color-copy)",
      muted: "var(--color-muted)",
      placeholder: "var(--color-placeholder)",
      divider: "var(--color-divider)",
      line: "var(--color-line)",
      "line-strong": "var(--color-line-strong)",
      hairline: "var(--color-hairline)",
      rule: "var(--color-rule)",
      frame: "var(--color-frame)",
      field: "var(--color-field)",
      track: "var(--color-track)",
      accent: "var(--color-accent)",
      gold: "var(--color-gold)",
      note: "var(--color-note)",
      highlight: "var(--color-highlight)",
      "highlight-soft": "var(--color-highlight-soft)",
      black: "var(--color-black)",
    },
    font: {
      body: "var(--typeface-body)",
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
  // The matrix of text styles, one definition in typography.css: `text-h1` ... `text-p3`.
  // Components use these classes; the sizes themselves are the variables.
  shortcuts: {
    "text-h1": textStyle("h1"),
    "text-h2": textStyle("h2"),
    "text-h3": textStyle("h3"),
    "text-h4": textStyle("h4"),
    "text-h5": textStyle("h5"),
    "text-h6": textStyle("h6"),
    "text-p1": textStyle("p1"),
    "text-p2": textStyle("p2"),
    "text-p3": textStyle("p3"),
    // Box shadows as shortcuts: presetWind4's own shadow utility layers ring and
    // inset shadows, which would change the computed value of the site's shadows.
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
