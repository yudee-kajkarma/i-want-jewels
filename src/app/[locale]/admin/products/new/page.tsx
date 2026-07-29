import RequireAuth from '@/components/auth/RequireAuth'
import AdminProductFormPage from '@/views/AdminProductFormPage'

export default function AdminProductsNewRoute() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminProductFormPage mode="create" />
    </RequireAuth>
  )
}
