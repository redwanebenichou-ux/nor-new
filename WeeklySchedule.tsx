import { useState } from 'react'
import { Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('sunday')
  
  const days = [
    { id: 'sunday', name: 'الأحد' },
    { id: 'monday', name: 'الإثنين' },
    { id: 'tuesday', name: 'الثلاثاء' },
    { id: 'wednesday', name: 'الأربعاء' },
    { id: 'thursday', name: 'الخميس' },
    { id: 'friday', name: 'الجمعة' },
    { id: 'saturday', name: 'السبت' },
  ]

  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  const [schedule, setSchedule] = useState<Record<string, string[]>>({
    sunday: ['09:00', '18:00'],
    monday: ['08:00'],
    tuesday: [],
    wednesday: ['16:00', '19:00'],
    thursday: ['07:00'],
    friday: ['20:00'],
    saturday: [],
  })

  const toggleTimeSlot = (day: string, time: string) => {
    setSchedule(prev => {
      const daySlots = prev[day] || []
      if (daySlots.includes(time)) {
        return { ...prev, [day]: daySlots.filter(t => t !== time) }
      } else {
        return { ...prev, [day]: [...daySlots, time].sort() }
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="جدول الحصص الأسبوعي" description="إدارة جدول الحصص الأسبوعي وتفادي التعارض" />
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">جدول الحصص الأسبوعي</h1>
          <p className="text-gray-600">حدد الأوقات المتاحة لتفادي تعارض الحجز</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex gap-2 overflow-x-auto mb-6">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedDay === day.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day.name}
              </button>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              أوقات متاحة ليوم {days.find(d => d.id === selectedDay)?.name}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {timeSlots.map((time) => {
                const isSelected = schedule[selectedDay]?.includes(time)
                return (
                  <button
                    key={time}
                    onClick={() => toggleTimeSlot(selectedDay, time)}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-primary-500'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{time}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">ملخص الجدول</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {days.map((day) => (
              <div key={day.id} className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-2">{day.name}</h3>
                <div className="space-y-1">
                  {(schedule[day.id] || []).length === 0 ? (
                    <p className="text-xs text-gray-400">لا توجد أوقات</p>
                  ) : (
                    (schedule[day.id] || []).map((time) => (
                      <div key={time} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                        {time}
                      </div>
                    ))
                  )}
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

export default WeeklySchedule
