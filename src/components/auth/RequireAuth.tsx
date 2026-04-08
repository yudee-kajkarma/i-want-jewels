'use client'

import { Navigate, useLocation } from '@/lib/router'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types/auth'

export default function RequireAuth({
  children,
  allowedRoles,
}: {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}) {
  const { isAuthenticated, isAuthReady, session } = useAuth()
  const location = useLocation()

  if (!isAuthReady) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRoles && session && !allowedRoles.includes(session.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}