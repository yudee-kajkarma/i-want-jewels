'use client'

import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Building2, MapPinHouse, Phone, Save, UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useAuth } from '../context/AuthContext'
import { getAdminAddress, getUserProfile, updateAdminAddress, updateUserProfile } from '../services/userService'
import type { UpdateAdminAddressPayload } from '../types/address'
import { getCountryOptions, getDialCodeOptions, getStateOptions, isValidPostalCode } from '../utils/location'

const initialForm: UpdateAdminAddressPayload = {
  street: '',
  houseNumber: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  addressType: 'billing',
}

type AdminNameForm = {
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: string
}

const initialNameForm: AdminNameForm = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  countryCode: '',
}

type ApiErrorBody = {
  message?: string
  error?: {
    message?: string
  }
}

function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return error.response?.data?.error?.message || error.response?.data?.message || fallback
  }

  return error instanceof Error && error.message ? error.message : fallback
}

export default function AdminAddressPage() {
  const { t } = useTranslation('common', { keyPrefix: 'admin.address' })
  const { session, saveSession } = useAuth()
  const [form, setForm] = useState<UpdateAdminAddressPayload>(initialForm)
  const [nameForm, setNameForm] = useState<AdminNameForm>(initialNameForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const dialCodeOptions = useMemo(() => getDialCodeOptions(), [])
  const stateOptions = useMemo(() => getStateOptions(form.country), [form.country])

  useEffect(() => {
    let mounted = true

    async function loadSettings() {
      setIsLoading(true)
      setError('')

      try {
        const [address, profile] = await Promise.all([getAdminAddress(), getUserProfile()])

        if (!mounted) {
          return
        }

        setNameForm({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phoneNumber: profile.phoneNumber,
          countryCode: profile.countryCode,
        })

        setForm(address ? {
          street: address.street,
          houseNumber: address.houseNumber,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          addressType: address.addressType || 'billing',
        } : initialForm)
      } catch (loadError) {
        if (!mounted) {
          return
        }

        setError(getApiErrorMessage(loadError, t('errorLoad')))
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void loadSettings()

    return () => {
      mounted = false
    }
  }, [t])

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPostalCodeError('')

    if (isSaving) {
      return
    }

    if (!form.street.trim() || !form.city.trim() || !form.state.trim() || !form.postalCode.trim() || !form.country.trim() || !form.addressType.trim()) {
      setError(t('errorFillRequired'))
      return
    }

    if (!nameForm.firstName.trim() || !nameForm.lastName.trim()) {
      setError(t('errorFillName'))
      return
    }

    if (!nameForm.countryCode.trim() || !nameForm.phoneNumber.trim()) {
      setError(t('errorFillPhone'))
      return
    }

    if (!isValidPostalCode(form.postalCode, form.country)) {
      setPostalCodeError(t('errorInvalidPostal'))
      return
    }

    setIsSaving(true)
    setError('')

    try {
      await updateAdminAddress({
        street: form.street.trim(),
        houseNumber: form.houseNumber.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        postalCode: form.postalCode.trim(),
        country: form.country.trim(),
        addressType: form.addressType.trim(),
      })
      await updateUserProfile({
        firstName: nameForm.firstName,
        lastName: nameForm.lastName,
        phoneNumber: nameForm.phoneNumber,
        countryCode: nameForm.countryCode,
      })

      if (session) {
        const firstName = nameForm.firstName.trim()
        const lastName = nameForm.lastName.trim()
        saveSession({
          ...session,
          firstName,
          lastName,
          username: [firstName, lastName].filter(Boolean).join(' ') || session.username,
        })
      }

      toast.success(t('toastUpdateSuccess'))
    } catch (saveError) {
      const message = getApiErrorMessage(saveError, t('errorUpdate'))
      setError(message)
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  function updateField<K extends keyof UpdateAdminAddressPayload>(key: K, value: UpdateAdminAddressPayload[K]) {
    if (key === 'postalCode' && postalCodeError) {
      setPostalCodeError('')
    }

    setForm((currentValue) => ({
      ...currentValue,
      [key]: value,
    }))
  }

  return (
    <div className="font-poppins min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center bg-[#fff2fa] text-[#8f2a60]">
            <MapPinHouse className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('breadcrumb')}</p>
            <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#17110d]">{t('title')}</h1>
          </div>
        </div>

        <section className="mt-8 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isLoading ? (
            <p className="text-sm text-zinc-500">{t('loading')}</p>
          ) : (
            <form onSubmit={(event) => void handleSave(event)} className="space-y-6">
              <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                <div className="mb-4 flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-[#8f2a60]" />
                  <div>
                    <h2 className="text-sm font-bold text-[#17110d]">{t('accountName')}</h2>
                    <p className="text-xs text-zinc-500">{t('accountNameHint')}</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold text-[#17110d]">{t('firstName')}</span>
                    <input
                      type="text"
                      value={nameForm.firstName}
                      onChange={(event) => setNameForm((current) => ({ ...current, firstName: event.target.value }))}
                      maxLength={50}
                      required
                      className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                      placeholder={t('firstName')}
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold text-[#17110d]">{t('lastName')}</span>
                    <input
                      type="text"
                      value={nameForm.lastName}
                      onChange={(event) => setNameForm((current) => ({ ...current, lastName: event.target.value }))}
                      maxLength={50}
                      required
                      className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                      placeholder={t('lastName')}
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold text-[#17110d]">{t('countryCode')}</span>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                      <select
                        value={nameForm.countryCode}
                        onChange={(event) => setNameForm((current) => ({ ...current, countryCode: event.target.value }))}
                        required
                        className="w-full border border-[#e5d7cc] py-2.5 pl-10 pr-3 outline-none transition focus:border-[#b88a65]"
                      >
                        <option value="">{t('countryCode')}</option>
                        {dialCodeOptions.map((option) => (
                          <option key={option.countryCode} value={option.dialCode}>
                            {option.name} ({option.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-semibold text-[#17110d]">{t('phoneNumber')}</span>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="tel"
                        inputMode="tel"
                        value={nameForm.phoneNumber}
                        onChange={(event) => setNameForm((current) => ({ ...current, phoneNumber: event.target.value }))}
                        maxLength={24}
                        required
                        className="w-full border border-[#e5d7cc] py-2.5 pl-10 pr-3 outline-none transition focus:border-[#b88a65]"
                        placeholder="470 12 34 56"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">{t('country')}</span>
                  <select
                    value={form.country}
                    onChange={(event) => {
                      updateField('country', event.target.value)
                      updateField('state', '')
                    }}
                    className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                  >
                    <option value="">{t('selectCountry')}</option>
                    {countryOptions.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">{t('state')}</span>
                  <select
                    value={form.state}
                    onChange={(event) => {
                      updateField('state', event.target.value)
                    }}
                    className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                  >
                    <option value="">{t('selectState')}</option>
                    {stateOptions.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">{t('city')}</span>
                  <input
                    value={form.city}
                    onChange={(event) => updateField('city', event.target.value)}
                    className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder={t('city')}
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">{t('houseNumber')}</span>
                  <input
                    value={form.houseNumber}
                    onChange={(event) => updateField('houseNumber', event.target.value)}
                    className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder={t('houseNumber')}
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">{t('street')}</span>
                  <input
                    value={form.street}
                    onChange={(event) => updateField('street', event.target.value)}
                    className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder={t('street')}
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">{t('postalCode')}</span>
                  <input
                    value={form.postalCode}
                    onChange={(event) => updateField('postalCode', event.target.value)}
                    className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder={t('postalCode')}
                  />
                  {postalCodeError ? <p className="text-xs text-rose-700">{postalCodeError}</p> : null}
                </label>
              </div>

              <label className="space-y-2 text-sm">
                <span className="font-semibold text-[#17110d]">{t('addressType')}</span>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={form.addressType}
                    onChange={(event) => updateField('addressType', event.target.value)}
                    className="w-full border border-[#e5d7cc] py-2.5 pl-10 pr-3 outline-none transition focus:border-[#b88a65]"
                    placeholder={t('addressTypePlaceholder')}
                  />
                </div>
              </label>

              {error ? (
                <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 bg-[#111111] px-5 py-3 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? t('updating') : t('updateSettings')}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
