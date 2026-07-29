import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminOrdersPage from '../../../../views/AdminOrdersPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminOrdersPage />
    </RequireAuth>
  )
}
