import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminBlogsPage from '../../../../views/AdminBlogsPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminBlogsPage />
    </RequireAuth>
  )
}
