'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import {
  createUserAddress,
  deleteUserAddress,
  getUserAddresses,
  getUserProfile,
  setDefaultUserAddress,
  updateUserAddress,
  updateUserProfile,
} from '../services/userService'
import type { UserAddress, UserProfile, UserProfileAddressPayload } from '../types/profile'
import { getCountryOptions, getStateOptions } from '../utils/location'

type AddressFormItem = UserProfileAddressPayload & {
  id: string
  apiId: string | null
}

function createAddress(defaults?: Partial<UserProfileAddressPayload>, apiId: string | null = null): AddressFormItem {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    apiId,
    houseNumber: defaults?.houseNumber ?? '',
    street: defaults?.street ?? '',
    city: defaults?.city ?? '',
    state: defaults?.state ?? '',
    postalCode: defaults?.postalCode ?? '',
    country: defaults?.country ?? 'IN',
    isDefault: defaults?.isDefault ?? false,
    addressType: defaults?.addressType ?? 'home',
  }
}

export default function ProfilePage() {
  const { session, saveSession } = useAuth()
  const [firstName, setFirstName] = useState(session?.firstName ?? '')
  const [lastName, setLastName] = useState(session?.lastName ?? '')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [draftFirstName, setDraftFirstName] = useState('')
  const [draftLastName, setDraftLastName] = useState('')
  const [draftPhoneNumber, setDraftPhoneNumber] = useState('')
  const [draftCountryCode, setDraftCountryCode] = useState('+91')
  const [addresses, setAddresses] = useState<AddressFormItem[]>([createAddress({ isDefault: true })])
  const [initialAddressesById, setInitialAddressesById] = useState<Record<string, UserProfileAddressPayload>>({})
  const [removedAddressIds, setRemovedAddressIds] = useState<string[]>([])
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingProfileDetails, setIsSavingProfileDetails] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const countryOptions = useMemo(() => getCountryOptions(), [])

  const canRemoveAddress = useMemo(() => addresses.length > 1, [addresses.length])

  function applyProfile(profile: UserProfile) {
    setFirstName(profile.firstName)
    setLastName(profile.lastName)
    setPhoneNumber(profile.phoneNumber)
    setCountryCode(profile.countryCode || '+91')
    setDraftFirstName(profile.firstName)
    setDraftLastName(profile.lastName)
    setDraftPhoneNumber(profile.phoneNumber)
    setDraftCountryCode(profile.countryCode || '+91')
  }

  function applyAddresses(nextAddresses: UserAddress[]) {
    const hasDefault = nextAddresses.some((address) => address.isDefault)

    if (nextAddresses.length === 0) {
      setAddresses([createAddress({ isDefault: true, country: 'IN', addressType: 'home' })])
    } else {
      setAddresses(
        nextAddresses.map((address, index) =>
          createAddress(
            {
              houseNumber: address.houseNumber,
              street: address.street,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
              country: address.country,
              isDefault: hasDefault ? address.isDefault : index === 0,
              addressType: address.addressType,
            },
            address.id,
          ),
        ),
      )
    }

    setRemovedAddressIds([])
    setInitialAddressesById(
      nextAddresses.reduce<Record<string, UserProfileAddressPayload>>((result, address) => {
        result[address.id] = {
          houseNumber: address.houseNumber,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          isDefault: address.isDefault,
          addressType: address.addressType,
        }

        return result
      }, {}),
    )
  }

  useEffect(() => {
    let isMounted = true

    async function loadProfile() {
      setIsProfileLoading(true)
      setErrorMessage('')

      try {
        const [profile, addressList] = await Promise.all([getUserProfile(), getUserAddresses()])

        if (!isMounted) {
          return
        }

        applyProfile(profile)
        applyAddresses(addressList)
      } catch {
        if (!isMounted) {
          return
        }

        setErrorMessage('Unable to load profile right now. You can still edit and save manually.')
        toast.error('Unable to load profile right now.')
      } finally {
        if (isMounted) {
          setIsProfileLoading(false)
        }
      }
    }

    void loadProfile()

    return () => {
      isMounted = false
    }
  }, [])

  function handleAddressChange(id: string, field: keyof UserProfileAddressPayload, value: string | boolean) {
    setAddresses((currentAddresses) =>
      currentAddresses.map((address) => {
        if (address.id !== id) {
          return address
        }

        return {
          ...address,
          [field]: value,
        }
      }),
    )
  }

  function setDefaultAddress(id: string) {
    setAddresses((currentAddresses) =>
      currentAddresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  function addAddress() {
    setAddresses((currentAddresses) => [...currentAddresses, createAddress()])
  }

  function removeAddress(id: string) {
    setAddresses((currentAddresses) => {
      const removedAddress = currentAddresses.find((address) => address.id === id)

      if (removedAddress?.apiId) {
        setRemovedAddressIds((currentRemovedAddresses) =>
          currentRemovedAddresses.includes(removedAddress.apiId as string)
            ? currentRemovedAddresses
            : [...currentRemovedAddresses, removedAddress.apiId as string],
        )
      }

      const nextAddresses = currentAddresses.filter((address) => address.id !== id)

      if (nextAddresses.length === 0) {
        return [createAddress({ isDefault: true })]
      }

      if (!nextAddresses.some((address) => address.isDefault)) {
        return nextAddresses.map((address, index) => ({
          ...address,
          isDefault: index === 0,
        }))
      }

      return nextAddresses
    })
  }

  function buildBaseProfilePayload() {
    return {
      firstName,
      lastName,
      phoneNumber,
      countryCode,
    }
  }

  function openEditProfilePopup() {
    setDraftFirstName(firstName)
    setDraftLastName(lastName)
    setDraftPhoneNumber(phoneNumber)
    setDraftCountryCode(countryCode)
    setIsEditProfileOpen(true)
  }

  function openChangePasswordPopup() {
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsChangePasswordOpen(true)
  }

  async function handleSaveProfileDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSavingProfileDetails(true)
    setErrorMessage('')

    try {
      const result = await updateUserProfile({
        firstName: draftFirstName,
        lastName: draftLastName,
        phoneNumber: draftPhoneNumber,
        countryCode: draftCountryCode,
      })

      setFirstName(draftFirstName)
      setLastName(draftLastName)
      setPhoneNumber(draftPhoneNumber)
      setCountryCode(draftCountryCode)

      if (session) {
        saveSession({
          ...session,
          firstName: draftFirstName.trim(),
          lastName: draftLastName.trim(),
          username: [draftFirstName.trim(), draftLastName.trim()].filter(Boolean).join(' ') || session.username,
        })
      }

      setSuccessMessage(result.message || 'Profile details updated successfully.')
      toast.success(result.message || 'Profile details updated successfully.')
      setIsEditProfileOpen(false)
    } catch {
      setErrorMessage('Unable to update profile details right now. Please try again.')
      toast.error('Unable to update profile details right now.')
    } finally {
      setIsSavingProfileDetails(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      if (removedAddressIds.length > 0) {
        await Promise.all(removedAddressIds.map((addressId) => deleteUserAddress(addressId)))
      }

      for (const address of addresses) {
        const payload: UserProfileAddressPayload = {
          houseNumber: address.houseNumber,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          isDefault: address.isDefault,
          addressType: address.addressType,
        }

        if (!address.apiId) {
          const createdAddress = await createUserAddress(payload)
          address.apiId = createdAddress.id
          continue
        }

        const initialAddress = initialAddressesById[address.apiId]

        if (!initialAddress) {
          await updateUserAddress(address.apiId, payload)
          continue
        }

        const changedFields: Partial<UserProfileAddressPayload> = {}

        if (initialAddress.street !== payload.street) changedFields.street = payload.street
        if (initialAddress.houseNumber !== payload.houseNumber) changedFields.houseNumber = payload.houseNumber
        if (initialAddress.city !== payload.city) changedFields.city = payload.city
        if (initialAddress.state !== payload.state) changedFields.state = payload.state
        if (initialAddress.postalCode !== payload.postalCode) changedFields.postalCode = payload.postalCode
        if (initialAddress.country !== payload.country) changedFields.country = payload.country
        if (initialAddress.addressType !== payload.addressType) changedFields.addressType = payload.addressType
        if (Object.keys(changedFields).length > 0) {
          await updateUserAddress(address.apiId, changedFields)
        }
      }

      const selectedDefaultAddress = addresses.find((address) => address.isDefault)

      if (selectedDefaultAddress?.apiId) {
        await setDefaultUserAddress(selectedDefaultAddress.apiId)
      }

      setSuccessMessage('Addresses updated successfully.')
      toast.success('Addresses updated successfully.')

      try {
        const [refreshedProfile, refreshedAddresses] = await Promise.all([getUserProfile(), getUserAddresses()])
        applyProfile(refreshedProfile)
        applyAddresses(refreshedAddresses)
      } catch {
        // Keep form state when refresh fails.
      }
    } catch {
      setErrorMessage('Unable to update profile right now. Please try again.')
      toast.error('Unable to update profile right now. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Please fill old password, new password, and confirm password.')
      toast.error('Please fill all password fields.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.')
      toast.error('Password confirmation does not match.')
      return
    }

    setIsChangingPassword(true)

    try {
      const result = await updateUserProfile({
        ...buildBaseProfilePayload(),
        oldPassword,
        password: newPassword,
      })

      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setSuccessMessage(result.message || 'Password changed successfully.')
      toast.success(result.message || 'Password changed successfully.')
      setIsChangePasswordOpen(false)
    } catch {
      setErrorMessage('Unable to change password right now. Please check old password and try again.')
      toast.error('Unable to change password right now.')
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Profile</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">Manage your account details</h1>
          </div>
          <p className="text-sm text-zinc-500">Update your basic info and maintain multiple delivery addresses.</p>
        </div>

        <section className="mt-8 rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isProfileLoading ? <p className="mb-5 text-sm text-zinc-500">Loading profile...</p> : null}
          <div className="rounded-[24px] border border-[#efe1d5] bg-[#fffdfa] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Profile Details</p>
                <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#17110d]">{[firstName, lastName].filter(Boolean).join(' ') || 'Your Profile'}</h2>
                <p className="mt-2 text-sm text-zinc-600">{countryCode} {phoneNumber}</p>
              </div>
              <button
                type="button"
                onClick={openEditProfilePopup}
                className="rounded-full border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
              >
                EDIT PROFILE
              </button>
            </div>
          </div>

          <form className="mt-7 space-y-7" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#17110d]">Addresses</h2>
                <button
                  type="button"
                  onClick={addAddress}
                  className="rounded-full border border-[#e5d7cc] px-4 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                >
                  ADD ADDRESS
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <article key={address.id} className="rounded-[24px] border border-[#efe1d5] bg-[#fffdfa] p-4 sm:p-5">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-zinc-500">Address {index + 1}</p>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">
                          <input
                            type="radio"
                            name="defaultAddress"
                            checked={address.isDefault}
                            onChange={() => setDefaultAddress(address.id)}
                          />
                          Default
                        </label>
                        <button
                          type="button"
                          onClick={() => removeAddress(address.id)}
                          disabled={!canRemoveAddress}
                          className="rounded-full border border-[#ebd0cf] px-3 py-1 text-xs font-bold tracking-[0.08em] text-rose-600 transition enabled:hover:bg-rose-600 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        Country
                        <select
                          value={address.country}
                          onChange={(event) => {
                            handleAddressChange(address.id, 'country', event.target.value)
                            handleAddressChange(address.id, 'state', '')
                          }}
                          className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        >
                          <option value="">Select country</option>
                          {countryOptions.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        State
                        <select
                          value={address.state}
                          onChange={(event) => handleAddressChange(address.id, 'state', event.target.value)}
                          className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        >
                          <option value="">Select state</option>
                          {getStateOptions(address.country).map((state) => (
                            <option key={state.code} value={state.code}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        City
                        <input
                          type="text"
                          value={address.city}
                          onChange={(event) => handleAddressChange(address.id, 'city', event.target.value)}
                          className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        House Number
                        <input
                          type="text"
                          value={address.houseNumber ?? ''}
                          onChange={(event) => handleAddressChange(address.id, 'houseNumber', event.target.value)}
                          className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        Street
                        <input
                          type="text"
                          value={address.street}
                          onChange={(event) => handleAddressChange(address.id, 'street', event.target.value)}
                          className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        Postal Code
                        <input
                          type="text"
                          value={address.postalCode}
                          onChange={(event) => handleAddressChange(address.id, 'postalCode', event.target.value)}
                          className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        Address Type
                        <select
                          value={address.addressType}
                          onChange={(event) => handleAddressChange(address.id, 'addressType', event.target.value)}
                          className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
                        </select>
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {successMessage ? <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p> : null}
            {errorMessage ? <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</p> : null}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full bg-[#111111] px-7 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? 'SAVING...' : 'SAVE ADDRESSES'}
              </button>
            </div>
          </form>
        </section>

        {isEditProfileOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl rounded-[28px] border border-[#eadfd4] bg-white p-6 shadow-[0_30px_80px_rgba(55,31,10,0.2)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#17110d]">Edit Profile Details</h2>
                  <p className="mt-1 text-sm text-zinc-500">Update first name, last name, phone number, and country code.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="rounded-full border border-[#e5d7cc] px-3 py-1 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                >
                  CLOSE
                </button>
              </div>

              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSaveProfileDetails}>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  First Name
                  <input
                    type="text"
                    value={draftFirstName}
                    onChange={(event) => setDraftFirstName(event.target.value)}
                    className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  Last Name
                  <input
                    type="text"
                    value={draftLastName}
                    onChange={(event) => setDraftLastName(event.target.value)}
                    className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  Country Code
                  <input
                    type="text"
                    value={draftCountryCode}
                    onChange={(event) => setDraftCountryCode(event.target.value)}
                    className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  Phone Number
                  <input
                    type="tel"
                    value={draftPhoneNumber}
                    onChange={(event) => setDraftPhoneNumber(event.target.value)}
                    className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="rounded-full border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProfileDetails}
                    className="rounded-full bg-[#111111] px-6 py-2 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSavingProfileDetails ? 'SAVING...' : 'SAVE PROFILE DETAILS'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <section className="mt-8 rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          <div className="rounded-[24px] border border-[#efe1d5] bg-[#fffdfa] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Security</p>
                <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#17110d]">Change Password</h2>
                <p className="mt-2 text-sm text-zinc-600">Update your account password securely from popup form.</p>
              </div>
              <button
                type="button"
                onClick={openChangePasswordPopup}
                className="rounded-full border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
              >
                OPEN CHANGE PASSWORD
              </button>
            </div>
          </div>
        </section>

        {isChangePasswordOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl rounded-[28px] border border-[#eadfd4] bg-white p-6 shadow-[0_30px_80px_rgba(55,31,10,0.2)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#17110d]">Change Password</h2>
                  <p className="mt-1 text-sm text-zinc-500">Enter old password and your new password.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="rounded-full border border-[#e5d7cc] px-3 py-1 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                >
                  CLOSE
                </button>
              </div>

              <form className="mt-6 grid gap-4 md:grid-cols-3" onSubmit={handleChangePassword}>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700 md:col-span-3">
                  Old Password
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                    className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  New Password
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700 md:col-span-2">
                  Confirm Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="h-11 rounded-xl border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsChangePasswordOpen(false)}
                    className="rounded-full border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="rounded-full bg-[#111111] px-6 py-2 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isChangingPassword ? 'UPDATING...' : 'CHANGE PASSWORD'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
