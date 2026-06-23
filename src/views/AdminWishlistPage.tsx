'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, RefreshCw, Heart, Users } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Pagination from '../components/sections/Pagination'
import { useCurrency } from '../context/CurrencyContext'
import { getAdminUserWishlist, getAdminWishlistUsers } from '../services/wishlistService'
import type { AdminUserWishlist, AdminWishlistUser, WishlistUsersPagination } from '../types/wishlist'
import { formatPrice } from '../utils/price'

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

export default function AdminWishlistPage() {
  const { currency } = useCurrency()
  const [users, setUsers] = useState<AdminWishlistUser[]>([])
  const [pagination, setPagination] = useState<WishlistUsersPagination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedWishlist, setSelectedWishlist] = useState<AdminUserWishlist | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isUsersLoading, setIsUsersLoading] = useState(true)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
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
          accumulator.totalValue += user.totalValue
          return accumulator
        },
        { userCount: 0, itemCount: 0, totalValue: 0 },
      ),
    [users],
  )

  async function loadUsers(page: number, search: string) {
    setIsUsersLoading(true)

    try {
      const response = await getAdminWishlistUsers({
        page,
        limit: 20,
        search,
      })

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
        await loadUserWishlist(nextSelectedUserId)
      } else {
        setSelectedWishlist(null)
      }
    } catch {
      setUsers([])
      setPagination(null)
      setSelectedUserId('')
      setSelectedWishlist(null)
      setError('Unable to load wishlist users right now.')
      toast.error('Unable to load wishlist users right now.')
    } finally {
      setIsUsersLoading(false)
    }
  }

  async function loadUserWishlist(userId: string) {
    setIsWishlistLoading(true)

    try {
      const response = await getAdminUserWishlist(userId)
      setSelectedWishlist(response)
      setSelectedUserId(userId)
    } catch {
      setSelectedWishlist(null)
      toast.error('Unable to load user wishlist details.')
    } finally {
      setIsWishlistLoading(false)
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
    <div className="font-poppins min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-zinc-900">
      <Header />

      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="border border-[#f1cde2] bg-white/90 p-6 shadow-[0_22px_62px_rgba(191,82,136,0.14)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf4f90]">Admin Wishlist</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-[#3f1933]">Wishlist Monitor</h1>
            </div>
            <button
              type="button"
              onClick={() => void loadUsers(currentPage, searchQuery)}
              className="inline-flex items-center gap-2 border border-[#e8c5db] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex h-12 flex-1 items-center gap-3 border border-[#e9c9dd] bg-white px-4 text-sm text-zinc-400">
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
                className="bg-[#cc4f8f] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78]"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleClearSearch}
                className="border border-[#e8c5db] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
              >
                Clear
              </button>
            </div>
          </form>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Users</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{summary.userCount}</p>
            </div>
            <div className="border border-[#f0d3e5] bg-[#fff9fd] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Wishlist Items</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{summary.itemCount}</p>
            </div>
            <div className="border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Combined Value</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{formatPrice(summary.totalValue, currency)}</p>
            </div>
          </div>

          {error ? <div className="mt-6 border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div> : null}

          <div className="mt-6 grid gap-6 xl:grid-cols-[430px_1fr]">
            <section className="border border-[#f0d7e7] bg-[#fffafd] p-4 shadow-[0_10px_30px_rgba(191,82,136,0.08)]">
              {isUsersLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="animate-pulse border border-[#f0d7e7] bg-white p-4">
                      <div className="h-3 w-28 bg-[#f2d7e7]" />
                      <div className="mt-3 h-4 w-40 bg-[#f4deeb]" />
                      <div className="mt-3 h-3 w-32 bg-[#f8e8f1]" />
                    </div>
                  ))}
                </div>
              ) : null}

              {!isUsersLoading && users.length === 0 ? (
                <div className="border border-dashed border-[#ebcade] bg-white px-5 py-10 text-center text-sm text-[#8a667b]">
                  No users found for this search.
                </div>
              ) : null}

              {!isUsersLoading && users.length > 0 ? (
                <div className="space-y-3">
                  {users.map((user) => (
                    <button
                      key={user.userId}
                      type="button"
                      onClick={() => void loadUserWishlist(user.userId)}
                      className={`w-full border p-4 text-left transition ${
                        selectedUserId === user.userId
                          ? 'border-[#cc4f8f] bg-[#fff0f8] shadow-[0_8px_24px_rgba(191,82,136,0.14)]'
                          : 'border-[#f0d7e7] bg-white hover:bg-[#fff7fb]'
                      }`}
                    >
                      <p className="text-sm font-bold text-[#3f1933]">{user.userName || 'Unknown user'}</p>
                      <p className="mt-1 text-xs text-zinc-500">{user.userEmail || '--'}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <span className="border border-[#f0d3e5] bg-[#fff9fd] px-3 py-1 font-semibold text-[#7c4564]">
                          {user.itemCount} items
                        </span>
                        <span className="border border-[#f0d3e5] bg-[#fff9fd] px-3 py-1 font-semibold text-[#7c4564]">
                          {formatPrice(user.totalValue, currency)}
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

            <section className="border border-[#f0d7e7] bg-white p-5 shadow-[0_10px_30px_rgba(191,82,136,0.08)]">
              {isWishlistLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-32 bg-[#f2d7e7]" />
                  <div className="h-8 w-2/3 bg-[#f4deeb]" />
                  <div className="h-24 bg-[#fbf1f7]" />
                  <div className="h-24 bg-[#fbf1f7]" />
                </div>
              ) : null}

              {!isWishlistLoading && !selectedWishlist ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center border border-dashed border-[#ecd0e1] bg-[#fff9fd] px-6 text-center">
                  <Users className="h-8 w-8 text-[#c36198]" />
                  <p className="mt-4 text-sm font-semibold text-[#5a2946]">Select a user to inspect their wishlist.</p>
                </div>
              ) : null}

              {!isWishlistLoading && selectedWishlist ? (
                <>
                  <div className="border border-[#edd3e2] bg-[#fff8fc] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">User Details</p>
                    <h2 className="mt-2 text-xl font-bold text-[#3f1933]">{selectedWishlist.userDetails.userName || 'Unknown user'}</h2>
                    <p className="mt-1 text-sm text-zinc-600">{selectedWishlist.userDetails.userEmail || '--'}</p>
                    <p className="mt-1 text-sm text-zinc-600">{selectedWishlist.userDetails.userPhone || 'Not provided'}</p>
                    <p className="mt-3 text-xs text-zinc-500">Last updated: {formatDate(selectedWishlist.updatedAt)}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#3f1933]">Wishlist Items</h3>
                    <span className="border border-[#ecd0e1] bg-[#fff8fc] px-3 py-1 text-xs font-semibold text-[#7b3f61]">
                      {selectedWishlist.items.length} items
                    </span>
                  </div>

                  {selectedWishlist.items.length === 0 ? (
                    <div className="mt-4 border border-dashed border-[#ecd0e1] bg-[#fff9fd] px-5 py-10 text-center text-sm text-[#8a667b]">
                      No items found in this wishlist.
                    </div>
                  ) : (
                    <div className="mt-4 space-y-3">
                      {selectedWishlist.items.map((item) => (
                        <article key={`${item.productId}-${item.addedAt}`} className="flex items-center gap-4 border border-[#f0d7e7] bg-[#fffdfd] p-3">
                          <div className="h-16 w-16 overflow-hidden border border-[#ecd0e1] bg-white">
                            {item.thumbnail ? (
                              <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[#c36198]">
                                <Heart className="h-4 w-4" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#3f1933]">{item.title || 'Untitled product'}</p>
                            <p className="mt-1 text-xs text-zinc-500">Product ID: {item.productId || '--'}</p>
                            <p className="mt-1 text-xs text-zinc-500">Added: {formatDate(item.addedAt)}</p>
                          </div>

                          <p className="text-sm font-bold text-[#7a2f5c]">{formatPrice(item.price, currency)}</p>
                        </article>
                      ))}
                    </div>
                  )}
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
