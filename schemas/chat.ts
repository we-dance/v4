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
    .min(1, 'At least one participant is required'),
})

export type CreateConversationInput = z.infer<typeof createConversationSchema>

// Input for sending a message
export const sendMessageSchema = z.object({
  conversationId: z.string(),
  content: z.string().min(1, 'Message cannot be empty'),
})

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
    lastMessageId: z.string(),
  }),
])

export type ChatEvent = z.infer<typeof chatEventSchema>

export type ChatChannel = `conversation:${string}` | `inbox:${string}`
