import RequireAuth from '../../../../components/auth/RequireAuth'
import AdminChatbotPage from '../../../../views/AdminChatbotPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminChatbotPage />
    </RequireAuth>
  )
}
