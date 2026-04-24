export type BlogPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

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
  status?: string
}

export type BlogsResult = {
  blogs: BlogListItem[]
  pagination: BlogPagination
}
