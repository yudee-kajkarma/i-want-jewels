import { City, Country, State } from 'country-state-city'
import isEmail from 'validator/lib/isEmail'
import isPostalCode from 'validator/lib/isPostalCode'

export type CountryOption = {
  code: string
  name: string
}

export type StateOption = {
  code: string
  name: string
}

export type CityOption = {
  name: string
}

export type DialCodeOption = {
  dialCode: string
  countryCode: string
  name: string
}

// A handful of calling codes are shared by several countries. Pick one country
// to represent each so the dial-code list has exactly one entry per code and a
// stored value always maps back to a single option.
const PRIMARY_DIAL_COUNTRY: Record<string, string> = {
  '+1': 'US',
  '+7': 'RU',
  '+47': 'NO',
  '+61': 'AU',
  '+212': 'MA',
  '+262': 'RE',
  '+500': 'FK',
  '+590': 'GP',
  '+599': 'CW',
  '+672': 'NF',
}

/**
 * `country-state-city` stores phonecode inconsistently: most countries carry
 * bare digits ('82'), while dependent territories carry a '+' and a trailing
 * area code ('+1-787 and 1-939'). Reduce either shape to the country calling
 * code on its own, in '+82' form.
 */
export function normalizeDialCode(value: string | undefined | null): string {
  const firstVariant = (value ?? '').trim().split(/\s+and\s+/)[0] ?? ''
  const digits = firstVariant.replace(/^\+/, '').split('-')[0]?.replace(/\D/g, '') ?? ''

  return digits ? `+${digits}` : ''
}

export function getDialCodeForCountry(countryCode: string | undefined | null): string {
  const iso = normalizeCountryCode(countryCode ?? '').toUpperCase()

  if (!iso) {
    return ''
  }

  return normalizeDialCode(Country.getCountryByCode(iso)?.phonecode)
}

export function getDialCodeOptions(): DialCodeOption[] {
  const byDialCode = new Map<string, DialCodeOption & { rank: number }>()

  for (const country of Country.getAllCountries()) {
    const dialCode = normalizeDialCode(country.phonecode)

    if (!dialCode) {
      continue
    }

    // Dependent territories carry a '+' prefixed phonecode, sovereign countries
    // carry bare digits. Rank an explicit primary first, then any sovereign
    // country, then territories — so '+358' resolves to Finland, not Åland.
    const isTerritory = (country.phonecode ?? '').trim().startsWith('+')
    const rank = PRIMARY_DIAL_COUNTRY[dialCode] === country.isoCode ? 2 : isTerritory ? 0 : 1
    const existing = byDialCode.get(dialCode)

    if (!existing || rank > existing.rank) {
      byDialCode.set(dialCode, {
        dialCode,
        countryCode: country.isoCode,
        name: country.name,
        rank,
      })
    }
  }

  return [...byDialCode.values()]
    .map((option) => ({
      dialCode: option.dialCode,
      countryCode: option.countryCode,
      name: option.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getCountryOptions(): CountryOption[] {
  return Country.getAllCountries().map((country) => ({
    code: country.isoCode,
    name: country.name,
  }))
}

export function getStateOptions(countryCode: string): StateOption[] {
  if (!countryCode) {
    return []
  }

  return State.getStatesOfCountry(countryCode).map((state) => ({
    code: state.isoCode,
    name: state.name,
  }))
}

export function getCityOptions(countryCode: string, stateCode: string): CityOption[] {
  if (!countryCode || !stateCode) {
    return []
  }

  return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
    name: city.name,
  }))
}

export function isValidEmailAddress(value: string): boolean {
  return isEmail(value.trim())
}

function normalizePostalCountryCode(countryCode: string): string {
  const normalizedCode = countryCode.trim().toUpperCase()

  if (normalizedCode === 'UK') {
    return 'GB'
  }

  return normalizedCode
}

export function validatePostalCode(value: string, countryCode: string): boolean {
  const normalizedValue = value.trim()
  const normalizedCountryCode = normalizePostalCountryCode(countryCode)

  if (!normalizedValue || !normalizedCountryCode) {
    return false
  }

  return isPostalCode(normalizedValue, normalizedCountryCode as Parameters<typeof isPostalCode>[1])
}

export function isValidPostalCode(value: string, countryCode?: string): boolean {
  if (countryCode && countryCode.trim()) {
    return validatePostalCode(value, countryCode)
  }

  const normalizedValue = value.trim()

  if (!normalizedValue) {
    return false
  }

  return isPostalCode(normalizedValue, 'any')
}

export function normalizeCountryCode(value: string): string {
  const rawValue = value.trim()

  if (!rawValue) {
    return ''
  }

  const uppercaseValue = rawValue.toUpperCase()
  const matchedByCode = Country.getCountryByCode(uppercaseValue)

  if (matchedByCode) {
    return matchedByCode.isoCode
  }

  const matchedByName = Country.getAllCountries().find(
    (country) => country.name.toLowerCase() === rawValue.toLowerCase(),
  )

  return matchedByName?.isoCode ?? rawValue
}

export function normalizeStateCode(countryCode: string, value: string): string {
  const rawValue = value.trim()

  if (!rawValue || !countryCode) {
    return rawValue
  }

  const states = State.getStatesOfCountry(countryCode)
  const uppercaseValue = rawValue.toUpperCase()
  const matchedByCode = states.find((state) => state.isoCode.toUpperCase() === uppercaseValue)

  if (matchedByCode) {
    return matchedByCode.isoCode
  }

  const matchedByName = states.find((state) => state.name.toLowerCase() === rawValue.toLowerCase())

  return matchedByName?.isoCode ?? rawValue
}

export function getCountryName(countryCode: string): string {
  const code = countryCode.trim().toUpperCase()

  if (!code) {
    return ''
  }

  return Country.getCountryByCode(code)?.name ?? countryCode
}

export function getStateName(countryCode: string, stateCode: string): string {
  const country = countryCode.trim().toUpperCase()
  const state = stateCode.trim().toUpperCase()

  if (!country || !state) {
    return stateCode
  }

  const foundState = State.getStateByCodeAndCountry(state, country)

  return foundState?.name ?? stateCode
}
