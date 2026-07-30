'use client'

import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import { ImagePlus, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AdminBlogContentEditor from './AdminBlogContentEditor'
import type { BlogStatus } from '../../types/blog'
import type { Product } from '../../types/product'
import type { CurrencyCode } from '../../utils/price'
import { formatPrice } from '../../utils/price'

export type AdminBlogFormState = {
  title: string
  excerpt: string
  content: string
  coverImage: string
  tagsInput: string
  relatedProductIds: string[]
  status: BlogStatus
  metaTitle: string
  metaDescription: string
}

type AdminBlogFormModalProps = {
  isOpen: boolean
  isEditMode: boolean
  form: AdminBlogFormState
  setForm: Dispatch<SetStateAction<AdminBlogFormState>>
  isSaving: boolean
  isUploadingImage: boolean
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCoverImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
  isProductDropdownOpen: boolean
  setIsProductDropdownOpen: Dispatch<SetStateAction<boolean>>
  isProductsLoading: boolean
  productLoadError: string
  onRetryLoadProducts: () => void
  productSearchInput: string
  setProductSearchInput: Dispatch<SetStateAction<string>>
  filteredProducts: Product[]
  selectedProducts: Product[]
  onToggleRelatedProduct: (productId: string) => void
  currency: CurrencyCode
}

export default function AdminBlogFormModal({
  isOpen,
  isEditMode,
  form,
  setForm,
  isSaving,
  isUploadingImage,
  onClose,
  onSubmit,
  onCoverImageUpload,
  isProductDropdownOpen,
  setIsProductDropdownOpen,
  isProductsLoading,
  productLoadError,
  onRetryLoadProducts,
  productSearchInput,
  setProductSearchInput,
  filteredProducts,
  selectedProducts,
  onToggleRelatedProduct,
  currency,
}: AdminBlogFormModalProps) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.blogFormModal' })

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[120] bg-black/40 p-4">
      <div className="mx-auto h-full w-full max-w-[1100px] overflow-y-auto rounded-[28px] border border-[#f1cde2] bg-white p-6 shadow-[0_28px_72px_rgba(0,0,0,0.2)] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bf4f90]">{t('badge')}</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-[#3f1933]">
              {isEditMode ? t('titles.edit') : t('titles.create')}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#e8c5db] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
          >
            {t('close')}
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-[#5b3551]">
              {t('fields.title')}
              <input
                type="text"
                value={form.title}
                onChange={(event) => setForm((currentValue) => ({ ...currentValue, title: event.target.value }))}
                className="h-12 w-full rounded-xl border border-[#e9c9dd] px-4 text-sm font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
                required
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-[#5b3551]">
              {t('fields.status')}
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((currentValue) => ({ ...currentValue, status: event.target.value as BlogStatus }))
                }
                className="h-12 w-full rounded-xl border border-[#e9c9dd] px-4 text-sm font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
              >
                <option value="draft">{t('statusOptions.draft')}</option>
                <option value="published">{t('statusOptions.published')}</option>
              </select>
            </label>
          </div>

          <label className="space-y-2 text-sm font-semibold text-[#5b3551]">
            {t('fields.excerpt')}
            <textarea
              value={form.excerpt}
              onChange={(event) => setForm((currentValue) => ({ ...currentValue, excerpt: event.target.value }))}
              className="min-h-[95px] w-full rounded-xl border border-[#e9c9dd] px-4 py-3 text-sm font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
              placeholder={t('placeholders.excerpt')}
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="space-y-2 text-sm font-semibold text-[#5b3551]">
              {t('fields.coverImageUrl')}
              <input
                type="url"
                value={form.coverImage}
                onChange={(event) => setForm((currentValue) => ({ ...currentValue, coverImage: event.target.value }))}
                className="h-12 w-full rounded-xl border border-[#e9c9dd] px-4 text-sm font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
                placeholder={t('placeholders.coverImage')}
                required
              />
            </label>

            <label className="inline-flex h-fit cursor-pointer items-center justify-center gap-2 self-end rounded-full border border-[#e8c5db] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]">
              {isUploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {t('fields.uploadCover')}
              <input
                type="file"
                accept="image/*"
                onChange={onCoverImageUpload}
                className="hidden"
                disabled={isUploadingImage}
              />
            </label>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-[#5b3551]">
              {t('fields.tags')}
              <input
                type="text"
                value={form.tagsInput}
                onChange={(event) => setForm((currentValue) => ({ ...currentValue, tagsInput: event.target.value }))}
                className="h-12 w-full rounded-xl border border-[#e9c9dd] px-4 text-sm font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
                placeholder={t('placeholders.tags')}
              />
            </label>

            <div className="space-y-2 text-sm font-semibold text-[#5b3551]">
              {t('fields.relatedProducts')}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProductDropdownOpen((currentValue) => !currentValue)}
                  className="h-12 w-full rounded-xl border border-[#e9c9dd] bg-white px-4 text-left text-sm font-normal text-zinc-700 outline-none transition hover:bg-[#fff7fc]"
                >
                  {form.relatedProductIds.length > 0
                    ? t('relatedProducts.selected', { count: form.relatedProductIds.length })
                    : t('relatedProducts.selectProducts')}
                </button>

                {isProductDropdownOpen ? (
                  <div className="absolute z-[140] mt-2 max-h-[260px] w-full overflow-y-auto rounded-xl border border-[#e8c5db] bg-white p-2 shadow-[0_10px_24px_rgba(191,82,136,0.14)]">
                    <div className="sticky top-0 z-10 mb-2 bg-white pb-2">
                      <input
                        type="text"
                        value={productSearchInput}
                        onChange={(event) => setProductSearchInput(event.target.value)}
                        placeholder={t('relatedProducts.searchPlaceholder')}
                        className="h-10 w-full rounded-lg border border-[#e8c5db] px-3 text-xs font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
                      />
                    </div>

                    {isProductsLoading ? (
                      <div className="flex items-center gap-2 px-2 py-3 text-xs text-[#7a3a61]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('relatedProducts.loading')}
                      </div>
                    ) : null}

                    {!isProductsLoading && productLoadError ? (
                      <div className="space-y-2 px-2 py-2">
                        <p className="text-xs text-rose-600">{productLoadError}</p>
                        <button
                          type="button"
                          onClick={onRetryLoadProducts}
                          className="rounded-full border border-[#e8c5db] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7a3a61] hover:bg-[#fff2fa]"
                        >
                          {t('relatedProducts.retry')}
                        </button>
                      </div>
                    ) : null}

                    {!isProductsLoading && !productLoadError && filteredProducts.length === 0 ? (
                      <div className="px-2 py-3 text-xs text-zinc-500">
                        {productSearchInput.trim()
                          ? t('relatedProducts.noMatch')
                          : t('relatedProducts.noneAvailable')}
                      </div>
                    ) : null}

                    {!isProductsLoading && !productLoadError
                      ? filteredProducts.map((product) => {
                          const isChecked = form.relatedProductIds.includes(product.id)

                          return (
                            <label
                              key={product.id}
                              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-[#fff5fb]"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onToggleRelatedProduct(product.id)}
                                className="h-4 w-4 rounded border-[#cc8bb1] text-[#cc4f8f] focus:ring-[#ffd5eb]"
                              />
                              <img src={product.primaryImage} alt={product.title} className="h-9 w-9 rounded-md object-cover" />
                              <div className="min-w-0 flex-1">
                                <p className="line-clamp-1 text-xs font-semibold text-[#3f1933]">{product.title}</p>
                                <p className="text-[11px] text-[#7a3a61]">{formatPrice(product.minPrice, currency)}</p>
                              </div>
                            </label>
                          )
                        })
                      : null}
                  </div>
                ) : null}
              </div>

              {selectedProducts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => onToggleRelatedProduct(product.id)}
                      className="rounded-full border border-[#e8c5db] bg-[#fff5fb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#7a3a61]"
                    >
                      {product.title}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-[#5b3551]">
              {t('fields.metaTitle')}
              <input
                type="text"
                value={form.metaTitle}
                onChange={(event) => setForm((currentValue) => ({ ...currentValue, metaTitle: event.target.value }))}
                className="h-12 w-full rounded-xl border border-[#e9c9dd] px-4 text-sm font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
              />
            </label>

            <label className="space-y-2 text-sm font-semibold text-[#5b3551]">
              {t('fields.metaDescription')}
              <input
                type="text"
                value={form.metaDescription}
                onChange={(event) =>
                  setForm((currentValue) => ({ ...currentValue, metaDescription: event.target.value }))
                }
                className="h-12 w-full rounded-xl border border-[#e9c9dd] px-4 text-sm font-normal text-zinc-700 outline-none focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#ffd5eb]"
              />
            </label>
          </div>

          <div className="space-y-2 text-sm font-semibold text-[#5b3551]">
            {t('fields.blogContent')}
            <AdminBlogContentEditor
              value={form.content}
              onChange={(nextHtml) => setForm((currentValue) => ({ ...currentValue, content: nextHtml }))}
              placeholder={t('placeholders.content')}
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving || isUploadingImage}
              className="rounded-full border border-[#e8c5db] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('submit.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploadingImage}
              className="inline-flex items-center gap-2 rounded-full bg-[#cc4f8f] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isEditMode ? t('submit.update') : t('submit.create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
