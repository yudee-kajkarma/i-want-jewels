'use client'

import RequireAuth from '../../components/auth/RequireAuth'
import TicketsPage from '../../views/TicketsPage'

export default function Page() {
  return (
    <RequireAuth>
      <TicketsPage />
    </RequireAuth>
  )
}