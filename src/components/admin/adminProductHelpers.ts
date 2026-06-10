'use client'

import type { AdminProductUpdatePayload, AdminVariantName, ProductDetail, VariantSize } from '../../types/product'
import { toPrice } from '../../utils/price'

export const SIZE_MEASUREMENT_OPTIONS = ['EURO', 'INCH', 'US', 'MM'] as const
export type SizeMeasurement = typeof SIZE_MEASUREMENT_OPTIONS[number]

export type ProductImageFormItem = {
  id: string
  name: string
  src: string
  file: File | null
  position: number
  isExisting: boolean
}

export type CreateVariantForm = {
  id: string
  variantId?: string
  title: string
  variantName: AdminVariantName
  sku: string
  stock: number
  price: number
  imageIndexes: number[]
  sizes: VariantSize[]
  sizeMeasurement: string
  customsValueUsd: number | null
  videos: { url: string; key: string }[]
}

export type EditableProductForm = AdminProductUpdatePayload & {
  tags: string
  isFeatured: boolean
  certificateUrls: string
  diamondPcs: number
  metal: string
  variants: CreateVariantForm[]
  images: ProductImageFormItem[]
}

export type PanelMode = 'closed' | 'create' | 'edit'

export type AdminFilters = {
  category: string
  stoneType: string
  color: string
  shape: string
  origin: string
  treatment: string
  certificate: string
  measurement: string
  vendor: string
  tags: string
  metal: string
  priceMin: string
  priceMax: string
  carat: string
  availability: 'all' | 'available' | 'hidden'
}

export const variantNameOptions: Array<{ value: AdminVariantName; label: string }> = [
  { value: 'gold', label: 'Yellow Gold' },
  { value: 'rose gold', label: 'Rose Gold' },
  { value: 'silver', label: 'White Gold' },
]

export const defaultFilters: AdminFilters = {
  category: '',
  stoneType: '',
  color: '',
  shape: '',
  origin: '',
  treatment: '',
  certificate: '',
  measurement: '',
  vendor: '',
  tags: '',
  metal: '',
  priceMin: '',
  priceMax: '',
  carat: '',
  availability: 'all',
}

export function createDraftId(): string {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function getVariantLabel(variantName: AdminVariantName): string {
  return variantNameOptions.find((option) => option.value === variantName)?.label ?? 'Variant'
}

export function createEmptyVariant(variantName: AdminVariantName = 'gold'): CreateVariantForm {
  return {
    id: createDraftId(),
    title: getVariantLabel(variantName),
    variantName,
    sku: '',
    stock: 0,
    price: 0,
    imageIndexes: [],
    sizes: [],
    sizeMeasurement: '',
    customsValueUsd: null,
    videos: [],
  }
}

export function createEmptyGiftCardVariant(): CreateVariantForm {
  return {
    id: createDraftId(),
    title: '',
    variantName: 'gift card',
    sku: '',
    stock: 0,
    price: 0,
    imageIndexes: [],
    sizes: [],
    sizeMeasurement: '',
    customsValueUsd: null,
    videos: [],
  }
}

export function createEmptyForm(): EditableProductForm {
  return {
    productType: 'PHYSICAL',
    title: '',
    description: '',
    vendor: '',
    category: '',
    stoneType: '',
    color: '',
    shape: '',
    carat: 0,
    totalDiamondWeight: 0,
    origin: '',
    treatment: '',
    availability: true,
    certificate: '',
    measurement: '',
    details: '',
    tags: '',
    isFeatured: false,
    certificateUrls: '',
    diamondPcs: 0,
    metal: '',
    variants: [createEmptyVariant()],
    images: [],
  }
}

function getImageName(src: string): string {
  const segments = src.split('/')
  const lastSegment = segments[segments.length - 1] ?? 'product-image'
  const decodedSegment = decodeURIComponent(lastSegment)

  return decodedSegment.split('?')[0] || 'product-image'
}

export function parseCommaSeparatedValues(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}


export function buildForm(product: ProductDetail): EditableProductForm {
  const images: ProductImageFormItem[] = []
  const imageIndexByKey = new Map<string, number>()

  return {
    productType: product.productType ?? 'PHYSICAL',
    title: product.title,
    description: product.description,
    vendor: product.vendor,
    category: product.category,
    stoneType: product.stoneType,
    color: product.color,
    shape: product.shape,
    carat: product.carat,
    totalDiamondWeight: product.totalDiamondWeight,
    origin: product.origin,
    treatment: product.treatment,
    availability: product.availability,
    certificate: product.certificate,
    measurement: product.measurement,
    details: product.details,
    tags: product.tags.join(', '),
    isFeatured: product.isFeatured,
    certificateUrls: product.certificateUrls.join(', '),
    diamondPcs: product.diamondPcs,
    metal: product.metal,
    variants:
      product.variants.length > 0
        ? product.variants.map((variant) => ({
            id: createDraftId(),
            variantId: variant.id || undefined,
            title: variant.title,
            variantName:
              variant.variantName === 'gold' ||
              variant.variantName === 'rose gold' ||
              variant.variantName === 'silver' ||
              variant.variantName === 'gift card'
                ? variant.variantName
                : 'gold',
            sku: variant.sku ?? '',
            stock: variant.stock ?? 0,
            price: toPrice(variant.price).eur,
            sizes: Array.isArray(variant.sizes)
              ? variant.sizes.map((entry) => ({ size: entry.size, stock: entry.stock }))
              : [],
            sizeMeasurement: variant.sizeMeasurement ?? '',
            customsValueUsd: typeof variant.customsValueUsd === 'number' ? variant.customsValueUsd : null,
            videos: variant.videos ?? [],
            imageIndexes: (variant.images ?? []).map((image) => {
              const imageKey = image.id || image.src
              const existingImageIndex = imageIndexByKey.get(imageKey)

              if (typeof existingImageIndex === 'number') {
                return existingImageIndex
              }

              const nextImageIndex = images.length

              images.push({
                id: image.id || createDraftId(),
                name: getImageName(image.src),
                src: image.src,
                file: null,
                position: image.position,
                isExisting: true,
              })
              imageIndexByKey.set(imageKey, nextImageIndex)

              return nextImageIndex
            }),
          }))
        : [createEmptyVariant()],
    images,
  }
}