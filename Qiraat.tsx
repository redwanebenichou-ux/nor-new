import { BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Qiraat = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">القراءات</h1>
          <p className="text-gray-600">تعلم القراءات المختلفة للقرآن الكريم</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">قريباً</h2>
          <p className="text-gray-600 mb-4">سيتم إضافة محتوى القراءات قريباً</p>
          <p className="text-sm text-gray-500">نستخدم بيانات Placeholder في انتظار المحتوى الحقيقي</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Qiraat
