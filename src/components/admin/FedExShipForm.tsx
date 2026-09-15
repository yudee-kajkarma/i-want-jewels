'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { isAxiosError } from 'axios'
import type {
  AdminShippingQuote,
  AdminShipmentPreviewItem,
  AdminShippingRateOption,
  Order,
} from '../../types/order'
import {
  shipOrderForAdmin,
  updateOrderShippingAddressForAdmin,
  getAdminCarrierRatesForOrder,
  type FedExShipOptions,
} from '../../services/orderService'
import { getCountryOptions, getDialCodeOptions, getStateOptions } from '../../utils/location'
import ShippingValueSummary from './ShippingValueSummary'
import { formatPrice, isoToCurrencyCode } from '../../utils/price'
import ShipmentWorkspace, { ShipmentRateCards } from './ShipmentWorkspace'
import ShipmentCalendar, { localDateValue } from './ShipmentCalendar'

const PACKAGING_VALUES = [
  'YOUR_PACKAGING',
  'FEDEX_ENVELOPE',
  'FEDEX_PAK',
  'FEDEX_BOX',
  'FEDEX_SMALL_BOX',
  'FEDEX_MEDIUM_BOX',
  'FEDEX_LARGE_BOX',
  'FEDEX_TUBE',
] as const

// Outer dimensions of FedEx's own packaging, in cm. The rate is priced on the
// resulting volumetric weight, so choosing one has to set these too.
const PACKAGING_DIMENSIONS: Record<string, { l: number; w: number; h: number } | null> = {
  YOUR_PACKAGING: null,
  FEDEX_ENVELOPE: { l: 33, w: 24, h: 1 },
  FEDEX_PAK: { l: 38, w: 30, h: 3 },
  FEDEX_BOX: { l: 33, w: 28, h: 6 },
  FEDEX_SMALL_BOX: { l: 32, w: 28, h: 6 },
  FEDEX_MEDIUM_BOX: { l: 33, w: 28, h: 10 },
  FEDEX_LARGE_BOX: { l: 33, w: 28, h: 26 },
  FEDEX_TUBE: { l: 97, w: 15, h: 15 },
}

// Exactly the five values FedEx accepts for signatureOptionDetail.optionType.
const SIGNATURE_VALUES = ['SERVICE_DEFAULT', 'NO_SIGNATURE_REQUIRED', 'INDIRECT', 'DIRECT', 'ADULT'] as const

const DUTIES_PAYMENT_VALUES = ['SENDER', 'RECIPIENT', 'THIRD_PARTY'] as const

type CommodityRow = AdminShipmentPreviewItem & {
  hsCode: string
  countryOfManufacture: string
  customsValue: number
}

type ReceiverDraft = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  phoneCountryCode: string
  phoneNumber: string
  taxId: string
}

type Props = {
  order: Order
  preview: AdminShippingQuote
  onBack: () => void
  onShipped: () => void
  onBusyChange?: (busy: boolean) => void
}

function fmt(n: number) {
  return `€${n.toFixed(2)}`
}

function fmtDeclaration(n: number, currency: 'EUR' | 'USD' | 'GBP') {
  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : currency === 'GBP' ? 'en-GB' : 'en-IE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(n)
}

