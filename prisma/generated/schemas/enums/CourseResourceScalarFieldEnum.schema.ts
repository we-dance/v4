import { z } from 'zod'

export const CourseResourceScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'description',
  'url',
  'locked',
  'courseId',
  'createdAt',
  'updatedAt',
])
