'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from '@/lib/router'
import AuthShell from '../components/auth/AuthShell'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../services/authService'
import type { AuthSession } from '../types/auth'

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
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthReady, isAuthenticated, saveSession, session } = useAuth()
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const session = await loginUser({ email, password })
      saveSession(session)
      navigate(getPostLoginRoute(session, from), { replace: true })
    } catch {
      setError('Login failed. Check your email and password, or create a new account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Login"
      description="Welcome back to your jewellery account"
      eyebrow="Account Access"
      asideTitle="Sign in and keep your favourites close."
      asideBody="Use your email and password to access your saved experience. Once login succeeds, the session is stored locally so the account stays available in this browser."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17110d]">Email Address</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 w-full border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
            placeholder="Enter your email"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17110d]">Password</span>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-14 w-full border border-[#ddcdc0] px-4 pr-14 text-base outline-none transition focus:border-[#17110d]"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-[#b63f80]"
            >
              {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <div className="mt-2 text-right">
            <Link to="/reset-password" className="text-xs font-semibold text-[#b63f80] underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
        </label>

        {error ? <p className="bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
        >
          {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
        </button>

        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-bold text-[#b63f80] underline underline-offset-4">
            Register here
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}