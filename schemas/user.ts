import * as z from 'zod'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

export function getNormalizedString(str: string) {
  if (!str) {
    return ''
  }

  return str.normalize('NFKC').replace(/[\u0300-\u036f]/g, '')
}

export function getSlug(name: string, minLength = 2, maxLength = 30) {
  let result = name.toLowerCase()

  result = result.substring(0, maxLength)

  if (result.length < minLength) {
    result += 'x'
  }

  result = getNormalizedString(result).normalize('NFKD')

  // convert cyrillic to latin
  result = CyrillicToTranslit().transform(result)

  // replace urls
  if (result.startsWith('http') || result.startsWith('www')) {
    result = result.replace('https://', '')
    result = result.replace('http://', '')
    result = result.replace('www.', '')
    result = result.replace('m.', '')

    const domain = result.split('/')[0]

    const domainList = [
      'facebook.com',
      'instagram.com',
      'fb.me',
      'eventbrite.com',
    ]

    if (domainList.find((d) => domain.includes(d))) {
      result = result.split('/')[1]

      if (!result || result.length < 3) {
        domainList.forEach((d) => {
          result = result.replace(d, '')
        })
      }
    } else {
      result = domain
    }
  }

  // remove leading and trailing spaces
  result = result.trim()

  // replace space with dash
  result = result.replace(/ /g, '-')

  // replace umlauts with their closest ASCII equivalent
  result = getNormalizedString(result)

  // remove special characters
  result = result.replace(/[^a-z0-9._\-]/g, '')

  // remove multiple periods in a row
  result = result.replace(/\.{2,}/g, '.')

  // remove multiple periods in a row
  result = result.replace(/\-{2,}/g, '-')

  // replace .- with -
  result = result.replace(/\.-/g, '-')

  // replace -. with -
  result = result.replace(/-\./g, '-')

  // remove trailing period and dash
  result = result.replace(/(\.|-)$/g, '')

  // remove leading period and dash
  result = result.replace(/^(\.|-)/g, '')

  // remove multiple periods in a row
  result = result.replace(/\-{2,}/g, '-')

  return result
}

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required.').nullable(),
  lastName: z.string().min(1, 'Last name is required.').nullable(),
  phone: z.string().min(1, 'Phone is required.').nullable(),
  email: z.string().email(),
})

export const loggedInUserSchema = userSchema.extend({
  userId: z.string(),
})

const passwordRule = z
  .string()
  .min(8, 'Password must be at least 8 characters.')

export const registerSchema = userSchema.extend({
  password: passwordRule,
  emailConsent: z.boolean({ coerce: true }).refine((value) => value, {
    message: 'We need your consent to send you emails.',
  }),
})

export const passwordSchema = z
  .object({
    currentPassword: passwordRule,
    newPassword: passwordRule,
    confirmPassword: passwordRule,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const notificationSettingsSchema = z.object({
  email: z.object({
    events: z.boolean(),
    messages: z.boolean(),
    community: z.boolean(),
    marketing: z.boolean(),
  }),
  push: z.object({
    events: z.boolean(),
    messages: z.boolean(),
    mentions: z.boolean(),
  }),
  frequency: z.enum(['immediately', 'daily', 'weekly', 'never']),
})

export const defaultNotificationsSettings = {
  email: {
    events: true,
    messages: true,
    community: true,
    marketing: true,
  },
  push: {
    events: true,
    messages: true,
    mentions: true,
  },
  frequency: 'immediately',
}

export type User = z.infer<typeof userSchema>
export type LoggedInUser = z.infer<typeof loggedInUserSchema>
export type NotificationSettings = z.infer<typeof notificationSettingsSchema>
