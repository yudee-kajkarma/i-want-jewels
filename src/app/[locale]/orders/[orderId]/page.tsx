'use client'

import RequireAuth from '../../../../components/auth/RequireAuth'
import OrderDetailPage from '../../../../views/OrderDetailPage'

export default function Page() {
  return (
    <RequireAuth>
      <OrderDetailPage />
    </RequireAuth>
  )
}