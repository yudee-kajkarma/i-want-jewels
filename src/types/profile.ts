export type UserProfileAddressPayload = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  addressType: string
}

export type UserAddress = UserProfileAddressPayload & {
  id: string
}

export type UpdateProfileRequestPayload = {
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: string
  oldPassword?: string
  password?: string
  addresses?: Record<string, Partial<UserProfileAddressPayload>>
  removeAddresses?: number[]
}

export type UpdateProfileFormPayload = {
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: string
  oldPassword?: string
  password?: string
  addresses?: Record<string, Partial<UserProfileAddressPayload>>
  removeAddresses?: number[]
}

export type UserProfile = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: string
  role: string
  status: string
  addresses: UserProfileAddressPayload[]
}
