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
} from '../types/product'
import { minPriceOf, toPrice, type Price } from '../utils/price'
import apiClient, { authApiClient } from './apiClient'

type ProductImageApiResponse = {
  _id: string
  src: string
  position: number
}

type VariantSizeApiResponse = {
  size: number
  stock: number
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
  variants: ProductVariantApiResponse[]
  minPrice: Price | number
  options: ProductOptionApiResponse[]
}

type ProductDetailApiResponse = {
  id: string
  productType?: 'PHYSICAL' | 'GIFT_CARD'
  slug?: string
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
  videoUrls: string[]
  certificateUrls: string[]
  diamondPcs: number
  variants: ProductVariantApiResponse[]
  options: ProductOptionApiResponse[]
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
      ? { sizes: variant.sizes.map((entry: any) => ({ size: Number(entry.size), stock: Number(entry.stock) || 0 })) }
      : {}),
    ...(variant.size_measurement ? { sizeMeasurement: variant.size_measurement } : {}),
    ...(typeof variant.customsValueUSD === 'number' ? { customsValueUsd: variant.customsValueUSD } : {}),
    ...(typeof variant.totalStock === 'number' ? { totalStock: variant.totalStock } : {}),
  }
}

function getCategory(tags: string[]): string {
  return tags.find((tag) => categoryTags.includes(tag)) ?? 'Jewellery'
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
    variants,
    minPrice: minPriceOf(variants.map((variant) => variant.price)),
    options: product.options,
    category: getCategory(product.tags),
    metals: getMetals(variants),
    primaryImage: primaryVariant?.thumbnail ?? '',
  }
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
    videoUrls: product.videoUrls,
    certificateUrls: product.certificateUrls,
    diamondPcs: product.diamondPcs,
    recommendedProducts: recommendedProducts.map(normalizeProduct),
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
  formData.append('videoUrls', payload.videoUrls.join(','))
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
          ? { sizes: variant.sizes.map((entry) => ({ size: entry.size, stock: entry.stock })) }
          : {}),
        ...(variant.sizeMeasurement ? { size_measurement: variant.sizeMeasurement } : {}),
        ...(typeof variant.customsValueUsd === 'number' ? { customsValueUSD: variant.customsValueUsd } : {}),
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