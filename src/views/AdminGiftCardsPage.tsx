'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Gift, Search } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import {
  getAdminGiftCardsByPurchaser,
  type AdminGiftCardPagination,
  type AdminPurchaserGroup,
} from '../services/giftCardService'

function statusClass(status: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'bg-[#e6f4ec] text-[#1f7a4d]'
    case 'DEPLETED':
      return 'bg-[#f3eee9] text-[#7a6a5a]'
    case 'CANCELLED':
      return 'bg-[#fdeaea] text-[#b3261e]'
    default:
      return 'bg-[#fff4e5] text-[#9a6a1a]'
  }
}

export default function AdminGiftCardsPage() {
  const [purchasers, setPurchasers] = useState<AdminPurchaserGroup[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<AdminGiftCardPagination | null>(null)
  const limit = 20

  useEffect(() => {
    let active = true
    setStatus('loading')
    getAdminGiftCardsByPurchaser(page, limit, search || undefined)
      .then((result) => {
        if (!active) return
        setPurchasers(result.purchasers)
        setPagination(result.pagination)
        setStatus('ready')
      })
      .catch(() => active && setStatus('error'))
    return () => {
      active = false
    }
  }, [search, page])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-parsi">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Admin</p>
            <h1 className="mt-2 flex items-center gap-3 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">
              <Gift className="h-8 w-8 text-[#a53b79]" />
              Gift Cards
            </h1>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setPage(1)
            setSearch(searchInput.trim())
            }}
            className="flex items-center gap-2"
          >
            <div className="flex h-11 items-center border border-[#e7d3c2] px-3">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search recipient / order #"
                className="ml-2 w-56 bg-transparent text-sm outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-11 bg-[#17110d] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Search
            </button>
          </form>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          Codes are masked — only the first 6 characters are shown. Click a buyer to see the denominations they purchased.
        </p>

        <section className="mt-8 border border-[#eadfd4] bg-white shadow-[0_20px_60px_rgba(55,31,10,0.06)]">
          {status === 'loading' ? (
            <p className="p-8 text-sm text-zinc-500">Loading gift cards…</p>
          ) : status === 'error' ? (
            <p className="p-8 text-sm text-rose-600">Unable to load gift cards right now.</p>
          ) : purchasers.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
              <Gift className="h-10 w-10 text-zinc-300" />
              <p className="mt-4 text-base font-semibold text-zinc-700">No gift cards purchased yet</p>
              <p className="mt-1 text-sm text-zinc-400">No user has bought or redeemed a gift card so far.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#efe1d5]">
              {purchasers.map((group) => {
                const isOpen = expanded === group.purchaserUserId
                return (
                  <div key={group.purchaserUserId}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : group.purchaserUserId)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-[#fff6fb]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-[#17110d]">
                          {group.purchaserName || 'Unknown buyer'}
                        </p>
                        <p className="truncate text-sm text-zinc-500">{group.purchaserEmail || '—'}</p>
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">Cards</p>
                          <p className="text-base font-bold text-[#17110d]">{group.count}</p>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">Total spent</p>
                          <p className="text-base font-bold text-[#1f7a4d]">€{group.totalAmount.toFixed(2)}</p>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-zinc-400 transition ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </button>

                    {isOpen ? (
                      <div className="overflow-x-auto border-t border-[#efe1d5] bg-[#fffdfa] px-6 py-4">
                        <table className="w-full min-w-[760px] text-left text-sm">
                          <thead>
                            <tr className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                              <th className="py-2 pr-4">Code</th>
                              <th className="py-2 pr-4">Denomination</th>
                              <th className="py-2 pr-4">Balance</th>
                              <th className="py-2 pr-4">Status</th>
                              <th className="py-2 pr-4">Recipient</th>
                              <th className="py-2 pr-4">Order #</th>
                              <th className="py-2 pr-4">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.cards.map((card) => (
                              <tr key={card.id} className="border-t border-[#f0e5da]">
                                <td className="py-3 pr-4 font-semibold tracking-[1px] text-[#17110d]">
                                  {card.codeMasked}
                                </td>
                                <td className="py-3 pr-4">€{card.initialAmount.toFixed(2)}</td>
                                <td className="py-3 pr-4 text-[#1f7a4d]">€{card.balance.toFixed(2)}</td>
                                <td className="py-3 pr-4">
                                  <span
                                    className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${statusClass(
                                      card.status,
                                    )}`}
                                  >
                                    {card.status}
                                  </span>
                                </td>
                                <td className="py-3 pr-4 text-zinc-600">{card.recipientEmail || '—'}</td>
                                <td className="py-3 pr-4 text-zinc-600">{card.purchaseOrderNumber || '—'}</td>
                                <td className="py-3 pr-4 text-zinc-500">
                                  {new Date(card.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {pagination && pagination.totalPages > 1 ? (
          <div className="mt-6 flex items-center justify-between text-sm text-zinc-500">
            <p>{pagination.totalRecords} total purchasers · Page {pagination.currentPage} of {pagination.totalPages}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((p) => p - 1)}
                className="border border-[#e7d3c2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#17110d] transition hover:bg-[#fff6fb] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
                className="border border-[#e7d3c2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#17110d] transition hover:bg-[#fff6fb] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
