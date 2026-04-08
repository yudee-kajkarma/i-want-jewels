import type { CartRestoreSnapshot, PendingOrderStatus, SingleCheckoutDraft } from '../types/order'

const singleCheckoutDraftKey = 'iwj-single-checkout-draft'
const cartRestoreSnapshotKey = 'iwj-cart-restore-snapshot'
const pendingOrderStatusKey = 'iwj-pending-order-status'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function getSessionStorage(): Storage | null {
  if (!isBrowser()) {
    return null
  }

  return window.sessionStorage
}

function readValue<T>(key: string): T | null {
  const storage = getSessionStorage()

  if (!storage) {
    return null
  }

  const rawValue = storage.getItem(key)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as T
  } catch {
    storage.removeItem(key)
    return null
  }
}

function writeValue<T>(key: string, value: T): void {
  const storage = getSessionStorage()

  if (!storage) {
    return
  }

  storage.setItem(key, JSON.stringify(value))
}

function removeValue(key: string): void {
  const storage = getSessionStorage()

  if (!storage) {
    return
  }

  storage.removeItem(key)
}

export function getSingleCheckoutDraft(): SingleCheckoutDraft | null {
  return readValue<SingleCheckoutDraft>(singleCheckoutDraftKey)
}

export function setSingleCheckoutDraft(draft: SingleCheckoutDraft): void {
  writeValue(singleCheckoutDraftKey, draft)
}

export function clearSingleCheckoutDraft(): void {
  removeValue(singleCheckoutDraftKey)
}

export function getCartRestoreSnapshot(): CartRestoreSnapshot | null {
  return readValue<CartRestoreSnapshot>(cartRestoreSnapshotKey)
}

export function setCartRestoreSnapshot(snapshot: CartRestoreSnapshot): void {
  writeValue(cartRestoreSnapshotKey, snapshot)
}

export function clearCartRestoreSnapshot(): void {
  removeValue(cartRestoreSnapshotKey)
}

export function getPendingOrderStatus(): PendingOrderStatus | null {
  return readValue<PendingOrderStatus>(pendingOrderStatusKey)
}

export function setPendingOrderStatus(status: PendingOrderStatus): void {
  writeValue(pendingOrderStatusKey, status)
}

export function clearPendingOrderStatus(): void {
  removeValue(pendingOrderStatusKey)
}