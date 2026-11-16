import { expect, test } from "vitest";
import { robotsTxt } from "../robots";

test("one group for every crawler, then the sitemap, with a trailing newline", () => {
  expect(
    robotsTxt({
      allow: ["/"],
      disallow: ["/api/"],
      sitemap: "https://example.test/sitemap.xml",
    }),
  ).toBe("User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: https://example.test/sitemap.xml\n");
});

test("no sitemap line when none is given", () => {
  expect(robotsTxt({ disallow: ["/private/"] })).toBe("User-agent: *\nDisallow: /private/\n");
});

test("empty options give the group alone", () => {
  expect(robotsTxt({})).toBe("User-agent: *\n");
});

test("a host line follows the rules and comes before the sitemap", () => {
  expect(robotsTxt({ allow: ["/"], host: "example.test", sitemap: "https://example.test/sitemap.xml" })).toBe(
    "User-agent: *\nAllow: /\nHost: example.test\n\nSitemap: https://example.test/sitemap.xml\n",
  );
});
