"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const autoplayDelayMs = 4000;
const transitionDurationMs = 1000;

function getSliderConfig(containerWidth: number) {
    if (containerWidth >= 1024) {
        return {
            slidesPerView: 1.2,
            spaceBetween: 30,
        };
    }

    if (containerWidth >= 768) {
        return {
            slidesPerView: 1,
            spaceBetween: 15,
        };
    }

    return {
        slidesPerView: 1,
        spaceBetween: 15,
    };
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [trackIndex, setTrackIndex] = useState(1);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);

    const logicalSlideIndex = getWrappedIndex(trackIndex - 1);
    const sliderTrack = [
        heroSlides[heroSlides.length - 1],
        ...heroSlides,
        heroSlides[0],
    ];
    const sliderConfig = useMemo(
        () => getSliderConfig(containerWidth),
        [containerWidth],
    );
    const slideWidth =
        containerWidth > 0
            ? (containerWidth -
                  sliderConfig.spaceBetween *
                      (sliderConfig.slidesPerView - 1)) /
              sliderConfig.slidesPerView
            : 0;
    const centerOffset =
        containerWidth > 0 ? (containerWidth - slideWidth) / 2 : 0;
    const translateX =
        containerWidth > 0
            ? -(
                  trackIndex * (slideWidth + sliderConfig.spaceBetween) -
                  centerOffset
              )
            : 0;

    useEffect(() => {
        const containerElement = containerRef.current;

        if (!containerElement) {
            return;
        }

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];

            if (!entry) {
                return;
            }

            setContainerWidth(entry.contentRect.width);
        });

        resizeObserver.observe(containerElement);
        setContainerWidth(containerElement.getBoundingClientRect().width);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    function goToNextSlide() {
        setIsTransitionEnabled(true);
        setTrackIndex((currentIndex) => currentIndex + 1);
    }

    function goToPreviousSlide() {
        setIsTransitionEnabled(true);
        setTrackIndex((currentIndex) => currentIndex - 1);
    }

    useEffect(() => {
        const timer = window.setInterval(() => {
            goToNextSlide();
        }, autoplayDelayMs);

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
                setIsTransitionEnabled(true);
            });

            return () => {
                window.cancelAnimationFrame(rafId);
            };
        }

        return;
    }, [isTransitionEnabled]);

    return (
        <section className="overflow-hidden bg-white py-4 md:py-5 lg:py-6">
            <div className="mx-auto max-w-[1920px] px-1 sm:px-2 lg:px-4">
                <div ref={containerRef} className="relative overflow-hidden">
                    <div
                        className={`flex will-change-transform ${isTransitionEnabled ? "transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
                        style={{
                            gap: `${sliderConfig.spaceBetween}px`,
                            transform: `translate3d(${translateX}px, 0, 0)`,
                        }}
                    >
                        {sliderTrack.map((slide, index) => (
                            <div
                                key={`${slide.src}-${index}`}
                                className="shrink-0 overflow-hidden rounded-[10px]"
                                style={{
                                    width:
                                        slideWidth > 0
                                            ? `${slideWidth}px`
                                            : "100%",
                                }}
                            >
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className={`h-[240px] w-full object-cover transition-all duration-1000 md:h-[340px] lg:h-[560px] ${index === trackIndex ? "scale-100 opacity-100" : "scale-[0.97] opacity-85"}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* <button
                        type="button"
                        aria-label="Previous slide"
                        onClick={goToPreviousSlide}
                        className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-zinc-700 shadow-sm transition hover:bg-white md:flex"
                    >
                        <span aria-hidden="true">‹</span>
                    </button>

                    <button
                        type="button"
                        aria-label="Next slide"
                        onClick={goToNextSlide}
                        className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-zinc-700 shadow-sm transition hover:bg-white md:flex"
                    >
                        <span aria-hidden="true">›</span>
                    </button> */}
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
                                setTrackIndex(index + 1);
                            }}
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                                index === logicalSlideIndex
                                    ? "bg-[#7d3434]"
                                    : "bg-[#c9c9c9]"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
