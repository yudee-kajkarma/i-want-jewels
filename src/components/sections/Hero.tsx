"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import banner1 from "@/assets/banner/Banner-1.jpg.jpeg";
import banner2 from "@/assets/banner/Banner-2.jpg.jpeg";
import banner3 from "@/assets/banner/Banner-3.jpg.jpeg";
import banner4 from "@/assets/banner/Banner-4.jpg.jpeg";

const heroSlides = [
  {
    src: banner1.src,
    alt: "Luxury Jewellery Banner 1",
  },
  {
    src: banner2.src,
    alt: "Luxury Jewellery Banner 2",
  },
  {
    src: banner3.src,
    alt: "Luxury Jewellery Banner 3",
  },
  {
    src: banner4.src,
    alt: "Luxury Jewellery Banner 4",
  },
];

function getWrappedIndex(index: number) {
  return (index + heroSlides.length) % heroSlides.length;
}

const autoplayDelayMs = 4000;
const transitionDurationMs = 1000;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [trackIndex, setTrackIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);

  const sliderTrack = [
    heroSlides[heroSlides.length - 1],
    ...heroSlides,
    heroSlides[0],
  ];

  const logicalSlideIndex = getWrappedIndex(trackIndex - 1);

  const slideWidth = containerWidth;
  const translateX = -(trackIndex * slideWidth);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setContainerWidth(entry.contentRect.width);
    });

    resizeObserver.observe(element);
    setContainerWidth(element.getBoundingClientRect().width);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, autoplayDelayMs);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (trackIndex === sliderTrack.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setTrackIndex(1);
      }, transitionDurationMs + 50);

      return () => clearTimeout(timer);
    }

    if (trackIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setTrackIndex(heroSlides.length);
      }, transitionDurationMs + 50);

      return () => clearTimeout(timer);
    }
  }, [trackIndex, sliderTrack.length]);

  useEffect(() => {
    if (!isTransitionEnabled) {
      requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    }
  }, [isTransitionEnabled]);

  function goToNextSlide() {
    setIsTransitionEnabled(true);
    setTrackIndex((prev) => prev + 1);
  }

  function goToPrevSlide() {
    setIsTransitionEnabled(true);
    setTrackIndex((prev) => prev - 1);
  }

  return (
    <section className="w-full h-screen overflow-hidden relative bg-black">
      <div ref={containerRef} className="w-full h-full overflow-hidden">
        <div
          className={`flex h-full ${
            isTransitionEnabled
              ? "transition-transform duration-1000 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translate3d(${translateX}px,0,0)`,
          }}
        >
          {sliderTrack.map((slide, index) => (
            <div
              key={index}
              className="w-full h-screen shrink-0 relative overflow-hidden"
              style={{ width: `${slideWidth}px` }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  index === trackIndex
                    ? "scale-100 opacity-100"
                    : "scale-110 opacity-70"
                }`}
              />

              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-black/40" /> */}

              {/* Text */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                <p className="text-sm md:text-lg tracking-[5px] uppercase mb-4">
                  Premium Collection
                </p>

                <h1 className="text-4xl md:text-7xl font-bold mb-6">
                  Luxury Jewellery
                </h1>

                <button className="border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300">
                  Shop Now
                </button>
              </div> */}
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {/* <button
          onClick={goToPrevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 text-white text-4xl"
        >
          ‹
        </button> */}

        {/* Right Arrow */}
        {/* <button
          onClick={goToNextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 text-white text-4xl"
        >
          ›
        </button> */}

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setTrackIndex(index + 1);
                setIsTransitionEnabled(true);
              }}
              className={`h-3 w-3 rounded-full ${
                logicalSlideIndex === index
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}