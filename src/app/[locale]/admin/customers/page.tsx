import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminCustomersPage from '../../../../views/AdminCustomersPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminCustomersPage />
    </RequireAuth>
  )
}
