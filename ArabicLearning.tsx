import { useEffect, useState } from 'react'
import { BookOpen, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface Level {
  id: number
  title: string
  description: string
  lessons: number
  completed: number
}

const initialLevels: Level[] = [
  {
    id: 1,
    title: 'مبتدئ',
    description: 'أساسيات اللغة العربية للحروف والكلمات',
    lessons: 8,
    completed: 3
  },
  {
    id: 2,
    title: 'ابتدائي',
    description: 'الجمل البسيطة والقواعد الأساسية',
    lessons: 12,
    completed: 0
  },
  {
    id: 3,
    title: 'متوسط',
    description: 'المحادثة والقراءة المتقدمة',
    lessons: 15,
    completed: 0
  },
  {
    id: 4,
    title: 'متقدم',
    description: 'الكتابة والتعبير بطلاقة',
    lessons: 10,
    completed: 0
  }
]

const STORAGE_KEY = 'arabic-learning-progress'

const readLevels = (): Level[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Level[]
      if (Array.isArray(parsed) && parsed.length === initialLevels.length) return parsed
    }
  } catch {
    // ignore corrupted storage
  }
  return initialLevels
}

const ArabicLearning = () => {
  const [levels, setLevels] = useState<Level[]>(readLevels)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
    } catch {
      // ignore storage errors
    }
  }, [levels])

  const handleLevelAction = (level: Level) => {
    if (level.completed >= level.lessons) {
      toast('أكملت هذا المستوى بالفعل')
      return
    }

    const nextCompleted = level.completed + 1
    setLevels(prev =>
      prev.map(item => (item.id === level.id ? { ...item, completed: nextCompleted } : item))
    )
    toast.success(`تم إكمال الدرس ${nextCompleted} من ${level.lessons} في مستوى ${level.title}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تعلم اللغة العربية لغير الناطقين بها</h1>
          <p className="text-gray-600">تعلم العربية خطوة بخطوة من الصفر حتى الإتقان</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {levels.map((level) => {
            const isFinished = level.completed >= level.lessons

            return (
              <div key={level.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <span className="text-sm text-gray-600">{level.completed}/{level.lessons} درس مكتمل</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{level.title}</h3>
                <p className="text-gray-600 mb-4">{level.description}</p>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(level.completed / level.lessons) * 100}%` }}
                  ></div>
                </div>

                <button
                  type="button"
                  onClick={() => handleLevelAction(level)}
                  disabled={isFinished}
                  className={`w-full py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isFinished
                      ? 'bg-green-100 text-green-800 cursor-default'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isFinished && <CheckCircle className="h-4 w-4" />}
                  {isFinished ? 'مكتمل' : level.completed === 0 ? 'بدء المستوى' : 'متابعة التعلم'}
                </button>
              </div>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ArabicLearning
