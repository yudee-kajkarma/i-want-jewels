'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import type { AdminShippingQuote, AdminShipmentPreviewItem, AdminShippingRateOption, Order } from '../../types/order'
import {
  shipOrderForAdmin,
  updateOrderShippingAddressForAdmin,
  getAdminCarrierRatesForOrder,
  type DhlShipOptions,
} from '../../services/orderService'
import { getCountryOptions, getStateOptions } from '../../utils/location'

// ── DHL Express constants ──────────────────────────────────────────────
const INCOTERM_OPTIONS = [
  { value: 'DAP', label: 'DAP — Delivered at Place (recipient pays duties)' },
  { value: 'DDP', label: 'DDP — Delivered Duty Paid (sender pays duties)' },
  { value: 'DDU', label: 'DDU — Delivered Duty Unpaid' },
  { value: 'CPT', label: 'CPT — Carriage Paid To' },
  { value: 'CIP', label: 'CIP — Carriage & Insurance Paid To' },
  { value: 'EXW', label: 'EXW — Ex Works' },
  { value: 'FCA', label: 'FCA — Free Carrier' },
]

const SHIPMENT_TYPE_OPTIONS = [
  { value: 'commercial', label: 'Commercial (sale)' },
  { value: 'personal', label: 'Personal (no sale)' },
] as const

const EXPORT_REASON_OPTIONS = [
  { value: 'permanent', label: 'Permanent (sold)' },
  { value: 'gift', label: 'Gift' },
  { value: 'sample', label: 'Sample' },
  { value: 'return', label: 'Return' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'warranty_replacement', label: 'Warranty replacement' },
  { value: 'personal_belongings_or_personal_use', label: 'Personal use' },
]

