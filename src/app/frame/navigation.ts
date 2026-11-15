import type { ImageMetadata } from "astro";
import aboutIcon from "../assets/icons/mobile/about.svg";
import blogIcon from "../assets/icons/mobile/blog.svg";
import cleaningIcon from "../assets/icons/mobile/cleaning.svg";
import furnitureIcon from "../assets/icons/mobile/furniture.svg";
import textileIcon from "../assets/icons/mobile/textile.svg";

export interface NavItem {
  href: string;
  text: string;
  /** The item is the current one when the path contains one of these. */
  match: string[];
}

export interface MobileNavItem extends NavItem {
  icon: ImageMetadata;
}

/** Links of the header bar. */
export const headerNav: NavItem[] = [
  { href: "/textile/", text: "Коллекции", match: ["/textile", "/collection", "/product"] },
  { href: "/furniture/", text: "Фурнитура", match: ["/furniture"] },
  { href: "/blog/", text: "Блог", match: ["/blog", "/post"] },
  { href: "/cleaning/", text: "Как очистить ткань", match: ["/cleaning"] },
  { href: "/contacts/", text: "Контакты", match: ["/contacts"] },
  { href: "/about-us/", text: "О нас", match: ["/about-us"] },
];

/** Tabs of the mobile menu at the bottom of the screen. */
export const mobileNav: MobileNavItem[] = [
  { href: "/textile/", text: "Коллекции", icon: textileIcon, match: ["/textile", "/collection", "/product"] },
  { href: "/cleaning/", text: "Уход", icon: cleaningIcon, match: ["/cleaning"] },
  { href: "/furniture/", text: "Фурнитура", icon: furnitureIcon, match: ["/furniture"] },
  { href: "/blog/", text: "Блог", icon: blogIcon, match: ["/blog", "/post"] },
  { href: "/about-us/", text: "О нас", icon: aboutIcon, match: ["/about-us"] },
];

/** Whether an item is the current page, judged by the request path. */
export const isCurrent = (item: NavItem, path: string): boolean =>
  item.match.some((part) => path.includes(part));
