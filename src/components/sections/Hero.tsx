'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const topMarqueeItems = [
  '10% Off On Orders Above $249',
  'Pouch With Every Order',
  'Free Shipping On Every Purchase',
]

const bottomMarqueeItems = [
  'Buy 1 Get 10% Off',
  'Buy 2 Get 15% Off',
  'Buy 3 Get 20% Off',
]

const heroSlides = [
  {
    src: 'https://i-want-jewel.vercel.app/assets/our_images/banners/2.png',
    alt: 'Model wearing modern diamond jewellery',
    title: 'Shine Brighter With Modern Diamond Jewellery',
    ctaLabel: 'Explore Our Jewellery',
  },
  {
    src: 'https://i-want-jewel.vercel.app/assets/our_images/banners/1.png',
    alt: 'Model with elegant jewellery styling',
    title: 'Beautiful Jewellery Crafted For Everyday Elegance',
    ctaLabel: 'Shop The Collection',
  },
]

function MarqueeRow({ items }: { items: string[] }) {
  return (
    <div className="hero-marquee">
      <div className="hero-marquee__track">
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="hero-marquee__group">
            {items.map((item) => (
              <span key={`${copyIndex}-${item}`} className="hero-marquee__item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % heroSlides.length)
    }, 3500)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  const activeSlide = heroSlides[activeImageIndex]

  return (
    <section className="relative overflow-hidden bg-[#f5efe7]">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.src}
            className={`hero-background ${index === activeImageIndex ? 'hero-background--active' : ''}`}
            style={{ backgroundImage: `url(${slide.src})` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 " />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.85),_transparent_38%)]" />

      <div className="absolute inset-x-0 top-0 z-20">
        <MarqueeRow items={topMarqueeItems} />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl gap-10 px-4 pb-20 pt-24 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="max-w-2xl pt-8 lg:pt-12">
          <h1 className="max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-900 sm:text-5xl lg:text-7xl mt-20 mb-20">
            {activeSlide.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-pink-500"
            >
              {activeSlide.ctaLabel}
            </Link>
          </div>
        </div>

        {/* <div className="hidden lg:flex lg:justify-end">
          <div className="hero-preview-card">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Current Look</p>
            <p className="mt-3 text-2xl font-semibold leading-tight text-white">{heroImages[activeImageIndex].alt}</p>
          </div>
        </div> */}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <MarqueeRow items={bottomMarqueeItems} />
      </div>
    </section>
  )
}
