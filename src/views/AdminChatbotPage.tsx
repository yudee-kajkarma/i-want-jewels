'use client'

import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {
  ArrowDown,
  ArrowUp,
  Bot,
  Check,
  Eye,
  EyeOff,
  Gauge,
  KeyRound,
  ListOrdered,
  LoaderCircle,
  PlugZap,
  RotateCw,
  Save,
  Search,
  Trash2,
  TriangleAlert,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import {
  AI_PROVIDER_IDS,
  getAiSettings,
  testAiProvider,
  updateAiSettings,
  type AiLimits,
  type AiProviderTestResult,
  type AiSettingsUpdate,
  type AiSettingsView,
  type EmbeddingProviderId,
  type ProviderId,
  type ProviderUpdate,
} from '../services/aiSettingsService'
import { formatDateTime } from '../utils/formatDate'

/*
 * Admin → Chatbot keys. API keys are secrets: they are only ever held in this
 * component's state while the admin types them, sent once in a request body,
 * and cleared after saving, when the page is left and when it is hidden. They
 * are never written to storage, logs or URLs, and the server never sends a
 * saved key back (only its last 4 characters).
 */

type ChatbotT = TFunction<'common', 'admin.chatbot'>
type LimitKey = keyof AiLimits

type ProviderDraft = { models: string; baseUrl: string }

type Draft = {
  providers: Record<ProviderId, ProviderDraft>
  order: ProviderId[]
  embedding: { provider: EmbeddingProviderId; model: string; dimensions: string }
  limits: Record<LimitKey, string>
}

type KeyInputs = Record<ProviderId, string>

type TestState = { status: 'idle' } | { status: 'testing' } | { status: 'done'; result: AiProviderTestResult }

const EMPTY_KEYS: KeyInputs = { alibaba: '', openai: '', anthropic: '' }
const HIDDEN_KEYS: Record<ProviderId, boolean> = { alibaba: false, openai: false, anthropic: false }
const IDLE_TESTS: Record<ProviderId, TestState> = {
  alibaba: { status: 'idle' },
  openai: { status: 'idle' },
  anthropic: { status: 'idle' },
}

const EMBEDDING_PROVIDERS: EmbeddingProviderId[] = ['alibaba', 'openai']

const MODEL_PLACEHOLDERS: Record<ProviderId, string> = {
  alibaba: 'qwen3.8-flash, qwen3.7-flash, deepseek-v4-flash',
  openai: 'gpt-5-mini, gpt-5-nano',
  anthropic: 'claude-haiku-4-5, claude-sonnet-4-5',
}

const EMBEDDING_MODEL_PLACEHOLDERS: Record<EmbeddingProviderId, string> = {
  alibaba: 'text-embedding-v4',
  openai: 'text-embedding-3-small',
}

const ALIBABA_ENDPOINT_EXAMPLE = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'
const BUILD_KNOWLEDGE_COMMAND = 'npm run chat:build-knowledge'

/** Values from the server (key endings, names, dates) shown as typed; React escapes them already. */
const AS_TYPED = { interpolation: { escapeValue: false } } as const

// Bounds match the server's checks, so mistakes are caught before sending.
const LIMIT_FIELDS: Array<{ key: LimitKey; min: number; max: number }> = [
  { key: 'guestQuestions', min: 0, max: 1_000 },
  { key: 'guestAnswers', min: 0, max: 1_000 },
  { key: 'loggedInAnswers', min: 0, max: 100_000 },
  { key: 'customerAnswers', min: 0, max: 100_000 },
  { key: 'shopAnswers', min: 0, max: 1_000_000 },
]
const DIMENSIONS_MIN = 64
const DIMENSIONS_MAX = 4096
const MODEL_NAME = /^[A-Za-z0-9._:/@-]{1,100}$/
const API_KEY_MIN_LENGTH = 8

const inputClass = 'w-full border border-[#e5d7cc] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#b88a65]'
const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 border border-[#e5d7cc] bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[#3c2b20]'

type ApiErrorBody = {
  message?: string
  error?: {
    message?: string
  }
}

function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.error?.message || error.response?.data?.message || fallback
  }

  return error instanceof Error && error.message ? error.message : fallback
}

/** "a, b,, a , c" → ["a", "b", "c"]: trimmed, no empties, no duplicates, order kept. */
function parseModels(text: string): string[] {
  const models: string[] = []

  for (const part of text.split(/[,\n]/)) {
    const model = part.trim()
    if (model && !models.includes(model)) {
      models.push(model)
    }
  }

  return models
}

