"use client";

import { useTranslation } from "react-i18next";
import { Link } from "@/lib/router";
import bannerHeroSmall from "@/assets/image/M.Banner.jpeg";
import shopPageBanner from "@/assets/banner/hero-banner.jpeg";

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="relative w-full overflow-hidden bg-white px-5 lg:px-20">
            {/* The hero artwork carries the headline visually, so the page's H1
                lives here as text for crawlers and screen readers. */}
            <h1 className="sr-only">{t("hero.heading")}</h1>

            <img
                src={shopPageBanner.src}
                alt={t("hero.shopCollectionAlt")}
                className="iwj-hero-image hidden h-auto w-full md:block"
            />
            <img
                src={bannerHeroSmall.src}
                alt={t("hero.seasonStyleAlt")}
                className="iwj-hero-image block h-auto w-full md:hidden"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-4 left-[7%] px-4 md:top-[55%] md:bottom-auto md:left-[10.5%]">
                <Link
                    to="/products"
                    className="iwj-hero-cta pointer-events-auto inline-block border border-zinc-200 bg-white px-5 py-2.5 font-poppins text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white sm:px-8 sm:py-3 sm:text-[12px] sm:tracking-[0.22em] md:px-6 md:py-2.5 md:text-[13px] lg:px-10 lg:py-3.5 lg:text-[14px]"
                >
                    {t("hero.cta")}
                </Link>
            </div>
        </section>
    );
}
