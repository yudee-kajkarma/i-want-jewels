'use client'

import { useEffect, useState } from 'react'

const marqueeItems = [
  '50% Off On Orders Above $249',
  'Pouch With Every Order',
  'Free Shipping On Every Gift Box',
  'Buy 3 Get 20% Off',
  'Buy 1 Get 10% Off',
  'Buy 2 Get 15% Off',
]

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80',
    alt: 'Woman wearing gold earrings',
  },
  {
    src: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
    alt: 'Close-up of layered necklaces',
  },
  {
    src: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80',
    alt: 'Jewellery collection on display',
  },
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const className = reverse ? 'hero-marquee__track hero-marquee__track--reverse' : 'hero-marquee__track'

  return (
    <div className="hero-marquee">
      <div className={className}>
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="hero-marquee__group">
            {marqueeItems.map((item) => (
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
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % heroImages.length)
    }, 3500)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#f5efe7]">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`hero-background ${index === activeImageIndex ? 'hero-background--active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,_rgba(245,239,231,0.94)_0%,_rgba(245,239,231,0.84)_42%,_rgba(245,239,231,0.18)_76%,_rgba(245,239,231,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.85),_transparent_38%)]" />

      <div className="absolute inset-x-0 top-0 z-20">
        <MarqueeRow />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl gap-10 px-4 pb-20 pt-24 md:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="max-w-2xl pt-8 lg:pt-12">
          <p className="inline-flex rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-700 shadow-sm">
            I Want Jewel
          </p>
          <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-900 sm:text-5xl lg:text-7xl">
            Beautiful Jewellery Crafted For Everyday Elegance
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600 sm:text-lg">
            Curated rings, earrings, and layered pieces designed to feel polished every day and special on every occasion.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-zinc-800">
              Shop The Collection
            </button>
            <p className="text-sm font-medium text-zinc-500">New arrivals every week</p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                onClick={() => setActiveImageIndex(index)}
                className={`hero-slider-dot ${index === activeImageIndex ? 'hero-slider-dot--active' : ''}`}
              />
            ))}
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
        <MarqueeRow reverse />
      </div>
    </section>
  )
}
