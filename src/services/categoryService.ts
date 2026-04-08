import apiClient from './apiClient'

type CategoriesApiResponse = {
  success: boolean
  code: string
  message: string
  data: string[]
}

export async function getCategories(): Promise<string[]> {
  const response = await apiClient.get<CategoriesApiResponse>('/products/categories')

  return response.data.data
}