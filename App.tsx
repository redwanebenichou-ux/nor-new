import { Suspense, lazy } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { I18nProvider } from './contexts/I18nContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import { UserRole } from './types'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'))
const StudentDashboard = lazy(() => import('./pages/dashboard/StudentDashboard'))
const TeacherDashboard = lazy(() => import('./pages/dashboard/TeacherDashboard'))
const ParentDashboard = lazy(() => import('./pages/ParentDashboard'))
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'))
const Teachers = lazy(() => import('./pages/Teachers'))
const TeacherProfile = lazy(() => import('./pages/TeacherProfile'))
const Booking = lazy(() => import('./pages/Booking'))
const LiveClass = lazy(() => import('./pages/LiveClass'))
const Memorization = lazy(() => import('./pages/Memorization'))
const Tajweed = lazy(() => import('./pages/Tajweed'))
const Qiraat = lazy(() => import('./pages/Qiraat'))
const ContentLibrary = lazy(() => import('./pages/ContentLibrary'))
const ArabicLearning = lazy(() => import('./pages/ArabicLearning'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ProgressTracking = lazy(() => import('./pages/ProgressTracking'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const Notifications = lazy(() => import('./pages/Notifications'))
const HafizTracker = lazy(() => import('./pages/HafizTracker'))
const WeeklySchedule = lazy(() => import('./pages/WeeklySchedule'))

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white font-arabic">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/library" element={<ContentLibrary />} />
                <Route path="/progress" element={<ProgressTracking />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/teachers/:id" element={<TeacherProfile />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/teacher" element={
                  <ProtectedRoute allowedRoles={[UserRole.TEACHER]}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                } /><Route path="/teacher/dashboard" element={
                  <ProtectedRoute allowedRoles={[UserRole.TEACHER]}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/parent" element={
                  <ProtectedRoute allowedRoles={[UserRole.PARENT]}>
                    <ParentDashboard />
                  </ProtectedRoute>
                } /><Route path="/parent/add-child" element={
                  <ProtectedRoute allowedRoles={[UserRole.PARENT]}>
                    <ParentDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />

                <Route path="/booking/:teacherId" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.PARENT]}>
                    <Booking />
                  </ProtectedRoute>
                } />
                <Route path="/class/:id" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT, UserRole.TEACHER]}>
                    <LiveClass />
                  </ProtectedRoute>
                } />
                <Route path="/memorization" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                    <Memorization />
                  </ProtectedRoute>
                } />
                <Route path="/tajweed" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                    <Tajweed />
                  </ProtectedRoute>
                } />
                <Route path="/qiraat" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                    <Qiraat />
                  </ProtectedRoute>
                } />
                <Route path="/arabic-learning" element={<ArabicLearning />} />
                <Route path="/hafiz" element={<HafizTracker />} />
                <Route path="/weekly-schedule" element={<WeeklySchedule />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
          </Router>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App