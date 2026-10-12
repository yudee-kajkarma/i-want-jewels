import { adminApiClient } from './apiClient'

/**
 * Admin → Chatbot keys: the chat assistant's (Jules's) AI providers, models,
 * embeddings and daily limits.
 *
 * API keys are secrets. They only ever travel browser → server, in a request
 * body (never in a URL), and the server never sends a saved key back — only
 * its last 4 characters. Nothing here stores or logs a key.
 */

export const AI_PROVIDER_IDS = ['alibaba', 'openai', 'anthropic'] as const
export type ProviderId = (typeof AI_PROVIDER_IDS)[number]
export type EmbeddingProviderId = 'alibaba' | 'openai'

export type ProviderView = {
  configured: boolean
  keyLast4?: string
  /** A key is saved but the server can't decrypt it (e.g. the encryption secret changed). */
  keyUnreadable?: boolean
  models: string[]
  /** Alibaba only. */
  baseUrl?: string
}

export type AiLimits = {
  guestQuestions: number
  guestAnswers: number
  loggedInAnswers: number
  customerAnswers: number
  shopAnswers: number
}

export type AiEmbeddingSettings = {
  provider: EmbeddingProviderId
  model: string
  dimensions: number
}

export type AiSettingsView = {
  providers: Record<ProviderId, ProviderView>
  /** Chat fallback order, all three ids. */
  order: ProviderId[]
  embedding: AiEmbeddingSettings
  limits: AiLimits
  updatedAt?: string
  updatedBy?: string
}

export type ProviderUpdate = {
  /** A new key; omit to keep the saved one. Never send an empty string. */
  apiKey?: string
  removeKey?: boolean
  models?: string[]
  baseUrl?: string
}

export type AiSettingsUpdate = {
  providers?: Partial<Record<ProviderId, ProviderUpdate>>
  order?: ProviderId[]
  embedding?: AiEmbeddingSettings
  limits?: Partial<AiLimits>
}

export type AiProviderTestRequest = {
  provider: ProviderId
  /** The key typed in the form; omit to test the saved key. */
  apiKey?: string
  models?: string[]
  baseUrl?: string
}

export type AiProviderTestResult = {
  ok: boolean
  model?: string
  message: string
}

type ApiEnvelope<T> = {
  success?: boolean
  data?: T
  message?: string
  error?: { code?: string; message?: string; field?: string }
}

const DEFAULT_LIMITS: AiLimits = {
  guestQuestions: 2,
  guestAnswers: 5,
  loggedInAnswers: 40,
  customerAnswers: 80,
  shopAnswers: 4000,
}

const DEFAULT_EMBEDDING: AiEmbeddingSettings = {
  provider: 'alibaba',
  model: 'text-embedding-v4',
  dimensions: 1024,
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isProviderId(value: unknown): value is ProviderId {
  return typeof value === 'string' && (AI_PROVIDER_IDS as readonly string[]).includes(value)
}

function toStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function toCount(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function normalizeProvider(value: unknown): ProviderView {
  const record = isRecord(value) ? value : {}

  return {
    configured: record.configured === true,
    keyLast4: typeof record.keyLast4 === 'string' ? record.keyLast4 : undefined,
    keyUnreadable: record.keyUnreadable === true,
    models: toStringList(record.models),
    baseUrl: typeof record.baseUrl === 'string' ? record.baseUrl : undefined,
  }
}

/** Fills in anything missing so the page can always render all three providers. */
export function normalizeAiSettings(value: unknown): AiSettingsView {
  const record = isRecord(value) ? value : {}
  const providers = isRecord(record.providers) ? record.providers : {}
  const embedding = isRecord(record.embedding) ? record.embedding : {}
  const limits = isRecord(record.limits) ? record.limits : {}

  // Keep the server's order, drop unknown/duplicate ids, and append any missing one.
  const order: ProviderId[] = []
  for (const id of Array.isArray(record.order) ? record.order : []) {
    if (isProviderId(id) && !order.includes(id)) order.push(id)
  }
  for (const id of AI_PROVIDER_IDS) {
    if (!order.includes(id)) order.push(id)
  }

  return {
    providers: {
      alibaba: normalizeProvider(providers.alibaba),
      openai: normalizeProvider(providers.openai),
      anthropic: normalizeProvider(providers.anthropic),
    },
    order,
    embedding: {
      provider: embedding.provider === 'openai' ? 'openai' : DEFAULT_EMBEDDING.provider,
      model: typeof embedding.model === 'string' ? embedding.model : DEFAULT_EMBEDDING.model,
      dimensions: toCount(embedding.dimensions, DEFAULT_EMBEDDING.dimensions),
    },
    limits: {
      guestQuestions: toCount(limits.guestQuestions, DEFAULT_LIMITS.guestQuestions),
      guestAnswers: toCount(limits.guestAnswers, DEFAULT_LIMITS.guestAnswers),
      loggedInAnswers: toCount(limits.loggedInAnswers, DEFAULT_LIMITS.loggedInAnswers),
      customerAnswers: toCount(limits.customerAnswers, DEFAULT_LIMITS.customerAnswers),
      shopAnswers: toCount(limits.shopAnswers, DEFAULT_LIMITS.shopAnswers),
    },
    updatedAt: typeof record.updatedAt === 'string' ? record.updatedAt : undefined,
    updatedBy: typeof record.updatedBy === 'string' ? record.updatedBy : undefined,
  }
}

function unwrap<T>(body: ApiEnvelope<T>, fallback: string): T {
  if (body?.success === false || body?.data === undefined) {
    throw new Error(body?.error?.message || body?.message || fallback)
  }

  return body.data
}

export async function getAiSettings(): Promise<AiSettingsView> {
  const response = await adminApiClient.get<ApiEnvelope<unknown>>('/admin/ai-settings')
  return normalizeAiSettings(unwrap(response.data, 'Unable to load the chatbot settings.'))
}

export async function updateAiSettings(update: AiSettingsUpdate): Promise<AiSettingsView> {
  const response = await adminApiClient.put<ApiEnvelope<unknown>>('/admin/ai-settings', update)
  return normalizeAiSettings(unwrap(response.data, 'Unable to save the chatbot settings.'))
}

export async function testAiProvider(request: AiProviderTestRequest): Promise<AiProviderTestResult> {
  const response = await adminApiClient.post<ApiEnvelope<AiProviderTestResult>>('/admin/ai-settings/test', request, {
    // A slow model can take a while to answer the test prompt.
    timeout: 60_000,
  })
  const data = unwrap(response.data, 'Unable to test this provider.')

  return {
    ok: data.ok === true,
    model: typeof data.model === 'string' ? data.model : undefined,
    message: typeof data.message === 'string' ? data.message : '',
  }
}
