import type { CourseVideo } from '~/schemas/courseVideo'

export interface Lesson {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl?: string
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  videos?: CourseVideo[]
} 