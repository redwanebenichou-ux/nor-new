import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Star, Sparkles, Target } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ProgressTracking = () => {

  const [juzProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [tajweedScore] = useState<number>(85)
  const [focusScore] = useState<number>(90)
  const [lessonsCompleted] = useState<number>(24)

  const recentTests = [
    {
      id: '1',
      date: '2024-01-20',
      lessonType: 'حفظ القرآن',
      score: 95,
      memorizedNew: '2 صفحات',
    },
    {
      id: '2',
      date: '2024-01-15',
      lessonType: 'التجويد',
      score: 90,
      notes: 'تحسين النطق بعض الحروف',
    },
    {
      id: '3',
      date: '2024-01-10',
      lessonType: 'القراءات',
      score: 88,
      memorizedNew: '1 صفحة',
    },
  ]

  const juzNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11-15', '16-20']

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">متابعة التقدم</h1>
          <p className="text-gray-600">تقدير أداء الحفظ والتجويد</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{lessonsCompleted}</p>
                <p className="text-sm text-gray-500">إجمالي الحصص</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-secondary-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-secondary-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{tajweedScore}</p>
                <p className="text-sm text-gray-500">درجة التجويد</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="bg-gray-100 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${tajweedScore}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">{tajweedScore}%</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-accent-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-accent-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{focusScore}</p>
                <p className="text-sm text-gray-500">درجة التركيز</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="bg-gray-100 rounded-full h-2">
                <div className="bg-accent-600 h-2 rounded-full" style={{ width: `${focusScore}%` }} />
              </div>
              <p className="text-xs text-gray-500 mt-1">{focusScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">متابعة حفظ القرآن</h2>
            <Link to="/hafiz" className="text-primary-600 hover:text-primary-700 text-sm font-medium">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {juzNames.map((juz, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                <span className="font-medium text-gray-700 w-16">{juz}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-primary-600" style={{ width: `${juzProgress[index]}%` }} />
                </div>
                <span className="text-sm text-gray-500">{juzProgress[index]}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">الاختبارات الأخيرة</h2>
            <Link to="/library" className="text-primary-600 hover:text-primary-700 text-sm font-medium">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0">
                <div className="bg-primary-100 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{test.lessonType}</p>
                  <p className="text-xs text-gray-500">{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600">{test.score}</p>
                  <p className="text-xs text-gray-400">{test.memorizedNew || test.notes || ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProgressTracking
