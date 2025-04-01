import { z } from 'zod'

export const PostScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'image',
  'url',
  'content',
  'type',
  'slug',
  'published',
  'firebaseId',
  'authorId',
  'eventId',
  'styleId',
  'upvotes',
  'commentsCount',
  'createdAt',
  'updatedAt',
])
