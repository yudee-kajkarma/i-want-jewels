import type {
  AdminOrderCustomer,
  AdminOrderDetail,
  CheckoutSession,
  CreateOrderPayload,
  CreateOrderResult,
  FedExPickupAvailability,
  FedExPickupOption,
  Order,
  OrderItem,
  AdminShippingQuote,
  OrderStatus,
  OrdersPagination,
  OrdersResult,
  PaymentHistoryItem,
  PaymentHistoryResult,
  Pickup,
  PickupDetail,
  PickupOrderSummary,
  PickupsResult,
  ShippingCarrier,
  ShippingAddress,
} from "../types/order";
import { toPrice, type Price } from "../utils/price";
import { adminApiClient, authApiClient } from "./apiClient";

type OrderItemApiResponse = Record<string, unknown>;

type OrderApiResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  userId?: string;
  customer?: Record<string, unknown>;
  items: OrderItemApiResponse[];
  shippingAddress?: Record<string, unknown>;
  paymentMethod: "COD" | "ONLINE";
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number | Price;
  payableAmount?: number | Price;
  giftCardDiscount?: number;
  appliedGiftCardCode?: string;
  totalItems: number;
  refundStatus?: string;
  shippingCarrier?: string | null;
  shippingCost?: number | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  isActive?: boolean;
  sessionId?: string;
  pickupId?: string | null;
  issuedGiftCards?: Array<Record<string, unknown>>;
};

type CreateOrderApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data: OrderApiResponse;
  checkoutSession?: {
    id?: string;
    url?: string;
  };
};

type OrdersListApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data: OrderApiResponse[];
  pagination?: OrdersPagination;
};

type OrderDetailApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data: OrderApiResponse;
};

type RegeneratePaymentApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data?:
    | OrderApiResponse
    | {
        id?: string;
        url?: string;
      };
  checkoutSession?: {
    id?: string;
    url?: string;
  };
};

type PaymentHistoryApiResponse = {
  success: boolean;
  message: string;
  data: Array<Record<string, unknown>>;
  pagination?: OrdersPagination;
};

type AdminOrdersListApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data: OrderApiResponse[];
  pagination?: OrdersPagination;
};

type AdminOrderUpdateApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data?: OrderApiResponse;
};

type AdminCancelShipmentApiResponse = {
  success: boolean;
  message: string;
  data?: {
    orderId?: string;
    orderStatus?: string;
  };
};

type AdminOrderDetailApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data: OrderApiResponse;
};

type AdminLabelUrlApiResponse = {
  success: boolean;
  code: string;
  data?: {
    orderId?: string;
    orderNumber?: string;
    presignedUrl?: string;
    expiresIn?: number;
  };
};

type AdminShippingQuoteRateArray =
  | Array<{
      serviceName?: string;
      serviceCode?: string;
      price?: number;
      deliveryDays?: number;
      tag?: string;
    }>
  | Record<string, unknown>;

type AdminShippingQuoteApiResponse = {
  success: boolean;
  data?: {
    // New shape: { rates: { FEDEX, DHL }, preview, validation }
    rates?: {
      FEDEX?: AdminShippingQuoteRateArray;
      DHL?: AdminShippingQuoteRateArray;
    };
    preview?: unknown;
    validation?: unknown;
    // Legacy shape (pre-preview): { FEDEX, DHL }
    FEDEX?: AdminShippingQuoteRateArray;
    DHL?: AdminShippingQuoteRateArray;
  };
};

type VerifyPaymentApiResponse = {
  success: boolean;
  code: string;
  message: string;
  data: OrderApiResponse;
};

function normalizeShippingRateOptions(
  rates:
    | Array<{
        serviceName?: string;
        serviceCode?: string;
        price?: number;
        deliveryDays?: number;
        tag?: string;
      }>
    | Record<string, unknown>
    | undefined,
) {
  if (!Array.isArray(rates)) {
    return [];
  }

  return rates
    .map((rate) => ({
      serviceName: rate.serviceName ?? "",
      serviceCode: rate.serviceCode ?? "",
      price: typeof rate.price === "number" ? rate.price : 0,
      deliveryDays:
        typeof rate.deliveryDays === "number" ? rate.deliveryDays : 0,
      tag: rate.tag,
    }))
    .filter((rate) => rate.serviceCode);
}

