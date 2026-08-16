"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { splitLines } from "@/i18n/splitLines";
import { useCurrency } from "../../context/CurrencyContext";
import { getProductBySlug } from "../../services/productService";
import type { PriceInput } from "../../utils/price";
import concettaDesktopBanner from "../../assets/image/D.Concetta-Collection1.jpeg";
import concettaMobileBanner from "../../assets/concetaa-shopiing-banner/M.Concetta-Collection.png";

const CONCETTA_COLLECTION_HREF = "/products?collection=Concetta";

type HotspotPlacement = {
    /** Position as a percentage of the rendered image. */
    x: string;
    y: string;
    /** Marker diameter — larger circles read as the "hero" piece. */
    size: "sm" | "lg";
    /** Which way the popup card opens so it never runs off-screen. */
    open: "left" | "right";
};

type ConcettaHotspot = {
    key: string;
    slug: string;
    /** Fallback label shown until the product title loads (or if it fails). */
    fallbackLabel: string;
    /** The desktop and mobile photos are framed differently, so each
     *  breakpoint keeps its own marker coordinates. Nudge these if a
     *  marker drifts off its piece. */
    desktop: HotspotPlacement;
    mobile: HotspotPlacement;
};

const HOTSPOTS: ConcettaHotspot[] = [
    {
        key: "earrings",
        slug: "concetta-long-lab-grown-diamond-earrings-14kt-gold-plating-663613",
        fallbackLabel: "Concetta Earrings",
        desktop: { x: "55%", y: "21%", size: "sm", open: "right" },
        mobile: { x: "42%", y: "28%", size: "sm", open: "right" },
    },
    {
        key: "pendant",
        slug: "aurora-spark-lab-grown-diamond-necklace-pendant-14kt-gold-639613",
        fallbackLabel: "Aurora Pendant",
        desktop: { x: "66.5%", y: "71%", size: "sm", open: "left" },
        mobile: { x: "59%", y: "59%", size: "sm", open: "left" },
    },
    {
        key: "ring",
        slug: "renata-lab-grown-diamond-ring-classic-setting-14kt-gold-579837",
        fallbackLabel: "Renata Ring",
        desktop: { x: "75%", y: "50%", size: "sm", open: "left" },
        mobile: { x: "73%", y: "46%", size: "sm", open: "left" },
    },
    {
        key: "necklace",
        slug: "aurora-y-836221",
        fallbackLabel: "Aurora Necklace",
        desktop: { x: "68%", y: "87%", size: "lg", open: "left" },
        mobile: { x: "61%", y: "66%", size: "lg", open: "left" },
    },
    {
        key: "bracelet",
        slug: "concetta-lab-grown-diamond-bracelet-classic-chain-14kt-gold-347645",
        fallbackLabel: "Concetta Bracelet",
        desktop: { x: "83.5%", y: "88%", size: "sm", open: "left" },
        mobile: { x: "83%", y: "73%", size: "sm", open: "left" },
    },
];

type HotspotProduct = {
    title: string;
    price: PriceInput | null;
    category: string;
    collectionName: string;
};

function buildCollectionLabel(
    product: HotspotProduct | undefined,
    fallbackLabel: string,
): string {
    if (!product) {
        return fallbackLabel;
    }

    const collectionPart = product.collectionName?.trim();
    const categoryPart = product.category?.trim();

    if (!collectionPart && !categoryPart) {
        return product.title || fallbackLabel;
    }

    const toTitle = (value: string) =>
        value.charAt(0).toUpperCase() + value.slice(1);

    return [collectionPart, categoryPart]
        .filter(Boolean)
        .map((part) => toTitle(part as string))
        .join(" ");
}

