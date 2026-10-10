import { authApiClient } from "./apiClient";
import { findLumiSuggestion } from "../components/lumi/suggestions";
import { LAST_GIFT_STEP, isProductSlug, mergeGiftAnswers, type LumiIntent } from "../components/lumi/shop";
import type {
  ChatOrderSummary,
  ChatOrderView,
  LumiAction,
  LumiActionType,
  LumiBlock,
  LumiClientBlock,
  LumiColourKey,
  LumiLink,
  LumiLocale,
  LumiMessage,
  LumiProductCard,
  LumiProductDetail,
  LumiReply,
  LumiServerBlock,
  LumiShopBlock,
  LumiSizeOption,
  LumiSource,
  LumiTool,
  LumiVariant,
} from "../components/lumi/contract";
import type { Price } from "../utils/price";

/**
 * Lumi's line to the backend: questions go to POST /api/chat and come back as
 * one typed reply (components/lumi/contract.ts). Everything the server sends
 * is checked here before the website draws it: a block that doesn't fit the
 * contract is dropped and a reply that doesn't fit is shown as "unavailable",
 * so a bad answer can never break the chat. Saved chats are read with the
 * same checks (lumiHistoryService).
 */

/** One earlier message, as the backend reads the conversation. */
export type ChatTurn = { role: "user" | "assistant"; content: string };

/** What the website tells the backend about the page (ChatContextSchema): the product being viewed, if any. */
export type ChatPageContext = { productSlug?: string };

/** The backend reads this many earlier messages, each cut to this length. */
const HISTORY_TURNS = 4;
const TURN_CHARS = 300;
/** Past this, the visitor sees "unavailable" (and can try again) instead of waiting forever. */
const CHAT_TIMEOUT_MS = 45_000;
const FEEDBACK_TIMEOUT_MS = 10_000;

/** Reply ids as the backend makes them (8–64 characters): the key for feedback. */
export const isReplyId = (value: unknown): value is string =>
  typeof value === "string" && value.length >= 8 && value.length <= 64;

// ---------------------------------------------------------------------------
// Chat pass: after one bot check, visitors get a pass for the rest of the visit
// ---------------------------------------------------------------------------

const PASS_KEY = "iwj-chat-pass";

