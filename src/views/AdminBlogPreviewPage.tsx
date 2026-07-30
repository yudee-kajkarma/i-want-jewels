'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import BlogDetailPage from './BlogDetailPage'
import { getAdminBlogBySlug } from '../services/blogService'
import { getProductBySlug } from '../services/productService'
import type { BlogDetail } from '../types/blog'
import type { ProductDetail } from '../types/product'

type AdminBlogPreviewPageProps = {
  slug: string
}

export default function AdminBlogPreviewPage({ slug }: AdminBlogPreviewPageProps) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.blogPreview' })
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductDetail[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    void loadBlogPreview()
  }, [slug])

  async function loadBlogPreview() {
    setIsLoading(true)
    setError('')

    try {
      const detail = await getAdminBlogBySlug(slug)
      setBlogDetail(detail)

      const hydratedRelatedProducts = (
        await Promise.all(
          detail.relatedProducts.map(async (relatedProduct) => {
            if (!relatedProduct.slug) {
              return null
            }

            try {
              return await getProductBySlug(relatedProduct.slug)
            } catch {
              return null
            }
          }),
        )
      ).filter((product): product is ProductDetail => Boolean(product))

      setRelatedProducts(hydratedRelatedProducts)
    } catch {
      setBlogDetail(null)
      setRelatedProducts([])
      setError(t('loadError'))
      toast.error(t('loadError'))
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="font-poppins min-h-screen bg-white px-4 py-20 text-center text-zinc-600">
        {t('loading')}
      </div>
    )
  }

  if (!blogDetail) {
    return (
      <div className="font-poppins min-h-screen bg-white px-4 py-20 text-center text-zinc-600">
        {error || t('notFound')}
      </div>
    )
  }

  return <BlogDetailPage blogDetail={blogDetail} relatedProducts={relatedProducts} />
}