export default function FedExShipForm({
  order,
  preview: previewQuote,
  onBack,
  onShipped,
  onBusyChange,
}: Props) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.fedExShipForm' })
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'admin.common' })
  const { t: tSummary } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })

  const packagingOptions = useMemo(
    () => PACKAGING_VALUES.map((value) => ({ value, label: t(`packagingOptions.${value}`) })),
    [t],
  )
  const signatureOptions = useMemo(
    () => SIGNATURE_VALUES.map((value) => ({ value, label: t(`signatureOptions.${value}`) })),
    [t],
  )
  const dutiesPaymentOptions = useMemo(
    () => DUTIES_PAYMENT_VALUES.map((value) => ({ value, label: t(`dutiesPaymentOptions.${value}`) })),
    [t],
  )

  const [currentQuote, setCurrentQuote] = useState(previewQuote)
  const preview = currentQuote.preview
  const validation = currentQuote.validation

  const [fedexRates, setFedexRates] = useState<AdminShippingRateOption[]>([])
  const [isLoadingRates, setIsLoadingRates] = useState(true)
  const [ratesError, setRatesError] = useState('')

  const rateRequestId = useRef(0)
  useEffect(
    () => () => {
      rateRequestId.current += 1
    },
    [],
  )

  const [selectedServiceCode, setSelectedServiceCode] = useState('')

  async function loadFedexRates() {
    const requestId = ++rateRequestId.current
    setIsLoadingRates(true)
    setRatesError('')
    try {
      const q = await getAdminCarrierRatesForOrder(
        order.id,
        'FEDEX',
        undefined,
        undefined,
        receiverIsResidential,
        shipperIsResidential,
        shipDate,
        packagingType,
        signatureOption,
        saturdayDelivery,
      )
      if (requestId !== rateRequestId.current) return
      if (q?.preview) {
        setCurrentQuote(q)
        // A saved destination can change the declaration currency and values.
        // Refresh the order snapshots while retaining the admin's tariff edits.
        setCommodities((current) =>
          q.preview!.items.map((item) => {
            const existing = current.find((row) => row.number === item.number)
            return {
              ...item,
              hsCode: existing?.hsCode ?? item.hsCode,
              countryOfManufacture: existing?.countryOfManufacture ?? item.mfrCountry,
              customsValue:
                typeof item.customsValue === 'number'
                  ? item.customsValue
                  : parseFloat(((item.unitPrice ?? item.unitPriceEUR) * item.qty).toFixed(2)),
            }
          }),
        )
      }
      const rates = q?.rates.FEDEX ?? []
      setFedexRates(rates)
      // Keep the admin's chosen service across a re-quote — options now change
      // the price, so this runs often. Only fall back when it is no longer offered.
      setSelectedServiceCode((current) =>
        rates.some((r) => r.serviceCode === current) ? current : (rates[0]?.serviceCode ?? ''),
      )
    } catch {
      if (requestId !== rateRequestId.current) return
      setFedexRates([])
      setSelectedServiceCode('')
      setRatesError(t('ratesLoadError'))
    } finally {
      if (requestId === rateRequestId.current) setIsLoadingRates(false)
    }
  }

  const [isEditingReceiver, setIsEditingReceiver] = useState(false)
  const [receiverDraft, setReceiverDraft] = useState<ReceiverDraft>({
    street: preview?.receiver.street ?? '',
    city: preview?.receiver.city ?? '',
    state: preview?.receiver.state ?? '',
    postalCode: preview?.receiver.postalCode ?? '',
    country: preview?.receiver.country ?? '',
    phoneCountryCode: preview?.receiver.phoneCountryCode ?? '',
    phoneNumber: preview?.receiver.phoneNumber ?? '',
    taxId: preview?.receiver.taxId ?? '',
  })
  const dialCodeOptions = useMemo(() => getDialCodeOptions(), [])
  // Display only — the carrier payload stays unspaced E.164.
  const receiverPhoneDisplay =
    preview?.receiver.phoneCountryCode && preview?.receiver.phoneNumber
      ? `${preview.receiver.phoneCountryCode} ${preview.receiver.phoneNumber}`
      : (preview?.receiver.phone ?? '')
  const [isSavingReceiver, setIsSavingReceiver] = useState(false)
  const [receiverSaveError, setReceiverSaveError] = useState('')
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const stateOptions = useMemo(() => getStateOptions(receiverDraft.country), [receiverDraft.country])

  const isOutsideEU = preview?.package.isOutsideEU ?? preview?.package.deliveryChargeEUR !== undefined
  const declarationCurrency = preview?.package.declarationCurrency ?? 'EUR'

  const [commodities, setCommodities] = useState<CommodityRow[]>(
    (preview?.items ?? []).map((it) => ({
      ...it,
      hsCode: it.hsCode,
      countryOfManufacture: it.mfrCountry,
      customsValue:
        typeof it.customsValue === 'number'
          ? it.customsValue
          : parseFloat(((it.unitPrice ?? it.unitPriceEUR) * it.qty).toFixed(2)),
    })),
  )
  const totalCustomsValue = parseFloat(
    commodities.reduce((sum, item) => sum + item.customsValue, 0).toFixed(2),
  )

  const [packagingType, setPackagingType] = useState('YOUR_PACKAGING')
  // FedEx packaging cannot be resized, so its dimensions are shown read-only.
  const isFedExPackaging = packagingType !== 'YOUR_PACKAGING'
  const [dimL, setDimL] = useState('')
  const [dimW, setDimW] = useState('')
  const [dimH, setDimH] = useState('')

  // Parity with DHL: these all reach FedEx but had no control until now.
  const [incoterm, setIncoterm] = useState('DDP')
  const [electronicTradeDocuments, setElectronicTradeDocuments] = useState(true)
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [customerReference, setCustomerReference] = useState('')
  const [receiverIsResidential, setReceiverIsResidential] = useState(true)
  const [shipperIsResidential, setShipperIsResidential] = useState(false)
  const [shipDate, setShipDate] = useState(() => localDateValue(new Date()))

  // FedEx-specific options with no DHL equivalent.
  const [iossNumber, setIossNumber] = useState('')
  const [blockInsightVisibility, setBlockInsightVisibility] = useState(true)
  const [labelStockType, setLabelStockType] = useState('PAPER_85X11_TOP_HALF_LABEL')

  const [signatureOption, setSignatureOption] = useState('SERVICE_DEFAULT')
  const [saturdayDelivery, setSaturdayDelivery] = useState(false)
  const [shipperCompanyName, setShipperCompanyName] = useState('I Want Jewels')

  const [dutiesPaymentType, setDutiesPaymentType] = useState('SENDER')
  const [dutiesAccountNumber, setDutiesAccountNumber] = useState('')

  useEffect(() => {
    void loadFedexRates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    order.id,
    signatureOption,
    saturdayDelivery,
    packagingType,
    receiverIsResidential,
    shipperIsResidential,
    shipDate,
  ])

  const [notifyRecipient, setNotifyRecipient] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(preview?.receiver.email ?? '')

  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedRate = fedexRates.find((r) => r.serviceCode === selectedServiceCode) ?? null
  const hasBlockers = (validation?.issues?.length ?? 0) > 0

  async function handleSaveReceiver() {
    if (!receiverDraft.street || !receiverDraft.city || !receiverDraft.postalCode || !receiverDraft.country) {
      setReceiverSaveError(t('errors.fillRequiredAddress'))
      return
    }
    setIsSavingReceiver(true)
    setReceiverSaveError('')
    try {
      const { phoneCountryCode, phoneNumber, taxId, ...address } = receiverDraft
      await updateOrderShippingAddressForAdmin(order.id, {
        ...address,
        recipientCountryCode: phoneCountryCode,
        recipientPhone: phoneNumber,
        recipientTaxId: taxId,
      })
      setIsEditingReceiver(false)
      toast.success(t('toast.addressUpdated'))
      void loadFedexRates()
    } catch (err: unknown) {
      setReceiverSaveError(
        (isAxiosError(err) ? err.response?.data?.message : undefined) || t('errors.updateAddressFailed'),
      )
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
    onBusyChange?.(true)
    try {
      const dims =
        dimL && dimW && dimH
          ? { lengthCm: parseFloat(dimL), widthCm: parseFloat(dimW), heightCm: parseFloat(dimH) }
          : undefined

      const fedExOptions: FedExShipOptions = {
        packagingType,
        dimensions: dims,
        signatureOption: signatureOption !== 'SERVICE_DEFAULT' ? signatureOption : undefined,
        saturdayDelivery: saturdayDelivery || undefined,
        shipperCompanyName: shipperCompanyName.trim() || undefined,
        dutiesPaymentType,
        dutiesAccountNumber: dutiesPaymentType === 'THIRD_PARTY' ? dutiesAccountNumber : undefined,
        notificationEmails: notifyRecipient && notifyEmail ? [notifyEmail] : undefined,
        incoterm,
        electronicTradeDocuments,
        invoiceNumber: invoiceNumber.trim() || undefined,
        customerReference: customerReference.trim() || undefined,
        receiverIsResidential,
        shipperIsResidential,
        recipientTaxId: receiverDraft.taxId?.trim() || undefined,
        iossNumber: iossNumber.trim() || undefined,
        blockInsightVisibility,
        labelStockType,
        shipDate,
        commodityOverrides: commodities.map((c) => ({
          hsCode: c.hsCode,
          countryOfManufacture: c.countryOfManufacture,
          customsValue: c.customsValue,
        })),
      }

      await shipOrderForAdmin(order.id, {
        carrier: 'FEDEX',
        serviceCode: selectedServiceCode,
        fedExOptions,
      })
      toast.success(t('toast.shipped', { orderNumber: order.orderNumber }))
      onShipped()
    } catch (err: unknown) {
      toast.error(
        (isAxiosError(err) ? err.response?.data?.message : undefined) || t('errors.createShipmentFailed'),
      )
    } finally {
      setIsSubmitting(false)
      onBusyChange?.(false)
    }
  }

  const optionState = (enabled: boolean) => tSummary(enabled ? 'enabled' : 'disabled')
  const summaryGroups = [
    {
      title: tSummary('titles.parcel'),
      rows: [
        {
          label: tSummary('customerTotal'),
          value: formatPrice(order.totalAmount, isoToCurrencyCode(order.currency) ?? 'eur'),
        },
        {
          label: t('packagingType'),
          value: packagingOptions.find((option) => option.value === packagingType)?.label ?? packagingType,
        },
      ],
    },
    {
      title: tSummary('deliveryOptions'),
      rows: [
        {
          label: t('signatureOption'),
          value:
            signatureOptions.find((option) => option.value === signatureOption)?.label ?? signatureOption,
        },
        { label: t('saturdayDelivery'), value: optionState(saturdayDelivery) },
        {
          label: t('electronicTradeDocuments', { defaultValue: 'Paperless invoice (ETD)' }),
          value: optionState(electronicTradeDocuments),
        },
        {
          label: t('blockInsight', { defaultValue: 'Hide contents from public tracking' }),
          value: optionState(blockInsightVisibility),
        },
        {
          label: t('labelFormat', { defaultValue: 'Label format' }),
          value:
            labelStockType === 'PAPER_4X6'
              ? '4 × 6'
              : labelStockType === 'PAPER_LETTER'
                ? tSummary('letterSheet')
                : tSummary('a4TopHalf'),
        },
        ...(customerReference
          ? [{ label: t('customerReference', { defaultValue: 'Your reference' }), value: customerReference }]
          : []),
      ],
    },
    {
      title: tSummary('titles.review'),
      rows: [
        {
          label: t('invoiceNumber', { defaultValue: 'Invoice number' }),
          value: invoiceNumber.trim() || order.orderNumber,
        },
        {
          label: t('billDutiesTo'),
          value:
            dutiesPaymentOptions.find((option) => option.value === dutiesPaymentType)?.label ??
            dutiesPaymentType,
        },
        ...(dutiesPaymentType === 'THIRD_PARTY'
          ? [{ label: t('thirdPartyAccount'), value: dutiesAccountNumber }]
          : []),
        ...(iossNumber
          ? [{ label: t('iossNumber', { defaultValue: 'IOSS number (EU)' }), value: iossNumber }]
          : []),
        { label: t('notifyRecipient'), value: optionState(notifyRecipient) },
        ...(notifyRecipient ? [{ label: tCommon('email'), value: notifyEmail }] : []),
      ],
    },
  ]

  return (
    <ShipmentWorkspace
      carrier="FEDEX"
      preview={preview}
      selectedRate={selectedRate}
      loading={isLoadingRates}
      shipDate={shipDate}
      incoterm={incoterm}
      customsValue={totalCustomsValue}
      dimensions={[dimL, dimW, dimH]}
      busy={isSubmitting}
      summaryGroups={summaryGroups}
      addressPending={isEditingReceiver}
      sections={[
        <div key="0" className="space-y-5">
          <div className="grid grid-cols-2 gap-4 items-start">
            <section className="border border-[#efcfe1] bg-white">
              <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                  {t('shipFrom')}{' '}
                  <span className="ml-1 text-[10px] font-normal text-slate-500">{t('readOnly')}</span>
                </p>
              </div>
              <div className="px-4 py-3 text-xs leading-6 text-[#694d5f]">
                {preview?.shipper ? (
                  <>
                    <p className="font-semibold text-[#4f2040]">{preview.shipper.name}</p>
                    <p>
                      {preview.shipper.street}
                      {preview.shipper.houseNumber ? ' ' + preview.shipper.houseNumber : ''}
                    </p>
                    <p>
                      {preview.shipper.city}
                      {preview.shipper.postalCode ? ', ' + preview.shipper.postalCode : ''} ·{' '}
                      {preview.shipper.country}
                    </p>
                    <p>📞 {preview.shipper.phone}</p>
                    <p>✉ {preview.shipper.email}</p>
                    <div className="mt-2 flex items-center gap-2 border-t border-[#f3e2ee] pt-2">
                      <label
                        className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]"
                        htmlFor="fedex-shipper-company"
                      >
                        {t('shipperCompanyName', { defaultValue: 'Company name' })}
                      </label>
                      <input
                        id="fedex-shipper-company"
                        value={shipperCompanyName}
                        onChange={(e) => setShipperCompanyName(e.target.value)}
                        placeholder={t('shipperCompanyOptional', {
                          defaultValue: 'Optional — shown as the exporter',
                        })}
                        className="flex-1 border border-[#e3bfd6] px-2 py-1 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500">{tCommon('loading')}</p>
                )}
              </div>
            </section>

            <section className="border border-[#efcfe1] bg-white">
              <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5 flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                  {t('deliverTo')}
                </p>
                {!isEditingReceiver ? (
                  <button
                    type="button"
                    onClick={() => setIsEditingReceiver(true)}
                    className="border border-[#d24a90] px-2 py-0.5 text-[10px] font-semibold text-[#d24a90] hover:bg-[#fff2fb]"
                  >
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
                      {preview?.receiver.postalCode ? ' ' + preview.receiver.postalCode : ''} ·{' '}
                      {preview?.receiver.country}
                    </p>
                    <p className={validation?.receiverPhoneOk === false ? 'text-rose-600' : ''}>
                      📞 {receiverPhoneDisplay || '—'}
                    </p>
                    <p className={validation?.receiverEmailOk === false ? 'text-rose-600' : ''}>
                      ✉ {preview?.receiver.email || '—'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(['street', 'city', 'postalCode'] as const).map((field) => (
                      <div key={field} className="flex items-center gap-2">
                        <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                          {tCommon(field)} *
                        </label>
                        <input
                          aria-label={tCommon(field)}
                          value={receiverDraft[field]}
                          onChange={(e) => setReceiverDraft((p) => ({ ...p, [field]: e.target.value }))}
                          className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                        />
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                        {tCommon('countryLabel')} *
                      </label>
                      <select
                        aria-label={tCommon('countryLabel')}
                        value={receiverDraft.country}
                        onChange={(e) =>
                          setReceiverDraft((p) => ({ ...p, country: e.target.value, state: '' }))
                        }
                        className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                      >
                        <option value="">{tCommon('selectCountry')}</option>
                        {countryOptions.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                        {tCommon('stateLabel')}
                      </label>
                      <select
                        aria-label={tCommon('stateLabel')}
                        value={receiverDraft.state}
                        onChange={(e) => setReceiverDraft((p) => ({ ...p, state: e.target.value }))}
                        className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                      >
                        <option value="">{tCommon('selectState')}</option>
                        {stateOptions.map((s) => (
                          <option key={s.code} value={s.code}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                        {t('phoneLabel', { defaultValue: 'Phone' })} *
                      </label>
                      <select
                        aria-label={t('phoneLabel', { defaultValue: 'Phone' })}
                        value={receiverDraft.phoneCountryCode}
                        onChange={(e) =>
                          setReceiverDraft((p) => ({ ...p, phoneCountryCode: e.target.value }))
                        }
                        className="w-40 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                      >
                        <option value="">{t('selectDialCode', { defaultValue: 'Code' })}</option>
                        {dialCodeOptions.map((d) => (
                          <option key={d.countryCode} value={d.dialCode}>
                            {d.name} ({d.dialCode})
                          </option>
                        ))}
                      </select>
                      <input
                        aria-label={t('phoneLabel', { defaultValue: 'Phone' })}
                        value={receiverDraft.phoneNumber}
                        inputMode="tel"
                        onChange={(e) => setReceiverDraft((p) => ({ ...p, phoneNumber: e.target.value }))}
                        className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                        {t('receiverTaxId', { defaultValue: 'Tax / VAT ID' })}
                      </label>
                      <input
                        aria-label={t('receiverTaxId', { defaultValue: 'Tax / VAT ID' })}
                        value={receiverDraft.taxId}
                        onChange={(e) => setReceiverDraft((p) => ({ ...p, taxId: e.target.value }))}
                        placeholder={t('receiverTaxIdOptional', {
                          defaultValue: 'Optional — business recipients only',
                        })}
                        className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                      />
                    </div>
                    {receiverSaveError ? (
                      <p className="text-[10px] text-rose-600">{receiverSaveError}</p>
                    ) : null}
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingReceiver(false)
                          setReceiverSaveError('')
                        }}
                        disabled={isSavingReceiver}
                        className="border border-[#e3bfd6] px-3 py-1 text-[10px] font-semibold text-[#6f4f65] hover:bg-[#fff7fb] disabled:opacity-60"
                      >
                        {tCommon('cancel')}
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleSaveReceiver()}
                        disabled={isSavingReceiver}
                        className="border border-[#d24a90] bg-[#d24a90] px-3 py-1 text-[10px] font-semibold text-white hover:bg-[#b83f7d] disabled:opacity-60"
                      >
                        {isSavingReceiver ? tCommon('saving') : tCommon('save')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>,
        <div key="1" className="space-y-5">
          <ShippingValueSummary
            order={order}
            carrier="FedEx"
            pkg={preview?.package}
            items={commodities}
            declaredValue={totalCustomsValue}
          />
          {commodities.length > 0 ? (
            <section className="border border-[#efcfe1] bg-white">
              <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                  {t('customsCommodities')}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">{t('onlyHsEditable')}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-[11px]">
                  <thead className="bg-[#fff2fb]">
                    <tr className="text-left text-[#8b5a75]">
                      <th className="px-3 py-2 font-semibold">{t('tableHeaders.number')}</th>
                      <th className="px-3 py-2 font-semibold">{t('tableHeaders.description')}</th>
                      <th className="px-3 py-2 font-semibold text-right">{t('tableHeaders.qty')}</th>
                      <th className="px-3 py-2 font-semibold text-right">
                        {t('tableHeaders.unitEur', { currency: declarationCurrency })}
                      </th>
                      <th className="px-3 py-2 font-semibold text-right">{t('tableHeaders.weightG')}</th>
                      <th className="px-3 py-2 font-semibold">{t('tableHeaders.hsCode')}</th>
                      <th className="px-3 py-2 font-semibold">{t('tableHeaders.countryOfMfr')}</th>
                      <th className="px-3 py-2 font-semibold text-right">
                        {t('tableHeaders.customsValueEur', { currency: declarationCurrency })}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f6e3ee]">
                    {commodities.map((c, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 text-slate-500">{c.number}</td>
                        <td className="px-3 py-2 max-w-[220px]" title={c.title}>
                          <span className="block">{c.customsDescription ?? c.title}</span>
                          {c.customsDescription ? (
                            <span className="block truncate text-[10px] text-slate-500">{c.title}</span>
                          ) : null}
                        </td>
                        <td className="px-3 py-2 text-right">{c.qty}</td>
                        <td className="px-3 py-2 text-right">
                          {fmtDeclaration(c.unitPrice ?? c.unitPriceEUR, declarationCurrency)}
                        </td>
                        <td className="px-3 py-2 text-right">{c.unitWeightG}</td>
                        <td className="px-2 py-1.5">
                          <input
                            aria-label={t('tableHeaders.hsCode')}
                            value={c.hsCode}
                            onChange={(e) =>
                              setCommodities((prev) =>
                                prev.map((r, i) => (i === idx ? { ...r, hsCode: e.target.value } : r)),
                              )
                            }
                            maxLength={10}
                            className="w-24 border border-[#e3bfd6] px-1.5 py-1 font-mono text-[11px] outline-none focus:border-[#d24a90]"
                          />
                        </td>
                        <td className="px-3 py-2 font-mono uppercase">{c.countryOfManufacture}</td>
                        <td className="px-3 py-2 text-right font-mono">
                          <span className="block">{fmtDeclaration(c.customsValue, declarationCurrency)}</span>
                          {isOutsideEU && c.customsValueUSD != null ? (
                            <span className="block text-[9px] font-sans text-slate-500">
                              {t('storedCustomsSource', { value: c.customsValueUSD.toFixed(2) })}
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {preview?.package ? (
                <div className="border-t border-[#efcfe1] px-4 py-2.5 text-[11px] text-[#694d5f]">
                  <span className="font-semibold text-[#4f2040]">{t('totalCustomsValue')} </span>
                  {fmtDeclaration(totalCustomsValue, declarationCurrency)}
                  <span className="ml-3 font-semibold text-[#4f2040]">{t('incoterm')} </span>
                  {preview.package.incoterm}
                </div>
              ) : null}
            </section>
          ) : null}
          <section className="border border-[#efcfe1] bg-white">
            <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                {t('packageDetails')}
              </p>
            </div>
            <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                  {t('packagingType')}
                </label>
                <select
                  aria-label={t('packagingType')}
                  value={packagingType}
                  onChange={(e) => {
                    const next = e.target.value
                    setPackagingType(next)

                    // FedEx packaging has a fixed size; your own box keeps whatever
                    // the admin entered.
                    const dims = PACKAGING_DIMENSIONS[next]
                    if (dims) {
                      setDimL(String(dims.l))
                      setDimW(String(dims.w))
                      setDimH(String(dims.h))
                    } else {
                      setDimL('')
                      setDimW('')
                      setDimH('')
                    }
                  }}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                >
                  {packagingOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                  {t('weightAuto')}
                </label>
                <div className="border border-[#e3bfd6] bg-[#f9f0f6] px-3 py-2 text-xs text-[#694d5f]">
                  {preview?.package.totalWeightKg ?? 0} {tCommon('kg')}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                  {t('dimensionsCm')}
                </label>
                {
                  <div className="flex items-center gap-2">
                    <input
                      aria-label={t('dimensionsCm') + ' ' + t('dimensionL')}
                      type="number"
                      min="0"
                      value={dimL}
                      onChange={(e) => setDimL(e.target.value)}
                      placeholder={t('dimensionL')}
                      readOnly={isFedExPackaging}
                      className={`w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90] ${isFedExPackaging ? 'bg-[#f9f0f6] text-[#694d5f]' : ''}`}
                    />
                    <span className="text-slate-500">×</span>
                    <input
                      aria-label={t('dimensionsCm') + ' ' + t('dimensionW')}
                      type="number"
                      min="0"
                      value={dimW}
                      onChange={(e) => setDimW(e.target.value)}
                      placeholder={t('dimensionW')}
                      readOnly={isFedExPackaging}
                      className={`w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90] ${isFedExPackaging ? 'bg-[#f9f0f6] text-[#694d5f]' : ''}`}
                    />
                    <span className="text-slate-500">×</span>
                    <input
                      aria-label={t('dimensionsCm') + ' ' + t('dimensionH')}
                      type="number"
                      min="0"
                      value={dimH}
                      onChange={(e) => setDimH(e.target.value)}
                      placeholder={t('dimensionH')}
                      readOnly={isFedExPackaging}
                      className={`w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90] ${isFedExPackaging ? 'bg-[#f9f0f6] text-[#694d5f]' : ''}`}
                    />
                    <span className="text-xs text-slate-500">{tCommon('cm')}</span>
                  </div>
                }
                {isFedExPackaging ? (
                  <p className="mt-1 text-[10px] text-slate-500">
                    {t('dimensionsFromPackaging', {
                      defaultValue: "FedEx's own packaging has a fixed size, so these cannot be changed.",
                    })}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        </div>,
        <div key="2" className="space-y-5">
          <div className="space-y-4">
            <section className="border border-[#efcfe1] bg-white">
              <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                  {t('selectFedExService')}
                </p>
              </div>
              <div className="px-4 py-3 space-y-3">
                <ShipmentRateCards
                  rates={fedexRates}
                  selected={selectedServiceCode}
                  onSelect={setSelectedServiceCode}
                  loading={isLoadingRates}
                  error={ratesError}
                  onRetry={() => void loadFedexRates()}
                />
              </div>
            </section>
          </div>
          <section className="border border-[#efcfe1] bg-white">
            <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                {t('serviceOptions')}
              </p>
            </div>
            <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                  {t('signatureOption')}
                </label>
                <select
                  aria-label={t('signatureOption')}
                  value={signatureOption}
                  onChange={(e) => setSignatureOption(e.target.value)}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                >
                  {signatureOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="saturday"
                  checked={saturdayDelivery}
                  onChange={(e) => setSaturdayDelivery(e.target.checked)}
                  className="h-4 w-4 accent-[#d24a90]"
                />
                <label htmlFor="saturday" className="text-xs text-[#4f2040]">
                  {t('saturdayDelivery')}
                </label>
              </div>

              <div>
                <div className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                  {t('shipDateLabel', { defaultValue: 'Ship date (handover to FedEx)' })}
                </div>
                <ShipmentCalendar
                  id="fedex-ship-date"
                  label={t('shipDateLabel', { defaultValue: 'Ship date (handover to FedEx)' })}
                  value={shipDate}
                  min={localDateValue(new Date())}
                  onChange={setShipDate}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]"
                  htmlFor="fedex-reference"
                >
                  {t('customerReference', { defaultValue: 'Your reference' })}
                </label>
                <input
                  id="fedex-reference"
                  value={customerReference}
                  onChange={(e) => setCustomerReference(e.target.value)}
                  placeholder={t('referencePlaceholder', { defaultValue: 'Printed on the label' })}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="fedex-etd"
                  checked={electronicTradeDocuments}
                  onChange={(e) => setElectronicTradeDocuments(e.target.checked)}
                  className="h-4 w-4 accent-[#d24a90]"
                />
                <label htmlFor="fedex-etd" className="text-xs text-[#4f2040]">
                  {t('electronicTradeDocuments', { defaultValue: 'Paperless invoice (ETD)' })}
                </label>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="fedex-recv-residential"
                  checked={receiverIsResidential}
                  onChange={(e) => setReceiverIsResidential(e.target.checked)}
                  className="h-4 w-4 accent-[#d24a90]"
                />
                <label htmlFor="fedex-recv-residential" className="text-xs text-[#4f2040]">
                  {t('receiverResidential', { defaultValue: 'Delivery address is a home' })}
                </label>
              </div>

              <div>
                <label
                  className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]"
                  htmlFor="fedex-ioss"
                >
                  {t('iossNumber', { defaultValue: 'IOSS number (EU)' })}
                </label>
                <input
                  id="fedex-ioss"
                  value={iossNumber}
                  onChange={(e) => setIossNumber(e.target.value)}
                  placeholder={t('iossPlaceholder', { defaultValue: 'Uses the account default' })}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                />
                <p className="mt-1 text-[10px] text-slate-500">
                  {t('iossHint', {
                    defaultValue: 'VAT settled at sale, so the customer pays nothing on delivery.',
                  })}
                </p>
              </div>

              <div>
                <label
                  className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]"
                  htmlFor="fedex-label-stock"
                >
                  {t('labelFormat', { defaultValue: 'Label format' })}
                </label>
                <select
                  id="fedex-label-stock"
                  value={labelStockType}
                  onChange={(e) => setLabelStockType(e.target.value)}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                >
                  <option value="PAPER_85X11_TOP_HALF_LABEL">A4 sheet (top half)</option>
                  <option value="PAPER_4X6">4 × 6 label</option>
                  <option value="PAPER_LETTER">Letter sheet</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="fedex-block-insight"
                  checked={blockInsightVisibility}
                  onChange={(e) => setBlockInsightVisibility(e.target.checked)}
                  className="h-4 w-4 accent-[#d24a90]"
                />
                <label htmlFor="fedex-block-insight" className="text-xs text-[#4f2040]">
                  {t('blockInsight', { defaultValue: 'Hide contents from public tracking' })}
                </label>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="fedex-ship-residential"
                  checked={shipperIsResidential}
                  onChange={(e) => setShipperIsResidential(e.target.checked)}
                  className="h-4 w-4 accent-[#d24a90]"
                />
                <label htmlFor="fedex-ship-residential" className="text-xs text-[#4f2040]">
                  {t('shipperResidential', { defaultValue: 'Pickup address is a home' })}
                </label>
              </div>
            </div>
          </section>
        </div>,
        <div key="3" className="space-y-5">
          <section className="border border-[#efcfe1] bg-white">
            <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                {t('billingDutiesPayment')}
              </p>
            </div>
            <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
              <div>
                <label
                  className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]"
                  htmlFor="fedex-incoterm"
                >
                  {t('incoterm', { defaultValue: 'Incoterm' })}
                </label>
                <select
                  id="fedex-incoterm"
                  value={incoterm}
                  onChange={(e) => setIncoterm(e.target.value)}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                >
                  {['DDP', 'DAP', 'DDU', 'CPT', 'CIP', 'EXW', 'FCA'].map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]"
                  htmlFor="fedex-invoice"
                >
                  {t('invoiceNumber', { defaultValue: 'Invoice number' })}
                </label>
                <input
                  id="fedex-invoice"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder={order.orderNumber}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                />
                <p className="mt-1 text-[10px] text-slate-500">
                  {t('invoiceNumberHint', { defaultValue: 'Defaults to the order number.' })}
                </p>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                  {t('billDutiesTo')}
                </label>
                <select
                  aria-label={t('billDutiesTo')}
                  value={dutiesPaymentType}
                  onChange={(e) => setDutiesPaymentType(e.target.value)}
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
                >
                  {dutiesPaymentOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              {dutiesPaymentType === 'THIRD_PARTY' ? (
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                    {t('thirdPartyAccount')}
                  </label>
                  <input
                    aria-label={t('thirdPartyAccount')}
                    value={dutiesAccountNumber}
                    onChange={(e) => setDutiesAccountNumber(e.target.value)}
                    placeholder={t('accountNumberPlaceholder')}
                    className="w-full border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]"
                  />
                </div>
              ) : null}
            </div>
          </section>
          <section className="border border-[#efcfe1] bg-white">
            <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                {t('shipmentNotifications')}
              </p>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notify-recipient"
                  checked={notifyRecipient}
                  onChange={(e) => setNotifyRecipient(e.target.checked)}
                  className="h-4 w-4 accent-[#d24a90]"
                />
                <label htmlFor="notify-recipient" className="text-xs text-[#4f2040]">
                  {t('notifyRecipient')}
                </label>
              </div>
              {notifyRecipient ? (
                <div className="flex items-center gap-2">
                  <label className="w-16 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
                    {tCommon('email')}
                  </label>
                  <input
                    aria-label={tCommon('email')}
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs outline-none focus:border-[#d24a90]"
                  />
                </div>
              ) : null}
            </div>
          </section>
        </div>,
      ]}
      alerts={
        <>
          {hasBlockers ? (
            <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
              <p className="mb-1 font-semibold">{t('cannotShipUntilFixed')}</p>
              <ul className="list-inside list-disc space-y-0.5">
                {validation!.issues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      }
      footer={(ratesRevealed) => (
        <div className="flex items-center justify-between gap-3 border-t border-[#efcfe1] pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="border border-[#e3bfd6] px-5 py-2.5 text-xs font-semibold text-[#6f4f65] transition hover:bg-[#fff7fb]"
          >
            {t('back')}
          </button>
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={
              !ratesRevealed ||
              isSubmitting ||
              isLoadingRates ||
              !!ratesError ||
              !selectedServiceCode ||
              hasBlockers ||
              isEditingReceiver
            }
            className="border border-[#d24a90] bg-[#d24a90] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#b83f7d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting
              ? t('creatingShipment')
              : ratesRevealed && selectedRate
                ? t('createShipmentWithPrice', { price: fmt(selectedRate.price) })
                : t('createShipment')}
          </button>
        </div>
      )}
    />
  )
}
