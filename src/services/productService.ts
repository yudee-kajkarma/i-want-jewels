import type {
  AdminVariantName,
  AdminProductCreatePayload,
  AdminProductEditPayload,
  AdminProductUpdatePayload,
  ProductAllFilters,
  Product,
  ProductDetail,
  ProductImage,
  ProductReview,
  ProductReviewsPagination,
  ProductReviewsResult,
  ProductVariant,
  ProductsApiResult,
  ProductsPagination,
  ReviewPayload,
  SeoExtendedSection,
} from '../types/product'
import { minPriceOf, toPrice, type Price } from '../utils/price'
import apiClient, { authApiClient, adminApiClient } from './apiClient'

type ProductImageApiResponse = {
  _id: string
  src: string
  position: number
}

type VariantSizeApiResponse = {
  size: number
  stock: number
  // Optional per-size price override from backend. Numeric fallback covers the
  // legacy pre-Price shape; new responses ship the Price object directly.
  price?: Price | number
  // Optional per-size spec overrides.
  totalDiamondWeight?: number
  measurement?: string
}

type ProductVariantApiResponse = {
  id?: string
  _id?: string
  title: string
  variant_name?: string
  sku?: string
  stock?: number
  price: Price | number
  available?: boolean
  position: number
  thumbnail: string
  previewImage?: string
  images?: ProductImageApiResponse[]
  sizes?: VariantSizeApiResponse[]
  size_measurement?: string
  customsValueUSD?: number
  totalStock?: number
  videos?: { url: string; key: string }[]
}

type ProductOptionApiResponse = {
  name: string
  values: string[]
}

type ProductApiResponse = {
  id: string
  productType?: 'PHYSICAL' | 'GIFT_CARD'
  slug?: string
  title: string
  vendor: string
  rating: number
  reviews_count: number
  tags: string[]
  availability: boolean
  category?: string
  collectionName?: string
  variants: ProductVariantApiResponse[]
  minPrice: Price | number
  options: ProductOptionApiResponse[]
}

type SeoExtendedSectionApiResponse =
  | {
      sectionType: 'intro'
      h1?: string
      openingParagraph?: string
    }
  | {
      sectionType: 'standard-h2'
      h2?: string
      quickAnswer?: string
      tables?: Array<{
        tableName?: string
        columns?: string[]
        rows?: Array<Record<string, string>>
      }>
      readMoreDropdown?: string
    }

type ProductDetailApiResponse = {
  id: string
  productType?: 'PHYSICAL' | 'GIFT_CARD'
  slug?: string
  collectionName?: string
  createdAt: string
  updatedAt: string
  title: string
  description: string
  metaTitle?: string
  metaDescription?: string
  h2?: string
  additionalSeoContent?: string
  bulletPoints?: string[]
  style?: string
  metal?: string
  finish?: string
  faqs?: Array<{
    question?: string
    answer?: string
  }>
  tags: string[]
  vendor: string
  rating: number
  reviews_count: number
  is_featured: boolean
  category: string
  stoneType: string
  color: string
  shape: string
  carat: number
  totalDiamondWeight: number
  origin: string
  treatment: string
  availability: boolean
  certificate: string
  measurement: string
  details: string
  certificateUrls: string[]
  diamondPcs: number
  variants: ProductVariantApiResponse[]
  options: ProductOptionApiResponse[]
  seoextended?: SeoExtendedSectionApiResponse[]
}

type ProductsApiResponse = {
  success: boolean
  code: string
  message: string
  data: ProductApiResponse[]
  pagination: ProductsPagination
  filters: {
    applied: string[]
  }
}

type ProductDetailResponse = {
  success: boolean
  code: string
  message: string
  data: ProductDetailApiResponse
  recommendedProducts?: ProductApiResponse[]
}

type ProductReviewApiResponse = {
  id: string
  createdAt: string
  updatedAt: string
  productId: string
  userId: string
  username: string
  userEmail: string
  rating: number
  comment: string
  reviewerName: string
  reviewerEmail: string
  helpfulCount: number
  isEditable: boolean
}

type ProductReviewsResponse = {
  success: boolean
  code: string
  message: string
  data: {
    reviews: ProductReviewApiResponse[]
    pagination: ProductReviewsPagination
  }
}

