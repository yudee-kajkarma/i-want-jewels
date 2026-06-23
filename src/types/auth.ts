export type AddressPayload = {
  houseNumber?: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  addressType: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  username: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phoneNumber: string
  countryCode: string
  address: AddressPayload
}

export type VerifyOtpPayload = {
  email: string
  otp: string
}

export type UserRole = 'USER' | 'ADMIN'

export type AuthSession = {
  email: string
  username: string
  firstName: string
  lastName: string
  role: UserRole
  token?: string
  isVerified: boolean
  preferredCurrency?: 'EUR' | 'GBP'
  currencyManuallySet?: boolean
  raw?: Record<string, unknown>
}