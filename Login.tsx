import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth, DEMO_ACCOUNTS } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'
import { UserRole } from '../../types'
import toast from 'react-hot-toast'

const roleHome: Record<UserRole, string> = {
  [UserRole.STUDENT]: '/dashboard',
  [UserRole.TEACHER]: '/teacher',
  [UserRole.PARENT]: '/parent',
  [UserRole.ADMIN]: '/admin',
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()

  const handleLogin = async (eEmail: string, ePassword: string) => {
    setLoading(true)
    try {
      const { error, role } = await signIn(eEmail, ePassword)
      if (error) {
        toast.error(t('login_invalid'))
      } else {
        toast.success(t('login_success'))
        navigate(role ? roleHome[role] || '/dashboard' : '/dashboard')
      }
    } catch (error) {
      toast.error(t('login_error'))
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleLogin(email, password)
  }

  const demoAccounts = Object.entries(DEMO_ACCOUNTS).map(([accountEmail, acc]) => ({
    email: accountEmail,
    password: acc.password,
    role: acc.role,
    name: t(`demo_${acc.role}`),
  }))

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt={t('brand')} className="h-16 w-16 rounded-full object-cover" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          {t('login_title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('login_or')}{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            {t('login_create')}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('login_email')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('login_password')}
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 pl-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                  aria-label={t('login_password')}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  {t('login_forgot')}
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? t('login_submitting') : t('login_submit')}
              </button>
            </div>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-600 mb-3 text-center">{t('login_demo_title')}</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  disabled={loading}
                  onClick={() => handleLogin(acc.email, acc.password)}
                  className="text-xs py-2 px-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {acc.name}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {t('login_demo_password')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
