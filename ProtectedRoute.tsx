import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../types'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirect based on role
    if (profile.role === UserRole.ADMIN) return <Navigate to="/admin" replace />
    if (profile.role === UserRole.TEACHER) return <Navigate to="/teacher" replace />
    if (profile.role === UserRole.PARENT) return <Navigate to="/parent" replace />
    if (profile.role === UserRole.STUDENT) return <Navigate to="/dashboard" replace />
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
