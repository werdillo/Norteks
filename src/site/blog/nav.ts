import type { MobileNavItem, NavItem } from "#/core/nav";

export const headerNav: NavItem = { href: "/blog/", text: "Блог", match: ["/blog", "/post"] };

export const mobileNav: MobileNavItem = { ...headerNav, icon: "i-tabler-news" };
