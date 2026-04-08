import type {
  AddToWishlistPayload,
  AdminUserWishlist,
  AdminWishlistItem,
  AdminWishlistUser,
  AdminWishlistUsersResult,
  Wishlist,
  WishlistItem,
  WishlistUsersPagination,
} from '../types/wishlist'
import { adminApiClient, authApiClient } from './apiClient'

type WishlistItemApiResponse = Record<string, unknown>

type WishlistApiResponse = {
  success: boolean
  code: string
  message: string
  data: {
    id: string
    createdAt: string
    updatedAt: string
    items: WishlistItemApiResponse[]
    isActive: boolean
  }
}

type AdminWishlistUserApiResponse = {
  userId?: string
  userName?: string
  userEmail?: string
  userPhone?: string
  itemCount?: number
  totalValue?: number
  lastUpdated?: string
}

type AdminWishlistUsersApiResponse = {
  success: boolean
  code: string
  message: string
  data:
    | AdminWishlistUserApiResponse[]
    | {
        data?: AdminWishlistUserApiResponse[]
        pagination?: WishlistUsersPagination
      }
}

type AdminUserWishlistApiResponse = {
  success: boolean
  code: string
  message: string
  data: {
    id?: string
    createdAt?: string
    updatedAt?: string
    items?: Array<{
      productId?: string
      title?: string
      price?: number
      thumbnail?: string
      addedAt?: string
    }>
    isActive?: boolean
    userDetails?: {
      userName?: string
      userEmail?: string
      userPhone?: string
    }
  }
}

type AdminUserWishlistItemApiResponse = NonNullable<AdminUserWishlistApiResponse['data']['items']>[number]

function getStringValue(record: Record<string, unknown>, key: string): string {
  const value = record[key]

  return typeof value === 'string' ? value : ''
}

function getNumberValue(record: Record<string, unknown>, key: string): number {
  const value = record[key]

  return typeof value === 'number' ? value : 0
}

function getObjectValue(record: Record<string, unknown>, key: string): Record<string, unknown> | null {
  const value = record[key]

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }

  return null
}

function getArrayValue(record: Record<string, unknown>, key: string): Record<string, unknown>[] {
  const value = record[key]

  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object')
}

function normalizeWishlistItem(item: WishlistItemApiResponse): WishlistItem {
  const product = getObjectValue(item, 'product')
  const productId =
    getStringValue(item, 'productId') ||
    getStringValue(product ?? {}, 'id') ||
    getStringValue(product ?? {}, '_id')
  const slug = getStringValue(item, 'slug') || getStringValue(product ?? {}, 'slug')
  const variants = getArrayValue(product ?? {}, 'variants')
  const firstVariant = variants[0] ?? null
  const productImages = getArrayValue(product ?? {}, 'images')
  const variantImages = getArrayValue(firstVariant ?? {}, 'images')
  const title =
    getStringValue(item, 'title') ||
    getStringValue(item, 'productTitle') ||
    getStringValue(product ?? {}, 'title') ||
    `Product ${productId || 'item'}`
  const category =
    getStringValue(item, 'category') ||
    getStringValue(product ?? {}, 'category') ||
    getStringValue(product ?? {}, 'productType')
  const thumbnail =
    getStringValue(item, 'thumbnail') ||
    getStringValue(item, 'image') ||
    getStringValue(product ?? {}, 'thumbnail') ||
    getStringValue(product ?? {}, 'primaryImage') ||
    getStringValue(firstVariant ?? {}, 'thumbnail') ||
    getStringValue(productImages[0] ?? {}, 'url') ||
    getStringValue(productImages[0] ?? {}, 'src') ||
    getStringValue(variantImages[0] ?? {}, 'url') ||
    getStringValue(variantImages[0] ?? {}, 'src')
  const price =
    getNumberValue(item, 'price') ||
    getNumberValue(product ?? {}, 'minPrice') ||
    getNumberValue(firstVariant ?? {}, 'price')
  const rating = getNumberValue(item, 'rating') || getNumberValue(product ?? {}, 'averageRating') || getNumberValue(product ?? {}, 'rating')
  const reviewsCount =
    getNumberValue(item, 'reviewsCount') ||
    getNumberValue(product ?? {}, 'reviewsCount') ||
    getNumberValue(product ?? {}, 'totalReviews')

  return {
    id: getStringValue(item, 'id') || getStringValue(item, '_id') || productId,
    productId,
    slug,
    title,
    category,
    thumbnail,
    price,
    rating,
    reviewsCount,
  }
}

