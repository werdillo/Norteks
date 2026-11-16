import type { MobileNavItem, NavItem } from "#/core/nav";

export const headerNav: NavItem = {
  href: "/textile/",
  text: "Коллекции",
  match: ["/textile", "/collection", "/product"],
};

export const mobileNav: MobileNavItem = { ...headerNav, icon: "i-tabler-texture" };
