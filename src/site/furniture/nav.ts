import type { MobileNavItem, NavItem } from "#/core/nav";

export const headerNav: NavItem = { href: "/furniture/", text: "Фурнитура", match: ["/furniture"] };

export const mobileNav: MobileNavItem = { ...headerNav, icon: "i-tabler-armchair" };
