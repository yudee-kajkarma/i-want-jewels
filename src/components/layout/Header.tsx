"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CreditCard, LogIn, LogOut, MapPinHouse, PackageSearch, Ticket } from "lucide-react";
import { Link, useNavigate } from "@/lib/router";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { CURRENCY_OPTIONS, type CurrencyCode } from "../../utils/price";
import { getCategories } from "../../services/categoryService";
import { useAppSelector } from "../../store/hooks";
import braceletImage from "../../assets/image/bracelet.jpeg";
import braceletCloseupImage from "../../assets/image/bracelet1.jpeg";
import earringImage from "../../assets/image/earing1.jpeg";
import earringProductImage from "../../assets/image/earing1.jpeg";
import necklaceImage from "../../assets/image/nackwear.jpeg";
import necklaceModelImage from "../../assets/image/nackwear1.jpeg";
import ringImage from "../../assets/image/ring.jpeg";
import ringModelImage from "../../assets/image/ring1.jpeg";
import brandLogo from "../../assets/logo.svg";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

const adminNavLinks = [
    { label: "Dashboard", to: "/admin" },
    { label: "Orders", to: "/admin/orders" },
    { label: "Carts", to: "/admin/cart" },
    { label: "Tickets", to: "/admin/tickets" },
    { label: "Wishlists", to: "/admin/wishlist" },
    { label: "Products", to: "/products" },
    // { label: 'Storefront', to: '/' },
    // { label: 'Contact', to: '/contact' },
];

const utilityLinks = [
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    // { label: "Store Location" },
    { label: "Help", to: "/help" },
];

const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/iwantjewels/" },
    { name: "Facebook", href: "https://www.facebook.com/iwjewels/" },
    { name: "TikTok", href: "https://www.tiktok.com/@iwantjewelsofficial" },
];

const desktopNavLinkClass =
    "relative inline-flex pb-1 transition after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-200 hover:text-zinc-900 hover:after:scale-x-100";

const defaultShopPreviewImage = braceletCloseupImage.src;

const shopPromoCards = [
    {
        title: "15 Products",
        subtitle: "Under $200",
        image: earringProductImage.src,
    },
    {
        title: "15 Products",
        subtitle: "Under $900",
        image: ringModelImage.src,
    },
    {
        title: "15 Products",
        subtitle: "Under $1000",
        image: necklaceImage.src,
    },
];

function normalizeCategoryLabel(value: string): string {
    return value.trim().replace(/ies$/i, "y").replace(/s$/i, "");
}

function buildCategoryHref(category: string): string {
    return `/products?category=${encodeURIComponent(category)}`;
}

function getCategoryImage(label: string): string {
    const normalizedLabel = normalizeCategoryLabel(label).toLowerCase();

    if (normalizedLabel === "all product" || normalizedLabel === "all") {
        return necklaceModelImage.src;
    }

    if (
        normalizedLabel.includes("necklace") ||
        normalizedLabel.includes("jewellery") ||
        normalizedLabel.includes("jewelry")
    ) {
        return necklaceImage.src;
    }

    if (normalizedLabel.includes("bracelet")) {
        return braceletImage.src;
    }

    if (normalizedLabel.includes("earring")) {
        return earringImage.src;
    }

    if (normalizedLabel.includes("ring")) {
        return ringImage.src;
    }

    return defaultShopPreviewImage;
}

function getShopCategoriesFallback() {
    return ["Bracelets", "Earrings", "Jewellery", "Necklaces"];
}

function MenuLink({
    label,
    to,
    className,
    onClick,
}: {
    label: string;
    to?: string;
    className: string;
    onClick?: () => void;
}) {
    if (to) {
        return (
            <Link to={to} className={className} onClick={onClick}>
                {label}
            </Link>
        );
    }

    return (
        <a href="#" className={className} onClick={onClick}>
            {label}
        </a>
    );
}

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
        >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" strokeLinecap="round" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="h-3 w-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path
                d="m5 7 5 5 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function MenuIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
        >
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
        >
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[25px] w-[25px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
        >
            <circle cx="12" cy="8" r="3.5" />
            <path
                d="M5 19.5c1.7-3.3 4-4.9 7-4.9s5.3 1.6 7 4.9"
                strokeLinecap="round"
            />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[25px] w-[25px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
        >
            <path
                d="M12 20.5 4.9 13.8a4.7 4.7 0 0 1 6.6-6.7L12 7.6l.5-.5a4.7 4.7 0 0 1 6.6 6.7L12 20.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function BagIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[25px] w-[25px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
        >
            <path d="M5 9.5h14l-1.2 10H6.2L5 9.5Z" strokeLinejoin="round" />
            <path d="M9 9.5V8a3 3 0 1 1 6 0v1.5" strokeLinecap="round" />
        </svg>
    );
}

