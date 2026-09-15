'use client'

import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { AdminShippingRateOption, FedExRateSurcharge } from '../../types/order'
import styles from './ShipmentWorkspace.module.css'

const money = (value: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(value)
const amount = (value?: number) => (value === undefined ? '—' : money(value))

// Match the same carrier charge on both sides, without losing repeated or list-only lines.
function matchCharges(walkIn: FedExRateSurcharge[] = [], account: FedExRateSurcharge[] = []) {
  const used = new Set<number>()
  const normalize = (value: string) => value.trim().toUpperCase()
  const rows: Array<{ walkIn?: FedExRateSurcharge; account?: FedExRateSurcharge }> = account.map((charge) => {
    let index = walkIn.findIndex(
      (line, i) => !used.has(i) && Boolean(charge.type) && normalize(line.type) === normalize(charge.type),
    )
    if (index < 0 && charge.description) {
      index = walkIn.findIndex(
        (line, i) =>
          !used.has(i) &&
          (!charge.type || !line.type) &&
          normalize(line.description) === normalize(charge.description),
      )
    }
    if (index >= 0) used.add(index)
    return { account: charge, walkIn: index >= 0 ? walkIn[index] : undefined }
  })
  walkIn.forEach((line, index) => {
    if (!used.has(index)) rows.push({ walkIn: line })
  })
  return rows
}

function ComparisonRow({
  label,
  walkIn,
  account,
  emphasized = false,
  discount = false,
}: {
  label: ReactNode
  walkIn?: ReactNode
  account?: ReactNode
  emphasized?: boolean
  discount?: boolean
}) {
  return (
    <tr className={`${emphasized ? styles.comparisonSubtotal : ''} ${discount ? styles.discount : ''}`}>
      <th scope="row">{label}</th>
      <td>{walkIn ?? '—'}</td>
      <td>{account ?? '—'}</td>
    </tr>
  )
}

/** Compare quote prices line by line, following the original carrier form. */
export default function ShipmentRateDetails({ rate }: { rate: AdminShippingRateOption }) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  const savings =
    rate.listPrice !== undefined && rate.listPrice > rate.price ? rate.listPrice - rate.price : undefined
  const freightDiscount =
    rate.totalDiscount ??
    (rate.freightDiscounts?.length
      ? rate.freightDiscounts.reduce((sum, line) => sum + line.amount, 0)
      : undefined)
  const afterDiscount =
    rate.baseCharge !== undefined && freightDiscount !== undefined && freightDiscount > 0
      ? Math.round((rate.baseCharge - freightDiscount) * 100) / 100
      : undefined
  const hasWalkIn =
    [
      rate.listPrice,
      rate.listBaseCharge,
      rate.listTotalSurcharges,
      rate.listTotalTaxes,
      rate.listFuelSurchargePercent,
    ].some((value) => value !== undefined) || Boolean(rate.listSurcharges?.length || rate.listTaxes?.length)
  const hasBreakdown =
    [
      rate.baseCharge,
      rate.totalDiscount,
      rate.totalSurcharges,
      rate.totalTaxes,
      rate.netFedExCharge,
      rate.fuelSurchargePercent,
    ].some((value) => value !== undefined) ||
    Boolean(rate.freightDiscounts?.length || rate.surcharges?.length || rate.taxes?.length)
  return (
    <div className={styles.rateDetailsBody}>
      <table className={styles.comparisonTable} aria-label={t('chargeBreakdown')}>
        <colgroup>
          <col className={styles.comparisonLabelColumn} />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">{t('chargeLine')}</th>
            <th scope="col">{t('walkInRate')}</th>
            <th scope="col">{t('accountQuote')}</th>
          </tr>
        </thead>
        <tbody>
          {(rate.baseCharge !== undefined || rate.listBaseCharge !== undefined) && (
            <ComparisonRow
              label={t('baseCharge')}
              walkIn={amount(rate.listBaseCharge)}
              account={amount(rate.baseCharge)}
            />
          )}
          {rate.freightDiscounts?.map((line, index) => (
            <ComparisonRow
              key={`discount-${index}`}
              discount
              label={
                <>
                  {line.description || t('discounts')}
                  {line.percent > 0 ? ` (${line.percent}%)` : ''}
                </>
              }
              account={
                <>
                  {line.amount > 0 ? '−' : ''}
                  {money(line.amount)}
                </>
              }
            />
          ))}
          {rate.totalDiscount !== undefined && (
            <ComparisonRow
              label={t('totalDiscounts')}
              discount
              account={
                <>
                  {rate.totalDiscount > 0 ? '−' : ''}
                  {money(rate.totalDiscount)}
                </>
              }
            />
          )}
          {afterDiscount !== undefined && (
            <ComparisonRow label={t('afterDiscount')} emphasized account={money(afterDiscount)} />
          )}
          {matchCharges(rate.listSurcharges, rate.surcharges).map((row, index) => (
            <ComparisonRow
              key={`surcharge-${index}`}
              label={row.account?.description || row.walkIn?.description || t('surcharges')}
              walkIn={amount(row.walkIn?.amount)}
              account={amount(row.account?.amount)}
            />
          ))}
          {(rate.fuelSurchargePercent !== undefined || rate.listFuelSurchargePercent !== undefined) && (
            <ComparisonRow
              label={t('fuelPercent')}
              walkIn={
                rate.listFuelSurchargePercent !== undefined ? `${rate.listFuelSurchargePercent}%` : undefined
              }
              account={rate.fuelSurchargePercent !== undefined ? `${rate.fuelSurchargePercent}%` : undefined}
            />
          )}
          {(rate.totalSurcharges !== undefined || rate.listTotalSurcharges !== undefined) && (
            <ComparisonRow
              label={t('totalSurcharges')}
              walkIn={amount(rate.listTotalSurcharges)}
              account={amount(rate.totalSurcharges)}
            />
          )}
          {rate.netFedExCharge !== undefined && (
            <ComparisonRow label={t('beforeTaxes')} account={money(rate.netFedExCharge)} />
          )}
          {matchCharges(rate.listTaxes, rate.taxes).map((row, index) => (
            <ComparisonRow
              key={`tax-${index}`}
              label={row.account?.description || row.walkIn?.description || t('taxes')}
              walkIn={amount(row.walkIn?.amount)}
              account={amount(row.account?.amount)}
            />
          ))}
          {(rate.totalTaxes !== undefined || rate.listTotalTaxes !== undefined) && (
            <ComparisonRow
              label={t('totalTaxes')}
              walkIn={amount(rate.listTotalTaxes)}
              account={amount(rate.totalTaxes)}
            />
          )}
        </tbody>
        <tfoot>
          <ComparisonRow
            label={t('quotedTotal')}
            walkIn={amount(rate.listPrice)}
            account={money(rate.price)}
            emphasized
          />
          {savings !== undefined && (
            <tr className={styles.comparisonSavings}>
              <th scope="row">{t('savings')}</th>
              <td colSpan={2}>{money(savings)}</td>
            </tr>
          )}
        </tfoot>
      </table>
      {rate.billingWeightKg !== undefined && (
        <p className={styles.rateDetailsNote}>
          {t('billingWeight')}: {rate.billingWeightKg} kg
        </p>
      )}
      {!hasWalkIn && <p className={styles.rateDetailsNote}>{t('walkInUnavailable')}</p>}
      {!hasBreakdown && <p className={styles.rateDetailsNote}>{t('breakdownUnavailable')}</p>}
    </div>
  )
}
