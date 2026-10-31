'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { BadgePercent, ChevronLeft, ChevronRight, Gift, LoaderCircle, Mail, Plus, Save, Search, Ticket, Trash2 } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import {
  CODE_FILTERS,
  createDiscountCode,
  discountErrorMessage,
  getDiscountSettings,
  listDiscountCodes,
  resendDiscountCode,
  revokeDiscountCode,
  saveDiscountRules,
  saveThankYouSettings,
  type CodeFilter,
  type CodeStatus,
  type DiscountCodePage,
  type DiscountSettings,
  type PriceRangeRule,
  type RuleState,
} from '../services/discountAdminService'
import { formatDate, formatDateTime } from '../utils/formatDate'

/*
 * Admin → Discounts:
 * - price-range discounts, display only (as Uniglo): a product whose price
 *   falls in a range shows a struck "was" price that the percentage brings
 *   back to our price; what's charged never changes;
 * - the thank-you code: after every paid order, a personal code for the next
 *   order is emailed to the customer;
 * - the discount codes sent so far, which an admin can resend or revoke, or
 *   make for a customer.
 */

const AS_TYPED = { interpolation: { escapeValue: false } } as const
const SECTION = 'border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8'
const INPUT = 'w-full border border-[#eadfd4] bg-[#fffdfa] px-3 py-2.5 text-sm text-[#17110d] outline-none focus:border-[#8f2a60]'
const LABEL = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500'
const BUTTON = 'inline-flex items-center justify-center gap-2 bg-[#17110d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f2a60] disabled:cursor-not-allowed disabled:opacity-50'
const BUTTON_LIGHT = 'inline-flex items-center justify-center gap-2 border border-[#eadfd4] bg-white px-4 py-2.5 text-sm font-bold text-[#17110d] transition hover:border-[#8f2a60] disabled:cursor-not-allowed disabled:opacity-50'

const TONE: Record<RuleState | CodeStatus, string> = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  scheduled: 'border-amber-200 bg-amber-50 text-amber-800',
  ended: 'border-[#eadfd4] bg-[#fffdfa] text-zinc-500',
  off: 'border-[#eadfd4] bg-[#fffdfa] text-zinc-500',
  used: 'border-sky-200 bg-sky-50 text-sky-800',
  expired: 'border-[#eadfd4] bg-[#fffdfa] text-zinc-500',
  revoked: 'border-red-200 bg-red-50 text-red-700',
}

function Chip({ tone, children }: { tone: keyof typeof TONE; children: React.ReactNode }) {
  return <span className={`inline-flex shrink-0 items-center border px-2.5 py-1 text-[11px] font-semibold ${TONE[tone]}`}>{children}</span>
}

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <label className="relative inline-flex shrink-0 cursor-pointer">
      <span className="sr-only">{label}</span>
      <input type="checkbox" role="switch" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" />
      <span className="h-6 w-11 rounded-full bg-zinc-300 transition peer-checked:bg-[#8f2a60] peer-focus-visible:ring-2 peer-focus-visible:ring-[#8f2a60] peer-focus-visible:ring-offset-2" />
      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
    </label>
  )
}

// ---------------------------------------------------------------------------
// Price-range discounts
// ---------------------------------------------------------------------------

type RuleDraft = { key: string; minPrice: string; maxPrice: string; percent: string; active: boolean; startsAt: string; endsAt: string; state?: RuleState }

let nextKey = 0
const newKey = () => `rule-${++nextKey}`

