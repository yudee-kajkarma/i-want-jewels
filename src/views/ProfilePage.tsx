'use client'

import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import GiftCardsSection from '../components/giftcard/GiftCardsSection'
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
import { getCountryOptions, getStateOptions, isValidPostalCode, normalizeCountryCode, normalizeStateCode } from '../utils/location'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const { session, saveSession } = useAuth()
  const { applyAddressCountry } = useCurrency()
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
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [savingAddressId, setSavingAddressId] = useState<string | null>(null)
  const [isSavingProfileDetails, setIsSavingProfileDetails] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [postalCodeErrorsByAddressId, setPostalCodeErrorsByAddressId] = useState<Record<string, string>>({})
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const countryOptions = useMemo(() => getCountryOptions(), [])

  const canRemoveAddress = useMemo(() => addresses.length > 1, [addresses.length])

  function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
    if (!axios.isAxiosError(error)) {
      return fallbackMessage
    }

    const responseData = error.response?.data

    if (!responseData || typeof responseData !== 'object' || Array.isArray(responseData)) {
      return fallbackMessage
    }

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

    return fallbackMessage
  }

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

        setErrorMessage(t('profile.profileLoadError'))
        toast.error(t('profile.profileLoadErrorToast'))
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
    if (field === 'postalCode') {
      setPostalCodeErrorsByAddressId((currentValue) => {
        if (!currentValue[id]) {
          return currentValue
        }

        const { [id]: _removed, ...remaining } = currentValue
        return remaining
      })
    }

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
    setAddresses((currentAddresses) => {
      const nextAddresses = currentAddresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))

      const selectedAddress = nextAddresses.find((address) => address.id === id)

      if (selectedAddress?.apiId) {
        applyAddressCountry(selectedAddress.country)
        void setDefaultUserAddress(selectedAddress.apiId).catch((error) => {
          const message = getApiErrorMessage(error, t('profile.setDefaultAddressError'))
          setErrorMessage(message)
          toast.error(message)
        })
      }

      return nextAddresses
    })
  }

  function addAddress() {
    setAddresses((currentAddresses) => [...currentAddresses, createAddress()])
  }

  function removeAddress(id: string) {
    const removedAddress = addresses.find((address) => address.id === id)

    if (!removedAddress) {
      return
    }

    if (removedAddress.apiId) {
      void (async () => {
        try {
          await deleteUserAddress(removedAddress.apiId as string)
          setSuccessMessage(t('profile.addressRemoved'))
          toast.success(t('profile.addressRemoved'))
        } catch (error) {
          const message = getApiErrorMessage(error, t('profile.addressRemoveError'))
          setErrorMessage(message)
          toast.error(message)
          return
        }

        setAddresses((currentAddresses) => {
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
      })()

      return
    }

    setAddresses((currentAddresses) => {
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

  function buildAddressPayload(address: AddressFormItem): UserProfileAddressPayload {
    const normalizedCountry = normalizeCountryCode(address.country).trim().toUpperCase()
    const normalizedState = normalizeStateCode(normalizedCountry, address.state)

    return {
      houseNumber: (address.houseNumber ?? '').trim(),
      street: address.street.trim(),
      city: address.city.trim(),
      state: normalizedState,
      postalCode: address.postalCode.trim(),
      country: normalizedCountry,
      isDefault: address.isDefault,
      addressType: address.addressType.trim() || 'home',
    }
  }

  async function saveAddress(addressId: string) {
    const address = addresses.find((item) => item.id === addressId)

    if (!address || savingAddressId) {
      return
    }

    const payload = buildAddressPayload(address)

    setPostalCodeErrorsByAddressId((currentValue) => {
      if (!currentValue[addressId]) {
        return currentValue
      }

      const { [addressId]: _removed, ...remaining } = currentValue
      return remaining
    })

    if (!payload.street || !payload.city || !payload.state || !payload.postalCode || !payload.country) {
      setErrorMessage(t('profile.completeAddressFields'))
      toast.error(t('profile.completeAddressFields'))
      return
    }

    if (!isValidPostalCode(payload.postalCode, payload.country)) {
      setPostalCodeErrorsByAddressId((currentValue) => ({
        ...currentValue,
        [addressId]: t('profile.validPostalCode'),
      }))
      return
    }

    setSavingAddressId(addressId)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      if (!address.apiId) {
        const createdAddress = await createUserAddress(payload)

        setAddresses((currentAddresses) =>
          currentAddresses.map((item) => (item.id === addressId ? { ...item, apiId: createdAddress.id } : item)),
        )

        setInitialAddressesById((currentValue) => ({
          ...currentValue,
          [createdAddress.id]: payload,
        }))

        if (payload.isDefault) {
          await setDefaultUserAddress(createdAddress.id)
        }

        applyAddressCountry(payload.country)
        setSuccessMessage(t('profile.addressAdded'))
        toast.success(t('profile.addressAdded'))
        return
      }

      const initialAddress = initialAddressesById[address.apiId]

      if (!initialAddress) {
        await updateUserAddress(address.apiId, payload)
      } else {
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

      if (payload.isDefault) {
        await setDefaultUserAddress(address.apiId)
      }

      setInitialAddressesById((currentValue) => ({
        ...currentValue,
        [address.apiId as string]: payload,
      }))
      applyAddressCountry(payload.country)
      setSuccessMessage(t('profile.addressUpdated'))
      toast.success(t('profile.addressUpdated'))
    } catch (error) {
      const message = getApiErrorMessage(error, t('profile.addressSaveError'))
      setErrorMessage(message)
      toast.error(message)
    } finally {
      setSavingAddressId(null)
    }
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

      setSuccessMessage(result.message || t('profile.profileUpdated'))
      toast.success(result.message || t('profile.profileUpdated'))
      setIsEditProfileOpen(false)
    } catch {
      setErrorMessage(t('profile.profileUpdateError'))
      toast.error(t('profile.profileUpdateErrorToast'))
    } finally {
      setIsSavingProfileDetails(false)
    }
  }

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage(t('profile.passwordFillError'))
      toast.error(t('profile.passwordFillErrorToast'))
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(t('profile.newPasswordMismatch'))
      toast.error(t('profile.newPasswordMismatchToast'))
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
      setSuccessMessage(result.message || t('profile.passwordChanged'))
      toast.success(result.message || t('profile.passwordChanged'))
      setIsChangePasswordOpen(false)
    } catch {
      setErrorMessage(t('profile.passwordChangeError'))
      toast.error(t('profile.passwordChangeErrorToast'))
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('profile.title')}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">{t('profile.manageAccount')}</h1>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <p className="text-sm text-zinc-500">{t('profile.updateBasicInfo')}</p>
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById('gift-cards')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="text-xs font-bold uppercase tracking-[0.18em] text-[#a53b79] underline-offset-4 hover:underline"
            >
              {t('profile.viewGiftCards')}
            </button>
          </div>
        </div>

        <section className="mt-8 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isProfileLoading ? <p className="mb-5 text-sm text-zinc-500">{t('profile.loadingProfile')}</p> : null}
          <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{t('profile.profileDetails')}</p>
                <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#17110d]">{[firstName, lastName].filter(Boolean).join(' ') || t('profile.yourProfile')}</h2>
                <p className="mt-2 text-sm text-zinc-600">{countryCode} {phoneNumber}</p>
              </div>
              <button
                type="button"
                onClick={openEditProfilePopup}
                className="border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
              >
                {t('profile.editProfile')}
              </button>
            </div>
          </div>

          <div className="mt-7 space-y-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#17110d]">{t('profile.addressesTitle')}</h2>
                <button
                  type="button"
                  onClick={addAddress}
                  className="border border-[#e5d7cc] px-4 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                >
                  {t('profile.addAddressTitle')}
                </button>
              </div>

              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <article key={address.id} className="border border-[#efe1d5] bg-[#fffdfa] p-4 sm:p-5">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-zinc-500">{t('profile.addressIndex', { index: index + 1 })}</p>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">
                          <input
                            type="radio"
                            name="defaultAddress"
                            checked={address.isDefault}
                            onChange={() => setDefaultAddress(address.id)}
                          />
                          {t('profile.default')}
                        </label>
                        <button
                          type="button"
                          onClick={() => removeAddress(address.id)}
                          disabled={!canRemoveAddress}
                          className="border border-[#ebd0cf] px-3 py-1 text-xs font-bold tracking-[0.08em] text-rose-600 transition enabled:hover:bg-rose-600 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {t('profile.removeAddress')}
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        {t('auth.country')}
                        <select
                          value={address.country}
                          onChange={(event) => {
                            handleAddressChange(address.id, 'country', event.target.value)
                            handleAddressChange(address.id, 'state', '')
                            handleAddressChange(address.id, 'city', '')
                          }}
                          className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        >
                          <option value="">{t('checkout.selectCountry')}</option>
                          {countryOptions.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        {t('auth.state')}
                        <select
                          value={address.state}
                          onChange={(event) => {
                            handleAddressChange(address.id, 'state', event.target.value)
                            handleAddressChange(address.id, 'city', '')
                          }}
                          className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        >
                          <option value="">{t('checkout.selectState')}</option>
                          {getStateOptions(address.country).map((state) => (
                            <option key={state.code} value={state.code}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        {t('auth.city')}
                        <input
                          type="text"
                          value={address.city}
                          onChange={(event) => handleAddressChange(address.id, 'city', event.target.value)}
                          className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          placeholder={t('auth.city')}
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        {t('checkout.houseNumber')}
                        <input
                          type="text"
                          value={address.houseNumber ?? ''}
                          onChange={(event) => handleAddressChange(address.id, 'houseNumber', event.target.value)}
                          className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        {t('auth.street')}
                        <input
                          type="text"
                          value={address.street}
                          onChange={(event) => handleAddressChange(address.id, 'street', event.target.value)}
                          className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        {t('auth.postalCode')}
                        <input
                          type="text"
                          value={address.postalCode}
                          onChange={(event) => handleAddressChange(address.id, 'postalCode', event.target.value)}
                          className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          required
                        />
                        {postalCodeErrorsByAddressId[address.id] ? (
                          <p className="text-xs font-medium text-rose-700">{postalCodeErrorsByAddressId[address.id]}</p>
                        ) : null}
                      </label>
                      <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                        {t('checkout.addressType')}
                        <input
                          type="text"
                          value={address.addressType}
                          onChange={(event) => handleAddressChange(address.id, 'addressType', event.target.value)}
                          className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                          placeholder={t('profile.addressTypePlaceholder')}
                        />
                      </label>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => void saveAddress(address.id)}
                        disabled={savingAddressId !== null}
                        className="bg-[#111111] px-5 py-2 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {savingAddressId === address.id
                          ? (address.apiId ? t('profile.updating') : t('profile.adding'))
                          : (address.apiId ? t('profile.updateAddressBtn') : t('profile.addAddressBtn'))}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {successMessage ? <p className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</p> : null}
            {errorMessage ? <p className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{errorMessage}</p> : null}

          </div>
        </section>

        {isEditProfileOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl border border-[#eadfd4] bg-white p-6 shadow-[0_30px_80px_rgba(55,31,10,0.2)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#17110d]">{t('profile.editProfileDetails')}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{t('profile.updateProfileDesc')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="border border-[#e5d7cc] px-3 py-1 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                >
                  {t('profile.close')}
                </button>
              </div>

              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSaveProfileDetails}>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  {t('auth.firstName')}
                  <input
                    type="text"
                    value={draftFirstName}
                    onChange={(event) => setDraftFirstName(event.target.value)}
                    className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  {t('auth.lastName')}
                  <input
                    type="text"
                    value={draftLastName}
                    onChange={(event) => setDraftLastName(event.target.value)}
                    className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  {t('auth.countryCode')}
                  <input
                    type="text"
                    value={draftCountryCode}
                    onChange={(event) => setDraftCountryCode(event.target.value)}
                    className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  {t('auth.phoneNumber')}
                  <input
                    type="tel"
                    value={draftPhoneNumber}
                    onChange={(event) => setDraftPhoneNumber(event.target.value)}
                    className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                  >
                    {t('checkout.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProfileDetails}
                    className="bg-[#111111] px-6 py-2 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSavingProfileDetails ? t('profile.saving') : t('profile.saveProfileDetails')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}

        <section className="mt-8 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{t('profile.security')}</p>
                <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-[#17110d]">{t('profile.changePassword')}</h2>
                <p className="mt-2 text-sm text-zinc-600">{t('profile.changePasswordDesc')}</p>
              </div>
              <button
                type="button"
                onClick={openChangePasswordPopup}
                className="border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
              >
                {t('profile.openChangePassword')}
              </button>
            </div>
          </div>
        </section>

        <section id="gift-cards" className="mt-8 scroll-mt-28 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          <GiftCardsSection />
        </section>

        {isChangePasswordOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl border border-[#eadfd4] bg-white p-6 shadow-[0_30px_80px_rgba(55,31,10,0.2)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-[-0.03em] text-[#17110d]">{t('profile.changePassword')}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{t('profile.enterOldNewPassword')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="border border-[#e5d7cc] px-3 py-1 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                >
                  {t('profile.close')}
                </button>
              </div>

              <form className="mt-6 grid gap-4 md:grid-cols-3" onSubmit={handleChangePassword}>
                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700 md:col-span-3">
                  {t('profile.oldPasswordLabel')}
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                    className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
                  {t('profile.newPasswordLabel')}
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-700 md:col-span-2">
                  {t('auth.confirmPassword')}
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="h-11 border border-[#e7d8ca] bg-white px-4 text-sm font-medium text-zinc-800 outline-none transition focus:border-zinc-800"
                    required
                  />
                </label>

                <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsChangePasswordOpen(false)}
                    className="border border-[#e5d7cc] px-5 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                  >
                    {t('checkout.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="bg-[#111111] px-6 py-2 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isChangingPassword ? t('profile.updating') : t('profile.changePassword')}
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
