import { ArrowUpRight, BookOpen, Gem, Gift, Heart, LogIn, Mail, MessageSquare, Package, ShoppingBag, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { JulesLink } from '../contract'
import { FOCUS_RING } from '../ui'
import { SmartLink } from './SmartLink'

/** A quiet sign for where a link goes: a book for reading, the shop's own pages their own. */
const DESTINATIONS: Array<[RegExp, LucideIcon]> = [
  [/^\/login(\/|$)/, LogIn],
  [/^\/contact(\/|$)/, Mail],
  [/^\/tickets(\/|$)/, MessageSquare],
  [/^\/orders(\/|$)/, Package],
  [/^\/(cart|checkout)(\/|$)/, ShoppingBag],
  [/^\/wishlist(\/|$)/, Heart],
  [/^\/(gift-cards|account\/gift-cards)(\/|$)/, Gift],
  [/^\/products(\/|$)/, Gem],
]

/** Guides, blog posts and the FAQ (and anything else) get the book. */
const iconFor = (url: string): LucideIcon => DESTINATIONS.find(([path]) => path.test(url.split(/[?#]/)[0]))?.[1] ?? BookOpen

/** Guides, blog posts, the FAQ and shop pages to go on to, as quiet rows. */
export function LinksBlock({ links }: { links: JulesLink[] }) {
  return (
    <ul className="flex flex-col items-start gap-1.5">
      {links.map((link) => {
        const Icon = iconFor(link.url)
        return (
          <li key={`${link.url}-${link.title}`} className="max-w-full">
            <SmartLink
              to={link.url}
              className={cn(
                FOCUS_RING,
                'group flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#1e1a19] py-2.5 pl-3 pr-3 text-[13px] leading-snug text-[#f6f1ee] transition-colors duration-150 hover:border-white/[0.14] hover:text-[#e6297e] motion-reduce:transition-none',
              )}
            >
              <Icon aria-hidden className="h-4 w-4 shrink-0 text-[#a69d98]" strokeWidth={1.8} />
              <span className="min-w-0">{link.title}</span>
              <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-[#6f6763] transition-colors group-hover:text-[#e6297e] motion-reduce:transition-none" />
            </SmartLink>
          </li>
        )
      })}
    </ul>
  )
}
