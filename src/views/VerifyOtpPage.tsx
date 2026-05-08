'use client'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@/lib/router'
import AuthShell from '../components/auth/AuthShell'
import { useAuth } from '../context/AuthContext'
import { verifyOtp } from '../services/authService'

export default function VerifyOtpPage() {
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
      setError('OTP verification failed. Check the email and OTP, then try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      title="Verify OTP"
      description="Confirm your account using the OTP"
      eyebrow="Verification"
      asideTitle="One final step before your account is ready."
      asideBody="Use the OTP sent for your registration email. After verification succeeds, continue by signing in with your email and password."
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
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#17110d]">OTP Code</span>
          <input
            type="text"
            required
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            maxLength={6}
            className="h-14 w-full border border-[#ddcdc0] px-4 text-base outline-none transition focus:border-[#17110d]"
            placeholder="Enter OTP"
          />
        </label>

        {error ? <p className="bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
        >
          {isSubmitting ? 'VERIFYING...' : 'VERIFY OTP'}
        </button>

        <p className="text-center text-sm text-zinc-500">
          Need to create another account?{' '}
          <Link to="/register" className="font-bold text-[#b63f80] underline underline-offset-4">
            Register again
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}