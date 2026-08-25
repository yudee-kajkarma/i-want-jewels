'use client'

import { useTranslation } from 'react-i18next'
import type { AdminShipmentPackagePreview, AdminShipmentPreviewItem, Order } from '../../types/order'
import { formatPrice, isoToCurrencyCode } from '../../utils/price'

type Props = {
  order: Order
  carrier: 'FedEx' | 'DHL'
  pkg: AdminShipmentPackagePreview | undefined
  items: Array<Pick<AdminShipmentPreviewItem, 'customsValueUSD'>>
  declaredValue: number
}

function money(value: number, currency: 'EUR' | 'USD' | 'GBP') {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : currency === 'GBP' ? 'en-GB' : 'en-IE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default function ShippingValueSummary({ order, carrier, pkg, items, declaredValue }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shippingValueSummary' })
  if (!pkg) return null

  const orderCurrency = isoToCurrencyCode(order.currency) ?? 'eur'
  const orderCurrencyIso = order.currency ?? 'EUR'
  const customerAmount = formatPrice(order.totalAmount, orderCurrency)
  const declarationCurrency = pkg.declarationCurrency ?? 'EUR'
  const retailAmount = money(pkg.retailValue ?? pkg.retailValueEUR, declarationCurrency)
  const isOutsideEU = pkg.isOutsideEU ?? pkg.deliveryChargeEUR !== undefined
  const hasStoredUsdCustomsValue = isOutsideEU && items.some((item) => item.customsValueUSD != null)

  return (
    <section className="border border-[#efcfe1] bg-white">
      <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('title')}</p>
      </div>
      <div className="grid gap-2 px-4 py-3 sm:grid-cols-3">
        <div className="border border-[#f0dbe8] bg-[#fffafd] px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8b5a75]">{t('customerTotal')}</p>
          <p className="mt-1 text-base font-bold text-[#3d1530]">{customerAmount}</p>
          <p className="text-[10px] text-zinc-400">{t('customerTotalHint', { currency: orderCurrencyIso })}</p>
        </div>
        <div className="border border-[#f0dbe8] bg-[#fffafd] px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8b5a75]">{t('retailReference')}</p>
          <p className="mt-1 text-base font-bold text-[#3d1530]">{retailAmount}</p>
          <p className="text-[10px] text-zinc-400">{t('retailReferenceHint')}</p>
        </div>
        <div className="border border-[#f0dbe8] bg-[#fffafd] px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8b5a75]">{t('declaredCustoms')}</p>
          <p className="mt-1 text-base font-bold text-[#d24a90]">
            {isOutsideEU ? money(declaredValue, declarationCurrency) : t('notRequired')}
          </p>
          <p className="text-[10px] text-zinc-400">
            {isOutsideEU ? t('declaredCustomsHint', { carrier }) : t('withinEuHint')}
          </p>
        </div>
      </div>
      <div className="border-t border-[#f0dbe8] bg-[#fffafd] px-4 py-2.5 text-[10px] leading-4 text-[#694d5f]">
        <p>{t('currencyExplanation', { customerAmount, retailAmount, currency: declarationCurrency })}</p>
        {isOutsideEU ? (
          <p className="mt-1 font-medium text-[#8b5a75]">
            {hasStoredUsdCustomsValue
              ? declarationCurrency === 'USD' ? t('customsFromUsdDirect') : t('customsFromUsd')
              : t('customsFromRetail')}
          </p>
        ) : null}
      </div>
    </section>
  )
}
