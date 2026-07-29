import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminAddressPage from '../../../../views/AdminAddressPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminAddressPage />
    </RequireAuth>
  )
}