function normalizeWishlist(response: WishlistApiResponse['data']): Wishlist {
  return {
    id: response.id,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    items: (response.items ?? []).map(normalizeWishlistItem),
    isActive: response.isActive,
  }
}

export async function getWishlist(): Promise<Wishlist> {
  const response = await authApiClient.get<WishlistApiResponse>('/wishlist')

  return normalizeWishlist(response.data.data)
}

export async function addWishlistItem(payload: AddToWishlistPayload): Promise<void> {
  await authApiClient.post('/wishlist/add', payload)
}

export async function deleteWishlistItem(itemId: string): Promise<void> {
  await authApiClient.delete(`/wishlist/item/${itemId}`)
}

export async function clearWishlistItems(): Promise<void> {
  await authApiClient.delete('/wishlist/clear')
}

function normalizeAdminWishlistUser(user: AdminWishlistUserApiResponse): AdminWishlistUser {
  return {
    userId: user.userId ?? '',
    userName: user.userName ?? '',
    userEmail: user.userEmail ?? '',
    userPhone: user.userPhone ?? 'Not provided',
    itemCount: typeof user.itemCount === 'number' ? user.itemCount : 0,
    totalValue: typeof user.totalValue === 'number' ? user.totalValue : 0,
    lastUpdated: user.lastUpdated ?? '',
  }
}

function normalizeAdminWishlistItem(item: AdminUserWishlistItemApiResponse): AdminWishlistItem {
  return {
    productId: item?.productId ?? '',
    title: item?.title ?? '',
    price: typeof item?.price === 'number' ? item.price : 0,
    thumbnail: item?.thumbnail ?? '',
    addedAt: item?.addedAt ?? '',
  }
}

function normalizeUsersResponse(response: AdminWishlistUsersApiResponse): AdminWishlistUsersResult {
  const payload = response.data

  if (Array.isArray(payload)) {
    return {
      users: payload.map(normalizeAdminWishlistUser),
      pagination: null,
    }
  }

  return {
    users: (payload.data ?? []).map(normalizeAdminWishlistUser),
    pagination: payload.pagination ?? null,
  }
}

export async function getAdminWishlistUsers(params?: {
  page?: number
  limit?: number
  search?: string
}): Promise<AdminWishlistUsersResult> {
  const response = await adminApiClient.get<AdminWishlistUsersApiResponse>('/wishlist/admin/users', {
    params: {
      page: params?.page,
      limit: params?.limit,
      search: params?.search?.trim() || undefined,
    },
  })

  return normalizeUsersResponse(response.data)
}

export async function getAdminUserWishlist(userId: string): Promise<AdminUserWishlist> {
  const response = await adminApiClient.get<AdminUserWishlistApiResponse>(`/wishlist/admin/user/${userId}`)
  const payload = response.data.data

  return {
    id: payload.id ?? '',
    createdAt: payload.createdAt ?? '',
    updatedAt: payload.updatedAt ?? '',
    items: (payload.items ?? []).map(normalizeAdminWishlistItem),
    isActive: Boolean(payload.isActive),
    userDetails: {
      userName: payload.userDetails?.userName ?? '',
      userEmail: payload.userDetails?.userEmail ?? '',
      userPhone: payload.userDetails?.userPhone ?? 'Not provided',
    },
  }
}