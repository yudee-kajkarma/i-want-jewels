'use client'

import { Link } from '@/lib/router'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-zinc-600">Page not found</p>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-white">
          Back Home
        </Link>
      </div>
    </div>
  )
}
