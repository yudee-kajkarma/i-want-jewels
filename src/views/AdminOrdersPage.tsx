'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Clock3, Truck, BadgeCheck, LayoutGrid, List, FileDown } from 'lucide-react'
import { Link } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import {
  getAdminOrderLabelUrl,
  getAdminShippingQuoteForOrder,
  getAllOrdersForAdmin,
  shipOrderForAdmin,
  updateOrderStatusForAdmin,
  verifyOrderDeliveryForAdmin,
} from '../services/orderService'
import { useCurrency } from '../context/CurrencyContext'
import type { AdminShippingQuote, AdminShippingRateOption, Order, OrdersPagination, ShippingCarrier } from '../types/order'
import { formatPrice } from '../utils/price'

type PendingActionType = 'confirm' | 'cancel' | 'ship' | 'verify'

type PendingAction = {
  type: PendingActionType
  order: Order
}

const recordsPerPageDefault = 20

function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function getOrderStatusClass(status: Order['orderStatus']) {
  switch (status) {
    case 'CONFIRMED':
    case 'DELIVERED':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'CANCELLED':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    case 'SHIPPED':
      return 'bg-sky-50 text-sky-700 border-sky-200'
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200'
  }
}

function getPaymentStatusClass(status: string) {
  switch (status.toUpperCase()) {
    case 'PAID':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'FAILED':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-zinc-100 text-zinc-700 border-zinc-200'
  }
}

function getActionLabel(type: PendingActionType) {
  if (type === 'confirm') {
    return 'Confirm Order'
  }

  if (type === 'cancel') {
    return 'Cancel Order'
  }

  if (type === 'ship') {
    return 'Ship Order'
  }

  return 'Verify Delivery'
}

function getActionDescription(type: PendingActionType) {
  if (type === 'confirm') {
    return 'This will move the order status to CONFIRMED.'
  }

  if (type === 'cancel') {
    return 'This will cancel the order and move status to CANCELLED.'
  }

  if (type === 'ship') {
    return 'This will move the order status to SHIPPED.'
  }

  return 'This will complete delivery and move the order status to DELIVERED.'
}

