'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ClipboardList,
  Loader2,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { AdminShipmentPreview, AdminShippingRateOption, ShippingCarrier } from '../../types/order'
import styles from './ShipmentWorkspace.module.css'
import ShipmentRateDetails from './ShipmentRateDetails'

export function CarrierLogo({ carrier }: { carrier: ShippingCarrier }) {
  return (
    <span className={`${styles.logo} ${carrier === 'DHL' ? styles.dhlLogo : ''}`}>
      {/* Local vector assets preserve the carriers' original wordmarks. */}
      <img
        src={`/carriers/${carrier === 'DHL' ? 'dhl' : 'fedex'}.svg`}
        alt={carrier === 'DHL' ? 'DHL' : 'FedEx'}
        width={112}
        height={34}
      />
    </span>
  )
}

export function ShipmentDialog({
  children,
  onClose,
  busy = false,
}: {
  children: ReactNode
  onClose: () => void
  busy?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])
  return (
    <div className={styles.overlay}>
      <div
        ref={ref}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shipment-dialog-title"
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && !busy) {
            event.stopPropagation()
            onClose()
          }
          if (event.key !== 'Tab') return
          const elements = Array.from(
            ref.current?.querySelectorAll<HTMLElement>(
              'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
            ) ?? [],
          ).filter((el) => el.getClientRects().length > 0)
          const first = elements[0]
          const last = elements[elements.length - 1]
          if (!first) {
            event.preventDefault()
            return
          }
          if (
            event.shiftKey &&
            (document.activeElement === first || document.activeElement === ref.current)
          ) {
            event.preventDefault()
            last.focus()
          } else if (
            !event.shiftKey &&
            (document.activeElement === last || document.activeElement === ref.current)
          ) {
            event.preventDefault()
            first.focus()
          }
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function ShipmentHeader({
  orderNumber,
  carrier,
  onClose,
  busy,
}: {
  orderNumber: string
  carrier?: ShippingCarrier
  onClose: () => void
  busy?: boolean
}) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  return (
    <header className={styles.header}>
      <div className={styles.headerIcon}>
        <Package size={23} />
      </div>
      <div className={styles.headerText}>
        <div className={styles.eyebrow}>{t('fulfillment')}</div>
        <h2 id="shipment-dialog-title">{t('createShipment')}</h2>
      </div>
      <span className={styles.orderNumber}>{orderNumber}</span>
      {carrier && <CarrierLogo carrier={carrier} />}
      <button
        className={styles.close}
        type="button"
        onClick={onClose}
        disabled={busy}
        aria-label={t('close')}
      >
        <X size={20} />
      </button>
    </header>
  )
}

export function ShipmentRoute({ preview }: { preview?: AdminShipmentPreview }) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  return (
    <div className={styles.route}>
      <div>
        <span className={styles.routeLabel}>
          <span className={styles.originDot} />
          {t('from')}
        </span>
        <strong>
          {preview?.shipper.city || '—'}
          <small>{preview?.shipper.country}</small>
        </strong>
        <span>{preview?.shipper.name || '—'}</span>
      </div>
      <div className={styles.routeLine}>
        <span />
        <Truck size={20} />
        <span />
        <ChevronRight size={15} />
      </div>
      <div>
        <span className={styles.routeLabel}>
          <MapPin size={13} />
          {t('to')}
        </span>
        <strong>
          {preview?.receiver.city || '—'}
          <small>{preview?.receiver.country}</small>
        </strong>
        <span>{preview?.receiver.name || '—'}</span>
      </div>
      <div className={styles.routePackage}>
        <Package size={22} />
        <div>
          <strong>{preview?.package.totalWeightKg ?? '—'} kg</strong>
          <span>{t('items', { count: preview?.items.reduce((sum, item) => sum + item.qty, 0) ?? 0 })}</span>
        </div>
      </div>
    </div>
  )
}

