"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/lib/router";
import ProductCard from "@/components/sections/ProductCard";
import ProductCardSkeleton from "@/components/sections/ProductCardSkeleton";
import { getRandomProducts } from "@/services/productService";
import type { Product } from "@/types/product";
import { useTranslation } from "react-i18next";

type ExploreOurStoreProps = {
    count?: number;
    title?: string;
    className?: string;
};

/**
 * A blog-embedded row of random shop products, rendered with the same
 * ProductCard used on the /shop grid. Fetches its own random set on mount, so
 * two instances on one page show different products. Renders nothing when the
 * store has no products (or the fetch fails).
 */
export default function ExploreOurStore({
    count = 4,
    title = "Explore Our Store",
    className = "",
}: ExploreOurStoreProps) {
    const { t } = useTranslation();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const updateScrollState = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setCanLeft(scrollLeft > 4);
        setCanRight(scrollLeft < scrollWidth - clientWidth - 4);
    }, []);

    // Recompute the chevron visibility on scroll, resize, and whenever the
    // rendered cards change.
    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);
        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [updateScrollState, products, isLoading]);

    function scrollByDir(direction: -1 | 1) {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
    }

    useEffect(() => {
        let active = true;
        setIsLoading(true);
        getRandomProducts(count)
            .then((items) => {
                if (active) setProducts(items);
            })
            .finally(() => {
                if (active) setIsLoading(false);
            });
        return () => {
            active = false;
        };
    }, [count]);

    // Nothing to show and not loading → render nothing so the article flows cleanly.
    if (!isLoading && products.length === 0) return null;

    return (
        <section className={`my-12 ${className}`}>
            <div className="mb-6 flex items-end justify-between gap-4">
                <h2 className="font-play text-2xl md:text-3xl font-semibold text-[#1f2732]">
                    {title === "Explore Our Store" ? t("exploreOurStore.title") : title}
                </h2>
                <Link
                    to="/products"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#a53b79] transition hover:text-[#7a3a61]"
                >
                    {t("exploreOurStore.viewAll")} &rarr;
                </Link>
            </div>

            {/* Mobile: 2-col grid (fits the full-width column). md+: horizontal
                scroll rail with chevron controls so cards never overflow the
                narrow article column. */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="grid grid-cols-2 gap-5 md:flex md:snap-x md:snap-mandatory md:gap-6 md:overflow-x-auto md:pb-3 md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden"
                >
                    {isLoading
                        ? Array.from({ length: count }).map((_, index) => (
                              <div
                                  key={`explore-skeleton-${index}`}
                                  className="md:w-[240px] md:shrink-0 md:snap-start"
                              >
                                  <ProductCardSkeleton />
                              </div>
                          ))
                        : products.map((product) => (
                              <div
                                  key={product.id}
                                  className="md:w-[240px] md:shrink-0 md:snap-start"
                              >
                                  <ProductCard
                                      item={product}
                                      layout="grid"
                                      className="aspect-square md:aspect-auto h-[10rem] md:h-[20rem]"
                                  />
                              </div>
                          ))}
                </div>

                {/* Scroll chevrons — md+ only; fade out at each end. */}
                <button
                    type="button"
                    onClick={() => scrollByDir(-1)}
                    aria-label={t("exploreOurStore.scrollPrev")}
                    className={`absolute left-0 top-[10rem] z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#1f2732] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition hover:bg-[#fff2fa] md:flex ${
                        canLeft ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
                </button>
                <button
                    type="button"
                    onClick={() => scrollByDir(1)}
                    aria-label={t("exploreOurStore.scrollNext")}
                    className={`absolute right-0 top-[10rem] z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#1f2732] shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition hover:bg-[#fff2fa] md:flex ${
                        canRight ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
                </button>
            </div>
        </section>
    );
}
