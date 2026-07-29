import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminCartPage from '../../../../views/AdminCartPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminCartPage />
    </RequireAuth>
  )
}
