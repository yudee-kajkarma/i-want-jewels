'use client'

import type { AdminProductUpdatePayload, AdminVariantName, ProductDetail } from '../../types/product'
import { toPrice, type Price } from '../../utils/price'

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
  price: Price
  imageIndexes: number[]
}

export type EditableProductForm = AdminProductUpdatePayload & {
  tags: string
  isFeatured: boolean
  videoUrls: string
  certificateUrls: string
  diamondPcs: number
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
    price: { dol: 0, eur: 0, pou: 0 },
    imageIndexes: [],
  }
}

export function createEmptyForm(): EditableProductForm {
  return {
    title: '',
    description: '',
    vendor: '',
    category: '',
    stoneType: '',
    color: '',
    shape: '',
    carat: 0,
    origin: '',
    treatment: '',
    availability: true,
    certificate: '',
    measurement: '',
    details: '',
    tags: '',
    isFeatured: false,
    videoUrls: '',
    certificateUrls: '',
    diamondPcs: 0,
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
    title: product.title,
    description: product.description,
    vendor: product.vendor,
    category: product.category,
    stoneType: product.stoneType,
    color: product.color,
    shape: product.shape,
    carat: product.carat,
    origin: product.origin,
    treatment: product.treatment,
    availability: product.availability,
    certificate: product.certificate,
    measurement: product.measurement,
    details: product.details,
    tags: product.tags.join(', '),
    isFeatured: product.isFeatured,
    videoUrls: product.videoUrls.join(', '),
    certificateUrls: product.certificateUrls.join(', '),
    diamondPcs: product.diamondPcs,
    variants:
      product.variants.length > 0
        ? product.variants.map((variant) => ({
            id: createDraftId(),
            variantId: variant.id || undefined,
            title: variant.title,
            variantName:
              variant.variantName === 'gold' ||
              variant.variantName === 'rose gold' ||
              variant.variantName === 'silver'
                ? variant.variantName
                : 'gold',
            sku: variant.sku ?? '',
            stock: variant.stock ?? 0,
            price: toPrice(variant.price),
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