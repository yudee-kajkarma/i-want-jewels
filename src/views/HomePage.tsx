'use client'

import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import FeatureHighlights from '../components/sections/FeatureHighlights'
import HomeBody from '../components/sections/HomeBody'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <main>
        <Hero />
        <FeatureHighlights />
        <HomeBody />
      </main>
      <Footer />
    </div>
  )
}
