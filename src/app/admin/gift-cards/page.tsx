import RequireAuth from '../../../components/auth/RequireAuth'
import AdminGiftCardsPage from '../../../views/AdminGiftCardsPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminGiftCardsPage />
    </RequireAuth>
  )
}
