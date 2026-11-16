/** The rules of a robots.txt: paths for every crawler (`User-agent: *`), and where the sitemap is. */
export interface RobotsOptions {
  /** Paths crawlers may fetch, as `Allow` lines. */
  allow?: string[];
  /** Paths crawlers may not fetch, as `Disallow` lines. */
  disallow?: string[];
  /** Absolute address of the sitemap, as a `Sitemap` line. */
  sitemap?: string;
  /** Preferred host, as a `Host` line (Yandex reads it; other crawlers ignore it). */
  host?: string;
}

/** The text of a robots.txt: one group for every crawler, then the sitemap, with a trailing newline. */
export function robotsTxt(opts: RobotsOptions): string {
  const lines = ["User-agent: *"];
  for (const path of opts.allow ?? []) lines.push(`Allow: ${path}`);
  for (const path of opts.disallow ?? []) lines.push(`Disallow: ${path}`);
  if (opts.host) lines.push(`Host: ${opts.host}`);
  if (opts.sitemap) lines.push("", `Sitemap: ${opts.sitemap}`);
  return `${lines.join("\n")}\n`;
}
