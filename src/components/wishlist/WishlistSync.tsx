'use client'

import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAppDispatch } from '../../store/hooks'
import { fetchWishlist, resetWishlist } from '../../store/wishlistSlice'

export default function WishlistSync() {
  const { isAuthReady, isAuthenticated, session } = useAuth()
  const dispatch = useAppDispatch()
  const isAdmin = session?.role === 'ADMIN'

  useEffect(() => {
    if (!isAuthReady) {
      return
    }

    if (!isAuthenticated || isAdmin) {
      dispatch(resetWishlist())
      return
    }

    void dispatch(fetchWishlist())
  }, [dispatch, isAdmin, isAuthReady, isAuthenticated])

  return null
}