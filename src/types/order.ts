import type { Price } from '../utils/price'
import type { CartItem } from './cart'

export type PaymentMethod = 'COD' | 'ONLINE'

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED'

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
  isGiftCard?: boolean
  giftCard?: {
    recipientEmail?: string
    recipientName?: string
    senderName?: string
    message?: string
  }
  size?: number
  sizeMeasurement?: string
}

export type IssuedGiftCard = {
  id: string
  code: string
  initialAmount: number
  currency: string
  status: string
  currentOwnerEmail: string
  recipientEmail?: string
  recipientName?: string
  senderName?: string
  message?: string
  purchaseOrderItemKey?: string
  createdAt?: string
}

export type ReturnStatus = 'NONE' | 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'COMPLETED'

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
  payableAmount?: Price
  currency?: 'EUR' | 'USD' | 'GBP'
  giftCardDiscount?: number
  appliedGiftCardCode?: string
  totalItems: number
  sessionId?: string
  shippingCarrier?: string | null
  pickupId?: string | null
  issuedGiftCards?: IssuedGiftCard[]
  deliveredAt?: string | null
  returnStatus?: ReturnStatus
  returnRequestedAt?: string | null
  returnReason?: string | null
  returnAdminNote?: string | null
  returnWindowDays?: number
}

export type PickupStatus = 'SCHEDULED' | 'CANCELLED' | 'PICKED_UP'

export type Pickup = {
  id: string
  carrier: ShippingCarrier
  confirmationNumber: string
  status: PickupStatus
  plannedPickupDateAndTime: string
  closeTime: string
  location: string
  locationType: 'business' | 'residence'
  remark?: string
  packageCount: number
  totalWeightKg: number
  orderIds: string[]
  adminUserId: string
  createdAt: string
  updatedAt: string
}

export type PickupsResult = {
  data: Pickup[]
  pagination: OrdersPagination | null
}

export type PickupOrderSummaryItem = {
  title: string
  sku: string
  quantity: number
  price: Price
  weight: number
}

export type PickupOrderSummary = {
  id: string
  orderNumber: string
  orderStatus: OrderStatus
  shippingCarrier: string | null
  trackingNumber: string | null
  trackingUrl: string | null
  totalAmount: Price
  currency?: 'EUR' | 'USD' | 'GBP'
  totalItems: number
  shippingAddress: ShippingAddress | null
  items: PickupOrderSummaryItem[]
}

export type PickupDetail = {
  pickup: Pickup
  orderCount: number
  orders: PickupOrderSummary[]
  missingOrderIds: string[]
}

export type FedExPickupOption = {
  carrier: string
  available: boolean
  pickupDate: string
  cutOffTime: string
  accessTime: { hours: number; minutes: number }
  residentialAvailable: boolean
  readyTimeOptions: string[]
  defaultReadyTime: string
  latestTimeOptions: string[]
  defaultLatestTimeOptions: string
  countryRelationship: string
  scheduleDay: string
}

export type FedExPickupAvailability = {
  available: boolean
  options: FedExPickupOption[]
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
  currency?: 'EUR' | 'USD' | 'GBP'
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
  giftCardCode?: string
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

export type FedExRateSurcharge = {
  type: string
  description: string
  amount: number
}

export type FedExRateFreightDiscount = {
  type: string
  description: string
  amount: number
  percent: number
}

export type AdminShippingRateOption = {
  serviceName: string
  serviceCode: string
  price: number           // ACCOUNT rate — what you pay
  listPrice?: number      // LIST rate — public rack rate
  baseCharge?: number
  listBaseCharge?: number
  totalDiscount?: number
  totalSurcharges?: number
  surcharges?: FedExRateSurcharge[]
  freightDiscounts?: FedExRateFreightDiscount[]
  taxes?: FedExRateSurcharge[]
  totalTaxes?: number
  netFedExCharge?: number
  fuelSurchargePercent?: number
  billingWeightKg?: number
  // ── LIST-side itemization (walk-in rack rate) ──
  listSurcharges?: FedExRateSurcharge[]
  listTaxes?: FedExRateSurcharge[]
  listTotalSurcharges?: number
  listTotalTaxes?: number
  listFuelSurchargePercent?: number
  deliveryDays: number
  tag?: string
  /** DHL only: value-added services the carrier reports for this lane. Absent/empty = unknown. */
  availableServices?: Array<{ code: string; name: string }>
  /** DHL only: true when `price` already includes the selected value-added services. */
  valueAddedServicesPriced?: boolean
  /** DHL only: latest local time (HH:MM) DHL can still collect today. */
  pickupCutoffLocal?: string
}

export type AdminShipmentPartyPreview = {
  name: string
  phone: string
  /** Receiver only: phone split into parts so the admin form can edit each. */
  phoneCountryCode?: string
  phoneNumber?: string
  /** Receiver only: optional tax/VAT registration for customs. */
  taxId?: string
  taxIdType?: string
  email: string
  street: string
  houseNumber?: string
  city: string
  state?: string
  postalCode: string
  country: string
}

export type AdminShipmentPackagePreview = {
  totalWeightKg: number
  declaredValueEUR: number
  retailValueEUR: number
  declarationCurrency: 'EUR' | 'USD' | 'GBP'
  declaredValue: number
  retailValue: number
  description: string
  incoterm: string
  isCustomsDeclarable: boolean
  deliveryChargeEUR?: number
  isOutsideEU: boolean
}

export type AdminShipmentPreviewItem = {
  number: number
  title: string
  /** Tariff wording sent to the carrier for this line; the title is the retail name. */
  customsDescription?: string
  qty: number
  unitPriceEUR: number
  unitPrice: number
  unitWeightG: number
  mfrCountry: string
  hsCode: string
  customsValueUSD?: number
  customsValueEUR: number
  customsValue: number
}

export type AdminShipmentPreview = {
  shipper: AdminShipmentPartyPreview
  receiver: AdminShipmentPartyPreview
  package: AdminShipmentPackagePreview
  items: AdminShipmentPreviewItem[]
}

export type AdminShipmentValidation = {
  shipperPostalOk: boolean
  receiverPostalOk: boolean
  shipperPhoneOk: boolean
  receiverPhoneOk: boolean
  receiverEmailOk: boolean
  descriptionOk: boolean
  weightOk: boolean
  issues: string[]
}

export type AdminShippingQuote = {
  rates: {
    FEDEX: AdminShippingRateOption[]
    DHL: AdminShippingRateOption[]
  }
  preview?: AdminShipmentPreview
  validation?: AdminShipmentValidation
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
  /** Delivery date DHL committed to when the label was created. */
  estimatedDeliveryDate: string | null
  isActive: boolean
}
