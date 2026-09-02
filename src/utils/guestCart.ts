/**
 * Guest cart identity.
 *
 * A guest cart is a real cart document on the server; the browser only holds
 * its id. That keeps guest baskets durable across refreshes and lets the admin
 * see them, while the id itself is harmless — the API only reuses a cart that
 * has no owner, and ignores this header entirely once someone is signed in.
 */
const STORAGE_KEY = 'iwj_guest_cart_id'

export function getGuestCartId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // Private browsing can throw on access — treat it as "no cart yet".
    return null
  }
}

export function setGuestCartId(cartId: string): void {
  if (typeof window === 'undefined' || !cartId) return
  try {
    window.localStorage.setItem(STORAGE_KEY, cartId)
  } catch {
    // Nothing to do: the shopper simply gets a fresh cart next request.
  }
}

/** Called after checkout, and after a guest cart is merged into an account. */
export function clearGuestCartId(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore — a stale id is rejected server-side anyway.
  }
}
