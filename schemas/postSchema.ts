import { z } from 'zod'

export const createPostSchema = z.object({
  id: z.string().optional(),
  summary: z.string().min(1),
  type: z.string(),
  styleId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
})

export type Post = z.infer<typeof createPostSchema>
