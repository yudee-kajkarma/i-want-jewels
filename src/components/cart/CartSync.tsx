'use client'

import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAppDispatch } from '../../store/hooks'
import { fetchCart, resetCart } from '../../store/cartSlice'

export default function CartSync() {
  const { isAuthReady, isAuthenticated, session } = useAuth()
  const dispatch = useAppDispatch()
  const isAdmin = session?.role === 'ADMIN'

  useEffect(() => {
    if (!isAuthReady) {
      return
    }

    if (!isAuthenticated || isAdmin) {
      dispatch(resetCart())
      return
    }

    void dispatch(fetchCart())
  }, [dispatch, isAdmin, isAuthReady, isAuthenticated])

  return null
}