"use client";

import { useTranslation } from "react-i18next";
import { Link } from "@/lib/router";
import logofooter from "@/../public/logofooter.png";

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
                    <circle
                        cx="17.2"
                        cy="6.8"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                    />
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
                                    <FooterLink
                                        label={link.label}
                                        to={link.to}
                                    />
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
                                    <FooterLink
                                        label={link.label}
                                        to={link.to}
                                    />
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
                                    <FooterLink
                                        label={link.label}
                                        to={link.to}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col items-start sm:items-center lg:items-end">
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
