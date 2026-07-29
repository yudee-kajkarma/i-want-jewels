'use client'

import RequireAuth from '../../../../components/auth/RequireAuth'
import MyGiftCardsPage from '../../../../views/MyGiftCardsPage'

export default function Page() {
  return (
    <RequireAuth>
      <MyGiftCardsPage />
    </RequireAuth>
  )
}
