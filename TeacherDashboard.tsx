import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'
import { Users, Calendar, Clock, Star, Plus } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const TeacherDashboard = () => {
  const { profile } = useAuth()
  const { t } = useI18n()

  const statCards = [
    { labelKey: 'td_students_count', value: '15', color: 'text-primary-600', bg: 'bg-primary-100', Icon: Users },
    { labelKey: 'td_today_classes', value: '3', color: 'text-blue-600', bg: 'bg-blue-100', Icon: Calendar },
    { labelKey: 'td_upcoming_classes', value: '7', color: 'text-orange-600', bg: 'bg-orange-100', Icon: Clock },
    { labelKey: 'td_avg_rating', value: '4.8', color: 'text-yellow-600', bg: 'bg-yellow-100', Icon: Star },
  ]

  const todayClasses = [
    { student: 'أمين بن عيسى', time: '07:00 مساءً', typeKey: 'ev_memorization' },
    { student: 'ياسمين بلقاسم', time: '08:00 مساءً', typeKey: 'ev_tajweed' },
    { student: 'بلقاسم زروقي', time: '09:00 مساءً', typeKey: 'lt_review' }
  ]

  const myStudents = [
    { name: 'أمين بن عيسى', level: 'level_intermediate', progress: 70 },
    { name: 'ياسمين بلقاسم', level: 'level_beginner', progress: 45 },
    { name: 'بلقاسم زروقي', level: 'level_advanced', progress: 85 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t('td_title')}
          </h1>
          <p className="text-gray-600 mt-2">{t('td_welcome', { name: profile?.full_name || t('td_fallback_name') })}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statCards.map(({ labelKey, value, color, bg, Icon }) => (
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
          {/* Today's Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{t('td_today_classes')}</h2>
              <Link to="/weekly-schedule" className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
                <Plus className="h-4 w-4" />
                {t('td_add_lesson')}
              </Link>
            </div>
            <div className="space-y-3">
              {todayClasses.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.student}</h3>
                    <p className="text-sm text-gray-600">{t(item.typeKey)}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{item.time}</p>
                    <Link to={`/class/${index + 1}`} className="text-primary-600 hover:text-primary-700 text-sm">
                      {t('td_start_lesson')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('td_my_students')}</h2>
            <div className="space-y-3">
              {myStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {student.name.split(' ')[0][0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">{t('td_level', { level: t(student.level) })}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 mb-1">{student.progress}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
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

export default TeacherDashboard
