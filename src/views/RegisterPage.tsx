'use client'

import { useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from '@/lib/router'
import AuthShell from '../components/auth/AuthShell'
import { useAuth } from '../context/AuthContext'
import { checkRegisterEmail, registerUser } from '../services/authService'
import type { RegisterPayload } from '../types/auth'
import { getCountryOptions, getStateOptions, isValidEmailAddress, isValidPostalCode } from '../utils/location'

type RegisterPhase = 'email-check' | 'details'

const initialForm: RegisterPayload = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  countryCode: '+91',
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN',
    isDefault: true,
    addressType: 'home',
  },
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const { setOtpEmail } = useAuth()
  const [phase, setPhase] = useState<RegisterPhase>('email-check')
  const [emailCheckValue, setEmailCheckValue] = useState('')
  const [emailCheckError, setEmailCheckError] = useState('')
  const [emailCheckUserExists, setEmailCheckUserExists] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [form, setForm] = useState<RegisterPayload>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const stateOptions = useMemo(() => getStateOptions(form.address.country), [form.address.country])
  const isRegisterFormValid = useMemo(() => {
    const hasRequiredFields =
      form.username.trim() !== '' &&
      form.email.trim() !== '' &&
      form.password.trim() !== '' &&
      form.confirmPassword.trim() !== '' &&
      form.firstName.trim() !== '' &&
      form.lastName.trim() !== '' &&
      form.phoneNumber.trim() !== '' &&
      form.countryCode.trim() !== '' &&
      form.address.country.trim() !== '' &&
      form.address.state.trim() !== '' &&
      form.address.city.trim() !== '' &&
      form.address.street.trim() !== '' &&
      form.address.postalCode.trim() !== ''

    if (!hasRequiredFields) {
      return false
    }

    if (!isValidEmailAddress(form.email)) {
      return false
    }

    if (!isValidPostalCode(form.address.postalCode, form.address.country)) {
      return false
    }

    return form.password === form.confirmPassword
  }, [form])
  const emailErrorMessage = useMemo(() => {
    if (!form.email.trim()) {
      return ''
    }

    return isValidEmailAddress(form.email) ? '' : 'Please write a valid email address.'
  }, [form.email])
  const postalCodeLiveErrorMessage = useMemo(() => {
    if (!form.address.postalCode.trim()) {
      return ''
    }

    return isValidPostalCode(form.address.postalCode, form.address.country) ? '' : 'Please write a valid postal code.'
  }, [form.address.country, form.address.postalCode])
  const passwordMismatchMessage = useMemo(() => {
    if (!form.confirmPassword.trim()) {
      return ''
    }

    return form.password === form.confirmPassword ? '' : 'Password and confirm password must match.'
  }, [form.confirmPassword, form.password])
  const requiredFieldsMessage = useMemo(() => {
    const hasAnyInput =
      form.username.trim() ||
      form.email.trim() ||
      form.password.trim() ||
      form.confirmPassword.trim() ||
      form.firstName.trim() ||
      form.lastName.trim() ||
      form.phoneNumber.trim() ||
      form.countryCode.trim() ||
      form.address.country.trim() ||
      form.address.state.trim() ||
      form.address.city.trim() ||
      form.address.street.trim() ||
      form.address.postalCode.trim()

    if (!hasAnyInput || isRegisterFormValid) {
      return ''
    }

    return 'Please fill all required fields.'
  }, [form, isRegisterFormValid])

  function getRegisterErrorMessage(error: unknown): string {
    if (!axios.isAxiosError(error)) {
      return 'Registration failed. Check the details and try again.'
    }

    const responseData = error.response?.data

    if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
      const errorRecord = 'error' in responseData ? (responseData as Record<string, unknown>).error : null

      if (errorRecord && typeof errorRecord === 'object' && !Array.isArray(errorRecord)) {
        const backendMessage = (errorRecord as Record<string, unknown>).message

        if (typeof backendMessage === 'string' && backendMessage.trim()) {
          return backendMessage
        }
      }

      const message = (responseData as Record<string, unknown>).message

      if (typeof message === 'string' && message.trim()) {
        return message
      }
    }

    return 'Registration failed. Check the details and try again.'
  }

  function updateField<Key extends keyof RegisterPayload>(key: Key, value: RegisterPayload[Key]) {
    setForm((currentValue) => ({
      ...currentValue,
      [key]: value,
    }))
  }

  function updateAddressField<Key extends keyof RegisterPayload['address']>(key: Key, value: RegisterPayload['address'][Key]) {
    setForm((currentValue) => ({
      ...currentValue,
      address: {
        ...currentValue.address,
        [key]: value,
      },
    }))
  }

  async function handleEmailCheck(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedEmail = emailCheckValue.trim()

    if (!isValidEmailAddress(trimmedEmail)) {
      setEmailCheckError('Please write a valid email address.')
      return
    }

    setIsCheckingEmail(true)
    setEmailCheckError('')
    setEmailCheckUserExists(false)

    try {
      const result = await checkRegisterEmail(trimmedEmail)

      switch (result.code) {
        case 'EMAIL_AVAILABLE': {
          setForm((current) => ({ ...current, email: trimmedEmail }))
          setPhase('details')
          break
        }
        case 'OTP_ALREADY_SENT':
        case 'OTP_RESENT': {
          if (result.message) {
            toast.success(result.message)
          }
          setOtpEmail(trimmedEmail)
          navigate('/verify-otp', { replace: true })
          break
        }
        case 'USER_EXISTS': {
          setEmailCheckUserExists(true)
          setEmailCheckError(result.message || 'This email is already registered. Please log in instead.')
          break
        }
        case 'EMAIL_SENT_FAILED':
        case 'CHECK_EMAIL_ERROR':
        default: {
          toast.error(result.message || 'Something went wrong. Please try again.')
          break
        }
      }
    } catch (caughtError) {
      const fallbackMessage = axios.isAxiosError(caughtError)
        ? (caughtError.response?.data as { message?: string } | undefined)?.message
        : ''

      toast.error(fallbackMessage || 'Unable to verify email right now. Please try again.')
    } finally {
      setIsCheckingEmail(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPostalCodeError('')

    if (!isValidEmailAddress(form.email)) {
      setError('Please write a valid email address.')
      return
    }

    if (!isValidPostalCode(form.address.postalCode, form.address.country)) {
      setPostalCodeError('Please write a valid postal code.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password must match.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await registerUser(form)
      setOtpEmail(response.email)
      navigate('/verify-otp', { replace: true })
    } catch (error) {
      setError(getRegisterErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (phase === 'email-check') {
    return (
      <AuthShell
        title="Register"
        description="Verify your email to start"
        eyebrow="New Member"
        asideTitle="Let’s start with your email."
        asideBody="We’ll check whether this address is new, already registered, or has a pending verification, then take you to the right next step."
      >
        <form className="space-y-5" onSubmit={handleEmailCheck}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Email Address</span>
            <input
              type="email"
              required
              value={emailCheckValue}
              onChange={(event) => {
                setEmailCheckValue(event.target.value)

                if (emailCheckError) {
                  setEmailCheckError('')
                }

                if (emailCheckUserExists) {
                  setEmailCheckUserExists(false)
                }
              }}
              placeholder="you@example.com"
              className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
            {emailCheckError ? (
              <p className="mt-2 text-xs text-rose-700">
                {emailCheckError}
                {emailCheckUserExists ? (
                  <>
                    {' '}
                    <Link to="/login" className="font-bold underline underline-offset-4">
                      Sign in here
                    </Link>
                  </>
                ) : null}
              </p>
            ) : null}
          </label>

          <button
            type="submit"
            disabled={isCheckingEmail || !emailCheckValue.trim()}
            className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
          >
            {isCheckingEmail ? 'CHECKING...' : 'CONTINUE'}
          </button>

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#b63f80] underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </form>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Register"
      description="Create your jewellery account"
      eyebrow="New Member"
      asideTitle="Register once, verify with OTP, and continue shopping."
      asideBody="This flow matches your API: first register, then verify the OTP using the same email address. After verification, the account is stored locally in this browser."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Username</span>
            <input
              type="text"
              required
              value={form.username}
              onChange={(event) => updateField('username', event.target.value)}
              className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Email</span>
            <input
              type="email"
              required
              readOnly
              disabled
              value={form.email}
              className="h-14 w-full border border-[#ddcdc0] bg-[#f5ede5] px-4 text-zinc-700 outline-none"
            />
            <p className="mt-2 text-xs text-zinc-500">Email verified. Continue with the rest of your details.</p>
            {emailErrorMessage ? <p className="mt-2 text-xs text-rose-700">{emailErrorMessage}</p> : null}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">First Name</span>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Last Name</span>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Password</span>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                required
                value={form.password}
                onChange={(event) => updateField('password', event.target.value)}
                className="h-14 w-full border border-[#ddcdc0] px-4 pr-14 outline-none transition focus:border-[#17110d]"
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
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Confirm Password</span>
            <div className="relative">
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                required
                value={form.confirmPassword}
                onChange={(event) => updateField('confirmPassword', event.target.value)}
                className="h-14 w-full border border-[#ddcdc0] px-4 pr-14 outline-none transition focus:border-[#17110d]"
              />
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible((currentValue) => !currentValue)}
                aria-label={isConfirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-[#b63f80]"
              >
                {isConfirmPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {passwordMismatchMessage ? <p className="mt-2 text-xs text-rose-700">{passwordMismatchMessage}</p> : null}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Country Code</span>
            <input
              type="text"
              required
              value={form.countryCode}
              onChange={(event) => updateField('countryCode', event.target.value)}
              className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Phone Number</span>
            <input
              type="tel"
              required
              value={form.phoneNumber}
              onChange={(event) => updateField('phoneNumber', event.target.value)}
              className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
        </div>

        <div className="border border-[#eadfd4] bg-[#fffdfa] p-5">
          <h3 className="text-lg font-bold text-[#17110d]">Address</h3>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#17110d]">Country</span>
              <select
                required
                value={form.address.country}
                onChange={(event) => {
                  const countryCode = event.target.value
                  updateAddressField('country', countryCode)
                  updateAddressField('state', '')
                }}
                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
              >
                <option value="">Select country</option>
                {countryOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#17110d]">State</span>
              <select
                required
                value={form.address.state}
                onChange={(event) => {
                  updateAddressField('state', event.target.value)
                }}
                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
              >
                <option value="">Select state</option>
                {stateOptions.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#17110d]">Street</span>
              <input
                type="text"
                required
                value={form.address.street}
                onChange={(event) => updateAddressField('street', event.target.value)}
                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#17110d]">City</span>
              <input
                type="text"
                required
                value={form.address.city}
                onChange={(event) => updateAddressField('city', event.target.value)}
                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
                placeholder="City"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#17110d]">Postal Code</span>
              <input
                type="text"
                required
                value={form.address.postalCode}
                onChange={(event) => {
                  if (postalCodeError) {
                    setPostalCodeError('')
                  }

                  updateAddressField('postalCode', event.target.value)
                }}
                className="h-14 w-full border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
              />
              {postalCodeError || postalCodeLiveErrorMessage ? (
                <p className="mt-2 text-xs text-rose-700">{postalCodeError || postalCodeLiveErrorMessage}</p>
              ) : null}
            </label>
          </div>
        </div>

        {error ? <p className="bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
        {!error && requiredFieldsMessage ? <p className="bg-amber-50 px-4 py-3 text-sm text-amber-700">{requiredFieldsMessage}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting || !isRegisterFormValid}
          className="w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
        >
          {isSubmitting ? 'CREATING ACCOUNT...' : 'REGISTER'}
        </button>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#b63f80] underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  )
}