type AllProductFiltersResponse = {
  success: boolean
  code: string
  message: string
  data: Omit<ProductAllFilters, 'categories' | 'categoryCounts' | 'priceRange'> & {
    categories: Array<string | { name: string; count: number }>
    collections?: string[]
    priceRange: {
      min: Price | number
      max: Price | number
    }
  }
}

export type GetProductsParams = {
  page?: number
  limit?: number
  search?: string
  category?: string
  stoneType?: string
  color?: string
  shape?: string
  origin?: string
  treatment?: string
  certificate?: string
  measurement?: string
  vendor?: string
  tags?: string | string[]
  metal?: string | string[]
  collection?: string | string[]
  priceMin?: string | number
  priceMax?: string | number
  carat?: string | number
  availability?: string | boolean
  productType?: 'PHYSICAL' | 'GIFT_CARD'
  currency?: string
}

export type AdminProductsResult = {
  products: Product[]
  pagination: ProductsPagination
}

export type BulkCreateVariantPayload = {
  title: string
  variant_name: AdminVariantName
  sku: string
  price: number
  stock: number
}

export type BulkCreateProductPayload = {
  title: string
  description: string
  vendor: string
  category: string
  stoneType: string
  color: string
  shape: string
  carat: number
  origin: string
  treatment: string
  certificate: string
  measurement: string
  details: string
  variants: BulkCreateVariantPayload[]
}

const categoryTags = ['Bracelets', 'Earrings', 'Necklaces', 'Rings', 'Gift Cards']

// Map the backend's singular `category` field to the plural display label used
// on product cards, so a product resolves its category even when it lacks the
// matching plural tag (e.g. bracelets that carry no "Bracelets" tag).
const categoryDisplayLabels: Record<string, string> = {
  bracelet: 'Bracelets',
  bracelets: 'Bracelets',
  earring: 'Earrings',
  earrings: 'Earrings',
  necklace: 'Necklaces',
  necklaces: 'Necklaces',
  ring: 'Rings',
  rings: 'Rings',
  'gift card': 'Gift Cards',
  'gift cards': 'Gift Cards',
}

function normalizeImages(images?: ProductImageApiResponse[]): ProductImage[] {
  const seen = new Set<string>()
  return (images ?? []).reduce<ProductImage[]>((acc, image, idx) => {
    const id = image._id || `img-${image.src}-${idx}`
    if (!seen.has(id)) {
      seen.add(id)
      acc.push({ id, src: image.src, position: image.position })
    }
    return acc
  }, [])
}

function normalizeNumber(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsedValue = Number(value)

    if (Number.isFinite(parsedValue)) {
      return parsedValue
    }
  }

  return 0
}

function normalizeVariant(variant: ProductVariantApiResponse): ProductVariant {
  return {
    id: variant.id ?? variant._id ?? '',
    variantName: variant.variant_name,
    title: variant.title,
    sku: variant.sku,
    stock: variant.stock,
    price: toPrice(variant.price),
    available: variant.available ?? true,
    position: variant.position,
    thumbnail: variant.thumbnail,
    previewImage: variant.previewImage,
    images: normalizeImages(variant.images),
    ...(Array.isArray(variant.sizes) &&
        variant.sizes.length > 0 &&
        variant.sizes.every(
          (entry: any) =>
            entry && typeof entry === 'object' && typeof entry.size === 'number' && typeof entry.stock === 'number',
        )
      ? {
          sizes: variant.sizes.map((entry: any) => ({
            size: Number(entry.size),
            stock: Number(entry.stock) || 0,
            ...(entry?.price !== undefined && entry.price !== null
              ? { price: toPrice(entry.price) }
              : {}),
            ...(typeof entry?.totalDiamondWeight === 'number'
              ? { totalDiamondWeight: entry.totalDiamondWeight }
              : {}),
            ...(typeof entry?.measurement === 'string' && entry.measurement.trim().length > 0
              ? { measurement: entry.measurement.trim() }
              : {}),
          })),
        }
      : {}),
    ...(variant.size_measurement ? { sizeMeasurement: variant.size_measurement } : {}),
    ...(typeof variant.customsValueUSD === 'number' ? { customsValueUsd: variant.customsValueUSD } : {}),
    ...(typeof variant.totalStock === 'number' ? { totalStock: variant.totalStock } : {}),
    ...(Array.isArray(variant.videos) && variant.videos.length > 0
      ? { videos: variant.videos }
      : {}),
  }
}

