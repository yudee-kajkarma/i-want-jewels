import type {
  AddToCartPayload,
  AdminCartItem,
  AdminCartUser,
  AdminCartUsersResult,
  AdminUserCart,
  Cart,
  CartItem,
  CartUsersPagination,
} from '../types/cart'
import { toPrice, type Price } from '../utils/price'
import { adminApiClient, authApiClient } from './apiClient'

type CartItemApiResponse = Record<string, unknown>

type CartApiResponse = {
  success: boolean
  code: string
  message: string
  data: {
    id: string
    createdAt: string
    updatedAt: string
    items: CartItemApiResponse[]
    isActive: boolean
  }
}

type AdminCartUserApiResponse = {
  userId?: string
  userName?: string
  userEmail?: string
  userPhone?: string
  itemCount?: number
  totalAmount?: number
  lastUpdated?: string
}

type AdminCartUsersApiResponse = {
  success: boolean
  code: string
  message: string
  data:
    | AdminCartUserApiResponse[]
    | {
        data?: AdminCartUserApiResponse[]
        pagination?: CartUsersPagination
      }
}

type AdminUserCartApiResponse = {
  success: boolean
  code: string
  message: string
  data: {
    id?: string
    createdAt?: string
    updatedAt?: string
    items?: Array<{
      productId?: string
      variantId?: string
      variant_name?: string
      sku?: string
      title?: string
      price?: Price | number
      quantity?: number
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

type AdminUserCartItemApiResponse = NonNullable<AdminUserCartApiResponse['data']['items']>[number]

function getStringValue(record: Record<string, unknown>, key: string): string {
  const value = record[key]

  return typeof value === 'string' ? value : ''
}

function getNumberValue(record: Record<string, unknown>, key: string): number {
  const value = record[key]

  return typeof value === 'number' ? value : 0
}

function getPriceValue(record: Record<string, unknown>, key: string): Price | null {
  const value = record[key]

  if (typeof value === 'number') {
    return toPrice(value)
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return toPrice(value as Price)
  }

  return null
}

function getObjectValue(record: Record<string, unknown>, key: string): Record<string, unknown> | null {
  const value = record[key]

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }

  return null
}

const fallbackCartThumbnail =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22320%22 viewBox=%220 0 320 320%22%3E%3Crect width=%22320%22 height=%22320%22 fill=%22%23f7efe7%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%238b5f43%22 font-family=%22Arial%22 font-size=%2220%22%3ENo Image%3C/text%3E%3C/svg%3E'

function normalizeCartItem(item: CartItemApiResponse): CartItem {
  const product = getObjectValue(item, 'product')
  const variant = getObjectValue(item, 'variant')
  const productId =
    getStringValue(item, 'productId') ||
    getStringValue(product ?? {}, 'id') ||
    getStringValue(product ?? {}, '_id')
  const variantId =
    getStringValue(item, 'variantId') ||
    getStringValue(variant ?? {}, 'id') ||
    getStringValue(variant ?? {}, '_id')
  const title =
    getStringValue(item, 'title') ||
    getStringValue(item, 'productTitle') ||
    getStringValue(product ?? {}, 'title') ||
    `Product ${productId || 'item'}`
  const variantTitle =
    getStringValue(item, 'variantTitle') ||
    getStringValue(variant ?? {}, 'title') ||
    ''
  const thumbnail =
    getStringValue(item, 'thumbnail') ||
    getStringValue(item, 'image') ||
    getStringValue(variant ?? {}, 'thumbnail') ||
    getStringValue(product ?? {}, 'thumbnail') ||
    getStringValue(product ?? {}, 'primaryImage') ||
    fallbackCartThumbnail
  const price =
    getPriceValue(item, 'price') ??
    getPriceValue(variant ?? {}, 'price') ??
    getPriceValue(product ?? {}, 'minPrice') ??
    toPrice(0)
  const quantity = getNumberValue(item, 'quantity') || 1

  return {
    id: getStringValue(item, 'id') || getStringValue(item, '_id') || variantId || productId,
    productId,
    variantId,
    title,
    variantTitle,
    thumbnail,
    price,
    quantity,
  }
}

function normalizeCart(response: CartApiResponse['data']): Cart {
  return {
    id: response.id,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    items: (response.items ?? []).map(normalizeCartItem),
    isActive: response.isActive,
  }
}

export async function getCart(): Promise<Cart> {
  const response = await authApiClient.get<CartApiResponse>('/cart')

  return normalizeCart(response.data.data)
}

export async function addCartItem(payload: AddToCartPayload): Promise<void> {
  await authApiClient.post('/cart/add', payload)
}

export async function updateCartItem(itemId: string, quantity: number): Promise<void> {
  await authApiClient.put(`/cart/item/${itemId}`, { quantity })
}

export async function deleteCartItem(productId: string, variantId: string): Promise<void> {
  await authApiClient.delete(`/cart/item/${productId}/${variantId}`)
}

export async function clearCartItems(): Promise<void> {
  await authApiClient.delete('/cart/clear')
}

function normalizeAdminCartUser(user: AdminCartUserApiResponse): AdminCartUser {
  return {
    userId: user.userId ?? '',
    userName: user.userName ?? '',
    userEmail: user.userEmail ?? '',
    userPhone: user.userPhone ?? 'Not provided',
    itemCount: typeof user.itemCount === 'number' ? user.itemCount : 0,
    totalAmount: typeof user.totalAmount === 'number' ? user.totalAmount : 0,
    lastUpdated: user.lastUpdated ?? '',
  }
}

function normalizeAdminCartItem(item: AdminUserCartItemApiResponse): AdminCartItem {
  return {
    productId: item?.productId ?? '',
    variantId: item?.variantId ?? '',
    variantName: item?.variant_name ?? '',
    sku: item?.sku ?? '',
    title: item?.title ?? '',
    price: toPrice(item?.price ?? 0),
    quantity: typeof item?.quantity === 'number' ? item.quantity : 1,
    thumbnail: item?.thumbnail || fallbackCartThumbnail,
    addedAt: item?.addedAt ?? '',
  }
}

function normalizeAdminCartUsersResponse(response: AdminCartUsersApiResponse): AdminCartUsersResult {
  const payload = response.data

  if (Array.isArray(payload)) {
    return {
      users: payload.map(normalizeAdminCartUser),
      pagination: null,
    }
  }

  return {
    users: (payload.data ?? []).map(normalizeAdminCartUser),
    pagination: payload.pagination ?? null,
  }
}

export async function getAdminCartUsers(params?: {
  page?: number
  limit?: number
  search?: string
}): Promise<AdminCartUsersResult> {
  const response = await adminApiClient.get<AdminCartUsersApiResponse>('/cart/admin/users', {
    params: {
      page: params?.page,
      limit: params?.limit,
      search: params?.search?.trim() || undefined,
    },
  })

  return normalizeAdminCartUsersResponse(response.data)
}

export async function getAdminUserCart(userId: string): Promise<AdminUserCart> {
  const response = await adminApiClient.get<AdminUserCartApiResponse>(`/cart/admin/user/${userId}`)
  const payload = response.data.data

  return {
    id: payload.id ?? '',
    createdAt: payload.createdAt ?? '',
    updatedAt: payload.updatedAt ?? '',
    items: (payload.items ?? []).map(normalizeAdminCartItem),
    isActive: Boolean(payload.isActive),
    userDetails: {
      userName: payload.userDetails?.userName ?? '',
      userEmail: payload.userDetails?.userEmail ?? '',
      userPhone: payload.userDetails?.userPhone ?? 'Not provided',
    },
  }
}