function sameList(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((item, index) => item === b[index])
}

/** A whole number written with digits only, or null. */
function parseWholeNumber(text: string): number | null {
  const value = text.trim()
  return /^\d+$/.test(value) ? Number(value) : null
}

/** An https address on aliyuncs.com, the only kind the server accepts for Alibaba. */
function isAlibabaUrl(text: string): boolean {
  try {
    const url = new URL(text)
    return url.protocol === 'https:'
      && (url.hostname === 'aliyuncs.com' || url.hostname.endsWith('.aliyuncs.com'))
      && !url.username
      && !url.password
  } catch {
    return false
  }
}

function hasReadableSavedKey(view: AiSettingsView, id: ProviderId): boolean {
  const saved = view.providers[id]
  return saved.configured && !saved.keyUnreadable
}

function limitsToDraft(limits: AiLimits): Record<LimitKey, string> {
  return {
    guestQuestions: String(limits.guestQuestions),
    guestAnswers: String(limits.guestAnswers),
    loggedInAnswers: String(limits.loggedInAnswers),
    customerAnswers: String(limits.customerAnswers),
    shopAnswers: String(limits.shopAnswers),
  }
}

function providerDraftFromView(view: AiSettingsView, id: ProviderId): ProviderDraft {
  return {
    models: view.providers[id].models.join(', '),
    baseUrl: view.providers[id].baseUrl ?? '',
  }
}

function draftFromView(view: AiSettingsView): Draft {
  return {
    providers: {
      alibaba: providerDraftFromView(view, 'alibaba'),
      openai: providerDraftFromView(view, 'openai'),
      anthropic: providerDraftFromView(view, 'anthropic'),
    },
    order: [...view.order],
    embedding: {
      provider: view.embedding.provider,
      model: view.embedding.model,
      dimensions: String(view.embedding.dimensions),
    },
    limits: limitsToDraft(view.limits),
  }
}

/** Only what differs from the saved settings. A key is sent only when one was typed. */
function collectChanges(view: AiSettingsView, draft: Draft, keys: KeyInputs): AiSettingsUpdate {
  const update: AiSettingsUpdate = {}
  const providers: NonNullable<AiSettingsUpdate['providers']> = {}

  for (const id of AI_PROVIDER_IDS) {
    const saved = view.providers[id]
    const change: ProviderUpdate = {}
    const apiKey = keys[id].trim()
    const models = parseModels(draft.providers[id].models)

    if (apiKey) {
      change.apiKey = apiKey
    }

    if (!sameList(models, saved.models)) {
      change.models = models
    }

    if (id === 'alibaba') {
      const baseUrl = draft.providers[id].baseUrl.trim()
      if (baseUrl !== (saved.baseUrl ?? '')) {
        change.baseUrl = baseUrl
      }
    }

    if (Object.keys(change).length > 0) {
      providers[id] = change
    }
  }

  if (Object.keys(providers).length > 0) {
    update.providers = providers
  }

  if (!sameList(draft.order, view.order)) {
    update.order = [...draft.order]
  }

  const embeddingModel = draft.embedding.model.trim()
  if (
    draft.embedding.provider !== view.embedding.provider
    || embeddingModel !== view.embedding.model
    || draft.embedding.dimensions.trim() !== String(view.embedding.dimensions)
  ) {
    update.embedding = {
      provider: draft.embedding.provider,
      model: embeddingModel,
      dimensions: Number(draft.embedding.dimensions.trim()),
    }
  }

  const limits: NonNullable<AiSettingsUpdate['limits']> = {}
  for (const { key } of LIMIT_FIELDS) {
    if (draft.limits[key].trim() !== String(view.limits[key])) {
      limits[key] = Number(draft.limits[key].trim())
    }
  }

  if (Object.keys(limits).length > 0) {
    update.limits = limits
  }

  return update
}

