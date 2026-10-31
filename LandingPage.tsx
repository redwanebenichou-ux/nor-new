import { Link } from 'react-router-dom'
import { BookOpen, Users, Video, CheckCircle, ArrowLeft, LayoutDashboard, Bell } from 'lucide-react'
import Navbar, { dashboardPathFor } from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../contexts/I18nContext'

const problemKeys = ['problem_1', 'problem_2', 'problem_3', 'problem_4', 'problem_5', 'problem_6']

const solutions = [
  { icon: Video, titleKey: 'solution_1_title', descKey: 'solution_1_desc' },
  { icon: Users, titleKey: 'solution_2_title', descKey: 'solution_2_desc' },
  { icon: BookOpen, titleKey: 'solution_3_title', descKey: 'solution_3_desc' },
  { icon: CheckCircle, titleKey: 'solution_4_title', descKey: 'solution_4_desc' },
]

const steps = [1, 2, 3, 4, 5, 6].map(n => ({
  titleKey: `step_${n}_title`,
  descKey: `step_${n}_desc`,
}))

const LandingPage = () => {
  const { user, profile } = useAuth()
  const { t } = useI18n()
  const dashboardPath = dashboardPathFor(profile?.role)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SEO title={t('brand')} description={t('hero_tagline')} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
          style={{
            backgroundImage: "url('https://up6.cc/wd/wp-content/uploads/images-5-1.jpeg')",
            backgroundPosition: 'center 30%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50/80 to-white/80 dark:from-gray-900/80 dark:to-gray-950/80" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt={t('brand')} className="h-24 w-24 rounded-full object-cover shadow-lg ring-4 ring-primary-100 dark:ring-primary-900" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('brand')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 mb-4 font-semibold">
            {t('hero_default_greeting')}
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-4">
            {t('hero_tagline')}
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8">
            {user
              ? t('hero_greeting', { name: profile?.full_name || t('nav_account') })
              : ''}
          </p>

          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={dashboardPath}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                {t('hero_dashboard')}
                <LayoutDashboard className="h-5 w-5" />
              </Link>
              <Link
                to="/notifications"
                className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-300 border-2 border-primary-600 dark:border-primary-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                {t('hero_notifications')}
                <Bell className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                {t('hero_start')}
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link
                to="/teachers"
                className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-300 border-2 border-primary-600 dark:border-primary-500 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              >
                {t('hero_explore')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative py-16 px-4 bg-white dark:bg-gray-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-10"
          style={{
            backgroundImage: "url('https://up6.cc/wd/wp-content/uploads/images-5-1.jpeg')",
            backgroundPosition: 'center 60%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90 dark:from-gray-950/90 dark:via-gray-950/85 dark:to-gray-950/90" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('problems_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemKeys.map(key => (
              <div key={key} className="flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-gray-800 dark:text-gray-200">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-primary-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('solution_title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">{t('solution_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map(solution => (
              <div key={solution.titleKey} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="bg-primary-100 dark:bg-primary-900/60 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <solution.icon className="h-8 w-8 text-primary-600 dark:text-primary-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t(solution.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t(solution.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('how_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.titleKey} className="flex gap-4">
                <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t(step.titleKey)}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {user ? t('cta_user_title') : t('cta_guest_title')}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {user ? t('cta_user_subtitle') : t('cta_guest_subtitle')}
          </p>
          <Link
            to={user ? dashboardPath : '/register'}
            className="bg-white text-primary-700 px-8 py-3 rounded-lg text-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            {user ? t('cta_user_button') : t('cta_guest_button')}
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
