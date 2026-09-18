import { getStoredAuthSession } from '../utils/authStorage'
import type { Order } from '../types/order'

export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || 'yk04k8t5l5'
export type ClarityEvent = 'product_viewed' | 'product_searched' | 'search_no_results' | 'out_of_stock' | 'add_to_cart' | 'remove_from_cart' | 'cart_quantity_updated' | 'cart_cleared' | 'cart_viewed' | 'checkout_started' | 'address_saved' | 'gift_card_applied' | 'gift_card_failed' | 'gift_card_removed' | 'order_created' | 'checkout_failed' | 'payment_started' | 'payment_retry_started' | 'payment_cancelled' | 'payment_failed' | 'purchase_completed'
type ClarityTags = { customer_type: 'guest' | 'signed_in'; checkout_source: 'cart' | 'buy_now'; payment_method: 'online' | 'cod'; gift_card_failure_reason: 'not_allowed' | 'rejected' | 'request_failed' | 'none' }
declare global { interface Window { clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] } } }

function canTrack(): boolean {
  return typeof window !== 'undefined' && getStoredAuthSession()?.role !== 'ADMIN' && !/\/(admin|login|register|forgot-password|reset-password|verify-otp)(\/|$)/.test(window.location.pathname)
}

/** Shared queue and loader. Never grants consent or renders UI. */
export function initializeClarity(): boolean {
  try {
    if (!canTrack() || !/^[a-z0-9]+$/i.test(CLARITY_PROJECT_ID)) return false
    if (!window.clarity) {
      const queued = (...args: unknown[]) => { queued.q.push(args) }
      queued.q = [] as unknown[][]
      window.clarity = queued
      window.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' })
    }
    if (!document.querySelector('script[src*="clarity.ms/tag/"]')) {
      const script = document.createElement('script')
      script.id = 'iwj-clarity-script'
      script.async = true
      script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
      document.head.appendChild(script)
    }
    return true
  } catch { return false }
}

export function trackClarity(event: ClarityEvent): boolean {
  try {
    if (!initializeClarity()) return false
    window.clarity?.('event', event)
    return true
  } catch { return false }
}

export function tagClarity<K extends keyof ClarityTags>(key: K, value: ClarityTags[K]) {
  try { if (initializeClarity()) window.clarity?.('set', key, value) } catch { /* Shopping continues. */ }
}

export function trackOrderPayment(order: Order) {
  if (order.paymentMethod !== 'ONLINE') return
  const status = order.paymentStatus.toLowerCase()
  const event = status === 'paid' ? 'purchase_completed' : status === 'failed' ? 'payment_failed' : null
  if (!event || typeof window === 'undefined') return
  const key = `iwj-clarity-${event}-${order.id}-${event === 'payment_failed' ? order.sessionId || '' : ''}`
  // Local order IDs support deduplication; they are not sent to Clarity.
  try {
    if (window.sessionStorage.getItem(key)) return
    if (trackClarity(event)) window.sessionStorage.setItem(key, '1')
  } catch { /* Storage restrictions must not break payment. */ }
}
