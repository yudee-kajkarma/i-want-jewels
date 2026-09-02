'use client'

import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAppDispatch } from '../../store/hooks'
import { fetchCart, resetCart } from '../../store/cartSlice'
import { getGuestCartId } from '../../utils/guestCart'

export default function CartSync() {
  const { isAuthReady, isAuthenticated, session } = useAuth()
  const dispatch = useAppDispatch()
  const isAdmin = session?.role === 'ADMIN'

  useEffect(() => {
    if (!isAuthReady) {
      return
    }

    // Admins do not shop, so they never carry a basket.
    if (isAdmin) {
      dispatch(resetCart())
      return
    }

    // Guests have a cart too: the server resolves it from the stored id. With
    // no id there is nothing to fetch yet, and asking would mint an empty cart
    // document on every page view.
    if (!isAuthenticated && !getGuestCartId()) {
      dispatch(resetCart())
      return
    }

    void dispatch(fetchCart())
  }, [dispatch, isAdmin, isAuthReady, isAuthenticated])

  return null
}