function getStringValue(record: Record<string, unknown>, key: string): string {
  const value = record[key];

  return typeof value === "string" ? value : "";
}

function getNumberValue(record: Record<string, unknown>, key: string): number {
  const value = record[key];

  return typeof value === "number" ? value : 0;
}

function getPriceValue(record: Record<string, unknown>, key: string): Price {
  const value = record[key];

  if (typeof value === "number") {
    return toPrice(value);
  }

  if (value && typeof value === "object") {
    return toPrice(value as Price);
  }

  return toPrice(0);
}

function getBooleanValue(
  record: Record<string, unknown>,
  key: string,
): boolean {
  return record[key] === true;
}

function getObjectValue(
  record: Record<string, unknown>,
  key: string,
): Record<string, unknown> | null {
  const value = record[key];

  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function normalizeShippingAddress(
  address?: Record<string, unknown>,
): ShippingAddress | null {
  if (!address) {
    return null;
  }

  return {
    street: getStringValue(address, "street"),
    city: getStringValue(address, "city"),
    state: getStringValue(address, "state"),
    postalCode: getStringValue(address, "postalCode"),
    country: getStringValue(address, "country"),
    isDefault: getBooleanValue(address, "isDefault"),
  };
}

function normalizeOrderItem(item: OrderItemApiResponse): OrderItem {
  const giftCard = getObjectValue(item, "giftCard");

  return {
    productId: getStringValue(item, "productId"),
    variantId: getStringValue(item, "variantId"),
    variantName:
      getStringValue(item, "variant_name") ||
      getStringValue(item, "variantName"),
    sku: getStringValue(item, "sku"),
    title: getStringValue(item, "title"),
    price: getPriceValue(item, "price"),
    quantity: getNumberValue(item, "quantity") || 1,
    thumbnail: getStringValue(item, "thumbnail"),
    isGiftCard: getBooleanValue(item, "isGiftCard"),
    ...(giftCard
      ? {
          giftCard: {
            recipientEmail: getStringValue(giftCard, "recipientEmail") || undefined,
            recipientName: getStringValue(giftCard, "recipientName") || undefined,
            senderName: getStringValue(giftCard, "senderName") || undefined,
            message: getStringValue(giftCard, "message") || undefined,
          },
        }
      : {}),
  };
}

function normalizeIssuedGiftCard(card: Record<string, unknown>) {
  return {
    id: getStringValue(card, "id"),
    code: getStringValue(card, "code"),
    initialAmount: getNumberValue(card, "initialAmount"),
    currency: getStringValue(card, "currency"),
    status: getStringValue(card, "status"),
    currentOwnerEmail: getStringValue(card, "currentOwnerEmail"),
    recipientEmail: getStringValue(card, "recipientEmail") || undefined,
    recipientName: getStringValue(card, "recipientName") || undefined,
    senderName: getStringValue(card, "senderName") || undefined,
    message: getStringValue(card, "message") || undefined,
    purchaseOrderItemKey: getStringValue(card, "purchaseOrderItemKey") || undefined,
    createdAt: getStringValue(card, "createdAt") || undefined,
  };
}

function normalizeCheckoutSession(session?: {
  id?: string;
  url?: string;
}): CheckoutSession | null {
  if (!session?.url) {
    return null;
  }

  return {
    id: session.id ?? "",
    url: session.url,
  };
}

function normalizeOrderStatus(status: string): OrderStatus {
  switch (status) {
    case "PENDING":
    case "CONFIRMED":
    case "SHIPPED":
    case "DELIVERED":
    case "CANCELLED":
      return status;
    default:
      return "PENDING";
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
    payableAmount:
      order.payableAmount === undefined ? undefined : toPrice(order.payableAmount),
    giftCardDiscount:
      typeof order.giftCardDiscount === "number" ? order.giftCardDiscount : undefined,
    appliedGiftCardCode:
      typeof order.appliedGiftCardCode === "string" ? order.appliedGiftCardCode : undefined,
    totalItems: order.totalItems,
    sessionId:
      typeof order.sessionId === "string" ? order.sessionId : undefined,
    shippingCarrier:
      typeof order.shippingCarrier === "string" ? order.shippingCarrier : null,
    pickupId: typeof order.pickupId === "string" ? order.pickupId : null,
    issuedGiftCards: Array.isArray(order.issuedGiftCards)
      ? order.issuedGiftCards.map(normalizeIssuedGiftCard)
      : [],
  };
}

function normalizeAdminOrderCustomer(
  value: unknown,
): AdminOrderCustomer | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;

  return {
    userId: getStringValue(record, "userId"),
    username: getStringValue(record, "username"),
    email: getStringValue(record, "email"),
    firstName: getStringValue(record, "firstName"),
    lastName: getStringValue(record, "lastName"),
    phoneNumber: getStringValue(record, "phoneNumber"),
  };
}

