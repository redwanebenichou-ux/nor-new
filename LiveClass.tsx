import { Video, Mic, MicOff, VideoOff, MessageSquare, PhoneOff, Users, Send } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface ChatMessage {
  id: number
  author: string
  text: string
}

const LiveClass = () => {
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, author: 'الشيخ عبد القادر بن محمد', text: 'أهلاً وسهلاً، لنبدأ الحصة بسم الله' },
  ])
  const [messageInput, setMessageInput] = useState('')

  const sendMessage = () => {
    const text = messageInput.trim()
    if (!text) return
    setMessages(prev => [...prev, { id: Date.now(), author: 'أنت', text }])
    setMessageInput('')
  }

  const handleLeave = () => {
    toast.success('تم إنهاء الحصة')
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-semibold">حصة مباشرة</h1>
            <span className="text-gray-400 text-sm">|</span>
            <span className="text-gray-300 text-sm">الشيخ عبد القادر بن محمد - حفظ القرآن</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Users className="h-4 w-4" />
            <span>2 مشارك</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Video Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center relative">
              <div className="text-center">
                <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">{isVideoOff ? 'الكاميرا مغلقة' : 'منطقة الفيديو'}</p>
                <p className="text-gray-500 text-sm mt-2">سيتم ربطها بـ Jitsi أو WebRTC لاحقاً</p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label={isMuted ? 'تشغيل الميكروفون' : 'كتم الميكروفون'}
                  className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-700'} hover:opacity-80 transition-opacity`}
                >
                  {isMuted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  aria-label={isVideoOff ? 'تشغيل الكاميرا' : 'إيقاف الكاميرا'}
                  className={`p-3 rounded-full ${isVideoOff ? 'bg-red-600' : 'bg-gray-700'} hover:opacity-80 transition-opacity`}
                >
                  {isVideoOff ? <VideoOff className="h-5 w-5 text-white" /> : <Video className="h-5 w-5 text-white" />}
                </button>
                <button
                  type="button"
                  onClick={() => setShowChat(!showChat)}
                  aria-label="إظهار أو إخفاء المحادثة"
                  className={`p-3 rounded-full ${showChat ? 'bg-primary-600' : 'bg-gray-700'} hover:opacity-80 transition-opacity`}
                >
                  <MessageSquare className="h-5 w-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={handleLeave}
                  aria-label="إنهاء الحصة"
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <PhoneOff className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat/Sidebar */}
          {showChat && (
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg h-[500px] flex flex-col">
                <div className="p-3 border-b border-gray-700">
                  <h3 className="text-white font-semibold">المحادثة</h3>
                </div>
                <div className="flex-1 p-3 overflow-y-auto">
                  <div className="space-y-2">
                    {messages.map(message => (
                      <div key={message.id} className="bg-gray-700 rounded-lg p-2">
                        <p className="text-xs text-gray-400">{message.author}</p>
                        <p className="text-sm text-white mt-1">{message.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 border-t border-gray-700 flex items-center gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                    placeholder="اكتب رسالة..."
                    aria-label="رسالة"
                    className="flex-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    type="button"
                    onClick={sendMessage}
                    aria-label="إرسال"
                    className="p-2 rounded-lg bg-primary-600 hover:bg-primary-700 transition-colors"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LiveClass
