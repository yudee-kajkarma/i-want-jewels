'use client'

import { Gift } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AS_TYPED, CARD } from '../ui'

/** The customer's own gift cards: the code's last four characters and what is left on it. */
export function GiftBalancesBlock({ cards }: { cards: Array<{ code: string; balance: string }> }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  return (
    <ul className="grid grid-cols-2 gap-2">
      {cards.map((card, i) => {
        const code = `…${card.code.slice(-4)}`
        return (
          <li key={`${i}-${card.code}`} className={`${CARD} flex items-center gap-2.5 p-3`}>
            <span className="sr-only">{t('tools.myGiftCard', { code, balance: card.balance, ...AS_TYPED })}</span>
            <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#282422] text-[#a69d98]">
              <Gift className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <span aria-hidden className="min-w-0">
              <span className="block text-[11px] tracking-[0.12em] text-[#a69d98]">{code}</span>
              <span className="block truncate text-[15px] font-semibold text-[#f6f1ee]">{card.balance}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
