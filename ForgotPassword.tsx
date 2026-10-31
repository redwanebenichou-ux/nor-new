import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) {
        toast.error('حدث خطأ أثناء إرسال الرابط')
      } else {
        setSent(true)
        toast.success('تم إرسال رابط إعادة تعيين كلمة المرور')
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرابط')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="من نور إلى نور" className="h-16 w-16 rounded-full object-cover" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            تم إرسال الرابط
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            تم إرسال رابط إعادة تعيين كلمة المرور إلى {email}
          </p>
          <div className="mt-6 text-center">
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 flex items-center justify-center gap-2">
              <ArrowRight className="h-4 w-4" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="من نور إلى نور" className="h-16 w-16 rounded-full object-cover" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          نسيت كلمة المرور
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
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
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login" className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ArrowRight className="h-4 w-4" />
                العودة لتسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