export function CarrierSelection({
  preview,
  onSelect,
}: {
  preview?: AdminShipmentPreview
  onSelect: (carrier: ShippingCarrier) => void
}) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  return (
    <div className={styles.picker}>
      <div className={styles.pickerIntro}>
        <h3>{t('chooseCarrier')}</h3>
        <p>{t('carrierDescription')}</p>
      </div>
      <ShipmentRoute preview={preview} />
      <div className={styles.carrierGrid}>
        {(['FEDEX', 'DHL'] as const).map((carrier) => (
          <button
            key={carrier}
            type="button"
            onClick={() => onSelect(carrier)}
            className={`${styles.carrierCard} ${carrier === 'DHL' ? styles.dhlCard : styles.fedexCard}`}
          >
            <div className={styles.carrierBrand}>
              <CarrierLogo carrier={carrier} />
              <span className={styles.carrierArrow}>
                <ArrowRight size={20} />
              </span>
            </div>
            <div className={styles.carrierCardBody}>
              <h4>{carrier === 'DHL' ? 'DHL' : 'FedEx'}</h4>
              <div className={styles.carrierCta}>
                {t('continueWith', { carrier: carrier === 'DHL' ? 'DHL' : 'FedEx' })}
                <ArrowRight size={16} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ShipmentLoading() {
  const { t } = useTranslation('common', { keyPrefix: 'admin.common' })
  return (
    <div className={styles.shipmentLoading} role="status" aria-live="polite">
      <div className={styles.loadingScene} aria-hidden="true">
        <Package className={styles.loadingParcel} size={25} />
        <div className={styles.loadingTruck}>
          <Truck size={68} strokeWidth={1.25} />
        </div>
        <MapPin className={styles.loadingDestination} size={27} strokeWidth={1.5} />
        <div className={styles.loadingRoad} />
      </div>
      <strong>{t('loading')}</strong>
      <div className={styles.loadingCarriers}>
        <CarrierLogo carrier="FEDEX" />
        <span aria-hidden="true">&</span>
        <CarrierLogo carrier="DHL" />
      </div>
    </div>
  )
}

export function ShipmentRateCards({
  rates,
  selected,
  onSelect,
  loading,
  error,
  onRetry,
}: {
  rates: AdminShippingRateOption[]
  selected: string
  onSelect: (code: string) => void
  loading: boolean
  error: string
  onRetry: () => void
}) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  const [expandedRate, setExpandedRate] = useState<string | null>(null)
  const disclosureId = useId()
  if (loading)
    return (
      <div className={styles.rateState} role="status">
        <Loader2 className={styles.spin} size={23} />
        <strong>{t('loadingRates')}</strong>
        <span>{t('loadingRatesHint')}</span>
      </div>
    )
  if (error || !rates.length)
    return (
      <div className={styles.rateState} role="alert">
        <Truck size={25} />
        <strong>{error || t('noRates')}</strong>
        <button type="button" className={styles.secondary} onClick={onRetry}>
          {t('retry')}
        </button>
      </div>
    )
  const lowest = Math.min(...rates.map((rate) => rate.price))
  return (
    <fieldset className={styles.rates}>
      <legend className="sr-only">{t('chooseService')}</legend>
      {rates.map((rate) => (
        <div key={rate.serviceCode} className={styles.rateOption}>
          <label
            onClick={() => setExpandedRate(rate.serviceCode)}
            className={`${styles.rateCard} ${selected === rate.serviceCode ? styles.selectedRate : ''}`}
          >
            <input
              type="radio"
              name="shipment-service"
              checked={selected === rate.serviceCode}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                  setExpandedRate(rate.serviceCode)
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    onSelect(rate.serviceCode)
                  }
                }
              }}
              onChange={() => {
                onSelect(rate.serviceCode)
                setExpandedRate(rate.serviceCode)
              }}
            />
            <div className={styles.rateName}>
              <strong>{rate.serviceName}</strong>
              <span>
                {rate.estimatedDelivery
                  ? t('estimatedDate', {
                      date: new Date(`${rate.estimatedDelivery.slice(0, 10)}T12:00:00`).toLocaleDateString(
                        undefined,
                        { weekday: 'short', month: 'short', day: 'numeric' },
                      ),
                    })
                  : rate.deliveryDays > 0
                    ? t('estimatedDays', { count: rate.deliveryDays })
                    : t('deliveryAtBooking')}
              </span>
              {rate.price === lowest && rates.length > 1 && <small>{t('lowestRate')}</small>}
            </div>
            <div className={styles.ratePrice}>
              <strong>{money(rate.price)}</strong>
              <span>EUR</span>
            </div>
          </label>
          <div className={styles.rateDisclosure}>
            <button
              type="button"
              aria-expanded={expandedRate === rate.serviceCode}
              aria-controls={`${disclosureId}-${rate.serviceCode}`}
              aria-label={`${t('viewRateDetails')}: ${rate.serviceName}`}
              onClick={() =>
                setExpandedRate((current) => (current === rate.serviceCode ? null : rate.serviceCode))
              }
            >
              <span>{t('viewRateDetails')}</span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            <div id={`${disclosureId}-${rate.serviceCode}`} hidden={expandedRate !== rate.serviceCode}>
              {expandedRate === rate.serviceCode && <ShipmentRateDetails rate={rate} />}
            </div>
          </div>
        </div>
      ))}
    </fieldset>
  )
}

