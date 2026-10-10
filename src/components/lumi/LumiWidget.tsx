'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { parseLocalePathname } from '../../i18n/routing'
import type { LumiLocale } from './contract'
import { PHONE_QUERY } from './hooks'
import { LumiLauncher } from './LumiLauncher'
import { LumiPanel } from './LumiPanel'
import { LumiTeaser } from './LumiTeaser'
import type { LumiView } from './lumiView'
import { useLumiChat } from './useLumiChat'
import { useLumiTexts } from './useLumiTexts'

const LOCALES: readonly LumiLocale[] = ['en', 'de', 'nl', 'fr', 'it', 'es']
const toLocale = (language: string): LumiLocale => LOCALES.find((locale) => locale === language) ?? 'en'

/**
 * Pages without Lumi: the admin, and the checkout, where the button would sit
 * on the order total and the "Place order" button ("Buy now" closes the chat
 * on its way there).
 */
const WITHOUT_LUMI = /^\/(admin|checkout)(\/|$)/

/**
 * Lumi on every page except the admin and the checkout: the "Ask Lumi"
 * button, the once-per-visit hello, and the panel (Home, Chats, Explore and
 * the conversation), a sheet from the bottom on phones. Escape closes the
 * panel and focus returns to the button.
 */
export default function LumiWidget() {
  const { i18n } = useTranslation()
  const pathname = usePathname() ?? ''
  const { isAuthenticated, session } = useAuth()
  const textsReady = useLumiTexts()
  const hidden = WITHOUT_LUMI.test(parseLocalePathname(pathname || '/').pathnameWithoutLocale)

  const [open, setOpen] = useState(false)
  /** The panel is drawn from its first opening on, then only hidden while closed. */
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<LumiView>({ tab: 'home', thread: false })
  const launcherRef = useRef<HTMLButtonElement>(null)
  /** Set when the panel closes, so focus goes back to the button. */
  const returnFocus = useRef(false)

  const closePanel = useCallback(() => {
    returnFocus.current = true
    setOpen(false)
  }, [])

  // "Buy now" closes the panel on its way to the checkout.
  const chat = useLumiChat({ open: open && !hidden, locale: toLocale(i18n.language), onClose: closePanel })
  const firstName = (isAuthenticated && session?.firstName?.trim()) || undefined

  // Arriving on a page without Lumi (the bag's Checkout link, say) closes the panel, so it
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
      {mounted ? <LumiPanel open={open} chat={chat} view={view} onView={setView} onClose={closePanel} firstName={firstName} /> : null}
      {!open ? <LumiTeaser onOpen={openPanel} onDismiss={() => launcherRef.current?.focus({ preventScroll: true })} /> : null}
      <LumiLauncher open={open} onToggle={open ? closePanel : openPanel} buttonRef={launcherRef} />
    </>
  )
}
