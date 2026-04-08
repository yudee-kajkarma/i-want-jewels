export type WishlistItem = {
  id: string
  productId: string
  slug: string
  title: string
  category: string
  thumbnail: string
  price: number
  rating: number
  reviewsCount: number
}

export type Wishlist = {
  id: string
  createdAt: string
  updatedAt: string
  items: WishlistItem[]
  isActive: boolean
}

export type WishlistUsersPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type AdminWishlistUser = {
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  itemCount: number
  totalValue: number
  lastUpdated: string
}

export type AdminWishlistUsersResult = {
  users: AdminWishlistUser[]
  pagination: WishlistUsersPagination | null
}

export type AdminWishlistUserDetails = {
  userName: string
  userEmail: string
  userPhone: string
}

export type AdminWishlistItem = {
  productId: string
  title: string
  price: number
  thumbnail: string
  addedAt: string
}

export type AdminUserWishlist = {
  id: string
  createdAt: string
  updatedAt: string
  items: AdminWishlistItem[]
  isActive: boolean
  userDetails: AdminWishlistUserDetails
}

export type AddToWishlistPayload = {
  productId: string
}