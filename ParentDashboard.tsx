import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import { useI18n } from '../contexts/I18nContext'

const ParentDashboard = () => {
  const { profile } = useAuth()
  const { t } = useI18n()

  const [children, setChildren] = useState<any[]>([])
  const [newChildName, setNewChildName] = useState('')
  const [newChildLevel, setNewChildLevel] = useState('level_beginner')

  const childrenProgress = [
    {
      id: '1',
      childName: 'أمين بن عيسى',
      level: 'level_beginner',
      progress: 35,
      memorized: 'جزء عم',
      tajweed: 85,
      lastLesson: '2024-01-15',
    },
    {
      id: '2',
      childName: 'ياسمين بن عيسى',
      level: 'level_intermediate',
      progress: 60,
      memorized: 'جزء ثلاث',
      tajweed: 78,
      lastLesson: '2024-01-10',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('pd_title')}</h1>
          <p className="text-gray-600">{t('pd_welcome', { name: profile?.full_name || t('pd_fallback_name') })}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900">{t('pd_add_child_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pd_child_name')}</label>
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="أمين بن عيسى"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('pd_level')}</label>
              <select
                value={newChildLevel}
                onChange={(e) => setNewChildLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="level_beginner">{t('level_beginner')}</option>
                <option value="level_intermediate">{t('level_intermediate')}</option>
                <option value="level_advanced">{t('level_advanced')}</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              if (newChildName.trim()) {
                const newChild = {
                  id: `child-${Date.now()}`,
                  name: newChildName,
                  level: newChildLevel,
                  progress: 0,
                  memorized: '',
                  tajweed: 0,
                  lastLesson: new Date().toISOString(),
                }
                setChildren((prev) => [...prev, newChild])
                setNewChildName('')
                setNewChildLevel('level_beginner')
              }
            }}
            className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            {t('pd_add_child_button')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <div
              key={child.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-500">{t(child.level)}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">{t('pd_general_progress')}</p>
                <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${child.progress}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{child.progress}%</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">{t('pd_tajweed_score')}</p>
                <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${child.tajweed}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{child.tajweed}%</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Link
                  to={`/booking/${child.id}`}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                >
                  {t('pd_book_lesson')}
                </Link>
                <Link
                  to={`/progress`}
                  className="flex-1 bg-white text-primary-600 border border-primary-600 py-2 rounded-lg hover:bg-primary-50 transition-colors text-center"
                >
                  {t('pd_follow')}
                </Link>
              </div>
            </div>
          ))}

          {children.length === 0 &&
            childrenProgress.map((child) => (
              <div
                key={child.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{child.childName}</h3>
                    <p className="text-sm text-gray-500">{t(child.level)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">{t('pd_general_progress')}</p>
                  <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${child.progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{child.progress}% - {child.memorized}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">{t('pd_tajweed_score')}</p>
                  <div className="bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${child.tajweed}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{child.tajweed}%</p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <Link
                    to={`/booking/${child.id}`}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                  >
                    {t('pd_book_lesson')}
                  </Link>
                  <Link
                    to={`/progress`}
                    className="flex-1 bg-white text-primary-600 border border-primary-600 py-2 rounded-lg hover:bg-primary-50 transition-colors text-center"
                  >
                    {t('pd_follow')}
                  </Link>
                </div>
              </div>
            ))}

          {children.length === 0 && childrenProgress.length === 0 && (
            <div className="col-span-full min-h-60 flex items-center justify-center text-gray-500">
              {t('pd_no_children')}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ParentDashboard
