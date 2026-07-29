import RequireAuth from '../../../../../components/auth/RequireAuth'
import AdminBlogPreviewPage from '../../../../../views/AdminBlogPreviewPage'

type AdminBlogPreviewRouteProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: AdminBlogPreviewRouteProps) {
  const { slug } = await params

  return (
    <RequireAuth allowedRoles={['ADMIN']}>
      <AdminBlogPreviewPage slug={slug} />
    </RequireAuth>
  )
}
