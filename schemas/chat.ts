import { z } from 'zod'

// Grapheme Count function.
const segmenter =
  typeof Intl !== 'undefined' && (Intl as any).Segmenter
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : undefined

export function graphemeCount(s: string) {
  if (segmenter) return Array.from(segmenter.segment(s)).length
  // Fallback: code point length (not perfect for complex clusters but better than code units)
  return Array.from(s).length
}

const chatProfileSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  photo: z.string().nullable(),
})

export type ChatProfile = z.infer<typeof chatProfileSchema>

// Message schema
export const messageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  content: z
    .string()
    .transform((s) => s.trim())
    .refine(
      (s) => graphemeCount(s) >= 1 && graphemeCount(s) <= 500,
      'Message must be 1–500 characters.'
    ),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export type Message = z.infer<typeof messageSchema>

// Conversation schema
export const conversationSchema = z.object({
  id: z.string(),
  aId: z.string(),
  bId: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export type Conversation = z.infer<typeof conversationSchema>

// Input for creating a new conversation
export const createConversationSchema = z.object({
  otherUserId: z.string(),
})

export type CreateConversationInput = z.infer<typeof createConversationSchema>

// Input for sending a message
export const sendMessageSchema = z.object({
  conversationId: z.string(),
  content: z
    .string()
    .transform((s) => s.trim())
    .refine(
      (s) => graphemeCount(s) >= 1 && graphemeCount(s) <= 500,
      'Message must be 1–500 characters.'
    ),
})

export type SendMessageInput = z.infer<typeof sendMessageSchema>

export const chatEventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('message.created'),
    conversationId: z.string(),
    messageId: z.string(),
    message: messageSchema.extend({
      sender: chatProfileSchema,
    }),
  }),
  z.object({
    type: z.literal('conversation.init'),
    conversation: conversationSchema.extend({
      messages: z.array(
        messageSchema.extend({
          sender: chatProfileSchema,
        })
      ),
      a: chatProfileSchema,
      b: chatProfileSchema,
    }),
  }),
  z.object({
    type: z.literal('conversation.updated'),
    conversationId: z.string(),
  }),
])

export type ChatEvent = z.infer<typeof chatEventSchema>

export type ChatChannel = `conversation:${string}` | `inbox:${string}`
