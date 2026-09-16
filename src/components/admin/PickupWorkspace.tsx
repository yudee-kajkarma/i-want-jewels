'use client'

import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, Check, ChevronDown, Clock3, FileDown, MapPin, Package, Search, Truck, User, X } from 'lucide-react'
import type { Order, OrdersPagination, Pickup, PickupDetail, PickupOrderSummary, PickupStatus, ShippingCarrier } from '../../types/order'
import { formatPrice, isoToCurrencyCode } from '../../utils/price'
import { normalizeDialCode } from '../../utils/location'
import { useVariantLabel } from '../../hooks/useVariantLabel'
import { CarrierLogo } from './ShipmentWorkspace'
import styles from './PickupWorkspace.module.css'

function ProductImage({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false)
  return <div className={styles.productImage}>{src && !failed ? <img src={src} alt={title} onError={() => setFailed(true)} /> : <Package size={22} aria-hidden="true" />}</div>
}

function PickupOrderCard({ order, selected, onToggle, onDownload, downloading = false, disabled = false }: {
  order: Order | PickupOrderSummary
  selected?: boolean
  onToggle?: () => void
  onDownload?: () => void
  downloading?: boolean
  disabled?: boolean
}) {
  const { t } = useTranslation('common', { keyPrefix: 'admin.components.pickupWorkspace' })
  const { t: common } = useTranslation('common', { keyPrefix: 'admin.common' })
  const variantLabel = useVariantLabel()
  const currency = isoToCurrencyCode(order.currency) ?? 'eur'
  const customer = 'customer' in order ? order.customer : undefined
  const name = [customer?.firstName, customer?.lastName].filter(Boolean).join(' ') || customer?.username || customer?.email
  const phone = 'recipientPhone' in order && order.recipientPhone ? [normalizeDialCode(order.recipientCountryCode), order.recipientPhone].filter(Boolean).join(' ') : customer?.phoneNumber
  const address = order.shippingAddress
  const destination = [address?.city, address?.state, address?.postalCode, address?.country].filter(Boolean).join(', ')
  return <article className={`${styles.orderCard} ${selected ? styles.selectedOrder : ''}`} aria-label={order.orderNumber}>
    <div className={styles.orderHeading}>
      {onToggle ? <label className={styles.orderSelect}>
        <input type="checkbox" checked={selected} onChange={onToggle} disabled={disabled} aria-label={t('selectOrder', { order: order.orderNumber })} />
        <strong>{order.orderNumber}</strong>
      </label> : <strong>{order.orderNumber}</strong>}
      <div className={styles.orderAmount}><strong>{formatPrice(order.totalAmount, currency)}</strong><span>{t('orderTotal')}</span></div>
    </div>
    <div className={styles.orderCustomer}>
      {name && <span><User size={14} />{name}</span>}
      {destination && <span><MapPin size={14} />{destination}</span>}
    </div>
    <ul className={styles.products}>
      {order.items.map((item, index) => <li key={`${item.sku}-${index}`}>
        <ProductImage src={'thumbnail' in item ? item.thumbnail : undefined} title={item.title} />
        <div className={styles.productText}><strong>{item.title || common('item')}</strong>
          {'variantName' in item && item.variantName && <span>{variantLabel(item.variantName)}{'size' in item && item.size ? ` · ${item.size} ${item.sizeMeasurement || ''}` : ''}</span>}
          {item.sku && <small>SKU · {item.sku}</small>}
        </div>
        <div className={styles.productQuantity}><strong>× {item.quantity}</strong><span>{formatPrice(item.price, currency)} {t('each')}</span></div>
      </li>)}
    </ul>
    <div className={styles.orderFooter}>
      <div>{address?.street && <p>{address.street}</p>}{phone && <p>{phone}</p>}
        {order.trackingNumber && <p>{t('tracking')}: {order.trackingUrl && /^https?:\/\//i.test(order.trackingUrl) ? <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">{order.trackingNumber}</a> : order.trackingNumber}</p>}
      </div>
      {onDownload && <button type="button" className={styles.textButton} onClick={onDownload} disabled={downloading || disabled}><FileDown size={14} />{t(downloading ? 'downloading' : 'downloadLabel')}</button>}
    </div>
  </article>
}

type ScheduleProps = {
  carrier: ShippingCarrier
  onCarrier: (carrier: ShippingCarrier) => void
  orders: Order[]
  loading: boolean
  error: string
  onRetry: () => void
  search: string
  onSearchChange: (value: string) => void
  onSearch: () => void
  onClear: () => void
  appliedSearch: string
  selectedIds: string[]
  onToggle: (id: string) => void
  onToggleAll: () => void
  onDownload: (order: Order) => void
  downloadingId: string
  hasMore: boolean
  onMore: () => void
}
type HistoryProps = {
  pickups: Pickup[]
  loading: boolean
  error: string
  status: PickupStatus
  onStatus: (status: PickupStatus) => void
  pagination: OrdersPagination | null
  onPage: (page: number) => void
  expandedId: string
  onExpand: (id: string) => void
  detail: PickupDetail | null
  detailLoading: boolean
  detailError: string
  onRetryDetail: (id: string) => void
  onCancel: (id: string) => void
  onMark: (id: string) => void
  cancellingId: string
  markingId: string
}
export default function PickupWorkspace({ view, onView, schedule, history, busy, children }: {
  view: 'schedule' | 'list'
  onView: (view: 'schedule' | 'list') => void
  schedule: ScheduleProps
  history: HistoryProps
  busy: boolean
  children: ReactNode
}) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.components.pickupWorkspace' })
  const selectedOrders = schedule.orders.filter(order => schedule.selectedIds.includes(order.id))
  const statuses = ['SCHEDULED', 'PICKED_UP', 'CANCELLED'] as const
  const dateLabel = (value: string) => {
    const date = new Date(`${value.split('T')[0]}T12:00:00`)
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(i18n.resolvedLanguage, { day: 'numeric', month: 'short', year: 'numeric' })
  }
  return <section className={styles.workspace} aria-label={t('title')}>
    <header className={styles.header}><div><span className={styles.eyebrow}>{t('eyebrow')}</span><h2>{t('title')}</h2><p>{t('intro')}</p></div><Truck size={32} aria-hidden="true" /></header>
    <div className={styles.tabs} aria-label={t('title')}>
      {(['schedule', 'list'] as const).map(tab => <button key={tab} type="button" aria-pressed={view === tab} onClick={() => onView(tab)} disabled={busy}>{t(tab === 'schedule' ? 'scheduleTab' : 'historyTab')}</button>)}
    </div>
    {view === 'schedule' ? <div className={styles.scheduleLayout}>
      <div className={styles.selection}>
        <div className={styles.sectionHeading}><div><h3>{t('chooseOrders')}</h3><p>{t('chooseHint')}</p></div><Package size={23} aria-hidden="true" /></div>
        <div className={styles.carriers} aria-label={t('carrier')}>
          {(['DHL','FEDEX'] as const).map(carrier => <button key={carrier} type="button" aria-pressed={schedule.carrier === carrier} onClick={() => schedule.onCarrier(carrier)} disabled={busy}><CarrierLogo carrier={carrier} /><span>{carrier === 'FEDEX' ? 'FedEx' : 'DHL'}</span>{schedule.carrier === carrier && <Check size={17} />}</button>)}
        </div>
        <form className={styles.search} onSubmit={event => {event.preventDefault();schedule.onSearch()}}><div><Search size={17} /><input aria-label={t('search')} placeholder={t('search')} value={schedule.search} onChange={event=>schedule.onSearchChange(event.target.value)} disabled={busy}/></div><button type="submit" className={styles.secondary} disabled={busy || schedule.loading}>{t('searchAction')}</button>{schedule.appliedSearch && <button type="button" className={styles.textButton} onClick={schedule.onClear} disabled={busy}>{t('clear')}</button>}</form>
        <div className={styles.selectionBar}><span>{t('shownOrders', { count: schedule.orders.length })}</span>{schedule.orders.length>0 && <button type="button" className={styles.textButton} onClick={schedule.onToggleAll} disabled={busy || schedule.loading}>{t(schedule.selectedIds.length === schedule.orders.length ? 'clearSelection' : 'selectShown')}</button>}</div>
        {schedule.error ? <div className={styles.error} role="alert">{schedule.error}<button type="button" className={styles.textButton} onClick={schedule.onRetry}>{t('retry')}</button></div> : null}
        {schedule.loading && !schedule.orders.length ? <div className={styles.empty} role="status"><Truck size={28}/>{t('loadingOrders')}</div> : !schedule.orders.length && !schedule.error ? <div className={styles.empty}><Package size={28}/><strong>{t('emptyOrders')}</strong><p>{t('emptyHint')}</p></div> : null}
        <div className={styles.orderList}>{schedule.orders.map(order=><PickupOrderCard key={order.id} order={order} selected={schedule.selectedIds.includes(order.id)} onToggle={()=>schedule.onToggle(order.id)} onDownload={()=>schedule.onDownload(order)} downloading={schedule.downloadingId===order.id} disabled={busy || schedule.loading}/>)}</div>
        {schedule.hasMore && <button type="button" className={styles.secondary} onClick={schedule.onMore} disabled={busy || schedule.loading}>{t(schedule.loading ? 'loadingOrders' : 'loadMore')}</button>}
      </div>
      <aside className={styles.booking} aria-label={t('collectionDetails')}>
        <div className={styles.bookingHeading}><CarrierLogo carrier={schedule.carrier}/><h3>{t('collectionDetails')}</h3></div>
        <div className={styles.selectionSummary} aria-live="polite"><strong>{t('selectedOrders', { count: selectedOrders.length })}</strong><span>{t('selectedItems', { count: selectedOrders.reduce((sum,order)=>sum+order.totalItems,0) })}</span></div>
        {selectedOrders.length ? <ul className={styles.selectedList}>{selectedOrders.map(order=><li key={order.id}><strong>{order.orderNumber}</strong><span>{order.items.map(item=>`${item.title} × ${item.quantity}`).join(', ')}</span></li>)}</ul> : <p className={styles.hint}>{t('selectHint')}</p>}
        <fieldset disabled={busy || schedule.loading || !selectedOrders.length} className={styles.bookingForm}>{children}</fieldset>
      </aside>
    </div> : <div className={styles.history}>
      <div className={styles.sectionHeading}><div><h3>{t('historyTab')}</h3><p>{t('historyHint')}</p></div><CalendarDays size={23}/></div>
      <div className={styles.filters}>{statuses.map(status=><button key={status} type="button" aria-pressed={history.status===status} onClick={()=>history.onStatus(status)} disabled={Boolean(history.cancellingId || history.markingId)}>{t(`status.${status}`)}</button>)}</div>
      {history.loading ? <div className={styles.empty} role="status">{t('loadingHistory')}</div> : history.error ? <div className={styles.error} role="alert">{history.error}<button type="button" className={styles.textButton} onClick={()=>history.onPage(history.pagination?.currentPage || 1)}>{t('retry')}</button></div> : !history.pickups.length ? <div className={styles.empty}><CalendarDays size={28}/><strong>{t('emptyHistory', { status: t(`status.${history.status}`).toLowerCase() })}</strong></div> : <div className={styles.historyList}>
        {history.pickups.map(pickup=>{
          const expanded=history.expandedId===pickup.id
          const working=history.cancellingId===pickup.id || history.markingId===pickup.id
          const detail=expanded && history.detail?.pickup.id===pickup.id ? history.detail : null
          return <article className={styles.historyCard} key={pickup.id} aria-label={pickup.confirmationNumber}>
            <div className={styles.historyHeader}><CarrierLogo carrier={pickup.carrier}/><div className={styles.confirmation}><span>{t('confirmation')}</span><strong>{pickup.confirmationNumber || '—'}</strong></div><span className={styles.status} data-status={pickup.status}>{t(`status.${pickup.status}`)}</span></div>
            <div className={styles.historyFacts}><div><CalendarDays size={17}/><span>{t('pickupDate')}<strong>{dateLabel(pickup.plannedPickupDateAndTime)}</strong></span></div><div><Clock3 size={17}/><span>{t('timeWindow')}<strong>{pickup.plannedPickupDateAndTime.split('T')[1]?.slice(0,5) || '—'} – {pickup.closeTime.slice(0,5) || '—'}</strong></span></div><div><Package size={17}/><span>{t('parcels')}<strong>{pickup.packageCount} · {pickup.totalWeightKg} kg</strong></span></div><div><MapPin size={17}/><span>{t('collectionPoint')}<strong>{pickup.location} · {t(`location.${pickup.locationType}`)}</strong></span></div></div>
            {pickup.remark && <p className={styles.remark}>{pickup.remark}</p>}
            <div className={styles.historyActions}><button type="button" className={styles.textButton} aria-expanded={expanded} aria-controls={`pickup-${pickup.id}`} onClick={()=>history.onExpand(pickup.id)}>{t('viewOrders', { count: pickup.orderIds.length })}<ChevronDown size={16} className={expanded?styles.rotated:''}/></button>{pickup.status==='SCHEDULED' && <div><button type="button" className={styles.secondary} onClick={()=>history.onMark(pickup.id)} disabled={working}><Check size={15}/>{t(history.markingId===pickup.id ? 'saving' : 'markCollected')}</button><button type="button" className={styles.cancel} onClick={()=>history.onCancel(pickup.id)} disabled={working}><X size={15}/>{t(history.cancellingId===pickup.id ? 'saving' : 'cancelPickup')}</button></div>}</div>
            {expanded && <div id={`pickup-${pickup.id}`} className={styles.historyOrders}>{history.detailLoading ? <p role="status">{t('loadingOrders')}</p> : history.detailError ? <div className={styles.error} role="alert">{history.detailError}<button type="button" className={styles.textButton} onClick={()=>history.onRetryDetail(pickup.id)}>{t('retry')}</button></div> : detail ? <><h4>{t('includedOrders', {count:detail.orderCount})}</h4>{detail.orders.map(order=><PickupOrderCard key={order.id} order={order}/>)}{!detail.orders.length && <p>{t('noOrderDetails')}</p>}{detail.missingOrderIds.length>0 && <p className={styles.hint}>{t('missingOrders',{count:detail.missingOrderIds.length})}</p>}</> : null}</div>}
          </article>
        })}
      </div>}
      {history.pagination && history.pagination.totalPages>1 && <div className={styles.pagination}><button type="button" className={styles.secondary} disabled={history.loading || !history.pagination.hasPrevPage} onClick={()=>history.onPage(history.pagination!.currentPage-1)}>{t('previous')}</button><span>{t('page', {current:history.pagination.currentPage,total:history.pagination.totalPages})}</span><button type="button" className={styles.secondary} disabled={history.loading || !history.pagination.hasNextPage} onClick={()=>history.onPage(history.pagination!.currentPage+1)}>{t('next')}</button></div>}
    </div>}
  </section>
}
