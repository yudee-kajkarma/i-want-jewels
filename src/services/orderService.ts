import type {
  AdminOrderCustomer,
  AdminOrderDetail,
  CheckoutSession,
  CreateOrderPayload,
  CreateOrderResult,
  Order,
  OrderItem,
  AdminShippingQuote,
  OrderStatus,
  OrdersPagination,
  OrdersResult,
  PaymentHistoryItem,
  PaymentHistoryResult,
  ShippingCarrier,
  ShippingAddress,
} from '../types/order'
import { toPrice, type Price } from '../utils/price'
import { adminApiClient, authApiClient } from './apiClient'

type OrderItemApiResponse = Record<string, unknown>

type OrderApiResponse = {
  id: string
  createdAt: string
  updatedAt: string
  orderNumber: string
  userId?: string
  customer?: Record<string, unknown>
  items: OrderItemApiResponse[]
  shippingAddress?: Record<string, unknown>
  paymentMethod: 'COD' | 'ONLINE'
  paymentStatus: string
  orderStatus: string
  totalAmount: number | Price
  totalItems: number
  refundStatus?: string
  shippingCarrier?: string | null
  shippingCost?: number | null
  trackingNumber?: string | null
  trackingUrl?: string | null
  isActive?: boolean
}

type CreateOrderApiResponse = {
  success: boolean
  code: string
  message: string
  data: OrderApiResponse
  checkoutSession?: {
    id?: string
    url?: string
  }
}

type OrdersListApiResponse = {
  success: boolean
  code: string
  message: string
  data: OrderApiResponse[]
  pagination?: OrdersPagination
}

type OrderDetailApiResponse = {
  success: boolean
  code: string
  message: string
  data: OrderApiResponse
}

type RegeneratePaymentApiResponse = {
  success: boolean
  code: string
  message: string
  data?:
    | OrderApiResponse
    | {
        id?: string
        url?: string
      }
  checkoutSession?: {
    id?: string
    url?: string
  }
}

type PaymentHistoryApiResponse = {
  success: boolean
  message: string
  data: Array<Record<string, unknown>>
  pagination?: OrdersPagination
}

type AdminOrdersListApiResponse = {
  success: boolean
  code: string
  message: string
  data: OrderApiResponse[]
  pagination?: OrdersPagination
}

type AdminOrderUpdateApiResponse = {
  success: boolean
  code: string
  message: string
  data?: OrderApiResponse
}

type AdminOrderDetailApiResponse = {
  success: boolean
  code: string
  message: string
  data: OrderApiResponse
}

type AdminShippingQuoteApiResponse = {
  success: boolean
  data?: {
    orderNumber: string
  destination: {
    country: string
    postalCode: string
  }
  rates: {
    FEDEX: {
      shippingCost: {
        dol: number
        eur: number
        pou: number
      }
      serviceType: string
      estimatedDays: string
    }
    DHL: {
      shippingCost: {
        dol: number
        eur: number
        pou: number
      }
      serviceType: string
      estimatedDays: string
    }
  }
  }}

function getStringValue(record: Record<string, unknown>, key: string): string {
  const value = record[key]

  return typeof value === 'string' ? value : ''
}

function getNumberValue(record: Record<string, unknown>, key: string): number {
  const value = record[key]

  return typeof value === 'number' ? value : 0
}

function getPriceValue(record: Record<string, unknown>, key: string): Price {
  const value = record[key]

  if (typeof value === 'number') {
    return toPrice(value)
  }

  if (value && typeof value === 'object') {
    return toPrice(value as Price)
  }

  return toPrice(0)
}

function getBooleanValue(record: Record<string, unknown>, key: string): boolean {
  return record[key] === true
}

function normalizeShippingAddress(address?: Record<string, unknown>): ShippingAddress | null {
  if (!address) {
    return null
  }

  return {
    street: getStringValue(address, 'street'),
    city: getStringValue(address, 'city'),
    state: getStringValue(address, 'state'),
    postalCode: getStringValue(address, 'postalCode'),
    country: getStringValue(address, 'country'),
    isDefault: getBooleanValue(address, 'isDefault'),
  }
}

function normalizeOrderItem(item: OrderItemApiResponse): OrderItem {
  return {
    productId: getStringValue(item, 'productId'),
    variantId: getStringValue(item, 'variantId'),
    variantName: getStringValue(item, 'variant_name') || getStringValue(item, 'variantName'),
    sku: getStringValue(item, 'sku'),
    title: getStringValue(item, 'title'),
    price: getPriceValue(item, 'price'),
    quantity: getNumberValue(item, 'quantity') || 1,
    thumbnail: getStringValue(item, 'thumbnail'),
  }
}

