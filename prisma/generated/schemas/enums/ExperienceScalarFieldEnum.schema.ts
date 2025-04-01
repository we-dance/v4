import { z } from 'zod'

export const ExperienceScalarFieldEnumSchema = z.enum([
  'level',
  'highlighted',
  'profileId',
  'styleId',
])
