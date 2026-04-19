'use client'

import type { FormEvent } from 'react'
import { Plus, X } from 'lucide-react'
import type { AdminVariantName } from '../../types/product'
import {
  getVariantLabel,
  type CreateVariantForm,
  type EditableProductForm,
  variantNameOptions,
} from './adminProductHelpers'

type FormChangeHandler = <Key extends keyof EditableProductForm>(
  key: Key,
  value: EditableProductForm[Key],
) => void

type VariantFieldChangeHandler = <Key extends keyof CreateVariantForm>(
  variantId: string,
  key: Key,
  value: CreateVariantForm[Key],
) => void

type AdminProductModalProps = {
  isOpen: boolean
  isEditing: boolean
  isEditLoading: boolean
  panelTitle: string
  panelDescription: string
  createStep: 1 | 2
  form: EditableProductForm
  imagePreviewUrls: string[]
  generatedImageMapping: number[][]
  isSaving: boolean
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onFieldChange: FormChangeHandler
  onGoToStepTwo: () => void
  onBackToStepOne: () => void
  onVariantNameChange: (variantId: string, value: AdminVariantName) => void
  onVariantFieldChange: VariantFieldChangeHandler
  onAddVariant: () => void
  onRemoveVariant: (variantId: string) => void
  onImagesChange: (variantId: string, files: FileList | null) => void
  onRemoveImage: (imageIndex: number) => void
  onToggleVariantImage: (variantId: string, imageIndex: number) => void
}

