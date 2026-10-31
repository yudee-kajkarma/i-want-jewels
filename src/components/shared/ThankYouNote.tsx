'use client'

import { useEffect, useState } from 'react'
import { Gift } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { thankYouOffer, type ThankYouOffer } from '../../services/couponService'

/**
 * "Order today and get a 10% discount code for your next order, valid for 90
 * days." One quiet line on every product page and in the bag, while the
 * thank-you code is switched on (Admin → Discounts); nothing at all otherwise.
 */
export default function ThankYouNote({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [offer, setOffer] = useState<ThankYouOffer | null>(null)

  useEffect(() => {
    let active = true
    void thankYouOffer().then((next) => active && setOffer(next))
    return () => {
      active = false
    }
  }, [])

  if (!offer?.enabled || !offer.percent || !offer.validDays) return null

  return (
    <p className={cn('flex items-start gap-2.5 border border-[#f3d6e4] bg-[#fdf6f9] px-3.5 py-3 text-[13px] leading-[1.5] text-zinc-600', className)}>
      <Gift aria-hidden className="mt-[1px] h-4 w-4 shrink-0 text-[#e6297e]" />
      <span>
        <Trans
          t={t}
          i18nKey="thankYouNote"
          values={{ percent: offer.percent, count: offer.validDays }}
          components={{ strong: <strong className="font-semibold text-[#17110d]" /> }}
        />
      </span>
    </p>
  )
}
