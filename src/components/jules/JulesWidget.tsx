'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { parseLocalePathname } from '../../i18n/routing'
import { chatEnabled } from '../../services/chatService'
import type { JulesLocale } from './contract'
import { PHONE_QUERY } from './hooks'
import { JulesLauncher } from './JulesLauncher'
import { JulesPanel } from './JulesPanel'
import { JulesTeaser } from './JulesTeaser'
import { faceOf, flyClose, flyOpen } from './motion'
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
 * the conversation), a sheet from the bottom on phones. The pill glides into
 * the panel's send button and the panel opens out of it; closing folds it back
 * (motion.ts). Escape closes the panel and focus returns to the button. Nothing shows while Jules is switched
 * off in Admin → Chatbot (nor while that is being checked, so nothing flashes).
 */
export default function JulesWidget() {
  const { i18n } = useTranslation()
  const pathname = usePathname() ?? ''
  const { isAuthenticated, session } = useAuth()
  const textsReady = useJulesTexts()
  const hidden = WITHOUT_JULES.test(parseLocalePathname(pathname || '/').pathnameWithoutLocale)
  const [switchedOn, setSwitchedOn] = useState(false)
  useEffect(() => {
    let active = true
    void chatEnabled().then((on) => active && setSwitchedOn(on))
    return () => {
      active = false
    }
  }, [])

  const [open, setOpen] = useState(false)
  /** The panel is drawn from its first opening on, then only hidden while closed. */
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<JulesView>({ tab: 'home', thread: false })
  const launcherRef = useRef<HTMLButtonElement>(null)
  /** The launcher's visible part (the pill, or the round close button). */
  const faceRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  /** The launcher waits, invisible, while its copy flies to or from the panel. */
  const [away, setAway] = useState(false)
  /** One opening or closing at a time; `open` as of now, for the motion's callbacks. */
  const moving = useRef(false)
  const openNow = useRef(open)
  useEffect(() => {
    openNow.current = open
  }, [open])
  /** Set when the panel closes at once, so focus goes back to the button. */
  const returnFocus = useRef(false)

  /** Closes at once: the sheet was pulled away, "Buy now" left for the checkout. */
  const closeNow = useCallback(() => {
    returnFocus.current = true
    setOpen(false)
  }, [])

  /** Folds the panel back into its send button, which glides home into the pill. */
  const closePanel = useCallback(async () => {
    if (moving.current || !openNow.current) return
    const panel = panelRef.current
    if (!panel) return closeNow()
    moving.current = true
    try {
      await flyClose({
        panel,
        hide: () =>
          flushSync(() => {
            setOpen(false)
            setAway(true)
          }),
        home: () => faceRef.current,
      })
    } finally {
      flushSync(() => setAway(false))
      moving.current = false
      launcherRef.current?.focus({ preventScroll: true })
    }
  }, [closeNow])

  // "Buy now" closes the panel on its way to the checkout.
  const chat = useJulesChat({ open: open && !hidden, locale: toLocale(i18n.language), onClose: closeNow })
  const firstName = (isAuthenticated && session?.firstName?.trim()) || undefined

  // Arriving on a page without Jules (the bag's Checkout link, say) closes the panel, so it
  // doesn't pop open again on the next page. Adjusted while rendering, as React suggests.
  const [wasHidden, setWasHidden] = useState(hidden)
  if (hidden !== wasHidden) {
    setWasHidden(hidden)
    if (hidden) setOpen(false)
  }

  /** The pill glides to the panel's send button and the panel opens out of it. */
  const openPanel = useCallback(async () => {
    if (moving.current || openNow.current) return
    moving.current = true
    // Measured before the launcher changes: the copy leaves as the pill.
    const from = faceRef.current ? faceOf(faceRef.current) : null
    // The panel is laid out, still hidden, so its send button can be found and measured.
    flushSync(() => {
      setMounted(true)
      setAway(true)
    })
    const show = () =>
      flushSync(() => {
        setOpen(true)
        setAway(false)
      })
    try {
      if (panelRef.current) await flyOpen({ from, panel: panelRef.current, show })
      else show()
    } finally {
      moving.current = false
    }
  }, [])

  // Escape closes (unless something inside used it first, e.g. clearing the search).
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) void closePanel()
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
  if (hidden || !textsReady || !switchedOn) return null

  return (
    <>
      {mounted ? (
        <JulesPanel
          open={open}
          chat={chat}
          view={view}
          onView={setView}
          onClose={() => void closePanel()}
          onCloseNow={closeNow}
          panelRef={panelRef}
          firstName={firstName}
        />
      ) : null}
      {/* The hello goes as soon as the pill sets off. */}
      {!open && !away ? <JulesTeaser onOpen={() => void openPanel()} onDismiss={() => launcherRef.current?.focus({ preventScroll: true })} /> : null}
      <JulesLauncher
        open={open}
        onToggle={() => void (open ? closePanel() : openPanel())}
        buttonRef={launcherRef}
        faceRef={faceRef}
        away={away}
      />
    </>
  )
}
