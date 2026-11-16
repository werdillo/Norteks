/**
 * The HTML of a post as the page shows it. Editors write it in PocketBase; its images are files of the
 * post's `content_images` field, linked by URL. Each image is loaded lazily and gets the post's title as
 * its alt text when the editor left it empty.
 */
export function postContent(html: string, title: string): string {
  const alt = title.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return html.replace(/<img\b([^>]*)>/gi, (_tag, attributes: string) => {
    let rest = attributes.replace(/\s\/$/, "");
    if (!/\sloading=/i.test(rest)) rest += ' loading="lazy"';
    if (!/\sdecoding=/i.test(rest)) rest += ' decoding="async"';
    if (/\salt=(""|'')/i.test(rest)) rest = rest.replace(/\salt=(""|'')/i, ` alt="${alt}"`);
    else if (!/\salt=/i.test(rest)) rest += ` alt="${alt}"`;
    return `<img${rest}>`;
  });
}
