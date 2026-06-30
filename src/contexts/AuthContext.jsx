import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signUp = (email, password, meta) => {
    if (!isSupabaseConfigured) return Promise.resolve({ error: { message: 'Supabase not configured. Add .env.local with your keys.' } })
    return supabase.auth.signUp({ email, password, options: { data: meta } })
  }

  const signIn = (email, password) => {
    if (!isSupabaseConfigured) return Promise.resolve({ error: { message: 'Supabase not configured. Add .env.local with your keys.' } })
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = () => {
    if (!isSupabaseConfigured) return Promise.resolve()
    return supabase.auth.signOut()
  }

  const resetPassword = (email) => {
    if (!isSupabaseConfigured) return Promise.resolve({ error: { message: 'Supabase not configured.' } })
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, resetPassword, isConfigured: isSupabaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
