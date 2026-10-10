"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@/lib/router";
import earringsImage from "../../assets/categories/Earrings.jpg";
import necklacesImage from "../../assets/categories/Necklace.jpg";

/**
 * The SHOP menu: a hover mega menu next to the logo on desktop, and an
 * accordion in the mobile drawer. Destinations follow the navbar SEO plan —
 * collection pages, sections on the parent pages (#anchors) and the Alessia
 * bangle — so every link here is a real, crawlable URL.
 */

type MenuLink = { key: string; to: string };
type MenuGroup = { key: string; to: string; links: MenuLink[] };

// The panel grid fills row by row, so this order puts Earrings + Necklaces in
// the first column and Rings + Bracelets in the second, as in the design.
export const shopCategoryGroups: MenuGroup[] = [
    {
        key: "earrings",
        to: "/category/earrings",
        links: [
            { key: "studEarrings", to: "/category/stud-earrings" },
            { key: "hoopHuggieEarrings", to: "/category/hoop-huggie-earrings" },
            { key: "dropEarrings", to: "/category/drop-earrings" },
            { key: "everydayEarrings", to: "/category/everyday-earrings" },
        ],
    },
    {
        key: "rings",
        to: "/category/rings",
        links: [
            { key: "everydayStackingRings", to: "/category/rings#everyday-stacking-rings" },
            { key: "statementRings", to: "/category/rings#statement-rings" },
        ],
    },
    {
        key: "necklaces",
        to: "/category/necklaces",
        links: [
            { key: "everydayPendants", to: "/category/necklaces#everyday-pendants" },
            { key: "layeringYNecklaces", to: "/category/necklaces#layering-y-necklaces" },
        ],
    },
    {
        key: "bracelets",
        to: "/category/bracelets",
        links: [
            { key: "chainBracelets", to: "/category/bracelets#chain-bracelets" },
            { key: "alessiaBangle", to: "/products/iwjbn0001" },
        ],
    },
];

export const shopOccasionLinks: MenuLink[] = [
    { key: "anniversaryGifts", to: "/category/anniversary-gifts" },
    { key: "partyEvening", to: "/category/party-evening-jewellery" },
    { key: "graduationGifts", to: "/category/graduation-gifts" },
    { key: "birthdayGifts", to: "/category/birthday-gifts" },
    { key: "christmasGifts", to: "/category/christmas-jewellery-gifts" },
];

const featureTiles = [
    { key: "earrings", to: "/category/earrings", image: earringsImage.src },
    { key: "necklaces", to: "/category/necklaces", image: necklacesImage.src },
];

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-5" fill="none" aria-hidden="true">
            <path d="M3 12h17m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const eyebrowClass = "text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500";
const groupTitleClass =
    "text-[14px] font-medium uppercase tracking-[0.08em] text-zinc-900 transition hover:text-pink-500";
const menuLinkClass = "text-[14px] tracking-[0.02em] text-zinc-500 transition hover:text-zinc-950";

