'use client'

import { useEffect, useMemo, useState } from 'react'
import { Eye, FilePenLine, Loader2, Plus, RefreshCw, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDateTime } from '../utils/formatDate'
import { toast } from 'react-hot-toast'
import { Link } from '@/lib/router'
import AdminBlogFormModal, { type AdminBlogFormState } from '../components/admin/AdminBlogFormModal'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Pagination from '../components/sections/Pagination'
import { useCurrency } from '../context/CurrencyContext'
import {
  createAdminBlog,
  deleteAdminBlog,
  getAdminBlogBySlug,
  getAdminBlogs,
  toggleAdminBlogStatus,
  updateAdminBlog,
  uploadBlogImage,
} from '../services/blogService'
import { getAllProducts } from '../services/productService'
import type { AdminBlogListItem, BlogCreatePayload, BlogPagination, BlogStatus } from '../types/blog'
import type { Product } from '../types/product'

const emptyForm: AdminBlogFormState = {
  title: '',
  excerpt: '',
  content: '<p></p>',
  coverImage: '',
  tagsInput: '',
  relatedProductIds: [],
  status: 'draft',
  metaTitle: '',
  metaDescription: '',
}

function parseTags(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function buildPayload(form: AdminBlogFormState): BlogCreatePayload {
  const excerpt = form.excerpt.trim() || stripHtml(form.content).slice(0, 220)

  return {
    title: form.title.trim(),
    content: form.content,
    excerpt,
    coverImage: form.coverImage.trim(),
    tags: parseTags(form.tagsInput),
    relatedProducts: form.relatedProductIds,
    status: form.status,
    metaTitle: form.metaTitle.trim(),
    metaDescription: form.metaDescription.trim(),
  }
}

function normalizeFormStatus(status: string | undefined, fallback: BlogStatus): BlogStatus {
  return status?.trim().toLowerCase() === 'published' ? 'published' : fallback
}

export default function AdminBlogsPage() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.blogs' })
  const { currency } = useCurrency()
  const [blogs, setBlogs] = useState<AdminBlogListItem[]>([])
  const [pagination, setPagination] = useState<BlogPagination | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [statusFilter, setStatusFilter] = useState<'all' | BlogStatus>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [isProductsLoading, setIsProductsLoading] = useState(false)
  const [productLoadError, setProductLoadError] = useState('')
  const [productSearchInput, setProductSearchInput] = useState('')
  const [editingBlog, setEditingBlog] = useState<AdminBlogListItem | null>(null)
  const [blogPendingDelete, setBlogPendingDelete] = useState<AdminBlogListItem | null>(null)
  const [form, setForm] = useState<AdminBlogFormState>(emptyForm)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    void initializePage()
    void loadProductsForDropdown()
  }, [])

  const selectedProducts = useMemo(
    () => products.filter((product) => form.relatedProductIds.includes(product.id)),
    [form.relatedProductIds, products],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = productSearchInput.trim().toLowerCase()

    if (!normalizedSearch) {
      return products
    }

    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.slug.toLowerCase().includes(normalizedSearch) ||
        product.vendor.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [productSearchInput, products])

  async function initializePage() {
    setIsLoading(true)
    setError('')

    try {
      const blogsResponse = await getAdminBlogs({ page: 1, limit: 10, status: undefined })

      setBlogs(blogsResponse.blogs)
      setPagination(blogsResponse.pagination)
      setCurrentPage(blogsResponse.pagination.currentPage)
    } catch {
      setError(t('errors.load'))
      toast.error(t('toasts.loadError'))
    } finally {
      setIsLoading(false)
    }
  }

  async function loadProductsForDropdown() {
    setIsProductsLoading(true)
    setProductLoadError('')

    try {
      const allProducts = await getAllProducts()
      setProducts(allProducts)
    } catch {
      setProducts([])
      setProductLoadError(t('errors.productLoad'))
      toast.error(t('toasts.productLoadError'))
    } finally {
      setIsProductsLoading(false)
    }
  }

  async function loadBlogs(page: number, nextStatusFilter: 'all' | BlogStatus = statusFilter) {
    setIsLoading(true)
    setError('')

    try {
      const response = await getAdminBlogs({
        page,
        limit: 10,
        status: nextStatusFilter === 'all' ? undefined : nextStatusFilter,
      })
      setBlogs(response.blogs)
      setPagination(response.pagination)
      setCurrentPage(response.pagination.currentPage)
      setStatusFilter(nextStatusFilter)
    } catch {
      setError(t('errors.load'))
      toast.error(t('toasts.loadError'))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleStatusTabChange(nextStatusFilter: 'all' | BlogStatus) {
    if (isLoading || nextStatusFilter === statusFilter) {
      return
    }

    await loadBlogs(1, nextStatusFilter)
  }

  function openCreateModal() {
    setEditingBlog(null)
    setForm(emptyForm)
    setIsProductDropdownOpen(false)
    setProductSearchInput('')
    setIsFormOpen(true)
  }

  async function openEditModal(blog: AdminBlogListItem) {
    setActionLoadingId(blog.id)

    try {
      const blogDetail = await getAdminBlogBySlug(blog.slug)

      setEditingBlog(blog)
      setForm({
        title: blogDetail.title,
        excerpt: blogDetail.excerpt,
        content: blogDetail.content || '<p></p>',
        coverImage: blogDetail.coverImage,
        tagsInput: (blogDetail.tags ?? []).join(', '),
        relatedProductIds: (blogDetail.relatedProducts ?? []).map((product) => product.id),
        status: normalizeFormStatus(blogDetail.status, blog.status),
        metaTitle: blogDetail.seo.metaTitle,
        metaDescription: blogDetail.seo.metaDescription,
      })
      setIsProductDropdownOpen(false)
      setProductSearchInput('')
      setIsFormOpen(true)
    } catch {
      toast.error(t('toasts.editLoadError'))
    } finally {
      setActionLoadingId(null)
    }
  }

  function closeModal() {
    if (isSaving || isUploadingImage) {
      return
    }

    setIsFormOpen(false)
    setEditingBlog(null)
    setForm(emptyForm)
    setIsProductDropdownOpen(false)
    setProductSearchInput('')
  }

  function openDeleteConfirmation(blog: AdminBlogListItem) {
    setBlogPendingDelete(blog)
  }

  function closeDeleteConfirmation() {
    if (actionLoadingId) {
      return
    }

    setBlogPendingDelete(null)
  }

  function toggleRelatedProduct(productId: string) {
    setForm((currentValue) => {
      const isAlreadySelected = currentValue.relatedProductIds.includes(productId)

      return {
        ...currentValue,
        relatedProductIds: isAlreadySelected
          ? currentValue.relatedProductIds.filter((id) => id !== productId)
          : [...currentValue.relatedProductIds, productId],
      }
    })
  }

  async function handleCoverImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setIsUploadingImage(true)

    try {
      const uploadedUrl = await uploadBlogImage(file)
      setForm((currentValue) => ({ ...currentValue, coverImage: uploadedUrl }))
      toast.success(t('toasts.coverUploadSuccess'))
    } catch {
      toast.error(t('toasts.coverUploadError'))
    } finally {
      setIsUploadingImage(false)
      event.target.value = ''
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = buildPayload(form)

    if (!payload.title || !payload.content || !payload.coverImage) {
      toast.error(t('toasts.validationError'))
      return
    }

    setIsSaving(true)

    try {
      if (editingBlog) {
        await updateAdminBlog(editingBlog.id, payload)
        toast.success(t('toasts.updateSuccess'))
      } else {
        await createAdminBlog(payload)
        toast.success(t('toasts.createSuccess'))
      }

      closeModal()
      await loadBlogs(1)
    } catch {
      toast.error(t('toasts.saveError'))
    } finally {
      setIsSaving(false)
    }
  }

  async function handleToggleStatus(blog: AdminBlogListItem) {
    setActionLoadingId(blog.id)

    try {
      const nextStatus = await toggleAdminBlogStatus(blog.id)
      toast.success(t('toasts.statusChanged', { status: t(`status.${nextStatus}`) }))
      await loadBlogs(currentPage)
    } catch {
      toast.error(t('toasts.statusError'))
    } finally {
      setActionLoadingId(null)
    }
  }

  async function handleDelete() {
    if (!blogPendingDelete) {
      return
    }

    setActionLoadingId(blogPendingDelete.id)

    try {
      await deleteAdminBlog(blogPendingDelete.id)
      toast.success(t('toasts.deleteSuccess'))
      const nextPage = blogs.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage
      await loadBlogs(nextPage)
      setBlogPendingDelete(null)
    } catch {
      toast.error(t('toasts.deleteError'))
    } finally {
      setActionLoadingId(null)
    }
  }

  return (
    <div className="font-poppins min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-zinc-900">
      <Header />

      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="border border-[#f1cde2] bg-white/90 p-6 shadow-[0_22px_62px_rgba(191,82,136,0.14)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf4f90]">{t('badge')}</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-[#3f1933]">{t('title')}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void loadBlogs(currentPage)}
                className="inline-flex items-center gap-2 border border-[#e8c5db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
              >
                <RefreshCw className="h-4 w-4" />
                {t('refresh')}
              </button>

              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 bg-[#cc4f8f] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78]"
              >
                <Plus className="h-4 w-4" />
                {t('addBlog')}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.total')}</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{pagination?.totalRecords ?? blogs.length}</p>
            </div>
            <div className="border border-[#f0d3e5] bg-[#fff9fd] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.published')}</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{blogs.filter((blog) => blog.status === 'published').length}</p>
            </div>
            <div className="border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.draft')}</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{blogs.filter((blog) => blog.status === 'draft').length}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {([
              { labelKey: 'tabs.all', value: 'all' },
              { labelKey: 'tabs.draft', value: 'draft' },
              { labelKey: 'tabs.published', value: 'published' },
            ] as const).map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => void handleStatusTabChange(tab.value)}
                disabled={isLoading}
                className={`border px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${
                  statusFilter === tab.value
                    ? 'border-[#cc4f8f] bg-[#cc4f8f] text-white'
                    : 'border-[#e8c5db] bg-white text-[#7a3a61] hover:bg-[#fff2fa]'
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>

          {error ? <div className="mt-6 border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div> : null}

          <div className="mt-6 overflow-x-auto border border-[#f0d7e7] bg-white shadow-[0_10px_30px_rgba(191,82,136,0.08)]">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#f1d8e8] bg-[#fff5fb] text-xs uppercase tracking-[0.09em] text-[#8d5574]">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t('table.title')}</th>
                  <th className="px-4 py-3 font-semibold">{t('table.status')}</th>
                  <th className="px-4 py-3 font-semibold">{t('table.views')}</th>
                  <th className="px-4 py-3 font-semibold">{t('table.author')}</th>
                  <th className="px-4 py-3 font-semibold">{t('table.updated')}</th>
                  <th className="px-4 py-3 font-semibold">{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }, (_, index) => (
                    <tr key={index} className="border-b border-[#f7e7f1]">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="h-5 w-full animate-pulse bg-[#f8e8f1]" />
                      </td>
                    </tr>
                  ))
                ) : null}

                {!isLoading && blogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[#8a667b]">
                      {t('empty')}
                    </td>
                  </tr>
                ) : null}

                {!isLoading
                  ? blogs.map((blog) => (
                      <tr key={blog.id} className="border-b border-[#f7e7f1] last:border-0">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-[#3f1933]">{blog.title}</p>
                          <p className="text-xs text-zinc-500">/{blog.slug}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${
                              blog.status === 'published'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-amber-200 bg-amber-50 text-amber-700'
                            }`}
                          >
                            {t(`status.${blog.status}`)}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-[#4f2040]">{blog.views}</td>
                        <td className="px-4 py-4 text-zinc-700">{blog.author}</td>
                        <td className="px-4 py-4 text-zinc-700">{formatDateTime(blog.updatedAt, i18n.language, '--')}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => void openEditModal(blog)}
                              disabled={actionLoadingId === blog.id}
                              className="inline-flex items-center gap-1 border border-[#e8c5db] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {actionLoadingId === blog.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <FilePenLine className="h-3 w-3" />}
                              {t('actions.edit')}
                            </button>

                            <button
                              type="button"
                              onClick={() => void handleToggleStatus(blog)}
                              disabled={actionLoadingId === blog.id}
                              className="inline-flex items-center border border-[#e8c5db] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {blog.status === 'published' ? t('actions.moveToDraft') : t('actions.publish')}
                            </button>

                            <Link
                              to={`/admin/blogs/${blog.slug}`}
                              className="inline-flex items-center gap-1 border border-[#d7d8f7] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#4745a8] transition hover:bg-[#f5f5ff]"
                            >
                              <Eye className="h-3 w-3" />
                              {t('actions.view')}
                            </Link>

                            <button
                              type="button"
                              onClick={() => openDeleteConfirmation(blog)}
                              disabled={actionLoadingId === blog.id}
                              className="inline-flex items-center gap-1 border border-rose-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 className="h-3 w-3" />
                              {t('actions.delete')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>

          {pagination ? (
            <Pagination
              pagination={pagination}
              currentItemCount={blogs.length}
              disabled={isLoading}
              onPageChange={(pageNumber) => {
                if (pageNumber !== currentPage) {
                  void loadBlogs(pageNumber, statusFilter)
                }
              }}
            />
          ) : null}
        </div>
      </main>

      <AdminBlogFormModal
        isOpen={isFormOpen}
        isEditMode={Boolean(editingBlog)}
        form={form}
        setForm={setForm}
        isSaving={isSaving}
        isUploadingImage={isUploadingImage}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onCoverImageUpload={(event) => void handleCoverImageUpload(event)}
        isProductDropdownOpen={isProductDropdownOpen}
        setIsProductDropdownOpen={setIsProductDropdownOpen}
        isProductsLoading={isProductsLoading}
        productLoadError={productLoadError}
        onRetryLoadProducts={() => void loadProductsForDropdown()}
        productSearchInput={productSearchInput}
        setProductSearchInput={setProductSearchInput}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        onToggleRelatedProduct={toggleRelatedProduct}
        currency={currency}
      />

      {blogPendingDelete ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="w-full max-w-[480px] border border-[#f1cde2] bg-white p-6 shadow-[0_28px_72px_rgba(0,0,0,0.2)]">
            <h3 className="text-xl font-extrabold text-[#3f1933]">{t('deleteModal.title')}</h3>
            <p className="mt-3 text-sm leading-6 text-[#6d4d61]">
              {t('deleteModal.message', {
                title: blogPendingDelete.title,
                interpolation: { escapeValue: false },
              })}
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeDeleteConfirmation}
                disabled={Boolean(actionLoadingId)}
                className="border border-[#e8c5db] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('deleteModal.cancel')}
              </button>
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={Boolean(actionLoadingId)}
                className="inline-flex items-center gap-2 bg-rose-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoadingId ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {t('deleteModal.confirmDelete')}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}
