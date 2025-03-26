import { z } from 'zod'

export const courseDurations = [
  '<15 min',
  '15-30 min',
  '30-60 min',
  '1-2 hours',
  '2-4 hours',
  '4+ hours'
] as const

export const courseCategories = [
  'Salsa',
  'Bachata',
  'Kizomba',
  'Ballet',
  'Contemporary',
  'Hip Hop',
  'Jazz',
  'Tap',
  'Other'
] as const

export const courseFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Course title must be at least 3 characters')
    .max(100, 'Course title must be less than 100 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters')
    .refine(
      (value) => {
        // Remove HTML tags for length validation
        const textContent = value.replace(/<[^>]*>/g, '')
        return textContent.length >= 20
      },
      { message: 'Description must be at least 20 characters (excluding HTML)' }
    ),
  instructorName: z
    .string()
    .min(2, 'Instructor name must be at least 2 characters')
    .max(100, 'Instructor name must be less than 100 characters'),
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(99999.99, 'Price must be less than $99,999.99')
    .transform((val) => Number(val.toFixed(2))), // Ensure 2 decimal places
  duration: z.enum(courseDurations, {
    required_error: 'Please select a course duration',
  }),
  category: z.enum(courseCategories, {
    required_error: 'Please select a course category',
  }),
  tags: z.array(z.string())
    .min(1, 'Please add at least one tag')
    .max(5, 'Maximum 5 tags allowed')
})

export type CourseFormData = z.infer<typeof courseFormSchema> 