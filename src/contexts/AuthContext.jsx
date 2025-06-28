import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
        }
        setUser(session?.user ?? null)
      } catch (err) {
        console.error('Unexpected error getting session:', err)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, userData = {}) => {
    try {
      console.log('Attempting signup for:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name || '',
            full_name: userData.name || ''
          }
        }
      })
      
      console.log('Signup response:', { data, error })
      
      if (error) {
        console.error('Signup error:', error)
        throw error
      }
      
      // If user is created but no session (email confirmation required)
      if (data.user && !data.session) {
        console.log('Email confirmation required')
        return { 
          user: data.user, 
          session: null, 
          emailConfirmationRequired: true 
        }
      }
      
      // If user is created and has session (immediate login)
      if (data.user && data.session) {
        console.log('User created and logged in immediately')
        
        // Try to create/update profile manually if trigger fails
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.user.id,
              email: data.user.email,
              name: userData.name || ''
            })
          
          if (profileError) {
            console.warn('Profile creation warning:', profileError)
            // Don't throw error, profile might be created by trigger
          }
        } catch (profileErr) {
          console.warn('Profile creation failed, but continuing:', profileErr)
        }
      }
      
      return data
    } catch (err) {
      console.error('Signup failed:', err)
      throw err
    }
  }

  const signIn = async (email, password) => {
    try {
      console.log('Attempting signin for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      console.log('Signin response:', { data, error })
      
      if (error) {
        console.error('Signin error:', error)
        throw error
      }
      
      return data
    } catch (err) {
      console.error('Signin failed:', err)
      throw err
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Signout error:', error)
        throw error
      }
    } catch (err) {
      console.error('Signout failed:', err)
      throw err
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
