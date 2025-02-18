// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'
import ProtectedRoute from '@/components/shared/protected-route'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    
    getUser()
  }, [])
  
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  }
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {user && (
          <div className="mb-6">
            <p className="text-gray-600">Logged in as: {user.email}</p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </ProtectedRoute>
  )
}