'use client'

import { useEffect, useRef, useState, type Dispatch, type MouseEvent, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { LumiChatApi } from './contract'
import { isFinePointer, PHONE_QUERY } from './hooks'
import { LumiChats } from './LumiChats'
import { LumiComposer } from './LumiComposer'
import { LumiExplore } from './LumiExplore'
import { LumiHome } from './LumiHome'
import { LumiShortcuts } from './LumiShortcuts'
import { LumiTabBar } from './LumiTabBar'
import { LumiThread } from './LumiThread'
import type { LumiNav, LumiView } from './lumiView'
import { PanelControls } from './PanelHeader'
import { useSheetDrag } from './useSheetDrag'

type LumiPanelProps = {
  open: boolean
  chat: LumiChatApi
  view: LumiView
  onView: Dispatch<SetStateAction<LumiView>>
  onClose: () => void
  /** The signed-in customer's first name, for the hello. */
  firstName?: string
}

/**
 * Lumi's panel, in the owner's calm dark palette. It shows a tab (Home,
 * Chats, Explore) with the tab bar, or a conversation with the shortcuts and
 * the question box. On phones it is a sheet from the bottom over the dimmed
 * page (pull it down or tap the page to close); on larger screens a panel by
 * the button that can be made bigger.
 *
 * It stays mounted once opened (hidden while closed), so the chat on screen,
 * its draft and the bot check survive closing and reopening.
 */
export function LumiPanel({ open, chat, view, onView, onClose, firstName }: LumiPanelProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const panelRef = useRef<HTMLElement>(null)
  const [draft, setDraft] = useState('')
  const [expanded, setExpanded] = useState(false)
  /** Bumped to put the cursor in the question box, or focus on the panel itself. */
  const [composerFocus, setComposerFocus] = useState(0)
  const [panelFocus, setPanelFocus] = useState(0)
  const { history, busy, botBoxRef } = chat
  /** The history as of the last render, to check after waiting for a chat to open. */
  const latestHistory = useRef(history)
  const sheetDrag = useSheetDrag(panelRef, open, onClose)

  useEffect(() => {
    latestHistory.current = history
  })

  // Focus moves into the panel when it opens (and back to the button when it closes: LumiWidget).
  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true })
  }, [open])

  useEffect(() => {
    if (panelFocus) panelRef.current?.focus({ preventScroll: true })
  }, [panelFocus])

  /** Moves focus to the panel; an old request for the question box must not fire when it is drawn again. */
  function focusPanel() {
    setComposerFocus(0)
    setPanelFocus((n) => n + 1)
  }

  /** Shows the conversation and puts focus where the visitor will want it next. */
  function showThread(focus: 'composer' | 'panel') {
    onView((current) => ({ ...current, thread: true }))
    if (focus === 'composer') setComposerFocus((n) => n + 1)
    else focusPanel()
  }

  const nav: LumiNav = {
    start(next) {
      // While Lumi is still answering, show that chat instead of starting another.
      if (!busy) {
        history.startNew()
        if (next.kind === 'ask') void chat.ask(next.text)
        else if (next.kind === 'suggestion') void chat.askSuggestion(next.id)
        else if (next.kind === 'quick') void chat.quick(next.action)
        else if (next.kind === 'context') void chat.askAboutContext(next.question)
        else if (next.kind === 'options') void chat.chooseOptions(next.slug)
        else if (next.kind === 'giftFinder') chat.startGiftFinder()
      }
      // A phone's keyboard only pops up when the visitor is about to type.
      showThread(next.kind === 'blank' || isFinePointer() ? 'composer' : 'panel')
    },
    async openChat(id) {
      if (history.current?.id !== id) {
        try {
          await history.open(id)
        } catch {
          return
        }
        // Let the opened chat reach the screen; if it couldn't load (offline), stay on the list.
        await new Promise((resolve) => requestAnimationFrame(resolve))
        if (latestHistory.current.current?.id !== id) return
      }
      showThread(isFinePointer() ? 'composer' : 'panel')
    },
    showTab(tab) {
      onView({ tab, thread: false })
    },
    close: onClose,
  }

  function back() {
    onView((current) => ({ ...current, thread: false }))
    focusPanel()
  }

  function send(text: string) {
    setDraft('')
    void chat.ask(text)
  }

  /** On phones the sheet covers the page, so following a shop link closes it to show the page. */
  function closeForPhoneLink(event: MouseEvent<HTMLElement>) {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null
    if (!link || link.getAttribute('target') === '_blank') return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (window.matchMedia(PHONE_QUERY).matches) onClose()
  }

  const controls = <PanelControls expanded={expanded} onExpand={() => setExpanded((on) => !on)} onClose={onClose} />

  return (
    <>
      {/* Phones: the page behind the sheet dims; tapping it closes Lumi. */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[59] bg-black/45 backdrop-blur-[2px] transition-[opacity,visibility] duration-200 motion-reduce:transition-none sm:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      />

      <section
        ref={panelRef}
        role="dialog"
        aria-label={t('title')}
        tabIndex={-1}
        inert={!open}
        data-open={open}
        onClickCapture={closeForPhoneLink}
        {...sheetDrag}
        className={cn(
          'fixed z-[60] flex flex-col overflow-hidden font-poppins text-[#f6f1ee] outline-none',
          // Nearly opaque: over a white page a thinner panel turns grey and its cards would look darker than it.
          'border-white/[0.08] bg-[#141110]/[0.98] shadow-[0_24px_70px_-18px_rgba(0,0,0,0.6)] backdrop-blur-xl',
          // Phones: a sheet from the bottom.
          'inset-x-0 bottom-0 h-[92dvh] rounded-t-[28px] border-t',
          // Tablets and up: a panel above the button in the corner.
          'sm:inset-x-auto sm:bottom-[84px] sm:right-4 sm:h-[min(720px,calc(100dvh-108px))] sm:w-[400px] sm:rounded-[24px] sm:border',
          'md:bottom-24 md:right-6 md:h-[min(720px,calc(100dvh-120px))]',
          // Larger: wider, and as tall as fits under the site's header (never shorter than before).
          expanded && 'md:h-[calc(100dvh-180px)] md:min-h-[min(720px,calc(100dvh-120px))] md:w-[min(720px,calc(100vw-48px))]',
          'origin-bottom duration-[180ms] ease-out motion-reduce:transition-none sm:origin-bottom-right',
          // Visible at once when opening (so focus can move in), hidden only after the fade when closing.
          open
            ? 'visible translate-y-0 opacity-100 transition-[opacity,transform,width,height] sm:scale-100'
            : 'invisible translate-y-8 opacity-0 transition-[opacity,transform,visibility,width,height] sm:translate-y-2 sm:scale-[0.97]',
        )}
      >
        {/* The sheet's handle (phones): pull it, or a header, down to close. */}
        <div data-lumi-grab aria-hidden className="absolute left-1/2 top-0 z-30 flex h-6 w-28 -translate-x-1/2 touch-none justify-center pt-2 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-white/25" />
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          {view.thread ? (
            <LumiThread chat={chat} onBack={back} onNewChat={() => nav.start({ kind: 'blank' })} controls={controls} />
          ) : (
            <div key={view.tab} className="flex min-h-0 flex-1 flex-col motion-safe:animate-lumi-fade">
              {view.tab === 'home' ? <LumiHome chat={chat} nav={nav} firstName={firstName} controls={controls} /> : null}
              {view.tab === 'chats' ? <LumiChats history={history} nav={nav} controls={controls} /> : null}
              {view.tab === 'explore' ? <LumiExplore nav={nav} controls={controls} /> : null}
            </div>
          )}

          {/* Cloudflare's bot check lives here on every screen, ready when a question is sent. */}
          <div ref={botBoxRef} className="flex shrink-0 justify-center px-4 empty:hidden" />

          {view.thread ? (
            <>
              <LumiShortcuts chat={chat} />
              <LumiComposer value={draft} onChange={setDraft} onSend={send} busy={busy} focusRequest={composerFocus} />
            </>
          ) : null}
        </div>

        {!view.thread ? <LumiTabBar tab={view.tab} onTab={nav.showTab} /> : null}
      </section>
    </>
  )
}
