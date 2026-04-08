'use client'

import RequireAuth from '../../../components/auth/RequireAuth'
import TicketDetailPage from '../../../views/TicketDetailPage'

export default function Page() {
  return (
    <RequireAuth>
      <TicketDetailPage />
    </RequireAuth>
  )
}