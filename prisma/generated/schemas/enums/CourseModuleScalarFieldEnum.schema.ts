import { z } from 'zod'

export const CourseModuleScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'order',
  'description',
  'courseId',
  'createdAt',
  'updatedAt',
])
