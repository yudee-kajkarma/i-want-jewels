import { adminApiClient } from './apiClient'

/**
 * Admin → Discounts: price-range discounts, the thank-you code sent after
 * every paid order, and the discount codes themselves. Backend routes in
 * src/routes/discountRoutes.ts.
 */

type ApiEnvelope<T> = { success?: boolean; data?: T; message?: string; error?: { code?: string; message?: string } }

function unwrap<T>(body: ApiEnvelope<T>, fallback: string): T {
  if (body?.success === false || body?.data === undefined) throw new Error(body?.error?.message || body?.message || fallback)
  return body.data
}

export type RuleState = 'active' | 'scheduled' | 'ended' | 'off'

export type PriceRangeRule = {
  id?: string
  minPrice: number
  maxPrice: number
  percent: number
  active: boolean
  startsAt?: string | null
  endsAt?: string | null
  state?: RuleState
}

export type ThankYouSettings = { enabled: boolean; percent: number; validDays: number }

export type DiscountSettings = {
  rules: PriceRangeRule[]
  thankYou: ThankYouSettings
  updatedAt?: string
  updatedBy?: string
}

export const CODE_FILTERS = ['all', 'active', 'used', 'expired', 'revoked'] as const
export type CodeFilter = (typeof CODE_FILTERS)[number]
export type CodeStatus = Exclude<CodeFilter, 'all'>

export type DiscountCode = {
  id: string
  code: string
  email: string
  percent: number
  status: CodeStatus
  source: 'order' | 'admin'
  expiresAt: string
  createdAt: string
  earnedOrderNumber?: string
  usedOrderNumber?: string
  usedAt?: string
  usedDiscount?: number
  lastSentAt?: string
  note?: string
}

export type DiscountCodePage = { rows: DiscountCode[]; total: number; page: number; pageSize: number }

export async function getDiscountSettings(): Promise<DiscountSettings> {
  const response = await adminApiClient.get<ApiEnvelope<DiscountSettings>>('/admin/discounts')
  return unwrap(response.data, 'Unable to load the discounts.')
}

export async function saveDiscountRules(rules: PriceRangeRule[]): Promise<DiscountSettings> {
  const body = {
    rules: rules.map(({ minPrice, maxPrice, percent, active, startsAt, endsAt }) => ({
      minPrice,
      maxPrice,
      percent,
      active,
      startsAt: startsAt || null,
      endsAt: endsAt || null,
    })),
  }
  const response = await adminApiClient.put<ApiEnvelope<DiscountSettings>>('/admin/discounts/rules', body)
  return unwrap(response.data, 'Unable to save the discounts.')
}

export async function saveThankYouSettings(settings: ThankYouSettings): Promise<DiscountSettings> {
  const response = await adminApiClient.put<ApiEnvelope<DiscountSettings>>('/admin/discounts/thank-you', settings)
  return unwrap(response.data, 'Unable to save the thank-you code settings.')
}

export async function listDiscountCodes(query: { q?: string; show?: CodeFilter; page?: number }): Promise<DiscountCodePage> {
  const params: Record<string, string | number> = {}
  if (query.q?.trim()) params.q = query.q.trim()
  if (query.show && query.show !== 'all') params.show = query.show
  if (query.page && query.page > 1) params.page = query.page
  const response = await adminApiClient.get<ApiEnvelope<DiscountCodePage>>('/admin/discounts/codes', { params })
  return unwrap(response.data, 'Unable to load the discount codes.')
}

export async function createDiscountCode(input: { email: string; percent: number; validDays: number; note?: string }): Promise<{ coupon: DiscountCode; sent: boolean }> {
  const response = await adminApiClient.post<ApiEnvelope<{ coupon: DiscountCode; sent: boolean }>>('/admin/discounts/codes', input)
  return unwrap(response.data, 'Unable to make the code.')
}

export async function resendDiscountCode(id: string): Promise<{ coupon: DiscountCode; sent: boolean }> {
  const response = await adminApiClient.post<ApiEnvelope<{ coupon: DiscountCode; sent: boolean }>>(`/admin/discounts/codes/${encodeURIComponent(id)}/resend`, {})
  return unwrap(response.data, 'Unable to send the code.')
}

export async function revokeDiscountCode(id: string): Promise<DiscountCode> {
  const response = await adminApiClient.post<ApiEnvelope<DiscountCode>>(`/admin/discounts/codes/${encodeURIComponent(id)}/revoke`, {})
  return unwrap(response.data, 'Unable to revoke the code.')
}

/** The server's error message for a failed request, when it sent one. */
export function discountErrorMessage(error: unknown, fallback: string): string {
  const body = (error as { response?: { data?: ApiEnvelope<unknown> } })?.response?.data
  return body?.error?.message || body?.message || fallback
}
