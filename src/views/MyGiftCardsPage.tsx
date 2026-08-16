'use client'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import GiftCardsSection from '../components/giftcard/GiftCardsSection'

export default function MyGiftCardsPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-poppins">
      <Header />

      <main className="mx-auto w-full max-w-3xl px-4 py-12">
        <GiftCardsSection />
      </main>

      <Footer />
    </div>
  )
}