export default function AdminProductModal({
  isOpen,
  isEditing,
  isEditLoading,
  panelTitle,
  panelDescription,
  createStep,
  form,
  imagePreviewUrls,
  generatedImageMapping,
  isSaving,
  onClose,
  onSubmit,
  onFieldChange,
  onGoToStepTwo,
  onBackToStepOne,
  onVariantNameChange,
  onVariantFieldChange,
  onAddVariant,
  onRemoveVariant,
  onImagesChange,
  onRemoveImage,
  onToggleVariantImage,
}: AdminProductModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f0d25]/55 px-4 py-6 backdrop-blur-sm">
      <div className={`max-h-[92vh] w-full overflow-hidden rounded-[32px] border border-[#f0d0e3] bg-white shadow-[0_30px_80px_rgba(127,31,91,0.30)] ${isEditing ? 'max-w-4xl' : 'max-w-5xl'}`}>
        <div className="flex items-start justify-between border-b border-[#f3e3ee] px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-[#3f1933]">{panelTitle}</h2>
            <p className="mt-1 text-sm text-zinc-500">{panelDescription}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isEditLoading || isSaving}
            aria-label="Close modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e7bfd7] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          className="max-h-[calc(92vh-96px)] overflow-y-auto px-6 py-5"
          onSubmit={(event) => {
            const submitEvent = event.nativeEvent as SubmitEvent & {
              submitter?: HTMLElement | null
            }
            const submitterElement = submitEvent.submitter
            const isExplicitSaveSubmit = submitterElement?.getAttribute('data-submit-action') === 'save-product'

            if (createStep !== 2 || !isExplicitSaveSubmit) {
              event.preventDefault()
              return
            }

            onSubmit(event)
          }}
        >
          {isEditLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-10 w-1/3 rounded-full bg-[#f3dce9]" />
              <div className="h-24 rounded-2xl bg-[#f7e5ef]" />
              <div className="grid gap-4 lg:grid-cols-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="h-12 rounded-2xl bg-[#f6e2ed]" />
                ))}
              </div>
              <div className="h-12 w-36 rounded-full bg-[#eec7dd]" />
            </div>
          ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-3 rounded-[24px] border border-[#f0d8e8] bg-[#fff6fb] p-4">
              <div className={`rounded-full px-4 py-2 text-sm font-semibold ${createStep === 1 ? 'bg-[#cc4f8f] text-white' : 'bg-white text-[#7a3a61]'}`}>
                Step 1: Product Details
              </div>
              <div className={`rounded-full px-4 py-2 text-sm font-semibold ${createStep === 2 ? 'bg-[#cc4f8f] text-white' : 'bg-white text-[#7a3a61]'}`}>
                Step 2: Variants & Images
              </div>
            </div>

            {createStep === 1 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Title</span>
                    <input
                      value={form.title}
                      onChange={(event) => onFieldChange('title', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                      required
                    />
                  </label>

                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Description</span>
                    <textarea
                      value={form.description}
                      onChange={(event) => onFieldChange('description', event.target.value)}
                      className="min-h-28 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Vendor</span>
                    <input
                      value={form.vendor}
                      onChange={(event) => onFieldChange('vendor', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Category</span>
                    <input
                      value={form.category}
                      onChange={(event) => onFieldChange('category', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                      required
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Tags</span>
                    <input
                      value={form.tags}
                      onChange={(event) => onFieldChange('tags', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                      placeholder="Best Seller, Earrings, Diamond"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Stone Type</span>
                    <input
                      value={form.stoneType}
                      onChange={(event) => onFieldChange('stoneType', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Color</span>
                    <input
                      value={form.color}
                      onChange={(event) => onFieldChange('color', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Shape</span>
                    <input
                      value={form.shape}
                      onChange={(event) => onFieldChange('shape', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Carat</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.carat}
                      onChange={(event) => onFieldChange('carat', Number(event.target.value))}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Origin</span>
                    <input
                      value={form.origin}
                      onChange={(event) => onFieldChange('origin', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Treatment</span>
                    <input
                      value={form.treatment}
                      onChange={(event) => onFieldChange('treatment', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Certificate</span>
                    <input
                      value={form.certificate}
                      onChange={(event) => onFieldChange('certificate', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Measurement</span>
                    <input
                      value={form.measurement}
                      onChange={(event) => onFieldChange('measurement', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Details</span>
                    <textarea
                      value={form.details}
                      onChange={(event) => onFieldChange('details', event.target.value)}
                      className="min-h-24 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Video URLs</span>
                    <textarea
                      value={form.videoUrls}
                      onChange={(event) => onFieldChange('videoUrls', event.target.value)}
                      className="min-h-24 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                      placeholder="https://example.com/video-1.mp4, https://example.com/video-2.mp4"
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Certificate URLs</span>
                    <textarea
                      value={form.certificateUrls}
                      onChange={(event) => onFieldChange('certificateUrls', event.target.value)}
                      className="min-h-24 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                      placeholder="https://example.com/certificate-1.pdf"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Diamond Pieces</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.diamondPcs}
                      onChange={(event) => onFieldChange('diamondPcs', Number(event.target.value))}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-[#f0d8e8] px-4 py-3 text-sm font-semibold text-[#3f1933]">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={(event) => onFieldChange('isFeatured', event.target.checked)}
                      className="h-4 w-4 rounded border-[#e2bdd4] text-[#7a3a61] focus:ring-[#cc4f8f]"
                    />
                    Featured product
                  </label>
                  <label className="lg:col-span-2 flex items-center gap-3 rounded-2xl border border-[#f0d8e8] px-4 py-3 text-sm font-semibold text-[#3f1933]">
                    <input
                      type="checkbox"
                      checked={form.availability}
                      onChange={(event) => onFieldChange('availability', event.target.checked)}
                      className="h-4 w-4 rounded border-[#e2bdd4] text-[#7a3a61] focus:ring-[#cc4f8f]"
                    />
                    Available for shoppers
                  </label>
              </div>
            ) : null}

            {createStep === 2 ? (
              <div className="space-y-6">
                <section className="rounded-[28px] border border-[#f0d8e8] bg-[#fff6fb] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[#3f1933]">Variants</h3>
                      <p className="mt-1 text-sm text-zinc-500">Use only `gold`, `rose gold`, and `silver`. Each variant can upload and manage its own images.</p>
                    </div>
                    <button
                      type="button"
                      onClick={onAddVariant}
                      disabled={form.variants.length >= variantNameOptions.length}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                      Add Variant
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    {form.variants.map((variant, index) => (
                      <div key={variant.id} className="rounded-[24px] border border-[#f0d8e8] bg-white p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9a4a75]">Variant {index + 1}</p>
                            <p className="mt-1 text-sm text-zinc-500">`imageMapping` is generated outside the variants payload.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveVariant(variant.id)}
                            disabled={form.variants.length === 1}
                            className="rounded-full border border-[#e7bfd7] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Variant Name</span>
                            <select
                              value={variant.variantName}
                              onChange={(event) => onVariantNameChange(variant.id, event.target.value as AdminVariantName)}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
                            >
                              {variantNameOptions.map((option) => {
                                const isSelectedElsewhere = form.variants.some(
                                  (currentVariant) => currentVariant.id !== variant.id && currentVariant.variantName === option.value,
                                )

                                return (
                                  <option key={option.value} value={option.value} disabled={isSelectedElsewhere}>
                                    {option.value}
                                  </option>
                                )
                              })}
                            </select>
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Title</span>
                            <input
                              value={variant.title}
                              onChange={(event) => onVariantFieldChange(variant.id, 'title', event.target.value)}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">SKU</span>
                            <input
                              value={variant.sku}
                              onChange={(event) => onVariantFieldChange(variant.id, 'sku', event.target.value)}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Stock</span>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={variant.stock}
                              onChange={(event) => onVariantFieldChange(variant.id, 'stock', Number(event.target.value))}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <div className="lg:col-span-2">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Price</span>
                            <div className="grid grid-cols-3 gap-2">
                              <label className="block">
                                <span className="mb-1 block text-xs font-medium text-zinc-500">USD ($)</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={variant.price.dol}
                                  onChange={(event) =>
                                    onVariantFieldChange(variant.id, 'price', {
                                      ...variant.price,
                                      dol: Number(event.target.value) || 0,
                                    })
                                  }
                                  className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                                  required
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1 block text-xs font-medium text-zinc-500">EUR (€)</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={variant.price.eur}
                                  onChange={(event) =>
                                    onVariantFieldChange(variant.id, 'price', {
                                      ...variant.price,
                                      eur: Number(event.target.value) || 0,
                                    })
                                  }
                                  className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                                  required
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1 block text-xs font-medium text-zinc-500">GBP (£)</span>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={variant.price.pou}
                                  onChange={(event) =>
                                    onVariantFieldChange(variant.id, 'price', {
                                      ...variant.price,
                                      pou: Number(event.target.value) || 0,
                                    })
                                  }
                                  className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                                  required
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 rounded-[22px] border border-[#f0d8e8] bg-[#fff6fb] p-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[#3f1933]">Upload Images For {variant.title || getVariantLabel(variant.variantName)}</p>
                              <p className="mt-1 text-xs text-zinc-500">New uploads are added to the shared gallery and assigned to this variant automatically.</p>
                            </div>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white">
                              <Plus className="h-4 w-4" />
                              Upload Images
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(event) => {
                                  onImagesChange(variant.id, event.target.files)
                                  event.target.value = ''
                                }}
                              />
                            </label>
                          </div>

                          {variant.imageIndexes.length > 0 ? (
                            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                              {variant.imageIndexes.map((imageIndex) => (
                                <div
                                  key={`${variant.id}-selected-${imageIndex}`}
                                  className="overflow-hidden rounded-[20px] border border-[#f0d8e8] bg-white"
                                >
                                  {imagePreviewUrls[imageIndex] ? (
                                    <img
                                      src={imagePreviewUrls[imageIndex]}
                                      alt={form.images[imageIndex]?.name ?? `Variant image ${imageIndex}`}
                                      className="h-32 w-full object-cover"
                                    />
                                  ) : null}
                                  <div className="space-y-2 px-3 py-3 text-xs text-zinc-600">
                                    <div>
                                      <span className="font-semibold text-[#3f1933]">Image {imageIndex}</span>
                                      <p className="mt-1 break-all">{form.images[imageIndex]?.name ?? 'Uploaded image'}</p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => onToggleVariantImage(variant.id, imageIndex)}
                                      className="rounded-full border border-[#e7bfd7] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
                                    >
                                      Unassign
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-4 text-sm text-zinc-500">No images assigned yet.</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : null}
          </>
          )}

          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-[#f3e3ee] pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isEditLoading || isSaving}
              className="rounded-full border border-[#e7bfd7] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            {createStep === 2 ? (
              <button
                type="button"
                onClick={onBackToStepOne}
                disabled={isEditLoading || isSaving}
                className="rounded-full border border-[#e7bfd7] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Back
              </button>
            ) : null}
            {createStep === 1 ? (
              <button
                type="button"
                onClick={() => {
                  // Defer step switch so this click cannot be transferred to the
                  // Save button that replaces it in the same position.
                  setTimeout(onGoToStepTwo, 0)
                }}
                disabled={isEditLoading || isSaving}
                className="rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                data-submit-action="save-product"
                disabled={isSaving}
                className="rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
              >
                {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Product'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}