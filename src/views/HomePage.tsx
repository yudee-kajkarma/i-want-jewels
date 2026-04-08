'use client'

import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import HomeBody from '../components/sections/HomeBody'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header />
      <main>
        <Hero />
        <HomeBody />
      </main>
      <Footer />
    </div>
  )
}
