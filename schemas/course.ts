import type { Prisma } from '@prisma/client'

export type Course = Prisma.CourseGetPayload<{
  include: {
    instructor: true
    offers: true
    modules: {
      include: {
        lessons: true
      }
    }
  }
}>
