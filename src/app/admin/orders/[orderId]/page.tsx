import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminOrderDetailPage from '../../../../views/AdminOrderDetailPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminOrderDetailPage />
    </RequireAuth>
  )
}
