import type { ReactNode } from 'react'
import { Link } from '@/lib/router'
import Footer from '../layout/Footer'
import Header from '../layout/Header'

export default function AuthShell({
  title,
  eyebrow,
  description,
  children,
  asideTitle,
  asideBody,
}: {
  title: string
  eyebrow: string
  description: string
  children: ReactNode
  asideTitle: string
  asideBody: string
}) {
  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-parsi">
      <Header />
      <main className="px-4 py-8 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1480px] overflow-hidden border border-[#eadfd4] bg-white shadow-[0_25px_80px_rgba(89,60,33,0.08)] lg:grid lg:grid-cols-[0.92fr_1.08fr]">
          <section className="relative overflow-hidden bg-[linear-gradient(160deg,#ffd9e7_0%,#f7c3db_33%,#f8e5ef_100%)] px-6 py-10 sm:px-10 lg:min-h-[860px] lg:px-12 lg:py-14">
            <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_50%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#a33a74]">{eyebrow}</p>
                <h1 className="mt-6 max-w-md text-4xl font-extrabold leading-tight tracking-[-0.05em] text-[#5d1d47] sm:text-5xl">
                  {asideTitle}
                </h1>
                <p className="mt-6 max-w-lg text-base leading-8 text-[#6b2950]">{asideBody}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  'Secure account access',
                  'Quick OTP verification',
                  'Saved locally after success',
                ].map((item) => (
                  <div key={item} className="border border-white/50 bg-white/55 px-5 py-6 backdrop-blur-sm">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center bg-white text-lg text-[#b63f80] shadow-sm">
                      ✦
                    </div>
                    <p className="text-sm font-semibold leading-6 text-[#6b2950]">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-[#7d3760]">
                Continue shopping from{' '}
                <Link to="/products" className="font-bold underline decoration-[#cf6ba0] underline-offset-4">
                  all products
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="mx-auto max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{title}</p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">{description}</h2>
              <div className="mt-10">{children}</div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}