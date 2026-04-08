'use client'

import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import InstagramGallerySection from '../components/sections/InstagramGallerySection'
import NewsletterSection from '../components/sections/NewsletterSection'
import braceletCloseupImage from '../assets/image/bracelet.jpeg'
import earringProductImage from '../assets/image/earing1.jpeg'
import necklaceModelImage from '../assets/image/nackwear1.jpeg'
import ringModelImage from '../assets/image/ring.jpeg'

const aboutPoints = [
  'Brilliant lab-grown diamond jewellery',
  'Premium 925 sterling silver craftsmanship',
  'Elegant 14kt gold plated finishes',
]

const galleryImages = [
  necklaceModelImage.src,
  braceletCloseupImage.src,
  earringProductImage.src,
]

const testimonials = [
  {
    name: 'Julia K.',
    text: 'Beautiful pieces, fast delivery, and the finish feels far more premium than the price suggests.',
  },
  {
    name: 'Christine H.',
    text: 'My necklace layers perfectly with everything. The quality and sparkle are exactly what I wanted.',
  },
  {
    name: 'Emily A.',
    text: 'The earrings are elegant, lightweight, and packaged so well. It felt like opening a luxury gift.',
  },
]

const features = [
  {
    title: 'Lab-Grown Diamonds',
    description: 'Brilliant lab-grown diamonds offering the same sparkle and durability with a more responsible origin.',
    icon: 'diamond',
  },
  {
    title: '925 Sterling Silver',
    description: 'Premium 925 sterling silver crafted for lasting shine, durability, and everyday elegance.',
    icon: 'silver',
  },
  {
    title: '14kt Gold Plating',
    description: 'Luxurious 14kt gold plating that delivers rich color and a refined finish to every piece.',
    icon: 'bag',
  },
  {
    title: 'Made In Antwerp',
    description: 'Inspired by Antwerp world-renowned diamond heritage and fine jewellery craftsmanship.',
    icon: 'star',
  },
]


function FeatureIcon({ icon }: { icon: string }) {
  const className = 'h-8 w-8'

  switch (icon) {
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M6 8.5 9 4h6l3 4.5L12 20 6 8.5Z" strokeLinejoin="round" />
          <path d="M6 8.5h12M9 4l3 4.5L15 4" strokeLinejoin="round" />
        </svg>
      )
    case 'silver':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="6.5" />
          <path d="M12 5.5v13M5.5 12h13" strokeLinecap="round" />
        </svg>
      )
    case 'bag':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M5 9.5h14l-1.1 10.5H6.1L5 9.5Z" strokeLinejoin="round" />
          <path d="M9 9.5V8a3 3 0 1 1 6 0v1.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="m12 4 2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8L12 4Z" strokeLinejoin="round" />
        </svg>
      )
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />

      <main>
        <section className="bg-[linear-gradient(180deg,_#f6f1e8,_#fff_80%)] px-4 py-14 text-center md:py-20">
          <h1 className="text-3xl font-semibold md:text-4xl">About Us</h1>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Homepage / About Us</p>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-10">
            <img
              src={ringModelImage.src}
              alt="Woman wearing statement jewellery"
              className="h-[330px] w-full rounded-sm object-cover md:h-[420px]"
            />

            <div>
              <h2 className="max-w-sm text-3xl font-semibold leading-tight">Why Customers Choose I Want Jewels</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                Based in the historic diamond city of Antwerp, I Want Jewels creates modern jewellery crafted with lab-grown diamonds,
                925 sterling silver, and 14kt gold plating. Our collections combine responsible craftsmanship with timeless design,
                offering elegant pieces made to elevate everyday style.
              </p>
              <ul className="mt-6 space-y-4 text-sm font-semibold text-zinc-800">
                {aboutPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-900" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl text-center">
            <h2 className="text-3xl font-semibold">Why Choose I Want Jewels For Fine Jewellery</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600">
              At I Want Jewels, we combine Antwerp renowned jewellery heritage with modern craftsmanship to create pieces that shine
              with elegance and quality. Our collections feature lab-grown diamonds, 925 sterling silver, and refined 14kt gold
              plating, offering the brilliance of fine jewellery with responsible sourcing. Each piece is thoughtfully designed to
              balance timeless beauty with everyday wearability. With attention to detail, premium materials, and contemporary style,
              we create jewellery that makes every moment feel special.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {galleryImages.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`About jewellery gallery ${index + 1}`}
                className="h-[360px] w-full rounded-2xl object-cover md:h-[420px]"
              />
            ))}
          </div>
        </section>

        <section className="bg-zinc-50 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-semibold">What Our Happy Customers Say</h2>
              <p className="mt-2 text-sm text-zinc-500">Discover what our customers really think about their story with us.</p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100">
                  <div className="text-sm text-amber-400">★★★★★</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-zinc-200" />
                    <p className="font-semibold text-zinc-900">{testimonial.name}</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-zinc-600">{testimonial.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection />

        <section className="bg-[linear-gradient(180deg,_#f6f1e8,_#fff_85%)] px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="mx-auto max-w-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center text-zinc-900">
                  <FeatureIcon icon={feature.icon} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <InstagramGallerySection />
      </main>

      <Footer />
    </div>
  )
}