/** The first problem with the changes, in words for the admin, or null. */
function validateChanges(view: AiSettingsView, draft: Draft, keys: KeyInputs, t: ChatbotT): string | null {
  const update = collectChanges(view, draft, keys)

  for (const id of AI_PROVIDER_IDS) {
    const change = update.providers?.[id]
    if (!change) continue

    const provider = t(`providerNames.${id}`)

    if (change.apiKey && (change.apiKey.length < API_KEY_MIN_LENGTH || /\s/.test(change.apiKey))) {
      return t('errors.keyInvalid', { provider, ...AS_TYPED })
    }

    const willHaveKey = Boolean(change.apiKey) || hasReadableSavedKey(view, id)
    const models = change.models ?? view.providers[id].models

    if (willHaveKey && models.length === 0) {
      return t('errors.modelsRequired', { provider, ...AS_TYPED })
    }

    const badModel = change.models?.find((model) => !MODEL_NAME.test(model))
    if (badModel) {
      return t('errors.modelInvalid', { model: badModel, ...AS_TYPED })
    }

    if (change.baseUrl !== undefined && !isAlibabaUrl(change.baseUrl)) {
      return t('errors.endpointInvalid')
    }
  }

  if (update.embedding) {
    if (!update.embedding.model) {
      return t('errors.embeddingModelRequired')
    }

    if (!MODEL_NAME.test(update.embedding.model)) {
      return t('errors.modelInvalid', { model: update.embedding.model, ...AS_TYPED })
    }

    const dimensions = parseWholeNumber(draft.embedding.dimensions)
    if (dimensions === null || dimensions < DIMENSIONS_MIN || dimensions > DIMENSIONS_MAX) {
      return t('errors.dimensionsInvalid', { min: DIMENSIONS_MIN, max: DIMENSIONS_MAX })
    }
  }

  for (const { key, min, max } of LIMIT_FIELDS) {
    if (update.limits?.[key] === undefined) continue

    const value = parseWholeNumber(draft.limits[key])
    if (value === null || value < min || value > max) {
      return t('errors.limitInvalid', { label: t(`limits.${key}`), min, max, ...AS_TYPED })
    }
  }

  return null
}

