'use client'

import { useEffect, useRef, useState } from 'react'
import { SCALE, SOCIAL_FONT_SIZE, SOCIAL_ICON_SIZE, TARGET_HEIGHT, googleRequestWidth } from './socialButtonSize'

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: Record<string, unknown>) => void
                    renderButton: (el: HTMLElement, options: Record<string, unknown>) => void
                }
            }
        }
    }
}

const SCRIPT_SRC = 'https://accounts.google.com/gsi/client'



/**
 * Google Identity Services is a page-level singleton: calling initialize()
 * again replaces the previous config and logs a warning. So initialise once,
 * and route the credential to whichever button is currently mounted.
 */
let isInitialised = false
let activeHandler: ((idToken: string) => void) | null = null

type Props = {
    /** Receives the Google ID token to exchange with our API. */
    onCredential: (idToken: string) => void
    /** Button wording — "signin_with" on login, "signup_with" on register. */
    text?: 'signin_with' | 'signup_with' | 'continue_with'
    disabled?: boolean
}

/** Loads Google Identity Services once, shared by every button on the page. */
function loadGoogleScript(): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve()
    if (window.google?.accounts?.id) return Promise.resolve()

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
        return new Promise((resolve, reject) => {
            existing.addEventListener('load', () => resolve())
            existing.addEventListener('error', () => reject(new Error('Google script failed to load')))
        })
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        script.defer = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Google script failed to load'))
        document.head.appendChild(script)
    })
}

export default function GoogleSignInButton({ onCredential, text = 'continue_with', disabled }: Props) {
    const holderRef = useRef<HTMLDivElement>(null)
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    // Google renders into an iframe and only accepts a pixel width, so the
    // container is measured and the value passed in. 400 is Google's maximum.
    const [buttonWidth, setButtonWidth] = useState(0)
    // Google calls back outside React, so read the latest handler from a ref
    // rather than closing over a stale one.
    const handlerRef = useRef(onCredential)
    handlerRef.current = onCredential

    useEffect(() => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        if (!clientId) {
            setError('Google sign-in is not configured')
            return
        }

        let cancelled = false
        let ownHandler: ((idToken: string) => void) | null = null

        const measure = () => {
            const width = holderRef.current?.parentElement?.offsetWidth ?? 0
            setButtonWidth(googleRequestWidth(width))
        }
        measure()
        window.addEventListener('resize', measure)

        loadGoogleScript()
            .then(() => {
                if (cancelled || !holderRef.current || !window.google) return

                ownHandler = (idToken) => {
                    setIsPending(true)
                    handlerRef.current(idToken)
                }
                activeHandler = ownHandler

                if (!isInitialised) {
                    window.google.accounts.id.initialize({
                        client_id: clientId,
                        callback: (response: { credential?: string }) => {
                            if (response.credential) activeHandler?.(response.credential)
                        },
                        // One Tap is deliberately off — the button is explicit
                        // and appears on both the login and register pages.
                        auto_select: false,
                        cancel_on_tap_outside: true,
                    })
                    isInitialised = true
                }

                holderRef.current.innerHTML = ''
                window.google.accounts.id.renderButton(holderRef.current, {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    text,
                    shape: 'rectangular',
                    logo_alignment: 'center',
                    width: buttonWidth || 320,
                })
            })
            .catch(() => {
                if (!cancelled) setError('Could not load Google sign-in')
            })

        return () => {
            cancelled = true
            window.removeEventListener('resize', measure)
            // Stop a credential arriving after unmount from calling into a
            // page that is no longer on screen — but only clear our own, in
            // case another button mounted and took over in the meantime.
            if (activeHandler === ownHandler) activeHandler = null
        }
    }, [text, buttonWidth])

    // The parent releases `disabled` when the attempt ends — mirror it back so
    // a failed sign-in restores the button.
    useEffect(() => {
        if (!disabled) setIsPending(false)
    }, [disabled])

    if (error) {
        return <p className="text-center text-xs text-rose-600">{error}</p>
    }

    const busy = isPending || disabled

    return (
        <div className="relative" style={{ height: TARGET_HEIGHT }} aria-busy={busy}>
            <div
                ref={holderRef}
                style={{ transform: `scale(${SCALE})`, transformOrigin: 'top center' }}
                className={`flex justify-center ${busy ? 'pointer-events-none opacity-40' : ''}`}
            />
            {busy ? (
                // Google renders its button in its own iframe, so the only way
                // to show progress on it is to sit on top.
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <span style={{ width: SOCIAL_ICON_SIZE, height: SOCIAL_ICON_SIZE }} className="animate-spin rounded-full border-2 border-[#dadce0] border-t-[#4285F4]" />
                    <span style={{ fontSize: SOCIAL_FONT_SIZE }} className="font-medium text-[#3c4043]">Please wait…</span>
                </div>
            ) : null}
        </div>
    )
}
