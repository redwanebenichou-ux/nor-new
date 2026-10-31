import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { HashRouter as Router } from 'react-router-dom'
import { AuthProvider } from '../../contexts/AuthContext'
import ProtectedRoute from '../../components/ProtectedRoute'
import { UserRole } from '../../types'

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.setItem('demo_auth_user', JSON.stringify({ email: 'student@demo.com' }))
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('renders children when user is logged in', () => {
    render(
      <AuthProvider>
        <Router>
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <div>Student Dashboard</div>
          </ProtectedRoute>
        </Router>
      </AuthProvider>
    )

    expect(screen.getByText('Student Dashboard')).toBeInTheDocument()
  })

  it('redirects to login when not authenticated', () => {
    localStorage.clear()
    render(
      <AuthProvider>
        <Router>
          <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <div>Protected Content</div>
          </ProtectedRoute>
        </Router>
      </AuthProvider>
    )

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })

  it('allows teacher role access', () => {
    localStorage.setItem('demo_auth_user', JSON.stringify({ email: 'teacher@demo.com' }))
    render(
      <AuthProvider>
        <Router>
          <ProtectedRoute allowedRoles={[UserRole.TEACHER]}>
            <div>Teacher Dashboard</div>
          </ProtectedRoute>
        </Router>
      </AuthProvider>
    )

    expect(screen.getByText('Teacher Dashboard')).toBeInTheDocument()
  })

  it('allows admin role access', () => {
    localStorage.setItem('demo_auth_user', JSON.stringify({ email: 'admin@demo.com' }))
    render(
      <AuthProvider>
        <Router>
          <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <div>Admin Dashboard</div>
          </ProtectedRoute>
        </Router>
      </AuthProvider>
    )

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
  })
})
