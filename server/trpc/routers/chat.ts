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
      where: { OR: [{ aId: me }, { bId: me }] },
      orderBy: { updatedAt: 'desc' },
      include: {
        a: { select: { id: true, name: true, photo: true } },
        b: { select: { id: true, name: true, photo: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
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
      const lastMessage = c.messages[0]

      const hasUnread =
        !!lastMessage &&
        lastMessage.senderId !== me &&
        (!myLastSeenAt || lastMessage.createdAt > myLastSeenAt)

      return {
        id: c.id,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        participants: [{ profileId: c.aId }, { profileId: c.bId }],
        messages: c.messages,
        receiver,
        hasUnread,
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
            include: {
              sender: { select: { id: true, name: true, photo: true } },
            },
          },
          a: { select: { id: true, name: true, photo: true } },
          b: { select: { id: true, name: true, photo: true } },
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
            content: input.content,
          },
          include: {
            sender: { select: { id: true, name: true, photo: true } },
          },
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

      const messageForEvent = {
        ...msg,
        sender: {
          profileId: msg.sender.id,
          name: msg.sender.name,
          photo: msg.sender.photo,
        },
      }
      publish(`conversation:${conv.id}`, {
        type: 'message.created',
        conversationId: conv.id,
        messageId: msg.id,
        message: messageForEvent,
      })

      const other = conv.aId === me ? conv.bId : conv.aId
      publish(`inbox:${other}`, {
        type: 'conversation.updated',
        conversationId: conv.id,
      })
      publish(`inbox:${me}`, {
        type: 'conversation.updated',
        conversationId: conv.id,
      })
      return msg
    }),

  markAsRead: publicProcedure
    .input(z.object({ conversationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const me = requireProfileId(ctx)
      const conv = await prisma.conversation.findFirst({
        where: { id: input.conversationId, OR: [{ aId: me }, { bId: me }] },
        select: { id: true, aId: true },
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
      return { success: true }
    }),
})