/** Desktop: SHOP opens on hover (or keyboard focus); clicking SHOP still goes to all products. */
export function ShopMegaMenu({ linkClassName }: { linkClassName: (open: boolean) => string }) {
    const { t } = useTranslation("common", { keyPrefix: "header.megaMenu" });
    const { t: tHeader } = useTranslation("common", { keyPrefix: "header" });
    const [isOpen, setIsOpen] = useState(false);
    // Tile photos load on the first open, not with every page.
    const [hasOpened, setHasOpened] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = null;
    };
    const open = () => {
        cancelClose();
        setIsOpen(true);
        setHasOpened(true);
    };
    // A short delay lets the pointer travel from SHOP down into the panel.
    const scheduleClose = () => {
        cancelClose();
        closeTimer.current = setTimeout(() => setIsOpen(false), 140);
    };
    const close = () => {
        cancelClose();
        setIsOpen(false);
    };

    useEffect(() => cancelClose, []);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen]);

    return (
        <div
            className="flex h-full items-center"
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
            onFocus={open}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
            }}
        >
            <Link
                to="/products"
                onClick={close}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className={linkClassName(isOpen)}
            >
                {tHeader("shop")}
            </Link>

            <div
                className={`absolute inset-x-0 top-full z-40 border-t border-zinc-200 bg-white shadow-[0_24px_40px_rgba(24,24,27,0.08)] transition duration-200 ${
                    isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                }`}
            >
                <div className="mx-auto grid max-w-[1480px] grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.9fr)] gap-10 px-10 pb-14 pt-11">
                    {/* Shop by category: two columns of groups, Shop all at the foot */}
                    <div>
                        <p className={eyebrowClass}>{t("shopByCategory")}</p>
                        <div className="mt-7 grid grid-cols-2 gap-x-10 gap-y-10">
                            {shopCategoryGroups.map((group) => (
                                <div key={group.key}>
                                    <Link to={group.to} onClick={close} className={groupTitleClass}>
                                        {t(group.key)}
                                    </Link>
                                    <ul className="mt-3 space-y-2.5">
                                        {group.links.map((link) => (
                                            <li key={link.key}>
                                                <Link to={link.to} onClick={close} className={menuLinkClass}>
                                                    {t(link.key)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <div className="col-start-2">
                                <Link
                                    to="/products"
                                    onClick={close}
                                    className="inline-flex items-center gap-4 text-[14px] font-medium uppercase tracking-[0.12em] text-zinc-900 transition hover:text-pink-500"
                                >
                                    {t("shopAll")}
                                    <ArrowIcon />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Shop by occasion */}
                    <div>
                        <p className={eyebrowClass}>{t("shopByOccasion")}</p>
                        <ul className="mt-7 space-y-3">
                            {shopOccasionLinks.map((link) => (
                                <li key={link.key}>
                                    <Link to={link.to} onClick={close} className={menuLinkClass}>
                                        {t(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Image tiles */}
                    <div className="grid grid-cols-2 gap-8">
                        {featureTiles.map((tile) => (
                            <Link key={tile.key} to={tile.to} onClick={close} className="group block">
                                <span className="block aspect-[3/4] max-h-[360px] overflow-hidden bg-zinc-100">
                                    {hasOpened ? (
                                        <img
                                            src={tile.image}
                                            alt=""
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                        />
                                    ) : null}
                                </span>
                                <span className="mt-4 inline-flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-900 transition group-hover:text-pink-500">
                                    {t(tile.key)}
                                    <ArrowIcon />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/** Mobile drawer: the same destinations as an accordion under SHOP. */
export function ShopMenuAccordion({
    isOpen,
    onNavigate,
}: {
    isOpen: boolean;
    onNavigate: () => void;
}) {
    const { t } = useTranslation("common", { keyPrefix: "header.megaMenu" });

    return (
        <div
            className={`grid overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
            <div className="min-h-0">
                <div className="space-y-5 border-b border-zinc-100 py-4 pl-4">
                    {shopCategoryGroups.map((group) => (
                        <div key={group.key}>
                            <Link
                                to={group.to}
                                onClick={onNavigate}
                                className="text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-900 transition hover:text-pink-500"
                            >
                                {t(group.key)}
                            </Link>
                            <div className="mt-2 flex flex-col gap-2">
                                {group.links.map((link) => (
                                    <Link
                                        key={link.key}
                                        to={link.to}
                                        onClick={onNavigate}
                                        className="text-[13px] text-zinc-500 transition hover:text-pink-500"
                                    >
                                        {t(link.key)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                            {t("shopByOccasion")}
                        </p>
                        <div className="mt-2 flex flex-col gap-2">
                            {shopOccasionLinks.map((link) => (
                                <Link
                                    key={link.key}
                                    to={link.to}
                                    onClick={onNavigate}
                                    className="text-[13px] text-zinc-500 transition hover:text-pink-500"
                                >
                                    {t(link.key)}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link
                        to="/products"
                        onClick={onNavigate}
                        className="inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.16em] text-zinc-900 transition hover:text-pink-500"
                    >
                        {t("shopAll")}
                        <ArrowIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
}
