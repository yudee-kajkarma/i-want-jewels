'use client'

import CheckoutStatusPage from '../../../../views/CheckoutStatusPage'

// A guest returns here from Stripe, so this page must not require an account.
export default function Page() {
  return <CheckoutStatusPage />
}
