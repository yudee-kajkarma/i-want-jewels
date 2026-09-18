'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { initializeClarity, tagClarity } from '../../lib/clarity'

export default function ClarityAnalytics() {
  const { isAuthReady, isAuthenticated, session } = useAuth()
  const pathname = usePathname()
  useEffect(() => {
    if (isAuthReady && session?.role !== 'ADMIN' && initializeClarity()) tagClarity('customer_type', isAuthenticated ? 'signed_in' : 'guest')
  }, [isAuthReady, isAuthenticated, session?.role, pathname])
  return null
}
