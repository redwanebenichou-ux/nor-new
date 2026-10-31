import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Video, BookOpen } from 'lucide-react'
import Navbar, { dashboardPathFor } from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'

const ContentLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const { user, profile } = useAuth()

  const categories = [
    { id: 'all', name: 'الكل', count: 123 },
    { id: '1', name: 'حفظ القرآن', count: 45 },
    { id: '2', name: 'التجويد', count: 32 },
    { id: '3', name: 'القراءات', count: 18 },
    { id: '4', name: 'أذكار وحصن', count: 28 },
  ]

  // Lessons/videos
  const lessons = [
    {
      id: '1',
      title: 'شرح جزأ عم',
      category: 'حفظ القرآن',
      teacher: 'الشيخ عبد القادر بن محمد',
      duration: '15:30',
      progress: 85,
      level: 'متوسط',
      type: 'video',
    },
    {
      id: '2',
      title: 'قواعد التجويد الأساسية',
      category: 'التجويد',
      teacher: 'الشيخة فاطمة الزهراء بوزيدي',
      duration: '12:45',
      progress: 92,
      level: 'مبتدئ',
      type: 'video',
    },
    {
      id: '3',
      title: 'قراءة حفص عن عاصم',
      category: 'القراءات',
      teacher: 'الشيخ محمد الأمين حمداني',
      duration: '18:20',
      progress: 70,
      level: 'متقدم',
      type: 'video',
    },
    {
      id: '4',
      title: 'أذكار الصباح والمساء',
      category: 'أذكار وحصن',
      teacher: 'الدكتورة نور الهدى معمري',
      duration: '10:15',
      progress: 100,
      level: 'مبتدئ',
      type: 'article',
    },
  ]

  const visibleLessons =
    activeCategory === 'all'
      ? lessons
      : lessons.filter(lesson => lesson.category === categories.find(c => c.id === activeCategory)?.name)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مكتبة المحتوى</h1>
          <p className="text-gray-600">كنز من المحتوى التعليمي والديني</p>
        </div>

        {/* Categories Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {category.name}{' '}
                <span className="text-xs text-gray-400">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  {lesson.type === 'video' ? <Video className="h-6 w-6 text-primary-600" /> : <BookOpen className="h-6 w-6 text-primary-600" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{lesson.title}</p>
                  <p className="text-sm text-gray-500">{lesson.category}</p>
                  <p className="text-xs text-gray-400">{lesson.teacher}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                  <span className="text-xs text-primary-500">{lesson.level}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-primary-600 transition-width`}
                    style={{ width: `${lesson.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {lesson.progress}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">لا تفوت فرصة التعلم</h2>
          <p className="text-lg text-gray-600 mb-6">
            آلاف الفيديوهات والدروس في انتظاركم. ابدأ رحلة التعلم اليوم
          </p>
          <Link
            to={user ? dashboardPathFor(profile?.role) : '/register'}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors"
          >
            {user ? 'لوحة التحكم' : 'إنشاء حساب مجاني'}
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContentLibrary