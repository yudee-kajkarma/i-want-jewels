'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { Clock3, Truck, BadgeCheck, LayoutGrid, List, FileDown, Package, ChevronDown, ArrowLeft, X, CheckCircle2, AlertCircle, Search } from 'lucide-react'
import { Link } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import FedExShipForm from '../components/admin/FedExShipForm'
import DHLShipForm from '../components/admin/DHLShipForm'
import {
  cancelPickupForAdmin,
  cancelShipmentForAdmin,
  checkFedExPickupAvailabilityForAdmin,
  getAdminOrderLabelUrl,
  getAdminShippingPreviewForOrder,
  getAdminCarrierRatesForOrder,
  getAllOrdersForAdminByStatus,
  getPickupByIdForAdmin,
  getPickupsForAdmin,
  getShippedOrdersForPickup,
  markPickupPickedUpForAdmin,
  scheduleDHLPickupForAdmin,
  scheduleFedExPickupForAdmin,
  shipOrderForAdmin,
  updateOrderShippingAddressForAdmin,
  updateOrderStatusForAdmin,
} from '../services/orderService'
import { useCurrency } from '../context/CurrencyContext'
import type { AdminShippingQuote, AdminShippingRateOption, FedExPickupAvailability, Order, OrdersPagination, Pickup, PickupDetail, ShippingCarrier } from '../types/order'
import { formatPrice, isoToCurrencyCode } from '../utils/price'
import { getCountryOptions, getStateOptions } from '../utils/location'

type PendingActionType = 'confirm' | 'cancel' | 'ship' | 'cancelShipment' | 'reorder'

type PendingAction = {
  type: PendingActionType
  order: Order
}

const recordsPerPageDefault = 20

function timeToMinutes(value: string): number {
  const [h = '0', m = '0'] = value.split(':')
  return Number(h) * 60 + Number(m)
}

