'use client'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@/lib/router'
import AuthShell from '../components/auth/AuthShell'
import { useAuth } from '../context/AuthContext'
import { verifyOtp } from '../services/authService'
import { useTranslation } from 'react-i18next'

export default function VerifyOtpPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { clearOtpEmail, pendingOtpEmail } = useAuth()
  const [email, setEmail] = useState(pendingOtpEmail)
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setEmail(pendingOtpEmail)
  }, [pendingOtpEmail])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await verifyOtp({ email, otp })
      clearOtpEmail()
      navigate('/login', { replace: true })
    } catch {
      setError(t('auth.verifyOtpFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      title={t('auth.verifyOtpTitle')}
      description={t('auth.verifyOtpDesc')}
      eyebrow={t('auth.verification')}
      asideTitle={t('auth.verifyOtpAsideTitle')}
      asideBody={t('auth.verifyOtpAsideBody')}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17110d]">{t('auth.emailLabel')}</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 w-full border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17110d]">{t('auth.otpCode')}</span>
          <input
            type="text"
            required
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            maxLength={6}
            className="h-14 w-full border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
            placeholder={t('auth.enterOtp')}
          />
        </label>

        {error ? <p className="bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
        >
          {isSubmitting ? t('auth.verifying') : t('auth.verifyOtpBtn')}
        </button>

        <p className="text-center text-sm text-zinc-500">
          {t('auth.needAnotherAccount').replace("Register again", "")}
          <Link to="/register" className="font-bold text-[#b63f80] underline underline-offset-4">
            {t('auth.registerAgain')}
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}