function getCategory(tags: string[], rawCategory?: string): string {
  // Prefer an explicit plural category tag when present (keeps existing display).
  const tagMatch = tags.find((tag) => categoryTags.includes(tag))
  if (tagMatch) return tagMatch
  // Fall back to the backend's real category, mapped to its plural label.
  const raw = rawCategory?.trim()
  if (raw) {
    return categoryDisplayLabels[raw.toLowerCase()] ?? raw
  }
  return 'Jewellery'
}

function getMetals(variants: ProductVariant[]): string[] {
  const metals = variants
    .map((variant) => {
      const metal = variant.title.split('/')[0]?.trim() ?? ''

      return metal === 'Default Title' ? '' : metal
    })
    .filter(Boolean)

  return Array.from(new Set(metals))
}

function normalizeProduct(product: ProductApiResponse): Product {
  const variants = product.variants.map(normalizeVariant)
  const primaryVariant = variants.find((variant) => variant.available) ?? variants[0]

  return {
    id: product.id,
    productType: product.productType ?? 'PHYSICAL',
    slug: product.slug ?? '',
    title: product.title,
    vendor: product.vendor.trim(),
    rating: normalizeNumber(product.rating),
    reviewsCount: Math.max(0, Math.floor(normalizeNumber(product.reviews_count))),
    tags: product.tags,
    availability: product.availability,
    collectionName: product.collectionName,
    variants,
    minPrice: minPriceOf(variants.map((variant) => variant.price)),
    options: product.options,
    category: getCategory(product.tags, product.category),
    metals: getMetals(variants),
    primaryImage: primaryVariant?.thumbnail ?? '',
  }
}

function normalizeSeoExtended(
  raw: SeoExtendedSectionApiResponse[] | undefined,
): SeoExtendedSection[] {
  if (!Array.isArray(raw)) return []

  const out: SeoExtendedSection[] = []

  for (const section of raw) {
    if (!section || typeof section !== 'object') continue

    if (section.sectionType === 'intro') {
      const h1 = (section.h1 ?? '').trim()
      const openingParagraph = (section.openingParagraph ?? '').trim()
      if (h1 || openingParagraph) {
        out.push({ sectionType: 'intro', h1, openingParagraph })
      }
      continue
    }

    if (section.sectionType === 'standard-h2') {
      const h2 = (section.h2 ?? '').trim()
      if (!h2) continue

      const tables = Array.isArray(section.tables)
        ? section.tables
            .map((table) => ({
              tableName: (table?.tableName ?? '').trim(),
              columns: Array.isArray(table?.columns)
                ? table.columns.map((col) => String(col ?? '').trim()).filter(Boolean)
                : [],
              rows: Array.isArray(table?.rows)
                ? table.rows.filter(
                    (row): row is Record<string, string> =>
                      !!row && typeof row === 'object',
                  )
                : [],
            }))
            .filter((table) => table.columns.length > 0 && table.rows.length > 0)
        : []

      out.push({
        sectionType: 'standard-h2',
        h2,
        quickAnswer: (section.quickAnswer ?? '').trim(),
        tables,
        readMoreDropdown: (section.readMoreDropdown ?? '').trim(),
      })
    }
  }

  return out
}

