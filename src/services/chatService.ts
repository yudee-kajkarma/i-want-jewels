import { authApiClient } from "./apiClient";
import type { Price } from "../utils/price";
import type { ChatOrderView } from "../components/chat/ChatCards";

export type ChatLink = { title: string; url: string };
export type ChatTurn = { role: "user" | "assistant"; content: string };
/** A product card: photo, name and price, read from the shop's database. */
export type ChatProduct = { slug: string; title: string; image?: string; price?: Price; url: string; /** One fixed price (gift cards), not "from". */ fixedPrice?: boolean };
/** What the assistant asks the chat to open next. */
export type ChatAction = { type: "my_orders" | "order_status" | "talk_to_person"; orderNumber?: string };

export type ChatReply =
  | { kind: "answer"; answer: string; links: ChatLink[]; products: ChatProduct[]; action?: ChatAction; from: "saved" | "ai"; remaining?: number }
  | { kind: "limit"; tier: "visitor" | "loggedIn" | "customer" }
  | { kind: "unavailable" }
  | { kind: "botCheck" };

type ChatApiData = {
  answer?: string;
  links?: ChatLink[];
  products?: ChatProduct[];
  action?: ChatAction;
  from?: "saved" | "ai";
  remaining?: number;
  limitReached?: boolean;
  tier?: "visitor" | "loggedIn" | "customer";
  unavailable?: boolean;
  chatPass?: string;
};

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

/** Whether this visitor still needs the bot check before their next message. */
export function needsBotCheck(isAuthenticated: boolean): boolean {
  return !isAuthenticated && !readPass();
}

/**
 * Sends one chat message to the backend (POST /api/chat). Logged-in shoppers
 * are recognised by their login token, which `authApiClient` attaches.
 */
export async function sendChatMessage(input: {
  message: string;
  locale: string;
  history: ChatTurn[];
  botToken?: string;
}): Promise<ChatReply> {
  try {
    const response = await authApiClient.post<{ success: boolean; data: ChatApiData }>("/chat", {
      message: input.message,
      locale: input.locale,
      history: input.history.slice(-4).map((t) => ({ ...t, content: t.content.slice(0, 300) })),
      chatPass: readPass(),
      botToken: input.botToken,
    });
    const data = response.data.data;
    if (data.chatPass) storePass(data.chatPass);

    if (data.limitReached) return { kind: "limit", tier: data.tier ?? "visitor" };
    if (data.unavailable || !data.answer) return { kind: "unavailable" };
    return {
      kind: "answer",
      answer: data.answer,
      links: data.links ?? [],
      products: data.products ?? [],
      action: data.action,
      from: data.from ?? "ai",
      remaining: data.remaining,
    };
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 403) {
      try { sessionStorage.removeItem(PASS_KEY); } catch { /* ignore */ }
      return { kind: "botCheck" };
    }
    return { kind: "unavailable" };
  }
}

/**
 * "Track my order" for guests: finds an order by its number and checkout email
 * (POST /api/chat/order-lookup). Signed-in customers use getOrders instead.
 */
export async function lookupGuestOrder(input: {
  orderNumber: string;
  email: string;
  botToken?: string;
}): Promise<{ kind: "found"; order: ChatOrderView } | { kind: "notFound" } | { kind: "botCheck" } | { kind: "failed" }> {
  try {
    const response = await authApiClient.post<{ success: boolean; data: { order?: ChatOrderView; notFound?: boolean; chatPass?: string } }>(
      "/chat/order-lookup",
      { orderNumber: input.orderNumber, email: input.email, chatPass: readPass(), botToken: input.botToken },
    );
    const data = response.data.data;
    if (data.chatPass) storePass(data.chatPass);
    return data.order ? { kind: "found", order: data.order } : { kind: "notFound" };
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 403) {
      try { sessionStorage.removeItem(PASS_KEY); } catch { /* ignore */ }
      return { kind: "botCheck" };
    }
    return { kind: "failed" };
  }
}
