import { authApiClient } from './apiClient'

/**
 * Personal discount codes at checkout: the thank-you code emailed after an
 * order, or one the shop sent. Checked here as the customer types it; the
 * order checks it again when it is placed (backend src/routes/discountRoutes.ts).
 */

export type CouponCheck = { valid: true; percent: number; code: string } | { valid: false; reason?: string }

type ApiEnvelope<T> = { success?: boolean; data?: T }

/** `email`: a guest's checkout email (a signed-in customer's account email is used instead). */
export async function validateCoupon(code: string, email?: string): Promise<CouponCheck> {
  const response = await authApiClient.post<ApiEnvelope<CouponCheck>>('/coupons/validate', {
    code,
    ...(email ? { email } : {}),
  })
  return response.data.data ?? { valid: false }
}

/** What a code takes off, as the order will: its percentage of the items (gift cards excluded), in whole units. */
export const couponDiscountOf = (itemsTotal: number, percent: number) => Math.max(0, Math.round((itemsTotal * percent) / 100))

export type ThankYouOffer = { enabled: boolean; percent?: number; validDays?: number }

let offer: { at: number; value: Promise<ThankYouOffer> } | null = null

/**
 * Whether orders earn a thank-you code (Admin → Discounts), for the note on
 * product pages and in the bag. Asked once a minute at most; nothing shows if
 * it can't be asked.
 */
export function thankYouOffer(): Promise<ThankYouOffer> {
  if (!offer || Date.now() - offer.at > 60_000) {
    offer = {
      at: Date.now(),
      value: authApiClient
        .get<ApiEnvelope<ThankYouOffer>>('/coupons/thank-you')
        .then((response) => response.data.data ?? { enabled: false })
        .catch(() => ({ enabled: false })),
    }
  }
  return offer.value
}
