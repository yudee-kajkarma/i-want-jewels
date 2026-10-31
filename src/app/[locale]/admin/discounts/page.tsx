import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminDiscountsPage from '../../../../views/AdminDiscountsPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminDiscountsPage />
    </RequireAuth>
  )
}
