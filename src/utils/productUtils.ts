import type { Product, ProductImage, ProductVariant } from '../types/product'

const euroFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const metalClasses: Record<string, string> = {
  'Yellow Gold': 'bg-[#ddb018]',
  Gold: 'bg-[#ddb018]',
  'Rose Gold': 'bg-[#cd8b93]',
  'White Gold': 'bg-[#d6d1d1]',
  Silver: 'bg-[#d6d1d1]',
}

export function formatEuro(value: number): string {
  return euroFormatter.format(value)
}

export function getPrimaryVariant(product: Product): ProductVariant | undefined {
  return product.variants.find((variant) => variant.available) ?? product.variants[0]
}

export function getProductImage(product: Product): string {
  return getPrimaryVariant(product)?.thumbnail || product.primaryImage || 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80'
}

export function getProductHoverImage(product: Product): string | null {
  const primaryVariant = getPrimaryVariant(product)

  if (!primaryVariant) {
    return null
  }

  if (primaryVariant.previewImage && primaryVariant.previewImage !== primaryVariant.thumbnail) {
    return primaryVariant.previewImage
  }

  const gallery = getVariantGallery(primaryVariant)
  const primaryImage = gallery[0]?.src || getProductImage(product)
  const secondImage = gallery.find((image) => image.src && image.src !== primaryImage)?.src

  return secondImage ?? null
}

export function getVariantImage(variant: ProductVariant): string {
  return variant.images?.[0]?.src || variant.thumbnail || 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80'
}

export function getVariantGallery(variant: ProductVariant): ProductImage[] {
  if (variant.images && variant.images.length > 0) {
    return variant.images
  }

  return [
    {
      id: `${variant.id}-fallback`,
      src: getVariantImage(variant),
      position: 0,
    },
  ]
}

export function getMetalToneClass(metal: string): string {
  return metalClasses[metal] ?? 'bg-[#d6d1d1]'
}

export function getProductCaption(product: Product): string {
  const visibleTags = product.tags.filter((tag) => tag !== product.category && tag !== 'Trending Products')

  if (visibleTags.length > 0) {
    return visibleTags.slice(0, 3).join(' | ')
  }

  return product.vendor
}

export function formatReviewCount(value: number): string {
  return `${value} review${value === 1 ? '' : 's'}`
}