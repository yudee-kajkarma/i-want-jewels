'use client'

import { Link } from '@/lib/router'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/sections/ProductCard'
import type { Product } from '../types/product'
import type { CategoryContent } from '../data/categoryContent'

type CategoryLandingPageProps = {
  categoryName: string
  content: CategoryContent
  products: Product[]
}

export default function CategoryLandingPage({
  categoryName,
  content,
  products,
}: CategoryLandingPageProps) {
  const filterHref = `/products?category=${encodeURIComponent(categoryName)}`

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-poppins">
      <Header />

      <main>
        <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[1480px]">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              Homepage / {content.heading}
            </p>
            <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
              {content.heading}
            </h1>
            <div className="mt-5 max-w-3xl space-y-4">
              {content.intro.map((paragraph, index) => (
                <p key={index} className="text-sm leading-relaxed text-zinc-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </p>
            <Link
              to={filterHref}
              className="inline-flex h-[42px] items-center border border-zinc-300 px-6 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-900 transition hover:border-zinc-900"
            >
              View All &amp; Filter
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-5 grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  item={product}
                  layout="grid"
                  className="aspect-square md:aspect-auto h-[10rem] md:h-[30rem]"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <p className="text-sm leading-relaxed text-zinc-600">
                New pieces are on their way. Explore the rest of the collection
                in the meantime.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex h-[50px] items-center bg-zinc-900 px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-zinc-700"
              >
                Shop All Jewellery
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
