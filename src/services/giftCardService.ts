import { adminApiClient, authApiClient } from './apiClient'

export type GiftCardRedemption = {
  orderId: string
  orderNumber: string
  amount: number
  redeemedAt: string
}

export type MyGiftCard = {
  id: string
  code: string
  initialAmount: number
  balance: number
  currency: string
  status: 'PENDING_PAYMENT' | 'ACTIVE' | 'DEPLETED' | 'CANCELLED'
  expiresAt: string | null
  senderName?: string
  recipientName?: string
  message?: string
  recipientEmail?: string
  currentOwnerEmail?: string
  purchaseOrderNumber?: string
  redemptions: GiftCardRedemption[]
  createdAt: string
}

export type GiftCardValidation = {
  valid: boolean
  reason?: string
  balance?: number
  redeemableAmount?: number
  currency?: string
  code?: string
}

type MineApiResponse = {
  success: boolean
  data: MyGiftCard[]
}

type ValidateApiResponse = {
  success: boolean
  message: string
  data: GiftCardValidation
}

type TransferApiResponse = {
  success: boolean
  message: string
  data: MyGiftCard
}

export type RecipientSuggestion = {
  email: string
  name?: string
}

type RecipientSearchApiResponse = {
  success: boolean
  data: RecipientSuggestion[]
}

export async function searchRecipientEmails(query: string): Promise<RecipientSuggestion[]> {
  const response = await authApiClient.get<RecipientSearchApiResponse>('/users/recipient-search', {
    params: { q: query },
  })
  return response.data.data ?? []
}

export async function getMyGiftCards(): Promise<MyGiftCard[]> {
  const response = await authApiClient.get<MineApiResponse>('/gift-cards/mine')
  return response.data.data ?? []
}

export async function getTransferredGiftCards(): Promise<MyGiftCard[]> {
  const response = await authApiClient.get<MineApiResponse>('/gift-cards/transferred')
  return response.data.data ?? []
}

export async function validateGiftCard(code: string): Promise<GiftCardValidation> {
  const response = await authApiClient.get<ValidateApiResponse>(
    `/gift-cards/${encodeURIComponent(code)}/validate`,
  )
  return response.data.data
}

export async function transferGiftCard(
  code: string,
  payload: { recipientEmail: string; recipientName?: string; message?: string },
): Promise<MyGiftCard> {
  const response = await authApiClient.post<TransferApiResponse>(
    `/gift-cards/${encodeURIComponent(code)}/transfer`,
    payload,
  )
  return response.data.data
}

// ── Admin ────────────────────────────────────────────────────────────────────

export type AdminGiftCard = {
  id: string
  codeMasked: string
  initialAmount: number
  balance: number
  currency: string
  status: 'PENDING_PAYMENT' | 'ACTIVE' | 'DEPLETED' | 'CANCELLED'
  senderName?: string
  recipientName?: string
  recipientEmail?: string
  currentOwnerEmail?: string
  purchaseOrderNumber?: string
  redemptionsCount: number
  createdAt: string
}

export type AdminPurchaserGroup = {
  purchaserUserId: string
  purchaserName: string
  purchaserEmail: string
  count: number
  totalAmount: number
  lastPurchaseAt: string
  cards: AdminGiftCard[]
}

export type AdminGiftCardPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

type AdminByPurchaserApiResponse = {
  success: boolean
  data: AdminPurchaserGroup[]
  pagination: AdminGiftCardPagination
}

export async function getAdminGiftCardsByPurchaser(
  page = 1,
  limit = 20,
  search?: string,
): Promise<{ purchasers: AdminPurchaserGroup[]; pagination: AdminGiftCardPagination | null }> {
  const response = await adminApiClient.get<AdminByPurchaserApiResponse>('/gift-cards/admin/by-purchaser', {
    params: { page, limit, ...(search ? { search } : {}) },
  })
  return {
    purchasers: response.data.data ?? [],
    pagination: response.data.pagination ?? null,
  }
}
