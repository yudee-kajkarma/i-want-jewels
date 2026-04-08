'use client'

import { Suspense } from 'react'
import RequireAuth from '../../../components/auth/RequireAuth'
import CheckoutStatusPage from '../../../views/CheckoutStatusPage'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <RequireAuth>
        <CheckoutStatusPage />
      </RequireAuth>
    </Suspense>
  )
}