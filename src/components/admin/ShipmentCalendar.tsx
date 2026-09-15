'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import styles from './ShipmentWorkspace.module.css'

export function localDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function moveMonth(date: Date, offset: number) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + offset + 1, 0).getDate()
  return new Date(date.getFullYear(), date.getMonth() + offset, Math.min(date.getDate(), lastDay))
}

/** Always-visible calendar. Selection remains an ISO date in the carrier payload. */
export default function ShipmentCalendar({
  id,
  label,
  value,
  min,
  onChange,
  disabled = false,
}: {
  id: string
  label: string
  value: string
  min: string
  onChange: (value: string) => void
  disabled?: boolean
}) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.components.shipmentWorkspace' })
  const [displayDate, setDisplayDate] = useState(value || min)
  const root = useRef<HTMLDivElement>(null)
  const locale = i18n.resolvedLanguage || i18n.language || 'en'
  const date = parseDate(displayDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const offset = (firstDay.getDay() + 6) % 7
  const dayCount = new Date(year, month + 1, 0).getDate()
  const cellCount = Math.ceil((offset + dayCount) / 7) * 7
  const fullDate = (day: Date) => day.toLocaleDateString(locale, { dateStyle: 'full' })
  const today = localDateValue(new Date())
  const focusDate = (next: Date) => {
    const nextValue = localDateValue(next) < min ? min : localDateValue(next)
    setDisplayDate(nextValue)
    requestAnimationFrame(() =>
      root.current?.querySelector<HTMLButtonElement>(`[data-date="${nextValue}"]`)?.focus(),
    )
  }
  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, day: Date) {
    let next: Date
    switch (event.key) {
      case 'ArrowLeft':
        next = new Date(year, month, day.getDate() - 1)
        break
      case 'ArrowRight':
        next = new Date(year, month, day.getDate() + 1)
        break
      case 'ArrowUp':
        next = new Date(year, month, day.getDate() - 7)
        break
      case 'ArrowDown':
        next = new Date(year, month, day.getDate() + 7)
        break
      case 'Home':
        next = new Date(year, month, day.getDate() - ((day.getDay() + 6) % 7))
        break
      case 'End':
        next = new Date(year, month, day.getDate() + 6 - ((day.getDay() + 6) % 7))
        break
      case 'PageUp':
        next = moveMonth(day, -1)
        break
      case 'PageDown':
        next = moveMonth(day, 1)
        break
      default:
        return
    }
    event.preventDefault()
    focusDate(next)
  }
  return (
    <div id={id} ref={root} className={styles.calendar} role="group" aria-label={label}>
      <div className={styles.calendarHeader}>
        <button
          type="button"
          aria-label={t('previousMonth')}
          disabled={disabled || localDateValue(firstDay) <= min}
          onClick={() =>
            setDisplayDate(
              localDateValue(moveMonth(date, -1)) < min ? min : localDateValue(moveMonth(date, -1)),
            )
          }
        >
          <ChevronLeft size={17} />
        </button>
        <strong aria-live="polite">
          {firstDay.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </strong>
        <button
          type="button"
          aria-label={t('nextMonth')}
          disabled={disabled}
          onClick={() => setDisplayDate(localDateValue(moveMonth(date, 1)))}
        >
          <ChevronRight size={17} />
        </button>
      </div>
      <table aria-label={label}>
        <thead>
          <tr>
            {Array.from({ length: 7 }, (_, index) => {
              const weekday = new Date(2024, 0, 1 + index)
              return (
                <th key={index} scope="col" abbr={weekday.toLocaleDateString(locale, { weekday: 'long' })}>
                  {weekday.toLocaleDateString(locale, { weekday: 'short' })}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: cellCount / 7 }, (_, week) => (
            <tr key={week}>
              {Array.from({ length: 7 }, (_, weekday) => {
                const dayNumber = week * 7 + weekday - offset + 1
                if (dayNumber < 1 || dayNumber > dayCount) return <td key={weekday} />
                const day = new Date(year, month, dayNumber)
                const dayValue = localDateValue(day)
                return (
                  <td key={weekday}>
                    <button
                      type="button"
                      data-date={dayValue}
                      aria-label={fullDate(day)}
                      aria-pressed={value === dayValue}
                      aria-current={dayValue === today ? 'date' : undefined}
                      tabIndex={dayValue === displayDate ? 0 : -1}
                      disabled={disabled || dayValue < min}
                      onKeyDown={(event) => onDayKeyDown(event, day)}
                      onClick={() => {
                        setDisplayDate(dayValue)
                        onChange(dayValue)
                      }}
                    >
                      {dayNumber}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.calendarSelection} aria-live="polite">
        {t('selectedDate', { date: fullDate(parseDate(value || min)) })}
      </p>
    </div>
  )
}
