'use client'

import { useEffect, useMemo, useState } from 'react'
import { FileSpreadsheet, Plus, Search, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useNavigate } from '@/lib/router'
import AdminProductFilterModal from '../components/admin/AdminProductFilterModal'
import AdminProductsTable from '../components/admin/AdminProductsTable'
import {
  defaultFilters,
  type AdminFilters,
} from '../components/admin/adminProductHelpers'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useCurrency } from '../context/CurrencyContext'
import { getCurrencyIsoCode } from '../utils/price'
import {
  deleteProduct,
  getAllProductFilters,
  getAllProductsForAdmin,
} from '../services/productService'
import type {
  Product,
  ProductAllFilters,
  ProductsPagination,
} from '../types/product'

export default function AdminProductsPage() {
  const navigate = useNavigate()
  const { currency } = useCurrency()
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<ProductsPagination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [filterOptions, setFilterOptions] = useState<ProductAllFilters | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<AdminFilters>(defaultFilters)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [productPendingDelete, setProductPendingDelete] = useState<Product | null>(null)

  useEffect(() => {
    void initializePage()
  }, [])

  function showOperationError(message: string) {
    setError(message)
    toast.error(message)
  }

  function showOperationSuccess(message: string) {
    setError('')
    toast.success(message)
  }

  async function initializePage() {
    setIsLoading(true)
    setError('')

    try {
      const [productsResponse, filterOptionsResponse] = await Promise.all([
        getAllProductsForAdmin({ page: 1, limit: recordsPerPage }),
        getAllProductFilters(),
      ])

      setProducts(productsResponse.products)
      setPagination(productsResponse.pagination)
      setCurrentPage(productsResponse.pagination.currentPage)
      setRecordsPerPage(productsResponse.pagination.recordsPerPage)
      setFilterOptions(filterOptionsResponse)
    } catch {
      setError('Unable to load products right now.')
    } finally {
      setIsLoading(false)
    }
  }

  function buildServerFilters(currentFilters: AdminFilters) {
    return {
      category: currentFilters.category || undefined,
      stoneType: currentFilters.stoneType || undefined,
      color: currentFilters.color || undefined,
      shape: currentFilters.shape || undefined,
      origin: currentFilters.origin || undefined,
      treatment: currentFilters.treatment || undefined,
      certificate: currentFilters.certificate || undefined,
      measurement: currentFilters.measurement || undefined,
      vendor: currentFilters.vendor || undefined,
      tags: currentFilters.tags || undefined,
      metal: currentFilters.metal || undefined,
      priceMin: currentFilters.priceMin || undefined,
      priceMax: currentFilters.priceMax || undefined,
      carat: currentFilters.carat || undefined,
      availability: currentFilters.availability === 'all' ? undefined : currentFilters.availability,
      currency: getCurrencyIsoCode(currency),
    }
  }

  async function loadProducts(
    currentFilters: AdminFilters = filters,
    page: number = currentPage,
    search: string = searchTerm,
  ) {
    setIsLoading(true)
    setError('')

    try {
      const response = await getAllProductsForAdmin({
        ...buildServerFilters(currentFilters),
        search: search.trim() || undefined,
        page,
        limit: recordsPerPage,
      })
      setProducts(response.products)
      setPagination(response.pagination)
      setCurrentPage(response.pagination.currentPage)
      setRecordsPerPage(response.pagination.recordsPerPage)
    } catch {
      setError('Unable to load products right now.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleFilterChange<Key extends keyof AdminFilters>(key: Key, value: AdminFilters[Key]) {
    setFilters((currentValue) => ({ ...currentValue, [key]: value }))
  }

  async function handleSearch() {
    await loadProducts(filters, 1, searchTerm)
  }

  async function handleClearSearch() {
    setSearchTerm('')
    await loadProducts(filters, 1, '')
  }

  async function handleApplyFilters() {
    await loadProducts(filters, 1)
    setIsFilterOpen(false)
  }

  async function handleResetFilters() {
    setFilters(defaultFilters)
    await loadProducts(defaultFilters, 1)
    setIsFilterOpen(false)
  }

  async function handlePageChange(page: number) {
    if (isLoading || page === currentPage || (pagination && (page < 1 || page > pagination.totalPages))) {
      return
    }

    await loadProducts(filters, page)
  }

  function handleAddNew() {
    navigate('/admin/products/new')
  }

  function handleEdit(productId: string) {
    navigate(`/admin/products/${productId}/edit`)
  }

  function handleDeleteRequest(product: Product) {
    setProductPendingDelete(product)
  }

  function handleCloseDeleteModal() {
    if (isDeleting) {
      return
    }

    setProductPendingDelete(null)
  }

  async function handleConfirmDelete() {
    if (!productPendingDelete) {
      return
    }

    setIsDeleting(productPendingDelete.id)
    setError('')

    try {
      await deleteProduct(productPendingDelete.id)
      const shouldGoPreviousPage = products.length === 1 && currentPage > 1
      await loadProducts(filters, shouldGoPreviousPage ? currentPage - 1 : currentPage)
      setProductPendingDelete(null)
      showOperationSuccess('Product deleted successfully.')
    } catch {
      showOperationError('Unable to delete this product right now.')
    } finally {
      setIsDeleting(null)
    }
  }

  const visibleProducts = useMemo(() => products, [products])

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-[#2b1323] font-parsi">
      <Header />
      <main>
        <div className="mx-auto max-w-[92rem] px-4 py-8 sm:px-6 lg:px-8">
          <div className="border border-[#f0cbe1] bg-[linear-gradient(135deg,#7e2f63_0%,#b94886_55%,#dc74ad_100%)] px-6 py-8 text-white shadow-[0_30px_80px_rgba(153,45,106,0.28)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f6d6ea]">Admin Panel</p>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-serif text-3xl text-[#fff6fd] sm:text-4xl">Product Management</h1>
                <p className="mt-3 max-w-2xl text-sm text-[#f7deee] sm:text-base">
                  Review the full catalog, add new products, edit product content, and remove obsolete products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products/import')}
                  className="inline-flex items-center gap-2 border border-[#f6d6ea] bg-white/15 px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#fff4fc] transition hover:bg-white/25"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Import File
                </button>
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="inline-flex items-center gap-2 bg-[#ffe4f2] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7b235c] transition hover:bg-[#ffd2e9]"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </button>
                <div className="border border-[#e9b7d6] bg-white/10 px-5 py-4 text-sm text-[#ffeaf6]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#ffd7ec]">Showing Results</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{pagination?.totalRecords ?? visibleProducts.length}</p>
                </div>
              </div>
            </div>
          </div>

          {error ? <p className="mt-6 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b76499]" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    void handleSearch()
                  }
                }}
                placeholder="Search by SKU, title, vendor, category..."
                className="w-full border border-[#e9b7d6] bg-white py-3 pl-11 pr-10 text-sm text-[#2b1323] outline-none transition placeholder:text-[#b58aa6] focus:border-[#cc4f8f] focus:ring-2 focus:ring-[#f2c4de]"
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => void handleClearSearch()}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b76499] transition hover:text-[#7b235c]"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => void handleSearch()}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 bg-[#cc4f8f] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          <AdminProductsTable
            isLoading={isLoading}
            isDeleting={isDeleting}
            products={visibleProducts}
            onOpenFilters={() => setIsFilterOpen(true)}
            onAddNew={handleAddNew}
            onRefresh={() => void loadProducts(filters, currentPage)}
            pagination={pagination}
            onPageChange={(page) => void handlePageChange(page)}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        </div>
      </main>

      <AdminProductFilterModal
        isOpen={isFilterOpen}
        filters={filters}
        filterOptions={filterOptions}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        onReset={() => void handleResetFilters()}
        onApply={() => void handleApplyFilters()}
      />

      {productPendingDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f0d25]/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl border border-[#f1cde2] bg-white p-6 shadow-[0_30px_80px_rgba(127,31,91,0.32)]">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#a3477c]">Delete Product</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#3f1933]">Delete this product?</h2>
            <p className="mt-3 text-sm text-zinc-600">
              You are about to permanently delete <span className="font-semibold text-[#3f1933]">{productPendingDelete.title}</span>.
              This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                disabled={Boolean(isDeleting)}
                className="border border-[#e8c5db] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleConfirmDelete()}
                disabled={Boolean(isDeleting)}
                className="bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-60"
              >
                {isDeleting ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}
