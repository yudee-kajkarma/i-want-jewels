import axios from 'axios'
import { clearStoredAuthSession, getStoredAuthSession } from '../utils/authStorage'

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

authApiClient.interceptors.request.use((config) => {
  const session = getStoredAuthSession()

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

function handleTokenExpiry(): void {
  clearStoredAuthSession()
  window.location.href = '/login'
}

function onResponseFulfilled(response: import('axios').AxiosResponse) {
  if (isTokenExpiredResponse(response.data)) {
    handleTokenExpiry()
  }
  return response
}

function onResponseRejected(error: unknown) {
  const axiosError = error as import('axios').AxiosError
  if (isTokenExpiredResponse(axiosError.response?.data)) {
    handleTokenExpiry()
  }
  return Promise.reject(error)
}

authApiClient.interceptors.response.use(onResponseFulfilled, onResponseRejected)
adminApiClient.interceptors.response.use(onResponseFulfilled, onResponseRejected)

export default apiClient