// FedEx returns 24h "HH:MM:SS"; show it as "hh:mm AM/PM" for readability.
// The raw 24h value is still what we send back to FedEx.
function formatTime12h(value: string): string {
  if (!value) return ''
  const [hStr = '0', m = '00'] = value.split(':')
  const h = Number(hStr)
  const period = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${String(h12).padStart(2, '0')}:${m} ${period}`
}

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

export default function AdminOrdersPage() {
  const { t } = useTranslation('common', { keyPrefix: 'admin.orders' })
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'admin.common' })
  const { currency } = useCurrency()

  function getActionLabel(type: PendingActionType) {
    if (type === 'confirm') return t('actionModal.confirmOrder')
    if (type === 'cancel') return t('actionModal.cancelOrder')
    if (type === 'ship') return t('actionModal.shipOrder')
    if (type === 'cancelShipment') return t('actionModal.cancelShipment')
    if (type === 'reorder') return t('actionModal.reorder')
    return ''
  }

  function getActionDescription(type: PendingActionType) {
    if (type === 'confirm') return t('actionModal.confirmDescription')
    if (type === 'cancel') return t('actionModal.cancelDescription')
    if (type === 'ship') return t('actionModal.shipDescription')
    if (type === 'cancelShipment') return t('actionModal.cancelShipmentDescription')
    if (type === 'reorder') return t('actionModal.reorderDescription')
    return ''
  }
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
  const [isLoadingDhlRates, setIsLoadingDhlRates] = useState(false)
  const [selectedCarrier, setSelectedCarrier] = useState<ShippingCarrier>('FEDEX')
  const [selectedServiceCode, setSelectedServiceCode] = useState('')
  const [shipCarrierStep, setShipCarrierStep] = useState<'pick' | 'fedex' | 'dhl'>('pick')
  const [downloadingLabelOrderId, setDownloadingLabelOrderId] = useState('')
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<Order['orderStatus'] | 'ALL'>('ALL')
  const [allOrdersTotalCount, setAllOrdersTotalCount] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')

  // Pickup view state
  const [viewTab, setViewTab] = useState<'orders' | 'pickups'>('orders')
  const [pickupSubView, setPickupSubView] = useState<'schedule' | 'list'>('schedule')
  const [pickupStep, setPickupStep] = useState<'select' | 'form'>('select')
  const [expandedPickupOrderId, setExpandedPickupOrderId] = useState('')
  const [pickupCarrier, setPickupCarrier] = useState<ShippingCarrier>('DHL')
  const [shippedOrdersForPickup, setShippedOrdersForPickup] = useState<Order[]>([])
  const [isLoadingShippedOrders, setIsLoadingShippedOrders] = useState(false)
  const [selectedPickupOrderIds, setSelectedPickupOrderIds] = useState<string[]>([])
  const [pickups, setPickups] = useState<Pickup[]>([])
  const [pickupStatusFilter, setPickupStatusFilter] = useState<'SCHEDULED' | 'PICKED_UP' | 'CANCELLED'>('SCHEDULED')
  const [isLoadingPickups, setIsLoadingPickups] = useState(false)
  const [isSubmittingPickup, setIsSubmittingPickup] = useState(false)
  const [pickupFormError, setPickupFormError] = useState('')
  const [cancellingPickupId, setCancellingPickupId] = useState('')
  const [markingPickupId, setMarkingPickupId] = useState('')
  const [fedExAvailability, setFedExAvailability] = useState<FedExPickupAvailability | null>(null)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [pickupSearchInput, setPickupSearchInput] = useState('')
  const [pickupAppliedSearch, setPickupAppliedSearch] = useState('')
  // Per-pickup expanded detail (pickup + its orders)
  const [expandedPickupId, setExpandedPickupId] = useState('')
  const [pickupDetail, setPickupDetail] = useState<PickupDetail | null>(null)
  const [isLoadingPickupDetail, setIsLoadingPickupDetail] = useState(false)
  const [pickupDetailError, setPickupDetailError] = useState('')

  // DHL pickup form
  const [dhlForm, setDhlForm] = useState({
    plannedPickupDateAndTime: '',
    closeTime: '',
    location: 'Reception',
    locationType: 'business' as 'business' | 'residence',
    remark: '',
  })

  // FedEx pickup form
  const [fedExForm, setFedExForm] = useState({
    plannedPickupDate: '',
    packageReadyTime: '',
    customerCloseTime: '',
    packageLocation: 'FRONT',
    remarks: '',
  })

  // Receiver-address inline edit inside the Ship modal.
  // Only the 5 fields supported by PATCH /admin/:id/shipping-address.
  type ReceiverDraft = { street: string; city: string; state: string; postalCode: string; country: string }
  const [isEditingReceiver, setIsEditingReceiver] = useState(false)
  const [receiverDraft, setReceiverDraft] = useState<ReceiverDraft | null>(null)
  const [isSavingReceiver, setIsSavingReceiver] = useState(false)
  const [receiverSaveError, setReceiverSaveError] = useState('')

  useEffect(() => {
    void loadOrders(true, 1)
  }, [])

  // Load just the preview (shipper/receiver/package) — no FedEx rate call, returns fast.
  // Rates are fetched inside FedExShipForm after the user sees the form.
  async function loadShippingQuote(
    orderId: string,
    opts: { resetSelection?: boolean } = { resetSelection: true },
  ) {
    setIsLoadingShippingQuote(true)
    setShippingQuoteError('')

    if (opts.resetSelection) {
      setShippingQuote(null)
      setSelectedCarrier('FEDEX')
      setSelectedServiceCode('')
    }

    try {
      const quote = await getAdminShippingPreviewForOrder(orderId)
      setShippingQuote(quote)
    } catch {
      setShippingQuoteError(t('errors.loadShipmentDetails'))
    } finally {
      setIsLoadingShippingQuote(false)
    }
  }

  useEffect(() => {
    if (pendingAction?.type === 'ship') {
      void loadShippingQuote(pendingAction.order.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAction])

  const orderCountLabel = useMemo(() => {
    const total = pagination?.totalRecords ?? orders.length
    return t('orderCount', { count: total })
  }, [orders.length, pagination?.totalRecords, t])


  async function loadOrders(
    showLoader: boolean,
    page: number,
    status: Order['orderStatus'] | 'ALL' = selectedStatusFilter,
    search: string = appliedSearch,
  ) {
    if (showLoader) {
      setIsLoading(true)
    }

    try {
      const response = await getAllOrdersForAdminByStatus(page, 10, status === 'ALL' ? undefined : status, search)
      setOrders(response.orders)
      setPagination(response.pagination)
      setCurrentPage(page)

      if (status === 'ALL' && !search) {
        setAllOrdersTotalCount(response.pagination?.totalRecords ?? response.orders.length)
      }

      setError('')
    } catch {
      const message = t('loadError')
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

  function handleStatusFilterClick(status: Order['orderStatus'] | 'ALL') {
    setSelectedStatusFilter(status)
    void loadOrders(true, 1, status)
  }

  function handleSearchSubmit() {
    const next = searchInput.trim()
    setAppliedSearch(next)
    void loadOrders(true, 1, selectedStatusFilter, next)
  }

  function handleSearchClear() {
    setSearchInput('')
    setAppliedSearch('')
    void loadOrders(true, 1, selectedStatusFilter, '')
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
    setIsLoadingDhlRates(false)
    setSelectedCarrier('FEDEX')
    setSelectedServiceCode('')
    setIsEditingReceiver(false)
    setReceiverDraft(null)
    setIsSavingReceiver(false)
    setReceiverSaveError('')
    setShipCarrierStep('pick')
  }

  function startEditReceiver() {
    const r = shippingQuote?.preview?.receiver
    if (!r) return
    setReceiverDraft({
      street: r.street,
      city: r.city,
      state: r.state ?? '',
      postalCode: r.postalCode,
      country: r.country,
    })
    setReceiverSaveError('')
    setIsEditingReceiver(true)
  }

  function cancelEditReceiver() {
    setIsEditingReceiver(false)
    setReceiverDraft(null)
    setReceiverSaveError('')
  }

  async function saveReceiverDraft() {
    if (!pendingAction || !receiverDraft) return
    setIsSavingReceiver(true)
    setReceiverSaveError('')
    try {
      await updateOrderShippingAddressForAdmin(pendingAction.order.id, receiverDraft)
      // Refetch quote/preview without resetting the carrier/service the admin already chose.
      await loadShippingQuote(pendingAction.order.id, { resetSelection: false })
      setIsEditingReceiver(false)
      setReceiverDraft(null)
      toast.success(t('toast.receiverAddressUpdated'))
    } catch (err: any) {
      const msg = err?.response?.data?.message || t('errors.updateReceiverAddress')
      setReceiverSaveError(msg)
    } finally {
      setIsSavingReceiver(false)
    }
  }

  const selectedShippingRate = useMemo(() => {
    if (!shippingQuote || !selectedServiceCode) {
      return null
    }

    const ratesForCarrier = selectedCarrier === 'FEDEX' ? shippingQuote.rates.FEDEX : shippingQuote.rates.DHL
    return ratesForCarrier.find((rate) => rate.serviceCode === selectedServiceCode) ?? null
  }, [selectedCarrier, selectedServiceCode, shippingQuote])

  const selectedFedExOption = useMemo(
    () => fedExAvailability?.options.find(o => o.pickupDate === fedExForm.plannedPickupDate) ?? null,
    [fedExAvailability, fedExForm.plannedPickupDate],
  )

  // Today + next 5 days as selectable pickup dates ("YYYY-MM-DD", local time).
  const fedExDateChoices = useMemo(() => {
    const dates: string[] = []
    const base = new Date()
    for (let i = 0; i < 6; i++) {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i)
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      dates.push(`${d.getFullYear()}-${m}-${day}`)
    }
    return dates
  }, [])

  const fedExAccessMinutes = selectedFedExOption
    ? selectedFedExOption.accessTime.hours * 60 + selectedFedExOption.accessTime.minutes
    : 0

  const fedExCloseOptions = (selectedFedExOption && fedExForm.packageReadyTime)
    ? selectedFedExOption.latestTimeOptions.filter(
        t => timeToMinutes(t) >= timeToMinutes(fedExForm.packageReadyTime) + fedExAccessMinutes,
      )
    : []


  async function handleActionConfirm() {
    if (!pendingAction) {
      return
    }

    setIsSubmittingAction(true)

    try {
      if (pendingAction.type === 'confirm') {
        await updateOrderStatusForAdmin(pendingAction.order.id, 'CONFIRMED')
        toast.success(t('toast.orderConfirmed', { orderNumber: pendingAction.order.orderNumber }))
      }

      if (pendingAction.type === 'cancel') {
        await updateOrderStatusForAdmin(pendingAction.order.id, 'CANCELLED')
        toast.success(t('toast.orderCancelled', { orderNumber: pendingAction.order.orderNumber }))
      }

      if (pendingAction.type === 'ship') {
        if (!selectedServiceCode) {
          toast.error(t('errors.selectShippingService'))
          return
        }

        await shipOrderForAdmin(pendingAction.order.id, {
          carrier: selectedCarrier,
          serviceCode: selectedServiceCode,
        })
        toast.success(t('toast.orderShipped', { orderNumber: pendingAction.order.orderNumber }))
      }

      if (pendingAction.type === 'cancelShipment') {
        const message = await cancelShipmentForAdmin(pendingAction.order.id)
        toast.success(message)
      }

      if (pendingAction.type === 'reorder') {
        await updateOrderStatusForAdmin(pendingAction.order.id, 'CONFIRMED')
        toast.success(t('toast.orderReordered', { orderNumber: pendingAction.order.orderNumber }))
      }

      setPendingAction(null)
      await loadOrders(false, currentPage)
    } catch {
      toast.error(t('errors.actionFailed'))
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

  async function openPickupsTab() {
    setViewTab('pickups')
    setPickupSubView('schedule')
    setPickupStep('select')
    void loadShippedOrdersForCarrier(pickupCarrier)
    void loadPickups()
  }

  async function loadShippedOrdersForCarrier(carrier: ShippingCarrier, search: string = pickupAppliedSearch) {
    setIsLoadingShippedOrders(true)
    setSelectedPickupOrderIds([])
    setExpandedPickupOrderId('')
    setPickupStep('select')
    setFedExAvailability(null)
    try {
      // Backend (?pick=CARRIER) already returns only SHIPPED orders for this
      // carrier that aren't on any pickup — no client-side filtering needed.
      const result = await getShippedOrdersForPickup(carrier, search)
      setShippedOrdersForPickup(result.orders)
    } catch {
      toast.error(t('errors.loadShippedOrders'))
    } finally {
      setIsLoadingShippedOrders(false)
    }
  }

  async function loadPickups(status: 'SCHEDULED' | 'PICKED_UP' | 'CANCELLED' = pickupStatusFilter) {
    setIsLoadingPickups(true)
    try {
      const result = await getPickupsForAdmin(1, 20, status)
      setPickups(result.data)
    } catch {
      toast.error(t('errors.loadPickups'))
    } finally {
      setIsLoadingPickups(false)
    }
  }

  async function togglePickupDetail(pickupId: string) {
    // Collapse if the same pickup is tapped again.
    if (expandedPickupId === pickupId) {
      setExpandedPickupId('')
      setPickupDetail(null)
      setPickupDetailError('')
      return
    }
    setExpandedPickupId(pickupId)
    setPickupDetail(null)
    setPickupDetailError('')
    setIsLoadingPickupDetail(true)
    try {
      const detail = await getPickupByIdForAdmin(pickupId)
      setPickupDetail(detail)
    } catch {
      setPickupDetailError(t('errors.loadPickupDetail'))
    } finally {
      setIsLoadingPickupDetail(false)
    }
  }

  function togglePickupOrder(orderId: string) {
    setSelectedPickupOrderIds(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    )
  }

  function handlePickupSearchSubmit() {
    const next = pickupSearchInput.trim()
    setPickupAppliedSearch(next)
    void loadShippedOrdersForCarrier(pickupCarrier, next)
  }

  function handlePickupSearchClear() {
    setPickupSearchInput('')
    setPickupAppliedSearch('')
    void loadShippedOrdersForCarrier(pickupCarrier, '')
  }

  async function handleCheckFedExAvailability() {
    setIsCheckingAvailability(true)
    setFedExAvailability(null)
    // Keep the admin-selected ready/close times; only the picked date resets.
    setFedExForm(f => ({ ...f, plannedPickupDate: '' }))
    try {
      const today = new Date().toISOString().slice(0, 10)
      const result = await checkFedExPickupAvailabilityForAdmin({
        dispatchDate: today,
        packageReadyTime: fedExForm.packageReadyTime,
        customerCloseTime: fedExForm.customerCloseTime,
        weightKg: 1,
      })
      setFedExAvailability(result)
      if (!result.available || result.options.length === 0) {
        toast.error(t('toast.fedExNoDates'))
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t('errors.availabilityCheckFailed'))
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  async function handleSchedulePickup() {
    if (selectedPickupOrderIds.length === 0) {
      setPickupFormError(t('errors.selectAtLeastOneOrder'))
      return
    }
    setPickupFormError('')
    setIsSubmittingPickup(true)
    try {
      if (pickupCarrier === 'DHL') {
        if (!dhlForm.plannedPickupDateAndTime || !dhlForm.closeTime || !dhlForm.location || !dhlForm.locationType) {
          setPickupFormError(t('errors.fillDhlFields'))
          return
        }
        const result = await scheduleDHLPickupForAdmin({
          orderIds: selectedPickupOrderIds,
          plannedPickupDateAndTime: dhlForm.plannedPickupDateAndTime,
          closeTime: dhlForm.closeTime,
          location: dhlForm.location,
          locationType: dhlForm.locationType,
          remark: dhlForm.remark || undefined,
        })
        toast.success(t('toast.dhlPickupScheduled', { confirmationNumber: result.confirmationNumber, orderCount: result.orderCount }))
      } else {
        if (!fedExForm.plannedPickupDate || !fedExForm.packageReadyTime || !fedExForm.customerCloseTime) {
          setPickupFormError(t('errors.fillFedExFields'))
          return
        }
        const result = await scheduleFedExPickupForAdmin({
          orderIds: selectedPickupOrderIds,
          plannedPickupDate: fedExForm.plannedPickupDate,
          packageReadyTime: fedExForm.packageReadyTime,
          customerCloseTime: fedExForm.customerCloseTime,
          packageLocation: fedExForm.packageLocation || undefined,
          remarks: fedExForm.remarks || undefined,
        })
        toast.success(t('toast.fedExPickupScheduled', { confirmationNumber: result.confirmationNumber, orderCount: result.orderCount }))
      }
      setSelectedPickupOrderIds([])
      setPickupStep('select')
      void loadShippedOrdersForCarrier(pickupCarrier)
      setPickupStatusFilter('SCHEDULED')
      void loadPickups('SCHEDULED')
      setPickupSubView('list')
    } catch (err: any) {
      const msg = err?.response?.data?.message || t('errors.schedulePickupFailed')
      setPickupFormError(msg)
    } finally {
      setIsSubmittingPickup(false)
    }
  }

  async function handleCancelPickup(pickupId: string) {
    setCancellingPickupId(pickupId)
    try {
      const msg = await cancelPickupForAdmin(pickupId)
      toast.success(msg)
      void loadPickups()
      void loadShippedOrdersForCarrier(pickupCarrier)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t('errors.cancelPickupFailed'))
    } finally {
      setCancellingPickupId('')
    }
  }

  async function handleMarkPickup(pickupId: string) {
    setMarkingPickupId(pickupId)
    try {
      const msg = await markPickupPickedUpForAdmin(pickupId)
      toast.success(msg)
      void loadPickups()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t('errors.markPickupFailed'))
    } finally {
      setMarkingPickupId('')
    }
  }

  function handlePickupStatusFilter(status: 'SCHEDULED' | 'PICKED_UP' | 'CANCELLED') {
    setPickupStatusFilter(status)
    setExpandedPickupId('')
    void loadPickups(status)
  }

  async function handleDownloadLabel(order: Order) {
    try {
      setDownloadingLabelOrderId(order.id)
      const presignedUrl = await getAdminOrderLabelUrl(order.id)

      if (!presignedUrl) {
        toast.error(t('errors.generateLabelUrl'))
        return
      }

      window.open(presignedUrl, '_blank', 'noopener,noreferrer')
      toast.success(t('toast.labelReady', { orderNumber: order.orderNumber }))
    } catch {
      toast.error(t('errors.downloadLabel'))
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
            {t('pagination.pageOf', { current: pagination.currentPage, total: pagination.totalPages })}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                void handlePageChange(currentPage - 1)
              }}
              disabled={isLoading || isSubmittingAction || !pagination.hasPrevPage}
              className="border border-[#e8c5db] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {tCommon('prev')}
            </button>

            {pageWindow.map((pageNumber) => (
              <button
                key={`orders-page-${pageNumber}`}
                type="button"
                onClick={() => {
                  void handlePageChange(pageNumber)
                }}
                disabled={isLoading || isSubmittingAction || pageNumber === currentPage}
                className={`h-8 min-w-8 px-2 text-xs font-bold transition ${
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
              className="border border-[#e8c5db] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {tCommon('next')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  function renderOrderActions(order: Order) {
    const isGiftCardOnly = order.items.length > 0 && order.items.every((item) => item.isGiftCard)
    if (isGiftCardOnly) return null

    return (
      <div className="flex flex-wrap gap-2">
        {order.orderStatus === 'PENDING' ? (
          <>
            <button
              type="button"
              onClick={() => openActionModal('confirm', order)}
              className="border border-[#de5aa1] bg-[#de5aa1] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#bf4f90]"
            >
              {t('actions.confirm')}
            </button>
            <button
              type="button"
              onClick={() => openActionModal('cancel', order)}
              className="border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-rose-700 transition hover:bg-rose-100"
            >
              {t('actions.cancelOrder')}
            </button>
          </>
        ) : null}

        {order.orderStatus === 'CONFIRMED' ? (
          <button
            type="button"
            onClick={() => openActionModal('ship', order)}
            className="inline-flex items-center gap-1 border border-[#d25595] bg-[#fff0f9] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#a43875] transition hover:bg-[#ffe0f2]"
          >
            <Truck className="h-3.5 w-3.5" />
            {t('actions.ship')}
          </button>
        ) : null}

        {order.orderStatus === 'SHIPPED' ? (
          <>
            <button
              type="button"
              onClick={() => void handleDownloadLabel(order)}
              disabled={downloadingLabelOrderId === order.id}
              className="inline-flex items-center gap-1 border border-[#b56a22] bg-[#fff6e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#8f5119] transition hover:bg-[#ffebc8] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FileDown className="h-3.5 w-3.5" />
              {downloadingLabelOrderId === order.id ? t('actions.downloading') : t('actions.downloadLabel')}
            </button>
            <button
              type="button"
              onClick={() => openActionModal('cancelShipment', order)}
              className="border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-rose-700 transition hover:bg-rose-100"
            >
              {t('actions.cancelShipment')}
            </button>
          </>
        ) : null}

        {order.orderStatus === 'CANCELLED' ? (
          <button
            type="button"
            onClick={() => openActionModal('reorder', order)}
            className="inline-flex items-center gap-1 border border-[#d25595] bg-[#fff0f9] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#a43875] transition hover:bg-[#ffe0f2]"
          >
            <Truck className="h-3.5 w-3.5" />
            {t('actions.reorder')}
          </button>
        ) : null}
      </div>
    )
  }

  function renderShimmerCard(shimmerId: number) {
    return (
      <article
        key={`shimmer-${shimmerId}`}
        className="overflow-hidden border border-[#f0d7e7] bg-white p-5 shadow-[0_6px_18px_rgba(191,82,136,0.08)]"
      >
        <div className="animate-pulse">
          <div className="h-3 w-32 bg-[#f4d9e9]" />
          <div className="mt-3 h-5 w-56 bg-[#f1d0e3]" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="border border-[#f0dbe8] bg-[#fffbfe] p-3">
                <div className="h-20 bg-[#f6deec]" />
                <div className="mt-2 h-3 w-4/5 bg-[#f2d4e6]" />
                <div className="mt-2 h-3 w-1/2 bg-[#f2d4e6]" />
              </div>
            ))}
          </div>
          <div className="mt-4 h-10 bg-[#f5ddea]" />
        </div>
      </article>
    )
  }

  function renderShippingRateTable(carrier: ShippingCarrier, rates: AdminShippingRateOption[]) {
    if (rates.length === 0) {
      return (
        <div className="border border-dashed border-[#f1d9e7] bg-white p-3 text-xs text-[#7f5d70]">
          {t('table.noRates', { carrier })}
        </div>
      )
    }

    return (
      <div className="overflow-x-auto border border-[#f1d9e7] bg-white">
        <table className="w-full table-fixed text-left text-xs">
          <thead className="bg-[#fff2fb] text-[#7a3a61]">
            <tr>
              <th className="px-3 py-2 font-semibold">{t('table.service')}</th>
              <th className="hidden px-3 py-2 font-semibold md:table-cell">{t('table.code')}</th>
              <th className="px-3 py-2 font-semibold">{t('table.price')}</th>
              <th className="px-3 py-2 font-semibold">{t('table.days')}</th>
              <th className="hidden px-3 py-2 font-semibold md:table-cell">{t('table.tag')}</th>
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
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#fff7fb_100%)] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="border border-[#f1cde2] bg-white/90 p-6 shadow-[0_22px_62px_rgba(191,82,136,0.14)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf4f90]">{t('breadcrumb')}</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-[#3f1933]">{t('title')}</h1>
            </div>
            <p className="text-sm text-[#6f4f65]">{t('subtitle')}</p>
          </div>

          {/* ── Top-level parent tabs: Shipment | Pickup ── */}
          <div className="mt-6 grid grid-cols-2 gap-0 border-2 border-[#3f1933]">
            <button
              type="button"
              onClick={() => setViewTab('orders')}
              className={`flex items-center justify-center gap-2 px-5 py-4 text-sm font-extrabold uppercase tracking-[0.14em] transition ${
                viewTab === 'orders'
                  ? 'bg-[#3f1933] text-white'
                  : 'bg-white text-[#3f1933] hover:bg-[#fdf4fa]'
              }`}
            >
              <Truck className={`h-5 w-5 ${viewTab === 'orders' ? 'text-[#d24a90]' : 'text-[#3f1933]'}`} />
              {t('tabs.shipment')}
            </button>
            <button
              type="button"
              onClick={() => {
                if (viewTab !== 'pickups') void openPickupsTab()
              }}
              className={`flex items-center justify-center gap-2 border-l-2 border-[#3f1933] px-5 py-4 text-sm font-extrabold uppercase tracking-[0.14em] transition ${
                viewTab === 'pickups'
                  ? 'bg-[#3f1933] text-white'
                  : 'bg-white text-[#3f1933] hover:bg-[#fdf4fa]'
              }`}
            >
              <Package className={`h-5 w-5 ${viewTab === 'pickups' ? 'text-[#d24a90]' : 'text-[#3f1933]'}`} />
              {t('tabs.pickup')}
            </button>
          </div>

          {viewTab === 'orders' ? (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex border border-[#edc0de] bg-[#fff3fb] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#9b3f75]">
              {orderCountLabel}
            </div>
            <div className="inline-flex items-center gap-1 border border-[#edc0de] bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex h-9 w-9 items-center justify-center transition ${
                  viewMode === 'grid' ? 'bg-[#d24a90] text-white' : 'text-[#9b3f75] hover:bg-[#fff3fb]'
                }`}
                aria-label={t('viewMode.gridAria')}
                title={t('viewMode.gridTitle')}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`inline-flex h-9 w-9 items-center justify-center transition ${
                  viewMode === 'table' ? 'bg-[#d24a90] text-white' : 'text-[#9b3f75] hover:bg-[#fff3fb]'
                }`}
                aria-label={t('viewMode.tableAria')}
                title={t('viewMode.tableTitle')}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
          ) : null}

          {viewTab === 'orders' ? (
            <form
              onSubmit={(e) => { e.preventDefault(); handleSearchSubmit() }}
              className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b07a98]" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full border border-[#e3bfd6] bg-white py-2.5 pl-9 pr-3 text-sm text-[#4f2040] outline-none transition focus:border-[#d24a90]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="border border-[#3f1933] bg-[#3f1933] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#2a0f22]"
                >
                  {tCommon('search')}
                </button>
                {appliedSearch ? (
                  <button
                    type="button"
                    onClick={handleSearchClear}
                    className="border border-[#e3bfd6] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#6f4f65] transition hover:bg-[#fff7fb]"
                  >
                    {tCommon('clear')}
                  </button>
                ) : null}
              </div>
            </form>
          ) : null}

          {viewTab === 'orders' && appliedSearch ? (
            <p className="mt-2 text-xs text-[#7a4f6a]">
              {t('showingResultsFor')} <span className="font-semibold text-[#4f2040]">&ldquo;{appliedSearch}&rdquo;</span>
            </p>
          ) : null}

{viewTab === 'orders' ? (
<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
  {/* PENDING */}
  <button
    type="button"
    onClick={() => handleStatusFilterClick('PENDING')}
    className={`border px-4 py-3 text-left transition ${
      selectedStatusFilter === 'PENDING'
        ? 'border-[#d24a90] bg-[#fff0f9]'
        : 'border-[#f0d3e5] bg-[#fff6fb] hover:border-[#e7b7d4]'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8d5574]">
        {t('filters.pending')}
      </p>

      {selectedStatusFilter === 'PENDING' && (
        <p className="text-xl font-extrabold text-[#4f2040]">
          {isLoading ? <span className="inline-block h-5 w-7 animate-pulse rounded bg-[#edcde0] align-middle" /> : (pagination?.totalRecords ?? 0)}
        </p>
      )}
    </div>
  </button>

  {/* CONFIRMED */}
  <button
    type="button"
    onClick={() => handleStatusFilterClick('CONFIRMED')}
    className={`border px-4 py-3 text-left transition ${
      selectedStatusFilter === 'CONFIRMED'
        ? 'border-[#d24a90] bg-[#fff0f9]'
        : 'border-[#f0d3e5] bg-[#fff9fd] hover:border-[#e7b7d4]'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8d5574]">
        {t('filters.confirmed')}
      </p>

      {selectedStatusFilter === 'CONFIRMED' && (
        <p className="text-xl font-extrabold text-[#4f2040]">
          {isLoading ? <span className="inline-block h-5 w-7 animate-pulse rounded bg-[#edcde0] align-middle" /> : (pagination?.totalRecords ?? 0)}
        </p>
      )}
    </div>
  </button>

  {/* SHIPPED */}
  <button
    type="button"
    onClick={() => handleStatusFilterClick('SHIPPED')}
    className={`border px-4 py-3 text-left transition ${
      selectedStatusFilter === 'SHIPPED'
        ? 'border-[#d24a90] bg-[#fff0f9]'
        : 'border-[#f0d3e5] bg-[#fff8fc] hover:border-[#e7b7d4]'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8d5574]">
        {t('filters.shipped')}
      </p>

      {selectedStatusFilter === 'SHIPPED' && (
        <p className="text-xl font-extrabold text-[#4f2040]">
          {isLoading ? <span className="inline-block h-5 w-7 animate-pulse rounded bg-[#edcde0] align-middle" /> : (pagination?.totalRecords ?? 0)}
        </p>
      )}
    </div>
  </button>

  {/* DELIVERED */}
  <button
    type="button"
    onClick={() => handleStatusFilterClick('DELIVERED')}
    className={`border px-4 py-3 text-left transition ${
      selectedStatusFilter === 'DELIVERED'
        ? 'border-[#d24a90] bg-[#fff0f9]'
        : 'border-[#f0d3e5] bg-[#fff9fd] hover:border-[#e7b7d4]'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8d5574]">
        {t('filters.delivered')}
      </p>

      {selectedStatusFilter === 'DELIVERED' && (
        <p className="text-xl font-extrabold text-[#4f2040]">
          {isLoading ? <span className="inline-block h-5 w-7 animate-pulse rounded bg-[#edcde0] align-middle" /> : (pagination?.totalRecords ?? 0)}
        </p>
      )}
    </div>
  </button>

  {/* CANCELLED */}
  <button
    type="button"
    onClick={() => handleStatusFilterClick('CANCELLED')}
    className={`border px-4 py-3 text-left transition ${
      selectedStatusFilter === 'CANCELLED'
        ? 'border-[#d24a90] bg-[#fff0f9]'
        : 'border-[#f0d3e5] bg-[#fff6fb] hover:border-[#e7b7d4]'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8d5574]">
        {t('filters.cancelled')}
      </p>

      {selectedStatusFilter === 'CANCELLED' && (
        <p className="text-xl font-extrabold text-[#4f2040]">
          {isLoading ? <span className="inline-block h-5 w-7 animate-pulse rounded bg-[#edcde0] align-middle" /> : (pagination?.totalRecords ?? 0)}
        </p>
      )}
    </div>
  </button>

  {/* ALL */}
  <button
    type="button"
    onClick={() => handleStatusFilterClick('ALL')}
    className={`border px-4 py-3 text-left transition ${
      selectedStatusFilter === 'ALL'
        ? 'border-[#d24a90] bg-[#fff0f9]'
        : 'border-[#f0d3e5] bg-[#fff7fc] hover:border-[#e7b7d4]'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8d5574]">
        {t('filters.all')}
      </p>

      {selectedStatusFilter === 'ALL' && (
        <p className="text-xl font-extrabold text-[#4f2040]">
          {isLoading ? <span className="inline-block h-5 w-7 animate-pulse rounded bg-[#edcde0] align-middle" /> : allOrdersTotalCount}
        </p>
      )}
    </div>
  </button>
</div>
) : null}

          {viewTab === 'orders' && isLoading ? <div className="mt-6 space-y-4">{Array.from({ length: 3 }, (_, index) => renderShimmerCard(index))}</div> : null}
          {viewTab === 'orders' && !isLoading && error ? <div className="mt-6 border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div> : null}

          {viewTab === 'orders' && !isLoading && !error && orders.length === 0 ? (
            <div className="mt-6 border border-dashed border-[#e9bfd9] bg-[#fff6fb] px-6 py-10 text-center text-sm text-[#7c5d72]">
              {t('empty')}
            </div>
          ) : null}

          {viewTab === 'orders' && !isLoading && orders.length > 0 && viewMode === 'grid' ? (
            <div className="mt-6 space-y-4">
              {orders.map((order) => {
                const orderCurrency = isoToCurrencyCode(order.currency) ?? 'eur'

                return (
                <article key={order.id} className="border border-[#f0d7e7] bg-white p-5 shadow-[0_6px_18px_rgba(191,82,136,0.08)]">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <Link to={`/admin/orders/${order.id}`} className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 transition hover:text-[#8f2a60]">
                        {order.orderNumber}
                      </Link>
                      <h2 className="mt-2 text-xl font-bold text-[#361128]">
                        {t('grid.itemsCount', { count: order.totalItems })} · {formatPrice(order.totalAmount, orderCurrency)}
                      </h2>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-4 w-4" />
                          {formatOrderDate(order.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BadgeCheck className="h-4 w-4" />
                          {t('grid.payment')} {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <span
                        className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}
                      >
                        {order.orderStatus}
                      </span>
                      <span
                        className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {order.items.map((item, itemIndex) => {
                      const thumbnail = typeof item?.thumbnail === 'string' ? item.thumbnail.trim() : ''
                      const itemTitle = typeof item?.title === 'string' && item.title.trim() ? item.title : tCommon('orderItem')

                      return (
                        <div key={`${order.id}-${item?.productId ?? 'product'}-${item?.variantId ?? 'variant'}-${itemIndex}`} className="border border-[#f0dbe8] bg-[#fffbfe] p-3">
                          <div className="overflow-hidden bg-[linear-gradient(180deg,#ffe8f5_0%,#ffffff_100%)] p-2">
                            {thumbnail ? (
                              <img src={thumbnail} alt={itemTitle} className="h-20 w-full object-contain" />
                            ) : (
                              <div className="flex h-20 w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.08em] text-[#8d5574]">
                                {tCommon('noImage')}
                              </div>
                            )}
                          </div>
                          <p className="mt-2 text-sm font-semibold text-[#351626] line-clamp-2">{itemTitle}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {(item?.variantName || tCommon('default'))} · {t('grid.qty', { count: item?.quantity ?? 0 })}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0dbe8] pt-4">
                    <div className="text-sm text-zinc-500">{t('grid.customerTotal')} {formatPrice(order.totalAmount, orderCurrency)}</div>
                    {renderOrderActions(order)}
                  </div>
                </article>
                )
              })}
            </div>
          ) : null}

          {viewTab === 'orders' && !isLoading && orders.length > 0 && viewMode === 'table' ? (
            <div className="mt-6 overflow-hidden border border-[#f0d7e7] bg-white shadow-[0_6px_18px_rgba(191,82,136,0.08)]">
              <div className="overflow-x-auto">
                <table className="min-w-[980px] w-full text-left text-sm">
                  <thead className="bg-[#fff6fb] text-xs font-bold uppercase tracking-[0.1em] text-[#8f4a73]">
                    <tr>
                      <th className="px-4 py-3">{t('table.order')}</th>
                      <th className="px-4 py-3">{t('table.date')}</th>
                      <th className="px-4 py-3">{t('table.items')}</th>
                      <th className="px-4 py-3">{t('table.total')}</th>
                      <th className="px-4 py-3">{t('table.orderStatus')}</th>
                      <th className="px-4 py-3">{t('table.payment')}</th>
                      <th className="px-4 py-3 text-right">{t('table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f3e3ed]">
                    {orders.map((order) => {
                      const orderCurrency = isoToCurrencyCode(order.currency) ?? 'eur'

                      return (
                      <tr key={`table-${order.id}`} className="hover:bg-[#fff9fd]">
                        <td className="px-4 py-4">
                          <Link to={`/admin/orders/${order.id}`} className="font-semibold text-[#351626] transition hover:text-[#8f2a60]">
                            {order.orderNumber}
                          </Link>
                          <p className="mt-1 text-xs text-zinc-500">{order.paymentMethod}</p>
                        </td>
                        <td className="px-4 py-4 text-zinc-600">{formatOrderDate(order.createdAt)}</td>
                        <td className="px-4 py-4 text-zinc-600">{order.totalItems}</td>
                        <td className="px-4 py-4 font-semibold text-[#5c1f45]">{formatPrice(order.totalAmount, orderCurrency)}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex justify-end">{renderOrderActions(order)}</div>
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {renderPaginationFooter()}
            </div>
          ) : null}

          {viewTab === 'orders' && !isLoading && orders.length > 0 && viewMode === 'grid' ? renderPaginationFooter('mt-6') : null}

          {viewTab === 'orders' && pagination ? (
            <p className="mt-4 text-sm text-zinc-500">
              {t('totalRecords', { count: pagination.totalRecords })}
            </p>
          ) : null}

          {/* ── PICKUPS VIEW ──────────────────────────────────────────────── */}
          {viewTab === 'pickups' ? (
            <div className="mt-6">
              {/* Sub-tab bar */}
              <div className="flex border-b border-[#f0d7e7]">
                <button
                  type="button"
                  onClick={() => { setPickupSubView('schedule'); void loadShippedOrdersForCarrier(pickupCarrier) }}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition border-b-2 -mb-px ${
                    pickupSubView === 'schedule'
                      ? 'border-[#d24a90] text-[#3f1933]'
                      : 'border-transparent text-[#7a4f6a] hover:text-[#3f1933]'
                  }`}
                >
                  {t('pickup.scheduleNew')}
                </button>
                <button
                  type="button"
                  onClick={() => { setPickupSubView('list'); void loadPickups() }}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] transition border-b-2 -mb-px ${
                    pickupSubView === 'list'
                      ? 'border-[#d24a90] text-[#3f1933]'
                      : 'border-transparent text-[#7a4f6a] hover:text-[#3f1933]'
                  }`}
                >
                  {t('pickup.viewPickups')}
                </button>
              </div>

              {/* ── Schedule new pickup ── */}
              {pickupSubView === 'schedule' ? (
                <div className="mt-5 space-y-5">

                  {pickupStep === 'select' ? (
                  <>
                  {/* Carrier selector */}
                  <div className="flex gap-3">
                    {(['DHL', 'FEDEX'] as ShippingCarrier[]).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => { setPickupCarrier(c); void loadShippedOrdersForCarrier(c) }}
                        className={`border-2 px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] transition ${
                          pickupCarrier === c
                            ? 'border-[#3f1933] bg-[#3f1933] text-white'
                            : 'border-[#cdb3c5] text-[#5c3a50] hover:border-[#3f1933]'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {/* Pickup search */}
                  <form
                    onSubmit={(e) => { e.preventDefault(); handlePickupSearchSubmit() }}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center"
                  >
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b07a98]" />
                      <input
                        type="text"
                        value={pickupSearchInput}
                        onChange={(e) => setPickupSearchInput(e.target.value)}
                        placeholder={t('searchPlaceholder')}
                        className="w-full border border-[#e3bfd6] bg-white py-2.5 pl-9 pr-3 text-sm text-[#4f2040] outline-none transition focus:border-[#d24a90]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="border border-[#3f1933] bg-[#3f1933] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#2a0f22]"
                      >
                        {tCommon('search')}
                      </button>
                      {pickupAppliedSearch ? (
                        <button
                          type="button"
                          onClick={handlePickupSearchClear}
                          className="border border-[#e3bfd6] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[#6f4f65] transition hover:bg-[#fff7fb]"
                        >
                          {tCommon('clear')}
                        </button>
                      ) : null}
                    </div>
                  </form>

                  {pickupAppliedSearch ? (
                    <p className="-mt-2 text-xs text-[#7a4f6a]">
                      {t('showingResultsFor')} <span className="font-semibold text-[#4f2040]">&ldquo;{pickupAppliedSearch}&rdquo;</span>
                    </p>
                  ) : null}

                  {/* Order accordion list */}
                  <div className="border border-[#f0d7e7] bg-white">
                    <div className="flex items-center justify-between gap-2 border-b border-[#f0d7e7] px-4 py-2.5">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#3f1933]">
                        {t('pickup.selectShippedOrders', { carrier: pickupCarrier })}
                      </p>
                      {shippedOrdersForPickup.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedPickupOrderIds.length === shippedOrdersForPickup.length) {
                              setSelectedPickupOrderIds([])
                            } else {
                              setSelectedPickupOrderIds(shippedOrdersForPickup.map(o => o.id))
                            }
                          }}
                          className="text-[11px] font-semibold text-[#d24a90] hover:underline"
                        >
                          {selectedPickupOrderIds.length === shippedOrdersForPickup.length ? t('pickup.clearAll') : t('pickup.selectAll', { count: shippedOrdersForPickup.length })}
                        </button>
                      ) : null}
                    </div>
                    {isLoadingShippedOrders ? (
                      <div className="px-4 py-6 text-center text-xs text-[#7a4f6a]">{t('pickup.loadingOrders')}</div>
                    ) : shippedOrdersForPickup.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs text-[#7a4f6a]">
                        {t('pickup.noShippedOrders', { carrier: pickupCarrier })}
                      </div>
                    ) : (
                      <div className="divide-y divide-[#f6e4ef]">
                        {shippedOrdersForPickup.map(order => {
                          const isExpanded = expandedPickupOrderId === order.id
                          const isChecked = selectedPickupOrderIds.includes(order.id)
                          const orderCurrency = isoToCurrencyCode(order.currency) ?? 'eur'
                          return (
                            <div key={order.id}>
                              <div className="flex items-center gap-3 px-4 py-3">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => togglePickupOrder(order.id)}
                                  className="h-4 w-4 shrink-0 accent-[#d24a90]"
                                />
                                <button
                                  type="button"
                                  onClick={() => setExpandedPickupOrderId(isExpanded ? '' : order.id)}
                                  className="flex flex-1 items-center justify-between gap-2 text-left"
                                >
                                  <span className="text-xs font-semibold text-[#4f2040]">{order.orderNumber}</span>
                                  <ChevronDown className={`h-4 w-4 shrink-0 text-[#8b5a75] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                              {isExpanded ? (
                                <div className="space-y-3 px-4 pb-4">
                                  <button
                                    type="button"
                                    onClick={() => void handleDownloadLabel(order)}
                                    disabled={downloadingLabelOrderId === order.id}
                                    className="inline-flex items-center gap-1 border border-[#b56a22] bg-[#fff6e7] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#8f5119] transition hover:bg-[#ffebc8] disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <FileDown className="h-3.5 w-3.5" />
                                    {downloadingLabelOrderId === order.id ? t('actions.downloadingEllipsis') : t('actions.downloadShipmentLabel')}
                                  </button>
                                  <div className="flex gap-3 overflow-x-auto pb-2">
                                    {order.items.map((item, idx) => {
                                      const thumb = typeof item?.thumbnail === 'string' ? item.thumbnail.trim() : ''
                                      const title = (typeof item?.title === 'string' && item.title.trim()) ? item.title : tCommon('item')
                                      return (
                                        <div
                                          key={`${order.id}-${item?.productId ?? 'p'}-${idx}`}
                                          className="group relative h-28 w-28 shrink-0 overflow-hidden border border-[#f0dbe8] bg-[linear-gradient(180deg,#ffe8f5_0%,#ffffff_100%)]"
                                        >
                                          {thumb ? (
                                            <img src={thumb} alt={title} className="h-full w-full object-contain p-1" />
                                          ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase text-[#8d5574]">
                                              {tCommon('noImage')}
                                            </div>
                                          )}
                                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/75 px-2 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                            <p className="line-clamp-3 text-[11px] font-semibold text-white">{title}</p>
                                            <p className="text-[11px] font-bold text-[#ffb3da]">{formatPrice(item.price, orderCurrency)}</p>
                                            <p className="text-[10px] text-zinc-300">{t('grid.qty', { count: item?.quantity ?? 1 })}</p>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Proceed */}
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-xs text-[#7a4f6a]">
                      {t('pickup.ordersSelected', { count: selectedPickupOrderIds.length })}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setPickupFormError(''); setPickupStep('form') }}
                      disabled={selectedPickupOrderIds.length === 0}
                      className="border border-[#3f1933] bg-[#3f1933] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#2a0f22] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {tCommon('proceed')}
                    </button>
                  </div>
                  </>
                  ) : (
                  <>
                  {/* Step 2 — summary + back */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border border-[#efcfe1] bg-[#fff8fd] px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setPickupStep('select')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#3f1933] transition hover:text-[#d24a90]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t('pickup.backToOrderSelection')}
                    </button>
                    <span className="text-xs font-semibold text-[#5c3a50]">
                      {t('pickup.ordersSelectedWithCarrier', { count: selectedPickupOrderIds.length, carrier: pickupCarrier })}
                    </span>
                  </div>

                  {/* ── DHL form ── */}
                  {pickupCarrier === 'DHL' ? (
                    <div className="border border-[#f0d7e7] bg-white">
                      <div className="border-b border-[#f0d7e7] px-4 py-2.5">
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#3f1933]">{t('pickup.dhlPickupDetails')}</p>
                      </div>
                      <div className="grid gap-4 p-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                            {t('pickup.pickupDateTime')}
                          </label>
                          <input
                            type="datetime-local"
                            value={dhlForm.plannedPickupDateAndTime}
                            onChange={e => setDhlForm(f => ({ ...f, plannedPickupDateAndTime: e.target.value }))}
                            className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                            {t('pickup.closeTime')}
                          </label>
                          <input
                            type="time"
                            value={dhlForm.closeTime}
                            onChange={e => setDhlForm(f => ({ ...f, closeTime: e.target.value }))}
                            className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                            {t('pickup.locationRoom')}
                          </label>
                          <input
                            type="text"
                            value={dhlForm.location}
                            onChange={e => setDhlForm(f => ({ ...f, location: e.target.value }))}
                            placeholder={t('pickup.locationPlaceholder')}
                            className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                            {t('pickup.locationType')}
                          </label>
                          <select
                            value={dhlForm.locationType}
                            onChange={e => setDhlForm(f => ({ ...f, locationType: e.target.value as 'business' | 'residence' }))}
                            className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                          >
                            <option value="business">{t('pickup.locationTypeBusiness')}</option>
                            <option value="residence">{t('pickup.locationTypeResidence')}</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                            {t('pickup.remarkOptional')}
                          </label>
                          <input
                            type="text"
                            value={dhlForm.remark}
                            onChange={e => setDhlForm(f => ({ ...f, remark: e.target.value }))}
                            placeholder={t('pickup.remarkPlaceholder')}
                            className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* ── FedEx form ── */}
                  {pickupCarrier === 'FEDEX' ? (
                    <div className="border border-[#f0d7e7] bg-white">
                      <div className="border-b border-[#f0d7e7] px-4 py-2.5">
                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#3f1933]">{t('pickup.fedExPickupDetails')}</p>
                      </div>

                      {/* Read-only summary — all three auto-update from the picker below. */}
                      <div className="grid gap-4 p-4 sm:grid-cols-3">
                        {([
                          [t('pickup.pickupDate'), fedExForm.plannedPickupDate, false],
                          [t('pickup.packageReadyTime'), fedExForm.packageReadyTime, true],
                          [t('pickup.customerCloseTime'), fedExForm.customerCloseTime, true],
                        ] as const).map(([label, value, isTime]) => (
                          <div key={label}>
                            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                              {label}
                            </label>
                            <div className={`w-full border px-3 py-2 text-xs ${value ? 'border-[#d24a90] bg-[#fff0f9] font-semibold text-[#4f2040]' : 'border-[#e9d3e2] bg-[#faf1f6] text-[#b08aa0]'}`}>
                              {value ? (isTime ? formatTime12h(value) : value) : t('pickup.selectBelow')}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Package location + remarks (editable) */}
                      <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                            {t('pickup.packageLocation')}
                          </label>
                          <select
                            value={fedExForm.packageLocation}
                            onChange={e => setFedExForm(f => ({ ...f, packageLocation: e.target.value }))}
                            className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                          >
                            <option value="FRONT">{t('pickup.packageLocationFront')}</option>
                            <option value="REAR">{t('pickup.packageLocationRear')}</option>
                            <option value="SIDE">{t('pickup.packageLocationSide')}</option>
                            <option value="NONE">{t('pickup.packageLocationNone')}</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                            {t('pickup.remarksOptional')}
                          </label>
                          <input
                            type="text"
                            value={fedExForm.remarks}
                            onChange={e => setFedExForm(f => ({ ...f, remarks: e.target.value }))}
                            className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                          />
                        </div>
                      </div>

                      {/* Selection area — everything is picked here; the three
                          boxes above just mirror these choices. */}
                      <div className="space-y-3 border-t border-[#f0d7e7] px-4 py-3">
                        {/* Before the check: choose any ready/close time to query FedEx */}
                        {!(fedExAvailability && fedExAvailability.options.length > 0) ? (
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                                {t('pickup.chooseTimesThenCheck')}
                              </p>
                            </div>
                            <div>
                              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                                {t('pickup.packageReadyTime').replace(' *', '')}
                              </label>
                              <input
                                type="time"
                                value={fedExForm.packageReadyTime.slice(0, 5)}
                                onChange={e => setFedExForm(f => ({ ...f, packageReadyTime: e.target.value ? `${e.target.value}:00` : '', customerCloseTime: '' }))}
                                className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                                {t('pickup.customerCloseTime').replace(' *', '')}
                              </label>
                              <input
                                type="time"
                                value={fedExForm.customerCloseTime.slice(0, 5)}
                                onChange={e => setFedExForm(f => ({ ...f, customerCloseTime: e.target.value ? `${e.target.value}:00` : '' }))}
                                disabled={!fedExForm.packageReadyTime}
                                className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90] disabled:cursor-not-allowed disabled:bg-[#faf1f6]"
                              />
                            </div>
                          </div>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => void handleCheckFedExAvailability()}
                          disabled={isCheckingAvailability || !fedExForm.packageReadyTime || !fedExForm.customerCloseTime}
                          className="border border-[#3f1933] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#3f1933] transition hover:bg-[#fdf4fa] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isCheckingAvailability
                            ? t('pickup.checking')
                            : (!fedExForm.packageReadyTime || !fedExForm.customerCloseTime)
                              ? t('pickup.selectReadyCloseFirst')
                              : (fedExAvailability && fedExAvailability.options.length > 0)
                                ? t('pickup.recheckAvailability')
                                : t('pickup.checkAvailability')}
                        </button>

                        {fedExAvailability && fedExAvailability.options.length === 0 ? (
                          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700">
                            <AlertCircle className="h-4 w-4" /> {t('pickup.fedExNoDates')}
                          </div>
                        ) : null}

                        {fedExAvailability && fedExAvailability.options.length > 0 ? (
                          <div className="space-y-3 border border-[#efcfe1] bg-[#fff8fd] p-3">
                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="h-4 w-4" /> {t('pickup.fedExAvailable')}
                            </div>

                            {/* Step A: pickup date */}
                            <div>
                              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                                {t('pickup.stepPickupDate')}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {fedExDateChoices.map(date => {
                                  const isSel = fedExForm.plannedPickupDate === date
                                  const isAvailable = fedExAvailability.options.some(o => o.pickupDate === date)
                                  return (
                                    <button
                                      key={date}
                                      type="button"
                                      disabled={!isAvailable}
                                      onClick={() => {
                                        const opt = fedExAvailability.options.find(o => o.pickupDate === date)
                                        setFedExForm(f => {
                                          // Drop pre-picked times FedEx doesn't allow for this date.
                                          const readyOk = !!opt && opt.readyTimeOptions.includes(f.packageReadyTime)
                                          const accessMins = opt ? opt.accessTime.hours * 60 + opt.accessTime.minutes : 0
                                          const closeOk = readyOk && !!opt
                                            && opt.latestTimeOptions.includes(f.customerCloseTime)
                                            && timeToMinutes(f.customerCloseTime) >= timeToMinutes(f.packageReadyTime) + accessMins
                                          return {
                                            ...f,
                                            plannedPickupDate: date,
                                            packageReadyTime: readyOk ? f.packageReadyTime : '',
                                            customerCloseTime: closeOk ? f.customerCloseTime : '',
                                          }
                                        })
                                      }}
                                      title={isAvailable ? undefined : t('pickup.fedExNotAvailableDate')}
                                      className={`border-2 px-4 py-2 text-xs font-bold transition ${
                                        isSel
                                          ? 'border-[#3f1933] bg-[#3f1933] text-white'
                                          : isAvailable
                                            ? 'border-[#cdb3c5] text-[#5c3a50] hover:border-[#3f1933]'
                                            : 'cursor-not-allowed border-[#e9d3e2] bg-[#faf1f6] text-[#c4a7ba]'
                                      }`}
                                    >
                                      {date}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>

                            {/* Step 2 & 3: ready/close — only FedEx's returned
                                slots for the chosen date. */}
                            {selectedFedExOption ? (
                              <>
                                <p className="text-[10px] text-[#8b5a75]">
                                  {t('pickup.fedExSlotsHint', {
                                    date: selectedFedExOption.pickupDate,
                                    hours: selectedFedExOption.accessTime.hours,
                                    minutes: selectedFedExOption.accessTime.minutes,
                                    cutOff: formatTime12h(selectedFedExOption.cutOffTime),
                                  })}
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                  <div>
                                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                                      {t('pickup.stepPackageReadyTime')}
                                    </label>
                                    <select
                                      value={fedExForm.packageReadyTime}
                                      onChange={e => setFedExForm(f => ({ ...f, packageReadyTime: e.target.value, customerCloseTime: '' }))}
                                      className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                                    >
                                      <option value="">{t('pickup.selectReadyTime')}</option>
                                      {selectedFedExOption.readyTimeOptions.map(t => (
                                        <option key={t} value={t}>{formatTime12h(t)}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                                      {t('pickup.stepCustomerCloseTime')}
                                    </label>
                                    <select
                                      value={fedExForm.customerCloseTime}
                                      onChange={e => setFedExForm(f => ({ ...f, customerCloseTime: e.target.value }))}
                                      disabled={!fedExForm.packageReadyTime}
                                      className="w-full border border-[#e3bfd6] px-3 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90] disabled:cursor-not-allowed disabled:bg-[#faf1f6]"
                                    >
                                      <option value="">
                                        {fedExForm.packageReadyTime ? t('pickup.selectCloseTime') : t('pickup.pickReadyTimeFirst')}
                                      </option>
                                      {fedExCloseOptions.map(t => (
                                        <option key={t} value={t}>{formatTime12h(t)}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p className="text-[10px] text-[#8b5a75]">{t('pickup.pickDateForTimes')}</p>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {pickupFormError ? (
                    <div className="border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs text-rose-700">
                      {pickupFormError}
                    </div>
                  ) : null}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => void handleSchedulePickup()}
                      disabled={
                        isSubmittingPickup ||
                        selectedPickupOrderIds.length === 0 ||
                        (pickupCarrier === 'FEDEX' && (!fedExForm.plannedPickupDate || !fedExForm.packageReadyTime || !fedExForm.customerCloseTime))
                      }
                      className="border border-[#3f1933] bg-[#3f1933] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#2a0f22] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmittingPickup ? t('pickup.scheduling') : t('pickup.schedulePickup', { carrier: pickupCarrier })}
                    </button>
                  </div>
                  </>
                  )}
                </div>
              ) : null}

              {/* ── View pickups ── */}
              {pickupSubView === 'list' ? (
                <div className="mt-5">
                  {/* Status sections: Scheduled · Picked up · Cancelled */}
                  <div className="mb-5 inline-flex border border-[#f0d7e7] bg-white">
                    {([
                      { key: 'SCHEDULED', label: t('pickup.statusScheduled') },
                      { key: 'PICKED_UP', label: t('pickup.statusPickedUp') },
                      { key: 'CANCELLED', label: t('pickup.statusCancelled') },
                    ] as const).map(tab => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => handlePickupStatusFilter(tab.key)}
                        className={`px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${
                          pickupStatusFilter === tab.key
                            ? 'bg-[#d24a90] text-white'
                            : 'text-[#7a4f6a] hover:bg-[#fff6fb]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {isLoadingPickups ? (
                    <div className="py-8 text-center text-xs text-[#7a4f6a]">{t('pickup.loadingPickups')}</div>
                  ) : pickups.length === 0 ? (
                    <div className="border border-dashed border-[#e9bfd9] bg-[#fff6fb] px-6 py-10 text-center text-sm text-[#7c5d72]">
                      {pickupStatusFilter === 'SCHEDULED'
                        ? t('pickup.emptyScheduled')
                        : pickupStatusFilter === 'PICKED_UP'
                          ? t('pickup.emptyPickedUp')
                          : t('pickup.emptyCancelled')}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pickups.map(pickup => (
                        <div key={pickup.id} className={`border bg-white px-4 py-4 ${pickup.status === 'CANCELLED' ? 'border-zinc-200 opacity-60' : 'border-[#f0d7e7]'}`}>
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={expandedPickupId === pickup.id}
                            onClick={() => void togglePickupDetail(pickup.id)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                void togglePickupDetail(pickup.id)
                              }
                            }}
                            className="flex cursor-pointer flex-col gap-3 rounded-sm transition hover:bg-[#fff6fb] sm:flex-row sm:items-start sm:justify-between"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`inline-flex border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
                                  pickup.carrier === 'FEDEX' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-amber-200 bg-amber-50 text-amber-700'
                                }`}>
                                  {pickup.carrier}
                                </span>
                                <span className={`inline-flex border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
                                  pickup.status === 'SCHEDULED'
                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                    : pickup.status === 'PICKED_UP'
                                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                                      : 'border-zinc-200 bg-zinc-50 text-zinc-500'
                                }`}>
                                  {pickup.status === 'PICKED_UP' ? t('pickup.pickedUpStatus') : pickup.status}
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-[#4f2040]">
                                {t('pickup.confirmation')} <span className="font-mono">{pickup.confirmationNumber}</span>
                              </p>
                              <p className="text-xs text-zinc-500">
                                {pickup.plannedPickupDateAndTime.split('T')[0]} {formatTime12h((pickup.plannedPickupDateAndTime.split('T')[1] ?? '').slice(0, 5))} · {t('pickup.closeAt', { time: formatTime12h(pickup.closeTime) })}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {t('pickup.packageCount', { count: pickup.packageCount, weight: pickup.totalWeightKg, orders: pickup.orderIds.length })}
                              </p>
                              <p className="text-xs text-zinc-400">
                                {t('pickup.location', { location: pickup.location, type: pickup.locationType })}
                              </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                              <ChevronDown
                                className={`h-5 w-5 text-[#a63f7f] transition-transform ${expandedPickupId === pickup.id ? 'rotate-180' : ''}`}
                                aria-hidden
                              />
                              {pickup.status === 'SCHEDULED' ? (
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={e => {
                                      e.stopPropagation()
                                      void handleMarkPickup(pickup.id)
                                    }}
                                    disabled={markingPickupId === pickup.id}
                                    className="inline-flex items-center justify-center gap-1 border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    {markingPickupId === pickup.id ? tCommon('saving') : t('pickup.pickedUp')}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={e => {
                                      e.stopPropagation()
                                      void handleCancelPickup(pickup.id)
                                    }}
                                    disabled={cancellingPickupId === pickup.id}
                                    className="inline-flex items-center justify-center gap-1 border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                    {cancellingPickupId === pickup.id ? t('pickup.cancelling') : tCommon('cancel')}
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {expandedPickupId === pickup.id ? (
                            <div className="mt-4 border-t border-dashed border-[#f0d7e7] pt-4">
                              {isLoadingPickupDetail ? (
                                <div className="py-6 text-center text-xs text-[#7a4f6a]">{t('pickup.loadingPickupOrders')}</div>
                              ) : pickupDetailError ? (
                                <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{pickupDetailError}</div>
                              ) : pickupDetail ? (
                                <div className="space-y-3">
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7c5d72]">
                                    <span>
                                      {t('pickup.status')}{' '}
                                      <span className={`font-bold uppercase tracking-[0.06em] ${pickupDetail.pickup.status === 'SCHEDULED' ? 'text-emerald-700' : 'text-zinc-500'}`}>
                                        {pickupDetail.pickup.status}
                                      </span>
                                    </span>
                                    <span>{t('pickup.ordersInPickup', { count: pickupDetail.orderCount })}</span>
                                    {pickupDetail.pickup.remark ? <span>{t('pickup.remark', { remark: pickupDetail.pickup.remark })}</span> : null}
                                  </div>

                                  {pickupDetail.orders.length === 0 ? (
                                    <div className="border border-dashed border-[#e9bfd9] bg-[#fff6fb] px-4 py-6 text-center text-xs text-[#7c5d72]">
                                      {t('pickup.noActiveOrders')}
                                    </div>
                                  ) : (
                                    <div className="space-y-2">
                                      {pickupDetail.orders.map(o => (
                                        <div key={o.id} className="border border-[#f0d7e7] bg-[#fffafd] px-3 py-3">
                                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                            <div className="space-y-1">
                                              <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-xs font-bold text-[#4f2040]">{o.orderNumber}</span>
                                                <span className="inline-flex border border-[#e9bfd9] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#a63f7f]">
                                                  {o.orderStatus}
                                                </span>
                                                {o.shippingCarrier ? (
                                                  <span className="inline-flex border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-600">
                                                    {o.shippingCarrier}
                                                  </span>
                                                ) : null}
                                              </div>
                                              {o.trackingNumber ? (
                                                <p className="text-[11px] text-zinc-500">
                                                  {t('pickup.tracking')}{' '}
                                                  {o.trackingUrl ? (
                                                    <a href={o.trackingUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[#a63f7f] underline">
                                                      {o.trackingNumber}
                                                    </a>
                                                  ) : (
                                                    <span className="font-mono">{o.trackingNumber}</span>
                                                  )}
                                                </p>
                                              ) : null}
                                              {o.shippingAddress ? (
                                                <p className="text-[11px] text-zinc-400">
                                                  {o.shippingAddress.street}, {o.shippingAddress.city}, {o.shippingAddress.state} {o.shippingAddress.postalCode}, {o.shippingAddress.country}
                                                </p>
                                              ) : null}
                                            </div>
                                            <div className="text-xs text-zinc-500 sm:text-right">
                                              {t('grid.itemsCount', { count: o.totalItems })} · {formatPrice(o.totalAmount, isoToCurrencyCode(o.currency) ?? 'eur')}
                                            </div>
                                          </div>
                                          {o.items.length > 0 ? (
                                            <ul className="mt-2 space-y-1 border-t border-dashed border-[#f0d7e7] pt-2">
                                              {o.items.map((it, idx) => (
                                                <li key={`${o.id}-${it.sku}-${idx}`} className="flex items-center justify-between text-[11px] text-[#6e4d60]">
                                                  <span>
                                                    {it.title} <span className="text-zinc-400">({it.sku})</span> × {it.quantity}
                                                  </span>
                                                  <span className="font-semibold text-[#5c1f45]">{formatPrice(it.price, isoToCurrencyCode(o.currency) ?? 'eur')}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          ) : null}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {pickupDetail.missingOrderIds.length > 0 ? (
                                    <p className="text-[11px] text-amber-700">
                                      {t('pickup.missingOrders', { count: pickupDetail.missingOrderIds.length })}
                                    </p>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </main>

      {pendingAction ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#1f0718]/45 px-4 py-4 sm:items-center sm:py-8" role="dialog" aria-modal="true">

          {/* ── FedEx full-form step: takes over the entire modal ── */}
          {pendingAction.type === 'ship' && shipCarrierStep === 'fedex' ? (
            <div className="w-full max-w-6xl border border-[#efc5df] bg-white shadow-[0_26px_80px_rgba(102,14,64,0.35)] max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#f0d7e7] px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#a63f7f]">
                  {t('actionModal.fedExShipmentTitle', { orderNumber: pendingAction.order.orderNumber })}
                </p>
                <button
                  type="button"
                  onClick={closeActionModal}
                  disabled={isSubmittingAction}
                  className="text-zinc-400 transition hover:text-zinc-600 disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {shippingQuote ? (
                <FedExShipForm
                  order={pendingAction.order}
                  preview={shippingQuote}
                  onBack={() => setShipCarrierStep('pick')}
                  onShipped={() => { setPendingAction(null); void loadOrders(false, currentPage) }}
                />
              ) : isLoadingShippingQuote ? (
                <div className="px-6 py-16 text-center text-sm text-[#694d5f]">{t('actionModal.loadingShipmentDetails')}</div>
              ) : (
                <div className="space-y-3 px-6 py-12 text-center">
                  <p className="text-sm text-rose-600">{shippingQuoteError || t('actionModal.unableLoadRates')}</p>
                  <button
                    type="button"
                    onClick={() => void loadShippingQuote(pendingAction.order.id)}
                    className="border border-[#d24a90] px-4 py-2 text-xs font-bold text-[#d24a90] transition hover:bg-[#fff2fb]"
                  >
                    {tCommon('retry')}
                  </button>
                </div>
              )}
            </div>
          ) : pendingAction.type === 'ship' && shipCarrierStep === 'dhl' ? (
            <div className="w-full max-w-6xl border border-amber-200 bg-white shadow-[0_26px_80px_rgba(180,90,10,0.30)] max-h-[92vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-amber-200 px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-amber-700">
                  {t('actionModal.dhlShipmentTitle', { orderNumber: pendingAction.order.orderNumber })}
                </p>
                <button
                  type="button"
                  onClick={closeActionModal}
                  disabled={isSubmittingAction}
                  className="text-zinc-400 transition hover:text-zinc-600 disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {shippingQuote ? (
                <div className="px-6 py-5">
                  <DHLShipForm
                    order={pendingAction.order}
                    preview={shippingQuote}
                    onBack={() => setShipCarrierStep('pick')}
                    onShipped={() => { setPendingAction(null); void loadOrders(false, currentPage) }}
                  />
                </div>
              ) : isLoadingShippingQuote ? (
                <div className="px-6 py-16 text-center text-sm text-[#694d5f]">{t('actionModal.loadingShipmentDetails')}</div>
              ) : (
                <div className="space-y-3 px-6 py-12 text-center">
                  <p className="text-sm text-rose-600">{shippingQuoteError || t('actionModal.unableLoadRates')}</p>
                  <button
                    type="button"
                    onClick={() => void loadShippingQuote(pendingAction.order.id)}
                    className="border border-amber-600 px-4 py-2 text-xs font-bold text-amber-700 transition hover:bg-amber-50"
                  >
                    {tCommon('retry')}
                  </button>
                </div>
              )}
            </div>
          ) : (
          <div
            className={`w-full border border-[#efc5df] bg-white p-6 shadow-[0_26px_80px_rgba(102,14,64,0.35)] max-h-[92vh] overflow-y-auto ${
              pendingAction.type === 'ship' ? 'max-w-6xl' : 'max-w-md'
            }`}
          >
            {/* Header — DHL step shows Back arrow instead of title/description */}
            {pendingAction.type === 'ship' && shipCarrierStep === 'dhl' ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShipCarrierStep('pick')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#3f1933] transition hover:text-[#d24a90]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {tCommon('back')}
                </button>
                <h3 className="text-xl font-bold text-[#3d1530]">{t('actionModal.dhlShipment')}</h3>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#3d1530]">{getActionLabel(pendingAction.type)}</h3>
                <p className="mt-3 text-sm leading-6 text-[#694d5f]">{getActionDescription(pendingAction.type)}</p>
              </>
            )}
            <p className="mt-3 bg-[#fff2fb] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#a63f7f]">
              {t('actionModal.orderLabel', { orderNumber: pendingAction.order.orderNumber })}
            </p>

            {/* ── Ship: Carrier pick step ── */}
            {pendingAction.type === 'ship' && shipCarrierStep === 'pick' ? (
              <div className="mt-6 space-y-4">
                {isLoadingShippingQuote ? (
                  <div className="py-8 text-center text-sm text-[#694d5f]">{t('actionModal.loadingShippingRates')}</div>
                ) : shippingQuoteError ? (
                  <div className="space-y-3 py-4 text-center">
                    <p className="text-sm text-rose-600">{shippingQuoteError}</p>
                    <button
                      type="button"
                      onClick={() => void loadShippingQuote(pendingAction.order.id)}
                      className="border border-[#d24a90] px-4 py-2 text-xs font-bold text-[#d24a90] transition hover:bg-[#fff2fb]"
                    >
                      {tCommon('retry')}
                    </button>
                  </div>
                ) : shippingQuote ? (
                  <>
                    <p className="text-sm font-semibold text-[#4f2040]">{t('actionModal.selectCarrier')}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {/* FedEx button — rates load inside FedExShipForm */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCarrier('FEDEX')
                          setShipCarrierStep('fedex')
                        }}
                        className="flex flex-col items-center gap-3 border-2 border-[#3f1933] bg-white px-6 py-10 text-center transition hover:bg-[#fdf4fa]"
                      >
                        <span className="text-3xl font-extrabold tracking-tight text-[#3f1933]">FedEx</span>
                        <span className="text-xs text-[#7a4f6a]">{t('actionModal.internationalShipping')}</span>
                      </button>
                      {/* DHL button — rates load inside DHLShipForm */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCarrier('DHL')
                          setShipCarrierStep('dhl')
                        }}
                        className="flex flex-col items-center gap-3 border-2 border-amber-600 bg-white px-6 py-10 text-center transition hover:bg-amber-50"
                      >
                        <span className="text-3xl font-extrabold tracking-tight text-amber-700">DHL</span>
                        <span className="text-xs text-amber-600">{t('actionModal.internationalShipping')}</span>
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            ) : null}

            {/* ── Ship: DHL step ── */}
            {pendingAction.type === 'ship' && shipCarrierStep === 'dhl' ? (
              <div className="mt-4 space-y-2 border border-[#efcfe1] bg-[#fff8fd] px-3 py-2">
                {isLoadingShippingQuote ? (
                  <p className="text-sm text-[#694d5f]">{t('actionModal.loadingShippingCost')}</p>
                ) : null}

                {!isLoadingShippingQuote && shippingQuote ? (
                  <>
                    <p className="flex justify-center text-sm font-semibold text-[#4f2040]">{t('actionModal.dhlShippingRates')}</p>
                    <div className="space-y-2">
                      {renderShippingRateTable('DHL', shippingQuote.rates.DHL)}
                    </div>

                    {selectedShippingRate ? (
                      <div className="border border-[#f1d9e7] bg-white px-3 py-2 text-xs text-[#694d5f]">
                        {t('actionModal.selected')} <span className="font-semibold text-[#4f2040]">DHL</span> /{' '}
                        <span className="font-semibold text-[#4f2040]">{selectedShippingRate.serviceCode}</span>
                      </div>
                    ) : null}

                    {shippingQuote.preview ? (
                      <div className="mt-4 grid gap-3 xl:grid-cols-2">
                        {/* Shipper */}
                        <div className="border border-[#efcfe1] bg-white px-3 py-2 text-xs text-[#694d5f]">
                          <div className="mb-1 flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('actionModal.shipper')}</p>
                            <span className={`text-[10px] font-semibold ${shippingQuote.validation?.shipperPostalOk && shippingQuote.validation?.shipperPhoneOk ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {shippingQuote.validation?.shipperPostalOk && shippingQuote.validation?.shipperPhoneOk ? t('actionModal.ready') : t('actionModal.checkFields')}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            <p className="font-semibold text-[#4f2040]">{shippingQuote.preview.shipper.name}</p>
                            <p>{shippingQuote.preview.shipper.street}{shippingQuote.preview.shipper.houseNumber ? ' ' + shippingQuote.preview.shipper.houseNumber : ''}</p>
                            <p>{shippingQuote.preview.shipper.city}{shippingQuote.preview.shipper.postalCode ? ', ' + shippingQuote.preview.shipper.postalCode : ''} · {shippingQuote.preview.shipper.country}</p>
                            <p className={shippingQuote.validation?.shipperPhoneOk ? '' : 'text-rose-600'}>📞 {shippingQuote.preview.shipper.phone || '—'}</p>
                            <p className="truncate">✉ {shippingQuote.preview.shipper.email || '—'}</p>
                          </div>
                        </div>

                        {/* Receiver (editable) */}
                        <div className="border border-[#efcfe1] bg-white px-3 py-2 text-xs text-[#694d5f]">
                          <div className="mb-1 flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('actionModal.receiver')}</p>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-semibold ${shippingQuote.validation?.receiverPostalOk && shippingQuote.validation?.receiverPhoneOk && shippingQuote.validation?.receiverEmailOk ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {shippingQuote.validation?.receiverPostalOk && shippingQuote.validation?.receiverPhoneOk && shippingQuote.validation?.receiverEmailOk ? t('actionModal.ready') : t('actionModal.checkFields')}
                              </span>
                              {!isEditingReceiver ? (
                                <button type="button" onClick={startEditReceiver} className="border border-[#d24a90] px-2 py-0.5 text-[10px] font-semibold text-[#d24a90] transition hover:bg-[#fff2fb]">{tCommon('edit')}</button>
                              ) : null}
                            </div>
                          </div>
                          {!isEditingReceiver ? (
                            <div className="space-y-0.5">
                              <p className="font-semibold text-[#4f2040]">{shippingQuote.preview.receiver.name}</p>
                              <p>{shippingQuote.preview.receiver.street}</p>
                              <p>
                                {shippingQuote.preview.receiver.city}
                                {shippingQuote.preview.receiver.state ? ', ' + shippingQuote.preview.receiver.state : ''}
                                {shippingQuote.preview.receiver.postalCode ? ' ' + shippingQuote.preview.receiver.postalCode : ''} · {shippingQuote.preview.receiver.country}
                              </p>
                              <p className={shippingQuote.validation?.receiverPhoneOk ? '' : 'text-rose-600'}>📞 {shippingQuote.preview.receiver.phone || '—'}</p>
                              <p className={`truncate ${shippingQuote.validation?.receiverEmailOk ? '' : 'text-rose-600'}`}>✉ {shippingQuote.preview.receiver.email || '—'}</p>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              {(['street', 'city', 'postalCode'] as const).map((field) => (
                                <div key={field} className="flex items-center gap-2">
                                    <label className="w-20 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{tCommon(field)}</label>
                                  <input
                                    value={receiverDraft?.[field] ?? ''}
                                    onChange={(e) => setReceiverDraft((prev) => prev ? { ...prev, [field]: e.target.value } : prev)}
                                    className="flex-1 border border-[#e3bfd6] px-2 py-1 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                                  />
                                </div>
                              ))}
                              <div className="flex items-center gap-2">
                                <label className="w-20 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{tCommon('country')}</label>
                                <select
                                  value={receiverDraft?.country ?? ''}
                                  onChange={(e) => setReceiverDraft((prev) => prev ? { ...prev, country: e.target.value, state: '' } : prev)}
                                  className="flex-1 border border-[#e3bfd6] px-2 py-1 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                                >
                                  <option value="">{tCommon('selectCountry')}</option>
                                  {getCountryOptions().map((c) => (
                                    <option key={c.code} value={c.code}>{c.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="w-20 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{tCommon('state')}</label>
                                <select
                                  value={receiverDraft?.state ?? ''}
                                  onChange={(e) => setReceiverDraft((prev) => prev ? { ...prev, state: e.target.value } : prev)}
                                  className="flex-1 border border-[#e3bfd6] px-2 py-1 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                                >
                                  <option value="">{tCommon('selectState')}</option>
                                  {getStateOptions(receiverDraft?.country ?? '').map((s) => (
                                    <option key={s.code} value={s.code}>{s.name}</option>
                                  ))}
                                </select>
                              </div>
                              {receiverSaveError ? <p className="text-[10px] text-rose-600">{receiverSaveError}</p> : null}
                              <div className="flex justify-end gap-2 pt-1">
                                <button type="button" onClick={cancelEditReceiver} disabled={isSavingReceiver} className="border border-[#e3bfd6] px-2 py-0.5 text-[10px] font-semibold text-[#6f4f65] hover:bg-[#fff7fb] disabled:opacity-60">{tCommon('cancel')}</button>
                                <button type="button" onClick={() => void saveReceiverDraft()} disabled={isSavingReceiver} className="border border-[#d24a90] bg-[#d24a90] px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-[#b83f7d] disabled:opacity-60">
                                  {isSavingReceiver ? tCommon('saving') : tCommon('save')}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Package */}
                        <div className="border border-[#efcfe1] bg-white px-3 py-2 text-xs text-[#694d5f] xl:col-span-2">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('actionModal.packageCustoms')}</p>
                          <div className="grid gap-x-4 gap-y-0.5 sm:grid-cols-2">
                            <p><span className="font-semibold text-[#4f2040]">{t('actionModal.weight')}</span> {shippingQuote.preview.package.totalWeightKg} {tCommon('kg')}</p>
                            <p><span className="font-semibold text-[#4f2040]">{t('actionModal.declared')}</span> €{shippingQuote.preview.package.declaredValueEUR.toFixed(2)}</p>
                            <p><span className="font-semibold text-[#4f2040]">{t('actionModal.incoterm')}</span> {shippingQuote.preview.package.incoterm}</p>
                            <p>
                              <span className="font-semibold text-[#4f2040]">{t('actionModal.customs')}</span>{' '}
                              <span className={shippingQuote.preview.package.isCustomsDeclarable ? 'text-amber-700' : 'text-emerald-700'}>
                                {shippingQuote.preview.package.isCustomsDeclarable ? t('actionModal.customsYes') : t('actionModal.customsNo')}
                              </span>
                            </p>
                            <p className={`sm:col-span-2 ${shippingQuote.validation?.descriptionOk ? '' : 'text-rose-600'}`}>
                              <span className="font-semibold text-[#4f2040]">{t('actionModal.description')}</span> {shippingQuote.preview.package.description}
                            </p>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="border border-[#efcfe1] bg-white px-3 py-2 text-xs text-[#694d5f] xl:col-span-2">
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('actionModal.lineItems')}</p>
                          <div className="overflow-x-auto">
                            <table className="min-w-full text-[11px]">
                              <thead>
                                <tr className="text-left text-[#8b5a75]">
                                  <th className="pr-2">{t('actionModal.lineItemsHeaders.number')}</th>
                                  <th className="pr-2">{t('actionModal.lineItemsHeaders.title')}</th>
                                  <th className="pr-2 text-right">{t('actionModal.lineItemsHeaders.qty')}</th>
                                  <th className="pr-2 text-right">{t('actionModal.lineItemsHeaders.unitEur')}</th>
                                  <th className="pr-2 text-right">{t('actionModal.lineItemsHeaders.unitG')}</th>
                                  <th className="pr-2">{t('actionModal.lineItemsHeaders.mfr')}</th>
                                  <th>{t('actionModal.lineItemsHeaders.hsCode')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {shippingQuote.preview.items.map((it) => (
                                  <tr key={it.number} className="border-t border-[#f6e3ee]">
                                    <td className="pr-2 py-0.5">{it.number}</td>
                                    <td className="pr-2 py-0.5">{it.title}</td>
                                    <td className="pr-2 py-0.5 text-right">{it.qty}</td>
                                    <td className="pr-2 py-0.5 text-right">{it.unitPriceEUR.toFixed(2)}</td>
                                    <td className="pr-2 py-0.5 text-right">{it.unitWeightG}</td>
                                    <td className="pr-2 py-0.5">{it.mfrCountry}</td>
                                    <td className="py-0.5 font-mono">{it.hsCode}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {shippingQuote.validation && shippingQuote.validation.issues.length > 0 ? (
                      <div className="mt-3 border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                        <p className="mb-1 font-semibold">{t('actionModal.cannotShipUntilFixed')}</p>
                        <ul className="list-inside list-disc">
                          {shippingQuote.validation.issues.map((issue) => (
                            <li key={issue}>{issue}</li>
                          ))}
                        </ul>
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
                className="border border-[#e3bfd6] px-4 py-2 text-sm font-semibold text-[#6f4f65] transition hover:bg-[#fff7fb] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {tCommon('cancel')}
              </button>
              {!(pendingAction.type === 'ship' && shipCarrierStep === 'pick') ? (
                <button
                  type="button"
                  onClick={() => void handleActionConfirm()}
                  disabled={
                    isSubmittingAction ||
                    (pendingAction.type === 'ship' && (
                      !selectedServiceCode ||
                      Boolean(shippingQuoteError) ||
                      isEditingReceiver ||
                      (shippingQuote?.validation ? shippingQuote.validation.issues.length > 0 : false)
                    ))
                  }
                  className="border border-[#d24a90] bg-[#d24a90] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#b83f7d] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmittingAction ? tCommon('pleaseWait') : tCommon('confirm')}
                </button>
              ) : null}
            </div>
          </div>
          )}
        </div>
      ) : null}

      <Footer />
    </div>
  )
}
