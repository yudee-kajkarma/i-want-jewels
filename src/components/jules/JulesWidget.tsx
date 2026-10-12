'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { parseLocalePathname } from '../../i18n/routing'
import type { JulesLocale } from './contract'
import { PHONE_QUERY } from './hooks'
import { JulesLauncher } from './JulesLauncher'
import { JulesPanel } from './JulesPanel'
import { JulesTeaser } from './JulesTeaser'
import type { JulesView } from './julesView'
import { useJulesChat } from './useJulesChat'
import { useJulesTexts } from './useJulesTexts'

const LOCALES: readonly JulesLocale[] = ['en', 'de', 'nl', 'fr', 'it', 'es']
const toLocale = (language: string): JulesLocale => LOCALES.find((locale) => locale === language) ?? 'en'

/**
 * Pages without Jules: the admin, and the checkout, where the button would sit
 * on the order total and the "Place order" button ("Buy now" closes the chat
 * on its way there).
 */
const WITHOUT_JULES = /^\/(admin|checkout)(\/|$)/

/**
 * Jules on every page except the admin and the checkout: the "Ask Jules"
 * button, the once-per-visit hello, and the panel (Home, Chats, Explore and
 * the conversation), a sheet from the bottom on phones. Escape closes the
 * panel and focus returns to the button.
 */
export default function JulesWidget() {
  const { i18n } = useTranslation()
  const pathname = usePathname() ?? ''
  const { isAuthenticated, session } = useAuth()
  const textsReady = useJulesTexts()
  const hidden = WITHOUT_JULES.test(parseLocalePathname(pathname || '/').pathnameWithoutLocale)

  const [open, setOpen] = useState(false)
  /** The panel is drawn from its first opening on, then only hidden while closed. */
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<JulesView>({ tab: 'home', thread: false })
  const launcherRef = useRef<HTMLButtonElement>(null)
  /** Set when the panel closes, so focus goes back to the button. */
  const returnFocus = useRef(false)

  const closePanel = useCallback(() => {
    returnFocus.current = true
    setOpen(false)
  }, [])

  // "Buy now" closes the panel on its way to the checkout.
  const chat = useJulesChat({ open: open && !hidden, locale: toLocale(i18n.language), onClose: closePanel })
  const firstName = (isAuthenticated && session?.firstName?.trim()) || undefined

  // Arriving on a page without Jules (the bag's Checkout link, say) closes the panel, so it
  // doesn't pop open again on the next page. Adjusted while rendering, as React suggests.
  const [wasHidden, setWasHidden] = useState(hidden)
  if (hidden !== wasHidden) {
    setWasHidden(hidden)
    if (hidden) setOpen(false)
  }

  const openPanel = useCallback(() => {
    if (mounted) {
      setOpen(true)
      return
    }
    // Draw the panel hidden first, so it can grow in from the button on the next frames.
    setMounted(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
  }, [mounted])

  // Escape closes (unless something inside used it first, e.g. clearing the search).
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) closePanel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closePanel])

  useEffect(() => {
    if (open || !returnFocus.current) return
    returnFocus.current = false
    launcherRef.current?.focus({ preventScroll: true })
  }, [open])

  // On phones the sheet covers the page: keep the page behind it from scrolling.
  useEffect(() => {
    if (!open || hidden || !window.matchMedia(PHONE_QUERY).matches) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [open, hidden])

  // Not on the admin or checkout pages; elsewhere only once every text can be shown (never a key).
  if (hidden || !textsReady) return null

  return (
    <>
      {mounted ? <JulesPanel open={open} chat={chat} view={view} onView={setView} onClose={closePanel} firstName={firstName} /> : null}
      {!open ? <JulesTeaser onOpen={openPanel} onDismiss={() => launcherRef.current?.focus({ preventScroll: true })} /> : null}
      <JulesLauncher open={open} onToggle={open ? closePanel : openPanel} buttonRef={launcherRef} />
    </>
  )
}
