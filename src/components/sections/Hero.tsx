"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import banner1 from "@/assets/banner/Banner-1.jpg.jpeg";
import banner2 from "@/assets/banner/Banner-2.jpg.jpeg";
import banner3 from "@/assets/banner/Banner-3.jpg.jpeg";
import banner4 from "@/assets/banner/Banner-4.jpg.jpeg";

const heroSlides = [
  { src: banner2.src, alt: "Jewellery banner one" },
  { src: banner1.src, alt: "Jewellery banner two" },
  { src: banner3.src, alt: "Jewellery banner three" },
  { src: banner4.src, alt: "Jewellery banner four" },
];

const autoplayDelayMs = 4000;
const transitionDurationMs = 1000;

function getWrappedIndex(index: number) {
  return (index + heroSlides.length) % heroSlides.length;
}

function getSliderConfig(width: number) {
  // Desktop compare width
  if (width >= 1024) {
    return {
      slidesPerView: 1.2,
      spaceBetween: 24,
    };
  }

  // Tablet
  if (width >= 768) {
    return {
      slidesPerView: 1,
      spaceBetween: 12,
    };
  }

  // Mobile Full Width
  return {
    slidesPerView: 1,
    spaceBetween: 0,
  };
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [trackIndex, setTrackIndex] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] =
    useState(true);

  const logicalSlideIndex = getWrappedIndex(trackIndex - 1);

  const sliderTrack = [
    heroSlides[heroSlides.length - 1],
    ...heroSlides,
    heroSlides[0],
  ];

  const sliderConfig = useMemo(
    () => getSliderConfig(containerWidth),
    [containerWidth]
  );

  const slideWidth =
    containerWidth > 0
      ? (containerWidth -
          sliderConfig.spaceBetween *
            (sliderConfig.slidesPerView - 1)) /
        sliderConfig.slidesPerView
      : 0;

  const centerOffset =
    containerWidth > 0
      ? (containerWidth - slideWidth) / 2
      : 0;

  const translateX =
    containerWidth > 0
      ? -(
          trackIndex *
            (slideWidth + sliderConfig.spaceBetween) -
          centerOffset
        )
      : 0;

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setContainerWidth(entry.contentRect.width);
    });

    resizeObserver.observe(element);

    setContainerWidth(
      element.getBoundingClientRect().width
    );

    return () => resizeObserver.disconnect();
  }, []);

  function nextSlide() {
    setIsTransitionEnabled(true);
    setTrackIndex((prev) => prev + 1);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, autoplayDelayMs);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (trackIndex === sliderTrack.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setTrackIndex(1);
      }, transitionDurationMs + 20);

      return () => clearTimeout(timer);
    }

    if (trackIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setTrackIndex(heroSlides.length);
      }, transitionDurationMs + 20);

      return () => clearTimeout(timer);
    }
  }, [trackIndex, sliderTrack.length]);

  useEffect(() => {
    if (!isTransitionEnabled) {
      const raf = requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });

      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitionEnabled]);

  return (
    <section className="overflow-hidden bg-white py-0">
      <div className="mx-auto w-full max-w-[1920px] px-0">
{/* Main Slider */}
<div
  ref={containerRef}
  className="relative overflow-hidden"
>
  {/* Slider Track */}
  <div
    className={`flex will-change-transform ${
      isTransitionEnabled
        ? "transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        : ""
    }`}
    style={{
      gap: `${sliderConfig.spaceBetween}px`,
      transform: `translate3d(${translateX}px,0,0)`,
    }}
  >
    {sliderTrack.map((slide, index) => (
      <div
        key={`${slide.src}-${index}`}
        className="shrink-0 overflow-hidden"
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
          className={`w-full h-auto md:h-[680px] object-contain transition-all duration-1000 ${
            index === trackIndex
              ? "scale-100 opacity-100"
              : "scale-[0.97] opacity-90"
          }`}
        />
      </div>
    ))}
  </div>

  {/* FIXED MOBILE DOT POSITION */}
  <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 md:bottom-6">
    {heroSlides.map((slide, index) => (
      <button
        key={slide.src}
        onClick={() => {
          setTrackIndex(index + 1);
          setIsTransitionEnabled(true);
        }}
        className={`h-2.5 rounded-full transition-all duration-300 ${
          logicalSlideIndex === index
            ? "w-6 bg-pink-500"
            : "w-2.5 bg-white"
        }`}
      />
    ))}
  </div>
</div>
      </div>
    </section>
  );
}