export default function AdminChatbotPage() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.chatbot' })
  const [view, setView] = useState<AiSettingsView | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [keys, setKeys] = useState<KeyInputs>(EMPTY_KEYS)
  const [visibleKeys, setVisibleKeys] = useState<Record<ProviderId, boolean>>(HIDDEN_KEYS)
  const [tests, setTests] = useState<Record<ProviderId, TestState>>(IDLE_TESTS)
  const [confirmRemove, setConfirmRemove] = useState<ProviderId | null>(null)
  const [removing, setRemoving] = useState<ProviderId | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [reloadCount, setReloadCount] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadSettings() {
      setIsLoading(true)
      setLoadError(null)

      try {
        const settings = await getAiSettings()
        if (!mounted) return
        setView(settings)
        setDraft(draftFromView(settings))
      } catch (loadFailure) {
        if (!mounted) return
        // Empty = show the translated default message.
        setLoadError(getApiErrorMessage(loadFailure, ''))
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    void loadSettings()

    return () => {
      mounted = false
    }
  }, [reloadCount])

  // Typed keys must not outlive the page: wipe them when the tab is put away
  // (back/forward cache) and when the page is left.
  useEffect(() => {
    const clearKeys = () => {
      setKeys(EMPTY_KEYS)
      setVisibleKeys(HIDDEN_KEYS)
    }

    window.addEventListener('pagehide', clearKeys)

    return () => {
      window.removeEventListener('pagehide', clearKeys)
      clearKeys()
    }
  }, [])

  const changes = useMemo(() => (view && draft ? collectChanges(view, draft, keys) : {}), [view, draft, keys])
  const hasChanges = Object.keys(changes).length > 0

  function providerName(id: ProviderId): string {
    return t(`providerNames.${id}`)
  }

  function updateProviderDraft(id: ProviderId, field: keyof ProviderDraft, value: string) {
    setDraft((current) => current && {
      ...current,
      providers: { ...current.providers, [id]: { ...current.providers[id], [field]: value } },
    })
    setTests((current) => ({ ...current, [id]: { status: 'idle' } }))
  }

  function updateKey(id: ProviderId, value: string) {
    setKeys((current) => ({ ...current, [id]: value }))
    setTests((current) => ({ ...current, [id]: { status: 'idle' } }))
  }

  function moveProvider(index: number, direction: -1 | 1) {
    setDraft((current) => {
      if (!current) return current
      const target = index + direction
      if (target < 0 || target >= current.order.length) return current
      const order = [...current.order]
      ;[order[index], order[target]] = [order[target], order[index]]
      return { ...current, order }
    })
  }

  async function handleTest(id: ProviderId) {
    if (!view || !draft || tests[id].status === 'testing') return

    const apiKey = keys[id].trim()
    const models = parseModels(draft.providers[id].models)
    const baseUrl = draft.providers[id].baseUrl.trim()

    setTests((current) => ({ ...current, [id]: { status: 'testing' } }))

    try {
      const result = await testAiProvider({
        provider: id,
        ...(apiKey ? { apiKey } : {}),
        ...(models.length > 0 ? { models } : {}),
        ...(id === 'alibaba' && baseUrl ? { baseUrl } : {}),
      })
      setTests((current) => ({ ...current, [id]: { status: 'done', result } }))
    } catch (testFailure) {
      setTests((current) => ({
        ...current,
        [id]: { status: 'done', result: { ok: false, message: getApiErrorMessage(testFailure, t('errorTest')) } },
      }))
    }
  }

  async function handleRemoveKey(id: ProviderId) {
    if (removing) return

    setRemoving(id)

    try {
      const settings = await updateAiSettings({ providers: { [id]: { removeKey: true } } })
      setView(settings)
      // Reset only this provider's fields; keep unsaved edits elsewhere on the page.
      setDraft((current) => current && {
        ...current,
        providers: { ...current.providers, [id]: providerDraftFromView(settings, id) },
      })
      setKeys((current) => ({ ...current, [id]: '' }))
      setVisibleKeys((current) => ({ ...current, [id]: false }))
      setTests((current) => ({ ...current, [id]: { status: 'idle' } }))
      setConfirmRemove(null)
      toast.success(t('toastRemoved', { provider: providerName(id), ...AS_TYPED }))
    } catch (removeFailure) {
      toast.error(getApiErrorMessage(removeFailure, t('errorRemove')))
    } finally {
      setRemoving(null)
    }
  }

  async function handleSave() {
    if (!view || !draft || isSaving) return

    const problem = validateChanges(view, draft, keys, t)
    if (problem) {
      setError(problem)
      toast.error(problem)
      return
    }

    const update = collectChanges(view, draft, keys)
    if (Object.keys(update).length === 0) {
      toast(t('noChanges'))
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const settings = await updateAiSettings(update)
      setView(settings)
      setDraft(draftFromView(settings))
      setKeys(EMPTY_KEYS)
      setVisibleKeys(HIDDEN_KEYS)
      setTests(IDLE_TESTS)
      setConfirmRemove(null)
      toast.success(t('toastSaved'))
    } catch (saveFailure) {
      const message = getApiErrorMessage(saveFailure, t('errorSave'))
      setError(message)
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  function renderStatus(id: ProviderId) {
    if (!view) return null
    const saved = view.providers[id]

    if (saved.keyUnreadable) {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
          <TriangleAlert className="h-3.5 w-3.5" />
          {t('status.unreadable')}
        </span>
      )
    }

    if (saved.configured) {
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#e6f4ec] px-2.5 py-1 text-xs font-semibold text-[#1f7a4d]">
          <Check className="h-3.5 w-3.5" />
          {saved.keyLast4 ? t('status.saved', { last4: saved.keyLast4, ...AS_TYPED }) : t('status.savedNoHint')}
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1.5 bg-[#f3eee9] px-2.5 py-1 text-xs font-semibold text-[#7a6a5a]">
        {t('status.notSet')}
      </span>
    )
  }

  function renderProviderCard(id: ProviderId) {
    if (!view || !draft) return null

    const saved = view.providers[id]
    const providerDraft = draft.providers[id]
    const typedKey = keys[id]
    const keyVisible = visibleKeys[id]
    const test = tests[id]
    const models = parseModels(providerDraft.models)
    const canTest = Boolean(typedKey.trim()) || hasReadableSavedKey(view, id)
    const canRemove = saved.configured || Boolean(saved.keyUnreadable)
    const missingModels = (Boolean(typedKey.trim()) || hasReadableSavedKey(view, id)) && models.length === 0
    const keyInputId = `chatbot-key-${id}`
    const modelsInputId = `chatbot-models-${id}`
    const endpointInputId = `chatbot-endpoint-${id}`

    return (
      <div key={id} className="flex flex-col border border-[#efe1d5] bg-[#fffdfa] p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-base font-bold text-[#17110d]">{providerName(id)}</h3>
          {renderStatus(id)}
        </div>

        <div className="mt-5 space-y-5">
          <div className="space-y-2 text-sm">
            <label htmlFor={keyInputId} className="font-semibold text-[#17110d]">{t('apiKey')}</label>
            <div className="relative" data-clarity-mask="true">
              <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                id={keyInputId}
                type={keyVisible ? 'text' : 'password'}
                value={typedKey}
                onChange={(event) => updateKey(id, event.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                data-1p-ignore="true"
                data-lpignore="true"
                data-form-type="other"
                className={`${inputClass} pl-10 pr-11 ${typedKey ? 'font-mono' : ''}`}
                placeholder={canRemove ? t('apiKeyPlaceholderReplace') : t('apiKeyPlaceholderNew')}
              />
              <button
                type="button"
                onClick={() => setVisibleKeys((current) => ({ ...current, [id]: !current[id] }))}
                aria-label={keyVisible ? t('hideKey') : t('showKey')}
                aria-pressed={keyVisible}
                title={keyVisible ? t('hideKey') : t('showKey')}
                className="absolute right-1 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center text-zinc-500 transition hover:text-[#17110d]"
              >
                {keyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {typedKey.trim() ? <p className="text-xs text-[#8b5f43]">{t('newKeyHint')}</p> : null}
          </div>

          <div className="space-y-2 text-sm">
            <label htmlFor={modelsInputId} className="font-semibold text-[#17110d]">{t('models')}</label>
            <input
              id={modelsInputId}
              type="text"
              value={providerDraft.models}
              onChange={(event) => updateProviderDraft(id, 'models', event.target.value)}
              autoComplete="off"
              spellCheck={false}
              className={`${inputClass} font-mono`}
              placeholder={MODEL_PLACEHOLDERS[id]}
            />
            <p className="text-xs text-zinc-500">{t('modelsHint')}</p>
            {models.length > 0 ? (
              <ol className="flex flex-wrap gap-1.5" aria-label={t('modelsOrder')}>
                {models.map((model, index) => (
                  <li key={model} className="inline-flex items-center gap-1 bg-[#fff2fa] px-2 py-0.5 font-mono text-[11px] text-[#8f2a60]">
                    <span className="font-bold">{index + 1}.</span>
                    {model}
                  </li>
                ))}
              </ol>
            ) : null}
            {missingModels ? <p className="text-xs font-semibold text-amber-700">{t('modelsMissing')}</p> : null}
          </div>

          {id === 'alibaba' ? (
            <div className="space-y-2 text-sm">
              <label htmlFor={endpointInputId} className="font-semibold text-[#17110d]">{t('endpoint')}</label>
              <input
                id={endpointInputId}
                type="url"
                inputMode="url"
                value={providerDraft.baseUrl}
                onChange={(event) => updateProviderDraft(id, 'baseUrl', event.target.value)}
                autoComplete="off"
                spellCheck={false}
                className={`${inputClass} font-mono`}
                placeholder={ALIBABA_ENDPOINT_EXAMPLE}
              />
              <p className="text-xs text-zinc-500">{t('endpointHint')}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-auto pt-5">
          {test.status === 'done' ? (
            <div
              role="status"
              className={`mb-3 flex items-start gap-2 border px-3 py-2 text-xs ${
                test.result.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'
              }`}
            >
              {test.result.ok ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
              <div className="min-w-0 break-words">
                <p className="font-semibold">
                  {test.result.ok ? t('testOk') : t('testFailed')}
                  {test.result.model ? <span className="font-normal"> · {t('testModel', { model: test.result.model, ...AS_TYPED })}</span> : null}
                </p>
                {test.result.message ? <p className="mt-0.5">{test.result.message}</p> : null}
              </div>
            </div>
          ) : null}

          {confirmRemove === id ? (
            <div className="border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              <p>{t('removeConfirm', { provider: providerName(id), ...AS_TYPED })}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void handleRemoveKey(id)}
                  disabled={removing !== null}
                  className="inline-flex items-center gap-2 bg-rose-700 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-rose-800 disabled:opacity-60"
                >
                  {removing === id ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  {removing === id ? t('removing') : t('removeYes')}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmRemove(null)}
                  disabled={removing !== null}
                  className={secondaryButtonClass}
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void handleTest(id)}
                disabled={!canTest || test.status === 'testing'}
                title={canTest ? undefined : t('testNeedsKey')}
                className={secondaryButtonClass}
              >
                {test.status === 'testing' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <PlugZap className="h-4 w-4" />}
                {test.status === 'testing' ? t('testing') : t('test')}
              </button>
              {canRemove ? (
                <button
                  type="button"
                  onClick={() => setConfirmRemove(id)}
                  className="inline-flex items-center justify-center gap-2 border border-rose-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-rose-700 transition hover:bg-rose-700 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  {t('removeKey')}
                </button>
              ) : null}
            </div>
          )}
          {!canTest ? <p className="mt-2 text-xs text-zinc-500">{t('testNeedsKey')}</p> : null}
        </div>
      </div>
    )
  }

  function renderOrder() {
    if (!view || !draft) return null

    const anyKey = AI_PROVIDER_IDS.some((id) => Boolean(keys[id].trim()) || hasReadableSavedKey(view, id))

    return (
      <section className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-[#8f2a60]" />
          <h2 className="text-lg font-bold text-[#17110d]">{t('order.title')}</h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">{t('order.hint')}</p>

        <ol className="mt-5 space-y-2">
          {draft.order.map((id, index) => {
            const typed = Boolean(keys[id].trim())
            const usable = typed || hasReadableSavedKey(view, id)
            const keyLabel = typed ? t('order.newKey') : usable ? t('order.hasKey') : t('order.noKey')

            return (
              <li
                key={id}
                className={`flex items-center gap-3 border px-3 py-2.5 ${usable ? 'border-[#e5d7cc] bg-white' : 'border-dashed border-[#e5d7cc] bg-[#fffdfa] text-zinc-400'}`}
              >
                <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold ${usable ? 'bg-[#111111] text-white' : 'bg-[#f3eee9] text-[#7a6a5a]'}`}>
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm font-semibold ${usable ? 'text-[#17110d]' : 'text-zinc-500'}`}>{providerName(id)}</p>
                  <p className={`text-xs ${usable ? 'text-[#1f7a4d]' : 'text-zinc-400'}`}>{keyLabel}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => moveProvider(index, -1)}
                    disabled={index === 0}
                    aria-label={t('order.moveUp', { provider: providerName(id), ...AS_TYPED })}
                    title={t('order.moveUp', { provider: providerName(id), ...AS_TYPED })}
                    className="inline-flex h-8 w-8 items-center justify-center border border-[#e5d7cc] bg-white text-[#3c2b20] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#3c2b20]"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveProvider(index, 1)}
                    disabled={index === draft.order.length - 1}
                    aria-label={t('order.moveDown', { provider: providerName(id), ...AS_TYPED })}
                    title={t('order.moveDown', { provider: providerName(id), ...AS_TYPED })}
                    className="inline-flex h-8 w-8 items-center justify-center border border-[#e5d7cc] bg-white text-[#3c2b20] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#3c2b20]"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              </li>
            )
          })}
        </ol>

        {!anyKey ? (
          <p className="mt-4 flex items-start gap-2 border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {t('order.noneWarning')}
          </p>
        ) : null}
      </section>
    )
  }

  function renderEmbedding() {
    if (!view || !draft) return null

    const embeddingProvider = draft.embedding.provider
    const embeddingHasKey = Boolean(keys[embeddingProvider].trim()) || hasReadableSavedKey(view, embeddingProvider)

    return (
      <section className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-[#8f2a60]" />
          <h2 className="text-lg font-bold text-[#17110d]">{t('embedding.title')}</h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">{t('embedding.hint')}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm sm:col-span-2">
            <span className="font-semibold text-[#17110d]">{t('embedding.provider')}</span>
            <select
              value={embeddingProvider}
              onChange={(event) => {
                const provider = event.target.value === 'openai' ? 'openai' : 'alibaba'
                setDraft((current) => current && { ...current, embedding: { ...current.embedding, provider } })
              }}
              className={inputClass}
            >
              {EMBEDDING_PROVIDERS.map((id) => (
                <option key={id} value={id}>{providerName(id)}</option>
              ))}
            </select>
            <span className="block text-xs text-zinc-500">{t('embedding.anthropicNote')}</span>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-semibold text-[#17110d]">{t('embedding.model')}</span>
            <input
              type="text"
              value={draft.embedding.model}
              onChange={(event) => {
                const model = event.target.value
                setDraft((current) => current && { ...current, embedding: { ...current.embedding, model } })
              }}
              autoComplete="off"
              spellCheck={false}
              className={`${inputClass} font-mono`}
              placeholder={EMBEDDING_MODEL_PLACEHOLDERS[embeddingProvider]}
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-semibold text-[#17110d]">{t('embedding.dimensions')}</span>
            <input
              type="number"
              inputMode="numeric"
              min={DIMENSIONS_MIN}
              max={DIMENSIONS_MAX}
              step={1}
              value={draft.embedding.dimensions}
              onChange={(event) => {
                const dimensions = event.target.value
                setDraft((current) => current && { ...current, embedding: { ...current.embedding, dimensions } })
              }}
              className={inputClass}
              placeholder="1024"
            />
            <span className="block text-xs text-zinc-500">{t('embedding.dimensionsHint')}</span>
          </label>
        </div>

        {!embeddingHasKey ? (
          <p className="mt-4 flex items-start gap-2 border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {t('embedding.noKey', { provider: providerName(embeddingProvider), ...AS_TYPED })}
          </p>
        ) : null}

        <div className={`mt-4 flex items-start gap-2 border px-3 py-2.5 text-xs ${changes.embedding ? 'border-amber-300 bg-amber-100 font-semibold text-amber-900' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{t('embedding.warning', { command: BUILD_KNOWLEDGE_COMMAND, ...AS_TYPED })}</p>
        </div>
      </section>
    )
  }

  function renderLimits() {
    if (!draft) return null

    return (
      <section className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-[#8f2a60]" />
          <h2 className="text-lg font-bold text-[#17110d]">{t('limits.title')}</h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">{t('limits.hint')}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {LIMIT_FIELDS.map(({ key, min, max }) => (
            <label key={key} className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-[#17110d]">{t(`limits.${key}`)}</span>
              <input
                type="number"
                inputMode="numeric"
                min={min}
                max={max}
                step={1}
                value={draft.limits[key]}
                onChange={(event) => {
                  const value = event.target.value
                  setDraft((current) => current && { ...current, limits: { ...current.limits, [key]: value } })
                }}
                className={inputClass}
              />
              <span className="text-xs text-zinc-500">{t(`limits.${key}Hint`)}</span>
            </label>
          ))}
        </div>
      </section>
    )
  }

  const lastUpdated = view?.updatedAt ? formatDateTime(view.updatedAt, i18n.language) : ''

  return (
    <div className="font-poppins min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center bg-[#fff2fa] text-[#8f2a60]">
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('breadcrumb')}</p>
              <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#17110d]">{t('title')}</h1>
            </div>
          </div>
          {lastUpdated ? (
            <p className="text-xs text-zinc-500">
              {view?.updatedBy
                ? t('lastUpdatedBy', { date: lastUpdated, who: view.updatedBy, ...AS_TYPED })
                : t('lastUpdated', { date: lastUpdated, ...AS_TYPED })}
            </p>
          ) : null}
        </div>
        <p className="mt-3 max-w-3xl text-sm text-zinc-600">{t('intro')}</p>

        {isLoading && !view ? (
          <section className="mt-8 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            <p className="text-sm text-zinc-500">{t('loading')}</p>
          </section>
        ) : null}

        {!isLoading && loadError !== null && !view ? (
          <section className="mt-8 border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
            <p>{loadError || t('errorLoad')}</p>
            <button type="button" onClick={() => setReloadCount((count) => count + 1)} className={`${secondaryButtonClass} mt-4`}>
              <RotateCw className="h-4 w-4" />
              {t('retry')}
            </button>
          </section>
        ) : null}

        {view && draft ? (
          <div className="mt-8 space-y-6">
            <section className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-[#8f2a60]" />
                <h2 className="text-lg font-bold text-[#17110d]">{t('providers.title')}</h2>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{t('providers.hint')}</p>
              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {AI_PROVIDER_IDS.map((id) => renderProviderCard(id))}
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              {renderOrder()}
              {renderEmbedding()}
            </div>

            {renderLimits()}

            <div className="sticky bottom-0 z-10 border border-[#eadfd4] bg-white/95 px-5 py-4 shadow-[0_-12px_40px_rgba(55,31,10,0.08)] backdrop-blur">
              {error ? (
                <div className="mb-3 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
              ) : null}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${hasChanges ? 'font-semibold text-[#8b5f43]' : 'text-zinc-500'}`}>
                  {hasChanges ? t('unsaved') : t('noChanges')}
                </p>
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={isSaving || !hasChanges}
                  className="inline-flex items-center gap-2 bg-[#111111] px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {isSaving ? t('saving') : t('save')}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
