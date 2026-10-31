import { useEffect, useState } from 'react'
import { BookOpen, Play, CheckCircle, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Lesson {
  id: number
  title: string
  description: string
  level: string
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'أحكام النون الساكنة والتنوين',
    description: 'الإظهار، الإدغام، الإخفاء، القلب',
    level: 'مبتدئ'
  },
  {
    id: 2,
    title: 'أحكام الميم الساكنة',
    description: 'الإخفاء الشفوي، الإدغام الصغير، الإظهار الشفوي',
    level: 'مبتدئ'
  },
  {
    id: 3,
    title: 'المدود',
    description: 'المد الطبيعي، المد العارض للسكون، المد اللازم',
    level: 'متوسط'
  },
  {
    id: 4,
    title: 'مخارج الحروف',
    description: 'معرفة مخارج الحروف وصفاتها',
    level: 'متوسط'
  },
  {
    id: 5,
    title: 'صفات الحروف',
    description: 'الهمس والجهر، الشدة والرخاوة وغيرها',
    level: 'متقدم'
  }
]

const STORAGE_KEY = 'tajweed-completed-lessons'
const initialCompleted = [1, 2]

const readCompleted = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as number[]
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // ignore corrupted storage
  }
  return initialCompleted
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'مبتدئ': return 'bg-green-100 text-green-800'
    case 'متوسط': return 'bg-yellow-100 text-yellow-800'
    case 'متقدم': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const Tajweed = () => {
  const [completedIds, setCompletedIds] = useState<number[]>(readCompleted)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds))
    } catch {
      // ignore storage errors
    }
  }, [completedIds])

  const handleLessonClick = (lesson: Lesson) => {
    const isCompleted = completedIds.includes(lesson.id)
    setCompletedIds(prev =>
      isCompleted ? prev.filter(id => id !== lesson.id) : [...prev, lesson.id]
    )
    toast.success(
      isCompleted
        ? `أُعيد الدرس "${lesson.title}" إلى قائمة البدء`
        : `تم إكمال درس "${lesson.title}"`
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">أحكام التجويد</h1>
          <p className="text-gray-600">تعلم أحكام التجويد خطوة بخطوة</p>
          <p className="text-sm text-gray-500 mt-2">
            الدروس المكتملة: {completedIds.length} من {lessons.length}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const isCompleted = completedIds.includes(lesson.id)

            return (
              <div key={lesson.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-primary-600" />
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(lesson.level)}`}>
                      {lesson.level}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLessonClick(lesson)}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {isCompleted ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isCompleted ? 'مراجعة الدرس' : 'بدء الدرس'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Tajweed
