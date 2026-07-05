'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from '@/lib/router'
import AdminProductForm from '../components/admin/AdminProductForm'
import {
  buildForm,
  createEmptyForm,
  createEmptyVariant,
  createEmptyGiftCardVariant,
  getVariantLabel,
  parseCommaSeparatedValues,
  type CreateVariantForm,
  type EditableProductForm,
  type ProductImageFormItem,
  variantNameOptions,
} from '../components/admin/adminProductHelpers'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { createProduct, getProductById, updateProduct } from '../services/productService'
import type {
  AdminProductCreatePayload,
  AdminProductEditPayload,
  AdminVariantName,
} from '../types/product'

type AdminProductFormPageProps = {
  mode: 'create' | 'edit'
}

export default function AdminProductFormPage({ mode }: AdminProductFormPageProps) {
  const navigate = useNavigate()
  const params = useParams<{ id?: string | string[] }>()
  const editingProductId =
    mode === 'edit' && typeof params.id === 'string' ? params.id : null

  const [form, setForm] = useState<EditableProductForm>(createEmptyForm)
  const [createStep, setCreateStep] = useState<1 | 2>(1)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(mode === 'edit')
  const [error, setError] = useState('')
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [initialVariantIds, setInitialVariantIds] = useState<string[]>([])

  const isEditing = mode === 'edit'
  const panelTitle = isEditing ? 'Edit Product' : 'Add Product'
  const panelDescription = isEditing
    ? 'Update the selected product and save the changes.'
    : 'Add a new product in two steps: details first, then variants and image mapping.'

  const generatedImageMapping = useMemo(
    () => form.variants.map((variant) => variant.imageIndexes),
    [form.variants],
  )

  function showOperationError(message: string) {
    setError(message)
    toast.error(message)
  }

  function showOperationSuccess(message: string) {
    setError('')
    toast.success(message)
  }

  useEffect(() => {
    if (mode !== 'edit' || !editingProductId) {
      return
    }

    let isMounted = true

    async function loadEditingProduct(productId: string) {
      setIsLoading(true)
      try {
        const product = await getProductById(productId)
        if (!isMounted) return
        const editableForm = buildForm(product)
        setForm(editableForm)
        setInitialVariantIds(
          editableForm.variants
            .map((variant) => variant.variantId)
            .filter((variantId): variantId is string => Boolean(variantId)),
        )
      } catch {
        if (!isMounted) return
        showOperationError('Unable to open this product for editing.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    void loadEditingProduct(editingProductId)

    return () => {
      isMounted = false
    }
  }, [mode, editingProductId])

  useEffect(() => {
    if (form.images.length === 0) {
      setImagePreviewUrls([])
      return
    }

    const nextPreviewUrls = form.images.map((imageItem) => {
      if (imageItem.isExisting || !imageItem.file) {
        return imageItem.src
      }
      return URL.createObjectURL(imageItem.file)
    })
    setImagePreviewUrls(nextPreviewUrls)

    return () => {
      nextPreviewUrls.forEach((previewUrl, index) => {
        if (!form.images[index]?.isExisting) {
          URL.revokeObjectURL(previewUrl)
        }
      })
    }
  }, [form.images])

  function navigateBack() {
    navigate('/admin')
  }

  function buildEditImageMapping(currentForm: EditableProductForm): Array<Array<string | number>> {
    const newImagePositionByIndex = new Map<number, number>()
    let newImagePosition = 0

    currentForm.images.forEach((image, imageIndex) => {
      if (!image.isExisting) {
        newImagePositionByIndex.set(imageIndex, newImagePosition)
        newImagePosition += 1
      }
    })

    return currentForm.variants.map((variant) =>
      variant.imageIndexes.reduce<Array<string | number>>((entries, imageIndex) => {
        const image = currentForm.images[imageIndex]

        if (!image) {
          return entries
        }

        if (image.isExisting && image.id) {
          entries.push(image.id)
          return entries
        }

        const newPosition = newImagePositionByIndex.get(imageIndex)

        if (typeof newPosition === 'number') {
          entries.push(newPosition)
        }

        return entries
      }, []),
    )
  }

  function handleFormChange<Key extends keyof EditableProductForm>(key: Key, value: EditableProductForm[Key]) {
    setForm((currentValue) => {
      if (key === 'productType' && value !== currentValue.productType) {
        const switchingToGiftCard = value === 'GIFT_CARD'
        return {
          ...currentValue,
          productType: value as EditableProductForm['productType'],
          variants: switchingToGiftCard
            ? [createEmptyGiftCardVariant()]
            : [createEmptyVariant()],
          images: [],
        }
      }
      return { ...currentValue, [key]: value }
    })
  }

  function handleVariantChange(variantId: string, updater: (variant: CreateVariantForm) => CreateVariantForm) {
    setForm((currentValue) => ({
      ...currentValue,
      variants: currentValue.variants.map((variant) => (variant.id === variantId ? updater(variant) : variant)),
    }))
  }

  function handleVariantFieldChange<Key extends keyof CreateVariantForm>(
    variantId: string,
    key: Key,
    value: CreateVariantForm[Key],
  ) {
    handleVariantChange(variantId, (variant) => ({ ...variant, [key]: value }))
  }

  function handleVariantNameChange(variantId: string, value: AdminVariantName) {
    handleVariantChange(variantId, (currentVariant) => ({
      ...currentVariant,
      variantName: value,
      title:
        currentVariant.title === getVariantLabel(currentVariant.variantName) || !currentVariant.title.trim()
          ? getVariantLabel(value)
          : currentVariant.title,
    }))
  }

  function handleAddVariant() {
    setForm((currentValue) => {
      if (currentValue.productType === 'GIFT_CARD') {
        if (currentValue.variants.length >= 20) {
          return currentValue
        }

        return {
          ...currentValue,
          variants: [...currentValue.variants, createEmptyGiftCardVariant()],
        }
      }

      if (currentValue.variants.length >= variantNameOptions.length) {
        return currentValue
      }

      const nextVariantOption = variantNameOptions.find(
        (option) => !currentValue.variants.some((variant) => variant.variantName === option.value),
      )

      return {
        ...currentValue,
        variants: [...currentValue.variants, createEmptyVariant(nextVariantOption?.value ?? 'gold')],
      }
    })
  }

  function handleRemoveVariant(variantId: string) {
    setForm((currentValue) => {
      if (currentValue.variants.length === 1) {
        return currentValue
      }

      return {
        ...currentValue,
        variants: currentValue.variants.filter((variant) => variant.id !== variantId),
      }
    })
  }

  function handleImagesChange(variantId: string, files: FileList | null) {
    const selectedFiles = Array.from(files ?? [])

    if (selectedFiles.length === 0) {
      return
    }

    setForm((currentValue) => ({
      ...currentValue,
      images: [
        ...currentValue.images,
        ...selectedFiles.map<ProductImageFormItem>((file, index) => ({
          id: `${Date.now()}-${file.name}-${index}`,
          name: file.name,
          src: '',
          file,
          position: currentValue.images.length + index,
          isExisting: false,
        })),
      ],
      variants: currentValue.variants.map((variant) => ({
        ...variant,
        imageIndexes:
          variant.id === variantId
            ? [
                ...variant.imageIndexes,
                ...selectedFiles.map((_, index) => currentValue.images.length + index),
              ]
            : variant.imageIndexes.filter(
                (imageIndex) => imageIndex < currentValue.images.length + selectedFiles.length,
              ),
      })),
    }))
  }

  function handleRemoveImage(imageIndex: number) {
    setForm((currentValue) => {
      const nextImages = currentValue.images.filter((_, currentIndex) => currentIndex !== imageIndex)

      return {
        ...currentValue,
        images: nextImages,
        variants: currentValue.variants.map((variant) => ({
          ...variant,
          imageIndexes: variant.imageIndexes
            .filter((currentIndex) => currentIndex !== imageIndex)
            .map((currentIndex) => (currentIndex > imageIndex ? currentIndex - 1 : currentIndex)),
        })),
      }
    })
  }

  function handleReorderVariantImages(variantId: string, fromPosition: number, toPosition: number) {
    if (fromPosition === toPosition) {
      return
    }

    handleVariantChange(variantId, (variant) => {
      if (
        fromPosition < 0 ||
        fromPosition >= variant.imageIndexes.length ||
        toPosition < 0 ||
        toPosition >= variant.imageIndexes.length
      ) {
        return variant
      }

      const nextImageIndexes = [...variant.imageIndexes]
      const [movedIndex] = nextImageIndexes.splice(fromPosition, 1)
      nextImageIndexes.splice(toPosition, 0, movedIndex)

      return { ...variant, imageIndexes: nextImageIndexes }
    })
  }

  function toggleVariantImage(variantId: string, imageIndex: number) {
    handleVariantChange(variantId, (variant) => {
      const hasImage = variant.imageIndexes.includes(imageIndex)

      return {
        ...variant,
        imageIndexes: hasImage
          ? variant.imageIndexes.filter((currentIndex) => currentIndex !== imageIndex)
          : [...variant.imageIndexes, imageIndex].sort((leftIndex, rightIndex) => leftIndex - rightIndex),
      }
    })
  }

  function validateCreateStepOne(): string {
    if (!form.title.trim()) {
      return 'Enter a product title before continuing.'
    }

    if (!form.description.trim()) {
      return 'Enter a product description before continuing.'
    }

    if (form.productType !== 'GIFT_CARD' && !form.category.trim()) {
      return 'Enter a category before continuing.'
    }

    return ''
  }

  function handleGoToStepTwo() {
    const validationError = validateCreateStepOne()

    if (validationError) {
      showOperationError(validationError)
      return
    }

    setError('')
    setCreateStep(2)
  }

  async function handleSave(event: SubmitEvent) {
    event.preventDefault()

    if (!isEditing && createStep === 1) {
      return
    }

    setIsSaving(true)
    setError('')

    const isGiftCard = form.productType === 'GIFT_CARD'

    try {
      if (isEditing && editingProductId) {
        if (!isGiftCard && form.variants.some((variant) => variant.imageIndexes.length === 0)) {
          showOperationError('Assign at least one image to every variant.')
          return
        }

        if (isGiftCard && form.images.length === 0) {
          showOperationError('Upload a gift card design image.')
          return
        }

        const giftDesignRef: string | number =
          form.images.length > 0
            ? form.images[0].isExisting
              ? form.images[0].id
              : 0
            : 0
        const imageMapping = isGiftCard
          ? form.variants.map(() => [giftDesignRef])
          : buildEditImageMapping(form)
        const referencedImageIndexes = new Set(
          isGiftCard ? [0] : form.variants.flatMap((variant) => variant.imageIndexes),
        )
        const currentVariantIds = form.variants
          .map((variant) => variant.variantId)
          .filter((variantId): variantId is string => Boolean(variantId))
        const hasDeletedVariants = initialVariantIds.some(
          (initialVariantId) => !currentVariantIds.includes(initialVariantId),
        )
        const payload: AdminProductEditPayload = {
          productType: form.productType,
          title: form.title,
          description: form.description,
          vendor: form.vendor,
          category: form.category,
          collectionName: form.collectionName ?? '',
          stoneType: form.stoneType,
          color: form.color,
          shape: form.shape,
          carat: Number(form.carat) || 0,
          totalDiamondWeight: Number(form.totalDiamondWeight) || 0,
          origin: form.origin,
          treatment: form.treatment,
          availability: form.availability,
          certificate: form.certificate,
          measurement: form.measurement,
          details: form.details,
          tags: parseCommaSeparatedValues(form.tags),
          isFeatured: form.isFeatured,
          certificateUrls: parseCommaSeparatedValues(form.certificateUrls),
          diamondPcs: Number(form.diamondPcs) || 0,
          variants: form.variants.map((variant, index) => ({
            id: variant.variantId,
            title: variant.title.trim(),
            variantName: isGiftCard ? 'gift card' : variant.variantName,
            sku: variant.sku.trim(),
            stock: Number(variant.stock) || 0,
            price: variant.price,
            position: index + 1,
            coverImage: variant.coverImage ?? '',
            ...(variant.sizes.length > 0
              ? { sizes: variant.sizes.map((entry) => ({
                  size: Number(entry.size),
                  stock: Number(entry.stock) || 0,
                  ...(entry.sku ? { sku: entry.sku } : {}),
                  ...(entry.price ? { price: entry.price } : {}),
                  ...(typeof entry.totalDiamondWeight === 'number' ? { totalDiamondWeight: entry.totalDiamondWeight } : {}),
                  ...(entry.measurement ? { measurement: entry.measurement } : {}),
                })) }
              : {}),
            ...(variant.sizeMeasurement ? { sizeMeasurement: variant.sizeMeasurement } : {}),
            ...(typeof variant.customsValueUsd === 'number' ? { customsValueUsd: variant.customsValueUsd } : {}),
            // Always send videos (even when empty) so the backend can tell
            // "field omitted, no change" apart from "cleared to []".
            videos: variant.videos ?? [],
          })),
          ...(hasDeletedVariants ? { variantPos: currentVariantIds } : {}),
          existingImages: form.images
            .map((image, originalIndex) => ({ image, originalIndex }))
            .filter(
              ({ image, originalIndex }) =>
                image.isExisting && referencedImageIndexes.has(originalIndex),
            )
            .map(({ image }, position) => ({
              id: image.id,
              src: image.src,
              position,
            })),
          images: form.images.filter((image) => !image.isExisting).map((image) => image.file).filter(Boolean) as File[],
          imageMapping,
        }

        await updateProduct(editingProductId, payload)
        showOperationSuccess('Product updated successfully.')
        navigateBack()
      } else {
        if (form.variants.length === 0) {
          showOperationError('Add at least one variant before creating the product.')
          return
        }

        if (!isGiftCard) {
          const duplicateVariantNames = new Set(form.variants.map((variant) => variant.variantName))

          if (duplicateVariantNames.size !== form.variants.length) {
            showOperationError('Each variant name can only be used once.')
            return
          }
        }

        if (form.images.length === 0) {
          showOperationError(
            isGiftCard
              ? 'Upload a gift card design image.'
              : 'Upload at least one image before creating the product.',
          )
          return
        }

        const hasInvalidVariant = form.variants.some(
          (variant) =>
            !variant.title.trim() ||
            !variant.sku.trim() ||
            variant.price <= 0 ||
            variant.stock < 0,
        )

        if (hasInvalidVariant) {
          showOperationError(
            isGiftCard
              ? 'Each denomination needs a label, SKU, and an amount greater than zero.'
              : 'Complete each variant with a title, SKU, non-negative stock, and a price greater than zero.',
          )
          return
        }

        const imageMapping = isGiftCard
          ? form.variants.map(() => [0])
          : form.variants.map((variant) => variant.imageIndexes)

        if (!isGiftCard && imageMapping.some((indexes) => indexes.length === 0)) {
          showOperationError('Assign at least one image to every variant.')
          return
        }

        const payload: AdminProductCreatePayload = {
          productType: form.productType,
          title: form.title,
          description: form.description,
          vendor: form.vendor,
          category: form.category,
          collectionName: form.collectionName ?? '',
          stoneType: form.stoneType,
          color: form.color,
          shape: form.shape,
          carat: Number(form.carat) || 0,
          totalDiamondWeight: Number(form.totalDiamondWeight) || 0,
          origin: form.origin,
          treatment: form.treatment,
          availability: form.availability,
          certificate: form.certificate,
          measurement: form.measurement,
          details: form.details,
          tags: parseCommaSeparatedValues(form.tags),
          isFeatured: form.isFeatured,
          certificateUrls: parseCommaSeparatedValues(form.certificateUrls),
          diamondPcs: Number(form.diamondPcs) || 0,
          variants: form.variants.map((variant, index) => ({
            title: variant.title.trim(),
            variantName: isGiftCard ? 'gift card' : variant.variantName,
            sku: variant.sku.trim(),
            stock: Number(variant.stock) || 0,
            price: variant.price,
            position: index + 1,
            coverImage: variant.coverImage ?? '',
            ...(variant.sizes.length > 0
              ? { sizes: variant.sizes.map((entry) => ({
                  size: Number(entry.size),
                  stock: Number(entry.stock) || 0,
                  ...(entry.sku ? { sku: entry.sku } : {}),
                  ...(entry.price ? { price: entry.price } : {}),
                  ...(typeof entry.totalDiamondWeight === 'number' ? { totalDiamondWeight: entry.totalDiamondWeight } : {}),
                  ...(entry.measurement ? { measurement: entry.measurement } : {}),
                })) }
              : {}),
            ...(variant.sizeMeasurement ? { sizeMeasurement: variant.sizeMeasurement } : {}),
            ...(typeof variant.customsValueUsd === 'number' ? { customsValueUsd: variant.customsValueUsd } : {}),
            // Always send videos (even when empty) so the backend can tell
            // "field omitted, no change" apart from "cleared to []".
            videos: variant.videos ?? [],
          })),
          images: form.images.map((image) => image.file).filter(Boolean) as File[],
          imageMapping,
        }

        await createProduct(payload)
        showOperationSuccess('Product created successfully.')
        navigateBack()
      }
    } catch {
      showOperationError(isEditing ? 'Unable to save changes right now.' : 'Unable to create product right now.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-[#2b1323] font-poppins">
      <Header />
      <main>
        <div className="mx-auto max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8">
          <div className="border border-[#f0cbe1] bg-[linear-gradient(135deg,#7e2f63_0%,#b94886_55%,#dc74ad_100%)] px-6 py-8 text-white shadow-[0_30px_80px_rgba(153,45,106,0.28)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6d6ea]">Admin Panel</p>
            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-serif text-3xl text-[#fff6fd] sm:text-4xl">{panelTitle}</h1>
                <p className="mt-3 max-w-2xl text-sm text-[#f7deee] sm:text-base">{panelDescription}</p>
              </div>
              <button
                type="button"
                onClick={navigateBack}
                disabled={isSaving}
                className="inline-flex w-fit items-center gap-2 border border-[#f6d6ea] bg-white/15 px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#fff4fc] transition hover:bg-white/25 disabled:opacity-60"
              >
                ← Back to Products
              </button>
            </div>
          </div>

          {error ? (
            <p className="mt-6 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
          ) : null}

          <div className="mt-8">
            {isLoading ? (
              <div className="rounded-[32px] border border-[#f0d0e3] bg-white px-6 py-16 text-center shadow-[0_20px_60px_rgba(127,31,91,0.12)]">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a3a61]">
                  Loading product…
                </p>
              </div>
            ) : (
              <AdminProductForm
                isEditing={isEditing}
                isEditLoading={isLoading}
                panelTitle={panelTitle}
                panelDescription={panelDescription}
                createStep={createStep}
                form={form}
                editingProductId={editingProductId}
                imagePreviewUrls={imagePreviewUrls}
                generatedImageMapping={generatedImageMapping}
                isSaving={isSaving}
                onClose={navigateBack}
                onSubmit={handleSave}
                onFieldChange={handleFormChange}
                onGoToStepTwo={handleGoToStepTwo}
                onBackToStepOne={() => setCreateStep(1)}
                onVariantNameChange={handleVariantNameChange}
                onVariantFieldChange={handleVariantFieldChange}
                onAddVariant={handleAddVariant}
                onRemoveVariant={handleRemoveVariant}
                onImagesChange={handleImagesChange}
                onRemoveImage={handleRemoveImage}
                onToggleVariantImage={toggleVariantImage}
                onReorderVariantImages={handleReorderVariantImages}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
