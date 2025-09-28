import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { TRPCError } from '@trpc/server'
import { prisma } from '~/server/prisma'
import { Prisma } from '@prisma/client'
import { createConversationSchema, sendMessageSchema } from '~/schemas/chat'
import { publish } from '~/server/utils/sse'

type CtxWithProfile = { session?: { profile?: { id?: string } } }
const requireProfileId = (ctx: CtxWithProfile) => {
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
      where: {
        OR: [{ aId: me }, { bId: me }],
      },
      orderBy: { lastMessage: { createdAt: 'desc' } },
      include: {
        a: { select: { id: true, name: true, photo: true } },
        b: { select: { id: true, name: true, photo: true } },
        lastMessage: {
          include: {
            sender: { select: { id: true, name: true, photo: true } },
          },
        },
      },
    })
    return convs.map((c) => {
      const iAmA = c.aId === me
      const receiver = iAmA ? c.b : c.a
      const myLastSeenAt = iAmA ? c.aLastSeenAt : c.bLastSeenAt
      const lastMessage = c.lastMessage

      const hasUnread =
        !!lastMessage &&
        lastMessage.senderId !== me &&
        (!myLastSeenAt || lastMessage.createdAt > myLastSeenAt)

      return {
        id: c.id,
        aId: c.aId,
        bId: c.bId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        messages: c.lastMessage ? [c.lastMessage] : [],
        receiver,
        hasUnread,
      }
    })
  }),

  // Create a new conversation
  createConversation: publicProcedure
    .input(createConversationSchema)
    .mutation(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const other = input.otherUserId
      if (!other || other === me) throw new TRPCError({ code: 'BAD_REQUEST' })

      const otherProfile = await prisma.profile.findUnique({
        where: { id: other },
        select: { id: true },
      })
      if (!otherProfile) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const conversation = await prisma.$transaction(async (tx) => {
        const key = pairKeyFor(me, other)
        const existing = await tx.conversation.findUnique({
          where: { pairKey: key },
          include: {
            a: { select: { id: true, name: true, photo: true } },
            b: { select: { id: true, name: true, photo: true } },
          },
        })
        if (existing) return existing

        const [aId, bId] = me < other ? [me, other] : [other, me]
        try {
          const created = await tx.conversation.create({
            data: {
              pairKey: key,
              aId,
              bId,
              ...(aId === me
                ? { aLastSeenAt: new Date() }
                : { bLastSeenAt: new Date() }),
            },
            include: {
              a: { select: { id: true, name: true, photo: true } },
              b: { select: { id: true, name: true, photo: true } },
            },
          })
          return created
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
          ) {
            const winner = await tx.conversation.findUnique({
              where: { pairKey: key },
              include: {
                a: { select: { id: true, name: true, photo: true } },
                b: { select: { id: true, name: true, photo: true } },
              },
            })
            if (winner) return winner
          }
          throw error
        }
      })

      publish(`inbox:${other}`, {
        type: 'conversation.updated',
        conversationId: conversation.id,
      })
      publish(`inbox:${me}`, {
        type: 'conversation.updated',
        conversationId: conversation.id,
      })
      return conversation
    }),

  // Send a message in a conversation
  sendMessage: publicProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      let conversation: { id: string; aId: string; bId: string }
      if (input.conversationId) {
        // Existing conversation
        const conv = await prisma.conversation.findFirst({
          where: { id: input.conversationId, OR: [{ aId: me }, { bId: me }] },
          select: { id: true, aId: true, bId: true },
        })
        if (!conv) throw new TRPCError({ code: 'NOT_FOUND' })
        conversation = conv
      } else {
        // New conversation
        const other = input.recipientId!
        if (other === me) throw new TRPCError({ code: 'BAD_REQUEST' })

        // Verify recipient exists
        const otherProfile = await prisma.profile.findUnique({
          where: { id: other },
          select: { id: true },
        })
        if (!otherProfile) {
          throw new TRPCError({ code: 'NOT_FOUND' })
        }
        // Check if conversation already exists
        const key = pairKeyFor(me, other)
        const existing = await prisma.conversation.findUnique({
          where: { pairKey: key },
          select: { id: true, aId: true, bId: true },
        })

        if (existing) {
          conversation = existing
        } else {
          // Create new conversation
          const [aId, bId] = me < other ? [me, other] : [other, me]
          conversation = await prisma.conversation.create({
            data: {
              pairKey: key,
              aId,
              bId,
              ...(aId === me
                ? { aLastSeenAt: new Date() }
                : { bLastSeenAt: new Date() }),
            },
            select: { id: true, aId: true, bId: true },
          })
        }
      }

      const msg = await prisma.$transaction(async (tx) => {
        const createdMessage = await tx.message.create({
          data: {
            conversationId: conversation.id,
            senderId: me,
            content: input.content,
          },
          include: {
            sender: { select: { id: true, name: true, photo: true } },
          },
        })
        await tx.conversation.update({
          where: { id: conversation.id },
          data: {
            lastMessageId: createdMessage.id,
            ...(conversation.aId === me
              ? { aLastSeenAt: new Date() }
              : { bLastSeenAt: new Date() }),
          },
        })
        return createdMessage
      })

      const messageForEvent = {
        ...msg,
        sender: {
          id: msg.sender.id,
          name: msg.sender.name,
          photo: msg.sender.photo,
        },
      }
      publish(`conversation:${conversation.id}`, {
        type: 'message.created',
        conversationId: conversation.id,
        message: messageForEvent,
      })

      const other =
        conversation.aId === me ? conversation.bId : conversation.aId
      publish(`inbox:${other}`, {
        type: 'conversation.updated',
        conversationId: conversation.id,
      })
      publish(`inbox:${me}`, {
        type: 'conversation.updated',
        conversationId: conversation.id,
      })
      return { ...msg, conversationId: conversation.id }
    }),

  markAsRead: publicProcedure
    .input(z.object({ conversationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const conv = await prisma.conversation.findFirst({
        where: { id: input.conversationId, OR: [{ aId: me }, { bId: me }] },
        select: { id: true, aId: true, bId: true },
      })
      if (!conv) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      await prisma.conversation.update({
        where: { id: conv.id },
        data: {
          ...(conv.aId === me
            ? { aLastSeenAt: new Date() }
            : { bLastSeenAt: new Date() }),
        },
      })
      publish(`inbox:${me}`, {
        type: 'conversation.updated',
        conversationId: conv.id,
      })
      const other = conv.aId === me ? conv.bId : conv.aId
      if (other && other !== me) {
        publish(`inbox:${other}`, {
          type: 'conversation.updated',
          conversationId: conv.id,
        })
      }
      return { success: true }
    }),

  findConversationByUserId: publicProcedure
    .input(z.object({ otherUserId: z.string() }))
    .query(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const other = input.otherUserId
      if (!other || other === me) {
        return null
      }

      const key = pairKeyFor(me, other)
      const conversation = await prisma.conversation.findUnique({
        where: { pairKey: key },
        select: { id: true },
      })

      return conversation
    }),
})