function SocialIcon({ name }: { name: string }) {
    const className = "h-4 w-4";

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
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="currentColor"
                >
                    <path d="M12.4 4C8.1 4 5.8 6.9 5.8 10c0 1.9.7 3.6 2.3 4.2.3.1.5 0 .5-.3.1-.2.3-1 .3-1.2 0-.2 0-.3-.2-.5-.5-.6-.8-1.4-.8-2.4 0-3 2.2-5.6 5.8-5.6 3.2 0 4.9 1.9 4.9 4.5 0 3.4-1.5 6.2-3.8 6.2-1.2 0-2.1-1-1.8-2.2.3-1.5.9-3.1.9-4.1 0-.9-.5-1.7-1.5-1.7-1.2 0-2.2 1.3-2.2 3 0 1.1.4 1.8.4 1.8L9.2 18c-.4 1.6 0 3.6 0 3.8 0 .1.1.2.2.1.1-.1 1.5-1.8 1.9-3.4l.5-1.8c.5 1 1.8 1.8 3.2 1.8 4.2 0 7-3.8 7-8.8C22 7.2 18.4 4 12.4 4Z" />
                </svg>
            );
    }
}

function HeaderAction({
    children,
    count,
    label,
    to,
    onClick,
}: {
    children: ReactNode;
    count?: number;
    label: string;
    to?: string;
    onClick?: () => void;
}) {
    const content = (
        <>
            {children}
            {typeof count === "number" ? (
                <span className="absolute right-0 top-0 flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-zinc-900 px-1 text-[9px] font-bold leading-none text-white">
                    {count}
                </span>
            ) : null}
        </>
    );

    if (to) {
        return (
            <Link
                to={to}
                aria-label={label}
                className="relative flex h-8 w-8 items-center justify-center text-zinc-900 transition hover:text-pink-500"
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="relative flex h-8 w-8 items-center justify-center text-zinc-900 transition hover:text-pink-500"
        >
            {content}
        </button>
    );
}

function UtilitySelect({ label }: { label: string }) {
    return (
        <button
            type="button"
            className="flex items-center gap-1 text-sm text-zinc-700 transition hover:text-pink-500"
        >
            <span>{label}</span>
            <ChevronIcon />
        </button>
    );
}

export default function Header() {
    const headerInnerRef = useRef<HTMLDivElement | null>(null);
    const accountMenuRef = useRef<HTMLDivElement | null>(null);
    const shopMenuRef = useRef<HTMLDivElement | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
    const [isMobileShopMenuOpen, setIsMobileShopMenuOpen] = useState(false);
    const [desktopSearchTerm, setDesktopSearchTerm] = useState("");
    const [mobileSearchTerm, setMobileSearchTerm] = useState("");
    const [shopCategories, setShopCategories] = useState<string[]>([]);
    const [shopMenuTop, setShopMenuTop] = useState(0);
    const shopMenuCloseTimeoutRef = useRef<ReturnType<
        typeof setTimeout
    > | null>(null);
    const navigate = useNavigate();
    const { isAuthenticated, logout, session } = useAuth();
    const { currency, setCurrency } = useCurrency();
    const itemCount = useAppSelector(
        (state) =>
            state.cart.cart?.items.reduce(
                (total, item) => total + item.quantity,
                0,
            ) ?? 0,
    );
    const wishlistCount = useAppSelector(
        (state) => state.wishlist.wishlist?.items.length ?? 0,
    );
    const accountLabel = isAuthenticated
        ? session?.firstName || session?.username || "Account"
        : "Account";
    const accountName =
        session?.firstName && session?.lastName
            ? `${session.firstName} ${session.lastName}`.trim()
            : session?.firstName || session?.username || "Account";
    const isAdmin = session?.role === "ADMIN";
    const activeNavLinks = isAdmin ? adminNavLinks : navLinks;
    const isSlice = isAdmin ? 3 : 2;
    const brandLink = isAdmin ? "/admin" : "/";
    const visibleShopCategories = useMemo(
        () =>
            shopCategories.length > 0
                ? shopCategories
                : getShopCategoriesFallback(),
        [shopCategories],
    );
    const shopMenuTiles = useMemo(() => {
        const normalizedCategoryMap = new Map(
            visibleShopCategories.map((category) => [
                normalizeCategoryLabel(category).toLowerCase(),
                category,
            ]),
        );

        const resolveCategory = (label: string) =>
            normalizedCategoryMap.get(label.toLowerCase()) ?? label;

        return [
            {
                label: "All Product",
                to: "/products",
                image: getCategoryImage("All Product"),
            },
            {
                label: "Necklace",
                to: buildCategoryHref(resolveCategory("Necklace")),
                image: getCategoryImage("Necklace"),
            },
            {
                label: "Bracelet",
                to: buildCategoryHref(resolveCategory("Bracelet")),
                image: getCategoryImage("Bracelet"),
            },
            {
                label: "Ring",
                to: buildCategoryHref(resolveCategory("Ring")),
                image: getCategoryImage("Ring"),
            },
            {
                label: "Earrings",
                to: buildCategoryHref(resolveCategory("Earring")),
                image: getCategoryImage("Earrings"),
            },
        ];
    }, [visibleShopCategories]);

    useEffect(() => {
        let isMounted = true;

        async function loadCategories() {
            try {
                const categoryData = await getCategories();

                if (!isMounted) {
                    return;
                }

                setShopCategories(categoryData);
            } catch {
                if (!isMounted) {
                    return;
                }

                setShopCategories(getShopCategoriesFallback());
            }
        }

        if (!isAdmin) {
            void loadCategories();
        }

        return () => {
            isMounted = false;
        };
    }, [isAdmin]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!accountMenuRef.current?.contains(event.target as Node)) {
                setIsAccountMenuOpen(false);
            }

            if (!shopMenuRef.current?.contains(event.target as Node)) {
                setIsShopMenuOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsAccountMenuOpen(false);
                setIsShopMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        return () => {
            if (shopMenuCloseTimeoutRef.current) {
                clearTimeout(shopMenuCloseTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        function updateShopMenuTop() {
            const shopTrigger = shopMenuRef.current;

            if (!shopTrigger || typeof window === "undefined") {
                return;
            }

            const triggerRect = shopTrigger.getBoundingClientRect();
            setShopMenuTop(triggerRect.bottom + 20);
        }

        updateShopMenuTop();

        window.addEventListener("resize", updateShopMenuTop);
        window.addEventListener("scroll", updateShopMenuTop);

        return () => {
            window.removeEventListener("resize", updateShopMenuTop);
            window.removeEventListener("scroll", updateShopMenuTop);
        };
    }, [isShopMenuOpen]);

    function closeMenus() {
        setIsMobileMenuOpen(false);
        setIsMobileShopMenuOpen(false);
        setIsShopMenuOpen(false);
    }

    function openShopMenu() {
        if (shopMenuCloseTimeoutRef.current) {
            clearTimeout(shopMenuCloseTimeoutRef.current);
            shopMenuCloseTimeoutRef.current = null;
        }

        setIsShopMenuOpen(true);
    }

    function scheduleCloseShopMenu() {
        if (shopMenuCloseTimeoutRef.current) {
            clearTimeout(shopMenuCloseTimeoutRef.current);
        }

        shopMenuCloseTimeoutRef.current = setTimeout(() => {
            setIsShopMenuOpen(false);
            shopMenuCloseTimeoutRef.current = null;
        }, 180);
    }

    function renderDesktopNavLink(link: (typeof activeNavLinks)[number]) {
        if (link.label !== "Shop" || isAdmin) {
            return (
                <MenuLink
                    key={link.label}
                    label={link.label}
                    to={link.to}
                    className={desktopNavLinkClass}
                />
            );
        }

        return (
            <div
                key={link.label}
                ref={shopMenuRef}
                className="relative"
                onMouseEnter={openShopMenu}
                onMouseLeave={scheduleCloseShopMenu}
                onFocus={openShopMenu}
                onBlur={(event) => {
                    if (
                        !event.currentTarget.contains(
                            event.relatedTarget as Node | null,
                        )
                    ) {
                        scheduleCloseShopMenu();
                    }
                }}
            >
                <button
                    type="button"
                    aria-expanded={isShopMenuOpen}
                    className={`${desktopNavLinkClass} inline-flex items-center gap-2 uppercase`}
                >
                    <span>{link.label}</span>
                </button>

                <div
                    className={`shop-mega-menu ${isShopMenuOpen ? "shop-mega-menu--open" : ""}`}
                    style={
                        shopMenuTop > 0
                            ? { top: `${shopMenuTop}px` }
                            : undefined
                    }
                >
                    <div className="mx-auto w-full max-w-[1040px] space-y-6">
                        <div className="grid grid-cols-5 gap-6">
                            {shopMenuTiles.map((tile) => (
                                <Link
                                    key={tile.label}
                                    to={tile.to}
                                    onClick={() => setIsShopMenuOpen(false)}
                                    className="group"
                                >
                                    <div className="overflow-hidden rounded-[10px] bg-white">
                                        <img
                                            src={tile.image}
                                            alt={tile.label}
                                            className="h-44 w-full rounded-[10px] object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="mt-2 text-center text-[13px] font-normal tracking-[-0.02em] text-zinc-700">
                                        {tile.label}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function handleGlobalSearchSubmit(
        searchTerm: string,
        options?: { closeMobileMenu?: boolean },
    ) {
        const normalizedTerm = searchTerm.trim();

        if (!normalizedTerm) {
            navigate("/products");
        } else {
            navigate(`/products?search=${encodeURIComponent(normalizedTerm)}`);
        }

        if (options?.closeMobileMenu) {
            closeMenus();
        }
    }

    return (
        <>
            <div className="border-b border-zinc-200 bg-white">
                <div className="mx-auto hidden max-w-[1480px] items-center justify-between px-4 py-4 text-sm lg:flex lg:px-8">
                    <div className="flex items-center gap-8 text-zinc-800">
                        {utilityLinks.map((link) => (
                            <MenuLink
                                key={link.label}
                                label={link.label}
                                to={link.to}
                                className="transition hover:text-pink-500"
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-6 text-zinc-800">
                        <label className="flex items-center gap-2 text-sm text-zinc-700">
                            <span className="sr-only">Currency</span>
                            <select
                                value={currency}
                                onChange={(event) =>
                                    setCurrency(
                                        event.target.value as CurrencyCode,
                                    )
                                }
                                className="cursor-pointer rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 focus:border-zinc-500 focus:outline-none"
                                aria-label="Select currency"
                            >
                                {CURRENCY_OPTIONS.map((option) => (
                                    <option
                                        key={option.code}
                                        value={option.code}
                                    >
                                        {option.symbol} {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="flex items-center gap-5 text-zinc-900">
                            {socialLinks.map((socialLink) => (
                                <a
                                    key={socialLink.name}
                                    href={socialLink.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={socialLink.name}
                                    className="transition hover:text-pink-500"
                                >
                                    <SocialIcon name={socialLink.name} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white">
                <div
                    ref={headerInnerRef}
                    className="mx-auto flex max-w-[1480px] items-center justify-between gap-3 px-4 py-1.5 md:gap-4 md:py-2 lg:px-8"
                >
                    <button
                        type="button"
                        aria-label={
                            isMobileMenuOpen ? "Close menu" : "Open menu"
                        }
                        aria-expanded={isMobileMenuOpen}
                        onClick={() =>
                            setIsMobileMenuOpen((currentValue) => !currentValue)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-900 transition hover:bg-zinc-50 lg:hidden"
                    >
                        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>

                    <form
                        className="hidden md:block md:w-[235px] lg:w-[258px]"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleGlobalSearchSubmit(desktopSearchTerm);
                        }}
                    >
                        <label className="flex h-[42px] items-center gap-3 rounded-[14px] border border-zinc-200 bg-white px-4 text-sm text-zinc-400 shadow-[0_1px_0_rgba(17,24,39,0.03)]">
                            <SearchIcon />
                            <input
                                type="search"
                                placeholder="What are you looking for?"
                                value={desktopSearchTerm}
                                onChange={(event) =>
                                    setDesktopSearchTerm(event.target.value)
                                }
                                className="w-full border-0 bg-transparent text-[15px] text-zinc-700 outline-none placeholder:text-zinc-400"
                            />
                        </label>
                    </form>

                    <div className="flex flex-1 items-center justify-center gap-5 lg:gap-7">
                        <nav className="hidden items-center gap-5 text-[0.95rem] font-semibold uppercase tracking-[0.01em] text-zinc-900 lg:flex xl:gap-7">
                            {activeNavLinks
                                .slice(0, isSlice)
                                .map((link) => renderDesktopNavLink(link))}
                        </nav>

                        <Link
                            to={brandLink}
                            className="flex items-center justify-center"
                        >
                            <img
                                src={brandLogo.src}
                                alt="I Want Jewels"
                                className="h-auto w-[200px]  mix-blend-multiply"
                            />
                        </Link>

                        <nav className="hidden items-center gap-5 text-[0.95rem] font-semibold uppercase tracking-[0.01em] text-zinc-900 lg:flex xl:gap-7">
                            {activeNavLinks.slice(isSlice).map((link) => (
                                <MenuLink
                                    key={link.label}
                                    label={link.label}
                                    to={link.to}
                                    className={desktopNavLinkClass}
                                />
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-0.5 sm:gap-1 md:min-w-[235px] md:justify-end lg:min-w-[258px]">
                        <div ref={accountMenuRef} className="relative">
                            <button
                                type="button"
                                aria-label={accountLabel}
                                aria-expanded={isAccountMenuOpen}
                                onClick={() =>
                                    setIsAccountMenuOpen(
                                        (currentValue) => !currentValue,
                                    )
                                }
                                className="relative flex h-8 w-8 items-center justify-center text-zinc-900 transition hover:text-pink-500"
                            >
                                <UserIcon />
                            </button>

                            {isAccountMenuOpen ? (
                                <div className="absolute right-0 top-[calc(100%+12px)] z-40 w-72 overflow-hidden rounded-[24px] border border-[#eadfd4] bg-white p-3 shadow-[0_24px_60px_rgba(55,31,10,0.14)]">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="rounded-[18px] bg-[#fff7fb] px-4 py-4">
                                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">
                                                    Signed in
                                                </p>
                                                <p className="mt-2 text-base font-bold text-[#17110d]">
                                                    {accountName}
                                                </p>
                                                <p className="mt-1 text-sm text-zinc-500">
                                                    {session?.email}
                                                </p>
                                                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8b5f43]">
                                                    {session?.role}
                                                </p>
                                            </div>
                                            {isAdmin ? (
                                                <>
                                                    <Link
                                                        to="/admin/address"
                                                        onClick={() =>
                                                            setIsAccountMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] !text-[#3c2b20] transition hover:bg-black hover:!text-white"
                                                    >
                                                        <MapPinHouse className="h-4 w-4" />
                                                        ADMIN ADDRESS
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Link
                                                        to="/profile"
                                                        onClick={() =>
                                                            setIsAccountMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="mt-3 flex w-full items-center justify-center rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] !text-[#3c2b20] transition hover:bg-black hover:!text-white"
                                                    >
                                                        PROFILE
                                                    </Link>
                                                    <Link
                                                        to="/orders"
                                                        onClick={() =>
                                                            setIsAccountMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] !text-[#3c2b20] transition hover:bg-black hover:!text-white"
                                                    >
                                                        <PackageSearch className="h-4 w-4" />
                                                        MY ORDERS
                                                    </Link>
                                                    <Link
                                                        to="/payments/history"
                                                        onClick={() =>
                                                            setIsAccountMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] !text-[#3c2b20] transition hover:bg-black hover:!text-white"
                                                    >
                                                        <CreditCard className="h-4 w-4" />
                                                        PAYMENT HISTORY
                                                    </Link>
                                                    <Link
                                                        to="/tickets"
                                                        onClick={() =>
                                                            setIsAccountMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] !text-[#3c2b20] transition hover:bg-black hover:!text-white"
                                                    >
                                                        <Ticket className="h-4 w-4" />
                                                        MY TICKETS
                                                    </Link>
                                                </>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    logout();
                                                    setIsAccountMenuOpen(false);
                                                }}
                                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                LOGOUT
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="rounded-[18px] bg-[#fff7fb] px-4 py-4">
                                                <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">
                                                    Welcome
                                                </p>
                                                <p className="mt-2 text-base font-bold text-[#17110d]">
                                                    Login to your account
                                                </p>
                                                <p className="mt-1 text-sm text-zinc-500">
                                                    Sign in or create a new
                                                    account to save wishlist and
                                                    cart items.
                                                </p>
                                            </div>
                                            <div className="mt-3 grid gap-2">
                                                {/* <Link
                          to="/tickets"
                          onClick={() => setIsAccountMenuOpen(false)}
                          className="flex w-full items-center justify-center rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] !text-[#3c2b20] transition hover:bg-black hover:!text-white"
                        >
                          TICKETS
                        </Link> */}
                                                <Link
                                                    to="/login"
                                                    onClick={() =>
                                                        setIsAccountMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-4 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] hover:text-white"
                                                    style={{ color: "#ffffff" }}
                                                >
                                                    <LogIn className="h-4 w-4" />
                                                    LOGIN
                                                </Link>
                                                <Link
                                                    to="/register"
                                                    onClick={() =>
                                                        setIsAccountMenuOpen(
                                                            false,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-center rounded-full border border-[#e5d7cc] px-4 py-3 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
                                                >
                                                    REGISTER
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : null}
                        </div>

                        {isAdmin ? (
                            <>
                                <HeaderAction
                                    label="Admin Wishlist"
                                    to="/admin/wishlist"
                                >
                                    <HeartIcon />
                                </HeaderAction>
                                <HeaderAction
                                    label="Admin Cart"
                                    to="/admin/cart"
                                >
                                    <BagIcon />
                                </HeaderAction>
                            </>
                        ) : (
                            <>
                                <HeaderAction
                                    label="Wishlist"
                                    count={wishlistCount}
                                    to="/wishlist"
                                >
                                    <HeartIcon />
                                </HeaderAction>
                                <HeaderAction
                                    label="Cart"
                                    count={itemCount}
                                    to="/cart"
                                >
                                    <BagIcon />
                                </HeaderAction>
                            </>
                        )}
                    </div>
                </div>

                {isMobileMenuOpen ? (
                    <div className="border-t border-zinc-100 px-4 py-4 lg:hidden">
                        <div className="mx-auto max-w-7xl space-y-4">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    handleGlobalSearchSubmit(mobileSearchTerm, {
                                        closeMobileMenu: true,
                                    });
                                }}
                            >
                                <label className="flex h-11 items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-400 shadow-[0_1px_0_rgba(17,24,39,0.03)]">
                                    <SearchIcon />
                                    <input
                                        type="search"
                                        placeholder="What are you looking for?"
                                        value={mobileSearchTerm}
                                        onChange={(event) =>
                                            setMobileSearchTerm(
                                                event.target.value,
                                            )
                                        }
                                        className="w-full border-0 bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400"
                                    />
                                </label>
                            </form>

                            <nav className="grid gap-1 rounded-2xl border border-zinc-200 bg-white p-2">
                                {activeNavLinks.map((link) => {
                                    if (link.label === "Shop" && !isAdmin) {
                                        return (
                                            <div
                                                key={link.label}
                                                className="rounded-xl border border-[#f1e1d7] bg-[#fffaf7] p-2"
                                            >
                                                <button
                                                    type="button"
                                                    aria-expanded={
                                                        isMobileShopMenuOpen
                                                    }
                                                    onClick={() =>
                                                        setIsMobileShopMenuOpen(
                                                            (currentValue) =>
                                                                !currentValue,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm font-semibold uppercase tracking-[0.02em] text-zinc-900"
                                                >
                                                    <span>{link.label}</span>
                                                    <span
                                                        className={`transition-transform duration-300 ${isMobileShopMenuOpen ? "rotate-180" : ""}`}
                                                    >
                                                        <ChevronIcon />
                                                    </span>
                                                </button>

                                                <div
                                                    className={`shop-mobile-menu ${isMobileShopMenuOpen ? "shop-mobile-menu--open" : ""}`}
                                                >
                                                    <div className="space-y-2 pt-2">
                                                        <Link
                                                            to="/products"
                                                            onClick={closeMenus}
                                                            className="block rounded-xl bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.02em] text-zinc-900 transition hover:bg-zinc-50"
                                                        >
                                                            All
                                                        </Link>

                                                        {visibleShopCategories.map(
                                                            (category) => (
                                                                <Link
                                                                    key={
                                                                        category
                                                                    }
                                                                    to={buildCategoryHref(
                                                                        category,
                                                                    )}
                                                                    onClick={
                                                                        closeMenus
                                                                    }
                                                                    className="block rounded-xl bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.02em] text-zinc-900 transition hover:bg-zinc-50"
                                                                >
                                                                    {normalizeCategoryLabel(
                                                                        category,
                                                                    )}
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <MenuLink
                                            key={link.label}
                                            label={link.label}
                                            to={link.to}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.02em] text-zinc-900 transition hover:bg-zinc-50"
                                        />
                                    );
                                })}
                            </nav>

                            <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 sm:hidden">
                                <div className="flex items-center gap-4">
                                    {isAuthenticated ? (
                                        <span className="font-medium text-zinc-900">
                                            {accountName}
                                        </span>
                                    ) : (
                                        <>
                                            <Link
                                                to="/tickets"
                                                className="transition hover:text-pink-500"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <span className="inline-flex items-center gap-1">
                                                    <Ticket className="h-4 w-4" />
                                                    Tickets
                                                </span>
                                            </Link>
                                            <Link
                                                to="/login"
                                                className="transition hover:text-pink-500"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <span className="inline-flex items-center gap-1">
                                                    <LogIn className="h-4 w-4" />
                                                    Login
                                                </span>
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="transition hover:text-pink-500"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                    {isAdmin ? (
                                        <>
                                            <Link
                                                to="/admin/address"
                                                className="transition hover:text-pink-500"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                <span className="inline-flex items-center gap-1">
                                                    <MapPinHouse className="h-4 w-4" />
                                                    Admin Address
                                                </span>
                                            </Link>
                                            <Link
                                                to="/admin/wishlist"
                                                className="transition hover:text-pink-500"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                Wishlists
                                            </Link>
                                            <Link
                                                to="/admin/cart"
                                                className="transition hover:text-pink-500"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                Carts
                                            </Link>
                                        </>
                                    ) : (
                                        <Link
                                            to="/wishlist"
                                            className="transition hover:text-pink-500"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            Wishlist
                                        </Link>
                                    )}
                                    {isAuthenticated && !isAdmin ? (
                                        <Link
                                            to="/profile"
                                            className="transition hover:text-pink-500"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            Profile
                                        </Link>
                                    ) : null}
                                    {isAuthenticated && !isAdmin ? (
                                        <Link
                                            to="/payments/history"
                                            className="transition hover:text-pink-500"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="inline-flex items-center gap-1">
                                                <CreditCard className="h-4 w-4" />
                                                Payment History
                                            </span>
                                        </Link>
                                    ) : null}
                                    {isAuthenticated && !isAdmin ? (
                                        <Link
                                            to="/orders"
                                            className="transition hover:text-pink-500"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="inline-flex items-center gap-1">
                                                <PackageSearch className="h-4 w-4" />
                                                My Orders
                                            </span>
                                        </Link>
                                    ) : null}
                                    {isAuthenticated && !isAdmin ? (
                                        <Link
                                            to="/tickets"
                                            className="transition hover:text-pink-500"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <span className="inline-flex items-center gap-1">
                                                <Ticket className="h-4 w-4" />
                                                My Tickets
                                            </span>
                                        </Link>
                                    ) : null}
                                    {isAuthenticated ? (
                                        <button
                                            type="button"
                                            className="transition hover:text-pink-500"
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                        >
                                            <span className="inline-flex items-center gap-1">
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </span>
                                        </button>
                                    ) : null}
                                </div>
                                {/* <div className="flex items-center gap-3">
                  <UtilitySelect label="English" />
                  <UtilitySelect label="EUR" />
                </div>*/}
                            </div>
                        </div>
                    </div>
                ) : null}
            </header>
        </>
    );
}
