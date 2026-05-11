'use client'

import { useEffect, useMemo, useState } from 'react'
import { FileSpreadsheet, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useNavigate } from '@/lib/router'
import AdminProductFilterModal from '../components/admin/AdminProductFilterModal'
import AdminProductModal from '../components/admin/AdminProductModal'
import AdminProductsTable from '../components/admin/AdminProductsTable'
import {
  buildForm,
  createEmptyForm,
  createEmptyVariant,
  defaultFilters,
  getVariantLabel,
  parseCommaSeparatedValues,
  type AdminFilters,
  type CreateVariantForm,
  type EditableProductForm,
  type PanelMode,
  type ProductImageFormItem,
  variantNameOptions,
} from '../components/admin/adminProductHelpers'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useCurrency } from '../context/CurrencyContext'
import { getCurrencyIsoCode } from '../utils/price'
import {
  createProduct,
  deleteProduct,
  getAllProductFilters,
  getAllProductsForAdmin,
  getProductById,
  updateProduct,
} from '../services/productService'
import type {
  AdminProductCreatePayload,
  AdminProductEditPayload,
  AdminVariantName,
  Product,
  ProductAllFilters,
  ProductsPagination,
} from '../types/product'

export default function AdminProductsPage() {
  const navigate = useNavigate()
  const { currency } = useCurrency()
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<ProductsPagination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [filterOptions, setFilterOptions] = useState<ProductAllFilters | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [panelMode, setPanelMode] = useState<PanelMode>('closed')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [createStep, setCreateStep] = useState<1 | 2>(1)
  const [form, setForm] = useState<EditableProductForm>(createEmptyForm)
  const [filters, setFilters] = useState<AdminFilters>(defaultFilters)
  const [isSaving, setIsSaving] = useState(false)
  const [isEditModalLoading, setIsEditModalLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [productPendingDelete, setProductPendingDelete] = useState<Product | null>(null)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [initialVariantIds, setInitialVariantIds] = useState<string[]>([])

  useEffect(() => {
    void initializePage()
  }, [])

  function showOperationError(message: string) {
    setError(message)
    toast.error(message)
  }

  function showOperationSuccess(message: string) {
    setError('')
    toast.success(message)
  }

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

  async function initializePage() {
    setIsLoading(true)
    setError('')

    try {
      const [productsResponse, filterOptionsResponse] = await Promise.all([
        getAllProductsForAdmin({ page: 1, limit: recordsPerPage }),
        getAllProductFilters(),
      ])

      setProducts(productsResponse.products)
      setPagination(productsResponse.pagination)
      setCurrentPage(productsResponse.pagination.currentPage)
      setRecordsPerPage(productsResponse.pagination.recordsPerPage)
      setFilterOptions(filterOptionsResponse)
    } catch {
      setError('Unable to load products right now.')
    } finally {
      setIsLoading(false)
    }
  }

  function buildServerFilters(currentFilters: AdminFilters) {
    return {
      category: currentFilters.category || undefined,
      stoneType: currentFilters.stoneType || undefined,
      color: currentFilters.color || undefined,
      shape: currentFilters.shape || undefined,
      origin: currentFilters.origin || undefined,
      treatment: currentFilters.treatment || undefined,
      certificate: currentFilters.certificate || undefined,
      measurement: currentFilters.measurement || undefined,
      vendor: currentFilters.vendor || undefined,
      tags: currentFilters.tags || undefined,
      metal: currentFilters.metal || undefined,
      priceMin: currentFilters.priceMin || undefined,
      priceMax: currentFilters.priceMax || undefined,
      carat: currentFilters.carat || undefined,
      availability: currentFilters.availability === 'all' ? undefined : currentFilters.availability,
      currency: getCurrencyIsoCode(currency),
    }
  }

  async function loadProducts(currentFilters: AdminFilters = filters, page: number = currentPage) {
    setIsLoading(true)
    setError('')

    try {
      const response = await getAllProductsForAdmin({
        ...buildServerFilters(currentFilters),
        page,
        limit: recordsPerPage,
      })
      setProducts(response.products)
      setPagination(response.pagination)
      setCurrentPage(response.pagination.currentPage)
      setRecordsPerPage(response.pagination.recordsPerPage)
    } catch {
      setError('Unable to load products right now.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleFilterChange<Key extends keyof AdminFilters>(key: Key, value: AdminFilters[Key]) {
    setFilters((currentValue) => ({ ...currentValue, [key]: value }))
  }

  async function handleApplyFilters() {
    await loadProducts(filters, 1)
    setIsFilterOpen(false)
  }

  async function handleResetFilters() {
    setFilters(defaultFilters)
    await loadProducts(defaultFilters, 1)
    setIsFilterOpen(false)
  }

  async function handlePageChange(page: number) {
    if (isLoading || page === currentPage || (pagination && (page < 1 || page > pagination.totalPages))) {
      return
    }

    await loadProducts(filters, page)
  }

  async function handleEdit(productId: string) {
    setError('')
    setPanelMode('edit')
    setCreateStep(1)
    setSelectedProductId(productId)
    setForm(createEmptyForm())
    setIsEditModalLoading(true)

    try {
      const product = await getProductById(productId)
      const editableForm = buildForm(product)
      setCreateStep(1)
      setForm(editableForm)
      setInitialVariantIds(
        editableForm.variants
          .map((variant) => variant.variantId)
          .filter((variantId): variantId is string => Boolean(variantId)),
      )
    } catch {
      handleClosePanel()
      setError('Unable to open this product for editing.')
    } finally {
      setIsEditModalLoading(false)
    }
  }

  function handleAddNew() {
    setError('')
    setPanelMode('create')
    setCreateStep(1)
    setSelectedProductId(null)
    setForm(createEmptyForm())
    setInitialVariantIds([])
  }

  function handleClosePanel() {
    setPanelMode('closed')
    setCreateStep(1)
    setSelectedProductId(null)
    setForm(createEmptyForm())
    setIsEditModalLoading(false)
    setInitialVariantIds([])
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

  function handleDeleteRequest(product: Product) {
    setProductPendingDelete(product)
  }

  function handleCloseDeleteModal() {
    if (isDeleting) {
      return
    }

    setProductPendingDelete(null)
  }

  function handleFormChange<Key extends keyof EditableProductForm>(key: Key, value: EditableProductForm[Key]) {
    setForm((currentValue) => ({ ...currentValue, [key]: value }))
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
            : variant.imageIndexes.filter((imageIndex) => imageIndex < currentValue.images.length + selectedFiles.length),
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

    if (!form.category.trim()) {
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

    if (createStep === 1) {
      // Step 1 should never trigger save logic.
      // Navigation to Step 2 is handled only by the explicit Next Step button.
      return
    }

    setIsSaving(true)
    setError('')

    try {
      if (panelMode === 'edit' && selectedProductId) {
        if (form.variants.some((variant) => variant.imageIndexes.length === 0)) {
          showOperationError('Assign at least one image to every variant.')
          return
        }

        const imageMapping = buildEditImageMapping(form)
        const referencedImageIndexes = new Set(
          form.variants.flatMap((variant) => variant.imageIndexes),
        )
        const currentVariantIds = form.variants
          .map((variant) => variant.variantId)
          .filter((variantId): variantId is string => Boolean(variantId))
        const hasDeletedVariants = initialVariantIds.some(
          (initialVariantId) => !currentVariantIds.includes(initialVariantId),
        )
        const payload: AdminProductEditPayload = {
          title: form.title,
          description: form.description,
          vendor: form.vendor,
          category: form.category,
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
          videoUrls: parseCommaSeparatedValues(form.videoUrls),
          certificateUrls: parseCommaSeparatedValues(form.certificateUrls),
          diamondPcs: Number(form.diamondPcs) || 0,
          variants: form.variants.map((variant, index) => ({
            id: variant.variantId,
            title: variant.title.trim(),
            variantName: variant.variantName,
            sku: variant.sku.trim(),
            stock: Number(variant.stock) || 0,
            price: variant.price,
            position: index + 1,
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

        await updateProduct(selectedProductId, payload)
        showOperationSuccess('Product updated successfully.')

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === selectedProductId
              ? {
                  ...product,
                  title: form.title,
                  vendor: form.vendor,
                  category: form.category,
                  availability: form.availability,
                }
              : product,
          ),
        )
      } else {
        if (form.variants.length === 0) {
          showOperationError('Add at least one variant before creating the product.')
          return
        }

        const duplicateVariantNames = new Set(form.variants.map((variant) => variant.variantName))

        if (duplicateVariantNames.size !== form.variants.length) {
          showOperationError('Each variant name can only be used once.')
          return
        }

        if (form.images.length === 0) {
          showOperationError('Upload at least one image before creating the product.')
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
          showOperationError('Complete each variant with a title, SKU, non-negative stock, and a price greater than zero.')
          return
        }

        const imageMapping = form.variants.map((variant) => variant.imageIndexes)

        if (imageMapping.some((indexes) => indexes.length === 0)) {
          showOperationError('Assign at least one image to every variant.')
          return
        }

        const payload: AdminProductCreatePayload = {
          title: form.title,
          description: form.description,
          vendor: form.vendor,
          category: form.category,
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
          videoUrls: parseCommaSeparatedValues(form.videoUrls),
          certificateUrls: parseCommaSeparatedValues(form.certificateUrls),
          diamondPcs: Number(form.diamondPcs) || 0,
          variants: form.variants.map((variant, index) => ({
            title: variant.title.trim(),
            variantName: variant.variantName,
            sku: variant.sku.trim(),
            stock: Number(variant.stock) || 0,
            price: variant.price,
            position: index + 1,
          })),
          images: form.images.map((image) => image.file).filter(Boolean) as File[],
          imageMapping,
        }

        await createProduct(payload)
        await loadProducts(filters, currentPage)
        showOperationSuccess('Product created successfully.')
      }

      handleClosePanel()
    } catch {
      showOperationError(panelMode === 'edit' ? 'Unable to save changes right now.' : 'Unable to create product right now.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleConfirmDelete() {
    if (!productPendingDelete) {
      return
    }

    setIsDeleting(productPendingDelete.id)
    setError('')

    try {
      await deleteProduct(productPendingDelete.id)
      const shouldGoPreviousPage = products.length === 1 && currentPage > 1
      await loadProducts(filters, shouldGoPreviousPage ? currentPage - 1 : currentPage)
      setProductPendingDelete(null)
      showOperationSuccess('Product deleted successfully.')
    } catch {
      showOperationError('Unable to delete this product right now.')
    } finally {
      setIsDeleting(null)
    }
  }

  const isPanelOpen = panelMode !== 'closed'
  const isEditing = panelMode === 'edit'
  const panelTitle = isEditing ? 'Edit Product' : 'Add Product'
  const panelDescription = isEditing
    ? 'Update the selected product and save the changes.'
    : 'Add a new product in two steps: details first, then variants and image mapping.'
  const generatedImageMapping = useMemo(() => form.variants.map((variant) => variant.imageIndexes), [form.variants])
  const visibleProducts = useMemo(() => products, [products])

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-[#2b1323] font-parsi">
      <Header />
      <main>
        <div className="mx-auto max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8">
          <div className="border border-[#f0cbe1] bg-[linear-gradient(135deg,#7e2f63_0%,#b94886_55%,#dc74ad_100%)] px-6 py-8 text-white shadow-[0_30px_80px_rgba(153,45,106,0.28)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6d6ea]">Admin Panel</p>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-serif text-3xl text-[#fff6fd] sm:text-4xl">Product Management</h1>
                <p className="mt-3 max-w-2xl text-sm text-[#f7deee] sm:text-base">
                  Review the full catalog, add new products, edit product content, and remove obsolete products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products/import')}
                  className="inline-flex items-center gap-2 border border-[#f6d6ea] bg-white/15 px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#fff4fc] transition hover:bg-white/25"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Import File
                </button>
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="inline-flex items-center gap-2 bg-[#ffe4f2] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7b235c] transition hover:bg-[#ffd2e9]"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </button>
                <div className="border border-[#e9b7d6] bg-white/10 px-5 py-4 text-sm text-[#ffeaf6]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#ffd7ec]">Showing Results</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{pagination?.totalRecords ?? visibleProducts.length}</p>
                </div>
              </div>
            </div>
          </div>

          {error ? <p className="mt-6 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <AdminProductsTable
            isLoading={isLoading}
            isDeleting={isDeleting}
            products={visibleProducts}
            onOpenFilters={() => setIsFilterOpen(true)}
            onAddNew={handleAddNew}
            onRefresh={() => void loadProducts(filters, currentPage)}
            pagination={pagination}
            onPageChange={(page) => void handlePageChange(page)}
            onEdit={(productId) => void handleEdit(productId)}
            onDelete={handleDeleteRequest}
          />
        </div>
      </main>

      <AdminProductModal
        isOpen={isPanelOpen}
        isEditing={isEditing}
        isEditLoading={isEditModalLoading}
        panelTitle={panelTitle}
        panelDescription={panelDescription}
        createStep={createStep}
        form={form}
        imagePreviewUrls={imagePreviewUrls}
        generatedImageMapping={generatedImageMapping}
        isSaving={isSaving}
        onClose={handleClosePanel}
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

      <AdminProductFilterModal
        isOpen={isFilterOpen}
        filters={filters}
        filterOptions={filterOptions}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        onReset={() => void handleResetFilters()}
        onApply={() => void handleApplyFilters()}
      />

      {productPendingDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f0d25]/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl border border-[#f1cde2] bg-white p-6 shadow-[0_30px_80px_rgba(127,31,91,0.32)]">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#a3477c]">Delete Product</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#3f1933]">Delete this product?</h2>
            <p className="mt-3 text-sm text-zinc-600">
              You are about to permanently delete <span className="font-semibold text-[#3f1933]">{productPendingDelete.title}</span>.
              This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                disabled={Boolean(isDeleting)}
                className="border border-[#e8c5db] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleConfirmDelete()}
                disabled={Boolean(isDeleting)}
                className="bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
              >
                {isDeleting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}
