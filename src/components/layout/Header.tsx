"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
    CreditCard,
    LogIn,
    LogOut,
    MapPinHouse,
    PackageSearch,
    Ticket,
} from "lucide-react";
import { Link, useNavigate } from "@/lib/router";
import { useAuth } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";
import { formatPrice, type CurrencyCode } from "../../utils/price";
import { getCategories } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import { useAppSelector } from "../../store/hooks";
import type { Product } from "../../types/product";
import brandLogo from "../../assets/logo.svg";

const adminNavLinks = [
    { label: "Dashboard", to: "/admin" },
    { label: "Blogs", to: "/admin/blogs" },
    { label: "Orders", to: "/admin/orders" },
    { label: "Carts", to: "/admin/cart" },
    { label: "Wishlists", to: "/admin/wishlist" },
    { label: "Tickets", to: "/admin/tickets" },
];

const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/iwantjewels/" },
    { name: "Facebook", href: "https://www.facebook.com/iwjewels/" },
    { name: "TikTok", href: "https://www.tiktok.com/@iwantjewelsofficial" },
];

const animatedSearchTexts = [
    "Searching for the perfect jewel...",
    "Find rings, earrings, necklaces...",
    "Discover timeless sparkle...",
];
const animatedCursor = "|";
const predictiveSearchLimit = 4;
const predictiveSearchDebounceMs = 350;

const CURRENCY_OPTIONS: Array<{
    code: CurrencyCode;
    flag: string;
    label: string;
    short: string;
}> = [
    {
        code: "eur",
        flag: "https://flagcdn.com/w40/eu.png",
        label: "European Union (EUR €)",
        short: "EUR €",
    },
    {
        code: "pou",
        flag: "https://flagcdn.com/w40/gb.png",
        label: "United Kingdom (GBP £)",
        short: "GBP £",
    },
];

function buildProductDetailHref(product: Product): string {
    return `/products/${encodeURIComponent(product.slug || product.id)}`;
}

function buildPredictiveQuerySuggestions(
    query: string,
    products: Product[],
): string[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return [];
    }

    const normalizedSuggestions = new Set<string>();

    for (const product of products) {
        const words = product.title
            .split(/\s+/)
            .map((word) => word.replace(/[^a-z0-9-]/gi, "").trim())
            .filter(Boolean);

        for (const word of words) {
            if (
                word.toLowerCase().includes(normalizedQuery) &&
                word.toLowerCase() !== normalizedQuery
            ) {
                normalizedSuggestions.add(word);
            }

            if (normalizedSuggestions.size >= 5) {
                break;
            }
        }

        if (normalizedSuggestions.size >= 5) {
            break;
        }
    }

    return Array.from(normalizedSuggestions);
}

function normalizeCategoryLabel(value: string): string {
    return value.trim().replace(/ies$/i, "y").replace(/s$/i, "");
}

function buildCategoryHref(category: string): string {
    return `/products?category=${encodeURIComponent(category)}`;
}

function getShopCategoriesFallback() {
    return ["Bracelets", "Earrings", "Jewellery", "Necklaces"];
}

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
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
            className="h-[22px] w-[22px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
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

