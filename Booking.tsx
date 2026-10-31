import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useI18n } from '../contexts/I18nContext'
import toast from 'react-hot-toast'

const Booking = () => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    lessonType: '',
    date: '',
    time: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)

  const lessonTypes = ['lt_memorization', 'lt_tajweed', 'lt_review', 'lt_qiraat']
  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '16:00', '17:00', '18:00', '19:00', '20:00']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate booking
      setTimeout(() => {
        toast.success(t('bk_success'))
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      toast.error(t('bk_error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 from-gray-50 to-white">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowRight className="h-4 w-4" />
            {t('bk_back')}
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('bk_title')}</h1>
          <p className="text-gray-600">{t('bk_subtitle')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bk_lesson_type')}
              </label>
              <select
                required
                value={formData.lessonType}
                onChange={(e) => setFormData({...formData, lessonType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">{t('bk_choose_type')}</option>
                {lessonTypes.map((type) => (
                  <option key={type} value={type}>{t(type)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bk_date')}
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bk_time')}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setFormData({...formData, time})}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      formData.time === time
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bk_notes')}
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={t('bk_notes_placeholder')}
              />
            </div>

            <div className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{t('bk_summary')}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>{t('bk_lesson_type')}:</span>
                  <span className="text-gray-900">{formData.lessonType ? t(formData.lessonType) : t('bk_not_set')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('bk_date')}:</span>
                  <span className="text-gray-900">{formData.date || t('bk_not_set')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('bk_time')}:</span>
                  <span className="text-gray-900">{formData.time || t('bk_not_set')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('bk_duration')}:</span>
                  <span className="text-gray-900">{t('bk_minutes', { n: 60 })}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>{t('bk_total')}:</span>
                  <span className="text-green-600">{t('bk_free')}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.lessonType || !formData.date || !formData.time}
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? t('bk_submitting') : t('bk_confirm')}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Booking
