import RequireAuth from '../../../../../../components/auth/RequireAuth'
import AdminChatbotConversationPage from '../../../../../../views/AdminChatbotConversationPage'

export default function Page() {
  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminChatbotConversationPage />
    </RequireAuth>
  )
}
