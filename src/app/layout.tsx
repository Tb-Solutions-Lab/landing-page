// app/layout.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      await supabase.auth.getSession()
      setIsInitialized(true)
    }

    initializeAuth()
  }, [])

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  return (
    <html lang="en">
      <body><ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider></body>
    </html>
  )
}