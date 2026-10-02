'use client'

import { useState, type ReactNode } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Calculator, FileCheck2, Landmark, RefreshCw } from 'lucide-react'
import {
    clearAdminOrderActualDuties,
    estimateAdminOrderDuties,
    setAdminOrderActualDuties,
} from '../../services/orderService'
import type { ActualDutiesAndTaxes, AdminOrderDetail, DutiesEstimate } from '../../types/order'
import { formatDateTime } from '../../utils/formatDate'

type Props = {
    order: AdminOrderDetail
    onChange: (patch: Partial<Pick<AdminOrderDetail, 'dutiesEstimate' | 'actualDutiesAndTaxes'>>) => void
}

// Carrier amounts come back in the carrier's own currency (FedEx often bills in
// USD), so money here is formatted from the ISO code, not the site currency.
function formatMoney(amount: number, iso: string, locale: string) {
    try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: iso || 'EUR' }).format(amount)
    } catch {
        return `${amount.toFixed(2)} ${iso}`
    }
}

function apiError(error: unknown, fallback: string) {
    return (error as { response?: { data?: { message?: string } } })?.response?.data?.message || fallback
}

function Row({ label, value, strong }: { label: ReactNode; value: ReactNode; strong?: boolean }) {
    return (
        <div className="flex items-start justify-between gap-3">
            <span className="text-zinc-500">{label}</span>
            <span className={`text-right ${strong ? 'font-bold' : 'font-semibold'} text-[#17110d]`}>{value}</span>
        </div>
    )
}

function Card({ icon, title, children, tone = 'plain' }: { icon: ReactNode; title: string; children: ReactNode; tone?: 'plain' | 'info' | 'warn' }) {
    const toneClass = tone === 'info'
        ? 'border-sky-200 bg-sky-50/60'
        : tone === 'warn'
            ? 'border-amber-200 bg-amber-50/60'
            : 'border-[#efe1d5] bg-[#fffdfa]'
    return (
        <div className={`border p-4 ${toneClass}`}>
            <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]">
                {icon}
                {title}
            </p>
            <div className="mt-3 space-y-2">{children}</div>
        </div>
    )
}

