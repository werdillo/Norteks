export interface SocialLink {
  /** "#" means the account has no page yet. */
  href: string;
  /** An UnoCSS icon class, such as `i-tabler-brand-telegram`. */
  icon: string;
  alt: string;
}

/** The social accounts shown in the header and the footer. */
export const socialLinks: SocialLink[] = [
  { href: "https://www.instagram.com/tknortex/", icon: "i-tabler-brand-instagram", alt: "Instagram" },
  { href: "https://t.me/tknortex", icon: "i-tabler-brand-telegram", alt: "Telegram" },
  { href: "#", icon: "i-tabler-brand-whatsapp", alt: "WhatsApp" },
];
