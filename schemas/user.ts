import * as z from 'zod'

export const generateUniqueUsername = () => `u${Date.now()}`
export const noMultiplePeriods = (value: string) => !value.includes('..')
export const notEndingInPeriod = (value: string) => !value.endsWith('.')

export const usernameValidator = async (username: string) => {
  const { $client } = useNuxtApp()
  const result = await $client.profiles.get.query({ username })

  if (!result) {
    return true
  }

  return false
}

export const usernameSchema = z
  .string()
  .min(2, 'Username must be at least 2 characters.')
  .max(30)
  .refine(noMultiplePeriods, 'Username cannot have multiple periods in a row.')
  .refine(notEndingInPeriod, 'Username cannot end in a period.')
  .refine(usernameValidator, 'Username is already taken.')

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  phone: z.string().min(1, 'Phone is required.'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  emailConsent: z.boolean({ coerce: true }).refine((value) => value, {
    message: 'We need your consent to send you emails.',
  }),
})
