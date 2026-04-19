import apiClient from './apiClient'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

type ContactApiResponse = {
  success: boolean
  code: string
  message: string
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactApiResponse> {
  const response = await apiClient.post<ContactApiResponse>('/contact', payload)

  return response.data
}
