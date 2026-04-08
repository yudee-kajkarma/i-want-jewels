'use client'

import { Eye, Pencil, Plus, SlidersHorizontal, Trash2 } from 'lucide-react'
import { Link } from '@/lib/router'
import type { Product, ProductsPagination } from '../../types/product'
import { formatPrice } from './adminProductHelpers'

type AdminProductsTableProps = {
  isLoading: boolean
  isDeleting: string | null
  products: Product[]
  pagination: ProductsPagination | null
  onOpenFilters: () => void
  onAddNew: () => void
  onRefresh: () => void
  onPageChange: (page: number) => void
  onEdit: (productId: string) => void
  onDelete: (product: Product) => void
}

export default function AdminProductsTable({
  isLoading,
  isDeleting,
  products,
  pagination,
  onOpenFilters,
  onAddNew,
  onRefresh,
  onPageChange,
  onEdit,
  onDelete,
}: AdminProductsTableProps) {
  const currentPage = pagination?.currentPage ?? 1
  const totalPages = pagination?.totalPages ?? 1

  const getPageWindow = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const pageWindow = getPageWindow()

  return (
    <section className="mt-8 flex h-[720px] flex-col overflow-hidden rounded-[28px] border border-[#f0d7e7] bg-white shadow-[0_20px_60px_rgba(145,48,107,0.10)]">
      <div className="flex items-center justify-between border-b border-[#f3e1ec] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-[#3f1933]">All Products</h2>
          <p className="mt-1 text-sm text-zinc-500">Fixed-height table with sticky heading and wider data view.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenFilters}
            className="inline-flex items-center gap-2 rounded-full border border-[#e8c5db] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-[#fff2fa]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex items-center gap-2 rounded-full bg-[#cc4f8f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ad3f78]"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
          <button
            type="button"
            onClick={onRefresh}
            className="rounded-full border border-[#e8c5db] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-[#fff2fa]"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="min-w-[1180px] w-full divide-y divide-[#f2e3ec] text-sm">
          <thead className="bg-[#fff6fb] text-left text-xs font-bold uppercase tracking-[0.12em] text-[#8f4a73]">
            <tr>
              <th className="sticky top-0 z-10 bg-[#fff6fb] px-6 py-4">Product</th>
              <th className="sticky top-0 z-10 bg-[#fff6fb] px-4 py-4">Vendor</th>
              <th className="sticky top-0 z-10 bg-[#fff6fb] px-4 py-4">Category</th>
              <th className="sticky top-0 z-10 bg-[#fff6fb] px-4 py-4">Price</th>
              <th className="sticky top-0 z-10 bg-[#fff6fb] px-4 py-4">Status</th>
              <th className="sticky top-0 z-10 bg-[#fff6fb] px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f6e8f0]">
            {isLoading ? (
              Array.from({ length: 6 }, (_, rowIndex) => (
                <tr key={`loading-row-${rowIndex}`} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-[#f4d7e8]" />
                      <div className="space-y-2">
                        <div className="h-3 w-36 rounded-full bg-[#f1cee2]" />
                        <div className="h-3 w-56 rounded-full bg-[#f6e2ed]" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-3 w-24 rounded-full bg-[#f6e2ed]" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-3 w-24 rounded-full bg-[#f6e2ed]" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-3 w-20 rounded-full bg-[#f1cee2]" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-7 w-24 rounded-full bg-[#f4d7e8]" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-20 rounded-full bg-[#f6e2ed]" />
                      <div className="h-8 w-20 rounded-full bg-[#f6e2ed]" />
                      <div className="h-8 w-20 rounded-full bg-[#f1cee2]" />
                    </div>
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-zinc-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="align-top hover:bg-[#fff6fb]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 overflow-hidden rounded-2xl border border-[#efd9e8] bg-[#fff4fb]">
                        {product.primaryImage ? (
                          <img src={product.primaryImage} alt={product.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.1em] text-[#a66388]">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#3f1933]">{product.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-zinc-700">{product.vendor || 'N/A'}</td>
                  <td className="px-4 py-4 text-zinc-700">{product.category || 'N/A'}</td>
                  <td className="px-4 py-4 font-medium text-[#6c2e53]">{formatPrice(product.minPrice)}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        product.availability ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {product.availability ? 'Available' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/products/slug/${product.slug || product.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#e8c5db] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
                        aria-label={`Open ${product.title}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Open
                      </Link>
                      <button
                        type="button"
                        onClick={() => onEdit(product.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#e8c5db] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
                        aria-label={`Edit ${product.title}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(product)}
                        disabled={isDeleting === product.id}
                        className="inline-flex items-center gap-2 rounded-full bg-[#cc4f8f] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
                        aria-label={`Delete ${product.title}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {isDeleting === product.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 ? (
        <div className="border-t border-[#f3e1ec] px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              Page <span className="font-semibold text-[#5f2748]">{pagination.currentPage}</span> of{' '}
              <span className="font-semibold text-[#5f2748]">{pagination.totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isLoading || !pagination.hasPrevPage}
                className="rounded-full border border-[#e8c5db] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Prev
              </button>

              {pageWindow.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => onPageChange(pageNumber)}
                  disabled={isLoading || pageNumber === currentPage}
                  className={`h-8 min-w-8 rounded-full px-2 text-xs font-bold transition ${
                    pageNumber === currentPage
                      ? 'bg-[#cc4f8f] text-white'
                      : 'border border-[#e8c5db] text-[#7a3a61] hover:bg-[#fff2fa]'
                  } disabled:cursor-not-allowed`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLoading || !pagination.hasNextPage}
                className="rounded-full border border-[#e8c5db] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}