export default function ShipmentCustomsPanel({ order, onChange }: Props) {
    const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.orderDetail.customs' })
    const locale = i18n.language
    const declaration = order.shipmentDeclaration
    const estimate = order.dutiesEstimate
    const actual = order.actualDutiesAndTaxes

    const [isEstimating, setIsEstimating] = useState(false)
    const [isEditingActual, setIsEditingActual] = useState(false)
    const [isSavingActual, setIsSavingActual] = useState(false)
    const [actualForm, setActualForm] = useState({ amount: '', currency: '', invoiceNumber: '', note: '' })

    const hasCarrierShipment = (order.shippingCarrier === 'FEDEX' || order.shippingCarrier === 'DHL') && !!order.trackingNumber
    if (!hasCarrierShipment) {
        return null
    }

    const carrierName = order.shippingCarrier === 'FEDEX' ? 'FedEx' : 'DHL'
    const paidByLabel: Record<string, string> = {
        SENDER: t('paidBySender', { defaultValue: 'Us (sender)' }),
        RECIPIENT: t('paidByRecipient', { defaultValue: 'Customer, on delivery' }),
        THIRD_PARTY: t('paidByThirdParty', { defaultValue: 'Third-party account' }),
    }
    const incotermHint: Record<string, string> = {
        DDP: t('ddpHint', { defaultValue: 'Delivered Duty Paid — import duties & VAT are billed to us; the customer pays nothing on delivery.' }),
        DAP: t('dapHint', { defaultValue: 'Delivered At Place — import duties & VAT are collected from the customer on delivery.' }),
    }

    async function handleEstimate() {
        if (isEstimating) return
        setIsEstimating(true)
        try {
            const fresh = await estimateAdminOrderDuties(order.id)
            onChange({ dutiesEstimate: fresh })
            toast.success(t('estimateUpdated', { defaultValue: 'Duties & taxes estimate updated.' }))
        } catch (error) {
            toast.error(apiError(error, t('estimateFailed', { defaultValue: 'Could not get an estimate from the carrier.' })))
        } finally {
            setIsEstimating(false)
        }
    }

    function openActualForm() {
        setActualForm({
            amount: actual ? String(actual.amount) : '',
            currency: actual?.currency || estimate?.currency || declaration?.declarationCurrency || 'EUR',
            invoiceNumber: actual?.invoiceNumber || '',
            note: actual?.note || '',
        })
        setIsEditingActual(true)
    }

    async function handleSaveActual() {
        const amount = Number(actualForm.amount.replace(',', '.'))
        if (!actualForm.amount.trim() || !Number.isFinite(amount) || amount < 0) {
            toast.error(t('amountInvalid', { defaultValue: 'Enter the amount charged, 0 or more.' }))
            return
        }
        if (!/^[A-Za-z]{3}$/.test(actualForm.currency.trim())) {
            toast.error(t('currencyInvalid', { defaultValue: 'Currency must be a 3-letter code, e.g. EUR.' }))
            return
        }
        setIsSavingActual(true)
        try {
            const saved = await setAdminOrderActualDuties(order.id, {
                amount,
                currency: actualForm.currency.trim().toUpperCase(),
                invoiceNumber: actualForm.invoiceNumber.trim() || undefined,
                note: actualForm.note.trim() || undefined,
            })
            onChange({ actualDutiesAndTaxes: saved })
            setIsEditingActual(false)
            toast.success(t('actualSaved', { defaultValue: 'Actual duties & taxes saved.' }))
        } catch (error) {
            toast.error(apiError(error, t('actualSaveFailed', { defaultValue: 'Could not save the actual duties & taxes.' })))
        } finally {
            setIsSavingActual(false)
        }
    }

    async function handleClearActual() {
        setIsSavingActual(true)
        try {
            await clearAdminOrderActualDuties(order.id)
            onChange({ actualDutiesAndTaxes: null })
            setIsEditingActual(false)
        } catch (error) {
            toast.error(apiError(error, t('actualSaveFailed', { defaultValue: 'Could not save the actual duties & taxes.' })))
        } finally {
            setIsSavingActual(false)
        }
    }

    return (
        <section className="mt-6 space-y-4 border-t border-[#efe1d5] pt-6 text-sm">
            <h2 className="inline-flex items-center gap-2 text-xl font-bold text-[#17110d]">
                <Landmark className="h-5 w-5" />
                {t('title', { defaultValue: 'Customs & duties' })}
            </h2>

            {/* 1. What the label declared */}
            {declaration ? (
                <Card icon={<FileCheck2 className="h-4 w-4" />} title={t('declared', { defaultValue: 'Declared on the label' })}>
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-zinc-500">{t('incoterm', { defaultValue: 'Terms of sale' })}</span>
                        {declaration.incoterm ? (
                            <span className={`inline-flex border px-2 py-0.5 text-xs font-bold uppercase tracking-[0.08em] ${declaration.incoterm === 'DDP' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}>
                                {declaration.incoterm}
                            </span>
                        ) : (
                            <span className="font-semibold text-[#17110d]">{t('notSent', { defaultValue: 'Not sent' })}</span>
                        )}
                    </div>
                    {declaration.incoterm && incotermHint[declaration.incoterm] ? (
                        <p className="text-xs leading-5 text-zinc-500">{incotermHint[declaration.incoterm]}</p>
                    ) : null}
                    <Row label={t('dutiesPaidBy', { defaultValue: 'Duties & taxes billed to' })} value={paidByLabel[declaration.dutiesPaidBy] ?? declaration.dutiesPaidBy} />
                    {declaration.dutiesAccountNumber ? (
                        <Row label={t('dutiesAccount', { defaultValue: 'Duties account' })} value={<span className="font-mono">{declaration.dutiesAccountNumber}</span>} />
                    ) : null}
                    <Row
                        label={t('service', { defaultValue: 'Service' })}
                        value={`${carrierName} · ${declaration.serviceType || declaration.serviceCode || '—'}`}
                    />
                    {declaration.packagingType ? <Row label={t('packaging', { defaultValue: 'Packaging' })} value={declaration.packagingType} /> : null}
                    {declaration.dimensions ? (
                        <Row
                            label={t('box', { defaultValue: 'Box' })}
                            value={`${declaration.dimensions.lengthCm} × ${declaration.dimensions.widthCm} × ${declaration.dimensions.heightCm} cm`}
                        />
                    ) : null}
                    <div className="border-t border-[#efe1d5] pt-2">
                        <Row strong label={t('declaredValue', { defaultValue: 'Declared customs value' })} value={formatMoney(declaration.declaredValue, declaration.declarationCurrency, locale)} />
                    </div>
                    <ul className="space-y-2 pt-1">
                        {declaration.items.map((line, index) => (
                            <li key={`${line.sku ?? line.title}-${index}`} className="border border-[#efe1d5] bg-white p-3 text-xs">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="font-semibold text-[#17110d]">{line.title}</p>
                                    <p className="shrink-0 font-semibold text-[#17110d]">{formatMoney(line.customsValue, declaration.declarationCurrency, locale)}</p>
                                </div>
                                <p className="mt-1 text-zinc-500">
                                    {line.sku ? <span className="font-mono">{line.sku} · </span> : null}
                                    {t('qty', { defaultValue: 'Qty {{count}}', count: line.quantity })}
                                    {' · '}
                                    {t('origin', { defaultValue: 'Origin' })} {line.countryOfManufacture}
                                </p>
                                <p className="mt-0.5 text-zinc-500">
                                    HS <span className="font-mono">{line.hsCode}</span>
                                    {line.importHsCode ? <> · {t('importHs', { defaultValue: 'Import HS' })} <span className="font-mono">{line.importHsCode}</span></> : null}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>
            ) : (
                <p className="text-xs leading-5 text-zinc-500">
                    {t('noDeclaration', { defaultValue: 'Customs details were not saved for this label — it was created before they were recorded. The customs invoice has the declared values.' })}
                </p>
            )}

            {/* 2. Carrier estimate */}
            <Card
                icon={<Calculator className="h-4 w-4" />}
                title={t('estimate', { defaultValue: 'Estimated duties & taxes' })}
                tone={estimate ? (estimate.available && estimate.dutiesTaxesAndFees > 0 ? 'info' : 'warn') : 'plain'}
            >
                {estimate ? <EstimateBody estimate={estimate} carrierName={carrierName} locale={locale} /> : (
                    <p className="text-xs leading-5 text-zinc-500">
                        {t('noEstimate', { defaultValue: 'No estimate yet. Ask {{carrier}} for one — it uses the declared values above, or the default customs values for older labels.', carrier: carrierName })}
                    </p>
                )}
                <button
                    type="button"
                    onClick={() => void handleEstimate()}
                    disabled={isEstimating}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 border border-[#8f2a60] px-4 py-2 text-xs font-semibold text-[#8f2a60] transition hover:bg-[#8f2a60] hover:text-white disabled:opacity-60"
                >
                    <RefreshCw className={`h-3.5 w-3.5 ${isEstimating ? 'animate-spin' : ''}`} />
                    {isEstimating
                        ? t('estimating', { defaultValue: 'Asking {{carrier}}…', carrier: carrierName })
                        : estimate
                            ? t('refreshEstimate', { defaultValue: 'Refresh estimate' })
                            : t('getEstimate', { defaultValue: 'Estimate duties' })}
                </button>
            </Card>

            {/* 3. What was actually charged */}
            <Card icon={<FileCheck2 className="h-4 w-4" />} title={t('actual', { defaultValue: 'Actual duties & taxes' })}>
                {isEditingActual ? (
                    <div className="space-y-2">
                        <div className="grid grid-cols-[1fr_88px] gap-2">
                            <input
                                inputMode="decimal"
                                value={actualForm.amount}
                                onChange={(e) => setActualForm((f) => ({ ...f, amount: e.target.value }))}
                                placeholder={t('amount', { defaultValue: 'Amount' })}
                                className="w-full border border-[#e7d3c2] bg-white px-3 py-2 outline-none focus:border-[#17110d]"
                            />
                            <input
                                value={actualForm.currency}
                                maxLength={3}
                                onChange={(e) => setActualForm((f) => ({ ...f, currency: e.target.value.toUpperCase() }))}
                                placeholder="EUR"
                                className="w-full border border-[#e7d3c2] bg-white px-3 py-2 uppercase outline-none focus:border-[#17110d]"
                            />
                        </div>
                        <input
                            value={actualForm.invoiceNumber}
                            onChange={(e) => setActualForm((f) => ({ ...f, invoiceNumber: e.target.value }))}
                            placeholder={t('invoiceNumber', { defaultValue: '{{carrier}} invoice number (optional)', carrier: carrierName })}
                            className="w-full border border-[#e7d3c2] bg-white px-3 py-2 outline-none focus:border-[#17110d]"
                        />
                        <textarea
                            value={actualForm.note}
                            onChange={(e) => setActualForm((f) => ({ ...f, note: e.target.value }))}
                            placeholder={t('note', { defaultValue: 'Note (optional)' })}
                            className="min-h-[60px] w-full border border-[#e7d3c2] bg-white px-3 py-2 outline-none focus:border-[#17110d]"
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => void handleSaveActual()}
                                disabled={isSavingActual}
                                className="flex-1 bg-[#8f2a60] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#74224f] disabled:opacity-60"
                            >
                                {isSavingActual ? t('saving', { defaultValue: 'Saving…' }) : t('save', { defaultValue: 'Save' })}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditingActual(false)}
                                disabled={isSavingActual}
                                className="flex-1 border border-[#e7d3c2] px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-60"
                            >
                                {t('cancel', { defaultValue: 'Cancel' })}
                            </button>
                        </div>
                    </div>
                ) : actual ? (
                    <>
                        <ActualBody actual={actual} estimate={estimate} locale={locale} />
                        <div className="flex gap-2 pt-1">
                            <button type="button" onClick={openActualForm} className="flex-1 border border-[#8f2a60] px-4 py-2 text-xs font-semibold text-[#8f2a60] transition hover:bg-[#8f2a60] hover:text-white">
                                {t('edit', { defaultValue: 'Edit' })}
                            </button>
                            <button
                                type="button"
                                onClick={() => void handleClearActual()}
                                disabled={isSavingActual}
                                className="flex-1 border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
                            >
                                {t('remove', { defaultValue: 'Remove' })}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-xs leading-5 text-zinc-500">
                            {t('noActual', { defaultValue: 'Once {{carrier}} invoices the duties & taxes, enter the amount here to compare it with the estimate.', carrier: carrierName })}
                        </p>
                        <button type="button" onClick={openActualForm} className="inline-flex w-full items-center justify-center border border-[#8f2a60] px-4 py-2 text-xs font-semibold text-[#8f2a60] transition hover:bg-[#8f2a60] hover:text-white">
                            {t('addActual', { defaultValue: 'Add amount from invoice' })}
                        </button>
                    </>
                )}
            </Card>
        </section>
    )
}

function EstimateBody({ estimate, carrierName, locale }: { estimate: DutiesEstimate; carrierName: string; locale: string }) {
    const { t } = useTranslation('common', { keyPrefix: 'admin.orderDetail.customs' })
    const hasFigure = estimate.dutiesTaxesAndFees > 0
    return (
        <>
            <p className="text-xs leading-5 text-zinc-500">
                {estimate.basis === 'LABEL'
                    ? t('basisLabel', { defaultValue: '{{carrier}} estimate taken when the label was created.', carrier: carrierName })
                    : t('basisRecalculated', { defaultValue: '{{carrier}} estimate recalculated on {{date}} with that day’s rates.', carrier: carrierName, date: formatDateTime(estimate.requestedAt, locale) })}
                {' '}
                {t('notFinal', { defaultValue: 'The final amount is on the {{carrier}} invoice.', carrier: carrierName })}
            </p>
            {estimate.lines.map((line, index) => (
                <div key={`${line.name}-${index}`}>
                    <Row label={line.name} value={formatMoney(line.amount, estimate.currency, locale)} />
                    {line.detail ? <p className="text-[11px] text-zinc-400">{line.detail}</p> : null}
                </div>
            ))}
            {hasFigure ? (
                <div className="border-t border-sky-200 pt-2">
                    <Row strong label={t('estimatedTotal', { defaultValue: 'Estimated total' })} value={formatMoney(estimate.dutiesTaxesAndFees, estimate.currency, locale)} />
                </div>
            ) : null}
            {estimate.message ? <p className="text-xs leading-5 text-amber-700">{estimate.message}</p> : null}
        </>
    )
}

function ActualBody({ actual, estimate, locale }: { actual: ActualDutiesAndTaxes; estimate: DutiesEstimate | null; locale: string }) {
    const { t } = useTranslation('common', { keyPrefix: 'admin.orderDetail.customs' })
    // Only compare like with like — a FedEx USD estimate against a EUR invoice
    // would need an exchange rate we do not have for the invoice date.
    const comparable = estimate && estimate.dutiesTaxesAndFees > 0 && estimate.currency === actual.currency
    const difference = comparable ? actual.amount - estimate.dutiesTaxesAndFees : null
    return (
        <>
            <Row strong label={t('charged', { defaultValue: 'Charged' })} value={formatMoney(actual.amount, actual.currency, locale)} />
            {actual.invoiceNumber ? <Row label={t('invoice', { defaultValue: 'Invoice' })} value={<span className="font-mono">{actual.invoiceNumber}</span>} /> : null}
            {difference !== null ? (
                <Row
                    label={t('vsEstimate', { defaultValue: 'vs estimate' })}
                    value={
                        <span className={difference > 0 ? 'text-rose-700' : 'text-emerald-700'}>
                            {difference > 0 ? '+' : ''}{formatMoney(difference, actual.currency, locale)}
                        </span>
                    }
                />
            ) : null}
            {actual.note ? <p className="text-xs leading-5 text-zinc-500">{actual.note}</p> : null}
            <p className="text-[11px] text-zinc-400">{t('recordedAt', { defaultValue: 'Recorded {{date}}', date: formatDateTime(actual.recordedAt, locale) })}</p>
        </>
    )
}
