'use client'

import CartPage from '../../../views/CartPage'

// Guests build a basket before signing in, so the cart is open to everyone.
export default function Page() {
  return <CartPage />
}
