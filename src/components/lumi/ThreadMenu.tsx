'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent, type RefObject } from 'react'
import { Ellipsis, SquarePen, Trash2, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { FOCUS_RING, ICON_BUTTON } from './ui'

type ThreadMenuProps = {
  /** The "…" button, so focus can come back to it (e.g. after a cancelled delete). */
  buttonRef: RefObject<HTMLButtonElement | null>
  busy: boolean
  /** False for a new chat that hasn't been saved yet. */
  canDelete: boolean
  onNewChat: () => void
  onDelete: () => void
}

type Item = { id: string; label: string; icon: LucideIcon; run: () => void }

/**
 * The "…" menu in a conversation's header: start a new chat, or delete this
 * one. It opens under the button with the first item focused; the arrow keys
 * move through it, and Escape, Tab or a press elsewhere close it (Escape
 * closes only the menu, not Lumi).
 */
export function ThreadMenu({ buttonRef, busy, canDelete, onNewChat, onDelete }: ThreadMenuProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.lumi.thread' })
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const items: Item[] = [
    { id: 'new', label: t('newChat'), icon: SquarePen, run: onNewChat },
    ...(canDelete ? [{ id: 'delete', label: t('delete'), icon: Trash2, run: onDelete }] : []),
  ]

  useEffect(() => {
    if (!open) return
    // The first item, or the menu itself while Lumi is answering (so Escape still reaches it).
    const menu = menuRef.current
    ;(menu?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? menu)?.focus()
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target instanceof Node ? event.target : null
      if (target && (menuRef.current?.contains(target) || buttonRef.current?.contains(target))) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, buttonRef])

  function close(returnFocus: boolean) {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  function onMenuKey(event: KeyboardEvent<HTMLDivElement>) {
    const entries = [...(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [])]
    const at = entries.findIndex((entry) => entry === document.activeElement)
    let next: HTMLButtonElement | undefined
    if (event.key === 'Escape') {
      event.preventDefault() // the panel stays open
      close(true)
    } else if (event.key === 'Tab') {
      close(false)
    } else if (event.key === 'ArrowDown') {
      next = entries[(at + 1) % entries.length]
    } else if (event.key === 'ArrowUp') {
      next = entries[(at - 1 + entries.length) % entries.length]
    } else if (event.key === 'Home') {
      next = entries[0]
    } else if (event.key === 'End') {
      next = entries[entries.length - 1]
    }
    if (next) {
      event.preventDefault()
      next.focus()
    }
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((on) => !on)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={t('menu')}
        className={cn(ICON_BUTTON, FOCUS_RING)}
      >
        <Ellipsis aria-hidden className="h-5 w-5" />
      </button>
      {open ? (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={t('menu')}
          tabIndex={-1}
          onKeyDown={onMenuKey}
          className="absolute right-0 top-full z-30 mt-1.5 min-w-[196px] rounded-xl outline-none border border-white/[0.08] bg-[#231e1d] p-1 shadow-[0_18px_44px_-14px_rgba(0,0,0,0.7)] motion-safe:animate-lumi-fade"
        >
          {items.map(({ id, label, icon: Icon, run }) => (
            <button
              key={id}
              type="button"
              role="menuitem"
              disabled={busy}
              onClick={() => {
                close(false)
                run()
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] text-[#f6f1ee] outline-none transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent motion-reduce:transition-none"
            >
              <Icon aria-hidden className="h-4 w-4 shrink-0 text-[#a69d98]" />
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
