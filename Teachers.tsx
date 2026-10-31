import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Languages, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Teachers = () => {
  const [filters, setFilters] = useState({
    level: '',
    specialty: '',
    language: ''
  })

  const teachers = [
    {
      id: '1',
      name: 'الشيخ عبد القادر بن محمد',
      avatar: '/logo.jpg',
      specialties: ['حفظ القرآن', 'التجويد'],
      experience_years: 10,
      languages: ['العربية'],
      levels: ['مبتدئ', 'متوسط', 'متقدم'],
      rating: 4.9,
      reviews: 45,
      availability: true
    },
    {
      id: '2',
      name: 'الشيخة فاطمة الزهراء بوزيدي',
      avatar: '/logo.jpg',
      specialties: ['التجويد', 'القراءات'],
      experience_years: 8,
      languages: ['العربية', 'الفرنسية'],
      levels: ['مبتدئ', 'متوسط'],
      rating: 4.8,
      reviews: 32,
      availability: true
    },
    {
      id: '3',
      name: 'الشيخ محمد الأمين حمداني',
      avatar: '/logo.jpg',
      specialties: ['حفظ القرآن', 'المراجعة'],
      experience_years: 12,
      languages: ['العربية'],
      levels: ['مبتدئ', 'متوسط', 'متقدم'],
      rating: 5.0,
      reviews: 67,
      availability: false
    }
  ]

  const filteredTeachers = teachers.filter(teacher => {
    if (filters.level && !teacher.levels.includes(filters.level)) return false
    if (filters.specialty && !teacher.specialties.includes(filters.specialty)) return false
    if (filters.language && !teacher.languages.includes(filters.language)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">المعلمون</h1>
          <p className="text-gray-600">اختر المعلم الأنسب لك لبدء رحلتك في تعلم القرآن الكريم</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">الفلاتر</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المستوى</label>
                  <select 
                    value={filters.level}
                    onChange={(e) => setFilters({...filters, level: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">الكل</option>
                    <option value="مبتدئ">مبتدئ</option>
                    <option value="متوسط">متوسط</option>
                    <option value="متقدم">متقدم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التخصص</label>
                  <select 
                    value={filters.specialty}
                    onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">الكل</option>
                    <option value="حفظ القرآن">حفظ القرآن</option>
                    <option value="التجويد">التجويد</option>
                    <option value="القراءات">القراءات</option>
                    <option value="المراجعة">المراجعة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">اللغة</label>
                  <select 
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">الكل</option>
                    <option value="العربية">العربية</option>
                    <option value="الفرنسية">الفرنسية</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Teachers List */}
          <div className="lg:w-3/4">
            <div className="space-y-6">
              {filteredTeachers.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <p className="text-gray-600 mb-4">لا يوجد معلم يطابق الفلاتر المحددة</p>
                  <button
                    type="button"
                    onClick={() => setFilters({ level: '', specialty: '', language: '' })}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    إعادة تعيين الفلاتر
                  </button>
                </div>
              )}
              {filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src={teacher.avatar} 
                        alt={teacher.name} 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(teacher.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({teacher.reviews})</span>
                            <span className="text-sm font-medium text-primary-600">{teacher.rating}</span>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-green-600">مجاني</p>
                          <p className="text-sm text-gray-600">الحصص مباشرة عبر الإنترنت</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">التخصصات</p>
                          <div className="flex flex-wrap gap-2">
                            {teacher.specialties.map((spec, idx) => (
                              <span key={idx} className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">الخبرة</p>
                          <p className="text-sm text-gray-900">{teacher.experience_years} سنوات</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">اللغات</p>
                          <div className="flex items-center gap-1">
                            <Languages className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{teacher.languages.join(', ')}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">المستويات</p>
                          <p className="text-sm text-gray-900">{teacher.levels.join(', ')}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to={`/teachers/${teacher.id}`}
                          className="flex-1 bg-white text-primary-600 border border-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors text-center"
                        >
                          عرض الملف
                        </Link>
                        {teacher.availability ? (
                          <Link
                            to={`/booking/${teacher.id}`}
                            className="flex-1 px-4 py-2 rounded-lg text-center transition-colors bg-primary-600 text-white hover:bg-primary-700"
                          >
                            احجز حصة
                          </Link>
                        ) : (
                          <span
                            aria-disabled="true"
                            className="flex-1 px-4 py-2 rounded-lg text-center bg-gray-300 text-gray-500 cursor-not-allowed"
                          >
                            غير متاح
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Teachers
