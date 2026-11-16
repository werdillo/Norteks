import { isCurrent, type MobileNavItem, type NavItem } from "#/core/nav";
import { mobileNav as blogMobile, headerNav as blog } from "#/site/blog";
import { headerNav as care, mobileNav as careMobile } from "#/site/care";
import { mobileNav as catalogMobile, headerNav as catalog } from "#/site/catalog";
import { mobileNav as companyMobile, headerNav as company } from "#/site/company";
import { headerNav as contacts } from "#/site/contacts";
import { mobileNav as furnitureMobile, headerNav as furniture } from "#/site/furniture";

/** The boxes declare their own menu entries; the frame only lists them in the order it shows them. */
export const headerNav: NavItem[] = [catalog, furniture, blog, care, contacts, company];

export const mobileNav: MobileNavItem[] = [catalogMobile, careMobile, furnitureMobile, blogMobile, companyMobile];

export { isCurrent };
export type { MobileNavItem, NavItem };
