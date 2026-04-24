import { authApiClient } from './apiClient'
import type { UpdateProfileFormPayload, UpdateProfileRequestPayload, UserAddress, UserProfile, UserProfileAddressPayload } from '../types/profile'
import type { AdminAddress, UpdateAdminAddressPayload } from '../types/address'
import { normalizeCountryCode, normalizeStateCode } from '../utils/location'

type ApiEnvelope<T> = {
  success: boolean
  code: string
  message: string
  data?: T
}

function getStringValue(record: Record<string, unknown>, key: string): string {
  const value = record[key]

  return typeof value === 'string' ? value : ''
}

function normalizeProfileAddress(value: unknown): UserProfileAddressPayload | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const record = value as Record<string, unknown>
  const countryCode = normalizeCountryCode(getStringValue(record, 'country') || 'IN')
  const stateCode = normalizeStateCode(countryCode, getStringValue(record, 'state'))

  return {
    houseNumber: getStringValue(record, 'houseNumber'),
    street: getStringValue(record, 'street'),
    city: getStringValue(record, 'city'),
    state: stateCode,
    postalCode: getStringValue(record, 'postalCode'),
    country: countryCode || 'IN',
    isDefault: typeof record.isDefault === 'boolean' ? record.isDefault : false,
    addressType: getStringValue(record, 'addressType') || 'home',
  }
}

function normalizeUserAddress(value: unknown): UserAddress | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const record = value as Record<string, unknown>
  const normalized = normalizeProfileAddress(record)

  if (!normalized) {
    return null
  }

  return {
    id: getStringValue(record, '_id'),
    ...normalized,
  }
}

function normalizeAdminAddress(value: unknown): AdminAddress | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const record = value as Record<string, unknown>
  const countryCode = normalizeCountryCode(getStringValue(record, 'country') || 'IN')
  const stateCode = normalizeStateCode(countryCode, getStringValue(record, 'state'))

  return {
    id: getStringValue(record, '_id'),
    street: getStringValue(record, 'street'),
    houseNumber: getStringValue(record, 'houseNumber'),
    city: getStringValue(record, 'city'),
    state: stateCode,
    postalCode: getStringValue(record, 'postalCode'),
    country: countryCode || 'IN',
    isDefault: typeof record.isDefault === 'boolean' ? record.isDefault : false,
    addressType: getStringValue(record, 'addressType') || 'work',
  }
}

function normalizeUserProfile(data: unknown): UserProfile {
  const dataRecord = data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : {}
  const userRecordRaw = dataRecord.user
  const userRecord = userRecordRaw && typeof userRecordRaw === 'object' && !Array.isArray(userRecordRaw) ? (userRecordRaw as Record<string, unknown>) : {}
  const rawAddresses = Array.isArray(userRecord.addresses) ? userRecord.addresses : []
  const parsedAddresses = rawAddresses.map(normalizeProfileAddress).filter((address): address is UserProfileAddressPayload => address !== null)
  const hasDefaultAddress = parsedAddresses.some((address) => address.isDefault)

  const addresses = parsedAddresses.length > 0
    ? parsedAddresses.map((address, index) => ({
        ...address,
        isDefault: hasDefaultAddress ? address.isDefault : index === 0,
      }))
    : [
        {
          houseNumber: '',
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'IN',
          isDefault: true,
          addressType: 'home',
        },
      ]

  return {
    id: getStringValue(userRecord, '_id'),
    username: getStringValue(userRecord, 'username'),
    email: getStringValue(userRecord, 'email'),
    firstName: getStringValue(userRecord, 'firstName'),
    lastName: getStringValue(userRecord, 'lastName'),
    phoneNumber: getStringValue(userRecord, 'phoneNumber'),
    countryCode: getStringValue(userRecord, 'countryCode') || '+91',
    role: getStringValue(userRecord, 'role'),
    status: getStringValue(userRecord, 'status'),
    addresses,
  }
}

export async function updateUserProfile(payload: UpdateProfileFormPayload): Promise<{ message: string }> {
  const requestPayload: UpdateProfileRequestPayload = {
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    phoneNumber: payload.phoneNumber.trim(),
    countryCode: payload.countryCode.trim(),
    oldPassword: payload.oldPassword?.trim() || undefined,
    password: payload.password?.trim() || undefined,
    addresses: payload.addresses,
    removeAddresses: payload.removeAddresses,
  }

  const response = await authApiClient.post<ApiEnvelope<unknown>>('/users/update-profile', requestPayload)

  return {
    message: response.data.message || 'Profile updated successfully.',
  }
}

export async function getUserProfile(): Promise<UserProfile> {
  const response = await authApiClient.get<ApiEnvelope<unknown>>('/users/profile')

  return normalizeUserProfile(response.data.data)
}

export async function getUserAddresses(): Promise<UserAddress[]> {
  const response = await authApiClient.get<ApiEnvelope<unknown>>('/addresses')
  const dataRecord = response.data.data && typeof response.data.data === 'object' && !Array.isArray(response.data.data)
    ? (response.data.data as Record<string, unknown>)
    : {}
  const rawAddresses = Array.isArray(dataRecord.addresses) ? dataRecord.addresses : []

  return rawAddresses.map(normalizeUserAddress).filter((address): address is UserAddress => Boolean(address && address.id))
}

export async function createUserAddress(payload: UserProfileAddressPayload): Promise<UserAddress> {
  const response = await authApiClient.post<ApiEnvelope<unknown>>('/addresses', payload)
  const dataRecord = response.data.data && typeof response.data.data === 'object' && !Array.isArray(response.data.data)
    ? (response.data.data as Record<string, unknown>)
    : {}
  const normalized = normalizeUserAddress(dataRecord.address ?? response.data.data)

  if (!normalized || !normalized.id) {
    throw new Error('Invalid address response')
  }

  return normalized
}

export async function updateUserAddress(addressId: string, payload: Partial<UserProfileAddressPayload>): Promise<void> {
  await authApiClient.put(`/addresses/${addressId}`, payload)
}

export async function deleteUserAddress(addressId: string): Promise<void> {
  await authApiClient.delete(`/addresses/${addressId}`)
}

export async function setDefaultUserAddress(addressId: string): Promise<void> {
  await authApiClient.patch(`/addresses/${addressId}/set-default`)
}

export async function getAdminAddress(): Promise<AdminAddress | null> {
  const response = await authApiClient.get<ApiEnvelope<unknown>>('/addresses/admin/me')
  const dataRecord = response.data.data && typeof response.data.data === 'object' && !Array.isArray(response.data.data)
    ? (response.data.data as Record<string, unknown>)
    : {}

  return normalizeAdminAddress(dataRecord.address)
}

export async function updateAdminAddress(payload: UpdateAdminAddressPayload): Promise<void> {
  await authApiClient.put('/addresses/admin/me', payload)
}
