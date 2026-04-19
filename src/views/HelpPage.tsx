'use client'

import { Link } from '@/lib/router'
import { Clock3, Headset } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto flex max-w-[1480px] flex-col items-center px-4 py-16 text-center lg:px-8 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#eadfd4] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#8b5f43]">
          <Clock3 className="h-3.5 w-3.5" />
          Coming Soon
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-[-0.05em] text-[#17110d] sm:text-5xl lg:text-6xl">
          Our help center is on its way
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
          We&apos;re putting the finishing touches on a dedicated space with answers to common questions,
          ordering guidance, care tips, and more. In the meantime, our team is happy to help you directly.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
          >
            <Headset className="h-4 w-4" />
            CONTACT SUPPORT
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-[#e2d1c3] px-6 py-4 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
          >
            BACK TO HOME
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
