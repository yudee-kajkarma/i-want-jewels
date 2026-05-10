import type { Price } from '../utils/price'

export type ProductVariant = {
  id: string
  variantName?: string
  title: string
  sku?: string
  stock?: number
  price: Price
  available: boolean
  position: number
  thumbnail: string
  previewImage?: string
  images?: ProductImage[]
}

export type ProductImage = {
  id: string
  src: string
  position: number
}

export type ProductOption = {
  name: string
  values: string[]
}

export type ProductFaq = {
  question: string
  answer: string
}

export type Product = {
  id: string
  slug: string
  title: string
  vendor: string
  rating: number
  reviewsCount: number
  tags: string[]
  availability: boolean
  variants: ProductVariant[]
  minPrice: Price
  options: ProductOption[]
  category: string
  metals: string[]
  primaryImage: string
}

export type ProductDetail = Product & {
  createdAt: string
  updatedAt: string
  description: string
  metaTitle: string
  metaDescription: string
  h2: string
  additionalSeoContent: string
  bulletPoints: string[]
  faqs: ProductFaq[]
  style: string
  metal: string
  finish: string
  isFeatured: boolean
  stoneType: string
  color: string
  shape: string
  carat: number
  totalDiamondWeight: number
  origin: string
  treatment: string
  certificate: string
  measurement: string
  details: string
  videoUrls: string[]
  certificateUrls: string[]
  diamondPcs: number
  recommendedProducts: Product[]
}

export type AdminProductUpdatePayload = {
  title: string
  description: string
  vendor: string
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
}

export type AdminVariantName = 'gold' | 'rose gold' | 'silver'

export type AdminProductVariantPayload = {
  id?: string
  title: string
  variantName: AdminVariantName
  sku: string
  stock: number
  price: number
  position: number
}

export type AdminExistingProductImagePayload = {
  id?: string
  src: string
  position: number
}

export type AdminProductCreatePayload = AdminProductUpdatePayload & {
  tags: string[]
  isFeatured: boolean
  videoUrls: string[]
  certificateUrls: string[]
  diamondPcs: number
  variants: AdminProductVariantPayload[]
  images: File[]
  imageMapping: Array<Array<string | number>>
}

export type AdminProductEditPayload = AdminProductUpdatePayload & {
  tags: string[]
  isFeatured: boolean
  videoUrls: string[]
  certificateUrls: string[]
  diamondPcs: number
  variants: AdminProductVariantPayload[]
  variantPos?: string[]
  existingImages: AdminExistingProductImagePayload[]
  images: File[]
  imageMapping: Array<Array<string | number>>
}

export type ProductReview = {
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

export type ReviewPayload = {
  rating: number
  comment: string
}

export type ProductReviewsPagination = {
  current: number
  total: number
  limit: number
  totalReviews: number
}

export type ProductReviewsResult = {
  reviews: ProductReview[]
  pagination: ProductReviewsPagination
}

export type ProductsPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type ProductsApiResult = {
  products: Product[]
  pagination: ProductsPagination
  appliedFilters: string[]
}

export type ProductNumericRange = {
  min: number
  max: number
}

export type ProductPriceRange = {
  min: Price
  max: Price
}

export type ProductAllFilters = {
  categories: string[]
  categoryCounts?: Record<string, number>
  stoneTypes: string[]
  colors: string[]
  shapes: string[]
  origins: string[]
  treatments: string[]
  certificates: string[]
  measurements: string[]
  vendors: string[]
  tags: string[]
  metals: string[]
  priceRange: ProductPriceRange
  ratingRange: ProductNumericRange
  caratRange: ProductNumericRange
}

export type ProductsFilterState = {
  page: number
  search: string
  category: string
  stoneType: string
  color: string
  shape: string
  origin: string
  treatment: string
  certificate: string
  measurement: string
  vendor: string
  tags: string[]
  metal: string[]
  priceMin: string
  priceMax: string
  carat: string
}
