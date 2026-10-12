'use client'

import { useId, useState } from 'react'
import { ArrowLeft, Gift, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useCurrency } from '../../../context/CurrencyContext'
import { formatPrice } from '../../../utils/price'
import type { GiftAnswers, GiftBudget, JulesChatApi, JulesShopBlock } from '../contract'
import { budgetCurrency, budgetValues } from '../shop'
import { CARD, CARD_FOCUS_RING, CHIP } from '../ui'

/** The four questions in the order they are asked (the block's `step`), each with its answers. */
const QUESTIONS = [
  { field: 'recipient', options: ['partner', 'mum', 'friend', 'myself'] },
  { field: 'occasion', options: ['birthday', 'anniversary', 'wedding', 'justBecause'] },
  { field: 'budget', options: ['under100', 'from100to200', 'over200', 'any'] },
  { field: 'type', options: ['earrings', 'necklaces', 'rings', 'bracelets', 'any'] },
] as const satisfies ReadonlyArray<{ field: keyof GiftAnswers; options: readonly string[] }>

type Field = (typeof QUESTIONS)[number]['field']
type FinderBlock = Extract<JulesShopBlock, { type: 'giftFinder' }>
type FinderActions = Pick<JulesChatApi, 'busy' | 'answerGiftFinder' | 'startGiftFinder'>

/** One answer as the chat records it. */
const answerOf = (field: Field, value: string) => ({ [field]: value }) as GiftAnswers

/** An answer's words; budgets show their amounts in the visitor's currency where the shop's prices allow it. */
function useAnswerText() {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules.gift' })
  const { currency } = useCurrency()
  return (field: Field, value: string) =>
    field === 'budget'
      ? t(`options.budget.${value}`, budgetValues(value as GiftBudget, (euros) => formatPrice(euros, budgetCurrency(currency))))
      : t(`options.${field}.${value}`)
}

const clampStep = (step: number) => Math.min(Math.max(0, Math.floor(step) || 0), QUESTIONS.length - 1)

/**
 * The guided gift finder: a calm card with "Step 2 of 4", a thin progress
 * line, the question and its answers. Back shows the earlier questions with
 * the answers already given; changing one keeps the rest. After the fourth
 * answer Jules searches, and the card shrinks to a short summary.
 */
export function GiftFinderBlock({ messageId, block, actions }: { messageId: string; block: FinderBlock; actions: FinderActions }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules.gift' })
  const answerText = useAnswerText()
  const questionId = useId()
  /** A question the visitor stepped back to; null follows the finder's own step. */
  const [viewing, setViewing] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  if (block.done) return <GiftSummary answers={block.answers} onAgain={actions.startGiftFinder} busy={actions.busy} />

  const current = clampStep(block.step)
  const step = viewing !== null && viewing < current ? viewing : current
  const { field, options } = QUESTIONS[step]
  const chosen = block.answers[field]

  async function answer(value: string) {
    if (saving) return
    setSaving(true)
    try {
      await actions.answerGiftFinder(messageId, answerOf(field, value))
    } finally {
      setSaving(false)
    }
    // Stepping forward again through questions already answered; then the finder's own step takes over.
    setViewing(step + 1 < current ? step + 1 : null)
  }

  return (
    <section aria-labelledby={questionId} className={cn(CARD, 'p-4')}>
      <div className="flex items-center justify-between gap-3 text-[12px] text-[#a69d98]">
        <span className="flex items-center gap-1.5 font-medium text-[#f6f1ee]">
          <Gift aria-hidden className="h-3.5 w-3.5 text-[#a69d98]" strokeWidth={1.8} />
          {t('title')}
        </span>
        <span>{t('step', { step: step + 1, total: QUESTIONS.length })}</span>
      </div>
      <div
        role="progressbar"
        aria-label={t('title')}
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
        aria-valuenow={step + 1}
        className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/[0.08]"
      >
        <div
          className="h-full rounded-full bg-[#e6297e] transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <h3 id={questionId} key={field} className="mt-4 text-[15px] font-semibold leading-snug text-[#f6f1ee] motion-safe:animate-jules-fade">
        {t(`questions.${field === 'type' ? 'piece' : field}`)}
      </h3>
      <div role="group" aria-labelledby={questionId} className="mt-3 flex flex-wrap gap-2">
        {options.map((value) => {
          const picked = chosen === value
          return (
            <button
              key={value}
              type="button"
              aria-pressed={picked}
              disabled={actions.busy || saving}
              onClick={() => void answer(value)}
              className={cn(CHIP, CARD_FOCUS_RING, picked && 'border-[#e6297e] bg-[rgba(230,41,126,0.14)] hover:border-[#e6297e]')}
            >
              {answerText(field, value)}
            </button>
          )
        })}
      </div>

      {step > 0 ? (
        <button
          type="button"
          onClick={() => setViewing(step - 1)}
          disabled={saving}
          className={cn(
            CARD_FOCUS_RING,
            'mt-3.5 inline-flex items-center gap-1 rounded-full px-1 text-[12.5px] text-[#a69d98] transition-colors hover:text-[#f6f1ee] disabled:opacity-50 motion-reduce:transition-none',
          )}
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
          {t('back')}
        </button>
      ) : null}
    </section>
  )
}

/** A finished finder: the four answers in brief, and a way to start again. */
function GiftSummary({ answers, onAgain, busy }: { answers: GiftAnswers; onAgain: () => void; busy: boolean }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules.gift' })
  const answerText = useAnswerText()
  return (
    <div className={cn(CARD, 'p-3.5')}>
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-[13px] font-medium text-[#f6f1ee]">
          <Gift aria-hidden className="h-3.5 w-3.5 text-[#a69d98]" strokeWidth={1.8} />
          {t('title')}
        </p>
        <button
          type="button"
          onClick={onAgain}
          disabled={busy}
          className={cn(
            CARD_FOCUS_RING,
            'inline-flex items-center gap-1 rounded-full px-1 text-[12px] text-[#a69d98] transition-colors hover:text-[#f6f1ee] disabled:opacity-50 motion-reduce:transition-none',
          )}
        >
          <RotateCcw aria-hidden className="h-3 w-3" />
          {t('again')}
        </button>
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {QUESTIONS.map(({ field }) => {
          const value = answers[field]
          return value ? (
            <li key={field} className="rounded-full border border-white/[0.08] bg-[#282422] px-2.5 py-1 text-[12px] text-[#f6f1ee]">
              {answerText(field, value)}
            </li>
          ) : null
        })}
      </ul>
    </div>
  )
}
