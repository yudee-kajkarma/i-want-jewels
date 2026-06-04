"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { useCurrency } from "../../context/CurrencyContext";
import { getProductBySlug } from "../../services/productService";
import type { PriceInput } from "../../utils/price";
import alessiaRingShellImage from "../../assets/shopping-banner/alessia-collection-2.jpeg";
import alessiaBanglesImage from "../../assets/shopping-banner/alessia-collection-1.jpeg";
import alessiaNecklaceImage from "../../assets/shopping-banner/alessia-collection-3.jpeg";
import alessiaModelImage from "../../assets/shopping-banner/alessia-collection-4.png";

const ALESSIA_COLLECTION_HREF = "/products?collection=Alessia";

type HotspotConfig = {
    key: string;
    slug: string;
    /** Fallback label shown until the product title loads (or if it fails). */
    fallbackLabel: string;
    /** Position as a percentage of the model image (responsive by design). */
    x: string;
    y: string;
    /** Marker diameter — the bracelet circle is larger, like the reference. */
    size: "sm" | "lg";
    /** Which way the popup card opens so it never runs off-screen. */
    open: "left" | "right";
};

// Positions are percentages of the RENDERED panel (a fixed 4:5 portrait crop,
// the same at every breakpoint — so one set of values stays accurate as the
// image scales). Nudge these if a marker drifts off its piece.
const HOTSPOTS: HotspotConfig[] = [
    {
        key: "ring",
        slug: "alessia-lab-grown-diamond-ring-delicate-14kt-gold-plating-088317",
        fallbackLabel: "Diamond Ring",
        x: "12.5%",
        y: "63%",
        size: "sm",
        open: "right",
    },
    {
        key: "necklace",
        slug: "alessia-lab-grown-diamond-necklace-layering-pendant-14kt-gold-032829",
        fallbackLabel: "Layering Necklace",
        x: "52%",
        y: "65%",
        size: "sm",
        open: "right",
    },
    {
        key: "bracelet",
        slug: "alessia-lab-grown-diamond-bracelet-carat-crush-14kt-gold-888893",
        fallbackLabel: "Carat Crush Bracelet",
        x: "46%",
        y: "77%",
        size: "lg",
        open: "left",
    },
];

type HotspotProduct = {
    title: string;
    price: PriceInput | null;
};

export default function ShopTheLookBanner() {
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
        <section className="mx-auto max-w-[1480px] px-6 py-12 font-parsi lg:px-10">
            <div className="grid items-stretch overflow-hidden lg:grid-cols-2 lg:items-start">
                {/* Left: collage card */}
                <div className="flex flex-col bg-[#f1f1f1] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                    <h2 className="text-[22px] font-medium uppercase leading-[1.2] tracking-[0.12em] text-zinc-900 sm:text-[26px] lg:text-[34px]">
                        <span className="block">Explore Our</span>
                        <span className="block">Alessia Collection</span>
                    </h2>

                    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                        <img
                            src={alessiaRingShellImage.src}
                            alt="Alessia diamond ring resting on a seashell"
                            className="aspect-square w-full object-cover"
                        />
                        <img
                            src={alessiaBanglesImage.src}
                            alt="Stacked Alessia diamond bracelets"
                            className="aspect-square w-full object-cover"
                        />
                        <div className="relative col-span-2">
                            <img
                                src={alessiaNecklaceImage.src}
                                alt="Alessia horseshoe pendant necklace"
                                className="aspect-[16/10] w-full object-cover"
                            />
                            <Link
                                to={ALESSIA_COLLECTION_HREF}
                                className="absolute bottom-5 right-5 border border-zinc-900 bg-white/95 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white sm:text-[12px]"
                            >
                                Explore More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right: shoppable model image */}
                <div
                    ref={containerRef}
                    className="relative aspect-[4/5] w-full"
                >
                    <img
                        src={alessiaModelImage.src}
                        alt="Model wearing the Alessia diamond ring, necklace and bracelet"
                        className="h-full w-full object-cover object-center"
                    />

                    {HOTSPOTS.map((hotspot) => {
                        const product = products[hotspot.key];
                        const label = product?.title ?? hotspot.fallbackLabel;
                        const isOpen = activeKey === hotspot.key;
                        const markerSize =
                            hotspot.size === "lg"
                                ? "h-14 w-14 sm:h-16 sm:w-16"
                                : "h-9 w-9 sm:h-11 sm:w-11";

                        return (
                            <div
                                key={hotspot.key}
                                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
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
                                    className={`pointer-events-none absolute bottom-1/2 z-20 mb-2 w-44 transition duration-200 sm:w-52 ${
                                        hotspot.open === "left"
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
            </div>
        </section>
    );
}
