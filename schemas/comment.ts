import { z } from 'zod'

export const commentAuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  points: z.number().optional(),
})

export const commentStatsSchema = z.object({
  likes: z.number(),
  isHelpful: z.boolean().optional(),
})

export const replyToSchema = z.object({
  id: z.number(),
  authorName: z.string(),
})

export const commentSchema = z.object({
  id: z.number(),
  author: commentAuthorSchema,
  text: z.string(),
  timestamp: z.string(),
  stats: commentStatsSchema,
  isLiked: z.boolean().optional(),
  replyTo: replyToSchema.optional(),
})

// Recursive schema for nested comments
export const commentWithRepliesSchema: z.ZodType<{
  id: number
  author: CommentAuthor
  text: string
  timestamp: string
  stats: CommentStats
  isLiked?: boolean
  replyTo?: ReplyTo
  replies?: Array<z.infer<typeof commentWithRepliesSchema>>
}> = commentSchema.extend({
  replies: z.array(z.lazy(() => commentWithRepliesSchema)).optional(),
})

// Export types
export type CommentAuthor = z.infer<typeof commentAuthorSchema>
export type CommentStats = z.infer<typeof commentStatsSchema>
export type ReplyTo = z.infer<typeof replyToSchema>
export type Comment = z.infer<typeof commentSchema>
export type CommentWithReplies = z.infer<typeof commentWithRepliesSchema>
