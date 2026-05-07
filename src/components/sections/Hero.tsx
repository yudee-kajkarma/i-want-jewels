"use client";

import { Link } from "@/lib/router";
import bannerHero from "@/assets/banner/Banner-Hero.jpg";

export default function Hero() {
    return (
        <section className="relative w-full overflow-hidden bg-white px-20">
            <img
                src={bannerHero.src}
                alt="Fresh Style for the Season"
                className="iwj-hero-image block h-auto w-full"
            />

            <div className="pointer-events-none absolute inset-x-0 top-[85%] flex justify-center px-4">
                <Link
                    to="/products"
                    className="iwj-hero-cta pointer-events-auto inline-block border border-zinc-200 bg-white px-6 py-2.5 font-parsi text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white sm:px-8 sm:py-3 sm:text-[12px] md:text-[13px] lg:px-10 lg:py-3.5 lg:text-[14px]"
                >
                    Explore Collection
                </Link>
            </div>
        </section>
    );
}
