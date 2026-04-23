'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Building2, MapPinHouse, Save } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { getAdminAddress, updateAdminAddress } from '../services/userService'
import type { UpdateAdminAddressPayload } from '../types/address'
import { getCountryOptions, getStateOptions } from '../utils/location'

const initialForm: UpdateAdminAddressPayload = {
  street: '',
  houseNumber: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'IN',
  addressType: 'billing',
}

export default function AdminAddressPage() {
  const [form, setForm] = useState<UpdateAdminAddressPayload>(initialForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const stateOptions = useMemo(() => getStateOptions(form.country), [form.country])

  useEffect(() => {
    let mounted = true

    async function loadAddress() {
      setIsLoading(true)
      setError('')

      try {
        const address = await getAdminAddress()

        if (!mounted) {
          return
        }

        if (!address) {
          setForm(initialForm)
          return
        }

        setForm({
          street: address.street,
          houseNumber: address.houseNumber,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          addressType: address.addressType || 'billing',
        })
      } catch {
        if (!mounted) {
          return
        }

        setError('Unable to load admin address right now.')
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void loadAddress()

    return () => {
      mounted = false
    }
  }, [])

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSaving) {
      return
    }

    if (!form.street.trim() || !form.city.trim() || !form.state.trim() || !form.postalCode.trim() || !form.country.trim() || !form.addressType.trim()) {
      setError('Please fill all required address fields before saving.')
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

      toast.success('Admin address updated successfully.')
    } catch {
      setError('Unable to update admin address right now. Please try again.')
      toast.error('Unable to update admin address right now.')
    } finally {
      setIsSaving(false)
    }
  }

  function updateField<K extends keyof UpdateAdminAddressPayload>(key: K, value: UpdateAdminAddressPayload[K]) {
    setForm((currentValue) => ({
      ...currentValue,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fff2fa] text-[#8f2a60]">
            <MapPinHouse className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Admin</p>
            <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#17110d]">Address Settings</h1>
          </div>
        </div>

        <section className="mt-8 rounded-[30px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isLoading ? (
            <p className="text-sm text-zinc-500">Loading admin address...</p>
          ) : (
            <form onSubmit={(event) => void handleSave(event)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">Street</span>
                  <input
                    value={form.street}
                    onChange={(event) => updateField('street', event.target.value)}
                    className="w-full rounded-xl border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder="Street"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">House Number</span>
                  <input
                    value={form.houseNumber}
                    onChange={(event) => updateField('houseNumber', event.target.value)}
                    className="w-full rounded-xl border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder="House Number"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">City</span>
                  <input
                    value={form.city}
                    onChange={(event) => updateField('city', event.target.value)}
                    className="w-full rounded-xl border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder="City"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">State</span>
                  <select
                    value={form.state}
                    onChange={(event) => updateField('state', event.target.value)}
                    className="w-full rounded-xl border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                  >
                    <option value="">Select state</option>
                    {stateOptions.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">Postal Code</span>
                  <input
                    value={form.postalCode}
                    onChange={(event) => updateField('postalCode', event.target.value)}
                    className="w-full rounded-xl border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                    placeholder="Postal Code"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-semibold text-[#17110d]">Country</span>
                  <select
                    value={form.country}
                    onChange={(event) => {
                      updateField('country', event.target.value)
                      updateField('state', '')
                    }}
                    className="w-full rounded-xl border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                  >
                    <option value="">Select country</option>
                    {countryOptions.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="space-y-2 text-sm">
                <span className="font-semibold text-[#17110d]">Address Type</span>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={form.addressType}
                    onChange={(event) => updateField('addressType', event.target.value)}
                    className="w-full rounded-xl border border-[#e5d7cc] py-2.5 pl-10 pr-3 outline-none transition focus:border-[#b88a65]"
                    placeholder="billing, work, shipping..."
                  />
                </div>
              </label>

              {error ? (
                <div className="rounded-[20px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'UPDATING...' : 'UPDATE ADDRESS'}
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
