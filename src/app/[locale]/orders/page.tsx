'use client'

import RequireAuth from '../../../components/auth/RequireAuth'
import OrdersPage from '../../../views/OrdersPage'

export default function Page() {
  return (
    <RequireAuth>
      <OrdersPage />
    </RequireAuth>
  )
}