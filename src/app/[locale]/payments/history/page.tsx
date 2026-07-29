'use client'

import RequireAuth from '../../../../components/auth/RequireAuth'
import PaymentHistoryPage from '../../../../views/PaymentHistoryPage'

export default function Page() {
  return (
    <RequireAuth>
      <PaymentHistoryPage />
    </RequireAuth>
  )
}