function normalizeAdminOrderDetail(order: OrderApiResponse): AdminOrderDetail {
  const normalizedOrder = normalizeOrder(order);

  return {
    ...normalizedOrder,
    userId: typeof order.userId === "string" ? order.userId : "",
    customer: normalizeAdminOrderCustomer(order.customer),
    refundStatus:
      typeof order.refundStatus === "string" ? order.refundStatus : "NONE",
    shippingCarrier:
      typeof order.shippingCarrier === "string" ? order.shippingCarrier : null,
    shippingCost:
      typeof order.shippingCost === "number" ? order.shippingCost : null,
    trackingNumber:
      typeof order.trackingNumber === "string" ? order.trackingNumber : null,
    trackingUrl:
      typeof order.trackingUrl === "string" ? order.trackingUrl : null,
    isActive: order.isActive !== false,
  };
}

function normalizePaymentHistoryItem(
  item: Record<string, unknown>,
): PaymentHistoryItem {
  return {
    orderId: getStringValue(item, "orderId"),
    orderNumber: getStringValue(item, "orderNumber"),
    sessionId: getStringValue(item, "sessionId"),
    transactionId: getStringValue(item, "transactionId") || undefined,
    amount: getNumberValue(item, "amount"),
    paymentStatus: getStringValue(item, "paymentStatus"),
    orderStatus: getStringValue(item, "orderStatus"),
    paymentMethod: (getStringValue(item, "paymentMethod") || "ONLINE") as
      | "COD"
      | "ONLINE",
    createdAt: getStringValue(item, "createdAt"),
    updatedAt: getStringValue(item, "updatedAt"),
  };
}

