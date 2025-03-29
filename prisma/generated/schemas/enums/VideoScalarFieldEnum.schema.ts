import { z } from 'zod'

export const VideoScalarFieldEnumSchema = z.enum([
  'id',
  'url',
  'styleId',
  'createdAt',
  'updatedAt',
  'createdById',
])
