import { useEffect, useState } from 'react'
import { supabase, isDemoMode } from '../lib/supabase'

export interface Notification {
  id: string
  type: 'lesson_reminder' | 'new_message' | 'progress_update' | 'system'
  title: string
  message: string
  data?: any
  created_at: string
  read: boolean
}

export interface UseNotificationsReturn {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  subscribeToRealtime: (userId: string) => void
  unsubscribeFromRealtime: () => void
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [subscription, setSubscription] = useState<any>(null)

  // Load initial notifications (in demo mode or with real data)
  useEffect(() => {
    // In demo mode, create some sample notifications
    if (isDemoMode) {
      const demoNotifications: Notification[] = [
        {
          id: '1',
          type: 'lesson_reminder',
          title: 'حصة قادمة',
          message: 'حصة القرآن مع الشيخ عبد القادر غداً الساعة 10:00',
          data: { lessonId: '1', teacherName: 'الشيخ عبد القادر بن محمد' },
          created_at: new Date().toISOString(),
          read: false,
        },
        {
          id: '2',
          type: 'progress_update',
          title: 'تقدم القرآن',
          message: 'أكملت حفظ جزأين هذا الأسبوع',
          data: { juz: '15-16' },
          created_at: new Date(Date.now() - 86400000).toISOString(), // yesterday
          read: true,
        },
      ]
      setNotifications(demoNotifications)
      setUnreadCount(1)
    }
  }, [])

  // Subscribe to real-time notifications for this user
  useEffect(() => {
    if (!isDemoMode && subscription === null) {
      // Listen for lesson reminders for the current user
      const sub = supabase
        .channel('lesson_reminders')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'lesson_reminders',
            filter: `user_id=eq.${localStorage.getItem('user_id') || ''}`,
          },
          (payload: any) => {
            const newNotification: Notification = {
              id: payload.new.id,
              type: payload.new.type as Notification['type'],
              title: payload.new.title,
              message: payload.new.message,
              data: payload.new.data,
              created_at: payload.new.created_at,
              read: false,
            }
            setNotifications(prev => [newNotification, ...prev])
            setUnreadCount(prev => prev + 1)
          }
        )
        .subscribe()

      setSubscription(sub)
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription)
        setSubscription(null)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
    setUnreadCount(0)
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    subscribeToRealtime: (_userId: string) => {
      // Can be called explicitly if needed
    },
    unsubscribeFromRealtime: () => {
      if (subscription) {
        supabase.removeChannel(subscription)
        setSubscription(null)
      }
    },
  }
}

// Helper function to send a notification (for server-side use)
export const sendLessonReminder = async (
  userId: string,
  lessonId: string,
  teacherName: string,
  lessonTime: string
) => {
  if (isDemoMode) {
    console.log('Demo mode: Would send lesson reminder', { userId, lessonId, teacherName, lessonTime })
    return { error: null }
  }

  try {
    const { error } = await supabase
      .from('lesson_reminders')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        type: 'lesson_reminder',
        title: 'حصة قادمة',
        message: `حصة قادمة مع ${teacherName} في ${lessonTime}`,
        data: { lessonId, teacherName, lessonTime },
      })

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Error sending lesson reminder:', error)
    return { error }
  }
}

