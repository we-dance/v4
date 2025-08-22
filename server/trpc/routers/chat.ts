import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { TRPCError } from '@trpc/server'
import { prisma } from '~/server/prisma'
import { createConversationSchema, sendMessageSchema } from '~/schemas/chat'
import { publish } from '~/server/utils/sse'
import type { Session } from 'next-auth'

const requireProfileId = (ctx: { session?: Session }) => {
  const id = ctx.session?.profile?.id
  if (!id) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return id
}

const pairKeyFor = (a: string, b: string) => (a < b ? `${a}-${b}` : `${b}-${a}`)

export const chatRouter = router({
  // Get all conversations for the current user
  getConversations: publicProcedure.query(async ({ ctx }) => {
    const me = requireProfileId(ctx)
    const convs = await prisma.conversation.findMany({
      where: { OR: [{ aId: me }, { bId: me }] },
      orderBy: { updatedAt: 'desc' },
      include: {
        a: true,
        b: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: { sender: true },
        },
      },
    })
    return convs.map((c) => {
      const iAmA = c.aId === me
      const receiver = iAmA ? c.b : c.a
      return {
        id: c.id,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        participants: [{ profileId: c.aId }, { profileId: c.bId }],
        messages: c.messages,
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
        where: { id: input.conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            take: 200,
            include: { sender: true },
          },
          a: true,
          b: true,
        },
      })
      if (!c) throw new TRPCError({ code: 'NOT_FOUND' })
      if (c.aId !== me && c.bId !== me) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      return c
    }),

  // Create a new conversation
  createConversation: publicProcedure
    .input(createConversationSchema)
    .mutation(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const other = input.participantIds[0]
      if (!other || other === me) throw new TRPCError({ code: 'BAD_REQUEST' })

      const otherProfile = await prisma.profile.findUnique({
        where: { id: other },
        select: { id: true },
      })
      if (!otherProfile) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const key = pairKeyFor(me, other)
      const existing = await prisma.conversation.findUnique({
        where: { pairKey: key },
        include: { a: true, b: true },
      })
      if (existing) return existing

      const created = await prisma.conversation.create({
        data: {
          pairKey: key,
          aId: key.startsWith(me) ? me : other,
          bId: key.startsWith(me) ? other : me,
        },
        include: { a: true, b: true },
      })

      publish(`inbox:${other}`, {
        type: 'conversation.updated',
        conversationId: created.id,
      })
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
      if (!conv) throw new TRPCError({ code: 'NOT_FOUND' })

      const msg = await prisma.$transaction(async (tx) => {
        const createdMessage = await tx.message.create({
          data: {
            conversationId: conv.id,
            senderId: me,
            content: input.content.trim(),
          },
          include: { sender: true },
        })
        await tx.conversation.update({
          where: { id: conv.id },
          data: {
            ...(conv.aId === me
              ? { aLastSeenAt: new Date() }
              : { bLastSeenAt: new Date() }),
          },
        })
        return createdMessage
      })

      console.log('Publishing to conversation:', conv.id)
      publish(`conversation:${conv.id}`, {
        type: 'message.created',
        conversationId: conv.id,
        messageId: msg.id,
      })

      const other = conv.aId === me ? conv.bId : conv.aId
      console.log('Publishing to inbox:', other)
      publish(`inbox:${other}`, {
        type: 'conversation.updated',
        conversationId: conv.id,
      })
      return msg
    }),
})
