import RequireAuth from '@/components/auth/RequireAuth'
import AdminProductFormPage from '@/views/AdminProductFormPage'

export default function AdminProductsEditRoute() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminProductFormPage mode="edit" />
    </RequireAuth>
  )
}
