import { z } from 'zod'

export const postSchema = z.object({
  id: z.string().optional(),
  summary: z.string().min(1),
  type: z.string(),
  style: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional()
    .nullable(),
  city: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .optional()
    .nullable(),
})

export type Post = z.infer<typeof postSchema>
