'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

/** A small dot says how it's going: delivered green, shipped blue, stopped grey, anything else (paid, waiting) amber. */
function dot(status: string): string {
  if (status === 'DELIVERED') return 'bg-[#4ade80]'
  if (status === 'SHIPPED') return 'bg-[#93c5fd]'
  if (status === 'CANCELLED' || status === 'RETURNED') return 'bg-[#6f6763]'
  return 'bg-[#f0b45a]'
}

/** An order's status as a quiet chip with a coloured dot, in the visitor's language. */
export function StatusChip({ status }: { status: string }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools.status' })
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#282422] px-2 py-0.5 text-[11px] font-medium text-[#f6f1ee]">
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', dot(status))} />
      {t(status, { defaultValue: status })}
    </span>
  )
}
