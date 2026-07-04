import type { Price } from '../utils/price'

export type VariantSize = {
  size: number
  stock: number
  // Optional per-size SKU override. When absent, the parent variant's sku applies.
  sku?: string
  // Optional per-size price override in Price shape ({dol, eur, pou}).
  // When absent, the parent variant's `price` applies. Backend enforces the
  // invariant that variant.price === min(size.price) whenever any size uses
  // per-size pricing, so listing surfaces (cards, minPrice) still work.
  price?: Price
  // Optional per-size spec overrides. When absent, product-level values apply.
  totalDiamondWeight?: number
  measurement?: string
}

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
  // Optional detail-page lead image (an image `src`). When absent the detail
  // viewer leads with the first non-thumbnail image. Distinct from `thumbnail`
  // (the card cover).
  coverImage?: string
  previewImage?: string
  images?: ProductImage[]
  sizes?: VariantSize[]
  sizeMeasurement?: string
  customsValueUsd?: number
  totalStock?: number
  videos?: { url: string; key: string }[]
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

export type SeoExtendedTable = {
  tableName: string
  columns: string[]
  rows: Array<Record<string, string>>
}

export type SeoIntroSection = {
  sectionType: 'intro'
  h1: string
  openingParagraph: string
}

export type SeoStandardSection = {
  sectionType: 'standard-h2'
  h2: string
  quickAnswer: string
  tables: SeoExtendedTable[]
  readMoreDropdown: string
}

export type SeoExtendedSection = SeoIntroSection | SeoStandardSection

export type Product = {
  id: string
  productType: 'PHYSICAL' | 'GIFT_CARD'
  slug: string
  title: string
  vendor: string
  rating: number
  reviewsCount: number
  tags: string[]
  availability: boolean
  collectionName?: string
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
  certificateUrls: string[]
  diamondPcs: number
  recommendedProducts: Product[]
  seoExtended: SeoExtendedSection[]
}

export type AdminProductUpdatePayload = {
  productType?: 'PHYSICAL' | 'GIFT_CARD'
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

export type AdminVariantName = 'gold' | 'rose gold' | 'silver' | 'gift card'

export type AdminProductVariantPayload = {
  id?: string
  title: string
  variantName: AdminVariantName
  sku: string
  stock: number
  price: number
  position: number
  coverImage?: string
  sizes?: VariantSize[]
  sizeMeasurement?: string
  customsValueUsd?: number
  videos?: { url: string; key: string }[]
}

export type AdminExistingProductImagePayload = {
  id?: string
  src: string
  position: number
}

export type AdminProductCreatePayload = AdminProductUpdatePayload & {
  tags: string[]
  isFeatured: boolean
  certificateUrls: string[]
  diamondPcs: number
  variants: AdminProductVariantPayload[]
  images: File[]
  imageMapping: Array<Array<string | number>>
}

export type AdminProductEditPayload = AdminProductUpdatePayload & {
  tags: string[]
  isFeatured: boolean
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
  collections: string[]
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
  collection: string[]
  priceMin: string
  priceMax: string
  carat: string
}
