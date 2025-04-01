import { z } from 'zod'

export const CourseLessonScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'duration',
  'videoId',
  'locked',
  'moduleId',
  'createdAt',
  'updatedAt',
])
