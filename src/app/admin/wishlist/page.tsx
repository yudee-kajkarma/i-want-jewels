import RequireAuth from '../../../components/auth/RequireAuth'
import AdminWishlistPage from '../../../views/AdminWishlistPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminWishlistPage />
    </RequireAuth>
  )
}
