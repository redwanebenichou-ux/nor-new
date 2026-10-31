import { useState } from 'react'
import { BookOpen, Calendar, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const HafizTracker = () => {
  const [memorizedPages, setMemorizedPages] = useState<number[]>([])

  const surahs = [
    { name: 'الفاتحة', pages: 1, number: 1 },
    { name: 'البقرة', pages: 48, number: 2 },
    { name: 'آل عمران', pages: 20, number: 3 },
    { name: 'النساء', pages: 24, number: 4 },
    { name: 'المائدة', pages: 21, number: 5 },
  ]

  const togglePage = (pageNum: number) => {
    setMemorizedPages(prev => 
      prev.includes(pageNum) 
        ? prev.filter(p => p !== pageNum)
        : [...prev, pageNum]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="حافظ القرآن - تتبع الحفظ" description="تتبع صفحات القرآن المحفوظة وجدول المراجعة" />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">حافظ القرآن</h1>
          <p className="text-gray-600">تتبع صفحاتك المحفوظة وجدول المراجعة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{memorizedPages.length}</p>
                <p className="text-sm text-gray-500">صفحة محفوظة</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{Math.round((memorizedPages.length / 604) * 100)}%</p>
                <p className="text-sm text-gray-500">نسبة الحفظ</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">7</p>
                <p className="text-sm text-gray-500">أيام المراجعة</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">تتبع الحفظ</h2>
          <div className="space-y-4">
            {surahs.map((surah) => (
              <div key={surah.number} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{surah.number}. {surah.name} ({surah.pages} صفحة)</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: surah.pages }, (_, i) => {
                    const pageNum = i + 1
                    const isMemorized = memorizedPages.includes(pageNum)
                    return (
                      <button
                        key={pageNum}
                        onClick={() => togglePage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          isMemorized
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">جدول المراجعة الأسبوعي</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, idx) => (
              <div key={day} className="border border-gray-200 rounded-lg p-3 text-center">
                <p className="font-medium text-gray-900 mb-2">{day}</p>
                <p className="text-sm text-gray-600">{idx === 0 || idx === 6 ? 'مراجعة خفيفة' : 'مراجعة شاملة'}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HafizTracker
