'use client'

import { useEffect, useState } from 'react'
import ProductCard from '../components/sections/ProductCard'
import { getProducts } from '../services/productService'
import type { Product } from '../types/product'

export default function GiftCardsLandingPage() {
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
        <h1 className="text-3xl font-bold text-[#17110d]">Gift Cards</h1>
        <p className="mt-3 text-sm text-zinc-500">
          Pick an amount, add a personal message, and send it to a friend by email. Gift cards never expire and can be
          spent across multiple orders.
        </p>
      </header>

      {status === 'loading' ? (
        <p className="text-center text-sm text-zinc-500">Loading gift cards…</p>
      ) : status === 'error' ? (
        <p className="text-center text-sm text-rose-600">Unable to load gift cards right now.</p>
      ) : products.length === 0 ? (
        <p className="text-center text-sm text-zinc-500">Gift cards are not available yet. Please check back soon.</p>
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
