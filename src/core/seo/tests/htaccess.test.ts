import { describe, expect, it } from "vitest";
import { htaccess } from "../htaccess";

const text = htaccess({
  types: ["velur", "Шенилл"],
  collections: [{ type: "velur", path: "Tiffany" }, { type: "Лен Хлопок", path: "Linen 2.0" }],
  posts: ["dantosc"],
});

describe("htaccess", () => {
  it("answers a missing address with the site's 404 page", () => {
    expect(text).toContain("ErrorDocument 404 /404.html");
  });

  it("sends an old type address to the type page", () => {
    expect(text).toContain("RewriteCond %{QUERY_STRING} (^|&)name=velur(&|$) [NC]\nRewriteRule ^collection/?$ https://%{HTTP_HOST}/textile/velur/? [R=301,L,NE]");
  });

  it("encodes Cyrillic names in the condition and the target", () => {
    expect(text).toContain("name=%D0%A8%D0%B5%D0%BD%D0%B8%D0%BB%D0%BB(&|$)");
    expect(text).toContain("https://%{HTTP_HOST}/textile/%D0%A8%D0%B5%D0%BD%D0%B8%D0%BB%D0%BB/?");
  });

  it("sends an old product address to its collection under its type, a space matching %20 or +", () => {
    expect(text).toContain("name=Linen(?:%20|\\+)2\\.0(&|$) [NC]\nRewriteRule ^product/?$ https://%{HTTP_HOST}/textile/%D0%9B%D0%B5%D0%BD%20%D0%A5%D0%BB%D0%BE%D0%BF%D0%BE%D0%BA/Linen%202.0/? [R=301,L,NE]");
  });

  it("adds the folder slash in one redirect, to https", () => {
    expect(text).toContain("RewriteCond %{REQUEST_FILENAME} -d\nRewriteRule ^(.*[^/])$ https://%{HTTP_HOST}/$1/ [R=301,L]");
  });

  it("sends an old post address to the post, and unknown names to the sections", () => {
    expect(text).toContain("RewriteRule ^post/?$ https://%{HTTP_HOST}/post/dantosc/? [R=301,L,NE]");
    expect(text).toContain("RewriteRule ^(collection|product)/?$ https://%{HTTP_HOST}/textile/? [R=301,L]");
    expect(text).toContain("RewriteRule ^post/?$ https://%{HTTP_HOST}/blog/? [R=301,L]");
  });
});
