import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase, isDemoMode } from '../lib/supabase'
import { Profile, UserRole } from '../types'
import { useNotifications, Notification as NotificationType } from '../hooks/useNotifications'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  notifications: NotificationType[]
  unreadNotifications: NotificationType[]
  signIn: (email: string, password: string) => Promise<{ error: any; role?: UserRole }>
  signUp: (email: string, password: string, fullName: string, role: UserRole, phone?: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// ---- Demo accounts (fake/test) ----
export const DEMO_ACCOUNTS: Record<string, { password: string; role: UserRole; name: string }> = {
  'student@demo.com': { password: 'demo123', role: UserRole.STUDENT, name: 'طالب تجريبي' },
  'teacher@demo.com': { password: 'demo123', role: UserRole.TEACHER, name: 'معلم تجريبي' },
  'parent@demo.com': { password: 'demo123', role: UserRole.PARENT, name: 'ولي أمر تجريبي' },
  'admin@demo.com': { password: 'demo123', role: UserRole.ADMIN, name: 'مدير تجريبي' },
}

const DEMO_STORAGE_KEY = 'demo_auth_user'

const makeDemoUser = (email: string): User =>
  ({
    id: `demo-${email}`,
    email,
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as unknown as User)

const makeDemoProfile = (user: User, account: { role: UserRole; name: string; email?: string }): Profile => ({
  id: user.id,
  user_id: user.id,
  full_name: account.name,
  email: user.email || '',
  role: account.role,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const { notifications, markAsRead, markAllAsRead } = useNotifications()

  useEffect(() => {
    // Restore demo session from localStorage
    try {
      const stored = localStorage.getItem(DEMO_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as { email: string }
        const account = DEMO_ACCOUNTS[parsed.email?.toLowerCase?.() || '']
        if (account) {
          const u = makeDemoUser(parsed.email)
          setUser(u)
          setProfile(makeDemoProfile(u, { ...account, email: parsed.email }))
        }
      }
    } catch (e) {
      console.error('Error restoring demo session:', e)
    }

    // Only talk to Supabase when real credentials exist
    if (!isDemoMode) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user.id, session.user.email || '')
        } else {
          setLoading(false)
        }
      }).catch(() => setLoading(false))

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user.id, session.user.email || '')
        } else {
          setProfile(null)
          setLoading(false)
        }
      })

      return () => subscription.unsubscribe()
    }

    setLoading(false)
  }, [])

  const fetchProfile = async (userId: string, email: string) => {
    try {
      // In demo/no-tables mode, create a mock profile
      const mockProfile: Profile = {
        id: '1',
        user_id: userId,
        full_name: email.split('@')[0] || 'مستخدم',
        email,
        role: UserRole.STUDENT,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setProfile(mockProfile)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const normalized = email.toLowerCase().trim()
    const account = DEMO_ACCOUNTS[normalized]
    // Demo account login (works in demo mode and always available for testing)
    if (account && password === account.password) {
      const u = makeDemoUser(normalized)
      setUser(u)
      setProfile(makeDemoProfile(u, { ...account, email: normalized }))
      try {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify({ email: normalized }))
      } catch {}
      return { error: null, role: account.role }
    }

    if (!isDemoMode) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error }
      } catch (error) {
        return { error }
      }
    }

    return { error: new Error('بيانات الدخول غير صحيحة') }
  }

  const signUp = async (email: string, password: string, fullName: string, role: UserRole, _phone?: string) => {
    if (isDemoMode) {
      // Create a transient demo user with chosen role
      const normalized = email.toLowerCase().trim()
      const u = makeDemoUser(normalized)
      const account = { password, role, name: fullName || 'مستخدم تجريبي' }
      setUser(u)
      setProfile(makeDemoProfile(u, { ...account, email: normalized }))
      try {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify({ email: normalized }))
      } catch {}
      return { error: null }
    }
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    try {
      localStorage.removeItem(DEMO_STORAGE_KEY)
    } catch {}
    setUser(null)
    setProfile(null)
    if (!isDemoMode) {
      await supabase.auth.signOut()
    }
  }

  const markNotificationAsRead = (id: string) => {
    markAsRead(id)
  }

  const markAllNotificationsAsRead = () => {
    markAllAsRead()
  }

  const value = {
    user,
    profile,
    loading,
    notifications,
    unreadNotifications: notifications.filter(n => !n.read),
    signIn,
    signUp,
    signOut,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
