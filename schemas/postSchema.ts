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

export const postTypes = [
  {
    label: 'Post',
    value: 'post',
    description: 'Share your thoughts, ideas, or experiences.',
  },
  {
    label: 'Article',
    value: 'article',
    description: 'Share your knowledge and insights.',
  },
  {
    label: 'Ask Locals',
    value: 'ask_locals',
    description: 'Ask locals for advice on a specific topic.',
  },
  {
    label: 'Meet',
    value: 'meet',
    description: 'Organize a meetup for people to get together.',
  },
  { label: 'Job', value: 'job', description: 'Share a job opportunity.' },
  { label: 'Ad', value: 'ad', description: 'Share an advertisement.' },
]
