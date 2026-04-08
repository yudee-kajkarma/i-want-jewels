import axios from 'axios'
import { getStoredAuthSession } from '../utils/authStorage'

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

export default apiClient