function normalizeCheckoutSession(session?: { id?: string; url?: string }): CheckoutSession | null {
  if (!session?.url) {
    return null
  }

  return {
    id: session.id ?? '',
    url: session.url,
  }
}

function normalizeOrderStatus(status: string): OrderStatus {
  switch (status) {
    case 'PENDING':
    case 'CONFIRMED':
    case 'SHIPPED':
    case 'DELIVERED':
    case 'CANCELLED':
      return status
    default:
      return 'PENDING'
  }
}

function normalizeOrder(order: OrderApiResponse): Order {
  return {
    id: order.id,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    orderNumber: order.orderNumber,
    items: (order.items ?? []).map(normalizeOrderItem),
    shippingAddress: normalizeShippingAddress(order.shippingAddress),
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    orderStatus: normalizeOrderStatus(order.orderStatus),
    totalAmount: toPrice(order.totalAmount),
    totalItems: order.totalItems,
  }
}

function normalizeAdminOrderCustomer(value: unknown): AdminOrderCustomer | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const record = value as Record<string, unknown>

  return {
    userId: getStringValue(record, 'userId'),
    username: getStringValue(record, 'username'),
    email: getStringValue(record, 'email'),
    firstName: getStringValue(record, 'firstName'),
    lastName: getStringValue(record, 'lastName'),
    phoneNumber: getStringValue(record, 'phoneNumber'),
  }
}

function normalizeAdminOrderDetail(order: OrderApiResponse): AdminOrderDetail {
  const normalizedOrder = normalizeOrder(order)

  return {
    ...normalizedOrder,
    userId: typeof order.userId === 'string' ? order.userId : '',
    customer: normalizeAdminOrderCustomer(order.customer),
    refundStatus: typeof order.refundStatus === 'string' ? order.refundStatus : 'NONE',
    shippingCarrier: typeof order.shippingCarrier === 'string' ? order.shippingCarrier : null,
    shippingCost: typeof order.shippingCost === 'number' ? order.shippingCost : null,
    trackingNumber: typeof order.trackingNumber === 'string' ? order.trackingNumber : null,
    trackingUrl: typeof order.trackingUrl === 'string' ? order.trackingUrl : null,
    isActive: order.isActive !== false,
  }
}

function normalizePaymentHistoryItem(item: Record<string, unknown>): PaymentHistoryItem {
  return {
    orderId: getStringValue(item, 'orderId'),
    orderNumber: getStringValue(item, 'orderNumber'),
    sessionId: getStringValue(item, 'sessionId'),
    transactionId: getStringValue(item, 'transactionId') || undefined,
    amount: getNumberValue(item, 'amount'),
    paymentStatus: getStringValue(item, 'paymentStatus'),
    orderStatus: getStringValue(item, 'orderStatus'),
    paymentMethod: (getStringValue(item, 'paymentMethod') || 'ONLINE') as 'COD' | 'ONLINE',
    createdAt: getStringValue(item, 'createdAt'),
    updatedAt: getStringValue(item, 'updatedAt'),
  }
}

