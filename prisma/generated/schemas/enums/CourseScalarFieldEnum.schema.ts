import { z } from 'zod'

export const CourseScalarFieldEnumSchema = z.enum([
  'id',
  'slug',
  'name',
  'description',
  'subheader',
  'instructorId',
  'coverUrl',
  'createdAt',
  'updatedAt',
])
