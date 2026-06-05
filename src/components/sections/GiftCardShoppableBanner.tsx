"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { useCurrency } from "../../context/CurrencyContext";
import { getProductBySlug } from "../../services/productService";
import type { PriceInput } from "../../utils/price";
import bannerGiftcardImage from "../../assets/image/Gift-card.png";

const GIFT_CARD_HREF = "/products?category=Gift%20card";

type GiftCardHotspot = {
    key: string;
    slug: string;
    /** Fallback label shown until the product title loads (or if it fails). */
    fallbackLabel: string;
    /** Position as a percentage of the banner — the model photo only shows on
     *  desktop, so these markers are desktop-only too. Nudge if one drifts. */
    x: string;
    y: string;
    /** Marker diameter — the hero piece reads larger. */
    size: "sm" | "lg";
    /** Which way the popup opens so it never runs off the right edge. */
    open: "left" | "right";
};

const HOTSPOTS: GiftCardHotspot[] = [
    {
        key: "earring",
        slug: "serafina-106557",
        fallbackLabel: "Serafina Earrings",
        x: "78%",
        y: "32%",
        size: "sm",
        open: "left",
    },
    {
        key: "choker",
        slug: "serafina-lab-grown-diamond-necklace-feminine-design-14kt-gold-196669",
        fallbackLabel: "Serafina Necklace",
        x: "71%",
        y: "70%",
        size: "sm",
        open: "left",
    },
    {
        key: "necklace",
        slug: "marcella-high-carat-lab-grown-diamond-necklace-carat-crush-143613",
        fallbackLabel: "Marcella Necklace",
        x: "70%",
        y: "81%",
        size: "lg",
        open: "left",
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

export default function GiftCardShoppableBanner() {
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

    return (
        <section className="mx-auto max-w-[1480px] px-6 py-12 font-raleway lg:px-10">
            <div ref={containerRef} className="relative overflow-hidden">
                <img
                    src={bannerGiftcardImage.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
                />

                {/* Shoppable markers — overlay the model photo (desktop only).
                    The layer ignores pointer events so the gift-card CTA stays
                    clickable; only the markers themselves capture clicks. */}
                <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
                    {HOTSPOTS.map((hotspot) => {
                        const product = products[hotspot.key];
                        const label = buildCollectionLabel(
                            product,
                            hotspot.fallbackLabel,
                        );
                        const isOpen = activeKey === hotspot.key;
                        const markerSize =
                            hotspot.size === "lg"
                                ? "h-14 w-14 xl:h-16 xl:w-16"
                                : "h-9 w-9 xl:h-11 xl:w-11";

                        return (
                            <div
                                key={hotspot.key}
                                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                                style={{ left: hotspot.x, top: hotspot.y }}
                                onMouseEnter={() =>
                                    handleMarkerEnter(hotspot.key)
                                }
                                onMouseLeave={handleMarkerLeave}
                            >
                                {/* Pulse marker */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleMarkerClick(hotspot.key)
                                    }
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
                                    className={`pointer-events-none absolute bottom-1/2 z-20 mb-2 w-44 transition duration-200 xl:w-52 ${
                                        hotspot.open === "left"
                                            ? "right-1/2 mr-2"
                                            : "left-1/2 ml-2"
                                    } ${
                                        isOpen
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-1 opacity-0"
                                    }`}
                                >
                                    <Link
                                        to={`/products/${hotspot.slug}`}
                                        className={`block bg-white px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] ${
                                            isOpen ? "pointer-events-auto" : ""
                                        }`}
                                    >
                                        <p className="line-clamp-2 text-[12px] font-medium leading-snug tracking-[-0.01em] text-zinc-900 xl:text-[13px] font-parsi">
                                            {label}
                                        </p>
                                        <div className="mt-1.5 flex items-center justify-between gap-2">
                                            <span className="text-[13px] font-semibold text-zinc-900 xl:text-[15px]">
                                                {product?.price != null
                                                    ? format(product.price)
                                                    : "View product"}
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
                    })}
                </div>

                <div className="relative flex items-center justify-center px-6 py-12 sm:px-10 lg:justify-start lg:px-14 lg:py-20">
                    <div className="w-full max-w-[440px] bg-black px-8 py-10 text-white sm:px-10 sm:py-12">
                        <h2 className="text-center text-[22px] font-medium uppercase leading-[1.15] tracking-[0.16em] sm:text-[26px] font-parsi">
                            <span className="block">The Perfect Gift,</span>
                            <span className="block">Every Time</span>
                        </h2>
                        <p className="mt-3 text-center text-[12px] tracking-wide text-white/90">
                            Give them the freedom to choose jewellery that feels
                            truly personal.
                        </p>

                        <ul className="mt-10 space-y-2 pl-2 text-[13px] text-white/95">
                            <li>• Delivered instantly by email</li>
                            <li>• Available in flexible amounts</li>
                            <li>• Redeemable across all jewellery</li>
                            <li>• Ideal for every special moment</li>
                        </ul>

                        <p className="mt-10 text-center text-[11px] tracking-wide text-white/80">
                            Simple. Personal. Always appreciated.
                        </p>

                        <Link
                            to={GIFT_CARD_HREF}
                            className="mt-3 block w-full bg-pink-500 px-6 py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-600 sm:text-[13px] font-parsi"
                        >
                            Shop Gift Cards
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
