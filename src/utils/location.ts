import { Country, State } from 'country-state-city'

export type CountryOption = {
  code: string
  name: string
}

export type StateOption = {
  code: string
  name: string
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
