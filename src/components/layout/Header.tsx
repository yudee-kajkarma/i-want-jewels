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
    { label: "Blog", to: "/about" },
    { label: "Resources", to: "/help" },
{ label: "Help", to: "/help" }
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

const storefrontNavLinks = [
    { label: "Home", to: "/", icon: "home" },
    { label: "All Products", to: "/products", icon: "all" },
    { label: "Earrings", to: buildCategoryHref("Earrings"), icon: "earrings" },
    { label: "Rings", to: buildCategoryHref("Rings"), icon: "rings" },
    {
        label: "Necklaces",
        to: buildCategoryHref("Necklace"),
        icon: "necklaces",
    },
    {
        label: "Bracelets",
        to: buildCategoryHref("Bracelets"),
        icon: "bracelets",
    },
    { label: "About", to: "/about", icon: "about" },
    { label: "Contact", to: "/contact", icon: "contact" },
    // { label: "Gift Card", to: "/products", icon: "gift" },
    { label: "Blog", to: "/about", icon: "blog" },
    { label: "Resources", to: "/help", icon: "resources" },
    { label: "Help", to: "/help", icon: "resources" }
] as const;

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

function MicIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect
                x="9"
                y="3"
                width="6"
                height="11"
                rx="3"
                strokeLinecap="round"
            />
            <path d="M6.5 11a5.5 5.5 0 1 0 11 0" strokeLinecap="round" />
            <path d="M12 17v4" strokeLinecap="round" />
            <path d="M9.5 21h5" strokeLinecap="round" />
        </svg>
    );
}

type StorefrontNavIcon =
    | "home"
    | "all"
    | "earrings"
    | "rings"
    | "necklaces"
    | "bracelets"
    | "about"
    | "contact"
    | "gift"
    | "blog"
    | "resources";

