export type AdminAddress = {
  id: string
  street: string
  houseNumber: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  addressType: string
}

export type UpdateAdminAddressPayload = {
  street: string
  houseNumber: string
  city: string
  state: string
  postalCode: string
  country: string
  addressType: string
}
