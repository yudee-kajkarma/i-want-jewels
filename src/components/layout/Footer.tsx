"use client";

import { useTranslation } from "react-i18next";
import { Link } from "@/lib/router";
import logofooter from "@/../public/logofooter.png";

const CONTACT_EMAIL = "Info@iwantjewels.com";
// Display form for humans; the tel:/wa.me links need it digits-only.
const CONTACT_PHONE_DISPLAY = "+32 483 17 27 03";
const CONTACT_PHONE_E164 = "+32483172703";
const WHATSAPP_NUMBER = "32483172703";

// Pre-filled so the customer never faces an empty chat box, and so the team
// can see at a glance that the message came from the website.
const WHATSAPP_MESSAGE =
  "Hi I Want Jewels, I found you through your website and I would like to know more about your jewellery. Could you help me?";

const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function FooterLink({ label, to }: { label: string; to?: string }) {
  const className =
    "text-[14px] tracking-[0.04em] text-zinc-700 transition hover:text-pink-500";

  if (to) {
    return (
      <Link to={to} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href="#" className={className}>
      {label}
    </a>
  );
}

function SocialIcon({ name }: { name: string }) {
  const className = "h-6 w-6";

  switch (name) {
    case "Facebook":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
          fill="currentColor"
        >
          <path d="M13.3 21v-7.7h2.6l.4-3h-3V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H7.5v3h2.5V21h3.3Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "TikTok":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
          fill="currentColor"
        >
          <path d="M14.7 3.8c.6 1.4 1.5 2.5 2.7 3.3 1 .7 2.2 1.1 3.5 1.2v2.7a8.6 8.6 0 0 1-3.8-.9v5.2a5.9 5.9 0 1 1-5-5.8v2.8a3.1 3.1 0 1 0 2.2 3v-11.5h2.4Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const { t } = useTranslation();

  const informationLinks = [
    { label: t("footer.contactUs"), to: "/contact" },
    { label: t("footer.myAccount"), to: "/profile" },
    { label: t("footer.orderReturns"), to: "/orders" },
    { label: t("footer.faqs"), to: "/faq" },
  ];

  const quickShopLinks = [
    { label: t("footer.necklaces"), to: "/category/necklaces" },
    { label: t("footer.rings"), to: "/category/rings" },
    { label: t("footer.earrings"), to: "/category/earrings" },
    { label: t("footer.bracelets"), to: "/category/bracelets" },
  ];

  const questionLinks = [
    { label: t("footer.blog"), to: "/blogs" },
    { label: t("footer.jewelleryGuides"), to: "/resources" },
    { label: t("footer.faqs"), to: "/faq" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/iwantjewels/" },
    { name: "Facebook", href: "https://www.facebook.com/iwjewels/" },
    { name: "TikTok", href: "https://www.tiktok.com/@iwantjewelsofficial" },
  ];

  return (
    <footer className="bg-white font-poppins">
      <div className="mx-auto container px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div>
            <h4 className="text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {t("footer.information")}
            </h4>
            <ul className="mt-6 space-y-4">
              {informationLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink label={link.label} to={link.to} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {t("footer.quickShops")}
            </h4>
            <ul className="mt-6 space-y-4">
              {quickShopLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink label={link.label} to={link.to} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {t("footer.questions")}
            </h4>
            <ul className="mt-6 space-y-4">
              {questionLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink label={link.label} to={link.to} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start sm:items-center lg:items-end">
            <div className="mb-6 flex flex-col items-start gap-2 text-[13px] sm:items-center lg:items-end">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-zinc-700 transition hover:text-pink-600"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
                {CONTACT_EMAIL}
              </a>

              <a
                href={`tel:${CONTACT_PHONE_E164}`}
                className="inline-flex items-center gap-2 text-zinc-700 transition hover:text-pink-600"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                {CONTACT_PHONE_DISPLAY}
              </a>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-700 transition hover:text-[#25D366]"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.700-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c1.7.7 2.1.6 2.5.5a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2Z" />
                </svg>
                {t("footer.chatOnWhatsapp", {
                  defaultValue: "Chat with us on WhatsApp",
                })}
              </a>
            </div>

            <img
              src={logofooter.src}
              alt="I Want Jewels"
              className="h-auto w-[140px] lg:w-[80px]"
            />
            <div className="mt-6 flex items-center gap-7 text-pink-500">
              {socialLinks.map((socialLink) => (
                <a
                  key={socialLink.name}
                  href={socialLink.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={socialLink.name}
                  className="transition hover:text-pink-600"
                >
                  <SocialIcon name={socialLink.name} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6">
          <p className="text-center text-[12px] tracking-[0.06em] text-zinc-500 sm:text-[13px]">
            {t("footer.allRightsReserved", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
