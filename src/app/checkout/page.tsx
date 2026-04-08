'use client'

import RequireAuth from '../../components/auth/RequireAuth'
import CheckoutPage from '../../views/CheckoutPage'

export default function Page() {
  return (
    <RequireAuth>
      <CheckoutPage />
    </RequireAuth>
  )
}