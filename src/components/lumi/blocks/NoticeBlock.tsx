import { Info, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A short note in a quiet card; a warning only changes its small icon. */
export function NoticeBlock({ tone, text }: { tone: 'info' | 'warning'; text: string }) {
  const warning = tone === 'warning'
  const Icon = warning ? TriangleAlert : Info
  return (
    <p role="note" className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-[#1e1a19] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#f6f1ee]">
      <Icon aria-hidden className={cn('mt-0.5 h-4 w-4 shrink-0', warning ? 'text-[#f0b45a]' : 'text-[#a69d98]')} />
      <span className="min-w-0 break-words">{text}</span>
    </p>
  )
}
