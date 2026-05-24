'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { AdminShippingQuote, AdminShipmentPreviewItem, AdminShippingRateOption, Order } from '../../types/order'
import { shipOrderForAdmin, updateOrderShippingAddressForAdmin, getAdminCarrierRatesForOrder, type FedExShipOptions } from '../../services/orderService'
import { getCountryOptions, getStateOptions } from '../../utils/location'

const PACKAGING_OPTIONS = [
  { value: 'YOUR_PACKAGING', label: 'Your Packaging' },
  { value: 'FEDEX_ENVELOPE', label: 'FedEx Envelope' },
  { value: 'FEDEX_PAK', label: 'FedEx Pak' },
  { value: 'FEDEX_BOX', label: 'FedEx Box' },
  { value: 'FEDEX_SMALL_BOX', label: 'FedEx Small Box' },
  { value: 'FEDEX_MEDIUM_BOX', label: 'FedEx Medium Box' },
  { value: 'FEDEX_LARGE_BOX', label: 'FedEx Large Box' },
  { value: 'FEDEX_TUBE', label: 'FedEx Tube' },
]

const SIGNATURE_OPTIONS = [
  { value: 'SERVICE_DEFAULT', label: 'Service Default (no override)' },
  { value: 'NO_SIGNATURE_REQUIRED', label: 'No Signature Required' },
  { value: 'INDIRECT', label: 'Indirect Signature' },
  { value: 'DIRECT_SIGNATURE_REQUIRED', label: 'Direct Signature Required' },
  { value: 'ADULT_SIGNATURE_REQUIRED', label: 'Adult Signature Required' },
]

const DUTIES_PAYMENT_OPTIONS = [
  { value: 'SENDER', label: 'Sender (my FedEx account)' },
  { value: 'RECIPIENT', label: 'Recipient (pay on delivery)' },
  { value: 'THIRD_PARTY', label: 'Third Party (enter account #)' },
]

