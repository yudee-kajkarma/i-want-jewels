'use client'

import RequireAuth from '../../components/auth/RequireAuth'
import WishlistPage from '../../views/WishlistPage'

export default function Page() {
  return (
    <RequireAuth>
      <WishlistPage />
    </RequireAuth>
  )
}