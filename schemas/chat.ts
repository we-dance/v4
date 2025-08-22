import { z } from 'zod'

// Message schema
export const messageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  senderId: z.string(),
  content: z.string().min(1, 'Message cannot be empty'),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  isDeleted: z.boolean().default(false),
})

export type Message = z.infer<typeof messageSchema>

// Conversation participant schema
export const conversationParticipantSchema = z.object({
  profileId: z.string(),
  name: z.string().optional(),
  username: z.string().optional(),
  photo: z.string().nullable().optional(),
})

export type ConversationParticipant = z.infer<
  typeof conversationParticipantSchema
>

// Basic conversation schema
export const conversationSchema = z.object({
  id: z.string(),
  participants: z.array(conversationParticipantSchema),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
})

export type Conversation = z.infer<typeof conversationSchema>

// Conversation with messages and last message
export const conversationWithDetailsSchema = conversationSchema.extend({
  messages: z.array(messageSchema).optional(),
  lastMessage: messageSchema.nullable().optional(),
})

export type ConversationWithDetails = z.infer<
  typeof conversationWithDetailsSchema
>

// Input for creating a new conversation
export const createConversationSchema = z.object({
  participantIds: z
    .array(z.string())
    .length(1, 'Exactly one participant is required for 1:1 chat'),
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

const segmenter =
  typeof Intl !== 'undefined' && (Intl as any).Segmenter
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : undefined

export function graphemeCount(s: string) {
  if (segmenter) return Array.from(segmenter.segment(s)).length
  // Fallback: code point length (not perfect for complex clusters but better than code units)
  return Array.from(s).length
}

export type SendMessageInput = z.infer<typeof sendMessageSchema>

export const chatEventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('message.created'),
    conversationId: z.string(),
    messageId: z.string(),
  }),
  z.object({
    type: z.literal('conversation.updated'),
    conversationId: z.string(),
    lastMessageId: z.string().optional(),
  }),
])

export type ChatEvent = z.infer<typeof chatEventSchema>

export type ChatChannel = `conversation:${string}` | `inbox:${string}`
