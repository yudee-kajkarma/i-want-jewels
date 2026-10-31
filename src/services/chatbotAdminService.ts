import { adminApiClient } from './apiClient'

/**
 * Admin → Chatbot: Jules's conversations (read only), the knowledge it answers
 * from (status, estimate, update) and "Test a question". Backend routes in
 * src/routes/chatAdminRoutes.ts.
 */

type ApiEnvelope<T> = { success?: boolean; data?: T; message?: string; error?: { code?: string; message?: string } }

function unwrap<T>(body: ApiEnvelope<T>, fallback: string): T {
  if (body?.success === false || body?.data === undefined) throw new Error(body?.error?.message || body?.message || fallback)
  return body.data
}

// ---------------------------------------------------------------------------
// Conversations
// ---------------------------------------------------------------------------

export const CONVERSATION_FILTERS = ['all', 'up', 'down', 'person'] as const
export type ConversationFilter = (typeof CONVERSATION_FILTERS)[number]

export type ChatCustomer =
  | { kind: 'account'; id: string; name: string; email?: string }
  | { kind: 'guest'; label: string }

export type ConversationRow = {
  key: string
  customer: ChatCustomer
  firstQuestion: string
  firstAt: string
  lastAt: string
  questions: number
  locale: string
  ups: number
  downs: number
  askedForPerson: boolean
}

export type ConversationPage = { rows: ConversationRow[]; total: number; page: number; pageSize: number }

export type ConversationMessage = {
  at: string
  locale: string
  question: string
  answer?: string
  outcome: string
  tool?: string
  suggestion?: string
  usedAI: boolean
  aiModel?: string
  tokens?: number
  feedback?: 'up' | 'down'
  productSlug?: string
  shown?: { products: Array<{ slug: string; title: string }>; links: Array<{ title: string; url: string }>; action?: string }
}

export type Conversation = { customer: ChatCustomer; tier: string; messages: ConversationMessage[] }

export async function listConversations(query: { q?: string; show?: ConversationFilter; page?: number }): Promise<ConversationPage> {
  const params: Record<string, string | number> = {}
  if (query.q?.trim()) params.q = query.q.trim()
  if (query.show && query.show !== 'all') params.show = query.show
  if (query.page && query.page > 1) params.page = query.page
  const response = await adminApiClient.get<ApiEnvelope<ConversationPage>>('/admin/chatbot/conversations', { params })
  return unwrap(response.data, 'Unable to load the conversations.')
}

export async function getConversation(key: string): Promise<Conversation> {
  const response = await adminApiClient.get<ApiEnvelope<Conversation>>(`/admin/chatbot/conversations/${encodeURIComponent(key)}`)
  return unwrap(response.data, 'Unable to load the conversation.')
}

// ---------------------------------------------------------------------------
// Knowledge
// ---------------------------------------------------------------------------

export const KNOWLEDGE_SOURCES = ['product', 'blog', 'guide', 'faq'] as const
export type KnowledgeSource = (typeof KNOWLEDGE_SOURCES)[number]

export type KnowledgeRun = {
  status: 'idle' | 'running' | 'done' | 'failed' | 'interrupted'
  trigger?: string
  by?: string
  phase?: 'reading' | 'embedding' | 'cleaning'
  total: number
  done: number
  removed: number
  tokens: number
  contentFrom?: string
  error?: string
  startedAt?: string
  finishedAt?: string
}

export type KnowledgeOverview = {
  sources: Array<{ source: KnowledgeSource; pieces: number; items: number; updatedAt?: string }>
  pieces: number
  embedding: { provider: string; model: string; dimensions: number; configured: boolean }
  index: string
  contentUrl?: string
  run: KnowledgeRun
}

export type KnowledgeEstimate = {
  sources: Record<KnowledgeSource, { pieces: number; toEmbed: number; toRemove: number }>
  toEmbed: number
  toRemove: number
  estimatedTokens: number
  contentFrom: string
  model: string
}

export type TestPiece = { title: string; url: string; score: number; excerpt: string; used: boolean; linked: boolean }
export type TestResult = { englishText: string; pieces: TestPiece[] }

export async function getKnowledge(): Promise<KnowledgeOverview> {
  const response = await adminApiClient.get<ApiEnvelope<KnowledgeOverview>>('/admin/chatbot/knowledge')
  return unwrap(response.data, 'Unable to load the knowledge.')
}

export async function getKnowledgeRun(): Promise<KnowledgeRun> {
  const response = await adminApiClient.get<ApiEnvelope<KnowledgeRun>>('/admin/chatbot/knowledge/update')
  return unwrap(response.data, 'Unable to load the update status.')
}

export async function estimateKnowledge(): Promise<KnowledgeEstimate> {
  // Reading the website's content file and every product can take a while.
  const response = await adminApiClient.get<ApiEnvelope<KnowledgeEstimate>>('/admin/chatbot/knowledge/estimate', { timeout: 90_000 })
  return unwrap(response.data, 'Unable to estimate the update.')
}

export async function startKnowledgeUpdate(): Promise<KnowledgeRun> {
  const response = await adminApiClient.post<ApiEnvelope<KnowledgeRun>>('/admin/chatbot/knowledge/update', {})
  return unwrap(response.data, 'Unable to start the update.')
}

export async function testKnowledge(question: string, language: string): Promise<TestResult> {
  const response = await adminApiClient.post<ApiEnvelope<TestResult>>('/admin/chatbot/knowledge/try', { question, language }, { timeout: 60_000 })
  return unwrap(response.data, 'Unable to search the knowledge.')
}

/** The server's error message for a failed request, when it sent one. */
export function apiErrorMessage(error: unknown, fallback: string): string {
  const body = (error as { response?: { data?: ApiEnvelope<unknown> } })?.response?.data
  return body?.error?.message || body?.message || (error instanceof Error && !('response' in (error as object)) ? error.message : '') || fallback
}
