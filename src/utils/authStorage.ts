import type { AuthSession } from '../types/auth'

const authStorageKey = 'iwj-auth-session'
const pendingOtpEmailKey = 'iwj-pending-otp-email'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function getStoredRole(session: Partial<AuthSession>): 'USER' | 'ADMIN' {
  if (session.role === 'ADMIN') {
    return 'ADMIN'
  }

  const raw = session.raw

  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return 'USER'
  }

  const rawRecord = raw as Record<string, unknown>
  const userRecord = rawRecord.user

  if (userRecord && typeof userRecord === 'object' && !Array.isArray(userRecord)) {
    return (userRecord as Record<string, unknown>).role === 'ADMIN' ? 'ADMIN' : 'USER'
  }

  return rawRecord.role === 'ADMIN' ? 'ADMIN' : 'USER'
}

export function getStoredAuthSession(): AuthSession | null {
  if (!isBrowser()) {
    return null
  }

  const rawValue = window.localStorage.getItem(authStorageKey)

  if (!rawValue) {
    return null
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<AuthSession>

    if (!parsedValue.email || !parsedValue.username) {
      window.localStorage.removeItem(authStorageKey)
      return null
    }

    return {
      email: parsedValue.email,
      username: parsedValue.username,
      firstName: parsedValue.firstName ?? '',
      lastName: parsedValue.lastName ?? '',
      role: getStoredRole(parsedValue),
      token: parsedValue.token,
      isVerified: typeof parsedValue.isVerified === 'boolean' ? parsedValue.isVerified : true,
      raw: parsedValue.raw,
    }
  } catch {
    window.localStorage.removeItem(authStorageKey)
    return null
  }
}

export function storeAuthSession(session: AuthSession): void {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(authStorageKey, JSON.stringify(session))
}

export function clearStoredAuthSession(): void {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(authStorageKey)
}

export function getPendingOtpEmail(): string {
  if (!isBrowser()) {
    return ''
  }

  return window.localStorage.getItem(pendingOtpEmailKey) ?? ''
}

export function setPendingOtpEmail(email: string): void {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(pendingOtpEmailKey, email)
}

export function clearPendingOtpEmail(): void {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(pendingOtpEmailKey)
}