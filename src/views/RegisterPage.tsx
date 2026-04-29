'use client'

import { useMemo, useState } from 'react'
import axios from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from '@/lib/router'
import AuthShell from '../components/auth/AuthShell'
import { useAuth } from '../context/AuthContext'
import { registerUser } from '../services/authService'
import type { RegisterPayload } from '../types/auth'
import { getCityOptions, getCountryOptions, getStateOptions, isValidEmailAddress, isValidPostalCode } from '../utils/location'

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
  const [form, setForm] = useState<RegisterPayload>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const stateOptions = useMemo(() => getStateOptions(form.address.country), [form.address.country])
  const cityOptions = useMemo(() => getCityOptions(form.address.country, form.address.state), [form.address.country, form.address.state])
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
              className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
            {emailErrorMessage ? <p className="mt-2 text-xs text-rose-700">{emailErrorMessage}</p> : null}
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">First Name</span>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={(event) => updateField('firstName', event.target.value)}
              className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Last Name</span>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(event) => updateField('lastName', event.target.value)}
              className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
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
                className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 pr-14 outline-none transition focus:border-[#17110d]"
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
                className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 pr-14 outline-none transition focus:border-[#17110d]"
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
              className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[#17110d]">Phone Number</span>
            <input
              type="tel"
              required
              value={form.phoneNumber}
              onChange={(event) => updateField('phoneNumber', event.target.value)}
              className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
            />
          </label>
        </div>

        <div className="rounded-[28px] border border-[#eadfd4] bg-[#fffdfa] p-5">
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
                  updateAddressField('city', '')
                }}
                className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
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
                  updateAddressField('city', '')
                }}
                className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
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
                className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#17110d]">City</span>
              <select
                required
                value={form.address.city}
                onChange={(event) => updateAddressField('city', event.target.value)}
                className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
              >
                <option value="">Select city</option>
                {cityOptions.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
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
                className="h-14 w-full rounded-2xl border border-[#ddcdc0] px-4 outline-none transition focus:border-[#17110d]"
              />
              {postalCodeError || postalCodeLiveErrorMessage ? (
                <p className="mt-2 text-xs text-rose-700">{postalCodeError || postalCodeLiveErrorMessage}</p>
              ) : null}
            </label>
          </div>
        </div>

        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
        {!error && requiredFieldsMessage ? <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700">{requiredFieldsMessage}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting || !isRegisterFormValid}
          className="w-full rounded-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
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