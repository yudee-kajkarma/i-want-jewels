import axios from 'axios'
import { toast } from 'react-hot-toast'
import { clearStoredAuthSession, getStoredAuthSession, isJwtExpired } from '../utils/authStorage'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const apiClient = axios.create({
  baseURL: apiBaseUrl,
})

export const authApiClient = axios.create({
  baseURL: apiBaseUrl,
})

export const adminApiClient = axios.create({
  baseURL: apiBaseUrl,
})

let sessionExpiryHandledAt = 0

// Clear the session, tell the user, and send them to login. Parallel requests
// can all fail at once — only the first failure within a short window acts.
function handleSessionExpiry(): void {
  if (typeof window === 'undefined') {
    return
  }

  const now = Date.now()
  if (now - sessionExpiryHandledAt < 5000) {
    return
  }
  sessionExpiryHandledAt = now

  clearStoredAuthSession()
  toast.error('Your session has expired. You have been logged out.')
  // Give the toast a moment to render before leaving the page.
  window.setTimeout(() => {
    window.location.href = '/login'
  }, 1200)
}

authApiClient.interceptors.request.use((config) => {
  const session = getStoredAuthSession()

  // Catch expiry BEFORE the request leaves, so mid-work actions (e.g. saving
  // a product edit) fail fast with a clear logout instead of a server error.
  if (session?.token && isJwtExpired(session.token)) {
    handleSessionExpiry()
    return Promise.reject(new Error('Session expired'))
  }

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }

  return config
})

adminApiClient.interceptors.request.use((config) => {
  const session = getStoredAuthSession()

  if (!session || session.role !== 'ADMIN') {
    return Promise.reject(new Error('Admin access required'))
  }

  if (session.token && isJwtExpired(session.token)) {
    handleSessionExpiry()
    return Promise.reject(new Error('Session expired'))
  }

  if (session.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }

  return config
})

function isTokenExpiredResponse(data: unknown): boolean {
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>
    return d.success === false && d.message === 'Token expired'
  }
  return false
}

function onResponseFulfilled(response: import('axios').AxiosResponse) {
  if (isTokenExpiredResponse(response.data)) {
    handleSessionExpiry()
  }
  return response
}

function onResponseRejected(error: unknown) {
  const axiosError = error as import('axios').AxiosError
  // Any 401 on an authenticated client means the token is no longer accepted
  // ("Token expired", "Invalid token", "Authentication failed", ...).
  if (axiosError.response?.status === 401) {
    handleSessionExpiry()
  }
  return Promise.reject(error)
}

authApiClient.interceptors.response.use(onResponseFulfilled, onResponseRejected)
adminApiClient.interceptors.response.use(onResponseFulfilled, onResponseRejected)

export default apiClient
