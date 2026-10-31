import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها</p>
        <Link
          to="/"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
        >
          <Home className="h-5 w-5" />
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}

export default NotFound
