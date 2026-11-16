import type { MobileNavItem, NavItem } from "#/core/nav";

export const headerNav: NavItem = { href: "/about-us/", text: "О нас", match: ["/about-us"] };

export const mobileNav: MobileNavItem = { ...headerNav, icon: "i-tabler-info-circle" };
