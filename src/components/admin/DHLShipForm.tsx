'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import type { AdminShippingQuote, AdminShipmentPreviewItem, AdminShippingRateOption, Order } from '../../types/order'
import {
  shipOrderForAdmin,
  updateOrderShippingAddressForAdmin,
  getAdminCarrierRatesForOrder,
  type DhlShipOptions,
} from '../../services/orderService'
import { getCountryOptions, getStateOptions } from '../../utils/location'

const INCOTERM_VALUES = ['DAP', 'DDP', 'DDU', 'CPT', 'CIP', 'EXW', 'FCA'] as const

const SHIPMENT_TYPE_VALUES = ['commercial', 'personal'] as const

const EXPORT_REASON_VALUES = [
  'permanent',
  'gift',
  'sample',
  'return',
  'temporary',
  'warranty_replacement',
  'personal_belongings_or_personal_use',
] as const

const DUTIES_PAYMENT_VALUES = ['SENDER', 'RECIPIENT', 'THIRD_PARTY'] as const

type CommodityRow = AdminShipmentPreviewItem & {
  hsCode: string
  countryOfManufacture: string
  customsValueEUR: number
}

type ReceiverDraft = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

type Props = {
  order: Order
  preview: AdminShippingQuote
  onBack: () => void
  onShipped: () => void
}

function fmt(n: number) {
  return `€${n.toFixed(2)}`
}

