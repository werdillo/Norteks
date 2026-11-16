/** A link of the header bar: where it goes, what it says, and the paths that make it current. */
export interface NavItem {
  href: string;
  text: string;
  match: string[];
}

/** A tab of the mobile menu: a header link with the UnoCSS icon class of its tab. */
export interface MobileNavItem extends NavItem {
  /** An UnoCSS icon class, such as `i-tabler-texture`. */
  icon: string;
}

/** Whether an item is the current page, judged by the request path. */
export const isCurrent = (item: NavItem, path: string): boolean =>
  item.match.some((part) => path.includes(part));