/** A date as the date input shows it (the admin's own day), from a saved ISO date. */
function dayOf(iso?: string | null): string {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const toDraft = (rule: PriceRangeRule): RuleDraft => ({
  key: newKey(),
  minPrice: String(rule.minPrice),
  maxPrice: String(rule.maxPrice),
  percent: String(rule.percent),
  active: rule.active,
  startsAt: dayOf(rule.startsAt),
  endsAt: dayOf(rule.endsAt),
  state: rule.state,
})

/** A range runs from the start of its first day to the end of its last, in the admin's own time. */
const startOfDay = (day: string) => (day ? new Date(`${day}T00:00:00`).toISOString() : null)
const endOfDay = (day: string) => (day ? new Date(`${day}T23:59:59.999`).toISOString() : null)

const number = (text: string) => (text.trim() === '' ? Number.NaN : Number(text))

function PriceRanges({ settings, onSaved }: { settings: DiscountSettings; onSaved: (next: DiscountSettings) => void }) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.discounts.ranges' })
  const [rows, setRows] = useState<RuleDraft[]>(() => settings.rules.map(toDraft))
  const [dirty, setDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  function change(key: string, patch: Partial<RuleDraft>) {
    setRows((current) => current.map((row) => (row.key === key ? { ...row, ...patch, state: undefined } : row)))
    setDirty(true)
    setError('')
  }

  function add() {
    const highest = rows.reduce((max, row) => Math.max(max, number(row.maxPrice) || 0), 0)
    const from = rows.length ? highest + 1 : 0
    setRows((current) => [...current, { key: newKey(), minPrice: String(from), maxPrice: String(from + 499), percent: '10', active: true, startsAt: '', endsAt: '' }])
    setDirty(true)
  }

  function remove(key: string) {
    setRows((current) => current.filter((row) => row.key !== key))
    setDirty(true)
    setError('')
  }

  /** When a range shows: always, or between its dates. */
  function periodLabel(row: RuleDraft): string {
    const show = (day: string) => formatDate(new Date(`${day}T12:00:00`).toISOString(), i18n.language)
    if (row.startsAt && row.endsAt) return t('period.between', { from: show(row.startsAt), to: show(row.endsAt), ...AS_TYPED })
    if (row.startsAt) return t('period.from', { from: show(row.startsAt), ...AS_TYPED })
    if (row.endsAt) return t('period.until', { to: show(row.endsAt), ...AS_TYPED })
    return t('period.always')
  }

  /** Why these ranges can't be saved, as the shop would say, or ''. */
  function problem(): string {
    for (const [i, row] of rows.entries()) {
      const min = number(row.minPrice)
      const max = number(row.maxPrice)
      const percent = number(row.percent)
      if (!(min >= 0) || !(max >= 0)) return t('errors.prices', { n: i + 1, ...AS_TYPED })
      if (max < min) return t('errors.order', { n: i + 1, ...AS_TYPED })
      if (!Number.isInteger(percent) || percent < 1 || percent > 90) return t('errors.percent', { n: i + 1, ...AS_TYPED })
      if (row.startsAt && row.endsAt && row.endsAt < row.startsAt) return t('errors.dates', { n: i + 1, ...AS_TYPED })
    }
    const sorted = [...rows].sort((a, b) => number(a.minPrice) - number(b.minPrice))
    for (let i = 1; i < sorted.length; i++) {
      if (number(sorted[i].minPrice) <= number(sorted[i - 1].maxPrice)) {
        return t('errors.overlap', {
          a: `€${sorted[i - 1].minPrice}–€${sorted[i - 1].maxPrice}`,
          b: `€${sorted[i].minPrice}–€${sorted[i].maxPrice}`,
          ...AS_TYPED,
        })
      }
    }
    return ''
  }

  async function save() {
    const found = problem()
    if (found) return setError(found)
    setIsSaving(true)
    try {
      const next = await saveDiscountRules(
        rows.map((row) => ({
          minPrice: number(row.minPrice),
          maxPrice: number(row.maxPrice),
          percent: number(row.percent),
          active: row.active,
          startsAt: startOfDay(row.startsAt),
          endsAt: endOfDay(row.endsAt),
        })),
      )
      setRows(next.rules.map(toDraft))
      setDirty(false)
      onSaved(next)
      toast.success(t('saved'))
    } catch (failure) {
      setError(discountErrorMessage(failure, t('errors.save')))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className={SECTION}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BadgePercent className="h-4 w-4 text-[#8f2a60]" />
            <h2 className="text-lg font-bold text-[#17110d]">{t('title')}</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">{t('hint')}</p>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 border border-dashed border-[#eadfd4] bg-[#fffdfa] p-5 text-sm text-zinc-500">{t('none')}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((row, i) => (
            <li key={row.key} className="border border-[#eadfd4] bg-[#fffdfa] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[#17110d]">{t('range', { n: i + 1, ...AS_TYPED })}</p>
                  {/* The badge shoppers see, as Uniglo shows it on a saved discount. */}
                  {number(row.percent) > 0 ? (
                    <span className="inline-flex rounded-full bg-[#f23ea9] px-2.5 py-1 text-[11px] font-bold leading-none text-white">
                      {t('percentOff', { percent: row.percent, ...AS_TYPED })}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-3">
                  {row.state ? <Chip tone={row.state}>{t(`states.${row.state}`)}</Chip> : <Chip tone="scheduled">{t('unsaved')}</Chip>}
                  <Switch checked={row.active} onChange={(active) => change(row.key, { active })} label={t('active')} />
                  <button type="button" onClick={() => remove(row.key)} aria-label={t('remove', { n: i + 1, ...AS_TYPED })} className="p-1.5 text-zinc-400 transition hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
                <label>
                  <span className={LABEL}>{t('from')}</span>
                  <input inputMode="decimal" value={row.minPrice} onChange={(e) => change(row.key, { minPrice: e.target.value })} className={INPUT} />
                </label>
                <label>
                  <span className={LABEL}>{t('to')}</span>
                  <input inputMode="decimal" value={row.maxPrice} onChange={(e) => change(row.key, { maxPrice: e.target.value })} className={INPUT} />
                </label>
                <label>
                  <span className={LABEL}>{t('percent')}</span>
                  <input inputMode="numeric" value={row.percent} onChange={(e) => change(row.key, { percent: e.target.value })} className={INPUT} />
                </label>
                <label>
                  <span className={LABEL}>{t('starts')}</span>
                  <input type="date" value={row.startsAt} onChange={(e) => change(row.key, { startsAt: e.target.value })} className={INPUT} />
                </label>
                <label>
                  <span className={LABEL}>{t('ends')}</span>
                  <input type="date" value={row.endsAt} onChange={(e) => change(row.key, { endsAt: e.target.value })} className={INPUT} />
                </label>
              </div>
              <p className="mt-3 text-xs text-zinc-500">
                {[
                  t('example', {
                    from: row.minPrice || '…',
                    to: row.maxPrice || '…',
                    percent: row.percent || '…',
                    was: Number.isFinite(number(row.minPrice)) && number(row.percent) > 0 && number(row.percent) < 100
                      ? Math.round((number(row.minPrice) * 100) / (100 - number(row.percent)))
                      : '…',
                    ...AS_TYPED,
                  }),
                  periodLabel(row),
                ].join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      )}

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={add} className={BUTTON_LIGHT}>
          <Plus className="h-4 w-4" />
          {t('add')}
        </button>
        <button type="button" onClick={() => void save()} disabled={isSaving || !dirty} className={BUTTON}>
          {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {t('save')}
        </button>
        <p className="text-xs text-zinc-500">{t('note')}</p>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// The thank-you code
// ---------------------------------------------------------------------------

function ThankYouCode({ settings, onSaved }: { settings: DiscountSettings; onSaved: (next: DiscountSettings) => void }) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.discounts.thankYou' })
  const [enabled, setEnabled] = useState(settings.thankYou.enabled)
  const [percent, setPercent] = useState(String(settings.thankYou.percent))
  const [validDays, setValidDays] = useState(String(settings.thankYou.validDays))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const dirty =
    enabled !== settings.thankYou.enabled || number(percent) !== settings.thankYou.percent || number(validDays) !== settings.thankYou.validDays

  async function save() {
    const p = number(percent)
    const d = number(validDays)
    if (!Number.isInteger(p) || p < 1 || p > 90) return setError(t('errors.percent'))
    if (!Number.isInteger(d) || d < 1 || d > 3650) return setError(t('errors.days'))
    setIsSaving(true)
    setError('')
    try {
      const next = await saveThankYouSettings({ enabled, percent: p, validDays: d })
      onSaved(next)
      toast.success(t('saved'))
    } catch (failure) {
      setError(discountErrorMessage(failure, t('errors.save')))
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className={SECTION}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-[#8f2a60]" />
            <h2 className="text-lg font-bold text-[#17110d]">{t('title')}</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">{t('hint')}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#17110d]">{enabled ? t('on') : t('off')}</span>
          <Switch checked={enabled} onChange={setEnabled} label={t('switch')} />
        </div>
      </div>

      <div className="mt-6 grid max-w-xl grid-cols-2 gap-4">
        <label>
          <span className={LABEL}>{t('percent')}</span>
          <input inputMode="numeric" value={percent} onChange={(e) => setPercent(e.target.value)} className={INPUT} />
        </label>
        <label>
          <span className={LABEL}>{t('validDays')}</span>
          <input inputMode="numeric" value={validDays} onChange={(e) => setValidDays(e.target.value)} className={INPUT} />
        </label>
      </div>
      <p className="mt-3 text-xs text-zinc-500">{t('rules')}</p>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      <div className="mt-6">
        <button type="button" onClick={() => void save()} disabled={isSaving || !dirty} className={BUTTON}>
          {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {t('save')}
        </button>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Discount codes
// ---------------------------------------------------------------------------

function DiscountCodes({ defaults }: { defaults: { percent: number; validDays: number } }) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.discounts.codes' })
  const [typed, setTyped] = useState('')
  const [q, setQ] = useState('')
  const [show, setShow] = useState<CodeFilter>('all')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<DiscountCodePage | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [confirmRevoke, setConfirmRevoke] = useState<string | null>(null)
  const [making, setMaking] = useState(false)
  const [form, setForm] = useState({ email: '', percent: String(defaults.percent), validDays: String(defaults.validDays), note: '' })
  const asked = useRef(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQ(typed.trim())
      setPage(1)
    }, 350)
    return () => window.clearTimeout(timer)
  }, [typed])

  const load = useCallback(async () => {
    const ticket = ++asked.current
    try {
      const next = await listDiscountCodes({ q, show, page })
      if (ticket !== asked.current) return
      setData(next)
      setError('')
    } catch (failure) {
      if (ticket === asked.current) setError(discountErrorMessage(failure, t('errorLoad')))
    }
  }, [q, show, page, t])

  useEffect(() => {
    void load()
  }, [load])

  async function resend(id: string) {
    setBusy(id)
    try {
      const result = await resendDiscountCode(id)
      if (result.sent) toast.success(t('resent', { email: result.coupon.email, ...AS_TYPED }))
      else toast.error(t('emailFailed'))
      void load()
    } catch (failure) {
      toast.error(discountErrorMessage(failure, t('errorResend')))
    } finally {
      setBusy(null)
    }
  }

  async function revoke(id: string) {
    setBusy(id)
    try {
      const coupon = await revokeDiscountCode(id)
      toast.success(t('revoked', { code: coupon.code, ...AS_TYPED }))
      setConfirmRevoke(null)
      void load()
    } catch (failure) {
      toast.error(discountErrorMessage(failure, t('errorRevoke')))
    } finally {
      setBusy(null)
    }
  }

  async function make() {
    const percent = number(form.percent)
    const validDays = number(form.validDays)
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return toast.error(t('make.errors.email'))
    if (!Number.isInteger(percent) || percent < 1 || percent > 90) return toast.error(t('make.errors.percent'))
    if (!Number.isInteger(validDays) || validDays < 1 || validDays > 3650) return toast.error(t('make.errors.days'))
    setBusy('new')
    try {
      const result = await createDiscountCode({ email: form.email.trim(), percent, validDays, note: form.note.trim() || undefined })
      if (result.sent) toast.success(t('make.sent', { code: result.coupon.code, email: result.coupon.email, ...AS_TYPED }))
      else toast.error(t('make.madeNotSent', { code: result.coupon.code, ...AS_TYPED }))
      setForm({ email: '', percent: String(defaults.percent), validDays: String(defaults.validDays), note: '' })
      setMaking(false)
      setShow('all')
      setPage(1)
      void load()
    } catch (failure) {
      toast.error(discountErrorMessage(failure, t('make.errors.save')))
    } finally {
      setBusy(null)
    }
  }

  const pages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1
  const date = (iso?: string) => (iso ? formatDate(iso, i18n.language) : '')

  return (
    <section className={SECTION}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-[#8f2a60]" />
            <h2 className="text-lg font-bold text-[#17110d]">{t('title')}</h2>
          </div>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">{t('hint')}</p>
        </div>
        <button type="button" onClick={() => setMaking((open) => !open)} className={BUTTON_LIGHT} aria-expanded={making}>
          <Plus className="h-4 w-4" />
          {t('make.open')}
        </button>
      </div>

      {making ? (
        <div className="mt-5 border border-[#eadfd4] bg-[#fffdfa] p-4">
          <p className="text-sm font-bold text-[#17110d]">{t('make.title')}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-[2fr_1fr_1fr_2fr]">
            <label>
              <span className={LABEL}>{t('make.email')}</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={INPUT} />
            </label>
            <label>
              <span className={LABEL}>{t('make.percent')}</span>
              <input inputMode="numeric" value={form.percent} onChange={(e) => setForm({ ...form, percent: e.target.value })} className={INPUT} />
            </label>
            <label>
              <span className={LABEL}>{t('make.validDays')}</span>
              <input inputMode="numeric" value={form.validDays} onChange={(e) => setForm({ ...form, validDays: e.target.value })} className={INPUT} />
            </label>
            <label>
              <span className={LABEL}>{t('make.note')}</span>
              <input value={form.note} maxLength={200} onChange={(e) => setForm({ ...form, note: e.target.value })} className={INPUT} />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => void make()} disabled={busy === 'new'} className={BUTTON}>
              {busy === 'new' ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              {t('make.submit')}
            </button>
            <button type="button" onClick={() => setMaking(false)} className={BUTTON_LIGHT}>{t('make.cancel')}</button>
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">{t('search')}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input value={typed} onChange={(e) => setTyped(e.target.value)} maxLength={100} placeholder={t('searchPlaceholder')} className={`${INPUT} py-3 pl-9`} />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('filterLabel')}>
          {CODE_FILTERS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={show === id}
              onClick={() => {
                setShow(id)
                setPage(1)
              }}
              className={`border px-3 py-2 text-xs font-bold transition ${show === id ? 'border-[#17110d] bg-[#17110d] text-white' : 'border-[#eadfd4] bg-white text-zinc-700 hover:border-[#8f2a60]'}`}
            >
              {t(`filters.${id}`)}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="mt-5 text-sm text-red-700">{error}</p> : null}
      {!data && !error ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          {t('loading')}
        </div>
      ) : null}
      {data && data.rows.length === 0 ? <p className="mt-6 text-sm text-zinc-600">{q || show !== 'all' ? t('noneFound') : t('none')}</p> : null}

      {data && data.rows.length > 0 ? (
        <ul className="mt-6 divide-y divide-[#f3ece4] border-y border-[#f3ece4]">
          {data.rows.map((row) => (
            <li key={row.id} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold tracking-wider text-[#17110d]">{row.code}</span>
                  <Chip tone={row.status}>{t(`filters.${row.status}`)}</Chip>
                  <span className="text-xs font-semibold text-[#8f2a60]">{t('percentOff', { percent: row.percent, ...AS_TYPED })}</span>
                </div>
                <p className="mt-1 truncate text-sm text-zinc-700">{row.email}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {row.source === 'order' && row.earnedOrderNumber
                    ? t('earned', { order: row.earnedOrderNumber, date: date(row.createdAt), ...AS_TYPED })
                    : t('made', { date: date(row.createdAt), ...AS_TYPED })}
                  {row.note ? ` · ${row.note}` : ''}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {row.status === 'used' && row.usedOrderNumber
                    ? t('usedOn', { order: row.usedOrderNumber, date: row.usedAt ? formatDateTime(row.usedAt, i18n.language) : '', ...AS_TYPED })
                    : t('expires', { date: date(row.expiresAt), ...AS_TYPED })}
                </p>
              </div>
              {row.status === 'active' ? (
                <div className="flex shrink-0 flex-wrap gap-2">
                  {confirmRevoke === row.id ? (
                    <>
                      <span className="self-center text-xs text-zinc-600">{t('revokeConfirm')}</span>
                      <button type="button" onClick={() => void revoke(row.id)} disabled={busy === row.id} className="border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                        {t('revokeYes')}
                      </button>
                      <button type="button" onClick={() => setConfirmRevoke(null)} className="border border-[#eadfd4] px-3 py-2 text-xs font-bold text-zinc-700">
                        {t('cancel')}
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={() => void resend(row.id)} disabled={busy === row.id} className="inline-flex items-center gap-1.5 border border-[#eadfd4] px-3 py-2 text-xs font-bold text-[#17110d] hover:border-[#8f2a60] disabled:opacity-50">
                        {busy === row.id ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <Mail className="h-3.5 w-3.5" />}
                        {t('resend')}
                      </button>
                      <button type="button" onClick={() => setConfirmRevoke(row.id)} className="border border-[#eadfd4] px-3 py-2 text-xs font-bold text-zinc-600 hover:border-red-300 hover:text-red-700">
                        {t('revoke')}
                      </button>
                    </>
                  )}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {data && data.total > data.pageSize ? (
        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          <span className="text-zinc-500">{t('page', { page: data.page, pages, total: data.total, ...AS_TYPED })}</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPage((n) => Math.max(1, n - 1))} disabled={page <= 1} aria-label={t('previous')} className="border border-[#eadfd4] p-2 disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => setPage((n) => Math.min(pages, n + 1))} disabled={page >= pages} aria-label={t('next')} className="border border-[#eadfd4] p-2 disabled:opacity-40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export default function AdminDiscountsPage() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.discounts' })
  const [settings, setSettings] = useState<DiscountSettings | null>(null)
  const [error, setError] = useState('')
  /** Bumped by "Retry". */
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true
    getDiscountSettings()
      .then((next) => {
        if (!active) return
        setSettings(next)
        setError('')
      })
      .catch((failure) => {
        if (active) setError(discountErrorMessage(failure, t('errorLoad')))
      })
    return () => {
      active = false
    }
  }, [attempt, t])

  return (
    <div className="min-h-screen bg-[#fffdfa] font-poppins text-[#17110d]">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-400">{t('breadcrumb')}</p>
        <div className="mt-2 flex items-center gap-3">
          <BadgePercent className="h-7 w-7 text-[#8f2a60]" />
          <h1 className="text-3xl font-bold tracking-[-0.03em]">{t('title')}</h1>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-zinc-600">{t('intro')}</p>

        {error && !settings ? (
          <div className="mt-8 border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p>{error}</p>
            <button type="button" onClick={() => setAttempt((n) => n + 1)} className={`${BUTTON_LIGHT} mt-4`}>{t('retry')}</button>
          </div>
        ) : null}
        {!settings && !error ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {t('loading')}
          </div>
        ) : null}

        {settings ? (
          <div className="mt-8 space-y-6">
            <PriceRanges settings={settings} onSaved={setSettings} />
            <ThankYouCode key={settings.updatedAt ?? 'new'} settings={settings} onSaved={setSettings} />
            <DiscountCodes defaults={settings.thankYou} />
            {settings.updatedAt ? (
              <p className="text-xs text-zinc-400">
                {t('lastUpdated', { date: formatDateTime(settings.updatedAt, i18n.language), who: settings.updatedBy ?? '', ...AS_TYPED })}
              </p>
            ) : null}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