type CommodityRow = AdminShipmentPreviewItem & {
  hsCode: string
  countryOfManufacture: string
  // Admin-entered customs value for this line (sent to FedEx as-is).
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

export default function FedExShipForm({ order, preview: previewQuote, onBack, onShipped }: Props) {
  const preview = previewQuote.preview
  const validation = previewQuote.validation

  const [fedexRates, setFedexRates] = useState<AdminShippingRateOption[]>([])
  const [isLoadingRates, setIsLoadingRates] = useState(true)
  const [ratesError, setRatesError] = useState('')

  useEffect(() => {
    let cancelled = false
    setIsLoadingRates(true)
    setRatesError('')
    getAdminCarrierRatesForOrder(order.id, 'FEDEX')
      .then((q) => {
        if (cancelled) return
        const rates = q?.rates.FEDEX ?? []
        setFedexRates(rates)
        if (rates[0]) setSelectedServiceCode(rates[0].serviceCode)
      })
      .catch(() => { if (!cancelled) setRatesError('Could not load FedEx rates for this route.') })
      .finally(() => { if (!cancelled) setIsLoadingRates(false) })
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.id])

  const [selectedServiceCode, setSelectedServiceCode] = useState('')

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

  const [commodities, setCommodities] = useState<CommodityRow[]>(
    (preview?.items ?? []).map((it) => ({
      ...it,
      hsCode: it.hsCode,
      countryOfManufacture: it.mfrCountry,
      customsValueEUR: parseFloat((it.unitPriceEUR * it.qty).toFixed(2)),
    }))
  )

  const [packagingType, setPackagingType] = useState('YOUR_PACKAGING')
  const [dimL, setDimL] = useState('')
  const [dimW, setDimW] = useState('')
  const [dimH, setDimH] = useState('')

  const [signatureOption, setSignatureOption] = useState('SERVICE_DEFAULT')
  const [saturdayDelivery, setSaturdayDelivery] = useState(false)

  const [dutiesPaymentType, setDutiesPaymentType] = useState('SENDER')
  const [dutiesAccountNumber, setDutiesAccountNumber] = useState('')

  const [notifyRecipient, setNotifyRecipient] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(preview?.receiver.email ?? '')

  const [showPayload, setShowPayload] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedRate = fedexRates.find((r) => r.serviceCode === selectedServiceCode) ?? null
  const hasBlockers = (validation?.issues?.length ?? 0) > 0

  async function handleSaveReceiver() {
    if (!receiverDraft.street || !receiverDraft.city || !receiverDraft.postalCode || !receiverDraft.country) {
      setReceiverSaveError('Please fill in all required address fields.')
      return
    }
    setIsSavingReceiver(true)
    setReceiverSaveError('')
    try {
      await updateOrderShippingAddressForAdmin(order.id, receiverDraft)
      setIsEditingReceiver(false)
      toast.success('Receiver address updated.')
    } catch (err: any) {
      setReceiverSaveError(err?.response?.data?.message || 'Failed to update address.')
    } finally {
      setIsSavingReceiver(false)
    }
  }

  async function handleSubmit() {
    if (!selectedServiceCode) {
      toast.error('Please select a FedEx service.')
      return
    }
    setIsSubmitting(true)
    try {
      const dims = dimL && dimW && dimH
        ? { lengthCm: parseFloat(dimL), widthCm: parseFloat(dimW), heightCm: parseFloat(dimH) }
        : undefined

      const fedExOptions: FedExShipOptions = {
        packagingType,
        dimensions: dims,
        signatureOption: signatureOption !== 'SERVICE_DEFAULT' ? signatureOption : undefined,
        saturdayDelivery: saturdayDelivery || undefined,
        dutiesPaymentType,
        dutiesAccountNumber: dutiesPaymentType === 'THIRD_PARTY' ? dutiesAccountNumber : undefined,
        notificationEmails: notifyRecipient && notifyEmail ? [notifyEmail] : undefined,
        commodityOverrides: commodities.map((c) => ({
          hsCode: c.hsCode,
          countryOfManufacture: c.countryOfManufacture,
          customsValueEUR: c.customsValueEUR,
        })),
      }

      await shipOrderForAdmin(order.id, {
        carrier: 'FEDEX',
        serviceCode: selectedServiceCode,
        fedExOptions,
      })
      toast.success(`Order ${order.orderNumber} shipped via FedEx.`)
      onShipped()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create FedEx shipment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const payloadPreview = useMemo(() => {
    const stripPhone = (p: string) => (p || '').replace(/^\+/, '')

    const pkgSpecialServiceTypes: string[] = []
    const pkgSpecialServiceDetail: Record<string, unknown> = {}
    if (order.paymentMethod === 'COD') {
      pkgSpecialServiceTypes.push('COD')
      pkgSpecialServiceDetail.codDetail = {
        codCollectionType: 'ANY',
        codCollectionAmount: {
          amount: parseFloat(((order.totalAmount as any).amount ?? 0).toFixed(2)),
          currency: 'EUR',
        },
        remitToName: preview?.shipper.name ?? '',
        remitToAddress: {
          streetLines: [`${preview?.shipper.street ?? ''} ${preview?.shipper.houseNumber ?? ''}`.trim()],
          city: preview?.shipper.city ?? '',
          postalCode: preview?.shipper.postalCode ?? '',
          countryCode: preview?.shipper.country ?? '',
        },
      }
    }
    if (signatureOption && signatureOption !== 'SERVICE_DEFAULT') {
      pkgSpecialServiceTypes.push('SIGNATURE_OPTION')
      pkgSpecialServiceDetail.signatureOptionDetail = { optionType: signatureOption }
    }
    const pkgSpecialServices = pkgSpecialServiceTypes.length > 0
      ? { packageSpecialServices: { specialServiceTypes: pkgSpecialServiceTypes, ...pkgSpecialServiceDetail } }
      : {}

    const rawItems = commodities.length > 0 ? commodities : [{
      title: 'Jewellery accessory',
      qty: 1,
      unitPriceEUR: preview?.package.declaredValueEUR ?? 100,
      unitWeightG: (preview?.package.totalWeightKg ?? 0.1) * 1000,
      hsCode: '7113190000',
      countryOfManufacture: 'IN',
      number: 1,
    }]

    const fedexCommodities = rawItems.map((c) => {
      const unitWeightKg = Math.floor((c.unitWeightG / 1000) * 1000) / 1000 || 0.001
      return {
        description: c.title,
        harmonizedCode: c.hsCode,
        quantity: c.qty,
        quantityUnits: 'PCS',
        unitPrice: { amount: parseFloat(c.unitPriceEUR.toFixed(2)), currency: 'EUR' },
        customsValue: { amount: parseFloat((c.unitPriceEUR * c.qty).toFixed(2)), currency: 'EUR' },
        weight: { units: 'KG', value: unitWeightKg },
        countryOfManufacture: c.countryOfManufacture,
      }
    })

    const totalCustomsValue = parseFloat(
      rawItems.reduce((s, c) => s + c.unitPriceEUR * c.qty, 0).toFixed(2)
    )
    const declaredValueEUR = preview?.package.declaredValueEUR ?? totalCustomsValue
    const recipientState = preview?.receiver.state?.trim()
    const hasDims = dimL && dimW && dimH && packagingType === 'YOUR_PACKAGING'

    return {
      labelResponseOptions: 'URL_ONLY',
      requestedShipment: {
        shipper: {
          contact: {
            personName: preview?.shipper.name ?? '',
            phoneNumber: stripPhone(preview?.shipper.phone ?? ''),
          },
          address: {
            streetLines: [`${preview?.shipper.street ?? ''} ${preview?.shipper.houseNumber ?? ''}`.trim()],
            city: preview?.shipper.city ?? '',
            postalCode: preview?.shipper.postalCode ?? '',
            countryCode: preview?.shipper.country ?? '',
          },
        },
        recipients: [{
          contact: {
            personName: preview?.receiver.name ?? '',
            emailAddress: preview?.receiver.email ?? '',
            ...(preview?.receiver.phone ? { phoneNumber: stripPhone(preview.receiver.phone) } : {}),
          },
          address: {
            streetLines: [preview?.receiver.street ?? ''],
            city: preview?.receiver.city ?? '',
            ...(recipientState ? { stateOrProvinceCode: recipientState } : {}),
            postalCode: preview?.receiver.postalCode ?? '',
            countryCode: preview?.receiver.country ?? '',
            residential: false,
          },
        }],
        shipDatestamp: '[auto: next valid business day]',
        serviceType: selectedServiceCode,
        packagingType,
        pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
        totalDeclaredValue: { amount: declaredValueEUR, currency: 'EUR' },
        ...(saturdayDelivery ? {
          specialServicesRequested: { specialServiceTypes: ['SATURDAY_DELIVERY'] },
        } : {}),
        ...(notifyRecipient && notifyEmail ? {
          emailNotificationDetail: {
            aggregationType: 'PER_SHIPMENT',
            emailNotificationRecipients: [{
              emailNotificationRecipientType: 'RECIPIENT',
              emailAddress: notifyEmail,
              notificationFormatType: 'HTML',
              notificationEvents: ['ON_SHIPMENT', 'ON_DELIVERY', 'ON_EXCEPTION'],
              locale: 'en_US',
            }],
          },
        } : {}),
        shippingChargesPayment: {
          paymentType: 'SENDER',
          payor: { responsibleParty: { accountNumber: { value: '[FEDEX_ACCOUNT_NUMBER]' } } },
        },
        labelSpecification: {
          imageType: 'PDF',
          labelStockType: 'PAPER_85X11_TOP_HALF_LABEL',
        },
        customsClearanceDetail: {
          dutiesPayment: {
            paymentType: dutiesPaymentType,
            payor: {
              responsibleParty: {
                accountNumber: {
                  value: dutiesPaymentType === 'THIRD_PARTY' && dutiesAccountNumber
                    ? dutiesAccountNumber
                    : '[FEDEX_ACCOUNT_NUMBER]',
                },
              },
            },
          },
          totalCustomsValue: { amount: totalCustomsValue, currency: 'EUR' },
          commodities: fedexCommodities,
        },
        requestedPackageLineItems: [{
          weight: { units: 'KG', value: preview?.package.totalWeightKg ?? 0 },
          ...(hasDims ? {
            dimensions: {
              length: parseFloat(dimL),
              width: parseFloat(dimW),
              height: parseFloat(dimH),
              units: 'CM',
            },
          } : {}),
          customerReferences: [{
            customerReferenceType: 'CUSTOMER_REFERENCE',
            value: order.orderNumber,
          }],
          ...pkgSpecialServices,
        }],
      },
      accountNumber: { value: '[FEDEX_ACCOUNT_NUMBER]' },
    }
  }, [selectedServiceCode, packagingType, dimL, dimW, dimH, signatureOption, saturdayDelivery,
      dutiesPaymentType, dutiesAccountNumber, notifyRecipient, notifyEmail, commodities,
      preview, order])

  return (
    <div className="space-y-5 text-sm text-[#4f2040]">

      {/* ── SHIP FROM + DELIVER TO side by side ── */}
      <div className="grid grid-cols-2 gap-4 items-start">

        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
              Ship From <span className="ml-1 text-[10px] font-normal text-zinc-400">(read-only)</span>
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
              <p className="text-zinc-400">Loading…</p>
            )}
          </div>
        </section>

        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Deliver To</p>
            {!isEditingReceiver ? (
              <button type="button" onClick={() => setIsEditingReceiver(true)}
                className="border border-[#d24a90] px-2 py-0.5 text-[10px] font-semibold text-[#d24a90] hover:bg-[#fff2fb]">
                Edit
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
                    <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">{field} *</label>
                    <input value={receiverDraft[field]}
                      onChange={(e) => setReceiverDraft((p) => ({ ...p, [field]: e.target.value }))}
                      className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]" />
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Country *</label>
                  <select value={receiverDraft.country}
                    onChange={(e) => setReceiverDraft((p) => ({ ...p, country: e.target.value, state: '' }))}
                    className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
                    <option value="">Select country</option>
                    {countryOptions.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="w-24 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">State</label>
                  <select value={receiverDraft.state}
                    onChange={(e) => setReceiverDraft((p) => ({ ...p, state: e.target.value }))}
                    className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
                    <option value="">Select state</option>
                    {stateOptions.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                  </select>
                </div>
                {receiverSaveError ? <p className="text-[10px] text-rose-600">{receiverSaveError}</p> : null}
                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => { setIsEditingReceiver(false); setReceiverSaveError('') }}
                    disabled={isSavingReceiver}
                    className="border border-[#e3bfd6] px-3 py-1 text-[10px] font-semibold text-[#6f4f65] hover:bg-[#fff7fb] disabled:opacity-60">
                    Cancel
                  </button>
                  <button type="button" onClick={() => void handleSaveReceiver()} disabled={isSavingReceiver}
                    className="border border-[#d24a90] bg-[#d24a90] px-3 py-1 text-[10px] font-semibold text-white hover:bg-[#b83f7d] disabled:opacity-60">
                    {isSavingReceiver ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── CUSTOMS / COMMODITIES ── */}
      {commodities.length > 0 ? (
        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Customs / Commodities</p>
            <p className="mt-0.5 text-[10px] text-zinc-400">HS codes and country of manufacture are editable</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-[11px]">
              <thead className="bg-[#fff2fb]">
                <tr className="text-left text-[#8b5a75]">
                  <th className="px-3 py-2 font-semibold">#</th>
                  <th className="px-3 py-2 font-semibold">Description</th>
                  <th className="px-3 py-2 font-semibold text-right">Qty</th>
                  <th className="px-3 py-2 font-semibold text-right">Unit €</th>
                  <th className="px-3 py-2 font-semibold text-right">Weight g</th>
                  <th className="px-3 py-2 font-semibold">HS Code</th>
                  <th className="px-3 py-2 font-semibold">Country of Mfr</th>
                  <th className="px-3 py-2 font-semibold text-right">Customs Value €</th>
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
                      <input value={c.hsCode}
                        onChange={(e) => setCommodities((prev) => prev.map((r, i) => i === idx ? { ...r, hsCode: e.target.value } : r))}
                        maxLength={10}
                        className="w-24 border border-[#e3bfd6] px-1.5 py-1 font-mono text-[11px] outline-none focus:border-[#d24a90]" />
                    </td>
                    <td className="px-2 py-1.5">
                      <input value={c.countryOfManufacture}
                        onChange={(e) => setCommodities((prev) => prev.map((r, i) => i === idx ? { ...r, countryOfManufacture: e.target.value.toUpperCase().slice(0, 2) } : r))}
                        maxLength={2}
                        className="w-12 border border-[#e3bfd6] px-1.5 py-1 font-mono text-[11px] uppercase outline-none focus:border-[#d24a90]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {preview?.package ? (
            <div className="border-t border-[#efcfe1] px-4 py-2.5 text-[11px] text-[#694d5f]">
              <span className="font-semibold text-[#4f2040]">Total customs value: </span>
              {fmt(preview.package.declaredValueEUR)}
              <span className="ml-3 font-semibold text-[#4f2040]">Incoterm: </span>{preview.package.incoterm}
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ── PACKAGE DETAILS ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Package Details</p>
        </div>
        <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Packaging Type</label>
            <select value={packagingType} onChange={(e) => setPackagingType(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {PACKAGING_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
              Weight (auto-calculated from items)
            </label>
            <div className="border border-[#e3bfd6] bg-[#f9f0f6] px-3 py-2 text-xs text-[#694d5f]">
              {preview?.package.totalWeightKg ?? 0} kg
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
              Dimensions (cm) — only used with Your Packaging
            </label>
            {packagingType !== 'YOUR_PACKAGING' ? (
              <p className="text-[10px] text-amber-600">
                FedEx already knows the dimensions of its own box types. Custom dimensions are ignored unless you select &quot;Your Packaging&quot;.
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <input type="number" min="0" value={dimL} onChange={(e) => setDimL(e.target.value)} placeholder="L"
                  className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
                <span className="text-zinc-400">×</span>
                <input type="number" min="0" value={dimW} onChange={(e) => setDimW(e.target.value)} placeholder="W"
                  className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
                <span className="text-zinc-400">×</span>
                <input type="number" min="0" value={dimH} onChange={(e) => setDimH(e.target.value)} placeholder="H"
                  className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
                <span className="text-xs text-zinc-400">cm</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICE + BREAKDOWN side by side ── */}
      <div className="grid grid-cols-2 gap-4 items-start">

        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Select FedEx Service</p>
          </div>
          <div className="px-4 py-3 space-y-3">
            {isLoadingRates ? (
              <p className="text-[11px] text-zinc-400">Loading available services…</p>
            ) : ratesError ? (
              <p className="text-[11px] text-rose-600">{ratesError}</p>
            ) : fedexRates.length === 0 ? (
              <p className="text-[11px] text-rose-600">No FedEx services available for this route.</p>
            ) : (
              <select
                value={selectedServiceCode}
                onChange={(e) => setSelectedServiceCode(e.target.value)}
                className="w-full border border-[#e3bfd6] px-3 py-2.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
              >
                <option value="">— Choose a service —</option>
                {fedexRates.map((rate) => (
                  <option key={rate.serviceCode} value={rate.serviceCode}>
                    {rate.serviceName}
                  </option>
                ))}
              </select>
            )}

            {selectedRate ? (
              <div className="flex items-center justify-between border border-[#f0dbe8] bg-[#fff8fd] px-3 py-2">
                <span className="text-[11px] text-[#694d5f]">
                  {selectedRate.deliveryDays
                    ? <span className="text-zinc-400">~{selectedRate.deliveryDays} days</span>
                    : null}
                </span>
                <span className="font-mono font-bold text-[#d24a90]">{fmt(selectedRate.price)}</span>
              </div>
            ) : null}
          </div>
        </section>

        {selectedRate && selectedRate.baseCharge !== undefined ? (() => {
          const totalDiscount = (selectedRate.freightDiscounts ?? []).reduce((s, d) => s + d.amount, 0)
          const afterDiscount = parseFloat(((selectedRate.baseCharge ?? 0) - totalDiscount).toFixed(2))
          const savings = selectedRate.listPrice && selectedRate.listPrice > selectedRate.price
            ? parseFloat((selectedRate.listPrice - selectedRate.price).toFixed(2))
            : null
          return (
            <section className="border border-[#efcfe1] bg-white">
              <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                  {selectedRate.serviceName} — Charge Breakdown
                </p>
              </div>
              <div className="px-4 py-3 space-y-1 text-[11px] text-[#694d5f]">
                <div className="flex justify-between">
                  <span>Base charge</span>
                  <span className="font-mono">{fmt(selectedRate.baseCharge!)}</span>
                </div>
                {(selectedRate.freightDiscounts ?? []).map((d, i) => (
                  <div key={i} className="flex justify-between text-emerald-700">
                    <span>{d.description} ({d.percent}%)</span>
                    <span className="font-mono">−{fmt(d.amount)}</span>
                  </div>
                ))}
                {totalDiscount > 0 ? (
                  <div className="flex justify-between border-t border-dashed border-[#e8d0e0] pt-1.5 text-[#4f2040]">
                    <span className="font-semibold">After discount</span>
                    <span className="font-mono font-semibold">{fmt(afterDiscount)}</span>
                  </div>
                ) : null}
                {(selectedRate.surcharges ?? []).map((s, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{s.description}{s.type === 'FUEL' && selectedRate.fuelSurchargePercent ? ` (${selectedRate.fuelSurchargePercent}%)` : ''}</span>
                    <span className="font-mono">+{fmt(s.amount)}</span>
                  </div>
                ))}
                {(selectedRate.taxes ?? []).map((t, i) => (
                  <div key={`tax-${i}`} className="flex justify-between text-amber-700">
                    <span>{t.description || t.type}</span>
                    <span className="font-mono">+{fmt(t.amount)}</span>
                  </div>
                ))}
                <div className="mt-2 border-t border-[#f0dbe8] pt-2 space-y-1">
                  {selectedRate.listPrice && selectedRate.listPrice > selectedRate.price ? (
                    <div className="flex justify-between text-zinc-400">
                      <span>Public rate <span className="text-[9px]">(walk-in)</span></span>
                      <span className="font-mono line-through">{fmt(selectedRate.listPrice)}</span>
                    </div>
                  ) : null}
                  {savings ? (
                    <div className="flex justify-between text-emerald-700">
                      <span>You save</span>
                      <span className="font-mono font-semibold">−{fmt(savings)}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between border-t border-[#f0dbe8] pt-1.5 font-bold text-[#3d1530] text-xs">
                    <span>Account rate <span className="text-[9px] font-normal text-[#8b5a75]">(your FedEx)</span></span>
                    <span className="font-mono text-[#d24a90]">{fmt(selectedRate.price)}</span>
                  </div>
                </div>
                {selectedRate.billingWeightKg ? (
                  <div className="flex justify-between pt-1 text-zinc-400">
                    <span>Billing weight</span>
                    <span>{selectedRate.billingWeightKg} kg</span>
                  </div>
                ) : null}
              </div>
            </section>
          )
        })() : (
          <div className="flex items-center justify-center border border-dashed border-[#efcfe1] p-8 text-[11px] text-zinc-400">
            Select a service to see the breakdown
          </div>
        )}
      </div>

      {/* ── SERVICE OPTIONS ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Service Options</p>
        </div>
        <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Signature Option</label>
            <select value={signatureOption} onChange={(e) => setSignatureOption(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {SIGNATURE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-5">
            <input type="checkbox" id="saturday" checked={saturdayDelivery} onChange={(e) => setSaturdayDelivery(e.target.checked)}
              className="h-4 w-4 accent-[#d24a90]" />
            <label htmlFor="saturday" className="text-xs text-[#4f2040]">Saturday Delivery</label>
          </div>
        </div>
      </section>

      {/* ── DUTIES PAYMENT ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Billing / Duties Payment</p>
        </div>
        <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Bill Duties To</label>
            <select value={dutiesPaymentType} onChange={(e) => setDutiesPaymentType(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {DUTIES_PAYMENT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          {dutiesPaymentType === 'THIRD_PARTY' ? (
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Third Party FedEx Account #</label>
              <input value={dutiesAccountNumber} onChange={(e) => setDutiesAccountNumber(e.target.value)}
                placeholder="Account number"
                className="w-full border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── NOTIFICATIONS ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Shipment Notifications</p>
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="notify-recipient" checked={notifyRecipient} onChange={(e) => setNotifyRecipient(e.target.checked)}
              className="h-4 w-4 accent-[#d24a90]" />
            <label htmlFor="notify-recipient" className="text-xs text-[#4f2040]">Email recipient on shipment, delivery &amp; exceptions</label>
          </div>
          {notifyRecipient ? (
            <div className="flex items-center gap-2">
              <label className="w-16 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Email</label>
              <input value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)}
                type="email" placeholder="recipient@email.com"
                className="flex-1 border border-[#e3bfd6] px-2 py-1.5 text-xs outline-none focus:border-[#d24a90]" />
            </div>
          ) : null}
        </div>
      </section>

      {/* ── VALIDATION BLOCKERS ── */}
      {hasBlockers ? (
        <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          <p className="mb-1 font-semibold">Cannot ship until these are fixed:</p>
          <ul className="list-inside list-disc space-y-0.5">
            {validation!.issues.map((issue) => <li key={issue}>{issue}</li>)}
          </ul>
        </div>
      ) : null}

      {/* ── PRICE & CUSTOMS BREAKDOWN ── */}
      <CustomsBreakdown commodities={commodities} pkg={preview?.package} />

      {/* ── PAYLOAD PREVIEW ── */}
      <section className="border border-[#efcfe1] bg-white">
        <button type="button" onClick={() => setShowPayload((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#8b5a75] hover:bg-[#fff8fd]">
          <div className="text-left">
            <span>FedEx API Payload Preview</span>
            <span className="ml-2 font-normal normal-case text-zinc-400">POST /ship/v1/shipments — exact body sent to FedEx</span>
          </div>
          {showPayload ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
        </button>
        {showPayload ? (
          <pre className="max-h-96 overflow-auto border-t border-[#efcfe1] bg-[#1e0e18] px-4 py-3 text-[10px] leading-5 text-emerald-300">
            {JSON.stringify(payloadPreview, null, 2)}
          </pre>
        ) : null}
      </section>

      {/* ── FOOTER ── */}
      <div className="flex items-center justify-between gap-3 border-t border-[#efcfe1] pt-4">
        <button type="button" onClick={onBack}
          className="border border-[#e3bfd6] px-5 py-2.5 text-xs font-semibold text-[#6f4f65] transition hover:bg-[#fff7fb]">
          ← Back
        </button>
        <button type="button" onClick={() => void handleSubmit()}
          disabled={isSubmitting || !selectedServiceCode || hasBlockers || isEditingReceiver}
          className="border border-[#d24a90] bg-[#d24a90] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#b83f7d] disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting
            ? 'Creating shipment…'
            : selectedRate
              ? `Create Shipment — ${fmt(selectedRate.price)}`
              : 'Create Shipment'}
        </button>
      </div>
    </div>
  )
}

const UK_DUTY_VAT_DIVISOR = 1.225

function CustomsBreakdown({
  commodities,
  pkg,
}: {
  commodities: CommodityRow[]
  pkg: import('../../types/order').AdminShipmentPackagePreview | undefined
}) {
  if (!pkg) return null

  const isOutsideEU = pkg.retailValueEUR !== undefined
  const itemRows = commodities.length > 0 ? commodities : null

  const retailTotal = itemRows
    ? parseFloat(itemRows.reduce((s, c) => s + c.unitPriceEUR * c.qty, 0).toFixed(2))
    : (pkg.retailValueEUR ?? pkg.declaredValueEUR)

  const deliveryCharge = pkg.deliveryChargeEUR ?? 0
  const preTaxSubtotal = parseFloat((retailTotal - deliveryCharge).toFixed(2))
  const declaredValue = isOutsideEU
    ? parseFloat((preTaxSubtotal / UK_DUTY_VAT_DIVISOR).toFixed(2))
    : retailTotal

  return (
    <section className="border border-[#efcfe1] bg-white">
      <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
          Price &amp; Customs Breakdown
        </p>
        <p className="mt-0.5 text-[10px] text-zinc-400">
          How the declared customs value is calculated from retail price
        </p>
      </div>

      <div className="px-4 py-3 space-y-3 text-[11px] text-[#694d5f]">

        {itemRows ? (
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
              Item Retail Prices
            </p>
            <div className="space-y-1">
              {itemRows.map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="truncate max-w-[220px]" title={c.title}>
                    {c.title} <span className="text-zinc-400">× {c.qty}</span>
                  </span>
                  <span className="font-mono text-[#4f2040]">{fmt(c.unitPriceEUR * c.qty)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="border border-[#f0dbe8] divide-y divide-[#f6e3ee]">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[#4f2040] font-semibold">Total retail value</span>
            <span className="font-mono font-semibold text-[#4f2040]">{fmt(retailTotal)}</span>
          </div>

          {isOutsideEU ? (
            <>
              <div className="flex items-center justify-between px-3 py-2 text-amber-700 bg-amber-50">
                <span>
                  Delivery charge deduction
                  <span className="ml-1.5 text-[9px] text-zinc-400 uppercase tracking-[0.08em]">
                    (outside EU — excluded from customs)
                  </span>
                </span>
                <span className="font-mono">−{fmt(deliveryCharge)}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span>Pre-tax subtotal</span>
                <span className="font-mono">{fmt(preTaxSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-sky-700 bg-sky-50">
                <span>
                  ÷ {UK_DUTY_VAT_DIVISOR} divisor
                  <span className="ml-1.5 text-[9px] text-zinc-400 uppercase tracking-[0.08em]">
                    (removes 20% VAT + 2.5% duty)
                  </span>
                </span>
                <span className="font-mono">÷ {UK_DUTY_VAT_DIVISOR}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between px-3 py-2 text-emerald-700 bg-emerald-50">
              <span className="text-[9px] uppercase tracking-[0.08em]">Inside EU — no deduction or divisor applied</span>
              <span />
            </div>
          )}

          <div className="flex items-center justify-between px-3 py-2.5 bg-[#fff0f9]">
            <span className="font-bold text-[#3d1530]">
              Declared customs value
              <span className="ml-1.5 text-[9px] font-normal text-zinc-400 uppercase tracking-[0.06em]">
                sent to FedEx
              </span>
            </span>
            <span className="font-mono font-bold text-[#d24a90] text-sm">{fmt(declaredValue)}</span>
          </div>

          <div className="flex items-center justify-between px-3 py-2 text-sky-700 bg-sky-50">
            <span>
              ÷ 2 margin
              <span className="ml-1.5 text-[9px] text-zinc-400 uppercase tracking-[0.08em]">
                (50% of declared value)
              </span>
            </span>
            <span className="font-mono">÷ 2</span>
          </div>

          <div className="flex items-center justify-between px-3 py-2.5 bg-emerald-50">
            <span className="font-bold text-emerald-700">
              Margin
              <span className="ml-1.5 text-[9px] font-normal text-zinc-400 uppercase tracking-[0.06em]">
                declared value ÷ 2
              </span>
            </span>
            <span className="font-mono font-bold text-emerald-700 text-sm">{fmt(parseFloat((declaredValue / 2).toFixed(2)))}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-zinc-400">
          <span><span className="font-semibold text-[#8b5a75]">Incoterm:</span> {pkg.incoterm}</span>
          <span><span className="font-semibold text-[#8b5a75]">Total weight:</span> {pkg.totalWeightKg} kg</span>
          <span><span className="font-semibold text-[#8b5a75]">Currency:</span> EUR</span>
          {isOutsideEU ? (
            <span className="text-amber-600">Outside EU — import duties apply at destination</span>
          ) : (
            <span className="text-emerald-600">Inside EU — no import customs required</span>
          )}
        </div>
      </div>
    </section>
  )
}