export default function AdminOrdersPage() {
  const { currency } = useCurrency()
  const [orders, setOrders] = useState<Order[]>([])
  const [pagination, setPagination] = useState<OrdersPagination | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null)
  const [isSubmittingAction, setIsSubmittingAction] = useState(false)
  const [shippingQuote, setShippingQuote] = useState<AdminShippingQuote | null>(null)
  const [shippingQuoteError, setShippingQuoteError] = useState('')
  const [isLoadingShippingQuote, setIsLoadingShippingQuote] = useState(false)
  const [selectedCarrier, setSelectedCarrier] = useState<ShippingCarrier>('FEDEX')
  const [selectedServiceCode, setSelectedServiceCode] = useState('')
  const [downloadingLabelOrderId, setDownloadingLabelOrderId] = useState('')

  useEffect(() => {
    void loadOrders(true, 1)
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadShippingQuote(orderId: string) {
      setIsLoadingShippingQuote(true)
      setShippingQuoteError('')
      setShippingQuote(null)
      setSelectedCarrier('FEDEX')
      setSelectedServiceCode('')

      try {
        const quote = await getAdminShippingQuoteForOrder(orderId)

        if (!isMounted) {
          return
        }

        setShippingQuote(quote)

        const defaultFedexService = quote?.rates.FEDEX[0]
        const defaultDhlService = quote?.rates.DHL[0]

        if (defaultFedexService) {
          setSelectedCarrier('FEDEX')
          setSelectedServiceCode(defaultFedexService.serviceCode)
        } else if (defaultDhlService) {
          setSelectedCarrier('DHL')
          setSelectedServiceCode(defaultDhlService.serviceCode)
        }
      } catch {
        if (!isMounted) {
          return
        }

        setShippingQuoteError('Unable to load shipping estimate right now.')
      } finally {
        if (isMounted) {
          setIsLoadingShippingQuote(false)
        }
      }
    }

    if (pendingAction?.type === 'ship') {
      void loadShippingQuote(pendingAction.order.id)
    }

    return () => {
      isMounted = false
    }
  }, [pendingAction])

  const orderCountLabel = useMemo(() => {
    const total = pagination?.totalRecords ?? orders.length
    return `${total} order${total === 1 ? '' : 's'}`
  }, [orders.length, pagination?.totalRecords])

  const orderSummary = useMemo(() => {
    return orders.reduce(
      (accumulator, order) => {
        if (order.orderStatus === 'PENDING') {
          accumulator.pending += 1
        }

        if (order.orderStatus === 'CONFIRMED') {
          accumulator.confirmed += 1
        }

        if (order.orderStatus === 'SHIPPED') {
          accumulator.shipped += 1
        }

        if (order.orderStatus === 'DELIVERED') {
          accumulator.delivered += 1
        }

        if (order.orderStatus === 'CANCELLED') {
          accumulator.cancelled += 1
        }

        return accumulator
      },
      {
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
      },
    )
  }, [orders])

  async function loadOrders(showLoader: boolean, page: number) {
    if (showLoader) {
      setIsLoading(true)
    }

    try {
      const response = await getAllOrdersForAdmin(page, 10)
      setOrders(response.orders)
      setPagination(response.pagination)
      setCurrentPage(page)
      setError('')
    } catch {
      const message = 'Unable to load all orders right now.'
      setOrders([])
      setPagination(null)
      setError(message)
      toast.error(message)
    } finally {
      if (showLoader) {
        setIsLoading(false)
      }
    }
  }

  function openActionModal(type: PendingActionType, order: Order) {
    setPendingAction({ type, order })
  }

  function closeActionModal() {
    if (isSubmittingAction) {
      return
    }

    setPendingAction(null)
    setShippingQuote(null)
    setShippingQuoteError('')
    setIsLoadingShippingQuote(false)
    setSelectedCarrier('FEDEX')
    setSelectedServiceCode('')
  }

  const selectedShippingRate = useMemo(() => {
    if (!shippingQuote || !selectedServiceCode) {
      return null
    }

    const ratesForCarrier = selectedCarrier === 'FEDEX' ? shippingQuote.rates.FEDEX : shippingQuote.rates.DHL
    return ratesForCarrier.find((rate) => rate.serviceCode === selectedServiceCode) ?? null
  }, [selectedCarrier, selectedServiceCode, shippingQuote])

  async function handleActionConfirm() {
    if (!pendingAction) {
      return
    }

    setIsSubmittingAction(true)

    try {
      if (pendingAction.type === 'confirm') {
        await updateOrderStatusForAdmin(pendingAction.order.id, 'CONFIRMED')
        toast.success(`Order ${pendingAction.order.orderNumber} confirmed.`)
      }

      if (pendingAction.type === 'cancel') {
        await updateOrderStatusForAdmin(pendingAction.order.id, 'CANCELLED')
        toast.success(`Order ${pendingAction.order.orderNumber} cancelled.`)
      }

      if (pendingAction.type === 'ship') {
        if (!selectedServiceCode) {
          toast.error('Please select a shipping service.')
          return
        }

        await shipOrderForAdmin(pendingAction.order.id, {
          carrier: selectedCarrier,
          serviceCode: selectedServiceCode,
        })
        toast.success(`Order ${pendingAction.order.orderNumber} marked as shipped.`)
      }

      if (pendingAction.type === 'verify') {
        await verifyOrderDeliveryForAdmin(pendingAction.order.id)
        toast.success(`Delivery verified for order ${pendingAction.order.orderNumber}.`)
      }

      setPendingAction(null)
      await loadOrders(false, currentPage)
    } catch {
      toast.error('Unable to complete this action. Please try again.')
    } finally {
      setIsSubmittingAction(false)
    }
  }

  async function handlePageChange(nextPage: number) {
    if (nextPage === currentPage || isLoading || isSubmittingAction) {
      return
    }

    await loadOrders(true, nextPage)
  }

  async function handleDownloadLabel(order: Order) {
    try {
      setDownloadingLabelOrderId(order.id)
      const presignedUrl = await getAdminOrderLabelUrl(order.id)

      if (!presignedUrl) {
        toast.error('Unable to generate label URL right now.')
        return
      }

      window.open(presignedUrl, '_blank', 'noopener,noreferrer')
      toast.success(`Label ready for ${order.orderNumber}.`)
    } catch {
      toast.error('Unable to download label right now.')
    } finally {
      setDownloadingLabelOrderId('')
    }
  }

  function getPageWindow() {
    const totalPages = pagination?.totalPages ?? 1

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

  function renderPaginationFooter(extraClassName = '') {
    if (!pagination) {
      return null
    }

    const pageWindow = getPageWindow()

    return (
      <div className={`border-t border-[#f3e1ec] px-4 py-4 sm:px-6 ${extraClassName}`.trim()}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-600">
            Page <span className="font-semibold text-[#5f2748]">{pagination.currentPage}</span> of{' '}
            <span className="font-semibold text-[#5f2748]">{pagination.totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                void handlePageChange(currentPage - 1)
              }}
              disabled={isLoading || isSubmittingAction || !pagination.hasPrevPage}
              className="rounded-full border border-[#e8c5db] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>

            {pageWindow.map((pageNumber) => (
              <button
                key={`orders-page-${pageNumber}`}
                type="button"
                onClick={() => {
                  void handlePageChange(pageNumber)
                }}
                disabled={isLoading || isSubmittingAction || pageNumber === currentPage}
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
              onClick={() => {
                void handlePageChange(currentPage + 1)
              }}
              disabled={isLoading || isSubmittingAction || !pagination.hasNextPage}
              className="rounded-full border border-[#e8c5db] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  function renderOrderActions(order: Order) {
    return (
      <div className="flex flex-wrap gap-2">
        {order.orderStatus === 'PENDING' ? (
          <>
            <button
              type="button"
              onClick={() => openActionModal('confirm', order)}
              className="rounded-full border border-[#de5aa1] bg-[#de5aa1] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#bf4f90]"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => openActionModal('cancel', order)}
              className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-rose-700 transition hover:bg-rose-100"
            >
              Cancel Order
            </button>
          </>
        ) : null}

        {order.orderStatus === 'CONFIRMED' ? (
          <button
            type="button"
            onClick={() => openActionModal('ship', order)}
            className="inline-flex items-center gap-1 rounded-full border border-[#d25595] bg-[#fff0f9] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#a43875] transition hover:bg-[#ffe0f2]"
          >
            <Truck className="h-3.5 w-3.5" />
            Ship
          </button>
        ) : null}

        {order.orderStatus === 'SHIPPED' ? (
          <>
            <button
              type="button"
              onClick={() => void handleDownloadLabel(order)}
              disabled={downloadingLabelOrderId === order.id}
              className="inline-flex items-center gap-1 rounded-full border border-[#b56a22] bg-[#fff6e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8f5119] transition hover:bg-[#ffebc8] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FileDown className="h-3.5 w-3.5" />
              {downloadingLabelOrderId === order.id ? 'Downloading...' : 'Download Label'}
            </button>
            <button
              type="button"
              onClick={() => openActionModal('verify', order)}
              className="rounded-full border border-[#ca4f8b] bg-[#fff3fb] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#9b336d] transition hover:bg-[#ffe6f5]"
            >
              Verify Delivery
            </button>
          </>
        ) : null}
      </div>
    )
  }

  function renderShimmerCard(shimmerId: number) {
    return (
      <article
        key={`shimmer-${shimmerId}`}
        className="overflow-hidden rounded-[24px] border border-[#f0d7e7] bg-white p-5 shadow-[0_6px_18px_rgba(191,82,136,0.08)]"
      >
        <div className="animate-pulse">
          <div className="h-3 w-32 rounded-full bg-[#f4d9e9]" />
          <div className="mt-3 h-5 w-56 rounded-full bg-[#f1d0e3]" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="rounded-[18px] border border-[#f0dbe8] bg-[#fffbfe] p-3">
                <div className="h-20 rounded-[14px] bg-[#f6deec]" />
                <div className="mt-2 h-3 w-4/5 rounded-full bg-[#f2d4e6]" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-[#f2d4e6]" />
              </div>
            ))}
          </div>
          <div className="mt-4 h-10 rounded-xl bg-[#f5ddea]" />
        </div>
      </article>
    )
  }

  function renderShippingRateTable(carrier: ShippingCarrier, rates: AdminShippingRateOption[]) {
    if (rates.length === 0) {
      return (
        <div className="rounded-lg border border-dashed border-[#f1d9e7] bg-white p-3 text-xs text-[#7f5d70]">
          No {carrier} rates available.
        </div>
      )
    }

    return (
      <div className="overflow-x-auto rounded-lg border border-[#f1d9e7] bg-white">
        <table className="w-full table-fixed text-left text-xs">
          <thead className="bg-[#fff2fb] text-[#7a3a61]">
            <tr>
              <th className="px-3 py-2 font-semibold">Service</th>
              <th className="hidden px-3 py-2 font-semibold md:table-cell">Code</th>
              <th className="px-3 py-2 font-semibold">Price</th>
              <th className="px-3 py-2 font-semibold">Days</th>
              <th className="hidden px-3 py-2 font-semibold md:table-cell">Tag</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => {
              const isSelected = selectedCarrier === carrier && selectedServiceCode === rate.serviceCode

              return (
                <tr
                  key={`${carrier}-${rate.serviceCode}`}
                  onClick={() => {
                    setSelectedCarrier(carrier)
                    setSelectedServiceCode(rate.serviceCode)
                  }}
                  className={`cursor-pointer border-t border-[#f6e4ef] transition ${
                    isSelected ? 'bg-[#ffe8f5]' : 'hover:bg-[#fff6fb]'
                  }`}
                >
                  <td className="px-3 py-2 font-medium text-[#4f2040] break-words">{rate.serviceName}</td>
                  <td className="hidden px-3 py-2 text-[#6e4d60] break-all md:table-cell">{rate.serviceCode}</td>
                  <td className="px-3 py-2 text-[#6e4d60]">{formatPrice(rate.price, currency)}</td>
                  <td className="px-3 py-2 text-[#6e4d60]">{rate.deliveryDays}</td>
                  <td className="hidden px-3 py-2 text-[#6e4d60] md:table-cell">{rate.tag ?? '-'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#fff7fb_100%)] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="rounded-[34px] border border-[#f1cde2] bg-white/90 p-6 shadow-[0_22px_62px_rgba(191,82,136,0.14)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf4f90]">Admin</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-[#3f1933]">All Orders</h1>
            </div>
            <p className="text-sm text-[#6f4f65]">Manage every order flow from pending to delivered.</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full border border-[#edc0de] bg-[#fff3fb] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#9b3f75]">
              {orderCountLabel}
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-[#edc0de] bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                  viewMode === 'grid' ? 'bg-[#d24a90] text-white' : 'text-[#9b3f75] hover:bg-[#fff3fb]'
                }`}
                aria-label="Show grid view"
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition ${
                  viewMode === 'table' ? 'bg-[#d24a90] text-white' : 'text-[#9b3f75] hover:bg-[#fff3fb]'
                }`}
                aria-label="Show table view"
                title="Table View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Pending</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{orderSummary.pending}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff9fd] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Confirmed</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{orderSummary.confirmed}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff8fc] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Shipped</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{orderSummary.shipped}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff9fd] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Delivered</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{orderSummary.delivered}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Cancelled</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{orderSummary.cancelled}</p>
            </div>
          </div>

          {isLoading ? <div className="mt-6 space-y-4">{Array.from({ length: 3 }, (_, index) => renderShimmerCard(index))}</div> : null}
          {!isLoading && error ? <div className="mt-6 rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div> : null}

          {!isLoading && !error && orders.length === 0 ? (
            <div className="mt-6 rounded-[24px] border border-dashed border-[#e9bfd9] bg-[#fff6fb] px-6 py-10 text-center text-sm text-[#7c5d72]">
              No orders were found.
            </div>
          ) : null}

          {!isLoading && orders.length > 0 && viewMode === 'grid' ? (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <article key={order.id} className="rounded-[24px] border border-[#f0d7e7] bg-white p-5 shadow-[0_6px_18px_rgba(191,82,136,0.08)]">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <Link to={`/admin/orders/${order.id}`} className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 transition hover:text-[#8f2a60]">
                        {order.orderNumber}
                      </Link>
                      <h2 className="mt-2 text-xl font-bold text-[#361128]">
                        {order.totalItems} item{order.totalItems === 1 ? '' : 's'} · {formatPrice(order.totalAmount, currency)}
                      </h2>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-4 w-4" />
                          {formatOrderDate(order.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BadgeCheck className="h-4 w-4" />
                          Payment: {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}
                      >
                        {order.orderStatus}
                      </span>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {order.items.map((item, itemIndex) => {
                      const thumbnail = typeof item?.thumbnail === 'string' ? item.thumbnail.trim() : ''
                      const itemTitle = typeof item?.title === 'string' && item.title.trim() ? item.title : 'Order item'

                      return (
                        <div key={`${order.id}-${item?.productId ?? 'product'}-${item?.variantId ?? 'variant'}-${itemIndex}`} className="rounded-[18px] border border-[#f0dbe8] bg-[#fffbfe] p-3">
                          <div className="overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#ffe8f5_0%,#ffffff_100%)] p-2">
                            {thumbnail ? (
                              <img src={thumbnail} alt={itemTitle} className="h-20 w-full object-contain" />
                            ) : (
                              <div className="flex h-20 w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.08em] text-[#8d5574]">
                                No image
                              </div>
                            )}
                          </div>
                          <p className="mt-2 text-sm font-semibold text-[#351626] line-clamp-2">{itemTitle}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {(item?.variantName || 'Default')} · Qty {item?.quantity ?? 0}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0dbe8] pt-4">
                    <div className="text-sm text-zinc-500">Customer total: {formatPrice(order.totalAmount, currency)}</div>
                    {renderOrderActions(order)}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {!isLoading && orders.length > 0 && viewMode === 'table' ? (
            <div className="mt-6 overflow-hidden rounded-[24px] border border-[#f0d7e7] bg-white shadow-[0_6px_18px_rgba(191,82,136,0.08)]">
              <div className="overflow-x-auto">
                <table className="min-w-[980px] w-full text-left text-sm">
                  <thead className="bg-[#fff6fb] text-xs font-bold uppercase tracking-[0.1em] text-[#8f4a73]">
                    <tr>
                      <th className="px-4 py-3">Order</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Order Status</th>
                      <th className="px-4 py-3">Payment</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3e3ed]">
                    {orders.map((order) => (
                      <tr key={`table-${order.id}`} className="hover:bg-[#fff9fd]">
                        <td className="px-4 py-4">
                          <Link to={`/admin/orders/${order.id}`} className="font-semibold text-[#351626] transition hover:text-[#8f2a60]">
                            {order.orderNumber}
                          </Link>
                          <p className="mt-1 text-xs text-zinc-500">{order.paymentMethod}</p>
                        </td>
                        <td className="px-4 py-4 text-zinc-600">{formatOrderDate(order.createdAt)}</td>
                        <td className="px-4 py-4 text-zinc-600">{order.totalItems}</td>
                        <td className="px-4 py-4 font-semibold text-[#5c1f45]">{formatPrice(order.totalAmount, currency)}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end">{renderOrderActions(order)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {renderPaginationFooter()}
            </div>
          ) : null}

          {!isLoading && orders.length > 0 && viewMode === 'grid' ? renderPaginationFooter('mt-6') : null}

          {pagination ? (
            <p className="mt-4 text-sm text-zinc-500">
              {pagination.totalRecords} total records
            </p>
          ) : null}
        </div>
      </main>

      {pendingAction ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#1f0718]/45 px-4 py-4 sm:items-center sm:py-8" role="dialog" aria-modal="true">
          <div
            className={`w-full rounded-[24px] border border-[#efc5df] bg-white p-6 shadow-[0_26px_80px_rgba(102,14,64,0.35)] max-h-[92vh] overflow-y-auto ${
              pendingAction.type === 'ship' ? 'max-w-6xl' : 'max-w-md'
            }`}
          >
            <h3 className="text-xl font-bold text-[#3d1530]">{getActionLabel(pendingAction.type)}</h3>
            <p className="mt-3 text-sm leading-6 text-[#694d5f]">{getActionDescription(pendingAction.type)}</p>
            <p className="mt-3 rounded-lg bg-[#fff2fb] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#a63f7f]">
              Order: {pendingAction.order.orderNumber}
            </p>

{pendingAction.type === "ship" ? (
  <div className="mt-4 space-y-3 rounded-xl border border-[#efcfe1] bg-[#fff8fd] p-3">
    {isLoadingShippingQuote ? (
      <p className="text-sm text-[#694d5f]">Loading shipping cost...</p>
    ) : null}

    {!isLoadingShippingQuote && shippingQuote ? (
      <>
        <p className="text-sm font-semibold text-[#4f2040]">
          Available Shipping Rates
        </p>

        <div className="grid gap-3 xl:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">FEDEX</p>
            {renderShippingRateTable('FEDEX', shippingQuote.rates.FEDEX)}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">DHL</p>
            {renderShippingRateTable('DHL', shippingQuote.rates.DHL)}
          </div>
        </div>

        {selectedShippingRate ? (
          <div className="rounded-lg border border-[#f1d9e7] bg-white px-3 py-2 text-xs text-[#694d5f]">
            Selected: <span className="font-semibold text-[#4f2040]">{selectedCarrier}</span> /{' '}
            <span className="font-semibold text-[#4f2040]">{selectedShippingRate.serviceCode}</span>
          </div>
        ) : null}
      </>
    ) : null}

    {shippingQuoteError ? (
      <p className="text-xs text-rose-600">{shippingQuoteError}</p>
    ) : null}
  </div>
) : null}

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeActionModal}
                disabled={isSubmittingAction}
                className="rounded-full border border-[#e3bfd6] px-4 py-2 text-sm font-semibold text-[#6f4f65] transition hover:bg-[#fff7fb] disabled:cursor-not-allowed disabled:opacity-70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleActionConfirm()}
                disabled={
                  isSubmittingAction ||
                  (pendingAction.type === 'ship' && (!selectedServiceCode || Boolean(shippingQuoteError)))
                }
                className="rounded-full border border-[#d24a90] bg-[#d24a90] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#b83f7d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmittingAction ? 'Please wait...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}
