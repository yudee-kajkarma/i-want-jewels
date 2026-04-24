import type { BlogDetail, BlogListItem, BlogPagination, BlogsResult } from '../types/blog'
import apiClient from './apiClient'

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

export type GetBlogsParams = {
  page?: number
  limit?: number
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
  const blog = response.data.data

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
    status: blog.status,
  }
}