function normalizeAdminShippingQuote(
  data?: AdminShippingQuoteApiResponse["data"],
): AdminShippingQuote | null {
  if (!data) return null;

  const fedex = data.rates?.FEDEX ?? data.FEDEX;
  const dhl = data.rates?.DHL ?? data.DHL;

  // preview + validation come straight from the backend; cast through
  // unknown because we already declare the strict shape on AdminShippingQuote.
  const preview = data.preview as AdminShippingQuote["preview"];
  const validation = data.validation as AdminShippingQuote["validation"];

  return {
    rates: {
      FEDEX: normalizeShippingRateOptions(fedex),
      DHL: normalizeShippingRateOptions(dhl),
    },
    preview,
    validation,
  };
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResult> {
  const response = await authApiClient.post<CreateOrderApiResponse>(
    "/orders",
    payload,
  );

  return {
    order: normalizeOrder(response.data.data),
    checkoutSession: normalizeCheckoutSession(response.data.checkoutSession),
  };
}

export async function getOrders(): Promise<OrdersResult> {
  const response = await authApiClient.get<OrdersListApiResponse>("/orders");

  return {
    orders: (response.data.data ?? []).map(normalizeOrder),
    pagination: response.data.pagination ?? null,
  };
}

export async function getOrderById(orderId: string): Promise<Order> {
  const response = await authApiClient.get<OrderDetailApiResponse>(
    `/orders/${orderId}`,
  );

  return normalizeOrder(response.data.data);
}

export async function cancelOrder(orderId: string): Promise<Order> {
  const response = await authApiClient.patch<OrderDetailApiResponse>(
    `/orders/${orderId}/cancel`,
  );

  return normalizeOrder(response.data.data);
}

export async function regenerateOrderPayment(
  orderId: string,
  payload?: { successUrl?: string; cancelUrl?: string },
): Promise<{ order: Order | null; checkoutSession: CheckoutSession | null }> {
  const response = await authApiClient.post<RegeneratePaymentApiResponse>(
    `/orders/${orderId}/regenerate-payment`,
    payload ?? {},
  );

  const responseData = response.data.data;
  const hasOrderPayload =
    Boolean(responseData) &&
    typeof responseData === "object" &&
    "orderNumber" in responseData &&
    "items" in responseData;

  const sessionFromData =
    responseData &&
    typeof responseData === "object" &&
    ("url" in responseData || "id" in responseData)
      ? normalizeCheckoutSession({
          id: typeof responseData.id === "string" ? responseData.id : undefined,
          url:
            "url" in responseData && typeof responseData.url === "string"
              ? responseData.url
              : undefined,
        })
      : null;

  return {
    order: hasOrderPayload
      ? normalizeOrder(responseData as OrderApiResponse)
      : null,
    checkoutSession:
      sessionFromData ??
      normalizeCheckoutSession(response.data.checkoutSession),
  };
}

export async function getPaymentHistory(): Promise<PaymentHistoryResult> {
  const response = await authApiClient.get<PaymentHistoryApiResponse>(
    "/orders/payments/history",
  );

  return {
    payments: (response.data.data ?? []).map(normalizePaymentHistoryItem),
    pagination: response.data.pagination ?? null,
  };
}

export async function getAllOrdersForAdmin(
  page = 1,
  limit = 20,
): Promise<OrdersResult> {
  const response = await adminApiClient.get<AdminOrdersListApiResponse>(
    "/orders/admin/all",
    {
      params: {
        page,
        limit,
        status: undefined,
      },
    },
  );

  return {
    orders: (response.data.data ?? []).map(normalizeOrder),
    pagination: response.data.pagination ?? null,
  };
}

export async function updateOrderStatusForAdmin(
  orderId: string,
  status: OrderStatus,
): Promise<Order | null> {
  const response = await adminApiClient.put<AdminOrderUpdateApiResponse>(
    `/orders/admin/${orderId}/status`,
    { status },
  );

  return response.data.data ? normalizeOrder(response.data.data) : null;
}

export async function getAdminShippingQuoteForOrder(
  orderId: string,
): Promise<AdminShippingQuote | null> {
  const response = await adminApiClient.get<AdminShippingQuoteApiResponse>(
    `/orders/admin/${orderId}/shipping-cost`,
  );

  return normalizeAdminShippingQuote(response.data.data);
}

export async function shipOrderForAdmin(
  orderId: string,
  payload: { carrier: ShippingCarrier; serviceCode: string },
): Promise<Order | null> {
  const response = await adminApiClient.put<AdminOrderUpdateApiResponse>(
    `/orders/admin/${orderId}/ship`,
    {
      carrier: payload.carrier,
      serviceCode: payload.serviceCode,
    },
  );

  return response.data.data ? normalizeOrder(response.data.data) : null;
}

export async function updateOrderShippingAddressForAdmin(
  orderId: string,
  payload: Partial<{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>,
): Promise<Order | null> {
  const response = await adminApiClient.patch<AdminOrderUpdateApiResponse>(
    `/orders/admin/${orderId}/shipping-address`,
    payload,
  );

  return response.data.data ? normalizeOrder(response.data.data) : null;
}

export async function cancelShipmentForAdmin(orderId: string): Promise<string> {
  const response = await adminApiClient.delete<AdminCancelShipmentApiResponse>(
    `/orders/admin/${orderId}/shipment`,
  );

  return response.data.message || "Shipment cancelled successfully.";
}

export async function getAdminOrderById(
  orderId: string,
): Promise<AdminOrderDetail> {
  const response = await adminApiClient.get<AdminOrderDetailApiResponse>(
    `/orders/admin/${orderId}`,
  );

  return normalizeAdminOrderDetail(response.data.data);
}

export async function getAdminOrderLabelUrl(
  orderId: string,
): Promise<string | null> {
  const response = await adminApiClient.get<AdminLabelUrlApiResponse>(
    `/orders/admin/${orderId}/label-url`,
  );
  const presignedUrl = response.data.data?.presignedUrl;

  return typeof presignedUrl === "string" && presignedUrl.trim()
    ? presignedUrl
    : null;
}

export async function getAllOrdersForAdminByStatus(
  page = 1,
  limit = 20,
  status?: OrderStatus,
  search?: string,
): Promise<OrdersResult> {
  const trimmedSearch = search?.trim();
  const response = await adminApiClient.get<AdminOrdersListApiResponse>(
    "/orders/admin/all",
    {
      params: {
        page,
        limit,
        status,
        search: trimmedSearch ? trimmedSearch : undefined,
      },
    },
  );

  return {
    orders: (response.data.data ?? []).map(normalizeOrder),
    pagination: response.data.pagination ?? null,
  };
}

// SHIPPED orders for a carrier that are NOT already attached to any pickup.
// Server-side filtered via ?pick=FEDEX|DHL — no client-side pickupId filter.
export async function getShippedOrdersForPickup(
  carrier: ShippingCarrier,
  search?: string,
  page = 1,
  limit = 100,
): Promise<OrdersResult> {
  const trimmedSearch = search?.trim()
  const response = await adminApiClient.get<AdminOrdersListApiResponse>(
    '/orders/admin/all',
    {
      params: {
        page,
        limit,
        pick: carrier,
        search: trimmedSearch ? trimmedSearch : undefined,
      },
    },
  )

  return {
    orders: (response.data.data ?? []).map(normalizeOrder),
    pagination: response.data.pagination ?? null,
  }
}

export async function verifyPaymentStatus(sessionId: string): Promise<Order> {
  const response = await authApiClient.get<VerifyPaymentApiResponse>(
    `/orders/verify-payment/${sessionId}`,
  );

  return normalizeOrder(response.data.data);
}

// ─── Pickup API ───────────────────────────────────────────────────────────────

type PickupApiRecord = {
  _id?: string;
  id?: string;
  carrier?: string;
  confirmationNumber?: string;
  status?: string;
  plannedPickupDateAndTime?: string;
  closeTime?: string;
  location?: string;
  locationType?: string;
  remark?: string;
  packageCount?: number;
  totalWeightKg?: number;
  orderIds?: string[];
  adminUserId?: string;
  createdAt?: string;
  updatedAt?: string;
};

type PickupsApiResponse = {
  success: boolean;
  data: PickupApiRecord[];
  pagination?: OrdersPagination;
};

type PickupScheduleApiResponse = {
  success: boolean;
  code?: string;
  message?: string;
  data?: {
    pickupId?: string;
    confirmationNumber?: string;
    orderCount?: number;
    totalWeightKg?: number;
    plannedPickupDateAndTime?: string;
    plannedPickupDate?: string;
    packageReadyTime?: string;
    customerCloseTime?: string;
    closeTime?: string;
  };
};

type FedExAvailabilityApiResponse = {
  success: boolean;
  code?: string;
  data?: {
    available?: boolean;
    options?: Array<Record<string, unknown>>;
  };
};

function normalizeFedExOption(raw: Record<string, unknown>): FedExPickupOption {
  const access =
    raw.accessTime && typeof raw.accessTime === "object"
      ? (raw.accessTime as Record<string, unknown>)
      : {};
  const strArr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  return {
    carrier: typeof raw.carrier === "string" ? raw.carrier : "FDXE",
    available: raw.available === true,
    pickupDate: typeof raw.pickupDate === "string" ? raw.pickupDate : "",
    cutOffTime: typeof raw.cutOffTime === "string" ? raw.cutOffTime : "",
    accessTime: {
      hours: typeof access.hours === "number" ? access.hours : 0,
      minutes: typeof access.minutes === "number" ? access.minutes : 0,
    },
    residentialAvailable: raw.residentialAvailable === true,
    readyTimeOptions: strArr(raw.readyTimeOptions),
    defaultReadyTime:
      typeof raw.defaultReadyTime === "string" ? raw.defaultReadyTime : "",
    latestTimeOptions: strArr(raw.latestTimeOptions),
    defaultLatestTimeOptions:
      typeof raw.defaultLatestTimeOptions === "string"
        ? raw.defaultLatestTimeOptions
        : "",
    countryRelationship:
      typeof raw.countryRelationship === "string"
        ? raw.countryRelationship
        : "",
    scheduleDay: typeof raw.scheduleDay === "string" ? raw.scheduleDay : "",
  };
}

function normalizePickup(raw: PickupApiRecord): Pickup {
  return {
    id: raw._id ?? raw.id ?? "",
    carrier:
      raw.carrier === "DHL" || raw.carrier === "FEDEX" ? raw.carrier : "DHL",
    confirmationNumber: raw.confirmationNumber ?? "",
    status:
      raw.status === "SCHEDULED" ||
      raw.status === "CANCELLED" ||
      raw.status === "PICKED_UP"
        ? raw.status
        : "SCHEDULED",
    plannedPickupDateAndTime: raw.plannedPickupDateAndTime ?? "",
    closeTime: raw.closeTime ?? "",
    location: raw.location ?? "",
    locationType:
      raw.locationType === "business" || raw.locationType === "residence"
        ? raw.locationType
        : "business",
    remark: raw.remark,
    packageCount: raw.packageCount ?? 0,
    totalWeightKg: raw.totalWeightKg ?? 0,
    orderIds: Array.isArray(raw.orderIds) ? raw.orderIds : [],
    adminUserId: raw.adminUserId ?? "",
    createdAt: raw.createdAt ?? "",
    updatedAt: raw.updatedAt ?? "",
  };
}

export async function getPickupsForAdmin(
  page = 1,
  limit = 20,
  status?: "SCHEDULED" | "PICKED_UP" | "CANCELLED",
): Promise<PickupsResult> {
  const response = await adminApiClient.get<PickupsApiResponse>(
    "/orders/admin/pickups",
    {
      params: { page, limit, ...(status ? { status } : {}) },
    },
  );
  return {
    data: (response.data.data ?? []).map(normalizePickup),
    pagination: response.data.pagination ?? null,
  };
}

export async function scheduleDHLPickupForAdmin(payload: {
  orderIds: string[];
  plannedPickupDateAndTime: string;
  closeTime: string;
  location: string;
  locationType: "business" | "residence";
  remark?: string;
}): Promise<{ confirmationNumber: string; orderCount: number }> {
  const response = await adminApiClient.post<PickupScheduleApiResponse>(
    "/orders/admin/pickups/dhl",
    payload,
  );
  return {
    confirmationNumber: response.data.data?.confirmationNumber ?? "",
    orderCount: response.data.data?.orderCount ?? 0,
  };
}

export async function scheduleFedExPickupForAdmin(payload: {
  orderIds: string[];
  plannedPickupDate: string;
  packageReadyTime: string;
  customerCloseTime: string;
  packageLocation?: string;
  remarks?: string;
}): Promise<{ confirmationNumber: string; orderCount: number }> {
  const response = await adminApiClient.post<PickupScheduleApiResponse>(
    "/orders/admin/pickups/fedex",
    payload,
  );
  return {
    confirmationNumber: response.data.data?.confirmationNumber ?? "",
    orderCount: response.data.data?.orderCount ?? 0,
  };
}

export async function checkFedExPickupAvailabilityForAdmin(payload: {
  dispatchDate: string;
  packageReadyTime: string;
  customerCloseTime: string;
  weightKg?: number;
}): Promise<FedExPickupAvailability> {
  const response = await adminApiClient.post<FedExAvailabilityApiResponse>(
    "/orders/admin/pickups/fedex/availability",
    payload,
  );
  const rawOptions = response.data.data?.options ?? [];
  const options = rawOptions
    .map(normalizeFedExOption)
    .filter((o) => o.available && o.pickupDate);
  return {
    available: response.data.data?.available ?? options.length > 0,
    options,
  };
}

export async function cancelPickupForAdmin(pickupId: string): Promise<string> {
  const response = await adminApiClient.delete<{
    success: boolean;
    message?: string;
  }>(`/orders/admin/pickups/${pickupId}`);
  return response.data.message ?? "Pickup cancelled.";
}

export async function markPickupPickedUpForAdmin(
  pickupId: string,
): Promise<string> {
  const response = await adminApiClient.patch<{
    success: boolean;
    message?: string;
  }>(`/orders/admin/pickups/${pickupId}/picked`);
  return response.data.message ?? "Pickup marked as picked up.";
}

export async function updateDHLPickupForAdmin(
  pickupId: string,
  payload: { readyByTime?: string; nextPickupDate?: string },
): Promise<void> {
  await adminApiClient.patch(`/orders/admin/pickups/dhl/${pickupId}`, payload);
}

type PickupDetailApiResponse = {
  success: boolean;
  data?: {
    pickup?: PickupApiRecord;
    orderCount?: number;
    orders?: Array<Record<string, unknown>>;
    missingOrderIds?: string[];
  };
};

function normalizePickupOrderSummary(
  raw: Record<string, unknown>,
): PickupOrderSummary {
  const itemsRaw = Array.isArray(raw.items)
    ? (raw.items as Array<Record<string, unknown>>)
    : [];
  return {
    id: getStringValue(raw, "id"),
    orderNumber: getStringValue(raw, "orderNumber"),
    orderStatus: normalizeOrderStatus(getStringValue(raw, "orderStatus")),
    shippingCarrier:
      typeof raw.shippingCarrier === "string" ? raw.shippingCarrier : null,
    trackingNumber:
      typeof raw.trackingNumber === "string" ? raw.trackingNumber : null,
    trackingUrl: typeof raw.trackingUrl === "string" ? raw.trackingUrl : null,
    totalAmount: getPriceValue(raw, "totalAmount"),
    totalItems: getNumberValue(raw, "totalItems"),
    shippingAddress: normalizeShippingAddress(
      raw.shippingAddress && typeof raw.shippingAddress === "object"
        ? (raw.shippingAddress as Record<string, unknown>)
        : undefined,
    ),
    items: itemsRaw.map((it) => ({
      title: getStringValue(it, "title"),
      sku: getStringValue(it, "sku"),
      quantity: getNumberValue(it, "quantity") || 1,
      price: getPriceValue(it, "price"),
      weight: getNumberValue(it, "weight"),
    })),
  };
}

export async function getPickupByIdForAdmin(
  pickupId: string,
): Promise<PickupDetail> {
  const response = await adminApiClient.get<PickupDetailApiResponse>(
    `/orders/admin/pickups/${pickupId}`,
  );
  const data = response.data.data;
  const orders = (data?.orders ?? []).map(normalizePickupOrderSummary);
  return {
    pickup: normalizePickup(data?.pickup ?? {}),
    orderCount: data?.orderCount ?? orders.length,
    orders,
    missingOrderIds: Array.isArray(data?.missingOrderIds)
      ? data.missingOrderIds
      : [],
  };
}
