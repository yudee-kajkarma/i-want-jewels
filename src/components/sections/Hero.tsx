"use client";

import { Link } from "@/lib/router";
import bannerHero from "@/assets/banner/Banner-Hero.jpg";
import bannerHeroSmall from "@/assets/image/M.Banner.jpeg";
import shopPageBanner from "@/assets/banner/hero-banner.jpeg";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-white px-5 lg:px-20">
            <img
                src={shopPageBanner.src}
                alt="Shop the collection"
                className="iwj-hero-image hidden h-auto w-full md:block"
            />
            <img
                src={bannerHeroSmall.src}
                alt="Fresh Style for the Season"
                className="iwj-hero-image block h-auto w-full md:hidden"
            />
            {/* <img
                src={bannerHero.src}
                alt="Fresh Style for the Season"
                className="iwj-hero-image hidden h-auto w-full md:block"
            /> */}

            <div className="pointer-events-none absolute inset-x-0 top-4 left-[7%] px-4 md:top-[8%] md:left-[10.5%] lg:top-[10%]">
                <h1 className="max-w-[16rem] text-[20px] font-semibold uppercase tracking-[0.18em] text-zinc-900 sm:max-w-[22rem] sm:text-[28px] md:max-w-[28rem] md:text-[34px] lg:max-w-[34rem] lg:text-[42px]">
                    Lab-grown diamond jewellery for everyday luxury
                </h1>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-4 left-[7%] px-4 md:top-[55%] md:bottom-auto md:left-[10.5%]">
                <Link
                    to="/products"
                    className="iwj-hero-cta pointer-events-auto inline-block border border-zinc-200 bg-white px-5 py-2.5 font-poppins text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white sm:px-8 sm:py-3 sm:text-[12px] sm:tracking-[0.22em] md:px-6 md:py-2.5 md:text-[13px] lg:px-10 lg:py-3.5 lg:text-[14px]"
                >
                    Explore Collection
                </Link>
            </div>
        </section>
    );
}
