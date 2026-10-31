import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

const PaymentPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    lessonType: '',
    duration: '60',
    teacherId: '',
    childId: '',
    selectedTime: ''
  })
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const lessonTypes = ['حفظ القرآن', 'التجويد', 'المراجعة', 'القراءات']
  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentStatus('processing')
    setError(null)

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In real implementation, would call Stripe API
      // const { error: stripeError } = await stripe.createPayment({...})

      setPaymentStatus('success')
      toast.success('تم تأكيد الحجز بنجاح، المنصة مجانية بالكامل')

      // Navigate after confirmation
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (err) {
      setPaymentStatus('error')
      setError('حدث خطأ أثناء التأكيد، يرجى المحاولة مرة أخرى')
      toast.error('فشل في تأكيد الحجز')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">تأكيد الحجز</h1>
          <p className="text-gray-600">المنصة مجانية بالكامل - لا توجد رسوم على الحصص</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نوع الدرس
              </label>
              <select
                required
                value={formData.lessonType}
                onChange={(e) => setFormData({...formData, lessonType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر نوع الدرس</option>
                {lessonTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المدة (دقائق)
              </label>
              <select
                required
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="30">30 دقيقة</option>
                <option value="60">60 دقيقة</option>
                <option value="90">90 دقيقة</option>
                <option value="120">120 دقيقة</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المعلم
              </label>
              <select
                required
                value={formData.teacherId}
                onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر معلم</option>
                {[{ id: '1', name: 'الشيخ عبد القادر بن محمد' }, { id: '2', name: 'الشيخة فاطمة الزهراء بوزيدي' }].map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ابن/ة (اختياري)
              </label>
              <select
                value={formData.childId}
                onChange={(e) => setFormData({...formData, childId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">لا يوجد</option>
                <option value="child-1">أمين بن عيسى</option>
                <option value="child-2">ياسمين بن عيسى</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الوقت المفضل
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({...formData, selectedTime: time})}
                    className={`px-3 py-2 rounded-lg border transition-colors ${formData.selectedTime === time ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'}`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">ملخص الدفع</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>نوع الدرس:</span>
                  <span>{formData.lessonType || 'غير محدد'}</span>
                </div>
                <div className="flex justify-between">
                  <span>المدة:</span>
                  <span>{formData.duration} دقيقة</span>
                </div>
                <div className="flex justify-between">
                  <span>المعلم:</span>
                  <span>{formData.teacherId ? 'معرف' : 'غير محدد'}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>المجموع:</span>
                  <span className="text-green-600">مجاني</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-sm">
              المنصة مجانية بالكامل لجميع الحصص التعليمية
            </div>

            <button
              type="submit"
              disabled={paymentStatus !== 'idle'}
              className={`w-full py-3 rounded-lg ${paymentStatus === 'processing' ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium'}${paymentStatus === 'error' ? 'text-red-600 bg-red-100' : ''}`}
            >
              {paymentStatus === 'processing' ? 'جاري التأكيد...' : 'تأكيد الحجز'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 rounded-md text-red-700">
                {error}
              </div>
            )}

          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PaymentPage