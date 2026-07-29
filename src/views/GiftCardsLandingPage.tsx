'use client'

import { useEffect, useState } from 'react'
import ProductCard from '../components/sections/ProductCard'
import { getProducts } from '../services/productService'
import type { Product } from '../types/product'
import { useTranslation } from 'react-i18next'

export default function GiftCardsLandingPage() {
  const { t } = useTranslation('giftCards')
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let active = true
    getProducts({ productType: 'GIFT_CARD', limit: 24 })
      .then((result) => {
        if (!active) return
        setProducts(result.products)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [])

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#17110d]">{t('title')}</h1>
        <p className="mt-3 text-sm text-zinc-500">
          {t('subtitle')}
        </p>
      </header>

      {status === 'loading' ? (
        <p className="text-center text-sm text-zinc-500">{t('loading')}</p>
      ) : status === 'error' ? (
        <p className="text-center text-sm text-rose-600">{t('error')}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-sm text-zinc-500">{t('empty')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      )}
    </main>
  )
}
