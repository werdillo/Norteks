import { describe, expect, it } from "vitest";
import { postContent } from "../content";

describe("postContent", () => {
  it("loads images lazily and fills an empty alt with the title", () => {
    expect(postContent('<p>a</p><img src="x.jpg" alt="" width="236">', 'Комо "2025"')).toBe(
      '<p>a</p><img src="x.jpg" alt="Комо &quot;2025&quot;" width="236" loading="lazy" decoding="async">',
    );
  });

  it("keeps the editor's own alt and loading", () => {
    expect(postContent('<img src="x.jpg" alt="Ткань" loading="eager" />', "T")).toBe(
      '<img src="x.jpg" alt="Ткань" loading="eager" decoding="async">',
    );
  });

  it("leaves HTML without images as it is", () => {
    expect(postContent("<p>text</p>", "T")).toBe("<p>text</p>");
  });
});
