import type { Price } from '../utils/price'

export type GiftCardDetails = {
  recipientEmail?: string
  recipientName?: string
  senderName?: string
  message?: string
}

export type CartItem = {
  id: string
  productId: string
  variantId: string
  title: string
  variantTitle: string
  thumbnail: string
  price: Price
  /** In a discount range (Admin → Discounts): the struck "was" price beside `price`, which is what's charged. */
  compareAtPrice?: Price
  discountPercent?: number
  quantity: number
  isGiftCard?: boolean
  giftCard?: GiftCardDetails
  size?: number
  sizeMeasurement?: string
}

export type Cart = {
  id: string
  createdAt: string
  updatedAt: string
  items: CartItem[]
  isActive: boolean
}

export type CartUsersPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type AdminCartUser = {
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  itemCount: number
  totalAmount: number
  lastUpdated: string
}

export type AdminCartUsersResult = {
  users: AdminCartUser[]
  pagination: CartUsersPagination | null
}

export type AdminCartUserDetails = {
  userName: string
  userEmail: string
  userPhone: string
}

export type AdminCartItem = {
  productId: string
  variantId: string
  variantName: string
  sku: string
  title: string
  price: Price
  quantity: number
  thumbnail: string
  addedAt: string
}

export type AdminUserCart = {
  id: string
  createdAt: string
  updatedAt: string
  items: AdminCartItem[]
  isActive: boolean
  userDetails: AdminCartUserDetails
}

export type AddToCartPayload = {
  productId: string
  quantity: number
  variantId: string
  giftCard?: GiftCardDetails
  size?: number
}