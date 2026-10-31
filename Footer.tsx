import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../contexts/I18nContext'
import { dashboardPathFor } from './Navbar'

const Footer = () => {
  const { user, profile } = useAuth()
  const { t } = useI18n()
  const isLoggedIn = Boolean(user)

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt={t('brand')} className="h-12 w-12 rounded-full object-cover" />
              <span className="text-xl font-bold text-primary-700 dark:text-primary-300">{t('brand')}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              {t('footer_tagline')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('footer_quick_links')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('nav_home')}</Link></li>
              <li><Link to="/teachers" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('nav_teachers')}</Link></li>
              <li><Link to="/library" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('nav_library')}</Link></li>
              <li><Link to="/arabic-learning" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('nav_arabic')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('footer_account')}</h3>
            <ul className="space-y-2">
              {isLoggedIn ? (
                <>
                  <li><Link to={dashboardPathFor(profile?.role)} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('footer_dashboard')}</Link></li>
                  <li><Link to="/notifications" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('nav_notifications')}</Link></li>
                  <li><Link to="/progress" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('footer_progress')}</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('auth_login')}</Link></li>
                  <li><Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('auth_register')}</Link></li>
                  <li><Link to="/forgot-password" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-300">{t('footer_forgot')}</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