export default function DHLShipForm({ order, preview: previewQuote, onBack, onShipped }: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.dhlShipForm' })
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'admin.common' })

  const incotermOptions = useMemo(
    () => INCOTERM_VALUES.map((value) => ({ value, label: t(`incotermOptions.${value}`) })),
    [t],
  )
  const shipmentTypeOptions = useMemo(
    () => SHIPMENT_TYPE_VALUES.map((value) => ({ value, label: t(`shipmentTypeOptions.${value}`) })),
    [t],
  )
  const exportReasonOptions = useMemo(
    () => EXPORT_REASON_VALUES.map((value) => ({ value, label: t(`exportReasonOptions.${value}`) })),
    [t],
  )
  const dutiesPaymentOptions = useMemo(
    () => DUTIES_PAYMENT_VALUES.map((value) => ({ value, label: t(`dutiesPaymentOptions.${value}`) })),
    [t],
  )

  const preview = previewQuote.preview
  const validation = previewQuote.validation

  const [dhlRates, setDhlRates] = useState<AdminShippingRateOption[]>([])
  const [isLoadingRates, setIsLoadingRates] = useState(true)
  const [ratesError, setRatesError] = useState('')

  const [selectedServiceCode, setSelectedServiceCode] = useState('')

  async function loadDhlRates() {
    setIsLoadingRates(true)
    setRatesError('')
    setDhlRates([])
    setSelectedServiceCode('')
    try {
      const q = await getAdminCarrierRatesForOrder(order.id, 'DHL')
      const rates = q?.rates.DHL ?? []
      setDhlRates(rates)
      if (rates[0]) setSelectedServiceCode(rates[0].serviceCode)
    } catch {
      setRatesError(t('ratesLoadError'))
    } finally {
      setIsLoadingRates(false)
    }
  }

  useEffect(() => {
    void loadDhlRates()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.id])

  const [isEditingReceiver, setIsEditingReceiver] = useState(false)
  const [receiverDraft, setReceiverDraft] = useState<ReceiverDraft>({
    street: preview?.receiver.street ?? '',
    city: preview?.receiver.city ?? '',
    state: preview?.receiver.state ?? '',
    postalCode: preview?.receiver.postalCode ?? '',
    country: preview?.receiver.country ?? '',
  })
  const [isSavingReceiver, setIsSavingReceiver] = useState(false)
  const [receiverSaveError, setReceiverSaveError] = useState('')
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const stateOptions = useMemo(() => getStateOptions(receiverDraft.country), [receiverDraft.country])

  const isOutsideEU = preview?.package.retailValueEUR !== undefined

  const [commodities, setCommodities] = useState<CommodityRow[]>(
    (preview?.items ?? []).map((it) => ({
      ...it,
      hsCode: it.hsCode,
      countryOfManufacture: it.mfrCountry,
      customsValueEUR: isOutsideEU && it.customsValueUSD != null
        ? parseFloat((it.customsValueUSD * it.qty).toFixed(2))
        : parseFloat((it.unitPriceEUR * it.qty).toFixed(2)),
    }))
  )

  const [incoterm, setIncoterm] = useState('DAP')
  const [shipmentType, setShipmentType] = useState<'commercial' | 'personal'>('commercial')
  const [exportReasonType, setExportReasonType] = useState('permanent')
  const [dimL, setDimL] = useState('20')
  const [dimW, setDimW] = useState('15')
  const [dimH, setDimH] = useState('10')

  const [insuranceEnabled, setInsuranceEnabled] = useState(false)
  const [insuranceValueEUR, setInsuranceValueEUR] = useState('')
  const [saturdayDelivery, setSaturdayDelivery] = useState(false)
  const [paperlessTrade, setPaperlessTrade] = useState(false)

  const [dutiesPaymentType, setDutiesPaymentType] = useState<'SENDER' | 'RECIPIENT' | 'THIRD_PARTY'>('SENDER')
  const [dutiesAccountNumber, setDutiesAccountNumber] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState(order.orderNumber || '')

  const [notifyRecipient, setNotifyRecipient] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(preview?.receiver.email ?? '')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedRate = dhlRates.find((r) => r.serviceCode === selectedServiceCode) ?? null
  const hasBlockers = (validation?.issues?.length ?? 0) > 0

  async function handleSaveReceiver() {
    if (!receiverDraft.street || !receiverDraft.city || !receiverDraft.postalCode || !receiverDraft.country) {
      setReceiverSaveError(t('errors.fillRequiredAddress'))
      return
    }
    setIsSavingReceiver(true)
    setReceiverSaveError('')
    try {
      await updateOrderShippingAddressForAdmin(order.id, receiverDraft)
      setIsEditingReceiver(false)
      toast.success(t('toast.addressUpdated'))
      void loadDhlRates()
    } catch (err: any) {
      setReceiverSaveError(err?.response?.data?.message || t('errors.updateAddressFailed'))
    } finally {
      setIsSavingReceiver(false)
    }
  }

  async function handleSubmit() {
    if (!selectedServiceCode) {
      toast.error(t('errors.selectService'))
      return
    }
    setIsSubmitting(true)
    try {
      const dhlOptions: DhlShipOptions = {
        incoterm,
        shipmentType,
        exportReasonType,
        dimensions: dimL && dimW && dimH
          ? { lengthCm: parseFloat(dimL), widthCm: parseFloat(dimW), heightCm: parseFloat(dimH) }
          : undefined,
        insurance: insuranceEnabled
          ? {
              enabled: true,
              valueEUR: insuranceValueEUR
                ? parseFloat(insuranceValueEUR)
                : (preview?.package.declaredValueEUR ?? 0),
            }
          : undefined,
        saturdayDelivery: saturdayDelivery || undefined,
        paperlessTrade: paperlessTrade || undefined,
        notificationEmails: notifyRecipient && notifyEmail ? [notifyEmail] : undefined,
        dutiesPaymentType: incoterm === 'DDP' ? dutiesPaymentType : undefined,
        dutiesAccountNumber:
          incoterm === 'DDP' && dutiesPaymentType === 'THIRD_PARTY'
            ? dutiesAccountNumber
            : undefined,
        invoiceNumber: invoiceNumber || undefined,
        commodityOverrides: commodities.map((c) => ({
          hsCode: c.hsCode,
          countryOfManufacture: c.countryOfManufacture,
          customsValueEUR: c.customsValueEUR,
        })),
      }

      await shipOrderForAdmin(order.id, {
        carrier: 'DHL',
        serviceCode: selectedServiceCode,
        dhlOptions,
      })
      toast.success(t('toast.shipped', { orderNumber: order.orderNumber }))
      onShipped()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t('errors.createShipmentFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-5 text-sm text-[#4f2040]">

      <div className="grid grid-cols-2 gap-4 items-start">

        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
              {t('shipFrom')} <span className="ml-1 text-[10px] font-normal text-zinc-400">{t('readOnly')}</span>
            </p>
          </div>
          <div className="px-4 py-3 text-xs leading-6 text-[#694d5f]">
            {preview?.shipper ? (
              <>
                <p className="font-semibold text-[#4f2040]">{preview.shipper.name}</p>
                <p>{preview.shipper.street}{preview.shipper.houseNumber ? ' ' + preview.shipper.houseNumber : ''}</p>
                <p>{preview.shipper.city}{preview.shipper.postalCode ? ', ' + preview.shipper.postalCode : ''} · {preview.shipper.country}</p>
                <p>📞 {preview.shipper.phone}</p>
                <p>✉ {preview.shipper.email}</p>
              </>
            ) : (
              <p className="text-zinc-400">{tCommon('loading')}</p>
            )}
          </div>
        </section>

        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('deliverTo')}</p>
            {!isEditingReceiver ? (
              <button type="button" onClick={() => setIsEditingReceiver(true)}
                className="border border-[#d24a90] px-2 py-0.5 text-[10px] font-semibold text-[#d24a90] hover:bg-[#fff2fb]">
                {tCommon('edit')}
              </button>
            ) : null}
          </div>
          <div className="px-4 py-3">
            {!isEditingReceiver ? (
              <div className="text-xs leading-6 text-[#694d5f]">
                <p className="font-semibold text-[#4f2040]">{preview?.receiver.name}</p>
                <p>{preview?.receiver.street}</p>
                <p>
                  {preview?.receiver.city}
                  {preview?.receiver.state ? ', ' + preview.receiver.state : ''}
                  {preview?.receiver.postalCode ? ' ' + preview.receiver.postalCode : ''} · {preview?.receiver.country}
                </p>
                <p className={validation?.receiverPhoneOk === false ? 'text-rose-600' : ''}>📞 {preview?.receiver.phone || '—'}</p>
                <p className={validation?.receiverEmailOk === false ? 'text-rose-600' : ''}>✉ {preview?.receiver.email || '—'}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(['street', 'city', 'postalCode'] as const).map((field) => (
                  <div key={field} className="flex items-center gap-2">
                    <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{tCommon(field)} *</label>
                    <input value={receiverDraft[field]}
                      onChange={(e) => setReceiverDraft((p) => ({ ...p, [field]: e.target.value }))}
                      className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]" />
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{tCommon('countryLabel')} *</label>
                  <select value={receiverDraft.country}
                    onChange={(e) => setReceiverDraft((p) => ({ ...p, country: e.target.value, state: '' }))}
                    className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
                    <option value="">{tCommon('selectCountry')}</option>
                    {countryOptions.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{tCommon('stateLabel')}</label>
                  <select value={receiverDraft.state}
                    onChange={(e) => setReceiverDraft((p) => ({ ...p, state: e.target.value }))}
                    className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
                    <option value="">{tCommon('selectState')}</option>
                    {stateOptions.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                  </select>
                </div>
                {receiverSaveError ? <p className="text-[10px] text-rose-600">{receiverSaveError}</p> : null}
                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => { setIsEditingReceiver(false); setReceiverSaveError('') }}
                    disabled={isSavingReceiver}
                    className="border border-[#e3bfd6] px-3 py-1 text-[10px] font-semibold text-[#6f4f65] hover:bg-[#fff7fb] disabled:opacity-60">
                    {tCommon('cancel')}
                  </button>
                  <button type="button" onClick={() => void handleSaveReceiver()} disabled={isSavingReceiver}
                    className="border border-[#d24a90] bg-[#d24a90] px-3 py-1 text-[10px] font-semibold text-white hover:bg-[#b83f7d] disabled:opacity-60">
                    {isSavingReceiver ? tCommon('saving') : tCommon('save')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {commodities.length > 0 ? (
        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('customsCommodities')}</p>
            <p className="mt-0.5 text-[10px] text-zinc-400">{t('onlyHsEditable')}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-[11px]">
              <thead className="bg-[#fff2fb]">
                <tr className="text-left text-[#8b5a75]">
                  <th className="px-3 py-2 font-semibold">{t('tableHeaders.number')}</th>
                  <th className="px-3 py-2 font-semibold">{t('tableHeaders.description')}</th>
                  <th className="px-3 py-2 font-semibold text-right">{t('tableHeaders.qty')}</th>
                  <th className="px-3 py-2 font-semibold text-right">{t('tableHeaders.unitEur')}</th>
                  <th className="px-3 py-2 font-semibold text-right">{t('tableHeaders.weightG')}</th>
                  <th className="px-3 py-2 font-semibold">{t('tableHeaders.hsCode')}</th>
                  <th className="px-3 py-2 font-semibold">{t('tableHeaders.countryOfMfr')}</th>
                  <th className="px-3 py-2 font-semibold text-right">{t('tableHeaders.customsValueEur')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f6e3ee]">
                {commodities.map((c, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-2 text-zinc-400">{c.number}</td>
                    <td className="px-3 py-2 max-w-[180px] truncate" title={c.title}>{c.title}</td>
                    <td className="px-3 py-2 text-right">{c.qty}</td>
                    <td className="px-3 py-2 text-right">{c.unitPriceEUR.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right">{c.unitWeightG}</td>
                    <td className="px-2 py-1.5">
                      <input
                        value={c.hsCode}
                        onChange={(e) => setCommodities((prev) => prev.map((r, i) => i === idx ? { ...r, hsCode: e.target.value } : r))}
                        maxLength={10}
                        className="w-24 border border-[#e3bfd6] px-1.5 py-1 font-mono text-[11px] outline-none focus:border-[#d24a90]"
                      />
                    </td>
                    <td className="px-3 py-2 font-mono uppercase">{c.countryOfManufacture}</td>
                    <td className="px-3 py-2 text-right font-mono">{c.customsValueEUR.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {preview?.package ? (
            <div className="border-t border-[#efcfe1] px-4 py-2.5 text-[11px] text-[#694d5f]">
              <span className="font-semibold text-[#4f2040]">{t('totalCustomsValue')} </span>
              {fmt(preview.package.declaredValueEUR)}
              <span className="ml-3 font-semibold text-[#4f2040]">{t('currency')} </span>EUR
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('customsDeclaration')}</p>
        </div>
        <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('incoterm')}</label>
            <select value={incoterm} onChange={(e) => setIncoterm(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {incotermOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('shipmentType')}</label>
            <select value={shipmentType} onChange={(e) => setShipmentType(e.target.value as 'commercial' | 'personal')}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {shipmentTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('exportReason')}</label>
            <select value={exportReasonType} onChange={(e) => setExportReasonType(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {exportReasonOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('invoiceNumber')}</label>
            <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
          </div>
        </div>
      </section>

      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('packageDetails')}</p>
        </div>
        <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
              {t('weightAuto')}
            </label>
            <div className="border border-[#e3bfd6] bg-[#f9f0f6] px-3 py-2 text-xs text-[#694d5f]">
              {preview?.package.totalWeightKg ?? 0} {tCommon('kg')}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
              {t('dimensionsCm')}
            </label>
            <div className="flex items-center gap-2">
              <input type="number" min="1" value={dimL} onChange={(e) => setDimL(e.target.value)} placeholder={t('dimensionL')}
                className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              <span className="text-zinc-400">×</span>
              <input type="number" min="1" value={dimW} onChange={(e) => setDimW(e.target.value)} placeholder={t('dimensionW')}
                className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              <span className="text-zinc-400">×</span>
              <input type="number" min="1" value={dimH} onChange={(e) => setDimH(e.target.value)} placeholder={t('dimensionH')}
                className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              <span className="text-xs text-zinc-400">{tCommon('cm')}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 items-start">

        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('selectDhlProduct')}</p>
          </div>
          <div className="px-4 py-3 space-y-3">
            {isLoadingRates ? (
              <p className="text-[11px] text-zinc-400">{t('loadingProducts')}</p>
            ) : ratesError ? (
              <p className="text-[11px] text-rose-600">{ratesError}</p>
            ) : dhlRates.length === 0 ? (
              <p className="text-[11px] text-rose-600">{t('noProducts')}</p>
            ) : (
              <select
                value={selectedServiceCode}
                onChange={(e) => setSelectedServiceCode(e.target.value)}
                className="w-full border border-[#e3bfd6] px-3 py-2.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
              >
                <option value="">{t('chooseProduct')}</option>
                {dhlRates.map((rate) => (
                  <option key={rate.serviceCode} value={rate.serviceCode}>
                    {rate.serviceName} ({rate.serviceCode})
                  </option>
                ))}
              </select>
            )}

            {selectedRate ? (
              <div className="flex items-center justify-between border border-[#f0dbe8] bg-[#fff8fd] px-3 py-2">
                <span className="text-[11px] text-[#694d5f]">
                  {selectedRate.deliveryDays
                    ? <span className="text-zinc-400">{tCommon('daysApprox', { count: selectedRate.deliveryDays })}</span>
                    : null}
                </span>
                <span className="font-mono font-bold text-amber-700">{fmt(selectedRate.price)}</span>
              </div>
            ) : null}
          </div>
        </section>

        {selectedRate ? (
          <section className="border border-[#efcfe1] bg-white">
            <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                {t('chargeBreakdown', { serviceName: selectedRate.serviceName })}
              </p>
            </div>
            <div className="px-4 py-3 space-y-1 text-[11px] text-[#694d5f]">
              {selectedRate.baseCharge !== undefined ? (
                <div className="flex justify-between">
                  <span>{t('baseCharge')}</span>
                  <span className="font-mono">{fmt(selectedRate.baseCharge)}</span>
                </div>
              ) : null}

              {(selectedRate.surcharges ?? []).map((s, i) => (
                <div key={`dhl-sur-${i}`} className="flex justify-between">
                  <span>{s.description}</span>
                  <span className="font-mono">+{fmt(s.amount)}</span>
                </div>
              ))}

              {(selectedRate.taxes ?? []).map((tax, i) => (
                <div key={`dhl-tax-${i}`} className="flex justify-between text-amber-700">
                  <span>{tax.description || tax.type}</span>
                  <span className="font-mono">+{fmt(tax.amount)}</span>
                </div>
              ))}

              <div className="mt-2 border-t border-[#f0dbe8] pt-2">
                <div className="flex justify-between font-bold text-[#3d1530] text-xs">
                  <span>{t('accountRate')} <span className="text-[9px] font-normal text-[#8b5a75]">{t('yourDhl')}</span></span>
                  <span className="font-mono text-amber-700">{fmt(selectedRate.price)}</span>
                </div>
              </div>

              {selectedRate.billingWeightKg ? (
                <div className="flex justify-between pt-1 text-zinc-400">
                  <span>{t('billingWeight')}</span>
                  <span>{selectedRate.billingWeightKg} {tCommon('kg')}</span>
                </div>
              ) : null}
              {selectedRate.deliveryDays ? (
                <div className="flex justify-between text-zinc-400">
                  <span>{t('estimatedTransit')}</span>
                  <span>{tCommon('daysApprox', { count: selectedRate.deliveryDays })}</span>
                </div>
              ) : null}
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center border border-dashed border-[#efcfe1] p-8 text-[11px] text-zinc-400">
            {t('selectProductBreakdown')}
          </div>
        )}
      </div>

      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('valueAddedServices')}</p>
        </div>
        <div className="grid gap-3 px-4 py-3 sm:grid-cols-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={insuranceEnabled} onChange={(e) => setInsuranceEnabled(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <span className="text-xs text-[#4f2040]">{t('shipmentInsurance')}</span>
          </label>
          {insuranceEnabled ? (
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('insuredEur')}</label>
              <input type="number" min="0" step="0.01" value={insuranceValueEUR}
                onChange={(e) => setInsuranceValueEUR(e.target.value)}
                placeholder={(preview?.package.declaredValueEUR ?? 0).toFixed(2)}
                className="w-28 border border-[#e3bfd6] px-2 py-1.5 text-xs outline-none focus:border-[#d24a90]" />
            </div>
          ) : <div />}

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={saturdayDelivery} onChange={(e) => setSaturdayDelivery(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <span className="text-xs text-[#4f2040]">{t('saturdayDelivery')}</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={paperlessTrade} onChange={(e) => setPaperlessTrade(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <span className="text-xs text-[#4f2040]">{t('paperlessTrade')}</span>
          </label>
        </div>
      </section>

      {incoterm === 'DDP' ? (
        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('billingDutiesPayment')}</p>
            <p className="mt-0.5 text-[10px] text-zinc-400">{t('ddpOnlyNote')}</p>
          </div>
          <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('billDutiesTo')}</label>
              <select value={dutiesPaymentType} onChange={(e) => setDutiesPaymentType(e.target.value as 'SENDER' | 'RECIPIENT' | 'THIRD_PARTY')}
                className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
                {dutiesPaymentOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            {dutiesPaymentType === 'THIRD_PARTY' ? (
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{t('thirdPartyAccount')}</label>
                <input value={dutiesAccountNumber} onChange={(e) => setDutiesAccountNumber(e.target.value)}
                  placeholder={t('accountNumberPlaceholder')}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">{t('shipmentNotifications')}</p>
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="dhl-notify-recipient" checked={notifyRecipient} onChange={(e) => setNotifyRecipient(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <label htmlFor="dhl-notify-recipient" className="text-xs text-[#4f2040]">{t('notifyRecipient')}</label>
          </div>
          {notifyRecipient ? (
            <div className="flex items-center gap-2">
              <label className="w-16 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{tCommon('email')}</label>
              <input value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)}
                type="email" placeholder={t('emailPlaceholder')}
                className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs outline-none focus:border-[#d24a90]" />
            </div>
          ) : null}
        </div>
      </section>

      <CustomsBreakdown
        commodities={commodities}
        pkg={preview?.package}
        isOutsideEU={isOutsideEU}
        incoterm={incoterm}
      />

      {hasBlockers ? (
        <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          <p className="mb-1 font-semibold">{t('cannotShipUntilFixed')}</p>
          <ul className="list-inside list-disc space-y-0.5">
            {validation!.issues.map((issue) => <li key={issue}>{issue}</li>)}
          </ul>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 border-t border-[#efcfe1] pt-4">
        <button type="button" onClick={onBack}
          className="border border-[#e3bfd6] px-5 py-2.5 text-xs font-semibold text-[#6f4f65] transition hover:bg-[#fff7fb]">
          {t('back')}
        </button>
        <button type="button" onClick={() => void handleSubmit()}
          disabled={isSubmitting || !selectedServiceCode || hasBlockers || isEditingReceiver}
          className="border border-amber-600 bg-amber-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting
            ? t('creatingShipment')
            : selectedRate
              ? t('createShipmentWithPrice', { price: fmt(selectedRate.price) })
              : t('createShipment')}
        </button>
      </div>
    </div>
  )
}

function CustomsBreakdown({
  commodities,
  pkg,
  isOutsideEU,
  incoterm,
}: {
  commodities: CommodityRow[]
  pkg: import('../../types/order').AdminShipmentPackagePreview | undefined
  isOutsideEU: boolean
  incoterm: string
}) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.dhlShipForm' })
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'admin.common' })

  if (!pkg || !isOutsideEU) return null

  const totalCustomsValue = parseFloat(
    commodities.reduce((s, c) => s + c.customsValueEUR, 0).toFixed(2)
  )

  return (
    <section className="border border-[#efcfe1] bg-white">
      <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
          {t('customsDeclaration')}
        </p>
        <p className="mt-0.5 text-[10px] text-zinc-400">
          {t('customsValuesNote')}
        </p>
      </div>

      <div className="px-4 py-3 space-y-3 text-[11px] text-[#694d5f]">
        {commodities.length > 0 ? (
          <div className="space-y-1">
            {commodities.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="truncate max-w-[220px]" title={c.title}>
                  {c.title} <span className="text-zinc-400">× {c.qty}</span>
                </span>
                <span className="font-mono text-[#4f2040]">€{c.customsValueEUR.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="border border-[#f0dbe8] divide-y divide-[#f6e3ee]">
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#fff0f9]">
            <span className="font-bold text-[#3d1530]">
              {t('totalDeclaredCustoms')}
              <span className="ml-1.5 text-[9px] font-normal text-zinc-400 uppercase tracking-[0.06em]">
                {t('sentToDhl')}
              </span>
            </span>
            <span className="font-mono font-bold text-amber-700 text-sm">€{totalCustomsValue.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-zinc-400">
          <span><span className="font-semibold text-[#8b5a75]">{t('incoterm').replace(' *', ':')}</span> {incoterm}</span>
          <span><span className="font-semibold text-[#8b5a75]">{t('totalWeight')}</span> {pkg.totalWeightKg} {tCommon('kg')}</span>
          <span><span className="font-semibold text-[#8b5a75]">{t('currencyLabel')}</span> EUR</span>
          <span className="text-amber-600">{t('outsideEuNote')}</span>
        </div>
      </div>
    </section>
  )
}
