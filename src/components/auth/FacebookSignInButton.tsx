'use client'

import { useEffect, useRef, useState } from 'react'
import { SOCIAL_FONT_SIZE, SOCIAL_ICON_SIZE, TARGET_HEIGHT, renderedWidth } from './socialButtonSize'

type FacebookAuthResponse = { accessToken?: string }
type FacebookLoginResponse = { authResponse?: FacebookAuthResponse | null; status?: string }

declare global {
    interface Window {
        FB?: {
            init: (config: Record<string, unknown>) => void
            login: (
                cb: (response: FacebookLoginResponse) => void,
                options?: { scope?: string },
            ) => void
        }
        fbAsyncInit?: () => void
    }
}

const SCRIPT_ID = 'facebook-jssdk'
const SDK_SRC = 'https://connect.facebook.net/en_US/sdk.js'

type Props = {
    /** Receives the Meta access token to exchange with our API. */
    onAccessToken: (accessToken: string) => void
    label: string
    disabled?: boolean
}

/** Loads the Facebook JS SDK once and initialises it with our app id. */
function loadFacebookSdk(appId: string): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve()
    if (window.FB) return Promise.resolve()

    return new Promise((resolve, reject) => {
        const finish = () => {
            if (!window.FB) return reject(new Error('Facebook SDK unavailable'))
            window.FB.init({
                appId,
                cookie: true,
                xfbml: false,
                // Pinned so a future Graph release cannot change behaviour silently.
                version: 'v21.0',
            })
            resolve()
        }

        const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
        if (existing) {
            existing.addEventListener('load', finish)
            existing.addEventListener('error', () => reject(new Error('Facebook SDK failed to load')))
            return
        }

        const script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = SDK_SRC
        script.async = true
        script.defer = true
        script.crossOrigin = 'anonymous'
        script.onload = finish
        script.onerror = () => reject(new Error('Facebook SDK failed to load'))
        document.head.appendChild(script)
    })
}

/**
 * Meta provides no drop-in button widget the way Google does, so this is our
 * own button calling FB.login(). Styled to sit alongside Google's rendered
 * button at the same width.
 */
export default function FacebookSignInButton({ onAccessToken, label, disabled }: Props) {
    const [isReady, setIsReady] = useState(false)
    const [isPending, setIsPending] = useState(false)
    // Match Google exactly: same container, same formula, same final width.
    const wrapRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const measure = () => {
            const containerWidth = wrapRef.current?.parentElement?.offsetWidth ?? 0
            setWidth(renderedWidth(containerWidth))
        }
        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [])
    const [error, setError] = useState('')

    useEffect(() => {
        const appId = process.env.NEXT_PUBLIC_META_APP_ID
        if (!appId) {
            setError('Facebook sign-in is not configured')
            return
        }

        let cancelled = false
        loadFacebookSdk(appId)
            .then(() => { if (!cancelled) setIsReady(true) })
            .catch(() => { if (!cancelled) setError('Could not load Facebook sign-in') })

        return () => { cancelled = true }
    }, [])

    // The parent releases `disabled` when the sign-in attempt ends, so mirror
    // that back into the spinner.
    useEffect(() => {
        if (!disabled) setIsPending(false)
    }, [disabled])

    function handleClick() {
        if (!window.FB || isPending) return
        // Set locally so the spinner appears on the click itself, without
        // waiting for the parent's state to travel back down as `disabled`.
        setIsPending(true)
        window.FB.login(
            (response) => {
                const token = response?.authResponse?.accessToken
                // No token means the customer closed the dialog or declined —
                // not an error worth showing, but the button must come back.
                if (token) onAccessToken(token)
                else setIsPending(false)
            },
            { scope: 'public_profile,email' },
        )
    }

    if (error) {
        return <p className="text-center text-xs text-rose-600">{error}</p>
    }

    return (
        <div ref={wrapRef} className="flex justify-center">
            <button
                type="button"
                onClick={handleClick}
                disabled={!isReady || disabled || isPending}
                style={{ width: width || undefined, height: TARGET_HEIGHT, fontSize: SOCIAL_FONT_SIZE }}
                className="flex items-center justify-center gap-2 border border-[#ddcdc0] bg-white font-medium text-[#3c4043] transition hover:bg-[#f7f1ea] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending || disabled ? (
                    <span style={{ width: SOCIAL_ICON_SIZE, height: SOCIAL_ICON_SIZE }} className="animate-spin rounded-full border-2 border-[#dadce0] border-t-[#1877F2]" />
                ) : (
                    <svg width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill="#1877F2"
                            d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"
                        />
                    </svg>
                )}
                {isPending || disabled ? 'Please wait…' : label}
            </button>
        </div>
    )
}