function NavGlyph({ type }: { type: StorefrontNavIcon }) {
    const className = "h-[13px] w-[13px]";

    switch (type) {
        case "home":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m4 11.5 8-7 8 7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 10.5V20h11v-9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "all":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                </svg>
            );
        case "earrings":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="9" cy="8" r="2.2" />
                    <circle cx="15" cy="16" r="2.2" />
                    <path d="M10.6 9.6 13.4 14.4" strokeLinecap="round" />
                </svg>
            );
        case "rings":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="14" r="5" />
                    <path d="M9.5 9.5 12 6l2.5 3.5Z" strokeLinejoin="round" />
                </svg>
            );
        case "necklaces":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 7a5 5 0 0 1 10 0v2a5 5 0 0 1-10 0Z" />
                    <circle cx="12" cy="16" r="2" />
                </svg>
            );
        case "bracelets":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17" cy="12" r="1" fill="currentColor" stroke="none" />
                </svg>
            );
        case "blog":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 5h12v14H6Z" strokeLinejoin="round" />
                    <path d="M9 9h6M9 13h6" strokeLinecap="round" />
                </svg>
            );
        case "gift":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 9h16v11H4Z" strokeLinejoin="round" />
                    <path d="M12 9v11M4 13.5h16" />
                    <path d="M12 9c-1.5 0-3-1-3-2.3 0-1.1.8-1.9 1.9-1.9 1.4 0 2.3 1.3 2.7 4.2.4-2.9 1.3-4.2 2.7-4.2 1.1 0 1.9.8 1.9 1.9C18 8 16.5 9 15 9Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "resources":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6h7v12H4Z" strokeLinejoin="round" />
                    <path d="M13 6h7v12h-7Z" strokeLinejoin="round" />
                </svg>
            );
        case "about":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="8.2" r="1" fill="currentColor" stroke="none" />
                    <path d="M12 11v5" strokeLinecap="round" />
                </svg>
            );
        case "contact":
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7.5h16v9H4Z" strokeLinejoin="round" />
                    <path d="m5 8 7 5 7-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        default:
            return null;
    }
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
    className,
}: {
    children: ReactNode;
    count?: number;
    label: string;
    to?: string;
    onClick?: () => void;
    className?: string;
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
                className={`relative flex h-8 w-8 items-center justify-center transition hover:text-pink-500 ${className ?? "text-zinc-900"}`}
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
            className={`relative flex h-8 w-8 items-center justify-center transition hover:text-pink-500 ${className ?? "text-zinc-900"}`}
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
    const [isVoiceListening, setIsVoiceListening] = useState(false);
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

    function handleVoiceSearch(target: "desktop" | "mobile") {
        if (typeof window === "undefined") {
            return;
        }

        const SpeechRecognitionCtor = (
            window as typeof window & {
                SpeechRecognition?: new () => {
                    lang: string;
                    interimResults: boolean;
                    maxAlternatives: number;
                    onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript?: string }>> }) => void) | null;
                    onerror: ((event: unknown) => void) | null;
                    onend: (() => void) | null;
                    start: () => void;
                };
                webkitSpeechRecognition?: new () => {
                    lang: string;
                    interimResults: boolean;
                    maxAlternatives: number;
                    onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript?: string }>> }) => void) | null;
                    onerror: ((event: unknown) => void) | null;
                    onend: (() => void) | null;
                    start: () => void;
                };
            }
        ).SpeechRecognition ||
            (
                window as typeof window & {
                    webkitSpeechRecognition?: new () => {
                        lang: string;
                        interimResults: boolean;
                        maxAlternatives: number;
                        onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript?: string }>> }) => void) | null;
                        onerror: ((event: unknown) => void) | null;
                        onend: (() => void) | null;
                        start: () => void;
                    };
                }
            ).webkitSpeechRecognition;

        if (!SpeechRecognitionCtor) {
            return;
        }

        const recognition = new SpeechRecognitionCtor();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        setIsVoiceListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0]?.[0]?.transcript?.trim() ?? "";

            if (!transcript) {
                return;
            }

            if (target === "desktop") {
                setDesktopSearchTerm(transcript);
            } else {
                setMobileSearchTerm(transcript);
            }
        };

        recognition.onerror = () => {
            setIsVoiceListening(false);
        };

        recognition.onend = () => {
            setIsVoiceListening(false);
        };

        recognition.start();
    }

    return (
        <>
            {isAdmin ? (
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
            ) : null}

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

                    {!isAdmin ? (
                        <>
                            <Link
                                to={brandLink}
                                className="hidden w-[220px] items-center justify-start md:flex"
                            >
                                <img
                                    src={brandLogo.src}
                                    alt="I Want Jewels"
                                    className="h-auto w-[170px] mix-blend-multiply"
                                />
                            </Link>

                            <div className="hidden flex-1 justify-center md:flex">
                                <form
                                    className="w-full"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        handleGlobalSearchSubmit(
                                            desktopSearchTerm,
                                        );
                                    }}
                                >
                                    <label className="mx-auto flex h-[46px] w-full max-w-[620px] items-center gap-3 rounded-full border border-[#d5d1ce] bg-white px-4 text-sm text-zinc-400">
                                        <SearchIcon />
                                        <input
                                            type="search"
                                            placeholder="Search for diamond jewellery"
                                            value={desktopSearchTerm}
                                            onChange={(event) =>
                                                setDesktopSearchTerm(
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full border-0 bg-transparent text-[15px] text-zinc-700 outline-none placeholder:text-zinc-400"
                                        />
                                        <button
                                            type="button"
                                            aria-label="Voice search"
                                            onClick={() =>
                                                handleVoiceSearch("desktop")
                                            }
                                            className={`text-pink-500 transition ${isVoiceListening ? "scale-110 text-pink-600" : "hover:text-pink-600"}`}
                                        >
                                            <MicIcon />
                                        </button>
                                    </label>
                                </form>
                            </div>
                        </>
                    ) : null}

                    <div
                        className={`${isAdmin ? "flex flex-1 items-center justify-center gap-5 lg:gap-7" : "flex flex-1 items-center justify-center md:hidden"}`}
                    >
                        {isAdmin ? (
                            <>
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
                            </>
                        ) : (
                            <Link
                                to={brandLink}
                                className="flex items-center justify-center md:hidden"
                            >
                                <img
                                    src={brandLogo.src}
                                    alt="I Want Jewels"
                                    className="h-auto w-[150px] mix-blend-multiply"
                                />
                            </Link>
                        )}
                    </div>

                    <div
                        className={`flex items-center gap-0.5 sm:gap-1 ${isAdmin ? "md:min-w-[235px] md:justify-end lg:min-w-[258px]" : "text-pink-500 md:w-[220px] md:justify-end"}`}
                    >
                        {!isAdmin ? (
                            <label className="hidden items-center pr-1 md:flex">
                                <span className="sr-only">Select currency</span>
                                <select
                                    value={currency}
                                    onChange={(event) =>
                                        setCurrency(
                                            event.target.value as CurrencyCode,
                                        )
                                    }
                                    className="cursor-pointer rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 focus:border-zinc-500 focus:outline-none"
                                    aria-label="Select currency"
                                >
                                    {CURRENCY_OPTIONS.map((option) => (
                                        <option
                                            key={option.code}
                                            value={option.code}
                                        >
                                            {option.symbol} {option.code}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        ) : null}

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
                                className={`relative flex h-8 w-8 items-center justify-center transition hover:text-pink-500 ${isAdmin ? "text-zinc-900" : "text-pink-500"}`}
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
                                    className="text-pink-500"
                                >
                                    <HeartIcon />
                                </HeaderAction>
                                <HeaderAction
                                    label="Cart"
                                    count={itemCount}
                                    to="/cart"
                                    className="text-pink-500"
                                >
                                    <BagIcon />
                                </HeaderAction>
                            </>
                        )}
                    </div>
                </div>

                {!isAdmin ? (
                    <div className="hidden border-y border-zinc-200 lg:block">
                        <nav className="mx-auto flex max-w-[1480px] items-center justify-center gap-7 px-4 py-3 text-[0.96rem] text-zinc-700 lg:px-8">
                            {storefrontNavLinks.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    className="group relative inline-flex items-center gap-1.5 py-0.5 text-[0.96rem] font-medium text-zinc-700 transition duration-200 hover:text-pink-500 after:absolute after:-bottom-[13px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-pink-400 after:transition-transform after:duration-200 hover:after:scale-x-100"
                                >
                                    <span className="transition duration-200 group-hover:scale-105">
                                        <NavGlyph type={item.icon} />
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                ) : null}

                {isMobileMenuOpen ? (
                    <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-zinc-100 px-4 py-4 lg:hidden">
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
                                    <button
                                        type="button"
                                        aria-label="Voice search"
                                        onClick={() =>
                                            handleVoiceSearch("mobile")
                                        }
                                        className={`text-pink-500 transition ${isVoiceListening ? "scale-110 text-pink-600" : "hover:text-pink-600"}`}
                                    >
                                        <MicIcon />
                                    </button>
                                </label>
                            </form>

                            {!isAdmin ? (
                                <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                                    <label className="flex items-center justify-between gap-3 text-sm text-zinc-700">
                                        <span>Currency</span>
                                        <select
                                            value={currency}
                                            onChange={(event) =>
                                                setCurrency(
                                                    event.target
                                                        .value as CurrencyCode,
                                                )
                                            }
                                            className="cursor-pointer rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm font-medium text-zinc-700 focus:border-zinc-500 focus:outline-none"
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
                                </div>
                            ) : null}

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

                            <div className="rounded-2xl border border-zinc-200 bg-white p-3 text-sm text-zinc-700 sm:hidden">
                                {isAuthenticated ? (
                                    <>
                                        <p className="px-2 pb-2 text-base font-medium text-zinc-900">
                                            {accountName}
                                        </p>

                                        {isAdmin ? (
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link
                                                    to="/admin/address"
                                                    className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(false)
                                                    }
                                                >
                                                    <span className="inline-flex items-center gap-1">
                                                        <MapPinHouse className="h-4 w-4" />
                                                        Address
                                                    </span>
                                                </Link>
                                                <Link
                                                    to="/admin/wishlist"
                                                    className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(false)
                                                    }
                                                >
                                                    Wishlists
                                                </Link>
                                                <Link
                                                    to="/admin/cart"
                                                    className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(false)
                                                    }
                                                >
                                                    Carts
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
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
                                            </div>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Link
                                                        to="/wishlist"
                                                        className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(false)
                                                        }
                                                    >
                                                        Wishlist
                                                    </Link>
                                                    <Link
                                                        to="/profile"
                                                        className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(false)
                                                        }
                                                    >
                                                        Profile
                                                    </Link>
                                                    <Link
                                                        to="/payments/history"
                                                        className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(false)
                                                        }
                                                    >
                                                        <span className="inline-flex items-center gap-1">
                                                            <CreditCard className="h-4 w-4" />
                                                            Payments
                                                        </span>
                                                    </Link>
                                                    <Link
                                                        to="/orders"
                                                        className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(false)
                                                        }
                                                    >
                                                        <span className="inline-flex items-center gap-1">
                                                            <PackageSearch className="h-4 w-4" />
                                                            Orders
                                                        </span>
                                                    </Link>
                                                    <Link
                                                        to="/tickets"
                                                        className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(false)
                                                        }
                                                    >
                                                        <span className="inline-flex items-center gap-1">
                                                            <Ticket className="h-4 w-4" />
                                                            Tickets
                                                        </span>
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
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
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2">
                                        <Link
                                            to="/tickets"
                                            className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
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
                                            className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
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
                                            className="rounded-lg border border-zinc-200 px-3 py-2 text-center transition hover:bg-zinc-50"
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}
            </header>
        </>
    );
}
