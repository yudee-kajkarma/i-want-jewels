'use client'

import RequireAuth from '../../../components/auth/RequireAuth'
import CartPage from '../../../views/CartPage'

export default function Page() {
  return (
    <RequireAuth>
      <CartPage />
    </RequireAuth>
  )
}