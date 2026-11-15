import type { ImageMetadata } from "astro";
import instagram from "../assets/icons/instagram.svg";
import telegram from "../assets/icons/telegram.svg";
import whatsapp from "../assets/icons/whatsapp.svg";

export interface SocialLink {
  /** "#" means the account has no page yet. */
  href: string;
  icon: ImageMetadata;
  alt: string;
}

/** The social accounts shown in the header and the footer. */
export const socialLinks: SocialLink[] = [
  { href: "https://www.instagram.com/tknortex/", icon: instagram, alt: "Instagram" },
  { href: "https://t.me/tknortex", icon: telegram, alt: "Telegram" },
  { href: "#", icon: whatsapp, alt: "WhatsApp" },
];
