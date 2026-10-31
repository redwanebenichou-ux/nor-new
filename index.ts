export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent',
  ADMIN = 'admin'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum TeacherStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended'
}

export enum LessonType {
  MEMORIZATION = 'حفظ القرآن',
  TAJWEED = 'التجويد',
  REVIEW = 'المراجعة',
  QIRAAT = 'القراءات'
}

export enum LessonDuration {
  MIN_30 = '30',
  MIN_60 = '60',
  MIN_90 = '90',
  MIN_120 = '120'
}

export enum SubscriptionPlan {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
}

export interface Profile {
  id: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  role: UserRole
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  profile_id: string
  parent_id?: string
  level?: string
  goal?: string
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: string
  profile_id: string
  bio?: string
  experience_years?: number
  qualifications?: string
  hourly_rate?: number
  status: TeacherStatus | 'pending' | 'approved' | 'rejected' | 'suspended'
  created_at: string
  updated_at: string
}

export interface Parent {
  id: string
  profile_id: string
  created_at: string
  updated_at: string
}

export interface Child {
  id: string
  parent_id: string
  name: string
  age?: number
  level?: string
  gender?: 'male' | 'female'
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  student_id: string
  teacher_id: string
  child_id?: string
  lesson_type: LessonType | string
  lesson_duration?: LessonDuration | string
  duration_minutes?: number
  booking_date: string
  booking_time: string
  status: BookingStatus | 'pending' | 'confirmed' | 'cancelled' | 'completed'
  price?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface Evaluation {
  id: string
  booking_id: string
  teacher_id: string
  student_id: string
  attendance: number
  memorization: number
  tajweed: number
  performance: number
  focus: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface TeacherCardData {
  id: string
  name: string
  avatar?: string
  specialties: string[]
  experience_years: number
  languages: string[]
  levels: string[]
  rating: number
  hourly_rate: number
  availability: boolean
}

export interface Subscription {
  id: string
  user_id: string
  plan: SubscriptionPlan
  status: 'active' | 'cancelled' | 'expired'
  start_date: string
  end_date: string
  amount: number
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  user_id: string
  booking_id?: string
  subscription_id?: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method: 'stripe' | 'paymob' | 'bank_transfer'
  transaction_id?: string
  invoice_url?: string
  created_at: string
  updated_at: string
}

export type NotificationType = 
  | 'lesson_reminder' 
  | 'new_message' 
  | 'progress_update' 
  | 'system'
  | 'payment'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  data?: any
  created_at: string
  read: boolean
  user_id?: string
}
