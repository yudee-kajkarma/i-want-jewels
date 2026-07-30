'use client'

import { useEffect, useState } from 'react'
import { GripVertical, Plus, Star, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { AdminVariantName } from '../../types/product'
import type { ProductAllFilters } from '../../types/product'
import { getAllProductFilters } from '../../services/productService'
import { toPrice } from '../../utils/price'
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
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.productForm' })
  const [dragState, setDragState] = useState<{
    variantId: string
    fromPosition: number
    overPosition: number | null
  } | null>(null)
  const [filters, setFilters] = useState<ProductAllFilters | null>(null)
  const [seoOpen, setSeoOpen] = useState(false)
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
    options: string[] | undefined,
    currentValue: string,
  ) {
    const label = t(`fields.${fieldName}`)
    const labelLower = label.toLowerCase()
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
              <option value="">{t('placeholders.selectField', { label: labelLower })}</option>
              {optionsArray.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              {currentValue && !optionsArray.includes(currentValue) && (
                <option value={currentValue}>{t('placeholders.currentValue', { value: currentValue })}</option>
              )}
              <option value="__add_custom__">{t('placeholders.addCustom', { label: labelLower })}</option>
            </select>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={currentValue}
              onChange={(event) => onFieldChange(fieldName, event.target.value)}
              placeholder={t('placeholders.enterCustom', { label: labelLower })}
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
              {t('actions.cancel')}
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
          aria-label={t('closeAria')}
          className="inline-flex items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <X className="h-4 w-4" />
          {t('actions.cancel')}
        </button>
      </div>

      <form
          className="px-6 py-5"
          onSubmit={(event) => {
            const submitEvent = event.nativeEvent as SubmitEvent & {
              submitter?: HTMLElement | null
            }
            const submitterElement = submitEvent.submitter
            const isExplicitSaveSubmit = submitterElement?.getAttribute('data-submit-action') === 'save-product'

            // Create mode saves only from step 2; edit mode can save from
            // either step (step-2 data is already loaded into the form).
            if (!isExplicitSaveSubmit || (createStep !== 2 && !isEditing)) {
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
              <button
                type="button"
                onClick={onBackToStepOne}
                aria-current={createStep === 1 ? 'step' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${createStep === 1 ? 'bg-[#cc4f8f] text-white' : 'bg-white text-[#7a3a61] hover:bg-[#fbe6f1]'}`}
              >
                {t('steps.step1')}
              </button>
              <button
                type="button"
                onClick={onGoToStepTwo}
                aria-current={createStep === 2 ? 'step' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${createStep === 2 ? 'bg-[#cc4f8f] text-white' : 'bg-white text-[#7a3a61] hover:bg-[#fbe6f1]'}`}
              >
                {t('steps.step2')}
              </button>
            </div>

            {createStep === 1 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                  <div className="lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('productType.label')}</span>
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
                          {type === 'PHYSICAL' ? t('productType.physical') : t('productType.giftCard')}
                        </button>
                      ))}
                    </div>
                    {isGiftCard ? (
                      <p className="mt-2 text-xs text-zinc-500">
                        {t('productType.giftCardHint')}
                      </p>
                    ) : null}
                  </div>

                <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.title')}</span>
                    <input
                      value={form.title}
                      onChange={(event) => onFieldChange('title', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                      required
                    />
                  </label>

                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.description')}</span>
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
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.vendor')}</span>
                    <input
                      value={form.vendor}
                      onChange={(event) => onFieldChange('vendor', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  {renderFilterSelect('category', filters?.categories, form.category)}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.collection')}</span>
                    <input
                      type="text"
                      list="collection-options"
                      value={form.collectionName ?? ''}
                      onChange={(event) => onFieldChange('collectionName', event.target.value)}
                      placeholder={t('placeholders.collection')}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                    <datalist id="collection-options">
                      {(filters?.collections ?? []).map((collectionOption) => (
                        <option key={collectionOption} value={collectionOption} />
                      ))}
                    </datalist>
                    <p className="mt-1 text-xs text-zinc-500">
                      {t('hints.collection')}
                    </p>
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.tags')}</span>
                    <input
                      value={form.tags}
                      onChange={(event) => onFieldChange('tags', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                      placeholder={t('placeholders.tags')}
                    />
                  </label>
                  {renderFilterSelect('stoneType', filters?.stoneTypes, form.stoneType)}
                  {renderFilterSelect('color', filters?.colors, form.color)}
                  {renderFilterSelect('shape', filters?.shapes, form.shape)}
                  {renderFilterSelect('metal', filters?.metals, form.metal)}
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.carat')}</span>
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
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.totalDiamondWeight')}</span>
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
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.origin')}</span>
                    <input
                      value={form.origin}
                      onChange={(event) => onFieldChange('origin', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.treatment')}</span>
                    <input
                      value={form.treatment}
                      onChange={(event) => onFieldChange('treatment', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.certificate')}</span>
                    <input
                      value={form.certificate}
                      onChange={(event) => onFieldChange('certificate', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.measurement')}</span>
                    <input
                      value={form.measurement}
                      onChange={(event) => onFieldChange('measurement', event.target.value)}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.details')}</span>
                    <textarea
                      value={form.details}
                      onChange={(event) => onFieldChange('details', event.target.value)}
                      className="min-h-24 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block lg:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.certificateUrls')}</span>
                    <textarea
                      value={form.certificateUrls}
                      onChange={(event) => onFieldChange('certificateUrls', event.target.value)}
                      className="min-h-24 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                      placeholder={t('placeholders.certificateUrl')}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.diamondPieces')}</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.diamondPcs}
                      onChange={(event) => onFieldChange('diamondPcs', Number(event.target.value))}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.finish')}</span>
                    <input
                      type="text"
                      list="finish-options"
                      value={form.finish ?? ''}
                      onChange={(event) => onFieldChange('finish', event.target.value)}
                      placeholder={t('placeholders.finish')}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                    <datalist id="finish-options">
                      {(filters?.finishes ?? []).map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.style')}</span>
                    <input
                      type="text"
                      list="style-options"
                      value={form.style ?? ''}
                      onChange={(event) => onFieldChange('style', event.target.value)}
                      placeholder={t('placeholders.style')}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                    <datalist id="style-options">
                      {(filters?.styles ?? []).map((option) => (
                        <option key={option} value={option} />
                      ))}
                    </datalist>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.weight')}</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={form.weight ?? 100}
                      onChange={(event) => onFieldChange('weight', Number(event.target.value))}
                      className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                    />
                    <p className="mt-1 text-xs text-zinc-500">{t('hints.weight')}</p>
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-[#f0d8e8] px-4 py-3 text-sm font-semibold text-[#3f1933]">
                    <input
                      type="checkbox"
                      checked={form.hypoallergenic ?? false}
                      onChange={(event) => onFieldChange('hypoallergenic', event.target.checked)}
                      className="h-4 w-4 rounded border-[#e2bdd4] text-[#7a3a61] focus:ring-[#cc4f8f]"
                    />
                    {t('fields.hypoallergenic')}
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
                    {t('fields.featured')}
                  </label>
                  <label className="lg:col-span-2 flex items-center gap-3 rounded-2xl border border-[#f0d8e8] px-4 py-3 text-sm font-semibold text-[#3f1933]">
                    <input
                      type="checkbox"
                      checked={form.availability}
                      onChange={(event) => onFieldChange('availability', event.target.checked)}
                      className="h-4 w-4 rounded border-[#e2bdd4] text-[#7a3a61] focus:ring-[#cc4f8f]"
                    />
                    {t('fields.available')}
                  </label>

                  <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-[#f0d8e8] bg-[#fffafd]">
                    <button
                      type="button"
                      onClick={() => setSeoOpen((v) => !v)}
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-[#3f1933]"
                      aria-expanded={seoOpen}
                    >
                      <span>{t('seo.title')}</span>
                      <span className="text-lg leading-none text-[#a53b79]">{seoOpen ? '−' : '+'}</span>
                    </button>
                    {seoOpen ? (
                      <div className="space-y-4 border-t border-[#f0d8e8] p-4">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('seo.urlSlug')}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-zinc-400">{t('seo.productsPath')}</span>
                            <input
                              value={form.slug ?? ''}
                              onChange={(event) => onFieldChange('slug', event.target.value)}
                              placeholder={t('placeholders.slug')}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                            />
                          </div>
                          <p className="mt-1 text-xs text-zinc-500">
                            {t('hints.slug')}
                          </p>
                        </label>
                        <label className="block">
                          <span className="mb-1 flex items-center justify-between text-sm font-semibold text-[#3f1933]">
                            <span>{t('seo.metaTitle')}</span>
                            <span className="text-xs font-normal text-zinc-400">{(form.metaTitle ?? '').length}/60</span>
                          </span>
                          <input
                            value={form.metaTitle ?? ''}
                            onChange={(event) => onFieldChange('metaTitle', event.target.value)}
                            className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1 flex items-center justify-between text-sm font-semibold text-[#3f1933]">
                            <span>{t('seo.metaDescription')}</span>
                            <span className="text-xs font-normal text-zinc-400">{(form.metaDescription ?? '').length}/160</span>
                          </span>
                          <textarea
                            value={form.metaDescription ?? ''}
                            onChange={(event) => onFieldChange('metaDescription', event.target.value)}
                            className="min-h-20 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('seo.h2Heading')}</span>
                          <input
                            value={form.h2 ?? ''}
                            onChange={(event) => onFieldChange('h2', event.target.value)}
                            className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('seo.additionalSeoContent')}</span>
                          <textarea
                            value={form.additionalSeoContent ?? ''}
                            onChange={(event) => onFieldChange('additionalSeoContent', event.target.value)}
                            className="min-h-24 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('seo.bulletPoints')}</span>
                          <textarea
                            value={form.bulletPoints}
                            onChange={(event) => onFieldChange('bulletPoints', event.target.value)}
                            placeholder={t('placeholders.bulletPoints')}
                            className="min-h-24 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 outline-none transition focus:border-[#a53b79]"
                          />
                          <p className="mt-1 text-xs text-zinc-500">{t('hints.bulletPoints')}</p>
                        </label>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#3f1933]">{t('seo.faqs')}</span>
                            <button
                              type="button"
                              onClick={() => onFieldChange('faqs', [...form.faqs, { question: '', answer: '' }])}
                              className="inline-flex items-center gap-1 rounded-full border border-[#e7bfd7] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
                            >
                              <Plus className="h-3 w-3" />
                              {t('seo.addFaq')}
                            </button>
                          </div>
                          {form.faqs.length > 0 ? (
                            <div className="mt-3 space-y-3">
                              {form.faqs.map((faq, faqIdx) => (
                                <div key={faqIdx} className="rounded-2xl border border-[#f0d8e8] p-3">
                                  <div className="flex items-start gap-2">
                                    <div className="flex-1 space-y-2">
                                      <input
                                        value={faq.question}
                                        placeholder={t('placeholders.question')}
                                        onChange={(event) => {
                                          const next = [...form.faqs]
                                          next[faqIdx] = { ...faq, question: event.target.value }
                                          onFieldChange('faqs', next)
                                        }}
                                        className="h-10 w-full rounded-xl border border-[#e7bfd7] px-3 outline-none transition focus:border-[#a53b79]"
                                      />
                                      <textarea
                                        value={faq.answer}
                                        placeholder={t('placeholders.answer')}
                                        onChange={(event) => {
                                          const next = [...form.faqs]
                                          next[faqIdx] = { ...faq, answer: event.target.value }
                                          onFieldChange('faqs', next)
                                        }}
                                        className="min-h-16 w-full rounded-xl border border-[#e7bfd7] px-3 py-2 outline-none transition focus:border-[#a53b79]"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => onFieldChange('faqs', form.faqs.filter((_, j) => j !== faqIdx))}
                                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e7bfd7] text-[#a53b79] transition hover:bg-white"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-2 text-xs text-zinc-500">{t('hints.noFaqs')}</p>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
              </div>
            ) : null}

            {createStep === 2 ? (
              isGiftCard ? (
              <div className="space-y-6">
                <section className="rounded-[28px] border border-[#f0d8e8] bg-[#fff6fb] p-5">
                  <h3 className="text-lg font-semibold text-[#3f1933]">{t('giftCard.designTitle')}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{t('giftCard.designDesc')}</p>
                  <div className="mt-4 flex items-center gap-4">
                    {imagePreviewUrls[0] ? (
                      <img src={imagePreviewUrls[0]} alt={t('giftCard.designAlt')} className="h-28 w-44 rounded-2xl border border-[#f0d8e8] object-cover" />
                    ) : (
                      <div className="flex h-28 w-44 items-center justify-center rounded-2xl border border-dashed border-[#e7bfd7] text-xs text-zinc-400">{t('giftCard.noImage')}</div>
                    )}
                    <div className="flex flex-col gap-2">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white">
                        <Plus className="h-4 w-4" />
                        {imagePreviewUrls[0] ? t('giftCard.replaceImage') : t('giftCard.uploadImage')}
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
                      <h3 className="text-lg font-semibold text-[#3f1933]">{t('giftCard.denominationsTitle')}</h3>
                      <p className="mt-1 text-sm text-zinc-500">{t('giftCard.denominationsDesc')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={onAddVariant}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white"
                    >
                      <Plus className="h-4 w-4" />
                      {t('giftCard.addDenomination')}
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    {form.variants.map((variant, index) => (
                      <div key={variant.id} className="rounded-[24px] border border-[#f0d8e8] bg-white p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9a4a75]">{t('giftCard.denomination', { index: index + 1 })}</p>
                          <button
                            type="button"
                            onClick={() => onRemoveVariant(variant.id)}
                            disabled={form.variants.length === 1}
                            className="rounded-full border border-[#e7bfd7] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            {t('actions.remove')}
                          </button>
                        </div>
                        <div className="grid gap-4 lg:grid-cols-3">
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('giftCard.label')}</span>
                            <input
                              value={variant.title}
                              onChange={(event) => onVariantFieldChange(variant.id, 'title', event.target.value)}
                              placeholder={t('placeholders.giftCardLabel')}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('giftCard.amount')}</span>
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
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.sku')}</span>
                            <input
                              value={variant.sku}
                              onChange={(event) => onVariantFieldChange(variant.id, 'sku', event.target.value)}
                              placeholder={t('placeholders.giftCardSku')}
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
                      <h3 className="text-lg font-semibold text-[#3f1933]">{t('variants.title')}</h3>
                      <p className="mt-1 text-sm text-zinc-500">{t('variants.desc')}</p>
                    </div>
                    <button
                      type="button"
                      onClick={onAddVariant}
                      disabled={form.variants.length >= variantNameOptions.length}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                      {t('variants.addVariant')}
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    {form.variants.map((variant, index) => (
                      <div key={variant.id} className="rounded-[24px] border border-[#f0d8e8] bg-white p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#9a4a75]">{t('variants.variant', { index: index + 1 })}</p>
                            <p className="mt-1 text-sm text-zinc-500">{t('variants.imageMappingNote')}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveVariant(variant.id)}
                            disabled={form.variants.length === 1}
                            className="rounded-full border border-[#e7bfd7] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            {t('actions.remove')}
                          </button>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('variants.variantName')}</span>
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
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.title')}</span>
                            <input
                              value={variant.title}
                              onChange={(event) => onVariantFieldChange(variant.id, 'title', event.target.value)}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('fields.sku')}</span>
                            <input
                              value={variant.sku}
                              onChange={(event) => onVariantFieldChange(variant.id, 'sku', event.target.value)}
                              className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
                              required
                            />
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">
                              {t('variants.stock')}
                              {variant.sizes.length > 0 ? (
                                <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.1em] text-zinc-500">{t('variants.managedPerSize')}</span>
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
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('variants.price')}</span>
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
                              {t('variants.sizeMeasurement')}
                              {variant.sizes.length === 0 ? (
                                <span className="ml-2 text-[10px] font-normal uppercase tracking-[0.1em] text-zinc-500">{t('variants.addSizeFirst')}</span>
                              ) : null}
                            </span>
                            <select
                              value={variant.sizeMeasurement}
                              onChange={(event) => onVariantFieldChange(variant.id, 'sizeMeasurement', event.target.value)}
                              disabled={variant.sizes.length === 0}
                              className={`h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79] ${variant.sizes.length === 0 ? 'cursor-not-allowed bg-zinc-100 text-zinc-500' : ''}`}
                            >
                              <option value="">{t('variants.none')}</option>
                              {SIZE_MEASUREMENT_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </label>
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#3f1933]">{t('variants.customsValue')}</span>
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
                              <p className="text-sm font-semibold text-[#3f1933]">{t('variants.sizesFor', { name: variant.title || getVariantLabel(variant.variantName) })}</p>
                              <p className="mt-1 text-xs text-zinc-500">{t('variants.sizesDesc')}</p>
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
                              {t('variants.addSize')}
                            </button>
                          </div>
                          {variant.sizes.length > 0 && (
                            <div className="mt-4 space-y-3">
                              {variant.sizes.map((entry, sizeIdx) => (
                                <div key={sizeIdx} className="flex flex-wrap items-end gap-3">
                                  <label className="min-w-[100px] flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">
                                      {t('variants.sizeLabel')}{variant.sizeMeasurement ? ` (${variant.sizeMeasurement})` : ''}
                                    </span>
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
                                  <label className="min-w-[130px] flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">{t('fields.sku')}</span>
                                    <input
                                      type="text"
                                      placeholder={t('placeholders.variantSku')}
                                      value={entry.sku ?? ''}
                                      onChange={(event) => {
                                        const raw = event.target.value
                                        const next = [...variant.sizes]
                                        if (raw.trim() === '') {
                                          // Cleared → drop the override; variant base SKU applies.
                                          const { sku: _dropSku, ...rest } = entry
                                          next[sizeIdx] = rest
                                        } else {
                                          next[sizeIdx] = { ...entry, sku: raw }
                                        }
                                        onVariantFieldChange(variant.id, 'sizes', next)
                                      }}
                                      className="h-10 w-full rounded-xl border border-[#e7bfd7] px-3 outline-none transition focus:border-[#a53b79]"
                                    />
                                  </label>
                                  <label className="min-w-[80px] flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">{t('variants.stock')}</span>
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
                                  <label className="min-w-[90px] flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">{t('variants.priceEur')}</span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      placeholder={t('placeholders.basePrice')}
                                      value={entry.price?.eur ?? ''}
                                      onChange={(event) => {
                                        const raw = event.target.value
                                        const next = [...variant.sizes]
                                        if (raw === '') {
                                          // Cleared → drop the override; variant base price applies.
                                          const { price: _drop, ...rest } = entry
                                          next[sizeIdx] = rest
                                        } else {
                                          next[sizeIdx] = { ...entry, price: toPrice(Number(raw) || 0) }
                                        }
                                        onVariantFieldChange(variant.id, 'sizes', next)
                                      }}
                                      className="h-10 w-full rounded-xl border border-[#e7bfd7] px-3 outline-none transition focus:border-[#a53b79]"
                                    />
                                  </label>
                                  <label className="min-w-[110px] flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">{t('variants.totalDiamondWt')}</span>
                                    <input
                                      type="number"
                                      min="0"
                                      step="0.01"
                                      placeholder={t('placeholders.productDefault')}
                                      value={entry.totalDiamondWeight ?? ''}
                                      onChange={(event) => {
                                        const raw = event.target.value
                                        const next = [...variant.sizes]
                                        if (raw === '') {
                                          // Cleared → drop the override; product-level TDW applies.
                                          const { totalDiamondWeight: _dropTdw, ...rest } = entry
                                          next[sizeIdx] = rest
                                        } else {
                                          next[sizeIdx] = { ...entry, totalDiamondWeight: Number(raw) || 0 }
                                        }
                                        onVariantFieldChange(variant.id, 'sizes', next)
                                      }}
                                      className="h-10 w-full rounded-xl border border-[#e7bfd7] px-3 outline-none transition focus:border-[#a53b79]"
                                    />
                                  </label>
                                  <label className="min-w-[120px] flex-1">
                                    <span className="mb-1 block text-xs font-semibold text-[#3f1933]">{t('fields.measurement')}</span>
                                    <input
                                      type="text"
                                      placeholder={t('placeholders.productDefault')}
                                      value={entry.measurement ?? ''}
                                      onChange={(event) => {
                                        const raw = event.target.value
                                        const next = [...variant.sizes]
                                        if (raw.trim() === '') {
                                          // Cleared → drop the override; product-level measurement applies.
                                          const { measurement: _dropMeas, ...rest } = entry
                                          next[sizeIdx] = rest
                                        } else {
                                          next[sizeIdx] = { ...entry, measurement: raw }
                                        }
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
                              <p className="text-sm font-semibold text-[#3f1933]">{t('variants.uploadImagesFor', { name: variant.title || getVariantLabel(variant.variantName) })}</p>
                              <p className="mt-1 text-xs text-zinc-500">{t('variants.uploadImagesDesc')}</p>
                            </div>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-white">
                              <Plus className="h-4 w-4" />
                              {t('variants.uploadImages')}
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
                                  {t('variants.dragToReorder')}
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

                                  // Detail-page cover image. Explicit when its
                                  // src matches variant.coverImage; otherwise the
                                  // image at position 1 is the default cover.
                                  const imageSrc = form.images[imageIndex]?.src ?? ''
                                  const coverSrc = variant.coverImage?.trim() ?? ''
                                  const isExplicitCover = coverSrc.length > 0 && imageSrc === coverSrc
                                  const isDefaultCover = coverSrc.length === 0 && currentPosition === 1
                                  const isCover = isExplicitCover || isDefaultCover
                                  // Cover can only be pinned to an image that already
                                  // has a src (existing/saved image). New uploads must
                                  // be saved first before they can lead the detail page.
                                  const canSetCover = currentPosition !== 0 && imageSrc.length > 0

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
                                            alt={form.images[imageIndex]?.name ?? t('variants.variantImageAlt', { index: imageIndex })}
                                            className="h-32 w-full object-cover"
                                          />
                                        ) : null}
                                        {isEditing ? (
                                          <span className="pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7a3a61] shadow-sm">
                                            <GripVertical className="h-3 w-3" />
                                            {currentPosition + 1}
                                          </span>
                                        ) : null}
                                        {currentPosition === 0 ? (
                                          <span className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#cc4f8f] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-sm">
                                            <Star className="h-3 w-3 fill-white" />
                                            {t('variants.thumbnail')}
                                          </span>
                                        ) : isCover ? (
                                          <span className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#3f1933] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-sm">
                                            <Star className="h-3 w-3 fill-white" />
                                            {isDefaultCover ? t('variants.coverDefault') : t('variants.cover')}
                                          </span>
                                        ) : null}
                                      </div>
                                      <div className="space-y-2 px-3 py-3 text-xs text-zinc-600">
                                        <div>
                                          <span className="font-semibold text-[#3f1933]">{t('variants.imageLabel', { index: imageIndex })}</span>
                                          <p className="mt-1 break-all">{form.images[imageIndex]?.name ?? t('variants.uploadedImage')}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {currentPosition !== 0 ? (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                onReorderVariantImages(variant.id, currentPosition, 0)
                                              }
                                              className="inline-flex items-center gap-1 rounded-full border border-[#e7bfd7] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
                                            >
                                              <Star className="h-3 w-3" />
                                              {t('variants.setThumbnail')}
                                            </button>
                                          ) : null}
                                          {canSetCover ? (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                onVariantFieldChange(
                                                  variant.id,
                                                  'coverImage',
                                                  isExplicitCover ? '' : imageSrc,
                                                )
                                              }
                                              className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition ${
                                                isExplicitCover
                                                  ? 'border-[#3f1933] bg-[#3f1933] text-white hover:bg-[#2c1224]'
                                                  : 'border-[#e7bfd7] text-[#7a3a61] hover:bg-[#fff2fa]'
                                              }`}
                                              title={t('variants.setCoverTitle')}
                                            >
                                              <Star className={`h-3 w-3 ${isExplicitCover ? 'fill-white' : ''}`} />
                                              {isExplicitCover ? t('variants.coverImageCheck') : t('variants.setCoverImage')}
                                            </button>
                                          ) : null}
                                          <button
                                            type="button"
                                            onClick={() => onToggleVariantImage(variant.id, imageIndex)}
                                            className="rounded-full border border-[#e7bfd7] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
                                          >
                                            {t('variants.unassign')}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </>
                          ) : (
                            <p className="mt-4 text-sm text-zinc-500">{t('variants.noImagesAssigned')}</p>
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
              {t('actions.cancel')}
            </button>
            {createStep === 2 ? (
              <button
                type="button"
                onClick={onBackToStepOne}
                disabled={isEditLoading || isSaving}
                className="rounded-full border border-[#e7bfd7] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t('actions.back')}
              </button>
            ) : null}
            {createStep === 1 && isEditing ? (
              <button
                type="submit"
                data-submit-action="save-product"
                disabled={isEditLoading || isSaving}
                className="rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
              >
                {isSaving ? t('actions.saving') : t('actions.saveChanges')}
              </button>
            ) : null}
            {createStep === 1 ? (
              <button
                type="button"
                onClick={() => {
                  setTimeout(onGoToStepTwo, 0)
                }}
                disabled={isEditLoading || isSaving}
                className={`rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  isEditing
                    ? 'border border-[#e7bfd7] text-[#7a3a61] hover:bg-[#fff2fa]'
                    : 'bg-[#cc4f8f] text-white hover:bg-[#ad3f78]'
                }`}
              >
                {t('actions.nextStep')}
              </button>
            ) : (
              <button
                type="submit"
                data-submit-action="save-product"
                disabled={isSaving}
                className="rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
              >
                {isSaving ? t('actions.saving') : isEditing ? t('actions.saveChanges') : t('actions.createProduct')}
              </button>
            )}
          </div>
        </form>
    </div>
  )
}