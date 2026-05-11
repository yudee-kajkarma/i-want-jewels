import type { Price } from '../utils/price'
import type { CartItem } from './cart'

export type PaymentMethod = 'COD' | 'ONLINE'

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export type ShippingAddress = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export type OrderItem = {
  productId: string
  variantId: string
  variantName: string
  sku: string
  title: string
  price: Price
  quantity: number
  thumbnail: string
}

export type Order = {
  id: string
  createdAt: string
  updatedAt: string
  orderNumber: string
  items: OrderItem[]
  shippingAddress: ShippingAddress | null
  paymentMethod: PaymentMethod
  paymentStatus: string
  orderStatus: OrderStatus
  totalAmount: Price
  totalItems: number
  sessionId?: string
}

export type OrdersPagination = {
  currentPage: number
  totalPages: number
  totalRecords: number
  recordsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export type OrdersResult = {
  orders: Order[]
  pagination: OrdersPagination | null
}

export type PaymentHistoryItem = {
  orderId: string
  orderNumber: string
  sessionId: string
  transactionId?: string
  amount: number
  paymentStatus: string
  orderStatus: string
  paymentMethod: PaymentMethod
  createdAt: string
  updatedAt: string
}

export type PaymentHistoryResult = {
  payments: PaymentHistoryItem[]
  pagination: OrdersPagination | null
}

export type CheckoutSession = {
  id: string
  url: string
}

export type CreateOrderPayload = {
  addressId: string
  paymentMethod: PaymentMethod
  currency: string
  successUrl?: string
  cancelUrl?: string
}

export type CreateOrderResult = {
  order: Order
  checkoutSession: CheckoutSession | null
}

export type CheckoutSource = 'cart' | 'single'

export type SingleCheckoutItem = CartItem

export type SingleCheckoutDraft = {
  item: SingleCheckoutItem
  returnPath: string
}

export type PendingOrderStatus = {
  orderId: string
  orderNumber: string
  paymentMethod: PaymentMethod
  source: CheckoutSource
}

export type CartRestoreSnapshot = {
  items: CartItem[]
}

export type ShippingCarrier = 'FEDEX' | 'DHL'

export type AdminShippingRateOption = {
  serviceName: string
  serviceCode: string
  price: number
  deliveryDays: number
  tag?: string
}

export type AdminShippingQuote = {
  rates: {
    FEDEX: AdminShippingRateOption[]
    DHL: AdminShippingRateOption[]
  }
}

export type AdminOrderCustomer = {
  userId: string
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export type AdminOrderDetail = Order & {
  userId: string
  customer: AdminOrderCustomer | null
  refundStatus: string
  shippingCarrier: string | null
  shippingCost: number | null
  trackingNumber: string | null
  trackingUrl: string | null
  isActive: boolean
}