function ChevronIcon({ className = "h-3 w-3" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className={className}
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
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
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
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
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
            className="h-[20px] w-[20px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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
            className="h-[20px] w-[20px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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
            className="h-[20px] w-[20px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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
                    strokeWidth="1.6"
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

function MiniCurrencySelector({
    currency,
    setCurrency,
}: {
    currency: CurrencyCode;
    setCurrency: (c: CurrencyCode) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const selected = useMemo(
        () =>
            CURRENCY_OPTIONS.find((c) => c.code === currency) ??
            CURRENCY_OPTIONS[0],
        [currency],
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!ref.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                aria-label="Select currency"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((v) => !v)}
                className="flex h-8 items-center gap-1 rounded-full px-1 text-zinc-700 transition hover:text-zinc-900"
            >
                <img
                    src={selected.flag}
                    alt={selected.label}
                    className="h-[18px] w-[18px] rounded-full object-cover ring-1 ring-zinc-200"
                />
                <ChevronIcon className="h-3 w-3 text-zinc-500" />
            </button>

            {isOpen ? (
                <div
                    role="listbox"
                    aria-label="Currency options"
                    className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[180px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_18px_40px_rgba(17,24,39,0.12)]"
                >
                    {CURRENCY_OPTIONS.map((opt) => (
                        <button
                            key={opt.code}
                            type="button"
                            onClick={() => {
                                setCurrency(opt.code);
                                setIsOpen(false);
                            }}
                            className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] tracking-[0.02em] ${
                                opt.code === currency
                                    ? "bg-zinc-100 text-zinc-900"
                                    : "text-zinc-700 hover:bg-zinc-50"
                            }`}
                        >
                            <img
                                src={opt.flag}
                                alt=""
                                className="h-4 w-4 rounded-full object-cover"
                            />
                            <span className="font-medium">{opt.short}</span>
                            <span className="ml-auto text-[11px] text-zinc-400">
                                {opt.code.toUpperCase()}
                            </span>
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

function HeaderIconButton({
    children,
    count,
    label,
    to,
    onClick,
    ariaExpanded,
}: {
    children: ReactNode;
    count?: number;
    label: string;
    to?: string;
    onClick?: () => void;
    ariaExpanded?: boolean;
}) {
    const baseClass =
        "relative flex h-9 w-9 items-center justify-center text-zinc-700 transition hover:text-zinc-950";

    const content = (
        <>
            {children}
            {typeof count === "number" && count > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-zinc-900 px-1 text-[9px] font-bold leading-none text-white">
                    {count}
                </span>
            ) : null}
        </>
    );

    if (to) {
        return (
            <Link to={to} aria-label={label} className={baseClass}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            aria-label={label}
            aria-expanded={ariaExpanded}
            onClick={onClick}
            className={baseClass}
        >
            {content}
        </button>
    );
}

export default function Header() {
    const accountMenuRef = useRef<HTMLDivElement | null>(null);
    const desktopSearchRef = useRef<HTMLDivElement | null>(null);
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [predictiveProducts, setPredictiveProducts] = useState<Product[]>([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState(
        `${animatedCursor}`,
    );
    const [isVoiceListening, setIsVoiceListening] = useState(false);
    const [shopCategories, setShopCategories] = useState<string[]>([]);

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
    const brandLink = isAdmin ? "/admin" : "/";

    const visibleShopCategories = useMemo(
        () =>
            shopCategories.length > 0
                ? shopCategories
                : getShopCategoriesFallback(),
        [shopCategories],
    );

    const drawerLinks = useMemo(() => {
        if (isAdmin) return adminNavLinks;

        const categoryLinks = visibleShopCategories.map((category) => ({
            label: normalizeCategoryLabel(category),
            to: buildCategoryHref(category),
        }));

        return [
            { label: "Home", to: "/" },
            { label: "All Products", to: "/products" },
            ...categoryLinks,
            { label: "Blog", to: "/blog" },
            { label: "Resources", to: "/help" },
            { label: "Help", to: "/help" },
        ];
    }, [isAdmin, visibleShopCategories]);

    const querySuggestions = useMemo(
        () => buildPredictiveQuerySuggestions(searchTerm, predictiveProducts),
        [predictiveProducts, searchTerm],
    );

    useEffect(() => {
        let textIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;
        let pauseTicks = 0;

        const intervalId = window.setInterval(() => {
            const currentText = animatedSearchTexts[textIndex] ?? "";

            if (pauseTicks > 0) {
                pauseTicks -= 1;
                return;
            }

            if (!isDeleting) {
                characterIndex = Math.min(
                    characterIndex + 1,
                    currentText.length,
                );
                setAnimatedPlaceholder(
                    `${currentText.slice(0, characterIndex)}${animatedCursor}`,
                );

                if (characterIndex === currentText.length) {
                    isDeleting = true;
                    pauseTicks = 10;
                }

                return;
            }

            characterIndex = Math.max(characterIndex - 1, 0);
            setAnimatedPlaceholder(
                `${currentText.slice(0, characterIndex)}${animatedCursor}`,
            );

            if (characterIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % animatedSearchTexts.length;
                pauseTicks = 4;
            }
        }, 90);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function loadCategories() {
            try {
                const categoryData = await getCategories();

                if (!isMounted) return;

                setShopCategories(categoryData);
            } catch {
                if (!isMounted) return;

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
        const normalizedTerm = searchTerm.trim();

        if (normalizedTerm.length < 2) {
            setPredictiveProducts([]);
            setIsSearchLoading(false);
            return;
        }

        let isActive = true;
        setIsSearchLoading(true);

        const timeoutId = window.setTimeout(async () => {
            try {
                const result = await getProducts({
                    search: normalizedTerm,
                    page: 1,
                    limit: predictiveSearchLimit,
                    currency,
                });

                if (!isActive) return;

                setPredictiveProducts(
                    result.products.slice(0, predictiveSearchLimit),
                );
            } catch {
                if (!isActive) return;

                setPredictiveProducts([]);
            } finally {
                if (isActive) {
                    setIsSearchLoading(false);
                }
            }
        }, predictiveSearchDebounceMs);

        return () => {
            isActive = false;
            window.clearTimeout(timeoutId);
        };
    }, [currency, searchTerm]);

    useEffect(() => {
        if (!isSearchOpen) {
            setSearchTerm("");
            return;
        }

        const focusTimeoutId = window.setTimeout(() => {
            searchInputRef.current?.focus();
        }, 60);

        return () => {
            window.clearTimeout(focusTimeoutId);
        };
    }, [isSearchOpen]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!accountMenuRef.current?.contains(event.target as Node)) {
                setIsAccountMenuOpen(false);
            }

            if (!desktopSearchRef.current?.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsAccountMenuOpen(false);
                setIsSearchOpen(false);
                setIsDrawerOpen(false);
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
        if (typeof document === "undefined") return;

        const original = document.body.style.overflow;
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = original;
        }

        return () => {
            document.body.style.overflow = original;
        };
    }, [isDrawerOpen]);

    function handleGlobalSearchSubmit(value: string) {
        const normalizedTerm = value.trim();
        setIsSearchOpen(false);

        if (!normalizedTerm) {
            navigate("/products");
        } else {
            navigate(`/products?search=${encodeURIComponent(normalizedTerm)}`);
        }
    }

    function handleVoiceSearch() {
        if (typeof window === "undefined") return;

        const SpeechRecognitionCtor =
            (
                window as typeof window & {
                    SpeechRecognition?: new () => {
                        lang: string;
                        interimResults: boolean;
                        maxAlternatives: number;
                        onresult:
                            | ((event: {
                                  results: ArrayLike<
                                      ArrayLike<{ transcript?: string }>
                                  >;
                              }) => void)
                            | null;
                        onerror: ((event: unknown) => void) | null;
                        onend: (() => void) | null;
                        start: () => void;
                    };
                    webkitSpeechRecognition?: new () => {
                        lang: string;
                        interimResults: boolean;
                        maxAlternatives: number;
                        onresult:
                            | ((event: {
                                  results: ArrayLike<
                                      ArrayLike<{ transcript?: string }>
                                  >;
                              }) => void)
                            | null;
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
                        onresult:
                            | ((event: {
                                  results: ArrayLike<
                                      ArrayLike<{ transcript?: string }>
                                  >;
                              }) => void)
                            | null;
                        onerror: ((event: unknown) => void) | null;
                        onend: (() => void) | null;
                        start: () => void;
                    };
                }
            ).webkitSpeechRecognition;

        if (!SpeechRecognitionCtor) return;

        const recognition = new SpeechRecognitionCtor();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        setIsVoiceListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0]?.[0]?.transcript?.trim() ?? "";
            if (!transcript) return;
            setSearchTerm(transcript);
            setIsSearchOpen(true);
        };

        recognition.onerror = () => {
            setIsVoiceListening(false);
        };

        recognition.onend = () => {
            setIsVoiceListening(false);
        };

        recognition.start();
    }

    const topNavLinkClass =
        "relative inline-flex items-center text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-700 transition hover:text-zinc-950 after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-zinc-950 after:transition-transform after:duration-200 hover:after:scale-x-100";

    return (
        <header className="sticky top-0 z-30  bg-white font-parsi">
            <div ref={desktopSearchRef} className="relative">
                <div className="mx-auto flex h-[68px] max-w-[1480px] items-center justify-between gap-4 px-4 lg:h-[76px] lg:px-10">
                    {/* Left cluster */}
                    <div className="flex flex-1 items-center justify-start gap-3 sm:gap-5 lg:gap-8">
                        <HeaderIconButton
                            label={isDrawerOpen ? "Close menu" : "Open menu"}
                            ariaExpanded={isDrawerOpen}
                            onClick={() => setIsDrawerOpen((v) => !v)}
                        >
                            <MenuIcon />
                        </HeaderIconButton>
                        <nav className="hidden items-center gap-9 lg:flex">
                            <Link to="/products" className={topNavLinkClass}>
                                SHOP
                            </Link>
                            <Link to="/about" className={topNavLinkClass}>
                                ABOUT
                            </Link>
                            <Link to="/contact" className={topNavLinkClass}>
                                CONTACT
                            </Link>
                        </nav>
                    </div>

                    {/* Center brand wordmark */}
                    <Link
                        to={brandLink}
                        className="flex flex-shrink-0 items-center justify-center"
                        aria-label="I Want Jewels"
                    >
                        <img
                            src={brandLogo.src}
                            alt="I Want Jewels"
                            className="h-auto w-[180px] mix-blend-multiply"
                        />
                    </Link>

                    {/* Right cluster */}
                    <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 lg:gap-5">
                        <div ref={accountMenuRef} className="relative hidden lg:block">
                            <HeaderIconButton
                                label={accountLabel}
                                ariaExpanded={isAccountMenuOpen}
                                onClick={() => setIsAccountMenuOpen((v) => !v)}
                            >
                                <UserIcon />
                            </HeaderIconButton>

                            {isAccountMenuOpen ? (
                                <div className="absolute right-0 top-[calc(100%+18px)] z-40 w-72 overflow-hidden rounded-[24px] border border-[#eadfd4] bg-white p-3 shadow-[0_24px_60px_rgba(55,31,10,0.14)]">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="rounded-[18px] bg-[#fff7fb] px-4 py-4">
                                                <p className="text-base font-bold text-[#17110d]">
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

                        <HeaderIconButton
                            label="Search"
                            ariaExpanded={isSearchOpen}
                            onClick={() => setIsSearchOpen((v) => !v)}
                        >
                            <SearchIcon />
                        </HeaderIconButton>

                        <div className="hidden lg:block">
                            <MiniCurrencySelector
                                currency={currency}
                                setCurrency={setCurrency}
                            />
                        </div>

                        {isAdmin ? (
                            <>
                                <div className="hidden lg:block">
                                    <HeaderIconButton
                                        label="Admin Wishlist"
                                        to="/admin/wishlist"
                                    >
                                        <HeartIcon />
                                    </HeaderIconButton>
                                </div>
                                <HeaderIconButton
                                    label="Admin Cart"
                                    to="/admin/cart"
                                >
                                    <BagIcon />
                                </HeaderIconButton>
                            </>
                        ) : (
                            <>
                                <div className="hidden lg:block">
                                    <HeaderIconButton
                                        label="Wishlist"
                                        count={wishlistCount}
                                        to="/wishlist"
                                    >
                                        <HeartIcon />
                                    </HeaderIconButton>
                                </div>
                                <HeaderIconButton
                                    label="Cart"
                                    count={itemCount}
                                    to="/cart"
                                >
                                    <BagIcon />
                                </HeaderIconButton>
                            </>
                        )}
                    </div>
                </div>

                {/* Backdrop overlay for search modal */}
                <div
                    aria-hidden={!isSearchOpen}
                    onClick={() => setIsSearchOpen(false)}
                    className={`fixed inset-x-0 bottom-0 top-[68px] z-30 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 lg:top-[76px] ${
                        isSearchOpen
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0"
                    }`}
                />

                {/* Floating search modal */}
                <div
                    aria-hidden={!isSearchOpen}
                    className={`absolute left-1/2 top-full z-40 w-[calc(100%-32px)] max-w-[560px] -translate-x-1/2 transition-all duration-300 ease-out ${
                        isSearchOpen
                            ? "pointer-events-auto translate-y-3 opacity-100"
                            : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleGlobalSearchSubmit(searchTerm);
                        }}
                    >
                        <label className="flex h-11 w-full items-center gap-2.5 rounded-full border border-[#d5d1ce] bg-white px-4 text-sm text-zinc-400 shadow-[0_18px_40px_rgba(17,24,39,0.10)]">
                            <SearchIcon />
                            <input
                                ref={searchInputRef}
                                type="search"
                                placeholder={animatedPlaceholder}
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                className="w-full border-0 bg-transparent text-[14px] text-zinc-700 outline-none placeholder:text-zinc-400"
                            />
                            <button
                                type="button"
                                aria-label="Voice search"
                                onClick={handleVoiceSearch}
                                className={`text-pink-400 transition ${
                                    isVoiceListening
                                        ? "scale-110 text-pink-500"
                                        : "hover:text-pink-500"
                                }`}
                            >
                                <MicIcon />
                            </button>
                        </label>

                        {searchTerm.trim().length > 0 ? (
                            <div className="mt-2.5 rounded-2xl border border-[#eadfd4] bg-white p-3.5 shadow-[0_18px_50px_rgba(55,31,10,0.10)]">
                                <p className="text-[13px] font-medium text-zinc-900">
                                    Search for &quot;
                                    <span className="text-pink-500">
                                        {searchTerm.trim()}
                                    </span>
                                    &quot;
                                </p>

                                {querySuggestions.length > 0 ? (
                                    <div className="mt-2.5">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                                            Suggestions
                                        </p>
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                            {querySuggestions.map(
                                                (suggestion) => (
                                                    <button
                                                        key={suggestion}
                                                        type="button"
                                                        onClick={() => {
                                                            setSearchTerm(
                                                                suggestion,
                                                            );
                                                            handleGlobalSearchSubmit(
                                                                suggestion,
                                                            );
                                                        }}
                                                        className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 transition hover:border-pink-300 hover:text-pink-500"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ) : null}

                                <div className="mt-3 space-y-1">
                                    {isSearchLoading ? (
                                        <p className="text-[13px] text-zinc-500">
                                            Searching products...
                                        </p>
                                    ) : predictiveProducts.length > 0 ? (
                                        predictiveProducts.map((product) => (
                                            <Link
                                                key={product.id}
                                                to={buildProductDetailHref(
                                                    product,
                                                )}
                                                onClick={() =>
                                                    setIsSearchOpen(false)
                                                }
                                                className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition hover:bg-[#fff7fb]"
                                            >
                                                <img
                                                    src={product.primaryImage}
                                                    alt={product.title}
                                                    className="h-9 w-9 rounded-md object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-[13px] font-medium text-zinc-900">
                                                        {product.title}
                                                    </p>
                                                    <p className="text-[11px] text-zinc-500">
                                                        {formatPrice(
                                                            product.minPrice,
                                                            currency,
                                                        )}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-[13px] text-zinc-500">
                                            No related products found.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleGlobalSearchSubmit(searchTerm)
                                        }
                                        className="w-full rounded-full border border-[#e5d7cc] px-3.5 py-1.5 text-[12px] font-semibold tracking-[0.04em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                                    >
                                        View all results
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>

            {/* Hamburger overlay + drawer */}
            <div
                aria-hidden={!isDrawerOpen}
                onClick={() => setIsDrawerOpen(false)}
                className={`iwj-hamburger-overlay ${isDrawerOpen ? "iwj-hamburger-overlay--open" : ""}`}
            />

            <aside
                ref={drawerRef}
                aria-hidden={!isDrawerOpen}
                aria-label="Site menu"
                className={`iwj-hamburger-drawer font-parsi ${
                    isDrawerOpen ? "iwj-hamburger-drawer--open" : ""
                }`}
            >
                <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
                    <span className="font-parsi text-[20px] font-bold uppercase tracking-[-0.01em] ">
                        EXPLORE MORE
                    </span>
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950"
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-8 pt-6">
                    {!isAdmin ? (
                        <nav className="mb-2 flex flex-col lg:hidden">
                            <Link
                                to="/products"
                                onClick={() => setIsDrawerOpen(false)}
                                className="iwj-hamburger-link border-b border-zinc-100 py-4 text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition hover:text-pink-500"
                                style={{
                                    transitionDelay: `${isDrawerOpen ? 60 : 0}ms`,
                                }}
                            >
                                Shop
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setIsDrawerOpen(false)}
                                className="iwj-hamburger-link border-b border-zinc-100 py-4 text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition hover:text-pink-500"
                                style={{
                                    transitionDelay: `${isDrawerOpen ? 100 : 0}ms`,
                                }}
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => setIsDrawerOpen(false)}
                                className="iwj-hamburger-link border-b border-zinc-100 py-4 text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition hover:text-pink-500"
                                style={{
                                    transitionDelay: `${isDrawerOpen ? 140 : 0}ms`,
                                }}
                            >
                                Contact
                            </Link>
                        </nav>
                    ) : null}

                    <nav className="flex flex-col">
                        {drawerLinks.map((link, index) => (
                            <Link
                                key={`${link.label}-${link.to}`}
                                to={link.to}
                                onClick={() => setIsDrawerOpen(false)}
                                className="iwj-hamburger-link border-b border-zinc-100 py-4 text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition hover:text-pink-500"
                                style={{
                                    transitionDelay: `${isDrawerOpen ? 80 + index * 40 : 0}ms`,
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 space-y-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                            Account
                        </p>
                        {isAuthenticated ? (
                            <>
                                <p className="text-sm font-semibold text-zinc-900">
                                    {accountName}
                                </p>
                                <div className="grid gap-2">
                                    {!isAdmin && (
                                        <>
                                            <Link
                                                to="/profile"
                                                onClick={() =>
                                                    setIsDrawerOpen(false)
                                                }
                                                className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-800 transition hover:bg-zinc-50"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to="/orders"
                                                onClick={() =>
                                                    setIsDrawerOpen(false)
                                                }
                                                className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-800 transition hover:bg-zinc-50"
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <PackageSearch className="h-4 w-4" />
                                                    My Orders
                                                </span>
                                            </Link>
                                            <Link
                                                to="/tickets"
                                                onClick={() =>
                                                    setIsDrawerOpen(false)
                                                }
                                                className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-800 transition hover:bg-zinc-50"
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <Ticket className="h-4 w-4" />
                                                    Tickets
                                                </span>
                                            </Link>
                                        </>
                                    )}
                                    {isAdmin && (
                                        <Link
                                            to="/admin/address"
                                            onClick={() =>
                                                setIsDrawerOpen(false)
                                            }
                                            className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-800 transition hover:bg-zinc-50"
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <MapPinHouse className="h-4 w-4" />
                                                Admin Address
                                            </span>
                                        </Link>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            logout();
                                            setIsDrawerOpen(false);
                                        }}
                                        className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-[13px] font-medium uppercase tracking-[0.12em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white"
                                    >
                                        <span className="inline-flex items-center gap-2">
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="grid gap-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="rounded-lg bg-zinc-900 px-3 py-2 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-zinc-700"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <LogIn className="h-4 w-4" />
                                        Login
                                    </span>
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-[13px] font-medium uppercase tracking-[0.14em] text-zinc-800 transition hover:bg-zinc-50"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 lg:hidden">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                            Currency
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {CURRENCY_OPTIONS.map((opt) => {
                                const isActive = currency === opt.code;

                                return (
                                    <button
                                        key={opt.code}
                                        type="button"
                                        onClick={() => setCurrency(opt.code)}
                                        className={`flex items-center gap-2 border px-3 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition ${
                                            isActive
                                                ? "border-zinc-900 bg-zinc-900 text-white"
                                                : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                                        }`}
                                    >
                                        <img
                                            src={opt.flag}
                                            alt=""
                                            className="h-4 w-4 object-cover"
                                        />
                                        <span>{opt.short}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                            Follow
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.name}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:border-pink-300 hover:text-pink-500"
                                >
                                    <SocialIcon name={social.name} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </header>
    );
}
