'use client'

import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { completeGoogleProfile } from '../../services/authService'
import type { AuthSession } from '../../types/auth'
import {
    getCountryOptions,
    getDialCodeForCountry,
    getDialCodeOptions,
    getStateOptions,
    isValidPostalCode,
} from '../../utils/location'

type Props = {
    pendingToken: string
    email: string
    firstName: string
    lastName: string
    onCompleted: (session: AuthSession) => void
    onCancel: () => void
}

/**
 * Second half of a Google signup. Google gives us a name and an email, but an
 * order needs a phone and an address — so the account stays unusable until
 * this is submitted. Abandoning the page leaves nothing behind: the pending
 * token expires and cannot act as a session.
 */
export default function CompleteGoogleProfile({
    pendingToken,
    email,
    firstName: initialFirstName,
    lastName: initialLastName,
    onCompleted,
    onCancel,
}: Props) {
    const { t } = useTranslation()

    const countryOptions = useMemo(() => getCountryOptions(), [])
    const dialCodeOptions = useMemo(() => getDialCodeOptions(), [])

    const [firstName, setFirstName] = useState(initialFirstName)
    const [lastName, setLastName] = useState(initialLastName)
    const [countryCode, setCountryCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    const stateOptions = useMemo(() => getStateOptions(country), [country])

    const postalCodeError =
        postalCode.trim() && country && !isValidPostalCode(postalCode, country)
            ? t('auth.validPostalCodeError')
            : ''

    const isValid =
        firstName.trim() &&
        lastName.trim() &&
        countryCode.trim() &&
        phoneNumber.trim() &&
        street.trim() &&
        city.trim() &&
        postalCode.trim() &&
        country.trim() &&
        !postalCodeError

    // The dialling code follows the country the customer picks, but stays
    // editable — someone can live abroad and keep a home mobile number.
    function handleCountryChange(nextCountry: string) {
        setCountry(nextCountry)
        setState('')
        if (!countryCode) {
            const derived = getDialCodeForCountry(nextCountry)
            if (derived) setCountryCode(derived)
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!isValid || isSaving) return

        setIsSaving(true)
        setError('')

        try {
            const session = await completeGoogleProfile(pendingToken, {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phoneNumber: phoneNumber.trim(),
                countryCode: countryCode.trim(),
                address: {
                    street: street.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    postalCode: postalCode.trim(),
                    country: country.trim(),
                },
            })
            onCompleted(session)
        } catch (err: unknown) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                t('auth.completeProfileError', { defaultValue: 'Could not complete your profile. Please try again.' })
            setError(message)
        } finally {
            setIsSaving(false)
        }
    }

    const inputClass =
        'h-12 w-full border border-[#ddcdc0] px-4 text-sm outline-none transition focus:border-[#17110d]'
    const labelClass = 'mb-2 block text-sm font-semibold text-[#17110d]'

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-[#17110d]">
                    {t('auth.completeProfileTitle', { defaultValue: 'Complete your profile' })}
                </h2>
                <p className="mt-1 text-sm text-[#6b5a4e]">
                    {t('auth.completeProfileSubtitle', {
                        defaultValue: 'We need a phone number and delivery address before you can order.',
                    })}
                </p>
                <p className="mt-1 text-xs text-[#8a7a6d]">{email}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className={labelClass}>{t('auth.firstName')}</span>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className={inputClass} />
                </label>
                <label className="block">
                    <span className={labelClass}>{t('auth.lastName')}</span>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} required className={inputClass} />
                </label>
            </div>

            <label className="block">
                <span className={labelClass}>{t('auth.countryLabel', { defaultValue: 'Country' })}</span>
                <select value={country} onChange={(e) => handleCountryChange(e.target.value)} required className={inputClass}>
                    <option value="">{t('auth.selectCountry', { defaultValue: 'Select country' })}</option>
                    {countryOptions.map((c) => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                </select>
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className={labelClass}>{t('auth.countryCode')}</span>
                    <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required className={inputClass}>
                        <option value="">{t('auth.countryCode')}</option>
                        {dialCodeOptions.map((d) => (
                            <option key={d.countryCode} value={d.dialCode}>{d.name} ({d.dialCode})</option>
                        ))}
                    </select>
                </label>
                <label className="block">
                    <span className={labelClass}>{t('auth.phoneNumber')}</span>
                    <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className={inputClass} />
                </label>
            </div>

            <label className="block">
                <span className={labelClass}>{t('auth.street', { defaultValue: 'Street address' })}</span>
                <input value={street} onChange={(e) => setStreet(e.target.value)} required className={inputClass} />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                    <span className={labelClass}>{t('auth.city', { defaultValue: 'City' })}</span>
                    <input value={city} onChange={(e) => setCity(e.target.value)} required className={inputClass} />
                </label>
                <label className="block">
                    <span className={labelClass}>{t('auth.stateLabel', { defaultValue: 'State / Region' })}</span>
                    {stateOptions.length > 0 ? (
                        <select value={state} onChange={(e) => setState(e.target.value)} className={inputClass}>
                            <option value="">{t('auth.selectState', { defaultValue: 'Select state' })}</option>
                            {stateOptions.map((s) => (
                                <option key={s.code} value={s.code}>{s.name}</option>
                            ))}
                        </select>
                    ) : (
                        <input value={state} onChange={(e) => setState(e.target.value)} className={inputClass} />
                    )}
                </label>
            </div>

            <label className="block">
                <span className={labelClass}>{t('auth.postalCode', { defaultValue: 'Postal code' })}</span>
                <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className={inputClass} />
                {postalCodeError ? <span className="mt-1 block text-xs text-rose-600">{postalCodeError}</span> : null}
            </label>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <div className="flex items-center gap-3 pt-2">
                <button
                    type="submit"
                    disabled={!isValid || isSaving}
                    className="h-12 flex-1 bg-[#17110d] text-sm font-semibold text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSaving
                        ? t('auth.saving', { defaultValue: 'Saving…' })
                        : t('auth.finishSignup', { defaultValue: 'Finish signing up' })}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSaving}
                    className="h-12 border border-[#ddcdc0] px-5 text-sm font-semibold text-[#17110d] transition hover:bg-[#f7f1ea] disabled:opacity-60"
                >
                    {t('checkout.cancel', { defaultValue: 'Cancel' })}
                </button>
            </div>
        </form>
    )
}
