import type {
  AdminBlogListItem,
  AdminBlogsResult,
  BlogCreatePayload,
  BlogDetail,
  BlogListItem,
  BlogPagination,
  BlogStatus,
  BlogUpdatePayload,
  BlogsResult,
} from '../types/blog'
import apiClient, { adminApiClient } from './apiClient'

type BlogListApiItem = {
  _id?: string
  id?: string
  title?: string
  slug?: string
  excerpt?: string
  coverImage?: string
  tags?: string[]
  publishedAt?: string
  views?: number
}

type AdminBlogListApiItem = {
  id?: string
  _id?: string
  title?: string
  slug?: string
  status?: string
  views?: number
  author?: string
  publishedAt?: string
  updatedAt?: string
}

type BlogsListResponse = {
  success: boolean
  data: BlogListApiItem[]
  pagination: BlogPagination
}

type BlogDetailResponse = {
  success: boolean
  data: {
    id?: string
    _id?: string
    title?: string
    slug?: string
    content?: string
    excerpt?: string
    coverImage?: string
    tags?: string[]
    publishedAt?: string
    views?: number
    seo?: {
      metaTitle?: string
      metaDescription?: string
    }
    relatedProducts?: Array<{
      id?: string
      _id?: string
      title?: string
      slug?: string
      price?: number
      thumbnail?: string
    }>
    author?: {
      id?: string
      _id?: string
      name?: string
    }
    createdAt?: string
    updatedAt?: string
    status?: string
  }
}

type AdminBlogsListResponse = {
  success: boolean
  data: AdminBlogListApiItem[]
  pagination: BlogPagination
}

type BlogWriteResponse = {
  success: boolean
  data?: {
    id?: string
    _id?: string
    status?: string
  }
}

type BlogImageUploadResponse = {
  success: boolean
  url?: string
  imageUrl?: string
  location?: string
  data?:
    | {
        url?: string
        imageUrl?: string
        location?: string
      }
    | string
}

export type GetBlogsParams = {
  page?: number
  limit?: number
}

export type GetAdminBlogsParams = {
  page?: number
  limit?: number
  status?: 'draft' | 'published'
}

function normalizeBlogListItem(item: BlogListApiItem): BlogListItem {
  return {
    id: item._id ?? item.id ?? '',
    title: item.title ?? '',
    slug: item.slug ?? '',
    excerpt: item.excerpt ?? '',
    coverImage: item.coverImage ?? '',
    tags: item.tags ?? [],
    publishedAt: item.publishedAt ?? '',
    views: item.views ?? 0,
  }
}

function normalizeBlogStatus(status: string | undefined): BlogStatus {
  return status?.trim().toLowerCase() === 'published' ? 'published' : 'draft'
}

function normalizeAdminBlogListItem(item: AdminBlogListApiItem): AdminBlogListItem {
  return {
    id: item.id ?? item._id ?? '',
    title: item.title ?? '',
    slug: item.slug ?? '',
    status: normalizeBlogStatus(item.status),
    views: item.views ?? 0,
    author: item.author ?? '--',
    publishedAt: item.publishedAt ?? '',
    updatedAt: item.updatedAt ?? '',
  }
}

export async function getBlogs(params: GetBlogsParams = {}): Promise<BlogsResult> {
  const response = await apiClient.get<BlogsListResponse>('/blogs', {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  })

  return {
    blogs: (response.data.data ?? []).map(normalizeBlogListItem),
    pagination: response.data.pagination,
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDetail> {
  const response = await apiClient.get<BlogDetailResponse>(`/blogs/${slug}`)

  return normalizeBlogDetail(response.data.data)
}

export async function getAdminBlogBySlug(slug: string): Promise<BlogDetail> {
  const response = await adminApiClient.get<BlogDetailResponse>(`/blogs/${slug}`)

  return normalizeBlogDetail(response.data.data)
}

function normalizeBlogDetail(blog: BlogDetailResponse['data']): BlogDetail {

  return {
    id: blog.id ?? blog._id ?? '',
    title: blog.title ?? '',
    slug: blog.slug ?? '',
    content: blog.content ?? '',
    excerpt: blog.excerpt ?? '',
    coverImage: blog.coverImage ?? '',
    tags: blog.tags ?? [],
    publishedAt: blog.publishedAt ?? '',
    views: blog.views ?? 0,
    seo: {
      metaTitle: blog.seo?.metaTitle ?? '',
      metaDescription: blog.seo?.metaDescription ?? '',
    },
    relatedProducts: (blog.relatedProducts ?? []).map((relatedProduct) => ({
      id: relatedProduct.id ?? relatedProduct._id ?? '',
      title: relatedProduct.title ?? '',
      slug: relatedProduct.slug ?? '',
      price: relatedProduct.price ?? 0,
      thumbnail: relatedProduct.thumbnail ?? '',
    })),
    author: blog.author
      ? {
          id: blog.author.id ?? blog.author._id ?? '',
          name: blog.author.name ?? '',
        }
      : undefined,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    status: normalizeBlogStatus(blog.status),
  }
}

export async function getAdminBlogs(params: GetAdminBlogsParams = {}): Promise<AdminBlogsResult> {
  const response = await adminApiClient.get<AdminBlogsListResponse>('/blogs/admin/all', {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      status: params.status,
    },
  })

  return {
    blogs: (response.data.data ?? []).map(normalizeAdminBlogListItem),
    pagination: response.data.pagination,
  }
}

export async function uploadBlogImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  const response = await adminApiClient.post<BlogImageUploadResponse>('/blogs/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  const rootLevelUrl = response.data.url ?? response.data.imageUrl ?? response.data.location

  if (rootLevelUrl) {
    return rootLevelUrl
  }

  const payload = response.data.data

  if (typeof payload === 'string' && payload.trim()) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    const possibleUrl = payload.url ?? payload.imageUrl ?? payload.location

    if (possibleUrl) {
      return possibleUrl
    }
  }

  throw new Error('Invalid image upload response')
}

export async function createAdminBlog(payload: BlogCreatePayload): Promise<void> {
  await adminApiClient.post<BlogWriteResponse>('/blogs', payload)
}

export async function updateAdminBlog(blogId: string, payload: BlogUpdatePayload): Promise<void> {
  await adminApiClient.put<BlogWriteResponse>(`/blogs/${blogId}`, payload)
}

export async function toggleAdminBlogStatus(blogId: string): Promise<BlogStatus> {
  const response = await adminApiClient.patch<BlogWriteResponse>(`/blogs/${blogId}/toggle-status`)

  return normalizeBlogStatus(response.data.data?.status)
}

export async function deleteAdminBlog(blogId: string): Promise<void> {
  await adminApiClient.delete(`/blogs/${blogId}`)
}
