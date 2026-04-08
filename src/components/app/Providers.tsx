'use client'

import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '../../context/AuthContext'
import { store } from '../../store/store'
import CartSync from '../cart/CartSync'
import WishlistSync from '../wishlist/WishlistSync'

export default function Providers({ children }: { children: ReactNode }) {
  const toastStyle = {
    background: '#1f1611',
    color: '#fff6ed',
    border: '1px solid #594233',
    boxShadow: '0 20px 48px rgba(31, 22, 17, 0.24)',
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <CartSync />
        <WishlistSync />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: toastStyle,
            success: {
              style: toastStyle,
              iconTheme: {
                primary: '#d3a16d',
                secondary: '#1f1611',
              },
            },
            error: {
              style: toastStyle,
              iconTheme: {
                primary: '#f87171',
                secondary: '#1f1611',
              },
            },
          }}
        />
      </AuthProvider>
    </Provider>
  )
}