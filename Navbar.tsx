import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, Globe, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../contexts/I18nContext'
import { useTheme } from '../contexts/ThemeContext'
import { UserRole } from '../types'

interface NavLinkItem {
  to: string
  key: string
}

export const dashboardPathFor = (role?: UserRole): string => {
  switch (role) {
    case UserRole.TEACHER:
      return '/teacher'
    case UserRole.PARENT:
      return '/parent'
    case UserRole.ADMIN:
      return '/admin'
    default:
      return '/dashboard'
  }
}

const guestLinks: NavLinkItem[] = [
  { to: '/', key: 'nav_home' },
  { to: '/teachers', key: 'nav_teachers' },
  { to: '/library', key: 'nav_library' },
  { to: '/arabic-learning', key: 'nav_arabic' },
]

const linksForRole = (role?: UserRole): NavLinkItem[] => {
  switch (role) {
    case UserRole.STUDENT:
      return [
        { to: '/dashboard', key: 'nav_student_dashboard' },
        { to: '/teachers', key: 'nav_teachers' },
        { to: '/progress', key: 'nav_progress' },
        { to: '/library', key: 'nav_library' },
        { to: '/notifications', key: 'nav_notifications' },
      ]
    case UserRole.TEACHER:
      return [
        { to: '/teacher', key: 'nav_teacher_dashboard' },
        { to: '/weekly-schedule', key: 'nav_schedule' },
        { to: '/library', key: 'nav_library' },
        { to: '/notifications', key: 'nav_notifications' },
      ]
    case UserRole.PARENT:
      return [
        { to: '/parent', key: 'nav_parent_dashboard' },
        { to: '/teachers', key: 'nav_teachers' },
        { to: '/progress', key: 'nav_children_progress' },
        { to: '/notifications', key: 'nav_notifications' },
      ]
    case UserRole.ADMIN:
      return [
        { to: '/admin', key: 'nav_admin_dashboard' },
        { to: '/teachers', key: 'nav_teachers' },
        { to: '/library', key: 'nav_library' },
        { to: '/notifications', key: 'nav_notifications' },
      ]
    default:
      return guestLinks
  }
}

const LanguageSwitcher = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useI18n()

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'ar' | 'en' | 'fr')}
        aria-label="Language"
        className="text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      >
        <option value="ar" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">العربية</option>
        <option value="en" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">English</option>
        <option value="fr" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">Français</option>
      </select>
    </div>
  )
}

const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'
  const label = isDark ? t('theme_light') : t('theme_dark')

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const { t } = useI18n()

  const isLoggedIn = Boolean(user)
  const links = isLoggedIn ? linksForRole(profile?.role) : guestLinks
  const dashboardPath = dashboardPathFor(profile?.role)

  const handleSignOut = async () => {
    setIsOpen(false)
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 space-x-reverse">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt={t('brand')} className="h-10 w-10 rounded-full object-cover" />
              <span className="text-xl font-bold text-primary-700 dark:text-primary-300">{t('brand')}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse justify-between">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-secondary-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <LanguageSwitcher />

            <ThemeToggle />

            {isLoggedIn ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link
                  to={dashboardPath}
                  className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300"
                >
                  <User className="h-5 w-5" />
                  <span>{profile?.full_name || t('nav_account')}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span>{t('auth_logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300">
                  {t('auth_login')}
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  {t('auth_register')}
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t('menu')}
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300"
              >
                {t(link.key)}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to={dashboardPath}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300"
                >
                  {profile?.full_name || t('nav_account')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-start px-3 py-3 text-base text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                >
                  {t('auth_logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300"
                >
                  {t('auth_login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base bg-primary-600 text-white rounded-lg mx-3 text-center"
                >
                  {t('auth_register')}
                </Link>
              </>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <LanguageSwitcher className="px-3 py-2" />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
