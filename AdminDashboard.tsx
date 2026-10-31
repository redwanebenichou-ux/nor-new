import { useState } from 'react'
import { Users, GraduationCap, UserCheck, BookOpen, Calendar, CreditCard, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useI18n } from '../../contexts/I18nContext'

interface TeacherRequest {
  id: number
  name: string
  specialty: string
  date: string
}

const initialRequests: TeacherRequest[] = [
  { id: 1, name: 'الشيخ محمد الأمين حمداني', specialty: 'حفظ القرآن', date: '10 أكتوبر' },
  { id: 2, name: 'الشيخة أمينة زروقي', specialty: 'التجويد', date: '09 أكتوبر' },
]

const AdminDashboard = () => {
  const { t } = useI18n()
  const [requests, setRequests] = useState<TeacherRequest[]>(initialRequests)

  const handleReview = (request: TeacherRequest, decision: 'approved' | 'rejected') => {
    setRequests(prev => prev.filter(item => item.id !== request.id))
    toast.success(
      decision === 'approved'
        ? t('ad_approved_toast', { name: request.name })
        : t('ad_rejected_toast', { name: request.name })
    )
  }

  const mainStats = [
    { labelKey: 'ad_total_users', value: '245', color: 'text-primary-600', bg: 'bg-primary-100', Icon: Users },
    { labelKey: 'ad_students', value: '180', color: 'text-blue-600', bg: 'bg-blue-100', Icon: GraduationCap },
    { labelKey: 'ad_teachers', value: '45', color: 'text-green-600', bg: 'bg-green-100', Icon: UserCheck },
    { labelKey: 'ad_parents', value: '20', color: 'text-orange-600', bg: 'bg-orange-100', Icon: Users },
  ]

  const secondaryStats = [
    { labelKey: 'ad_classes', value: '1,245', color: 'text-purple-600', bg: 'bg-purple-100', Icon: Calendar },
    { labelKey: 'ad_subscriptions', value: '89', color: 'text-indigo-600', bg: 'bg-indigo-100', Icon: CreditCard },
    { labelKey: 'ad_month_classes', value: '320', color: 'text-green-600', bg: 'bg-green-100', Icon: TrendingUp },
    { labelKey: 'ad_content', value: '156', color: 'text-red-600', bg: 'bg-red-100', Icon: BookOpen },
  ]

  const latestRegistrations = [
    { name: 'بلقاسم بوعزيز', roleKey: 'role_student', date: '10 أكتوبر' },
    { name: 'ياسمين معمري', roleKey: 'role_teacher', date: '09 أكتوبر' },
    { name: 'خديجة شريف', roleKey: 'role_parent', date: '08 أكتوبر' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t('ad_title')}
          </h1>
          <p className="text-gray-600 mt-2">{t('ad_subtitle')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {mainStats.map(({ labelKey, value, color, bg, Icon }) => (
            <div key={labelKey} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t(labelKey)}</p>
                  <p className={`text-xl md:text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <div className={`${bg} p-2 md:p-3 rounded-lg`}>
                  <Icon className={`h-5 w-5 md:h-6 md:w-6 ${color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {secondaryStats.map(({ labelKey, value, color, bg, Icon }) => (
            <div key={labelKey} className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">{t(labelKey)}</p>
                  <p className={`text-xl md:text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <div className={`${bg} p-2 md:p-3 rounded-lg`}>
                  <Icon className={`h-5 w-5 md:h-6 md:w-6 ${color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('ad_pending_requests')}</h2>
            <div className="space-y-3">
              {requests.length === 0 && (
                <p className="text-sm text-gray-600 p-3">{t('ad_no_pending')}</p>
              )}
              {requests.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.specialty} - {item.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleReview(item, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      {t('ad_approve')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReview(item, 'rejected')}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      {t('ad_reject')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('ad_latest_registrations')}</h2>
            <div className="space-y-3">
              {latestRegistrations.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {item.name.split(' ')[0][0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{t(item.roleKey)}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AdminDashboard
