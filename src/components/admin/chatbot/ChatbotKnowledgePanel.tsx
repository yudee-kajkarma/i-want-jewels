'use client'

import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { BookOpen, Check, FlaskConical, LoaderCircle, RefreshCw, Search, TriangleAlert, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import {
  apiErrorMessage,
  estimateKnowledge,
  getKnowledge,
  getKnowledgeRun,
  startKnowledgeUpdate,
  testKnowledge,
  KNOWLEDGE_SOURCES,
  type KnowledgeEstimate,
  type KnowledgeOverview,
  type KnowledgeRun,
  type TestResult,
} from '../../../services/chatbotAdminService'
import { formatDateTime } from '../../../utils/formatDate'

/*
 * Admin → Chatbot → Knowledge: what Jules answers from (pieces per source, the
 * search index), "Update knowledge" (estimate first, then confirm; the update
 * runs on the server and carries on if the admin leaves) and "Test a question"
 * (what Jules would find, without writing an answer).
 */

const AS_TYPED = { interpolation: { escapeValue: false } } as const
const POLL_MS = 2000
const LANGUAGES = ['en', 'de', 'nl', 'fr', 'it', 'es'] as const

const SECTION = 'border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8'
const BUTTON = 'inline-flex items-center justify-center gap-2 bg-[#17110d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f2a60] disabled:cursor-not-allowed disabled:opacity-50'
const BUTTON_LIGHT = 'inline-flex items-center justify-center gap-2 border border-[#eadfd4] bg-white px-5 py-3 text-sm font-bold text-[#17110d] transition hover:border-[#8f2a60] disabled:cursor-not-allowed disabled:opacity-50'

type Tone = 'good' | 'busy' | 'bad' | 'plain'

const TONES: Record<Tone, string> = {
  good: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  busy: 'border-amber-200 bg-amber-50 text-amber-800',
  bad: 'border-red-200 bg-red-50 text-red-700',
  plain: 'border-[#eadfd4] bg-[#fffdfa] text-zinc-700',
}

function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1.5 border px-3 py-1 text-xs font-semibold ${TONES[tone]}`}>{children}</span>
}

export default function ChatbotKnowledgePanel({ embeddingConfigured }: { embeddingConfigured?: boolean }) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.chatbot.knowledge' })
  const [overview, setOverview] = useState<KnowledgeOverview | null>(null)
  const [run, setRun] = useState<KnowledgeRun | null>(null)
  const [loadError, setLoadError] = useState('')
  const [estimate, setEstimate] = useState<KnowledgeEstimate | null>(null)
  const [isEstimating, setIsEstimating] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  const load = useCallback(async () => {
    try {
      const next = await getKnowledge()
      setOverview(next)
      setRun(next.run)
      setLoadError('')
    } catch (error) {
      setLoadError(apiErrorMessage(error, t('errorLoad')))
    }
  }, [t])

  useEffect(() => {
    void load()
  }, [load])

  const running = run?.status === 'running'

  // While an update runs, follow its progress; when it ends, reload the counts.
  useEffect(() => {
    if (!running) return
    let stopped = false
    const timer = window.setInterval(async () => {
      try {
        const next = await getKnowledgeRun()
        if (stopped) return
        setRun(next)
        if (next.status !== 'running') {
          void load()
          if (next.status === 'done') toast.success(t('toastDone'))
        }
      } catch {
        // A missed poll is retried on the next tick.
      }
    }, POLL_MS)
    return () => {
      stopped = true
      window.clearInterval(timer)
    }
  }, [running, load, t])

  async function askEstimate() {
    setIsEstimating(true)
    try {
      setEstimate(await estimateKnowledge())
    } catch (error) {
      toast.error(apiErrorMessage(error, t('errorEstimate')))
    } finally {
      setIsEstimating(false)
    }
  }

  async function startUpdate() {
    setIsStarting(true)
    try {
      setRun(await startKnowledgeUpdate())
      setEstimate(null)
    } catch (error) {
      toast.error(apiErrorMessage(error, t('errorStart')))
      void load()
    } finally {
      setIsStarting(false)
    }
  }

  const date = (value?: string) => (value ? formatDateTime(value, i18n.language) : '')
  const keyMissing = overview ? !overview.embedding.configured : embeddingConfigured === false

  function statusBadge() {
    if (!overview) return null
    if (running) return <Badge tone="busy"><LoaderCircle className="h-3.5 w-3.5 animate-spin" />{t('state.running')}</Badge>
    if (keyMissing) return <Badge tone="bad"><TriangleAlert className="h-3.5 w-3.5" />{t('state.noKey')}</Badge>
    if (overview.pieces === 0) return <Badge tone="plain">{t('state.empty')}</Badge>
    return <Badge tone="good"><Check className="h-3.5 w-3.5" />{t('state.ready')}</Badge>
  }

  function indexBadge() {
    if (!overview) return null
    const state = overview.index.toUpperCase()
    const tone: Tone = state === 'READY' ? 'good' : state === 'MISSING' || state === 'FAILED' ? 'bad' : 'busy'
    return <Badge tone={tone}>{t('index', { state: t(`indexStates.${state}`, { defaultValue: overview.index }), ...AS_TYPED })}</Badge>
  }

  function renderRun() {
    if (!run || run.status === 'idle') return null
    const percent = run.total > 0 ? Math.min(100, Math.round((run.done / run.total) * 100)) : 0

    if (running) {
      return (
        <div className="mt-6 border border-amber-200 bg-amber-50/60 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-semibold text-[#17110d]">{t(`phase.${run.phase ?? 'reading'}`)}</span>
            <span className="text-zinc-600">{t('progress', { done: run.done, total: run.total, ...AS_TYPED })}</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden bg-white" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
            <div className="h-full bg-[#8f2a60] transition-all" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 text-xs text-zinc-500">{t('runningHint')}</p>
        </div>
      )
    }

    const tone = run.status === 'done' ? 'text-emerald-800' : 'text-red-700'
    return (
      <div className="mt-6 border border-[#eadfd4] bg-[#fffdfa] p-4 text-sm">
        <p className={`font-semibold ${tone}`}>
          {t(`last.${run.status}`, { date: date(run.finishedAt ?? run.startedAt), ...AS_TYPED })}
        </p>
        {run.status === 'done' ? (
          <p className="mt-1 text-zinc-600">{t('last.summary', { done: run.done, removed: run.removed, tokens: run.tokens.toLocaleString(i18n.language), ...AS_TYPED })}</p>
        ) : null}
        {run.error ? <p className="mt-1 break-words text-red-700">{run.error}</p> : null}
        <p className="mt-1 text-xs text-zinc-500">
          {t(run.trigger === 'nightly' ? 'last.byNightly' : 'last.by', { who: run.by ?? '', ...AS_TYPED })}
        </p>
      </div>
    )
  }

  function renderConfirm() {
    if (!estimate) return null
    const nothing = estimate.toEmbed === 0 && estimate.toRemove === 0
    return (
      <div className="mt-6 border border-[#8f2a60]/30 bg-[#fffdfa] p-4 text-sm">
        <p className="font-semibold text-[#17110d]">{nothing ? t('estimate.nothing') : t('estimate.title')}</p>
        {!nothing ? (
          <>
            <ul className="mt-2 space-y-1 text-zinc-700">
              <li>{t('estimate.toEmbed', { count: estimate.toEmbed, ...AS_TYPED })}</li>
              <li>{t('estimate.toRemove', { count: estimate.toRemove, ...AS_TYPED })}</li>
              <li>{t('estimate.tokens', { tokens: estimate.estimatedTokens.toLocaleString(i18n.language), model: estimate.model, ...AS_TYPED })}</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-500">{t('estimate.from', { from: estimate.contentFrom, ...AS_TYPED })}</p>
          </>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {!nothing ? (
            <button type="button" className={BUTTON} onClick={startUpdate} disabled={isStarting}>
              {isStarting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {t('estimate.confirm')}
            </button>
          ) : null}
          <button type="button" className={BUTTON_LIGHT} onClick={() => setEstimate(null)} disabled={isStarting}>
            <X className="h-4 w-4" />
            {nothing ? t('estimate.close') : t('estimate.cancel')}
          </button>
        </div>
      </div>
    )
  }

  if (loadError && !overview) {
    return (
      <div className="mt-8 border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        <p>{loadError}</p>
        <button type="button" className={`${BUTTON_LIGHT} mt-4`} onClick={() => void load()}>{t('retry')}</button>
      </div>
    )
  }

  if (!overview) {
    return (
      <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        {t('loading')}
      </div>
    )
  }

  const sources = new Map(overview.sources.map((row) => [row.source, row]))

  return (
    <div className="mt-8 space-y-6">
      <section className={SECTION}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#8f2a60]" />
              <h2 className="text-lg font-bold text-[#17110d]">{t('title')}</h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">{t('hint')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {statusBadge()}
            {indexBadge()}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#eadfd4] text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-4 font-semibold">{t('table.source')}</th>
                <th className="py-2 pr-4 font-semibold">{t('table.items')}</th>
                <th className="py-2 pr-4 font-semibold">{t('table.pieces')}</th>
                <th className="py-2 font-semibold">{t('table.updated')}</th>
              </tr>
            </thead>
            <tbody>
              {KNOWLEDGE_SOURCES.map((source) => {
                const row = sources.get(source)
                return (
                  <tr key={source} className="border-b border-[#f3ece4] last:border-0">
                    <td className="py-3 pr-4 font-semibold text-[#17110d]">{t(`sources.${source}`)}</td>
                    <td className="py-3 pr-4 text-zinc-700">{row?.items ?? 0}</td>
                    <td className="py-3 pr-4 text-zinc-700">{row?.pieces ?? 0}</td>
                    <td className="py-3 text-zinc-500">{row?.updatedAt ? date(row.updatedAt) : '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          {t('model', { provider: overview.embedding.provider, model: overview.embedding.model, dimensions: overview.embedding.dimensions, ...AS_TYPED })}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" className={BUTTON} onClick={askEstimate} disabled={running || isEstimating || keyMissing || Boolean(estimate)}>
            {isEstimating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {isEstimating ? t('estimating') : t('update')}
          </button>
          <p className="text-xs text-zinc-500">{keyMissing ? t('noKeyHint') : t('updateHint')}</p>
        </div>

        {renderConfirm()}
        {renderRun()}
      </section>

      <TestQuestion />
    </div>
  )
}

/** "Test a question": the pieces Jules would find, best first. */
function TestQuestion() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.chatbot.knowledge.test' })
  const [question, setQuestion] = useState('')
  const [language, setLanguage] = useState<string>(() => (LANGUAGES as readonly string[]).includes(i18n.language) ? i18n.language : 'en')
  const [result, setResult] = useState<TestResult | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    if (question.trim().length < 2) return
    setIsSearching(true)
    setError('')
    try {
      setResult(await testKnowledge(question.trim(), language))
    } catch (failure) {
      setResult(null)
      setError(apiErrorMessage(failure, t('error')))
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <section className={SECTION}>
      <div className="flex items-center gap-2">
        <FlaskConical className="h-4 w-4 text-[#8f2a60]" />
        <h2 className="text-lg font-bold text-[#17110d]">{t('title')}</h2>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">{t('hint')}</p>

      <form onSubmit={(event) => { event.preventDefault(); void submit() }} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="knowledge-test-question">{t('question')}</label>
        <input
          id="knowledge-test-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={300}
          placeholder={t('placeholder')}
          className="min-w-0 flex-1 border border-[#eadfd4] bg-[#fffdfa] px-4 py-3 text-sm text-[#17110d] outline-none focus:border-[#8f2a60]"
        />
        <label className="sr-only" htmlFor="knowledge-test-language">{t('language')}</label>
        <select
          id="knowledge-test-language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="border border-[#eadfd4] bg-[#fffdfa] px-3 py-3 text-sm text-[#17110d] outline-none focus:border-[#8f2a60]"
        >
          {LANGUAGES.map((code) => <option key={code} value={code}>{code.toUpperCase()}</option>)}
        </select>
        <button type="submit" className={BUTTON} disabled={isSearching || question.trim().length < 2}>
          {isSearching ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {t('search')}
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      {result ? (
        <div className="mt-6">
          {result.englishText !== question.trim() ? (
            <p className="text-xs text-zinc-500">{t('searchedAs', { text: result.englishText, ...AS_TYPED })}</p>
          ) : null}
          {result.pieces.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-600">{t('none')}</p>
          ) : (
            <ol className="mt-3 space-y-3">
              {result.pieces.map((piece, index) => (
                <li key={`${piece.url}-${index}`} className={`border p-4 ${piece.used ? 'border-[#eadfd4] bg-white' : 'border-dashed border-[#eadfd4] bg-[#fffdfa] opacity-75'}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-zinc-500">#{index + 1}</span>
                    <a href={piece.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#17110d] underline-offset-2 hover:text-[#8f2a60] hover:underline">
                      {piece.title}
                    </a>
                    <span className="text-xs text-zinc-500">{t('score', { score: piece.score.toFixed(3), ...AS_TYPED })}</span>
                    {piece.used ? <Badge tone="good">{t('used')}</Badge> : <Badge tone="plain">{t('notUsed')}</Badge>}
                    {piece.linked ? <Badge tone="plain">{t('linked')}</Badge> : null}
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{piece.excerpt}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      ) : null}
    </section>
  )
}
