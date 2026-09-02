'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from '@/lib/router'
import AuthShell from '../components/auth/AuthShell'
import GoogleSignInButton from '../components/auth/GoogleSignInButton'
import FacebookSignInButton from '../components/auth/FacebookSignInButton'
import CompleteGoogleProfile from '../components/auth/CompleteGoogleProfile'
import { useAuth } from '../context/AuthContext'
import { loginUser, loginWithFacebook, loginWithGoogle } from '../services/authService'
import type { AuthSession } from '../types/auth'
import { useTranslation } from 'react-i18next'

type LocationState = {
  from?: string
}

function getPostLoginRoute(session: AuthSession, from?: string): string {
  const defaultRoute = '/'

  if (!from || from === '/login' || from === '/register') {
    return defaultRoute
  }

  return from
}

export default function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthReady, isAuthenticated, saveSession, session } = useAuth()
  // Set when Google returns a brand-new account that still needs a phone and
  // address. Held in state only, so closing the tab discards it entirely.
  // True from the moment Google hands back a credential until we navigate.
  // Without it the login form reappears for a frame when the popup closes.
  const [isGoogleAuthenticating, setIsGoogleAuthenticating] = useState(false)
  const [pendingSignup, setPendingSignup] = useState<{
    pendingToken: string
    email: string
    firstName: string
    lastName: string
  } | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const from = ((location.state as LocationState | null)?.from) || '/'

  if (!isAuthReady) {
    return null
  }

  if (isAuthenticated && session) {
    return <Navigate to={getPostLoginRoute(session, from)} replace />
  }

  async function handleSocialResult(
    run: () => Promise<Awaited<ReturnType<typeof loginWithGoogle>>>,
    failureKey: string,
  ) {
    setIsGoogleAuthenticating(true)
    setIsSubmitting(true)
    setError('')

    try {
      const result = await run()
      if (result.status === 'PROFILE_INCOMPLETE') {
        setIsGoogleAuthenticating(false)
        setPendingSignup({
          pendingToken: result.pendingToken,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
        })
        return
      }
      saveSession(result.session)
      navigate(getPostLoginRoute(result.session, from), { replace: true })
    } catch (err: unknown) {
      setIsGoogleAuthenticating(false)
      const apiMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setError(apiMessage || t(failureKey, { defaultValue: 'Sign-in failed. Please try again.' }))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleCredential(idToken: string) {
    await handleSocialResult(() => loginWithGoogle(idToken), 'auth.googleFailed')
  }

  async function handleFacebookToken(accessToken: string) {
    await handleSocialResult(() => loginWithFacebook(accessToken), 'auth.facebookFailed')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const session = await loginUser({ email, password })
      saveSession(session)
      navigate(getPostLoginRoute(session, from), { replace: true })
    } catch {
      setError(t('auth.loginFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      title={t('auth.loginTitle')}
      description={t('auth.loginDesc')}
      eyebrow={t('auth.loginEyebrow')}
      asideTitle={t('auth.loginAsideTitle')}
      asideBody={t('auth.loginAsideBody')}
    >
      {isGoogleAuthenticating ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#e5d7cc] border-t-[#b63f80]" />
          <p className="text-sm text-zinc-500">
            {t('auth.signingIn', { defaultValue: 'Signing you in…' })}
          </p>
        </div>
      ) : pendingSignup ? (
        <CompleteGoogleProfile
          pendingToken={pendingSignup.pendingToken}
          email={pendingSignup.email}
          firstName={pendingSignup.firstName}
          lastName={pendingSignup.lastName}
          onCompleted={(newSession) => {
            saveSession(newSession)
            navigate(getPostLoginRoute(newSession, from), { replace: true })
          }}
          onCancel={() => setPendingSignup(null)}
        />
      ) : (
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17110d]">{t('auth.emailLabel')}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 w-full border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
            placeholder={t('auth.emailPlaceholder')}
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17110d]">{t('auth.passwordLabel')}</span>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-14 w-full border border-[#ddcdc0] px-4 pr-14 text-base outline-none transition focus:border-[#17110d]"
              placeholder={t('auth.passwordPlaceholder')}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
              aria-label={isPasswordVisible ? t('auth.hidePassword') : t('auth.showPassword')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-[#b63f80]"
            >
              {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="mt-2 text-right">
            <Link to="/reset-password" className="text-xs font-semibold text-[#b63f80] underline underline-offset-4">
              {t('auth.forgotPassword')}
            </Link>
          </div>
        </label>

        {error ? <p className="bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
        >
          {isSubmitting ? t('auth.signingIn') : t('auth.signIn')}
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-[#e5d7cc]" />
          <span className="text-xs uppercase tracking-[0.1em] text-zinc-400">
            {t('auth.or', { defaultValue: 'or' })}
          </span>
          <span className="h-px flex-1 bg-[#e5d7cc]" />
        </div>

        <GoogleSignInButton
          text="signin_with"
          disabled={isSubmitting}
          onCredential={handleGoogleCredential}
        />

        <FacebookSignInButton
          label={t('auth.continueWithFacebook', { defaultValue: 'Sign in with Facebook' })}
          disabled={isSubmitting}
          onAccessToken={handleFacebookToken}
        />

        <p className="text-center text-sm text-zinc-500">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-bold text-[#b63f80] underline underline-offset-4">
            {t('auth.registerHere')}
          </Link>
        </p>
      </form>
      )}
    </AuthShell>
  )
}