export default function ConcettaShoppableBanner() {
    const { t } = useTranslation();
    const { format } = useCurrency();
    const [products, setProducts] = useState<Record<string, HotspotProduct>>(
        {},
    );
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [canHover, setCanHover] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Fetch each hotspot product by slug. A failed slug simply keeps its
    // fallback label so the marker never breaks.
    useEffect(() => {
        let isMounted = true;

        void Promise.allSettled(
            HOTSPOTS.map((hotspot) => getProductBySlug(hotspot.slug)),
        ).then((results) => {
            if (!isMounted) {
                return;
            }

            const next: Record<string, HotspotProduct> = {};

            results.forEach((result, index) => {
                const hotspot = HOTSPOTS[index];

                if (result.status === "fulfilled") {
                    next[hotspot.key] = {
                        title: result.value.title || hotspot.fallbackLabel,
                        price: result.value.minPrice,
                        category: result.value.category ?? "",
                        collectionName: result.value.collectionName ?? "",
                    };
                }
            });

            setProducts(next);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    // Detect hover capability once: desktop uses hover, touch uses tap.
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const query = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setCanHover(query.matches);

        update();
        query.addEventListener("change", update);

        return () => query.removeEventListener("change", update);
    }, []);

    // On touch devices, close the open card when tapping outside or pressing Escape.
    useEffect(() => {
        if (canHover || !activeKey) {
            return;
        }

        function handlePointerDown(event: PointerEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setActiveKey(null);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveKey(null);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [canHover, activeKey]);

    function handleMarkerEnter(key: string) {
        if (canHover) {
            setActiveKey(key);
        }
    }

    function handleMarkerLeave() {
        if (canHover) {
            setActiveKey(null);
        }
    }

    function handleMarkerClick(key: string) {
        if (!canHover) {
            setActiveKey((current) => (current === key ? null : key));
        }
    }

    function renderHotspots(breakpoint: "desktop" | "mobile") {
        return HOTSPOTS.map((hotspot) => {
            const placement = hotspot[breakpoint];
            const product = products[hotspot.key];
            const label = buildCollectionLabel(product, hotspot.fallbackLabel);
            const isOpen = activeKey === hotspot.key;
            const markerSize =
                placement.size === "lg"
                    ? "h-14 w-14 sm:h-16 sm:w-16"
                    : "h-9 w-9 sm:h-11 sm:w-11";

            return (
                <div
                    key={`${breakpoint}-${hotspot.key}`}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: placement.x, top: placement.y }}
                    onMouseEnter={() => handleMarkerEnter(hotspot.key)}
                    onMouseLeave={handleMarkerLeave}
                >
                    {/* Pulse marker */}
                    <button
                        type="button"
                        onClick={() => handleMarkerClick(hotspot.key)}
                        aria-label={label}
                        aria-expanded={isOpen}
                        className={`relative ${markerSize} rounded-full border border-white/90 bg-white/5 transition hover:bg-white/20`}
                    >
                        <span
                            aria-hidden="true"
                            className="absolute -inset-px animate-ping rounded-full border border-white/60"
                        />
                    </button>

                    {/* Popup card */}
                    <div
                        className={`pointer-events-none absolute bottom-1/2 z-20 mb-2 w-44 transition duration-200 sm:w-52 ${
                            placement.open === "left"
                                ? "right-1/2 mr-2"
                                : "left-1/2 ml-2"
                        } ${
                            isOpen
                                ? "translate-y-0 opacity-100"
                                : "pointer-events-none translate-y-1 opacity-0"
                        }`}
                    >
                        <Link
                            to={`/products/${hotspot.slug}`}
                            className={`block bg-white px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] ${
                                isOpen ? "pointer-events-auto" : ""
                            }`}
                        >
                            <p className="line-clamp-2 text-[12px] font-medium leading-snug tracking-[-0.01em] text-zinc-900 sm:text-[13px]">
                                {label}
                            </p>
                            <div className="mt-1.5 flex items-center justify-between gap-2">
                                <span className="text-[13px] font-semibold text-zinc-900 sm:text-[15px]">
                                    {product?.price != null
                                        ? format(product.price)
                                        : t("home.viewProduct")}
                                </span>
                                <ArrowRight
                                    className="h-4 w-4 text-zinc-500"
                                    aria-hidden="true"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            );
        });
    }

    return (
        <section className="mx-auto max-w-[1480px] px-6 py-12 font-poppins lg:px-10">
            <div ref={containerRef} className="relative overflow-hidden">
                {/* Desktop */}
                <div className="relative hidden lg:block">
                    <img
                        src={concettaDesktopBanner.src}
                        alt="Crafted for modern elegance — the Concetta collection"
                        className="block h-auto w-full"
                    />

                    <div className="pointer-events-none absolute left-0 top-0 p-12 xl:p-16">
                        <h2 className="text-[34px] font-medium uppercase leading-[1.18] tracking-[0.16em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.28)] xl:text-[42px]">
                            {splitLines(t("home.craftedForElegance")).map((line) => (
                                <span key={line} className="block">{line}</span>
                            ))}
                        </h2>
                    </div>

                    <Link
                        to={CONCETTA_COLLECTION_HREF}
                        className="absolute bottom-12 left-12 inline-block border border-white px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-zinc-900 xl:left-16"
                    >
                        {t("common.shopNow")}
                    </Link>

                    {renderHotspots("desktop")}
                </div>

                {/* Mobile */}
                <div className="relative lg:hidden">
                    <img
                        src={concettaMobileBanner.src}
                        alt="Crafted for modern elegance — the Concetta collection"
                        className="block h-auto w-full"
                    />

                    <div className="absolute bottom-5 left-5">
                        <h2 className="text-[18px] font-medium uppercase leading-[1.22] tracking-[0.12em] text-[#2a211c]">
                            {splitLines(t("home.craftedForElegance")).map((line) => (
                                <span key={line} className="block">{line}</span>
                            ))}
                        </h2>
                        <Link
                            to={CONCETTA_COLLECTION_HREF}
                            className="mt-3 inline-block border border-[#2a211c] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#2a211c] transition hover:bg-[#2a211c] hover:text-white"
                        >
                            {t("common.shopNow")}
                        </Link>
                    </div>

                    {renderHotspots("mobile")}
                </div>
            </div>
        </section>
    );
}