const DUTIES_PAYMENT_OPTIONS = [
  { value: 'SENDER', label: 'Sender (my DHL account)' },
  { value: 'RECIPIENT', label: 'Recipient (pay on delivery)' },
  { value: 'THIRD_PARTY', label: 'Third Party (enter account #)' },
]

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
      setRatesError('Could not load DHL rates for this route.')
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

  // ── DHL-specific form state ──
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
      setReceiverSaveError('Please fill in all required address fields.')
      return
    }
    setIsSavingReceiver(true)
    setReceiverSaveError('')
    try {
      await updateOrderShippingAddressForAdmin(order.id, receiverDraft)
      setIsEditingReceiver(false)
      toast.success('Receiver address updated — refreshing rates…')
      void loadDhlRates()
    } catch (err: any) {
      setReceiverSaveError(err?.response?.data?.message || 'Failed to update address.')
    } finally {
      setIsSavingReceiver(false)
    }
  }

  async function handleSubmit() {
    if (!selectedServiceCode) {
      toast.error('Please select a DHL product/service.')
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
      toast.success(`Order ${order.orderNumber} shipped via DHL Express.`)
      onShipped()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to create DHL shipment.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

      {/* ── CUSTOMS / COMMODITIES (read-only) ── */}
      {commodities.length > 0 ? (
        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Customs / Commodities</p>
            <p className="mt-0.5 text-[10px] text-zinc-400">Only HS codes are editable.</p>
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
              <span className="font-semibold text-[#4f2040]">Total customs value: </span>
              {fmt(preview.package.declaredValueEUR)}
              <span className="ml-3 font-semibold text-[#4f2040]">Currency: </span>EUR
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ── CUSTOMS / EXPORT DECLARATION ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Customs Declaration</p>
        </div>
        <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Incoterm *</label>
            <select value={incoterm} onChange={(e) => setIncoterm(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {INCOTERM_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Shipment Type</label>
            <select value={shipmentType} onChange={(e) => setShipmentType(e.target.value as 'commercial' | 'personal')}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {SHIPMENT_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Export Reason</label>
            <select value={exportReasonType} onChange={(e) => setExportReasonType(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
              {EXPORT_REASON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Invoice Number</label>
            <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
          </div>
        </div>
      </section>

      {/* ── PACKAGE DETAILS ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Package Details</p>
        </div>
        <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
              Weight (auto-calculated from items)
            </label>
            <div className="border border-[#e3bfd6] bg-[#f9f0f6] px-3 py-2 text-xs text-[#694d5f]">
              {preview?.package.totalWeightKg ?? 0} kg
            </div>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">
              Dimensions (cm)
            </label>
            <div className="flex items-center gap-2">
              <input type="number" min="1" value={dimL} onChange={(e) => setDimL(e.target.value)} placeholder="L"
                className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              <span className="text-zinc-400">×</span>
              <input type="number" min="1" value={dimW} onChange={(e) => setDimW(e.target.value)} placeholder="W"
                className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              <span className="text-zinc-400">×</span>
              <input type="number" min="1" value={dimH} onChange={(e) => setDimH(e.target.value)} placeholder="H"
                className="w-20 border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              <span className="text-xs text-zinc-400">cm</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE + BREAKDOWN side by side ── */}
      <div className="grid grid-cols-2 gap-4 items-start">

        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Select DHL Product</p>
          </div>
          <div className="px-4 py-3 space-y-3">
            {isLoadingRates ? (
              <p className="text-[11px] text-zinc-400">Loading available products…</p>
            ) : ratesError ? (
              <p className="text-[11px] text-rose-600">{ratesError}</p>
            ) : dhlRates.length === 0 ? (
              <p className="text-[11px] text-rose-600">No DHL products available for this route.</p>
            ) : (
              <select
                value={selectedServiceCode}
                onChange={(e) => setSelectedServiceCode(e.target.value)}
                className="w-full border border-[#e3bfd6] px-3 py-2.5 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]"
              >
                <option value="">— Choose a product —</option>
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
                    ? <span className="text-zinc-400">~{selectedRate.deliveryDays} days</span>
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
                {selectedRate.serviceName} — Charge Breakdown
              </p>
            </div>
            <div className="px-4 py-3 space-y-1 text-[11px] text-[#694d5f]">
              {selectedRate.baseCharge !== undefined ? (
                <div className="flex justify-between">
                  <span>Base charge</span>
                  <span className="font-mono">{fmt(selectedRate.baseCharge)}</span>
                </div>
              ) : null}

              {(selectedRate.surcharges ?? []).map((s, i) => (
                <div key={`dhl-sur-${i}`} className="flex justify-between">
                  <span>{s.description}</span>
                  <span className="font-mono">+{fmt(s.amount)}</span>
                </div>
              ))}

              {(selectedRate.taxes ?? []).map((t, i) => (
                <div key={`dhl-tax-${i}`} className="flex justify-between text-amber-700">
                  <span>{t.description || t.type}</span>
                  <span className="font-mono">+{fmt(t.amount)}</span>
                </div>
              ))}

              <div className="mt-2 border-t border-[#f0dbe8] pt-2">
                <div className="flex justify-between font-bold text-[#3d1530] text-xs">
                  <span>Account rate <span className="text-[9px] font-normal text-[#8b5a75]">(your DHL)</span></span>
                  <span className="font-mono text-amber-700">{fmt(selectedRate.price)}</span>
                </div>
              </div>

              {selectedRate.billingWeightKg ? (
                <div className="flex justify-between pt-1 text-zinc-400">
                  <span>Billing weight</span>
                  <span>{selectedRate.billingWeightKg} kg</span>
                </div>
              ) : null}
              {selectedRate.deliveryDays ? (
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated transit</span>
                  <span>~{selectedRate.deliveryDays} days</span>
                </div>
              ) : null}
            </div>
          </section>
        ) : (
          <div className="flex items-center justify-center border border-dashed border-[#efcfe1] p-8 text-[11px] text-zinc-400">
            Select a product to see the breakdown
          </div>
        )}
      </div>

      {/* ── VALUE-ADDED SERVICES ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Value-Added Services</p>
        </div>
        <div className="grid gap-3 px-4 py-3 sm:grid-cols-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={insuranceEnabled} onChange={(e) => setInsuranceEnabled(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <span className="text-xs text-[#4f2040]">Shipment Insurance (II)</span>
          </label>
          {insuranceEnabled ? (
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Insured €</label>
              <input type="number" min="0" step="0.01" value={insuranceValueEUR}
                onChange={(e) => setInsuranceValueEUR(e.target.value)}
                placeholder={(preview?.package.declaredValueEUR ?? 0).toFixed(2)}
                className="w-28 border border-[#e3bfd6] px-2 py-1.5 text-xs outline-none focus:border-[#d24a90]" />
            </div>
          ) : <div />}

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={saturdayDelivery} onChange={(e) => setSaturdayDelivery(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <span className="text-xs text-[#4f2040]">Saturday Delivery (AA)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={paperlessTrade} onChange={(e) => setPaperlessTrade(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <span className="text-xs text-[#4f2040]">Paperless Trade — electronic invoice (WY)</span>
          </label>
        </div>
      </section>

      {/* ── DUTIES PAYMENT (DDP only) ── */}
      {incoterm === 'DDP' ? (
        <section className="border border-[#efcfe1] bg-white">
          <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Billing / Duties Payment</p>
            <p className="mt-0.5 text-[10px] text-zinc-400">DDP only — sender controls who pays duties &amp; taxes.</p>
          </div>
          <div className="grid gap-4 px-4 py-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Bill Duties To</label>
              <select value={dutiesPaymentType} onChange={(e) => setDutiesPaymentType(e.target.value as 'SENDER' | 'RECIPIENT' | 'THIRD_PARTY')}
                className="w-full border border-[#e3bfd6] px-2 py-2 text-xs text-[#4f2040] outline-none focus:border-[#d24a90]">
                {DUTIES_PAYMENT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            {dutiesPaymentType === 'THIRD_PARTY' ? (
              <div>
                <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b5a75]">Third-Party DHL Account #</label>
                <input value={dutiesAccountNumber} onChange={(e) => setDutiesAccountNumber(e.target.value)}
                  placeholder="Account number"
                  className="w-full border border-[#e3bfd6] px-2 py-2 text-xs outline-none focus:border-[#d24a90]" />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ── NOTIFICATIONS ── */}
      <section className="border border-[#efcfe1] bg-white">
        <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">Shipment Notifications</p>
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="dhl-notify-recipient" checked={notifyRecipient} onChange={(e) => setNotifyRecipient(e.target.checked)}
              className="h-4 w-4 accent-amber-600" />
            <label htmlFor="dhl-notify-recipient" className="text-xs text-[#4f2040]">Email recipient on shipment events</label>
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

      {/* ── PRICE & CUSTOMS BREAKDOWN ── */}
      <CustomsBreakdown
        commodities={commodities}
        pkg={preview?.package}
        isOutsideEU={isOutsideEU}
        incoterm={incoterm}
      />

      {/* ── VALIDATION BLOCKERS ── */}
      {hasBlockers ? (
        <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          <p className="mb-1 font-semibold">Cannot ship until these are fixed:</p>
          <ul className="list-inside list-disc space-y-0.5">
            {validation!.issues.map((issue) => <li key={issue}>{issue}</li>)}
          </ul>
        </div>
      ) : null}

      {/* ── FOOTER ── */}
      <div className="flex items-center justify-between gap-3 border-t border-[#efcfe1] pt-4">
        <button type="button" onClick={onBack}
          className="border border-[#e3bfd6] px-5 py-2.5 text-xs font-semibold text-[#6f4f65] transition hover:bg-[#fff7fb]">
          ← Back
        </button>
        <button type="button" onClick={() => void handleSubmit()}
          disabled={isSubmitting || !selectedServiceCode || hasBlockers || isEditingReceiver}
          className="border border-amber-600 bg-amber-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70">
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
  if (!pkg || !isOutsideEU) return null

  const totalCustomsValue = parseFloat(
    commodities.reduce((s, c) => s + c.customsValueEUR, 0).toFixed(2)
  )

  return (
    <section className="border border-[#efcfe1] bg-white">
      <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
          Customs Declaration
        </p>
        <p className="mt-0.5 text-[10px] text-zinc-400">
          Customs values from product records — sent to DHL as-is
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
              Total declared customs value
              <span className="ml-1.5 text-[9px] font-normal text-zinc-400 uppercase tracking-[0.06em]">
                sent to DHL
              </span>
            </span>
            <span className="font-mono font-bold text-amber-700 text-sm">€{totalCustomsValue.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-zinc-400">
          <span><span className="font-semibold text-[#8b5a75]">Incoterm:</span> {incoterm}</span>
          <span><span className="font-semibold text-[#8b5a75]">Total weight:</span> {pkg.totalWeightKg} kg</span>
          <span><span className="font-semibold text-[#8b5a75]">Currency:</span> EUR</span>
          <span className="text-amber-600">Outside EU — import duties apply at destination</span>
        </div>
      </div>
    </section>
  )
}
