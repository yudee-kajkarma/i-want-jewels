'use client'

import { Fragment } from 'react'
import { Link } from '@/lib/router'
import { useTranslation } from 'react-i18next'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/sections/ProductCard'
import type { Product } from '../types/product'

export type CategoryPageContent = {
  heading: string
  intro: string[]
  /** Trail after Home / Shop; the last crumb is this page. */
  breadcrumbs: Array<{ name: string; to: string }>
  /** Related collections; `key` is the label in common.json → header.megaMenu. */
  related: Array<{ key: string; to: string }>
}

type CategoryLandingPageProps = {
  filterHref: string
  content: CategoryPageContent
  products: Product[]
  /** In-page sections the navbar links to (/category/rings#statement-rings). */
  sections?: Array<{ anchor: string; name: string; products: Product[] }>
}

const chipClass =
  'inline-flex h-9 items-center border border-zinc-300 px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900'

function ProductGrid({ products }: { products: Product[] }) {
  return (
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
  )
}

export default function CategoryLandingPage({
  filterHref,
  content,
  products,
  sections = [],
}: CategoryLandingPageProps) {
  const { t } = useTranslation('common', { keyPrefix: 'categoryLanding' })
  const { t: tMenu } = useTranslation('common', { keyPrefix: 'header.megaMenu' })
  const crumbs = [
    { name: t('breadcrumbHome'), to: '/' },
    { name: t('breadcrumbShop', { defaultValue: 'Shop' }), to: '/products' },
    ...content.breadcrumbs,
  ]
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-poppins">
      <Header />

      <main>
        <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[1480px]">
            <nav aria-label="Breadcrumb" className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {crumbs.map((crumb, index) => (
                <Fragment key={crumb.to}>
                  {index > 0 ? ' / ' : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link to={crumb.to} className="transition hover:text-zinc-900">
                      {crumb.name}
                    </Link>
                  )}
                </Fragment>
              ))}
            </nav>
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
            {sections.length > 0 || content.related.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a key={section.anchor} href={`#${section.anchor}`} className={chipClass}>
                    {section.name}
                  </a>
                ))}
                {content.related.map((link) => (
                  <Link key={link.to} to={link.to} className={chipClass}>
                    {tMenu(link.key)}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
              {products.length} {t('piece', { count: products.length })}
            </p>
            <Link
              to={filterHref}
              className="inline-flex h-[42px] items-center border border-zinc-300 px-6 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-900 transition hover:border-zinc-900"
            >
              {t('viewAllFilter')}
            </Link>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <p className="text-sm leading-relaxed text-zinc-600">
                {t('emptyDesc')}
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex h-[50px] items-center bg-zinc-900 px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-zinc-700"
              >
                {t('shopAll')}
              </Link>
            </div>
          )}
        </section>

        {sections.map((section) => (
          <section
            key={section.anchor}
            id={section.anchor}
            className="mx-auto max-w-[1480px] scroll-mt-[90px] border-t border-zinc-200 px-6 py-12 lg:px-10 lg:py-16"
          >
            <h2 className="mb-8 text-[22px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[28px]">
              {section.name}
            </h2>
            <ProductGrid products={section.products} />
          </section>
        ))}
      </main>

      <Footer />
    </div>
  )
}