function normalizeAdminShippingQuote(
  data?: AdminShippingQuoteApiResponse["data"]
): AdminShippingQuote | null {
  if (!data) return null

  const result: AdminShippingQuote = {
    orderNumber: data.orderNumber ?? "",
    destination: {
      country: data.destination?.country ?? "",
      postalCode: data.destination?.postalCode ?? "",
    },
    rates: {},
  }

  if (data.rates?.FEDEX) {
    result.rates.FEDEX = {
      shippingCost: {
        dol: data.rates.FEDEX.shippingCost?.dol ?? 0,
        eur: data.rates.FEDEX.shippingCost?.eur ?? 0,
        pou: data.rates.FEDEX.shippingCost?.pou ?? 0,
      },
      serviceType: data.rates.FEDEX.serviceType ?? "",
      estimatedDays: data.rates.FEDEX.estimatedDays ?? "",
    }
  }

  if (data.rates?.DHL) {
    result.rates.DHL = {
      shippingCost: {
        dol: data.rates.DHL.shippingCost?.dol ?? 0,
        eur: data.rates.DHL.shippingCost?.eur ?? 0,
        pou: data.rates.DHL.shippingCost?.pou ?? 0,
      },
      serviceType: data.rates.DHL.serviceType ?? "",
      estimatedDays: data.rates.DHL.estimatedDays ?? "",
    }
  }

  return result
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResult> {
  const response = await authApiClient.post<CreateOrderApiResponse>('/orders', payload)

  return {
    order: normalizeOrder(response.data.data),
    checkoutSession: normalizeCheckoutSession(response.data.checkoutSession),
  }
}

export async function getOrders(): Promise<OrdersResult> {
  const response = await authApiClient.get<OrdersListApiResponse>('/orders')

  return {
    orders: (response.data.data ?? []).map(normalizeOrder),
    pagination: response.data.pagination ?? null,
  }
}

export async function getOrderById(orderId: string): Promise<Order> {
  const response = await authApiClient.get<OrderDetailApiResponse>(`/orders/${orderId}`)

  return normalizeOrder(response.data.data)
}

export async function cancelOrder(orderId: string): Promise<Order> {
  const response = await authApiClient.patch<OrderDetailApiResponse>(`/orders/${orderId}/cancel`)

  return normalizeOrder(response.data.data)
}

export async function regenerateOrderPayment(
  orderId: string,
  payload?: { successUrl?: string; cancelUrl?: string },
): Promise<{ order: Order | null; checkoutSession: CheckoutSession | null }> {
  const response = await authApiClient.post<RegeneratePaymentApiResponse>(
    `/orders/${orderId}/regenerate-payment`,
    payload ?? {},
  )

  const responseData = response.data.data
  const hasOrderPayload =
    Boolean(responseData) &&
    typeof responseData === 'object' &&
    'orderNumber' in responseData &&
    'items' in responseData

  const sessionFromData =
    responseData && typeof responseData === 'object' && ('url' in responseData || 'id' in responseData)
      ? normalizeCheckoutSession({
          id: typeof responseData.id === 'string' ? responseData.id : undefined,
          url: 'url' in responseData && typeof responseData.url === 'string' ? responseData.url : undefined,
        })
      : null

  return {
    order: hasOrderPayload ? normalizeOrder(responseData as OrderApiResponse) : null,
    checkoutSession: sessionFromData ?? normalizeCheckoutSession(response.data.checkoutSession),
  }
}

export async function getPaymentHistory(): Promise<PaymentHistoryResult> {
  const response = await authApiClient.get<PaymentHistoryApiResponse>('/orders/payments/history')

  return {
    payments: (response.data.data ?? []).map(normalizePaymentHistoryItem),
    pagination: response.data.pagination ?? null,
  }
}

export async function getAllOrdersForAdmin(page = 1, limit = 20): Promise<OrdersResult> {
  const response = await adminApiClient.get<AdminOrdersListApiResponse>('/orders/admin/all', {
    params: {
      page,
      limit,
    },
  })

  return {
    orders: (response.data.data ?? []).map(normalizeOrder),
    pagination: response.data.pagination ?? null,
  }
}

export async function updateOrderStatusForAdmin(orderId: string, status: OrderStatus): Promise<Order | null> {
  const response = await adminApiClient.put<AdminOrderUpdateApiResponse>(`/orders/admin/${orderId}/status`, { status })

  return response.data.data ? normalizeOrder(response.data.data) : null
}

export async function getAdminShippingQuoteForOrder(orderId: string): Promise<AdminShippingQuote | null> {
  const response = await adminApiClient.get<AdminShippingQuoteApiResponse>(`/orders/admin/${orderId}/shipping-cost`)

  return normalizeAdminShippingQuote(response.data.data)
}

export async function shipOrderForAdmin(orderId: string, carrier: ShippingCarrier): Promise<Order | null> {
  const response = await adminApiClient.put<AdminOrderUpdateApiResponse>(`/orders/admin/${orderId}/ship`, {
    carrier,
  })

  return response.data.data ? normalizeOrder(response.data.data) : null
}

export async function verifyOrderDeliveryForAdmin(orderId: string): Promise<Order | null> {
  const response = await adminApiClient.post<AdminOrderUpdateApiResponse>(`/orders/${orderId}/verify-delivery`)

  return response.data.data ? normalizeOrder(response.data.data) : null
}

export async function getAdminOrderById(orderId: string): Promise<AdminOrderDetail> {
  const response = await adminApiClient.get<AdminOrderDetailApiResponse>(`/orders/admin/${orderId}`)

  return normalizeAdminOrderDetail(response.data.data)
}