function normalizeProductDetail(
  product: ProductDetailApiResponse,
  recommendedProducts: ProductApiResponse[] = [],
): ProductDetail {
  const variants = product.variants.map(normalizeVariant)
  const primaryVariant = variants.find((variant) => variant.available) ?? variants[0]
  const minPrice = minPriceOf(variants.map((variant) => variant.price))

  return {
    id: product.id,
    productType: product.productType ?? 'PHYSICAL',
    slug: product.slug ?? '',
    collectionName: product.collectionName,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    title: product.title,
    description: product.description.trim(),
    metaTitle: (product.metaTitle ?? '').trim(),
    metaDescription: (product.metaDescription ?? '').trim(),
    h2: (product.h2 ?? '').trim(),
    additionalSeoContent: (product.additionalSeoContent ?? '').trim(),
    bulletPoints: Array.isArray(product.bulletPoints)
      ? product.bulletPoints.map((point) => point.trim()).filter(Boolean)
      : [],
    style: (product.style ?? '').trim(),
    metal: (product.metal ?? '').trim(),
    finish: (product.finish ?? '').trim(),
    faqs: Array.isArray(product.faqs)
      ? product.faqs
          .map((faq) => ({
            question: (faq.question ?? '').trim(),
            answer: (faq.answer ?? '').trim(),
          }))
          .filter((faq) => faq.question && faq.answer)
      : [],
    vendor: product.vendor.trim(),
    rating: normalizeNumber(product.rating),
    reviewsCount: Math.max(0, Math.floor(normalizeNumber(product.reviews_count))),
    tags: product.tags,
    availability: product.availability,
    variants,
    minPrice,
    options: product.options,
    category: product.category || getCategory(product.tags),
    metals: getMetals(variants),
    primaryImage: primaryVariant?.thumbnail ?? '',
    isFeatured: product.is_featured,
    stoneType: product.stoneType.trim(),
    color: product.color.trim(),
    shape: product.shape.trim(),
    carat: product.carat,
    totalDiamondWeight: normalizeNumber(product.totalDiamondWeight),
    origin: product.origin.trim(),
    treatment: product.treatment.trim(),
    certificate: product.certificate.trim(),
    measurement: product.measurement.trim(),
    details: product.details.trim(),
    certificateUrls: product.certificateUrls,
    diamondPcs: product.diamondPcs,
    recommendedProducts: recommendedProducts.map(normalizeProduct),
    seoExtended: normalizeSeoExtended(product.seoextended),
  }
}

function normalizeProductReview(review: ProductReviewApiResponse): ProductReview {
  return {
    id: review.id,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    productId: review.productId,
    userId: review.userId,
    username: review.username,
    userEmail: review.userEmail,
    rating: review.rating,
    comment: review.comment,
    reviewerName: review.reviewerName,
    reviewerEmail: review.reviewerEmail,
    helpfulCount: review.helpfulCount,
    isEditable: review.isEditable,
  }
}

export async function getProducts(params: GetProductsParams = {}): Promise<ProductsApiResult> {
  const requestParams: Record<string, number | string> = {
    page: params.page ?? 1,
    limit: params.limit ?? 12,
  }

  if (params.category) {
    requestParams.category = params.category
  }

  if (params.search) {
    requestParams.search = params.search
  }

  if (params.stoneType) {
    requestParams.stoneType = params.stoneType
  }

  if (params.color) {
    requestParams.color = params.color
  }

  if (params.shape) {
    requestParams.shape = params.shape
  }

  if (params.origin) {
    requestParams.origin = params.origin
  }

  if (params.treatment) {
    requestParams.treatment = params.treatment
  }

  if (params.certificate) {
    requestParams.certificate = params.certificate
  }

  if (params.measurement) {
    requestParams.measurement = params.measurement
  }

  if (params.vendor) {
    requestParams.vendor = params.vendor
  }

  if (params.productType) {
    requestParams.productType = params.productType
  }

  if (params.tags) {
    requestParams.tags = Array.isArray(params.tags) ? params.tags.join(',') : params.tags
  }

  if (params.metal) {
    requestParams.metal = Array.isArray(params.metal) ? params.metal.join(',') : params.metal
  }

  if (params.collection) {
    requestParams.collection = Array.isArray(params.collection) ? params.collection.join(',') : params.collection
  }

  if (params.priceMin !== undefined && params.priceMin !== '') {
    requestParams.price_min = params.priceMin
  }

  if (params.priceMax !== undefined && params.priceMax !== '') {
    requestParams.price_max = params.priceMax
  }

  if (params.carat !== undefined && params.carat !== '') {
    requestParams.carat = params.carat
  }

  if (params.availability !== undefined && params.availability !== '') {
    requestParams.availability = String(params.availability)
  }

  if (params.currency) {
    requestParams.currency = params.currency
  }

  const response = await apiClient.get<ProductsApiResponse>('/products', {
    params: requestParams,
  })

  return {
    products: response.data.data.map(normalizeProduct),
    pagination: response.data.pagination,
    appliedFilters: response.data.filters.applied,
  }
}

