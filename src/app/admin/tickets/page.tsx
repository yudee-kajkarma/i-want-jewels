import RequireAuth from '../../../components/auth/RequireAuth'
import AdminTicketsPage from '../../../views/AdminTicketsPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminTicketsPage />
    </RequireAuth>
  )
}