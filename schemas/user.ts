import { z } from 'zod'

export const userSchema = z.object({
    id: z.string(),
    type: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    termsSigned: z.boolean(),
    termsSignedAt: z.date()
})

export type User = z.infer<typeof userSchema>