function money(value: number, currency = 'EUR') {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency }).format(value)
}
const sectionIcons = [MapPin, Package, Truck, ClipboardList]

export type ShipmentSummaryGroup = {
  title: string
  rows: Array<{ label: string; value: ReactNode }>
}

function ShipmentCharges({ rate }: { rate: AdminShippingRateOption }) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  const savings =
    rate.listPrice !== undefined && rate.listPrice > rate.price ? rate.listPrice - rate.price : null
  const discounts = rate.freightDiscounts ?? []
  const surcharges = rate.surcharges ?? []
  const taxes = rate.taxes ?? []
  const itemized =
    rate.baseCharge !== undefined || discounts.length > 0 || surcharges.length > 0 || taxes.length > 0
  return (
    <section className={styles.chargeBreakdown} aria-label={t('chargeBreakdown')}>
      <h4>{t('chargeBreakdown')}</h4>
      <dl>
        {rate.baseCharge !== undefined && (
          <div>
            <dt>{t('baseCharge')}</dt>
            <dd>{money(rate.baseCharge)}</dd>
          </div>
        )}
        {discounts.map((discount, index) => (
          <div key={`discount-${index}`} className={styles.discount}>
            <dt>
              {discount.description || t('discounts')}
              {discount.percent > 0 ? ` (${discount.percent}%)` : ''}
            </dt>
            <dd>−{money(discount.amount)}</dd>
          </div>
        ))}
        {!discounts.length && rate.totalDiscount !== undefined && rate.totalDiscount > 0 && (
          <div className={styles.discount}>
            <dt>{t('discounts')}</dt>
            <dd>−{money(rate.totalDiscount)}</dd>
          </div>
        )}
        {surcharges.map((charge, index) => (
          <div key={`surcharge-${index}`}>
            <dt>{charge.description || charge.type || t('surcharges')}</dt>
            <dd>{money(charge.amount)}</dd>
          </div>
        ))}
        {!surcharges.length && rate.totalSurcharges !== undefined && (
          <div>
            <dt>{t('surcharges')}</dt>
            <dd>{money(rate.totalSurcharges)}</dd>
          </div>
        )}
        {taxes.map((tax, index) => (
          <div key={`tax-${index}`}>
            <dt>{tax.description || tax.type || t('taxes')}</dt>
            <dd>{money(tax.amount)}</dd>
          </div>
        ))}
        {!taxes.length && rate.totalTaxes !== undefined && (
          <div>
            <dt>{t('taxes')}</dt>
            <dd>{money(rate.totalTaxes)}</dd>
          </div>
        )}
        <div className={styles.chargeTotal}>
          <dt>{t('quotedTotal')}</dt>
          <dd>{money(rate.price)}</dd>
        </div>
        {rate.listPrice !== undefined && (
          <div>
            <dt>{t('publicRate')}</dt>
            <dd>{money(rate.listPrice)}</dd>
          </div>
        )}
        {savings !== null && (
          <div className={styles.discount}>
            <dt>{t('savings')}</dt>
            <dd>{money(savings)}</dd>
          </div>
        )}
        {rate.billingWeightKg !== undefined && (
          <div>
            <dt>{t('billingWeight')}</dt>
            <dd>{rate.billingWeightKg} kg</dd>
          </div>
        )}
      </dl>
      {!itemized && <p>{t('breakdownUnavailable')}</p>}
    </section>
  )
}

