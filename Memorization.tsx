import { useEffect, useState } from 'react'
import { BookOpen, CheckCircle, RotateCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

type SurahStatus = 'لم يبدأ' | 'قيد الحفظ' | 'محفوظة' | 'تحتاج مراجعة'

interface Surah {
  id: number
  name: string
  verses: number
  status: SurahStatus
  lastReview: string
}

const initialSurahs: Surah[] = [
  { id: 1, name: 'الفاتحة', verses: 7, status: 'محفوظة', lastReview: '2024/10/09' },
  { id: 2, name: 'البقرة', verses: 286, status: 'قيد الحفظ', lastReview: '2024/10/08' },
  { id: 3, name: 'آل عمران', verses: 200, status: 'لم يبدأ', lastReview: '-' },
  { id: 4, name: 'النساء', verses: 176, status: 'تحتاج مراجعة', lastReview: '2024/10/05' }
]

const statusOrder: SurahStatus[] = ['لم يبدأ', 'قيد الحفظ', 'محفوظة', 'تحتاج مراجعة']

const STORAGE_KEY = 'memorization-statuses'

const readSurahs = (): Surah[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Surah[]
      if (Array.isArray(parsed) && parsed.length === initialSurahs.length) return parsed
    }
  } catch {
    // ignore corrupted storage
  }
  return initialSurahs
}

const formatToday = () => {
  const now = new Date()
  const two = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}/${two(now.getMonth() + 1)}/${two(now.getDate())}`
}

const getStatusColor = (status: SurahStatus) => {
  switch (status) {
    case 'محفوظة': return 'bg-green-100 text-green-800'
    case 'قيد الحفظ': return 'bg-blue-100 text-blue-800'
    case 'تحتاج مراجعة': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const Memorization = () => {
  const [surahs, setSurahs] = useState<Surah[]>(readSurahs)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(surahs))
    } catch {
      // ignore storage errors
    }
  }, [surahs])

  const handleStatusUpdate = (surah: Surah) => {
    const nextStatus = statusOrder[(statusOrder.indexOf(surah.status) + 1) % statusOrder.length]
    setSurahs(prev =>
      prev.map(item =>
        item.id === surah.id ? { ...item, status: nextStatus, lastReview: formatToday() } : item
      )
    )
    toast.success(`${surah.name}: ${nextStatus}`)
  }

  const countByStatus = (status: SurahStatus) => surahs.filter(s => s.status === status).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">متابعة الحفظ</h1>
          <p className="text-gray-600">تابع تقدمك في حفظ القرآن الكريم</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">السور المحفوظة</p>
                <p className="text-2xl font-bold text-green-600">{countByStatus('محفوظة')}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيد الحفظ</p>
                <p className="text-2xl font-bold text-blue-600">{countByStatus('قيد الحفظ')}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">تحتاج مراجعة</p>
                <p className="text-2xl font-bold text-yellow-600">{countByStatus('تحتاج مراجعة')}</p>
              </div>
              <RotateCcw className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">سور القرآن</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {surahs.map((surah) => (
              <div key={surah.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold">{surah.id}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{surah.name}</h3>
                      <p className="text-sm text-gray-600">{surah.verses} آية</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="text-right md:text-left">
                      <p className="text-sm text-gray-600">آخر مراجعة</p>
                      <p className="text-sm text-gray-900">{surah.lastReview}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(surah.status)}`}>
                      {surah.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(surah)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      تحديث الحالة
                    </button>
                  </div>
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

export default Memorization
