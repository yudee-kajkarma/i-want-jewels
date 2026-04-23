"use client";

import { useEffect, useState } from "react";
import banner1 from "@/assets/banner/Banner-1.jpg.jpeg";
import banner2 from "@/assets/banner/Banner-2.jpg.jpeg";
import banner3 from "@/assets/banner/Banner-3.jpg.jpeg";

const heroSlides = [
    {
        src: banner2.src,
        alt: "Jewellery banner one",
    },
    {
        src: banner1.src,
        alt: "Jewellery banner two",
    },
    {
        src: banner3.src,
        alt: "Jewellery banner three",
    }
];

function getWrappedIndex(index: number) {
    return (index + heroSlides.length) % heroSlides.length;
}

const transitionDurationMs = 700;

export default function Hero() {
    const [trackIndex, setTrackIndex] = useState(1);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
    const [committedSlideIndex, setCommittedSlideIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const logicalSlideIndex = getWrappedIndex(trackIndex - 1);
    const previousSlide = heroSlides[getWrappedIndex(committedSlideIndex - 1)];
    const nextSlide = heroSlides[getWrappedIndex(committedSlideIndex + 1)];
    const sliderTrack = [
        heroSlides[heroSlides.length - 1],
        ...heroSlides,
        heroSlides[0],
    ];

    useEffect(() => {
        const timer = window.setInterval(() => {
            setIsTransitionEnabled(true);
            setIsAnimating(true);
            setTrackIndex((currentIndex) => currentIndex + 1);
        }, 4000);

        return () => {
            window.clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (trackIndex === sliderTrack.length - 1) {
            const resetTimer = window.setTimeout(() => {
                setIsTransitionEnabled(false);
                setTrackIndex(1);
            }, transitionDurationMs + 20);

            return () => {
                window.clearTimeout(resetTimer);
            };
        }

        if (trackIndex === 0) {
            const resetTimer = window.setTimeout(() => {
                setIsTransitionEnabled(false);
                setTrackIndex(heroSlides.length);
            }, transitionDurationMs + 20);

            return () => {
                window.clearTimeout(resetTimer);
            };
        }

        return;
    }, [trackIndex, sliderTrack.length]);

    useEffect(() => {
        if (!isTransitionEnabled) {
            const rafId = window.requestAnimationFrame(() => {
                setCommittedSlideIndex(getWrappedIndex(trackIndex - 1));
                setIsTransitionEnabled(true);
            });

            return () => {
                window.cancelAnimationFrame(rafId);
            };
        }

        return;
    }, [isTransitionEnabled]);

    function handleTrackTransitionEnd() {
        setCommittedSlideIndex(getWrappedIndex(trackIndex - 1));
        setIsAnimating(false);
    }

    return (
        <section className="overflow-hidden bg-white py-4 md:py-5 lg:py-6">
            <div className="mx-auto max-w-[1920px] px-0">
                <div className="relative flex items-center justify-center gap-6 overflow-hidden">
                    <div
                        className={`hidden w-[8.5vw] min-w-[95px] max-w-[180px] overflow-hidden rounded-r-[16px] md:block lg:min-w-[120px] lg:max-w-[200px] ${isAnimating ? "-translate-x-3" : "translate-x-0"} transition-transform duration-700 ease-out`}
                    >
                        <img
                            src={previousSlide.src}
                            alt={previousSlide.alt}
                            className={`h-[280px] w-full object-cover md:h-[300px] lg:h-[380px] xl:h-[520px] transition-all duration-700 ease-out ${isAnimating ? "scale-[0.98] opacity-80" : "scale-100 opacity-100"}`}
                        />
                    </div>

                    <div className="relative w-full max-w-[1580px] overflow-hidden rounded-[18px]">
                        <div
                            className={`flex ${isTransitionEnabled ? "transition-transform duration-700 ease-out" : ""}`}
                            style={{
                                transform: `translateX(-${trackIndex * 100}%)`,
                            }}
                            onTransitionEnd={handleTrackTransitionEnd}
                        >
                            {sliderTrack.map((slide, index) => (
                                <div
                                    key={`${slide.src}-${index}`}
                                    className="w-full shrink-0"
                                >
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        className="aspect-[16/6] min-h-[260px] w-full object-cover sm:min-h-[340px] lg:min-h-[560px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className={`hidden w-[8.5vw] min-w-[95px] max-w-[180px] overflow-hidden rounded-l-[16px] md:block lg:min-w-[120px] lg:max-w-[200px] ${isAnimating ? "-translate-x-4" : "translate-x-0"} transition-transform duration-700 ease-out`}
                    >
                        <img
                            src={nextSlide.src}
                            alt={nextSlide.alt}
                            className={`h-[280px] w-full object-cover md:h-[300px] lg:h-[380px] xl:h-[520px] transition-all duration-700 ease-out ${isAnimating ? "scale-[1.03] opacity-95" : "scale-100 opacity-100"}`}
                        />
                    </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-4">
                    {heroSlides.map((slide, index) => (
                        <button
                            key={slide.src}
                            type="button"
                            aria-label={`Go to slide ${index + 1}`}
                            aria-pressed={index === logicalSlideIndex}
                            onClick={() => {
                                setIsTransitionEnabled(true);
                                setIsAnimating(true);
                                setTrackIndex(index + 1);
                                setCommittedSlideIndex(index);
                            }}
                            className={`h-3 w-3 rotate-45 border transition-all duration-300 ${
                                index === logicalSlideIndex
                                    ? "border-pink-500 bg-pink-500"
                                    : "border-[#cfcfcf] bg-[#d9d9d9]"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
