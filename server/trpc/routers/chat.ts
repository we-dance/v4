import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { TRPCError } from '@trpc/server'
import { prisma } from '~/server/prisma'
import {
  createConversationSchema,
  sendMessageSchema,
  type ChatEvent,
} from '~/schemas/chat'
import { publish } from '~/server/utils/sse'
import type { Session } from 'next-auth'

const requireProfileId = (ctx: { session?: Session }) => {
  const id = ctx.session?.profile?.id
  if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return id
}

const pairKeyFor = (a: string, b: string) =>
  [a, b].sort((x, y) => ('' + x).localeCompare(y)).join('-')

export const chatRouter = router({
  // Get all conversations for the current user
  getConversations: publicProcedure.query(async ({ ctx }) => {
    const me = requireProfileId(ctx)
    const convs = await prisma.conversation.findMany({
      where: { OR: [{ aId: me }, { bId: me }] },
      orderBy: { updatedAt: 'desc' },
      include: { lastMessage: true, a: true, b: true },
    })
    return convs.map((c) => {
      const iAmA = c.aId === me
      const lastSeen = iAmA ? c.aLastSeenAt : c.bLastSeenAt
      const unread = c.lastMessage ? c.lastMessage.createdAt > lastSeen : false
      const receiver = iAmA ? c.b : c.a
      return {
        id: c.id,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        participants: [{ profileId: c.aId }, { profileId: c.bId }],
        lastMessage: c.lastMessage ?? null,
        unread,
        receiver,
      }
    })
  }),

  // Get a single conversation by ID
  getConversation: publicProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const c = await prisma.conversation.findFirst({
        where: { id: input.conversationId, OR: [{ aId: me }, { bId: me }] },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 200,
            include: { sender: true },
          },
          lastMessage: true,
          a: true,
          b: true,
        },
      })
      if (!c) throw new TRPCError({ code: 'NOT_FOUND' })
      return c
    }),

  // Create a new conversation
  createConversation: publicProcedure
    .input(createConversationSchema)
    .mutation(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const other = input.participantIds[0]
      if (!other || other === me) throw new TRPCError({ code: 'BAD_REQUEST' })

      const key = pairKeyFor(me, other)
      const existing = await prisma.conversation.findUnique({
        where: { pairKey: key },
        include: { lastMessage: true, a: true, b: true },
      })
      if (existing) return existing

      const created = await prisma.conversation.create({
        data: {
          pairKey: key,
          aId: key.startsWith(me) ? me : other,
          bId: key.startsWith(me) ? other : me,
        },
        include: { lastMessage: true, a: true, b: true },
      })

      publish(`inbox:${other}`, {
        type: 'conversation.updated',
        conversationId: created.id,
        lastMessageId: '',
      } as ChatEvent)
      return created
    }),

  // Send a message in a conversation
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const conv = await prisma.conversation.findFirst({
        where: { id: input.conversationId, OR: [{ aId: me }, { bId: me }] },
        select: { id: true, aId: true, bId: true },
      })
      if (!conv) throw new TRPCError({ code: 'FORBIDDEN' })

      const msg = await prisma.message.create({
        data: {
          conversationId: conv.id,
          senderId: me,
          content: input.content.trim(),
        },
        include: { sender: true },
      })

      await prisma.conversation.update({
        where: { id: conv.id },
        data: {
          lastMessageId: msg.id,
          ...(conv.aId === me
            ? { aLastSeenAt: new Date() }
            : { bLastSeenAt: new Date() }),
        },
      })
      publish(`conversation:${conv.id}`, {
        type: 'message.created',
        conversationId: conv.id,
        messageId: msg.id,
      } as ChatEvent)

      const other = conv.aId === me ? conv.bId : conv.aId
      publish(`inbox:${other}`, {
        type: 'conversation.updated',
        conversationId: conv.id,
        lastMessageId: msg.id,
      } as ChatEvent)
      return msg
    }),
})
