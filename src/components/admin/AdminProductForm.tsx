'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { GripVertical, Plus, X } from 'lucide-react'
import type { AdminVariantName } from '../../types/product'
import type { ProductAllFilters } from '../../types/product'
import { getAllProductFilters } from '../../services/productService'
import {
  getVariantLabel,
  type CreateVariantForm,
  type EditableProductForm,
  variantNameOptions,
  SIZE_MEASUREMENT_OPTIONS,
} from './adminProductHelpers'
import { VideoUploader } from './VideoUploader'

type FormChangeHandler = <Key extends keyof EditableProductForm>(
  key: Key,
  value: EditableProductForm[Key],
) => void

type VariantFieldChangeHandler = <Key extends keyof CreateVariantForm>(
  variantId: string,
  key: Key,
  value: CreateVariantForm[Key],
) => void

type AdminProductFormProps = {
  isEditing: boolean
  isEditLoading: boolean
  panelTitle: string
  panelDescription: string
  createStep: 1 | 2
  form: EditableProductForm
  editingProductId: string | null
  imagePreviewUrls: string[]
  generatedImageMapping: number[][]
  isSaving: boolean
  onClose: () => void
  onSubmit: (event: SubmitEvent) => void
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
  onReorderVariantImages: (variantId: string, fromPosition: number, toPosition: number) => void
}

const VARIANT_IMAGE_DRAG_TYPE = 'application/x-iwj-variant-image'

