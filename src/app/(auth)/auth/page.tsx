// app/auth/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Auth from '@/components/shared/auth'

export default function AuthPage() {
  const router = useRouter()
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          router.push('/dashboard')
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [router])
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Auth />
    </div>
  )
}