import RequireAuth from '../../components/auth/RequireAuth'
import AdminProductsPage from '../../views/AdminProductsPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminProductsPage />
    </RequireAuth>
  )
}