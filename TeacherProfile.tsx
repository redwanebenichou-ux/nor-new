import { useParams, Link } from 'react-router-dom'
import { Star, Clock, Languages, Award, BookOpen, Calendar, Video } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TeacherProfile = () => {
  const { id } = useParams()

  const teacher = {
    id: id,
    name: 'الشيخ عبد القادر بن محمد',
    avatar: '/logo.jpg',
    bio: 'معلم قرآن كريم متخصص في تعليم الحفظ والتجويد لأكثر من 10 سنوات. أركز على تعليم الطالب حسب مستواه وقدرته مع متابعة مستمرة.',
    experience_years: 10,
    qualifications: 'إجازة في القراءات العشر، حاصل على شهادات في التجويد',
    specialties: ['حفظ القرآن', 'التجويد', 'المراجعة'],
    languages: ['العربية'],
    levels: ['مبتدئ', 'متوسط', 'متقدم'],
    rating: 4.9,
    reviews: 45
  }

  const reviews = [
    { id: 1, student: 'أمينة زروقي', rating: 5, comment: 'معلم ممتاز جداً، يشرح بوضوح ويصبر على الطالب', date: '10 أكتوبر 2024' },
    { id: 2, student: 'ياسين بلقاسم', rating: 5, comment: 'أفضل معلم تعلمت معه، تحسنت كثيراً في التجويد', date: '05 أكتوبر 2024' },
    { id: 3, student: 'نور الهدى معمري', rating: 4, comment: 'معلم جيد جداً، أنصح به', date: '01 أكتوبر 2024' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={teacher.avatar} 
                  alt={teacher.name} 
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-right">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{teacher.name}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(teacher.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({teacher.reviews} تقييم)</span>
                    <span className="font-semibold text-primary-600">{teacher.rating}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات عن المعلم</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">الخبرة</h3>
                    <p className="text-gray-600">{teacher.experience_years} سنوات من الخبرة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">المؤهلات</h3>
                    <p className="text-gray-600">{teacher.qualifications}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Languages className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">اللغات</h3>
                    <p className="text-gray-600">{teacher.languages.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">التخصصات</h3>
                    <p className="text-gray-600">{teacher.specialties.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">التقييمات</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold text-sm">
                            {review.student.split(' ')[0][0]}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.student}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 mr-13">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-green-600 mb-1">مجاني</p>
                <p className="text-gray-600">الحصص مباشرة عبر الإنترنت</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">متاح للحجز</span>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">حصص مباشرة عبر الإنترنت</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">المستويات: {teacher.levels.join(', ')}</span>
                </div>
              </div>

              <Link
                to={`/booking/${teacher.id}`}
                className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                احجز حصة
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default TeacherProfile
