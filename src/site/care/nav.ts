import type { MobileNavItem, NavItem } from "#/core/nav";

export const headerNav: NavItem = { href: "/cleaning/", text: "Как очистить ткань", match: ["/cleaning"] };

export const mobileNav: MobileNavItem = { ...headerNav, text: "Уход", icon: "i-tabler-spray" };