function readPass(): string | undefined {
  try {
    return sessionStorage.getItem(PASS_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function storePass(pass: string) {
  try {
    sessionStorage.setItem(PASS_KEY, pass);
  } catch {
    /* private mode: the bot check simply runs again next message */
  }
}

/** The backend refused the pass (HTTP 403): the next message runs the bot check again. */
function forgetPass() {
  try {
    sessionStorage.removeItem(PASS_KEY);
  } catch {
    /* ignore */
  }
}

/** Whether this visitor still needs the bot check before their next message. */
export function needsBotCheck(isAuthenticated: boolean): boolean {
  return !isAuthenticated && !readPass();
}

/** Keeps the pass the backend sends with any answer. */
function keepPass(data: unknown) {
  if (isObject(data) && typeof data.chatPass === "string" && data.chatPass) storePass(data.chatPass);
}

/** The HTTP status of a failed request; undefined when the server was never reached. */
export function httpStatus(error: unknown): number | undefined {
  const status = (error as { response?: { status?: unknown } } | null)?.response?.status;
  return typeof status === "number" ? status : undefined;
}

/** The `data` of the backend's { success, data } answer. */
function dataOf(body: unknown): unknown {
  return isObject(body) && "data" in body ? body.data : body;
}

// ---------------------------------------------------------------------------
// Requests
// ---------------------------------------------------------------------------

/**
 * Sends one chat message to the backend (POST /api/chat). Logged-in shoppers
 * are recognised by their login token, which `authApiClient` attaches.
 * A library question sends its id as `suggestion`, so the backend can use its
 * pre-decided answer; the gift finder sends its exact search as `intent`.
 * The product page being viewed goes along as `context`, so "add it to my
 * bag" means that product. Never throws: failures come back as
 * "unavailable", and a refused bot check (HTTP 403) as "botCheck".
 */
export async function sendChatMessage(input: {
  message: string;
  locale: LumiLocale;
  history: ChatTurn[];
  suggestion?: string;
  intent?: LumiIntent;
  context?: ChatPageContext;
  botToken?: string;
}): Promise<LumiReply> {
  const productSlug = input.context?.productSlug;
  try {
    const response = await authApiClient.post<unknown>(
      "/chat",
      {
        message: input.message,
        locale: input.locale,
        history: input.history.slice(-HISTORY_TURNS).map((turn) => ({ role: turn.role, content: turn.content.slice(0, TURN_CHARS) })),
        suggestion: input.suggestion,
        intent: input.intent,
        // Only a slug the backend accepts: anything else would refuse the whole question.
        context: isProductSlug(productSlug) ? { productSlug } : {},
        chatPass: readPass(),
        botToken: input.botToken,
      },
      { timeout: CHAT_TIMEOUT_MS },
    );
    const data = dataOf(response.data);
    keepPass(data);
    const reply = readLumiReply(data, input.locale);
    if (reply.kind === "botCheck") forgetPass();
    return reply;
  } catch (error) {
    if (httpStatus(error) === 403) {
      forgetPass();
      return { kind: "botCheck" };
    }
    return { kind: "unavailable" };
  }
}


/**
 * Tells the backend whether one of Lumi's answers helped (POST
 * /api/chat/feedback), by the reply's id. The backend knows the visitor by
 * their login or address, so only who got the answer can rate it. Never
 * throws: true when it was saved.
 */
export async function sendFeedback(replyId: string, helpful: boolean): Promise<boolean> {
  if (!isReplyId(replyId) || typeof helpful !== "boolean") return false;
  try {
    await authApiClient.post<unknown>("/chat/feedback", { replyId, helpful }, { timeout: FEEDBACK_TIMEOUT_MS });
    return true;
  } catch {
    return false;
  }
}

/**
 * The chat so far as the plain-text turns the backend reads: what was said,
 * plus the names of the products shown, so "the second one" can be understood.
 * Forms, orders and notices aren't part of the conversation.
 */
export function toChatTurns(messages: LumiMessage[]): ChatTurn[] {
  return messages.flatMap((message): ChatTurn[] => {
    const content = message.blocks.flatMap(turnText).join("\n").trim();
    return content ? [{ role: message.from === "you" ? "user" : "assistant", content }] : [];
  });
}

function turnText(block: LumiBlock): string[] {
  switch (block.type) {
    case "text":
      return [block.text];
    case "points":
      return block.items;
    case "product":
      return [block.product.title];
    case "products":
    case "compare":
      return [block.products.map((p) => p.title).join(", ")];
    default:
      return [];
  }
}

// ---------------------------------------------------------------------------
// Reading what the server sends (and what saved chats contain)
// ---------------------------------------------------------------------------

type Json = Record<string, unknown>;
type LimitTier = Extract<LumiReply, { kind: "limit" }>["tier"];

// Every allowed value of the contract's enums. Typed as records, so adding a
// value to the contract without adding it here is a type error.
const TOOLS: Record<LumiTool, true> = {
  find_products: true, product_details: true, my_orders: true, order_status: true, gift_cards: true,
  talk_to_person: true, ask_question: true, greeting: true, off_topic: true, saved: true,
  pairs_with: true, add_to_bag: true, add_to_wishlist: true, show_bag: true, show_wishlist: true, gift_finder: true,
};
const SOURCES: Record<LumiSource, true> = { shortcut: true, suggestion: true, saved: true, tool: true, ai: true };
const LOCALES: Record<LumiLocale, true> = { en: true, de: true, nl: true, fr: true, it: true, es: true };
const ACTIONS: Record<LumiActionType, true> = {
  my_orders: true, order_status: true, talk_to_person: true, gift_cards: true,
  add_to_bag: true, add_to_wishlist: true, show_bag: true, show_wishlist: true, gift_finder: true,
};
const COLOURS: Record<LumiColourKey, true> = { yellow: true, rose: true, white: true };
const TIERS: Record<LimitTier, true> = { visitor: true, loggedIn: true, customer: true };

function isObject(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A string with something in it, trimmed. */
function filled(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function oneOf<T extends string>(allowed: Record<T, true>, value: unknown): T | undefined {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(allowed, value) ? (value as T) : undefined;
}

/** The items `read` accepts; the rest are dropped. */
function listOf<T>(value: unknown, read: (item: unknown) => T | undefined): T[] {
  const items: T[] = [];
  if (!Array.isArray(value)) return items;
  for (const raw of value) {
    const item = read(raw);
    if (item !== undefined) items.push(item);
  }
  return items;
}

/**
 * A path inside the shop, like "/blogs/…". Never another site: no "//host",
 * no backslashes (browsers read "/\host" as "//host"), no "javascript:".
 */
const INTERNAL_PATH = /^\/(?![/\\])[^\s\\]*$/;
const WEB_URL = /^https?:\/\/[^\s\\]+$/i;

const internalPath = (value: unknown) => (typeof value === "string" && INTERNAL_PATH.test(value) ? value : undefined);
const webUrl = (value: unknown) => (typeof value === "string" && WEB_URL.test(value) ? value : undefined);
/** Pictures come from the shop's storage (https) or the site itself. */
const imageUrl = (value: unknown) => webUrl(value) ?? internalPath(value);

/** Only set when present, so stored chats don't fill up with empty keys. */
const optional = <K extends string, V>(key: K, value: V | undefined) =>
  (value === undefined ? {} : { [key]: value }) as Partial<Record<K, V>>;

function readPrice(raw: unknown): Price | undefined {
  if (!isObject(raw) || !isNumber(raw.eur) || !isNumber(raw.dol) || !isNumber(raw.pou)) return undefined;
  return { eur: raw.eur, dol: raw.dol, pou: raw.pou };
}

function readLink(raw: unknown): LumiLink | undefined {
  if (!isObject(raw)) return undefined;
  const title = filled(raw.title);
  const url = internalPath(raw.url);
  return title && url ? { title, url } : undefined;
}

/** The items `read` accepts, each `key` once (the first wins): duplicates would confuse what the visitor picks. */
function uniqueListOf<T>(value: unknown, read: (item: unknown) => T | undefined, key: (item: T) => unknown): T[] {
  const seen = new Set<unknown>();
  return listOf(value, read).filter((item) => {
    const id = key(item);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function readCard(raw: unknown): LumiProductCard | undefined {
  if (!isObject(raw)) return undefined;
  // The bag and the wishlist need the product's id, so a card without one can't be used.
  const productId = filled(raw.productId);
  const slug = filled(raw.slug);
  const title = filled(raw.title);
  const price = readPrice(raw.price);
  const url = internalPath(raw.url);
  if (!productId || !slug || !title || !price || !url || typeof raw.fixedPrice !== "boolean" || typeof raw.inStock !== "boolean") return undefined;
  return { productId, slug, title, ...optional("image", imageUrl(raw.image)), price, fixedPrice: raw.fixedPrice, url, inStock: raw.inStock };
}

function readSize(raw: unknown): LumiSizeOption | undefined {
  if (!isObject(raw) || !isNumber(raw.size)) return undefined;
  const label = filled(raw.label);
  const price = readPrice(raw.price);
  return label && price && typeof raw.inStock === "boolean" ? { size: raw.size, label, price, inStock: raw.inStock } : undefined;
}

const readSizes = (raw: unknown) => uniqueListOf(raw, readSize, (size) => size.size);

/** One colour of a product with its own id, sizes, price and stock. */
function readVariant(raw: unknown): LumiVariant | undefined {
  if (!isObject(raw) || !Array.isArray(raw.sizes)) return undefined;
  const id = filled(raw.id);
  const title = filled(raw.title);
  const price = readPrice(raw.price);
  if (!id || !title || !price || typeof raw.inStock !== "boolean") return undefined;
  return {
    id,
    ...optional("colour", oneOf(COLOURS, raw.colour)),
    title,
    ...optional("image", imageUrl(raw.image)),
    price,
    inStock: raw.inStock,
    sizes: readSizes(raw.sizes),
  };
}

function readDetail(raw: unknown): LumiProductDetail | undefined {
  const card = readCard(raw);
  if (!card || !isObject(raw) || !Array.isArray(raw.colours) || !Array.isArray(raw.sizes)) return undefined;
  const priceHigh = readPrice(raw.priceHigh);
  // Every product comes with at least one colour to put in the bag.
  const variants = uniqueListOf(raw.variants, readVariant, (variant) => variant.id);
  if (!priceHigh || !variants.length) return undefined;
  const colours = uniqueListOf(raw.colours, (colour) => {
    if (!isObject(colour)) return undefined;
    const key = oneOf(COLOURS, colour.key);
    const name = filled(colour.name);
    return key && name ? { key, name } : undefined;
  }, (colour) => colour.key);
  return { ...card, priceHigh, colours, ...optional("material", filled(raw.material)), sizes: readSizes(raw.sizes), variants };
}

/** A block of a reply from the server; undefined when it isn't one the website can draw. */
function readServerBlock(raw: unknown): LumiServerBlock | undefined {
  if (!isObject(raw)) return undefined;
  switch (raw.type) {
    case "text": {
      const text = filled(raw.text);
      return text ? { type: "text", text } : undefined;
    }
    case "points": {
      const items = listOf(raw.items, filled);
      return items.length ? { type: "points", items } : undefined;
    }
    case "products": {
      const products = listOf(raw.products, readCard);
      return products.length ? { type: "products", products } : undefined;
    }
    case "product": {
      const product = readDetail(raw.product);
      return product ? { type: "product", product } : undefined;
    }
    case "compare": {
      const products = listOf(raw.products, readDetail);
      // With only one product left there is nothing to compare: show it on its own.
      if (products.length === 1) return { type: "product", product: products[0] };
      return products.length ? { type: "compare", products } : undefined;
    }
    case "links": {
      const links = listOf(raw.links, readLink);
      return links.length ? { type: "links", links } : undefined;
    }
    case "notice": {
      const text = filled(raw.text);
      return text ? { type: "notice", tone: raw.tone === "warning" ? "warning" : "info", text } : undefined;
    }
    default:
      return undefined;
  }
}

function readOrderSummary(raw: unknown): ChatOrderSummary | undefined {
  if (!isObject(raw)) return undefined;
  const id = filled(raw.id);
  const orderNumber = filled(raw.orderNumber);
  const createdAt = filled(raw.createdAt);
  const status = filled(raw.status);
  if (!id || !orderNumber || !createdAt || !status || !isNumber(raw.itemCount)) return undefined;
  return {
    id,
    orderNumber,
    createdAt,
    status,
    ...optional("total", readPrice(raw.total)),
    ...optional("currency", filled(raw.currency)),
    itemCount: raw.itemCount,
    ...optional("image", imageUrl(raw.image)),
  };
}

/** One order's status and tracking, from a saved chat. */
export function readOrderView(raw: unknown): ChatOrderView | undefined {
  if (!isObject(raw)) return undefined;
  const orderNumber = filled(raw.orderNumber);
  const status = filled(raw.status);
  const createdAt = filled(raw.createdAt);
  if (!orderNumber || !status || !createdAt) return undefined;
  const items = listOf(raw.items, (item) => {
    if (!isObject(item)) return undefined;
    const title = filled(item.title);
    const quantity = isNumber(item.quantity) && item.quantity > 0 ? item.quantity : 1;
    return title ? { title, quantity, ...optional("image", imageUrl(item.image)) } : undefined;
  });
  const update = isObject(raw.lastUpdate) ? raw.lastUpdate : {};
  const updateAt = filled(update.at);
  const updateText = filled(update.text);
  return {
    orderNumber,
    status,
    createdAt,
    items,
    ...optional("carrier", filled(raw.carrier)),
    ...optional("trackingNumber", filled(raw.trackingNumber)),
    ...optional("trackingUrl", webUrl(raw.trackingUrl)),
    ...optional("estimatedDelivery", filled(raw.estimatedDelivery)),
    ...optional("deliveredAt", filled(raw.deliveredAt)),
    ...optional("lastUpdate", updateAt && updateText ? { at: updateAt, text: updateText } : undefined),
    ...optional("url", internalPath(raw.url)),
  };
}

/** What a "cartAdded" block shows about the piece that went into the bag. */
function readBagItem(raw: unknown): Extract<LumiShopBlock, { type: "cartAdded" }>["item"] | undefined {
  if (!isObject(raw)) return undefined;
  const title = filled(raw.title);
  const price = readPrice(raw.price);
  if (!title || !price) return undefined;
  return {
    title,
    ...optional("variantTitle", filled(raw.variantTitle)),
    ...optional("sizeLabel", filled(raw.sizeLabel)),
    ...optional("image", imageUrl(raw.image)),
    price,
    quantity: isNumber(raw.quantity) && raw.quantity >= 1 ? Math.floor(raw.quantity) : 1,
  };
}

/** A shopping block (bag, wishlist, gift finder), as kept in a saved chat. The bag and wishlist are drawn live, so they carry nothing. */
function readShopBlock(raw: Json): LumiShopBlock | undefined {
  switch (raw.type) {
    case "cartAdded": {
      const item = readBagItem(raw.item);
      return item ? { type: "cartAdded", item } : undefined;
    }
    case "bag":
      return { type: "bag" };
    case "wishlist":
      return { type: "wishlist" };
    case "giftFinder": {
      const answers = mergeGiftAnswers({}, isObject(raw.answers) ? raw.answers : {});
      const step = isNumber(raw.step) && Number.isInteger(raw.step) && raw.step >= 0 && raw.step <= LAST_GIFT_STEP ? raw.step : 0;
      return { type: "giftFinder", step, answers, ...optional("done", raw.done === true || undefined) };
    }
    default:
      return undefined;
  }
}

/** A block the website made itself (orders, forms, gift card balances), as kept in a saved chat. */
function readClientBlock(raw: Json): LumiClientBlock | undefined {
  switch (raw.type) {
    case "orders": {
      const orders = listOf(raw.orders, readOrderSummary);
      return orders.length ? { type: "orders", orders, ...optional("more", readLink(raw.more)) } : undefined;
    }
    case "order": {
      const order = readOrderView(raw.order);
      return order ? { type: "order", order } : undefined;
    }
    case "messageForm":
      return { type: "messageForm", ...optional("done", raw.done === true || undefined) };
    case "giftBalances": {
      const cards = listOf(raw.cards, (card) => {
        if (!isObject(card)) return undefined;
        const code = filled(card.code);
        const balance = filled(card.balance);
        return code && balance ? { code, balance } : undefined;
      });
      return cards.length ? { type: "giftBalances", cards } : undefined;
    }
    default:
      return undefined;
  }
}

/** Any block of a saved chat: the server's kinds and the website's own. */
export function readBlock(raw: unknown): LumiBlock | undefined {
  return readServerBlock(raw) ?? (isObject(raw) ? readClientBlock(raw) ?? readShopBlock(raw) : undefined);
}

/** Up to 3 follow-up questions; ids missing from the website's library have no text to show. */
export function knownFollowUps(raw: unknown): string[] {
  const ids = listOf(raw, (id) => (typeof id === "string" && findLumiSuggestion(id) ? id : undefined));
  return [...new Set(ids)].slice(0, 3);
}

function readAction(raw: unknown): LumiAction | undefined {
  if (!isObject(raw)) return undefined;
  const type = oneOf(ACTIONS, raw.type);
  const orderNumber = filled(raw.orderNumber)?.slice(0, 30);
  // The product is loaded by this slug, so only a real slug is kept.
  const productSlug = filled(raw.productSlug);
  return type
    ? { type, ...optional("orderNumber", orderNumber), ...optional("productSlug", isProductSlug(productSlug) ? productSlug : undefined) }
    : undefined;
}

/** The fields every answer and action carries. They only describe the reply, so odd values get safe defaults. */
function readCommon(raw: Json, locale: LumiLocale) {
  return {
    id: typeof raw.id === "string" ? raw.id : "",
    tool: oneOf(TOOLS, raw.tool) ?? "ask_question",
    source: oneOf(SOURCES, raw.source) ?? "ai",
    language: oneOf(LOCALES, raw.language) ?? locale,
    remaining: isNumber(raw.remaining) && raw.remaining > 0 ? Math.floor(raw.remaining) : 0,
  };
}

/**
 * The reply in POST /api/chat's `data`, checked against the contract. Unknown
 * kinds, actions the website can't open and answers with nothing left to
 * show become "unavailable".
 */
export function readLumiReply(raw: unknown, locale: LumiLocale): LumiReply {
  if (!isObject(raw)) return { kind: "unavailable" };
  switch (raw.kind) {
    case "answer": {
      const blocks = listOf(raw.blocks, readServerBlock);
      if (!blocks.length) return { kind: "unavailable" };
      return { kind: "answer", ...readCommon(raw, locale), blocks, followUps: knownFollowUps(raw.followUps) };
    }
    case "action": {
      const action = readAction(raw.action);
      return action ? { kind: "action", ...readCommon(raw, locale), action } : { kind: "unavailable" };
    }
    case "limit":
      return { kind: "limit", tier: oneOf(TIERS, raw.tier) ?? "visitor" };
    case "botCheck":
      return { kind: "botCheck" };
    default:
      return { kind: "unavailable" };
  }
}
