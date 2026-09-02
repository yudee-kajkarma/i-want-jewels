'use client'

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Mail, Phone, MapPinHouse, ShoppingCart, User, X } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useCurrency } from '../context/CurrencyContext'
import {
    getAdminCustomerDetail,
    getAdminCustomers,
    type AdminCustomerDetail,
    type AdminCustomerSummary,
} from '../services/userService'
import { formatDateTime } from '../utils/formatDate'
import { getCountryName, getStateName, normalizeDialCode } from '../utils/location'
import { formatPrice, isoToCurrencyCode } from '../utils/price'

const PAGE_SIZE = 20

export default function AdminCustomersPage() {
    const { currency } = useCurrency()
    const currencyCode = isoToCurrencyCode(currency) ?? 'eur'

    const [customers, setCustomers] = useState<AdminCustomerSummary[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)
    // Total with no search applied, so a filtered view can say "3 of 12".
    const [allCustomersTotal, setAllCustomersTotal] = useState<number | null>(null)
    const [appliedSearch, setAppliedSearch] = useState('')
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const [selected, setSelected] = useState<AdminCustomerDetail | null>(null)
    const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null)

    const load = useCallback(async (nextPage: number, query: string) => {
        setIsLoading(true)
        setError('')
        try {
            const result = await getAdminCustomers(nextPage, PAGE_SIZE, query)
            setCustomers(result.customers)
            setTotalPages(result.pagination?.totalPages ?? 1)
            const total = result.pagination?.totalRecords ?? result.customers.length
            setTotalRecords(total)
            setAppliedSearch(query.trim())
            if (!query.trim()) setAllCustomersTotal(total)
        } catch {
            setCustomers([])
            setError('Could not load customers. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        void load(page, search)
        // Search is applied on submit, not on every keystroke.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    async function openCustomer(id: string) {
        setLoadingDetailId(id)
        try {
            const detail = await getAdminCustomerDetail(id)
            if (!detail) {
                toast.error('Customer not found')
                return
            }
            setSelected(detail)
        } catch {
            toast.error('Could not load that customer')
        } finally {
            setLoadingDetailId(null)
        }
    }

    return (
        <div className="min-h-screen bg-[#fffaf5]">
            <Header />

            <main className="mx-auto w-full max-w-7xl px-4 py-10">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-[#17110d]">Customers</h1>
                        <p className="mt-1 text-sm text-[#6b5a4e]">
                            {appliedSearch
                                ? `${totalRecords} matching “${appliedSearch}”${allCustomersTotal !== null ? ` of ${allCustomersTotal}` : ''}`
                                : `${totalRecords} registered ${totalRecords === 1 ? 'customer' : 'customers'} — newest first`}
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setPage(1)
                            void load(1, search)
                        }}
                        className="flex gap-2"
                    >
                        <input
                            value={search}
                            onChange={(e) => {
                                const next = e.target.value
                                setSearch(next)
                                // Emptying the box restores the full list without
                                // needing a second click on Search.
                                if (!next.trim() && appliedSearch) {
                                    setPage(1)
                                    void load(1, '')
                                }
                            }}
                            placeholder="Search name, username, email or phone"
                            className="h-11 w-64 border border-[#e5d7cc] bg-white px-3 text-sm outline-none focus:border-[#17110d]"
                        />
                        <button
                            type="submit"
                            className="h-11 bg-[#17110d] px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {error ? (
                    <p className="mt-6 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
                ) : null}

                <div className="mt-6 overflow-x-auto border border-[#efe1d5] bg-white">
                    <table className="w-full min-w-[640px] text-left text-sm">
                        <thead className="bg-[#fdf6ee] text-[11px] uppercase tracking-[0.08em] text-[#8b7361]">
                            <tr>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Signed up</th>
                                <th className="hidden px-4 py-3 lg:table-cell">Via</th>
                                <th className="sticky right-0 bg-[#fdf6ee] px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f3e8dd]">
                            {isLoading ? (
                                <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-400">Loading…</td></tr>
                            ) : customers.length === 0 ? (
                                <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-400">No customers found.</td></tr>
                            ) : (
                                customers.map((c) => (
                                    <tr key={c.id} className="hover:bg-[#fffaf5]">
                                        <td className="px-4 py-3 font-medium text-[#17110d]">
                                            {[c.firstName, c.lastName].filter(Boolean).join(' ') || c.username}
                                            {/* Search also matches usernames, so showing it here explains
                                                results that would otherwise look unrelated to the query. */}
                                            {c.username && [c.firstName, c.lastName].filter(Boolean).length > 0 ? (
                                                <span className="block text-[11px] font-normal text-[#a08a78]">@{c.username}</span>
                                            ) : null}
                                        </td>
                                        <td className="px-4 py-3 text-[#6b5a4e]">{c.email}</td>
                                        <td className="px-4 py-3 font-mono text-xs text-[#6b5a4e]">
                                            {c.phoneNumber
                                                ? `${normalizeDialCode(c.countryCode) || c.countryCode} ${c.phoneNumber}`.trim()
                                                : '—'}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-[#6b5a4e]">
                                            {c.createdAt ? formatDateTime(c.createdAt, 'en') : '—'}
                                        </td>
                                        <td className="hidden px-4 py-3 text-xs uppercase tracking-[0.06em] text-[#8b7361] lg:table-cell">
                                            {c.authProvider}
                                        </td>
                                        <td className="sticky right-0 bg-white px-4 py-3 text-right">
                                            <button
                                                type="button"
                                                onClick={() => void openCustomer(c.id)}
                                                disabled={loadingDetailId !== null}
                                                className="border border-[#8f2a60] px-3 py-1.5 text-xs font-semibold text-[#8f2a60] transition hover:bg-[#8f2a60] hover:text-white disabled:opacity-60"
                                            >
                                                {loadingDetailId === c.id ? 'Opening…' : 'View'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 ? (
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <button
                            type="button"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="border border-[#e5d7cc] px-4 py-2 text-xs font-semibold disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <span className="text-xs text-[#6b5a4e]">Page {page} of {totalPages}</span>
                        <button
                            type="button"
                            disabled={page >= totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            className="border border-[#e5d7cc] px-4 py-2 text-xs font-semibold disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                ) : null}
            </main>

            {selected ? (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4">
                    <div className="mt-10 w-full max-w-3xl border border-[#efe1d5] bg-white">
                        <div className="flex items-center justify-between border-b border-[#efe1d5] bg-[#fdf6ee] px-5 py-3">
                            <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]">
                                <User className="h-4 w-4" />
                                {[selected.customer.firstName, selected.customer.lastName].filter(Boolean).join(' ') || selected.customer.username}
                            </p>
                            <button type="button" onClick={() => setSelected(null)} aria-label="Close">
                                <X className="h-5 w-5 text-[#6b5a4e]" />
                            </button>
                        </div>

                        <div className="space-y-5 px-5 py-4">
                            <div className="grid gap-2 text-sm text-[#6b5a4e] sm:grid-cols-2">
                                <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4" />{selected.customer.email}</p>
                                <p className="inline-flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {selected.customer.phoneNumber
                                        ? `${normalizeDialCode(selected.customer.countryCode) || selected.customer.countryCode} ${selected.customer.phoneNumber}`.trim()
                                        : 'No phone number'}
                                </p>
                            </div>

                            <section>
                                <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]">
                                    <MapPinHouse className="h-4 w-4" />Addresses
                                </p>
                                {selected.addresses.length === 0 ? (
                                    <p className="mt-2 text-sm text-zinc-400">No address saved.</p>
                                ) : (
                                    <div className="mt-2 space-y-2">
                                        {selected.addresses.map((a, i) => (
                                            <div key={a.id ?? i} className="border border-[#efe1d5] bg-[#fffdfa] px-3 py-2 text-sm text-[#6b5a4e]">
                                                {a.isDefault ? (
                                                    <span className="mb-1 inline-block bg-[#f3e8dd] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#8b7361]">Default</span>
                                                ) : null}
                                                <p>{a.street}{a.houseNumber ? ` ${a.houseNumber}` : ''}</p>
                                                <p>{a.city}, {getStateName(a.country, a.state)} {a.postalCode}</p>
                                                <p>{getCountryName(a.country)}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <section>
                                <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]">
                                    <ShoppingCart className="h-4 w-4" />
                                    Current cart
                                    {selected.cart.itemCount > 0 ? (
                                        <span className="text-xs font-normal text-[#6b5a4e]">
                                            — {selected.cart.itemCount} item{selected.cart.itemCount === 1 ? '' : 's'}, {formatPrice(selected.cart.totalValue, currencyCode)}
                                        </span>
                                    ) : null}
                                </p>

                                {selected.cart.items.length === 0 ? (
                                    <p className="mt-2 text-sm text-zinc-400">Cart is empty.</p>
                                ) : (
                                    <div className="mt-2 space-y-2">
                                        {selected.cart.items.map((item, i) => (
                                            <div key={`${item.variantId}-${i}`} className="flex items-center gap-3 border border-[#efe1d5] bg-[#fffdfa] p-2">
                                                {item.thumbnail ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={item.thumbnail} alt="" className="h-12 w-12 object-cover" />
                                                ) : null}
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-[#17110d]">{item.title}</p>
                                                    <p className="text-xs text-[#6b5a4e]">
                                                        {item.variantName}
                                                        {item.size !== undefined ? ` · Size ${item.size}` : ''} · Qty {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-semibold text-[#17110d]">
                                                    {formatPrice(item.price * item.quantity, currencyCode)}
                                                </p>
                                            </div>
                                        ))}
                                        {selected.cart.updatedAt ? (
                                            <p className="text-[11px] text-zinc-400">
                                                Last updated {formatDateTime(selected.cart.updatedAt, 'en')}
                                            </p>
                                        ) : null}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            ) : null}

            <Footer />
        </div>
    )
}
