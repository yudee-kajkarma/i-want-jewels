'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
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

  const [selectedServiceCode, setSelectedServiceCode] = useState('')

  async function loadFedexRates() {
    setIsLoadingRates(true)
    setRatesError('')
    setFedexRates([])
    setSelectedServiceCode('')
    try {
      const q = await getAdminCarrierRatesForOrder(order.id, 'FEDEX')
      const rates = q?.rates.FEDEX ?? []
      setFedexRates(rates)
      if (rates[0]) setSelectedServiceCode(rates[0].serviceCode)
    } catch {
      setRatesError('Could not load FedEx rates for this route.')
    } finally {
      setIsLoadingRates(false)
    }
  }

  useEffect(() => {
    void loadFedexRates()
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
      toast.success('Receiver address updated — refreshing rates…')
      void loadFedexRates()
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
                      <input value={c.hsCode}
                        onChange={(e) => setCommodities((prev) => prev.map((r, i) => i === idx ? { ...r, hsCode: e.target.value } : r))}
                        maxLength={10}
                        className="w-24 border border-[#e3bfd6] px-1.5 py-1 font-mono text-[11px] outline-none focus:border-[#d24a90]" />
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

          // Pair account-side surcharges with list-side by type (FUEL→FUEL, DEMAND→DEMAND)
          const listSurMap = new Map<string, number>()
          ;(selectedRate.listSurcharges ?? []).forEach((s) => {
            listSurMap.set((s.type || s.description || '').toUpperCase(), s.amount)
          })
          const listTaxMap = new Map<string, number>()
          ;(selectedRate.listTaxes ?? []).forEach((t) => {
            listTaxMap.set((t.type || t.description || '').toUpperCase(), t.amount)
          })

          return (
            <section className="border border-[#efcfe1] bg-white">
              <div className="border-b border-[#efcfe1] bg-[#fff8fd] px-4 py-2.5">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#8b5a75]">
                  {selectedRate.serviceName} — Charge Breakdown
                </p>
              </div>

              <table className="w-full text-[11px] text-[#694d5f]">
                <thead className="bg-[#fff2fb] text-left">
                  <tr>
                    <th className="px-4 py-2 font-bold uppercase tracking-[0.08em] text-[10px] text-[#8b5a75]">Line</th>
                    <th className="px-4 py-2 text-right font-bold uppercase tracking-[0.08em] text-[10px] text-zinc-500">Public / Walk-in</th>
                    <th className="px-4 py-2 text-right font-bold uppercase tracking-[0.08em] text-[10px] text-[#d24a90]">Your FedEx</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f6e3ee]">
                  <tr>
                    <td className="px-4 py-1.5">Base charge</td>
                    <td className="px-4 py-1.5 text-right font-mono">
                      {selectedRate.listBaseCharge ? fmt(selectedRate.listBaseCharge) : <span className="text-zinc-400">—</span>}
                    </td>
                    <td className="px-4 py-1.5 text-right font-mono">{fmt(selectedRate.baseCharge!)}</td>
                  </tr>
                  {(selectedRate.freightDiscounts ?? []).map((d, i) => (
                    <tr key={`disc-${i}`} className="text-emerald-700">
                      <td className="px-4 py-1.5">{d.description} ({d.percent}%)</td>
                      <td className="px-4 py-1.5 text-right font-mono text-zinc-400">—</td>
                      <td className="px-4 py-1.5 text-right font-mono">−{fmt(d.amount)}</td>
                    </tr>
                  ))}
                  {totalDiscount > 0 ? (
                    <tr className="text-[#4f2040] bg-[#fff8fd]">
                      <td className="px-4 py-1.5 font-semibold">After discount</td>
                      <td className="px-4 py-1.5 text-right font-mono text-zinc-400">—</td>
                      <td className="px-4 py-1.5 text-right font-mono font-semibold">{fmt(afterDiscount)}</td>
                    </tr>
                  ) : null}
                  {(selectedRate.surcharges ?? []).map((s, i) => {
                    const listAmount = listSurMap.get((s.type || s.description || '').toUpperCase())
                    const isFuel = s.type === 'FUEL'
                    return (
                      <tr key={`sur-${i}`}>
                        <td className="px-4 py-1.5">
                          {s.description}
                          {isFuel && selectedRate.fuelSurchargePercent ? ` (${selectedRate.fuelSurchargePercent}%)` : ''}
                        </td>
                        <td className="px-4 py-1.5 text-right font-mono">
                          {listAmount !== undefined ? `+${fmt(listAmount)}` : <span className="text-zinc-400">—</span>}
                        </td>
                        <td className="px-4 py-1.5 text-right font-mono">+{fmt(s.amount)}</td>
                      </tr>
                    )
                  })}
                  {(selectedRate.taxes ?? []).map((t, i) => {
                    const listAmount = listTaxMap.get((t.type || t.description || '').toUpperCase())
                    return (
                      <tr key={`tax-${i}`} className="text-amber-700">
                        <td className="px-4 py-1.5">{t.description || t.type}</td>
                        <td className="px-4 py-1.5 text-right font-mono">
                          {listAmount !== undefined ? `+${fmt(listAmount)}` : <span className="text-zinc-400">—</span>}
                        </td>
                        <td className="px-4 py-1.5 text-right font-mono">+{fmt(t.amount)}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className="border-t-2 border-[#efcfe1]">
                  <tr className="font-bold text-[#3d1530] text-xs bg-[#fff0f9]">
                    <td className="px-4 py-2">Total</td>
                    <td className="px-4 py-2 text-right font-mono text-zinc-500 line-through">
                      {selectedRate.listPrice ? fmt(selectedRate.listPrice) : '—'}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-[#d24a90]">{fmt(selectedRate.price)}</td>
                  </tr>
                  {savings ? (
                    <tr className="text-emerald-700 text-[11px]">
                      <td className="px-4 py-1.5">You save</td>
                      <td colSpan={2} className="px-4 py-1.5 text-right font-mono font-semibold">−{fmt(savings)}</td>
                    </tr>
                  ) : null}
                </tfoot>
              </table>

              {selectedRate.billingWeightKg ? (
                <div className="border-t border-[#efcfe1] px-4 py-2 text-[10px] text-zinc-400">
                  Billing weight: <span className="font-semibold text-[#8b5a75]">{selectedRate.billingWeightKg} kg</span>
                </div>
              ) : null}
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
      <CustomsBreakdown commodities={commodities} pkg={preview?.package} isOutsideEU={isOutsideEU} />

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

function CustomsBreakdown({
  commodities,
  pkg,
  isOutsideEU,
}: {
  commodities: CommodityRow[]
  pkg: import('../../types/order').AdminShipmentPackagePreview | undefined
  isOutsideEU: boolean
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
          Customs values from product records — sent to FedEx as-is
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
                <span className="font-mono text-[#4f2040]">{fmt(c.customsValueEUR)}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="border border-[#f0dbe8] divide-y divide-[#f6e3ee]">
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#fff0f9]">
            <span className="font-bold text-[#3d1530]">
              Total declared customs value
              <span className="ml-1.5 text-[9px] font-normal text-zinc-400 uppercase tracking-[0.06em]">
                sent to FedEx
              </span>
            </span>
            <span className="font-mono font-bold text-[#d24a90] text-sm">{fmt(totalCustomsValue)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-zinc-400">
          <span><span className="font-semibold text-[#8b5a75]">Incoterm:</span> {pkg.incoterm}</span>
          <span><span className="font-semibold text-[#8b5a75]">Total weight:</span> {pkg.totalWeightKg} kg</span>
          <span><span className="font-semibold text-[#8b5a75]">Currency:</span> EUR</span>
          <span className="text-amber-600">Outside EU — import duties apply at destination</span>
        </div>
      </div>
    </section>
  )
}