export async function getProductById(productId: string): Promise<ProductDetail> {
  const response = await apiClient.get<ProductDetailResponse>(`/products/${productId}`)

  return normalizeProductDetail(response.data.data, response.data.recommendedProducts)
}

export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  try {
    const response = await apiClient.get<ProductDetailResponse>(`/products/slug/${slug}`)

    return normalizeProductDetail(response.data.data, response.data.recommendedProducts)
  } catch {
    const fallbackResponse = await apiClient.get<ProductDetailResponse>(`/products/${slug}`)

    return normalizeProductDetail(fallbackResponse.data.data, fallbackResponse.data.recommendedProducts)
  }
}

export async function getProductReviews(productId: string): Promise<ProductReviewsResult> {
  const response = await apiClient.get<ProductReviewsResponse>(`/reviews/${productId}`)

  return {
    reviews: response.data.data.reviews.map(normalizeProductReview),
    pagination: response.data.data.pagination,
  }
}

export async function createProductReview(productId: string, payload: ReviewPayload): Promise<void> {
  await authApiClient.post(`/reviews/${productId}`, payload)
}

export async function updateProductReview(reviewId: string, payload: ReviewPayload): Promise<void> {
  await authApiClient.put(`/reviews/${reviewId}`, payload)
}

export async function deleteProductReview(reviewId: string): Promise<void> {
  await authApiClient.delete(`/reviews/${reviewId}`)
}

export async function getAllProductFilters(): Promise<ProductAllFilters> {
  const response = await apiClient.get<AllProductFiltersResponse>('/products/all-filters')

  const categoryEntries = response.data.data.categories ?? []
  const normalizedCategories = categoryEntries.map((categoryEntry) =>
    typeof categoryEntry === 'string' ? categoryEntry : categoryEntry.name,
  )
  const categoryCounts = categoryEntries.reduce<Record<string, number>>((counts, categoryEntry) => {
    if (typeof categoryEntry === 'string') {
      counts[categoryEntry.toLowerCase()] = counts[categoryEntry.toLowerCase()] ?? 0
      return counts
    }

    counts[categoryEntry.name.toLowerCase()] = categoryEntry.count
    return counts
  }, {})

  return {
    ...response.data.data,
    categories: normalizedCategories,
    categoryCounts,
    collections: response.data.data.collections ?? [],
    priceRange: {
      min: toPrice(response.data.data.priceRange?.min),
      max: toPrice(response.data.data.priceRange?.max),
    },
  }
}

export async function getAllProductsForAdmin(params: GetProductsParams = {}): Promise<AdminProductsResult> {
  const response = await getProducts({
    ...params,
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  })

  return {
    products: response.products,
    pagination: response.pagination,
  }
}

export async function getAllProducts(limitPerPage = 100): Promise<Product[]> {
  const firstPageResponse = await getProducts({ page: 1, limit: limitPerPage })
  const aggregatedProducts = [...firstPageResponse.products]
  const totalPages = firstPageResponse.pagination.totalPages

  if (totalPages <= 1) {
    return aggregatedProducts
  }

  const remainingResponses = await Promise.allSettled(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      getProducts({
        page: index + 2,
        limit: limitPerPage,
      }),
    ),
  )

  for (const response of remainingResponses) {
    if (response.status === 'fulfilled') {
      aggregatedProducts.push(...response.value.products)
    }
  }

  const uniqueProductsById = new Map<string, Product>()

  for (const product of aggregatedProducts) {
    if (!uniqueProductsById.has(product.id)) {
      uniqueProductsById.set(product.id, product)
    }
  }

  return Array.from(uniqueProductsById.values())
}

