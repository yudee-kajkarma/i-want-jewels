import RequireAuth from '@/components/auth/RequireAuth'
import AdminProductsImportPage from '@/views/AdminProductsImportPage'

export default function AdminProductsImportRoute() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminProductsImportPage />
    </RequireAuth>
  )
}
