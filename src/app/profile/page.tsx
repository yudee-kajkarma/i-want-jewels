'use client'

import RequireAuth from '../../components/auth/RequireAuth'
import ProfilePage from '../../views/ProfilePage'

export default function Page() {
  return (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  )
}
