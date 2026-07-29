import { Navigate } from '@/lib/router'
import RequireAuth from '../../../../components/auth/RequireAuth'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <Navigate to="/admin" replace />
    </RequireAuth>
  )
}