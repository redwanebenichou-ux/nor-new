import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useI18n } from '../../contexts/I18nContext'
import { BookOpen, Clock, Calendar, Award, Video } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const StudentDashboard = () => {
  const { profile } = useAuth()
  const { t } = useI18n()

  const statCards = [
    { labelKey: 'st_progress_rate', value: '65%', color: 'text-primary-600', bg: 'bg-primary-100', Icon: Award },
    { labelKey: 'st_learning_hours', value: '24', color: 'text-blue-600', bg: 'bg-blue-100', Icon: Clock },
    { labelKey: 'st_upcoming_classes', value: '2', color: 'text-orange-600', bg: 'bg-orange-100', Icon: Calendar },
    { labelKey: 'st_completed_lessons', value: '18', color: 'text-green-600', bg: 'bg-green-100', Icon: BookOpen },
  ]

  const evaluations = [
    { subjectKey: 'ev_memorization', score: 9, total: 10 },
    { subjectKey: 'ev_tajweed', score: 8, total: 10 },
    { subjectKey: 'ev_performance', score: 9, total: 10 },
    { subjectKey: 'ev_attendance', score: 10, total: 10 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t('st_greeting', { name: profile?.full_name || t('st_fallback_name') })}
          </h1>
          <p className="text-gray-600 mt-2">{t('st_welcome')}</p>
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
          {/* Upcoming Class */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('st_next_class')}</h2>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">عبد</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">الشيخ عبد القادر بن محمد</h3>
                    <p className="text-sm text-gray-600">{t('ev_tajweed')}</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{t('st_confirmed')}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>غداً، 15 أكتوبر 2024</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>07:00 مساءً</span>
                </div>
              </div>
              <Link
                to="/class/1"
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <Video className="h-4 w-4" />
                {t('st_join_class')}
              </Link>
            </div>
          </div>

          {/* Recent Evaluations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('st_last_evaluations')}</h2>
            <div className="space-y-3">
              {evaluations.map((item) => (
                <div key={item.subjectKey} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{t(item.subjectKey)}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary-600">{item.score}/{item.total}</span>
                    <div className="w-16 md:w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(item.score/item.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-sm text-gray-600 mt-3">{t('st_teacher_note')}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default StudentDashboard
