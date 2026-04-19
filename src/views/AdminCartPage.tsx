'use client'

import { useEffect, useMemo, useState } from 'react'
import { RefreshCw, Search, ShoppingBag, Users } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Pagination from '../components/sections/Pagination'
import { useCurrency } from '../context/CurrencyContext'
import { getAdminCartUsers, getAdminUserCart } from '../services/cartService'
import type { AdminCartUser, AdminUserCart, CartUsersPagination } from '../types/cart'
import { formatPrice, getPriceAmount } from '../utils/price'

function formatDate(value: string): string {
  if (!value) {
    return '--'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function AdminCartPage() {
  const { currency } = useCurrency()
  const [users, setUsers] = useState<AdminCartUser[]>([])
  const [pagination, setPagination] = useState<CartUsersPagination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedCart, setSelectedCart] = useState<AdminUserCart | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isUsersLoading, setIsUsersLoading] = useState(true)
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    void loadUsers(1, searchQuery)
  }, [searchQuery])

  const summary = useMemo(
    () =>
      users.reduce(
        (accumulator, user) => {
          accumulator.userCount += 1
          accumulator.itemCount += user.itemCount
          accumulator.totalAmount += user.totalAmount
          return accumulator
        },
        { userCount: 0, itemCount: 0, totalAmount: 0 },
      ),
    [users],
  )

  async function loadUsers(page: number, search: string) {
    setIsUsersLoading(true)

    try {
      const response = await getAdminCartUsers({ page, limit: 20, search })

      setUsers(response.users)
      setPagination(response.pagination)
      setCurrentPage(page)
      setError('')

      const nextSelectedUserId =
        selectedUserId && response.users.some((user) => user.userId === selectedUserId)
          ? selectedUserId
          : response.users[0]?.userId ?? ''

      setSelectedUserId(nextSelectedUserId)

      if (nextSelectedUserId) {
        await loadUserCart(nextSelectedUserId)
      } else {
        setSelectedCart(null)
      }
    } catch {
      setUsers([])
      setPagination(null)
      setSelectedUserId('')
      setSelectedCart(null)
      setError('Unable to load cart users right now.')
      toast.error('Unable to load cart users right now.')
    } finally {
      setIsUsersLoading(false)
    }
  }

  async function loadUserCart(userId: string) {
    setIsCartLoading(true)

    try {
      const response = await getAdminUserCart(userId)
      setSelectedCart(response)
      setSelectedUserId(userId)
    } catch {
      setSelectedCart(null)
      toast.error('Unable to load user cart details.')
    } finally {
      setIsCartLoading(false)
    }
  }

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchQuery(searchInput.trim())
    setCurrentPage(1)
  }

  function handleClearSearch() {
    setSearchInput('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-zinc-900">
      <Header />

      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="rounded-[34px] border border-[#f1cde2] bg-white/90 p-6 shadow-[0_22px_62px_rgba(191,82,136,0.14)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf4f90]">Admin Cart</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-[#3f1933]">Cart Monitor</h1>
            </div>
            <button
              type="button"
              onClick={() => void loadUsers(currentPage, searchQuery)}
              className="inline-flex items-center gap-2 rounded-full border border-[#e8c5db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex h-12 flex-1 items-center gap-3 rounded-2xl border border-[#e9c9dd] bg-white px-4 text-sm text-zinc-400">
              <Search className="h-4 w-4" />
              <input
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search by user name or email"
                className="w-full border-0 bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-[#cc4f8f] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78]"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClearSearch}
                className="rounded-full border border-[#e8c5db] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
              >
                Clear
              </button>
            </div>
          </form>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Users</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{summary.userCount}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff9fd] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Cart Items</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{summary.itemCount}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Combined Total</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{formatPrice(summary.totalAmount, currency)}</p>
            </div>
          </div>

          {error ? <div className="mt-6 rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div> : null}

          <div className="mt-6 grid gap-6 xl:grid-cols-[430px_1fr]">
            <section className="rounded-[28px] border border-[#f0d7e7] bg-[#fffafd] p-4 shadow-[0_10px_30px_rgba(191,82,136,0.08)]">
              {isUsersLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="animate-pulse rounded-2xl border border-[#f0d7e7] bg-white p-4">
                      <div className="h-3 w-28 rounded-full bg-[#f2d7e7]" />
                      <div className="mt-3 h-4 w-40 rounded-full bg-[#f4deeb]" />
                      <div className="mt-3 h-3 w-32 rounded-full bg-[#f8e8f1]" />
                    </div>
                  ))}
                </div>
              ) : null}

              {!isUsersLoading && users.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-[#ebcade] bg-white px-5 py-10 text-center text-sm text-[#8a667b]">
                  No users found for this search.
                </div>
              ) : null}

              {!isUsersLoading && users.length > 0 ? (
                <div className="space-y-3">
                  {users.map((user) => (
                    <button
                      key={user.userId}
                      type="button"
                      onClick={() => void loadUserCart(user.userId)}
                      className={`w-full rounded-[20px] border p-4 text-left transition ${
                        selectedUserId === user.userId
                          ? 'border-[#cc4f8f] bg-[#fff0f8] shadow-[0_8px_24px_rgba(191,82,136,0.14)]'
                          : 'border-[#f0d7e7] bg-white hover:bg-[#fff7fb]'
                      }`}
                    >
                      <p className="text-sm font-bold text-[#3f1933]">{user.userName || 'Unknown user'}</p>
                      <p className="mt-1 text-xs text-zinc-500">{user.userEmail || '--'}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full border border-[#f0d3e5] bg-[#fff9fd] px-3 py-1 font-semibold text-[#7c4564]">
                          {user.itemCount} items
                        </span>
                        <span className="rounded-full border border-[#f0d3e5] bg-[#fff9fd] px-3 py-1 font-semibold text-[#7c4564]">
                          {formatPrice(user.totalAmount, currency)}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] text-zinc-500">Updated: {formatDate(user.lastUpdated)}</p>
                    </button>
                  ))}
                </div>
              ) : null}

              {pagination ? (
                <div className="mt-5 border-t border-[#f1d8e8] pt-4">
                  <Pagination
                    pagination={pagination}
                    currentItemCount={users.length}
                    onPageChange={(page) => void loadUsers(page, searchQuery)}
                  />
                </div>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-[#f0d7e7] bg-white p-5 shadow-[0_10px_30px_rgba(191,82,136,0.08)]">
              {isCartLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-32 rounded-full bg-[#f2d7e7]" />
                  <div className="h-8 w-2/3 rounded-full bg-[#f4deeb]" />
                  <div className="h-24 rounded-[20px] bg-[#fbf1f7]" />
                  <div className="h-24 rounded-[20px] bg-[#fbf1f7]" />
                </div>
              ) : null}

              {!isCartLoading && !selectedCart ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#ecd0e1] bg-[#fff9fd] px-6 text-center">
                  <Users className="h-8 w-8 text-[#c36198]" />
                  <p className="mt-4 text-sm font-semibold text-[#5a2946]">Select a user to inspect their cart.</p>
                </div>
              ) : null}

              {!isCartLoading && selectedCart ? (
                <>
                  <div className="rounded-[22px] border border-[#edd3e2] bg-[#fff8fc] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">User Details</p>
                    <h2 className="mt-2 text-xl font-bold text-[#3f1933]">{selectedCart.userDetails.userName || 'Unknown user'}</h2>
                    <p className="mt-1 text-sm text-zinc-600">{selectedCart.userDetails.userEmail || '--'}</p>
                    <p className="mt-1 text-sm text-zinc-600">{selectedCart.userDetails.userPhone || 'Not provided'}</p>
                    <p className="mt-3 text-xs text-zinc-500">Last updated: {formatDate(selectedCart.updatedAt)}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#3f1933]">Cart Items</h3>
                    <span className="rounded-full border border-[#ecd0e1] bg-[#fff8fc] px-3 py-1 text-xs font-semibold text-[#7b3f61]">
                      {selectedCart.items.length} items
                    </span>
                  </div>

                  {selectedCart.items.length === 0 ? (
                    <div className="mt-4 rounded-[22px] border border-dashed border-[#ecd0e1] bg-[#fff9fd] px-5 py-10 text-center text-sm text-[#8a667b]">
                      No items found in this cart.
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {selectedCart.items.map((item) => (
                        <article
                          key={`${item.productId}-${item.variantId}-${item.addedAt}`}
                          className="flex items-center gap-4 rounded-[20px] border border-[#f0d7e7] bg-[#fffdfd] p-3"
                        >
                          <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[#ecd0e1] bg-white">
                            <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#3f1933]">{item.title || 'Untitled product'}</p>
                            <p className="mt-1 text-xs text-zinc-500">SKU: {item.sku || '--'}</p>
                            <p className="mt-1 text-xs text-zinc-500">Variant: {item.variantName || '--'}</p>
                            <p className="mt-1 text-xs text-zinc-500">Added: {formatDate(item.addedAt)}</p>
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-medium text-zinc-500">Qty: {item.quantity}</p>
                            <p className="mt-1 text-sm font-bold text-[#7a2f5c]">{formatPrice(item.price, currency)}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 rounded-[20px] border border-[#edd3e2] bg-[#fff8fc] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Cart Total</p>
                    <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">
                      {formatPrice(selectedCart.items.reduce((total, item) => total + getPriceAmount(item.price, currency) * item.quantity, 0), currency)}
                    </p>
                  </div>
                </>
              ) : null}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