export default function ShipmentWorkspace({
  carrier,
  preview,
  selectedRate,
  loading,
  shipDate,
  incoterm,
  customsValue,
  dimensions,
  sections,
  summaryGroups,
  addressPending = false,
  footer,
  alerts,
  busy = false,
}: {
  carrier: ShippingCarrier
  preview?: AdminShipmentPreview
  selectedRate: AdminShippingRateOption | null
  loading: boolean
  shipDate: string
  incoterm: string
  customsValue: number
  dimensions: string[]
  sections: ReactNode[]
  summaryGroups: ShipmentSummaryGroup[]
  addressPending?: boolean
  footer: (ratesRevealed: boolean) => ReactNode
  alerts: ReactNode
  busy?: boolean
}) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  const [ratesRevealed, setRatesRevealed] = useState(false)
  const serviceSection = useRef<HTMLDivElement>(null)
  const sectionNames = ['addresses', 'parcel', 'service', 'review']

  useEffect(() => {
    const section = serviceSection.current
    if (!section) return
    // The viewport observer also respects the form's scroll-container clipping.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRatesRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  function showServices() {
    serviceSection.current?.scrollIntoView({ block: 'start' })
  }
  return (
    <div className={styles.workspace} data-carrier={carrier}>
      <ShipmentRoute preview={preview} />
      <div className={styles.body}>
        <div className={styles.pane}>
          {sections.map((section, index) => {
            const Icon = sectionIcons[index]
            const name = sectionNames[index]
            return (
              <div key={name} ref={index === 2 ? serviceSection : undefined} className={styles.formSection}>
                <div className={styles.sectionIntro}>
                  <div>
                    <h3 id={`shipment-section-${name}`}>{t(`titles.${name}`)}</h3>
                    <p>{t(`hints.${name}`)}</p>
                  </div>
                  <span className={styles.sectionIcon}>
                    <Icon size={25} />
                  </span>
                </div>
                <fieldset
                  disabled={busy}
                  className={styles.formContent}
                  aria-labelledby={`shipment-section-${name}`}
                >
                  {section}
                </fieldset>
              </div>
            )
          })}
        </div>
        <aside className={styles.summary} aria-label={t('summary')}>
          <div className={styles.summaryTitle}>
            <h3>{t('summary')}</h3>
            <span>
              <span />
              {t('live')}
            </span>
          </div>
          {ratesRevealed ? (
            <>
              <div className={styles.summaryCarrier}>
                <CarrierLogo carrier={carrier} />
                <span>{t('accountRate')}</span>
              </div>
              <div className={styles.summaryService} aria-live="polite">
                <span className={styles.eyebrow}>{t('selectedService')}</span>
                <h4>{loading ? t('updatingRate') : selectedRate?.serviceName || t('selectAService')}</h4>
                <div className={styles.summaryPrice}>
                  {loading ? (
                    <Loader2 className={styles.spin} size={25} />
                  ) : selectedRate ? (
                    money(selectedRate.price)
                  ) : (
                    '—'
                  )}
                  <small>EUR</small>
                </div>
                {!loading && selectedRate && (
                  <p>
                    {selectedRate.estimatedDelivery &&
                    !Number.isNaN(Date.parse(selectedRate.estimatedDelivery))
                      ? t('estimatedDate', {
                          date: new Date(
                            `${selectedRate.estimatedDelivery.slice(0, 10)}T12:00:00`,
                          ).toLocaleDateString(undefined, {
                            day: 'numeric',
                            month: 'short',
                            weekday: 'short',
                          }),
                        })
                      : selectedRate.deliveryDays > 0
                        ? t('estimatedDays', { count: selectedRate.deliveryDays })
                        : t('deliveryAtBooking')}
                  </p>
                )}
                <p>{t('quoteNote')}</p>
              </div>
              {!loading && selectedRate && <ShipmentCharges rate={selectedRate} />}
            </>
          ) : (
            <div className={styles.ratesPending}>
              <Truck size={23} aria-hidden="true" />
              <p>{t('ratesHiddenHint')}</p>
              <button type="button" className={styles.next} onClick={showServices} disabled={busy}>
                {t('chooseService')}
                <ArrowRight size={15} />
              </button>
            </div>
          )}
          <dl className={styles.summaryDetails}>
            <div>
              <dt>{t('shipDate')}</dt>
              <dd>{shipDate || '—'}</dd>
            </div>
            <div>
              <dt>{t('weight')}</dt>
              <dd>{preview?.package.totalWeightKg ?? '—'} kg</dd>
            </div>
            <div>
              <dt>{t('dimensions')}</dt>
              <dd>
                {dimensions.some(Boolean)
                  ? `${dimensions.map((value) => value || '—').join(' × ')} cm`
                  : t('carrierDefault')}
              </dd>
            </div>
            <div>
              <dt>{t('customsValue')}</dt>
              <dd>
                {preview?.package.isOutsideEU
                  ? money(customsValue, preview.package.declarationCurrency)
                  : t('notRequired')}
              </dd>
            </div>
            <div>
              <dt>{t('duties')}</dt>
              <dd>{incoterm}</dd>
            </div>
          </dl>
          {addressPending && (
            <p className={styles.pendingAddress} role="status">
              {t('addressPending')}
            </p>
          )}
          {summaryGroups.map((group) => (
            <section key={group.title} className={styles.summaryGroup}>
              <h4>{group.title}</h4>
              <dl>
                {group.rows.map((row, index) => (
                  <div key={`${row.label}-${index}`}>
                    <dt>{row.label}</dt>
                    <dd>{row.value === '' || row.value == null ? t('notProvided') : row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
          <div className={styles.summaryHint}>
            <ShieldCheck size={18} />
            <p>{t('reviewHint')}</p>
          </div>
        </aside>
      </div>
      <div className={styles.alerts} role="status">
        {alerts}
      </div>
      <footer className={styles.footer}>{footer(ratesRevealed)}</footer>
    </div>
  )
}
