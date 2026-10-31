import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const Notifications = () => {
  const { notifications, unreadNotifications, markNotificationAsRead, markAllNotificationsAsRead } = useAuth()
  const [showAll, setShowAll] = useState(false)

  const unreadCount = unreadNotifications.length

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id)
    toast.success('تم قراءة الإشعار')
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead()
    toast.success('تم قراءة جميع الإشعارات')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">الإشعارات</h1>
          <p className="text-gray-600">استلام تنبيهات الحصص والتحديثات</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {showAll ? 'جميع الإشعارات' : 'الإشعارات غير المقروءة'}
              </h2>
              <p className="text-sm text-gray-500">
                {unreadCount} إشعار{' '}
                {unreadCount !== 1 && unreadCount > 0 ? 'غير مقروءة' : 'غير مقروء'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  تعيين كمقروء
                </button>
              )}
              <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                العودة للدashboard
              </Link>
            </div>
          </div>

          {showAll ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {unreadNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bell className="h-4 w-4 text-primary-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{notif.title}</p>
                      <p className="text-sm text-gray-500">{notif.message}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(notif.created_at).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })} - {new Date(notif.created_at).toLocaleTimeString('ar-SA', {
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="ml-auto text-primary-400 hover:text-primary-500 text-sm"
                  >
                    قراءة
                  </button>
                </div>
              ))}

              {unreadNotifications.length === 0 && showAll && (
                <div className="p-4 text-center text-gray-500">
                  لا توجد إشعارات
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {unreadNotifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  لا توجد إشعارات جديدة
                </div>
              ) : (
                unreadNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-100 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4 text-primary-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{notif.title}</p>
                        <p className="text-sm text-gray-500">{notif.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(notif.created_at).toLocaleDateString('ar-SA', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })} - {new Date(notif.created_at).toLocaleTimeString('ar-SA', {
                            hour: 'numeric',
                            minute: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="ml-auto text-primary-400 hover:text-primary-500 text-sm"
                    >
                      قراءة
                    </button>
                  </div>
                ))
              )}

              <div className="text-center pt-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  عرض الكل ({notifications.length - unreadCount})
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Notifications