function buildProductFormData(payload: AdminProductCreatePayload | AdminProductEditPayload): FormData {
  const formData = new FormData()

  formData.append('productType', payload.productType ?? 'PHYSICAL')
  formData.append('title', payload.title)
  formData.append('description', payload.description)
  formData.append('tags', payload.tags.join(','))
  formData.append('vendor', payload.vendor)
  formData.append('is_featured', String(payload.isFeatured))
  formData.append('category', payload.category)
  formData.append('stoneType', payload.stoneType)
  formData.append('color', payload.color)
  formData.append('shape', payload.shape)
  formData.append('carat', String(payload.carat))
  formData.append('totalDiamondWeight', String(payload.totalDiamondWeight))
  formData.append('origin', payload.origin)
  formData.append('treatment', payload.treatment)
  formData.append('availability', String(payload.availability))
  formData.append('certificate', payload.certificate)
  formData.append('measurement', payload.measurement)
  formData.append('details', payload.details)
  formData.append('certificateUrls', payload.certificateUrls.join(','))
  formData.append('diamondPcs', String(payload.diamondPcs))
  formData.append(
    'variants',
    JSON.stringify(
      payload.variants.map((variant) => ({
        ...(variant.id ? { id: variant.id } : {}),
        title: variant.title,
        variant_name: variant.variantName,
        sku: variant.sku,
        stock: variant.stock,
        price: variant.price,
        position: variant.position,
        ...(Array.isArray(variant.sizes) && variant.sizes.length > 0
          ? { sizes: variant.sizes.map((entry) => ({
              size: entry.size,
              stock: entry.stock,
              // Backend stores a single numeric price and fans it out to
              // {dol,eur,pou} on read, mirroring variant.price. Send the EUR value.
              ...(entry.price ? { price: entry.price.eur } : {}),
              ...(typeof entry.totalDiamondWeight === 'number' ? { totalDiamondWeight: entry.totalDiamondWeight } : {}),
              ...(entry.measurement ? { measurement: entry.measurement } : {}),
            })) }
          : {}),
        ...(variant.sizeMeasurement ? { size_measurement: variant.sizeMeasurement } : {}),
        ...(typeof variant.customsValueUsd === 'number' ? { customsValueUSD: variant.customsValueUsd } : {}),
        // Always emit videos so an empty array reaches the backend as an
        // explicit clear (not as "field absent, no change").
        videos: variant.videos ?? [],
      })),
    ),
  )
  formData.append('imageMapping', JSON.stringify(payload.imageMapping))

  if ('existingImages' in payload) {
    formData.append(
      'existingImages',
      JSON.stringify(
        payload.existingImages.map((image) => ({
          ...(image.id ? { id: image.id } : {}),
          src: image.src,
          position: image.position,
        })),
      ),
    )

    if (payload.variantPos !== undefined) {
      formData.append('variantPos', JSON.stringify(payload.variantPos))
    }
  }

  payload.images.forEach((imageFile) => {
    formData.append('images', imageFile)
  })

  return formData
}

export async function createProduct(payload: AdminProductCreatePayload): Promise<void> {
  const formData = buildProductFormData(payload)

  await authApiClient.post('/products', formData)
}

export async function updateProduct(productId: string, payload: AdminProductEditPayload | AdminProductUpdatePayload): Promise<void> {
  if ('variants' in payload && 'imageMapping' in payload && 'images' in payload) {
    const formData = buildProductFormData(payload)

    await authApiClient.put(`/products/${productId}`, formData)
    return
  }

  await authApiClient.put(`/products/${productId}`, payload)
}

export async function deleteProduct(productId: string): Promise<void> {
  await authApiClient.delete(`/products/${productId}`)
}

export async function bulkCreateProducts(payload: { products: BulkCreateProductPayload[] }): Promise<void> {
  await authApiClient.post('/products/bulk-create', payload)
}

// ── Product video uploads (presigned PUT direct to S3) ──────────────────────

export type VideoUploadUrlRequest = {
  filename: string
  contentType: 'video/mp4' | 'video/quicktime' | 'video/webm'
  sizeBytes: number
  productId?: string
}

export type VideoUploadUrlResponse = {
  uploadUrl: string
  key: string
  publicUrl: string
}

export async function requestVideoUploadUrl(
  payload: VideoUploadUrlRequest,
): Promise<VideoUploadUrlResponse> {
  const { data } = await adminApiClient.post<{
    success: boolean
    data: VideoUploadUrlResponse
  }>('/products/videos/upload-url', payload)
  return data.data
}