export default function AdminProductForm({
  isEditing,
  isEditLoading,
  panelTitle,
  panelDescription,
  createStep,
  form,
  editingProductId,
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
  onReorderVariantImages,
}: AdminProductFormProps) {
  const [dragState, setDragState] = useState<{
    variantId: string
    fromPosition: number
    overPosition: number | null
  } | null>(null)
  const [filters, setFilters] = useState<ProductAllFilters | null>(null)
  const [customOptions, setCustomOptions] = useState({
    category: false,
    color: false,
    shape: false,
    stoneType: false,
    metal: false,
  })

  useEffect(() => {
    if (!filters) {
      void getAllProductFilters().then(setFilters).catch(() => {
        console.error('Failed to fetch product filters')
      })
    }
  }, [filters])

  const isGiftCard = form.productType === 'GIFT_CARD'

  function handleVariantImageDragStart(
    event: React.DragEvent<HTMLDivElement>,
    variantId: string,
    fromPosition: number,
  ) {
    if (!isEditing) {
      return
    }

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData(VARIANT_IMAGE_DRAG_TYPE, `${variantId}|${fromPosition}`)
    setDragState({ variantId, fromPosition, overPosition: null })
  }

  function handleVariantImageDragOver(
    event: React.DragEvent<HTMLDivElement>,
    variantId: string,
    overPosition: number,
  ) {
    if (!isEditing || !dragState || dragState.variantId !== variantId) {
      return
    }

    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'

    if (dragState.overPosition !== overPosition) {
      setDragState({ ...dragState, overPosition })
    }
  }

  function handleVariantImageDrop(
    event: React.DragEvent<HTMLDivElement>,
    variantId: string,
    toPosition: number,
  ) {
    if (!isEditing) {
      return
    }

    const payload = event.dataTransfer.getData(VARIANT_IMAGE_DRAG_TYPE)

    if (!payload) {
      return
    }

    event.preventDefault()
    const [sourceVariantId, fromPositionRaw] = payload.split('|')
    const fromPosition = Number(fromPositionRaw)

    setDragState(null)

    if (sourceVariantId !== variantId || !Number.isFinite(fromPosition)) {
      return
    }

    onReorderVariantImages(variantId, fromPosition, toPosition)
  }

  function handleVariantImageDragEnd() {
    setDragState(null)
  }

  function renderFilterSelect(
    fieldName: keyof typeof customOptions,
    label: string,
    options: string[] | undefined,
    currentValue: string,
  ) {
    const isCustom = customOptions[fieldName]
    const optionsArray = options ?? []

    return (
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{label}</span>
        {!isCustom ? (
          <div className="flex gap-2">
            <select
              value={currentValue && optionsArray.includes(currentValue) ? currentValue : ''}
              onChange={(event) => {
                if (event.target.value === '__add_custom__') {
                  setCustomOptions((prev) => ({ ...prev, [fieldName]: true }))
                } else {
                  onFieldChange(fieldName, event.target.value)
                }
              }}
              className="flex-1 h-12 rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
            >
              <option value="">Select {label.toLowerCase()}</option>
              {optionsArray.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              {currentValue && !optionsArray.includes(currentValue) && (
                <option value={currentValue}>{currentValue} (current)</option>
              )}
              <option value="__add_custom__">+ Add Custom {label.toLowerCase()}</option>
            </select>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={currentValue}
              onChange={(event) => onFieldChange(fieldName, event.target.value)}
              placeholder={`Enter custom ${label.toLowerCase()}`}
              className="flex-1 h-12 rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
              autoFocus
            />
            <button
              type="button"
              onClick={() => {
                setCustomOptions((prev) => ({ ...prev, [fieldName]: false }))
                onFieldChange(fieldName, '')
              }}
              className="px-4 py-2 rounded-2xl border border-[#e7bfd7] text-sm font-semibold text-[#3f1933] transition hover:bg-[#f0d8e8]"
            >
              Cancel
            </button>
          </div>
        )}
      </label>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-[32px] border border-[#f0d0e3] bg-white shadow-[0_20px_60px_rgba(127,31,91,0.12)]">
      <div className="flex items-start justify-between border-b border-[#f3e3ee] px-6 py-5">
        <div>
          <h2 className="text-2xl font-semibold text-[#3f1933]">{panelTitle}</h2>
          <p className="mt-1 text-sm text-zinc-500">{panelDescription}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={isEditLoading || isSaving}
          aria-label="Back to products list"
          className="inline-flex items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <X className="h-4 w-4" />
          Cancel
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

            onSubmit(event.nativeEvent as SubmitEvent)
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
                  <div className="lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Product Type</span>
                    <div className="flex gap-3">
                      {(['PHYSICAL', 'GIFT_CARD'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => onFieldChange('productType', type)}
                          className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                            (form.productType ?? 'PHYSICAL') === type
                              ? 'border-[#cc4f8f] bg-[#cc4f8f] text-white'
                              : 'border-[#e7bfd7] text-[#7a3a61] hover:bg-[#fff2fa]'
                          }`}
                        >
                          {type === 'PHYSICAL' ? 'Physical Product' : 'Gift Card'}
                        </button>
                      ))}
                    </div>
                    {isGiftCard ? (
                      <p className="mt-2 text-xs text-zinc-500">
                        Gift cards are digital. Add each amount as a denomination in Step 2. Only one gift card product can exist.
                      </p>
                    ) : null}
                  </div>

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

                  {!isGiftCard ? (
                  <>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Vendor</span>
                    <input
                      value={form.vendor}
                      onChange={(event) => onFieldChange('vendor', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  {renderFilterSelect('category', 'Category', filters?.categories, form.category)}
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Tags</span>
                    <input
                      value={form.tags}
                      onChange={(event) => onFieldChange('tags', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                      placeholder="Best Seller, Earrings, Diamond"
                    />
                  </label>
                  {renderFilterSelect('stoneType', 'Stone Type', filters?.stoneTypes, form.stoneType)}
                  {renderFilterSelect('color', 'Color', filters?.colors, form.color)}
                  {renderFilterSelect('shape', 'Shape', filters?.shapes, form.shape)}
                  {renderFilterSelect('metal', 'Metal', filters?.metals, form.metal)}
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
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Total Diamond Weight</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.totalDiamondWeight}
                      onChange={(event) => onFieldChange('totalDiamondWeight', Number(event.target.value))}
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
                  </>
                  ) : null}
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
              isGiftCard ? (
              <div className="space-y-6">
                <section className="rounded-[28px] border border-[#f0d8e8] bg-[#fff6fb] p-5">
                  <h3 className="text-lg font-semibold text-[#3f1933]">Gift Card Design Image</h3>
                  <p className="mt-1 text-sm text-zinc-500">Upload one design image — it is used for every denomination.</p>
                  <div className="mt-4 flex items-center gap-4">
                    {imagePreviewUrls[0] ? (
                      <img src={imagePreviewUrls[0]} alt="Gift card design" className="h-28 w-44 rounded-2xl border border-[#f0d8e8] object-cover" />
                    ) : (
                      <div className="flex h-28 w-44 items-center justify-center rounded-2xl border border-dashed border-[#e7bfd7] text-xs text-zinc-400">No image</div>
                    )}
                    <div className="flex flex-col gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white">
                        <Plus className="h-4 w-4" />
                        {imagePreviewUrls[0] ? 'Replace Image' : 'Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            if (imagePreviewUrls[0]) {
                              onRemoveImage(0)
                            }
                            onImagesChange(form.variants[0]?.id ?? '', event.target.files)
                            event.target.value = ''
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-[#f0d8e8] bg-[#fff6fb] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-[#3f1933]">Denominations</h3>
                      <p className="mt-1 text-sm text-zinc-500">Each amount a customer can buy (e.g. €50, €100).</p>
                    </div>
                    <button
                      type="button"
                      onClick={onAddVariant}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white"
                    >
                      <Plus className="h-4 w-4" />
                      Add Denomination
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    {form.variants.map((variant, index) => (
                      <div key={variant.id} className="rounded-[24px] border border-[#f0d8e8] bg-white p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9a4a75]">Denomination {index + 1}</p>
                          <button
                            type="button"
                            onClick={() => onRemoveVariant(variant.id)}
                            disabled={form.variants.length === 1}
                            className="rounded-full border border-[#e7bfd7] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid gap-4 lg:grid-cols-3">
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Label</span>
                            <input
                              value={variant.title}
                              onChange={(event) => onVariantFieldChange(variant.id, 'title', event.target.value)}
                              placeholder="€50 Gift Card"
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Amount (€)</span>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              value={variant.price}
                              onChange={(event) => onVariantFieldChange(variant.id, 'price', Number(event.target.value) || 0)}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">SKU</span>
                            <input
                              value={variant.sku}
                              onChange={(event) => onVariantFieldChange(variant.id, 'sku', event.target.value)}
                              placeholder="GC-50"
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              ) : (
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
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">
                              Stock
                              {variant.sizes.length > 0 ? (
                                <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.1em] text-zinc-500">(managed per size)</span>
                              ) : null}
                            </span>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={
                                variant.sizes.length > 0
                                  ? variant.sizes.reduce((sum, s) => sum + (Number(s.stock) || 0), 0)
                                  : variant.stock
                              }
                              onChange={(event) => onVariantFieldChange(variant.id, 'stock', Number(event.target.value))}
                              disabled={variant.sizes.length > 0}
                              className={`h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79] ${variant.sizes.length > 0 ? 'cursor-not-allowed bg-zinc-100 text-zinc-500' : ''}`}
                              required={variant.sizes.length === 0}
                            />
                          </label>
                          <label className="block lg:col-span-2">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Price</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={variant.price}
                              onChange={(event) =>
                                onVariantFieldChange(variant.id, 'price', Number(event.target.value) || 0)
                              }
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">
                              Size Measurement
                              {variant.sizes.length === 0 ? (
                                <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.1em] text-zinc-500">(add a size first)</span>
                              ) : null}
                            </span>
                            <select
                              value={variant.sizeMeasurement}
                              onChange={(event) => onVariantFieldChange(variant.id, 'sizeMeasurement', event.target.value)}
                              disabled={variant.sizes.length === 0}
                              className={`h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79] ${variant.sizes.length === 0 ? 'cursor-not-allowed bg-zinc-100 text-zinc-500' : ''}`}
                            >
                              <option value="">— None —</option>
                              {SIZE_MEASUREMENT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Customs Value (USD)</span>
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={variant.customsValueUsd ?? ''}
                              onChange={(event) => {
                                const raw = event.target.value
                                onVariantFieldChange(
                                  variant.id,
                                  'customsValueUsd',
                                  raw === '' ? null : Number(raw),
                                )
                              }}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                            />
                          </label>
                        </div>

                        <div className="mt-5">
                          <VideoUploader
                            productId={editingProductId ?? undefined}
                            videos={variant.videos}
                            onChange={(videos) => onVariantFieldChange(variant.id, 'videos', videos)}
                            max={3}
                          />
                        </div>

                        <div className="mt-5 rounded-[22px] border border-[#f0d8e8] bg-[#fff6fb] p-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-[#3f1933]">Sizes for {variant.title || getVariantLabel(variant.variantName)}</p>
                              <p className="mt-1 text-xs text-zinc-500">Add each size with its own stock. Same SKU is shared across sizes.</p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                onVariantFieldChange(variant.id, 'sizes', [
                                  ...variant.sizes,
                                  { size: 0, stock: 0 },
                                ])
                              }
                              className="inline-flex items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white"
                            >
                              <Plus className="h-4 w-4" />
                              Add size
                            </button>
                          </div>
                          {variant.sizes.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {variant.sizes.map((entry, sizeIdx) => (
                                <div key={sizeIdx} className="flex items-end gap-3">
                                  <label className="flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">Size</span>
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={entry.size}
                                      onChange={(event) => {
                                        const next = [...variant.sizes]
                                        next[sizeIdx] = { ...entry, size: Number(event.target.value) || 0 }
                                        onVariantFieldChange(variant.id, 'sizes', next)
                                      }}
                                      className="h-10 w-full rounded-xl border border-[#e7bfd7] px-3 outline-none transition focus:border-[#a53b79]"
                                    />
                                  </label>
                                  <label className="flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">Stock</span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="1"
                                      value={entry.stock}
                                      onChange={(event) => {
                                        const next = [...variant.sizes]
                                        next[sizeIdx] = { ...entry, stock: Number(event.target.value) || 0 }
                                        onVariantFieldChange(variant.id, 'sizes', next)
                                      }}
                                      className="h-10 w-full rounded-xl border border-[#e7bfd7] px-3 outline-none transition focus:border-[#a53b79]"
                                    />
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const next = variant.sizes.filter((_, i) => i !== sizeIdx)
                                      onVariantFieldChange(variant.id, 'sizes', next)
                                    }}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e7bfd7] text-[#a53b79] transition hover:bg-white"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
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
                            <>
                              {isEditing ? (
                                <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-zinc-500">
                                  Drag a card to reorder images for this variant.
                                </p>
                              ) : null}
                              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {variant.imageIndexes.map((imageIndex, currentPosition) => {
                                  const isDraggingThis =
                                    isEditing &&
                                    dragState?.variantId === variant.id &&
                                    dragState.fromPosition === currentPosition
                                  const isDropTarget =
                                    isEditing &&
                                    dragState?.variantId === variant.id &&
                                    dragState.overPosition === currentPosition &&
                                    dragState.fromPosition !== currentPosition

                                  return (
                                    <div
                                      key={`${variant.id}-selected-${currentPosition}`}
                                      draggable={isEditing}
                                      onDragStart={(event) =>
                                        handleVariantImageDragStart(event, variant.id, currentPosition)
                                      }
                                      onDragOver={(event) =>
                                        handleVariantImageDragOver(event, variant.id, currentPosition)
                                      }
                                      onDrop={(event) => handleVariantImageDrop(event, variant.id, currentPosition)}
                                      onDragEnd={handleVariantImageDragEnd}
                                      className={`overflow-hidden rounded-[20px] border bg-white transition ${
                                        isDropTarget
                                          ? 'border-[#cc4f8f] ring-2 ring-[#f0a7cd]'
                                          : 'border-[#f0d8e8]'
                                      } ${isDraggingThis ? 'opacity-50' : ''} ${
                                        isEditing ? 'cursor-move' : ''
                                      }`}
                                    >
                                      <div className="relative">
                                        {imagePreviewUrls[imageIndex] ? (
                                          <img
                                            src={imagePreviewUrls[imageIndex]}
                                            alt={form.images[imageIndex]?.name ?? `Variant image ${imageIndex}`}
                                            className="h-32 w-full object-cover"
                                          />
                                        ) : null}
                                        {isEditing ? (
                                          <span className="pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7a3a61] shadow-sm">
                                            <GripVertical className="h-3 w-3" />
                                            {currentPosition + 1}
                                          </span>
                                        ) : null}
                                      </div>
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
                                  )
                                })}
                              </div>
                            </>
                          ) : (
                            <p className="mt-4 text-sm text-zinc-500">No images assigned yet.</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              )
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
  )
}