import apiClient from './apiClient'

export type Reel = {
  id: string
  url: string
}

type ReelsResponse = {
  success: boolean
  code: string
  message: string
  data?: Array<{
    id?: string
    _id?: string
    url?: string
  }>
}

export async function getReels(): Promise<Reel[]> {
  const response = await apiClient.get<ReelsResponse>('/reels')

  return (response.data.data ?? [])
    .map((item) => ({
      id: item.id ?? item._id ?? '',
      url: item.url ?? '',
    }))
    .filter((item) => item.id && item.url)
}
