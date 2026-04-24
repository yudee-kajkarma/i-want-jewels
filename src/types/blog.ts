export type BlogPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type BlogStatus = 'draft' | 'published'

export type BlogListItem = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  tags: string[]
  publishedAt: string
  views: number
}

export type BlogRelatedProduct = {
  id: string
  title: string
  slug: string
  price: number
  thumbnail: string
}

export type BlogSeo = {
  metaTitle: string
  metaDescription: string
}

export type BlogAuthor = {
  id: string
  name: string
}

export type BlogDetail = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string
  tags: string[]
  publishedAt: string
  views: number
  seo: BlogSeo
  relatedProducts: BlogRelatedProduct[]
  author?: BlogAuthor
  createdAt?: string
  updatedAt?: string
  status?: BlogStatus
}

export type BlogsResult = {
  blogs: BlogListItem[]
  pagination: BlogPagination
}

export type AdminBlogListItem = {
  id: string
  title: string
  slug: string
  status: BlogStatus
  views: number
  author: string
  publishedAt: string
  updatedAt: string
}

export type AdminBlogsResult = {
  blogs: AdminBlogListItem[]
  pagination: BlogPagination
}

export type BlogCreatePayload = {
  title: string
  content: string
  excerpt: string
  coverImage: string
  tags: string[]
  relatedProducts: string[]
  status: BlogStatus
  metaTitle: string
  metaDescription: string
}

export type BlogUpdatePayload = Partial<BlogCreatePayload>
