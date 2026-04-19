"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import banner1 from "@/assets/banner/Banner-1.jpg.jpeg";
import banner2 from "@/assets/banner/Banner-2.jpg.jpeg";

const topMarqueeItems = [
    "10% Off On Orders Above $249",
    "Pouch With Every Order",
    "Free Shipping On Every Purchase",
];

const bottomMarqueeItems = [
    "Buy 1 Get 10% Off",
    "Buy 2 Get 15% Off",
    "Buy 3 Get 20% Off",
];

const heroSlides = [
    {
        src: banner2.src,
        alt: "Model wearing modern diamond jewellery",
        ctaLabel: "Explore Our Jewellery",
        ctaAlign: "left" as const,
    },
    {
        src: banner1.src,
        alt: "Model with elegant jewellery styling",
        ctaLabel: "Shop The Collection",
        ctaAlign: "right" as const,
    },
];

function MarqueeRow({ items }: { items: string[] }) {
    return (
        <div className="hero-marquee">
            <div className="hero-marquee__track">
                {[0, 1].map((copyIndex) => (
                    <div key={copyIndex} className="hero-marquee__group">
                        {items.map((item) => (
                            <span
                                key={`${copyIndex}-${item}`}
                                className="hero-marquee__item"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Hero() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveImageIndex(
                (currentIndex) => (currentIndex + 1) % heroSlides.length,
            );
        }, 3500);

        return () => {
            window.clearInterval(timer);
        };
    }, []);

    const activeSlide = heroSlides[activeImageIndex];

    return (
        <section className="relative overflow-hidden bg-[#f5efe7]">
            <div className="absolute inset-0">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.src}
                        className={`hero-background ${index === activeImageIndex ? "hero-background--active" : ""}`}
                        style={{ backgroundImage: `url(${slide.src})` }}
                        aria-hidden="true"
                    />
                ))}
            </div>
            <div className="pointer-events-none absolute inset-0 " />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.85),_transparent_38%)]" />

            {/* <div className="absolute inset-x-0 top-0 z-20">
                <MarqueeRow items={topMarqueeItems} />
            </div> */}

            <div className="relative z-10 mx-auto min-h-[78vh] max-w-7xl px-4 pb-20 pt-24 md:px-6 lg:px-8 lg:pb-24 lg:pt-28">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.src}
                        className={`pointer-events-none absolute inset-x-0 bottom-20 flex px-4 transition-opacity duration-[900ms] ease-in-out md:px-6 lg:bottom-24 lg:px-8 ${
                            slide.ctaAlign === "right"
                                ? "justify-end"
                                : "justify-start"
                        } ${index === activeImageIndex ? "opacity-100" : "opacity-0"}`}
                        aria-hidden={index !== activeImageIndex}
                    >
                        {/* <Link
                            href="/products"
                            tabIndex={index === activeImageIndex ? 0 : -1}
                            className="pointer-events-auto rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-pink-500"
                        >
                            {slide.ctaLabel}
                        </Link> */}
                    </div>
                ))}
            </div>

            {/* <div className="absolute inset-x-0 bottom-0 z-20">
                <MarqueeRow items={bottomMarqueeItems} />
            </div> */}
        </section>
    );
}
