import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

// Mock data for UI development
const mockConversations = [
  {
    id: '1',
    createdAt: new Date('2023-03-15T10:30:00Z'),
    updatedAt: new Date('2023-03-15T14:45:00Z'),
    participants: [
      {
        profileId: 'user-1',
        name: 'Current User',
        username: 'currentuser',
        photo: null,
      },
      {
        profileId: 'user-2',
        name: 'Jane Smith',
        username: 'janesmith',
        photo: null,
      },
    ],
    messages: [
      {
        id: 'm1',
        conversationId: '1',
        senderId: 'user-2',
        content: 'Hi there! How are you doing?',
        createdAt: new Date('2023-03-15T10:30:00Z'),
        updatedAt: new Date('2023-03-15T10:30:00Z'),
        isDeleted: false,
      },
      {
        id: 'm2',
        conversationId: '1',
        senderId: 'user-1',
        content: "I'm good, thanks! How about you?",
        createdAt: new Date('2023-03-15T10:35:00Z'),
        updatedAt: new Date('2023-03-15T10:35:00Z'),
        isDeleted: false,
      },
      {
        id: 'm3',
        conversationId: '1',
        senderId: 'user-2',
        content:
          'Doing well! Just wanted to check in about the dance event next week.',
        createdAt: new Date('2023-03-15T10:40:00Z'),
        updatedAt: new Date('2023-03-15T10:40:00Z'),
        isDeleted: false,
      },
    ],
    lastMessage: {
      id: 'm3',
      conversationId: '1',
      senderId: 'user-2',
      content:
        'Doing well! Just wanted to check in about the dance event next week.',
      createdAt: new Date('2023-03-15T10:40:00Z'),
      updatedAt: new Date('2023-03-15T10:40:00Z'),
      isDeleted: false,
    },
  },
  {
    id: '2',
    createdAt: new Date('2023-03-10T08:20:00Z'),
    updatedAt: new Date('2023-03-14T16:30:00Z'),
    participants: [
      {
        profileId: 'user-1',
        name: 'Current User',
        username: 'currentuser',
        photo: null,
      },
      {
        profileId: 'user-3',
        name: 'Alex Johnson',
        username: 'alexj',
        photo: null,
      },
    ],
    messages: [
      {
        id: 'm4',
        conversationId: '2',
        senderId: 'user-1',
        content: 'Hey Alex, are you coming to the salsa workshop?',
        createdAt: new Date('2023-03-14T16:20:00Z'),
        updatedAt: new Date('2023-03-14T16:20:00Z'),
        isDeleted: false,
      },
      {
        id: 'm5',
        conversationId: '2',
        senderId: 'user-3',
        content: "Yes, I'll be there! Looking forward to it.",
        createdAt: new Date('2023-03-14T16:30:00Z'),
        updatedAt: new Date('2023-03-14T16:30:00Z'),
        isDeleted: false,
      },
    ],
    lastMessage: {
      id: 'm5',
      conversationId: '2',
      senderId: 'user-3',
      content: "Yes, I'll be there! Looking forward to it.",
      createdAt: new Date('2023-03-14T16:30:00Z'),
      updatedAt: new Date('2023-03-14T16:30:00Z'),
      isDeleted: false,
    },
  },
]

export const chatRouter = router({
  // Get all conversations for the current user
  getConversations: publicProcedure.query(async () => {
    // For UI development, return mock data
    return mockConversations
  }),

  // Get a single conversation by ID
  getConversation: publicProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ input }) => {
      // For UI development, return mock data
      const conversation = mockConversations.find(
        (c) => c.id === input.conversationId
      )
      if (!conversation) throw new Error('Conversation not found')
      return conversation
    }),

  // Create a new conversation
  createConversation: publicProcedure
    .input(z.object({ participantIds: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      // For UI development, return a mock conversation
      const newId = (mockConversations.length + 1).toString()
      const newConversation = {
        id: newId,
        createdAt: new Date(),
        updatedAt: new Date(),
        participants: [
          {
            profileId: 'user-1',
            name: 'Current User',
            username: 'currentuser',
            photo: null,
          },
          {
            profileId: input.participantIds[0],
            name: 'New Contact',
            username: 'newcontact',
            photo: null,
          },
        ],
        messages: [],
        lastMessage: null,
      }

      return newConversation
    }),

  // Send a message in a conversation
  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      // For UI development, return a mock message
      const newMessage = {
        id: `m${Date.now()}`,
        conversationId: input.conversationId,
        senderId: 'user-1', // Current user
        content: input.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      }

      return newMessage
    }),
})
