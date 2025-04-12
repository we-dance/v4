import { z } from 'zod'

export const generateUniqueUsername = () => `u${Date.now()}`
export const noMultiplePeriods = (value: string) => !value.includes('..')
export const notEndingInPeriod = (value: string) => !value.endsWith('.')

const usernameValidationCache = new Map<string, boolean>()

export const usernameValidator = async (username: string) => {
  if (!username || username.length < 2) return true

  if (usernameValidationCache.has(username)) {
    return usernameValidationCache.get(username)
  }

  const { $client } = useNuxtApp()
  const isAvailable = await $client.profiles.isUsernameAvailable.query({
    username,
  })

  usernameValidationCache.set(username, isAvailable)

  return isAvailable
}

export const usernameSchema = z
  .string()
  .min(2, 'Username must be at least 2 characters.')
  .max(30)
  .refine(noMultiplePeriods, 'Username cannot have multiple periods in a row.')
  .refine(notEndingInPeriod, 'Username cannot end in a period.')
  .refine(usernameValidator, 'Username is already taken.')

// Base profile schema
export const profileSchema = z.object({
  id: z.string().optional(),
  name: z.string().nullable(),
  photo: z.string().url().nullable().default(null),
  username: usernameSchema,
  email: z.string().email().nullable(),
  points: z.number().default(0).nullable(),
  type: z
    .enum(['dancer', 'artist', 'organizer', 'venue', 'community'])
    .default('dancer'),
  roles: z.array(z.string()).default([]).nullable(),
  location: z.string().optional().nullable(),
  city: z
    .object({
      id: z.string(),
      name: z.string(),
      countryCode: z.string().optional(),
      slug: z.string().optional(),
    })
    .optional()
    .nullable(),
  bio: z.string().optional().nullable(),
  languages: z.array(z.string()).default([]).nullable(),
  locales: z.record(z.string(), z.boolean()).optional().nullable(),
  styles: z
    .array(
      z.object({
        styleId: z.string(),
        level: z.string(),
        style: z
          .object({
            id: z.string(),
            name: z.string(),
          })
          .optional(),
      })
    )
    .default([]),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'master']).optional(),
  verified: z.boolean().default(false),
  socialLinks: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url(),
      })
    )
    .default([]),
  availability: z
    .object({
      privateClasses: z.boolean().default(false),
      workshops: z.boolean().default(false),
      touring: z.boolean().default(false),
      currentLocation: z.string().optional(),
      pricing: z
        .object({
          privateClass: z
            .object({
              amount: z.number(),
              currency: z.string(),
              duration: z.number(),
            })
            .optional(),
          workshop: z
            .object({
              amount: z.number(),
              currency: z.string(),
              duration: z.number(),
              note: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
  experience: z
    .object({
      teachingLevels: z.array(z.string()).optional(),
      specialties: z.array(z.string()).optional(),
      certifications: z.array(z.string()).optional(),
      years: z.number().optional(),
    })
    .optional(),
  stats: z
    .object({
      followers: z.number().default(0),
      following: z.number().default(0),
      events: z.number().default(0),
      reviews: z.number().default(0),
      rating: z.number().min(0).max(5).optional(),
    })
    .default({
      followers: 0,
      following: 0,
      events: 0,
      reviews: 0,
    }),
  privacy: z
    .object({
      profileVisibility: z
        .enum(['public', 'private', 'connections'])
        .default('public'),
      contactPreferences: z
        .object({
          allowMessages: z.boolean().default(true),
          showEmail: z.boolean().default(false),
          showPhone: z.boolean().default(false),
        })
        .default({
          allowMessages: true,
          showEmail: false,
          showPhone: false,
        }),
    })
    .default({
      profileVisibility: 'public',
      contactPreferences: {
        allowMessages: true,
        showEmail: false,
        showPhone: false,
      },
    }),
  visibility: z.string().default('Public'),
  timezone: z.string().optional(),
  gender: z.string().optional(),
  birthday: z.date().optional(),
  objectives: z.any().optional(),
  step: z.string().optional(),
  invitedBy: z.string().optional(),
  daysUsed: z.number().optional(),
  pwaUsed: z.boolean().optional(),
  oldCities: z.any().optional(),
})

export type Profile = z.infer<typeof profileSchema>

// Specialized profile types
export const dancerProfileSchema = profileSchema.extend({
  type: z.literal('dancer'),
  partnerPreferences: z
    .object({
      roles: z.array(z.string()),
      levels: z.array(z.string()),
      styles: z.array(z.string()),
      goals: z.array(z.string()),
    })
    .optional(),
})

export const artistProfileSchema = profileSchema.extend({
  type: z.literal('artist'),
  equipment: z.array(z.string()).optional(),
  instruments: z.array(z.string()).optional(),
  portfolio: z
    .array(
      z.object({
        type: z.enum(['video', 'image', 'achievement']),
        url: z.string().url(),
        description: z.string().optional(),
      })
    )
    .optional(),
  image: z.string().url().optional(),
  specialties: z.array(z.string()).default([]),
})

export const organizerProfileSchema = profileSchema.extend({
  type: z.literal('organizer'),
  organization: z
    .object({
      name: z.string(),
      description: z.string(),
      website: z.string().url().optional(),
      team: z
        .array(
          z.object({
            role: z.string(),
            profileId: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
})

export const venueProfileSchema = profileSchema.extend({
  type: z.literal('venue'),
  venue: z
    .object({
      address: z.string(),
      capacity: z.number(),
      amenities: z.array(z.string()),
      photos: z.array(z.string().url()),
      schedule: z
        .array(
          z.object({
            day: z.string(),
            hours: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
})

export const communityProfileSchema = profileSchema.extend({
  type: z.literal('community'),
  community: z
    .object({
      mission: z.string(),
      guidelines: z.string(),
      admins: z.array(z.string()),
      membershipRules: z.string().optional(),
    })
    .optional(),
})

export const privacySettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'members', 'connections']),
  allowMessages: z.boolean().optional().default(false),
  showEmail: z.boolean().optional().default(false),
  showPhone: z.boolean().optional().default(false),
  showOnlineStatus: z.boolean().optional().default(false),
  showEventAttendance: z.boolean().optional().default(false),
})

export type PrivacySettings = z.infer<typeof privacySettingsSchema>

export const defaultPrivacySettings: PrivacySettings = {
  profileVisibility: 'public',
  allowMessages: true,
  showEmail: false,
  showPhone: false,
  showOnlineStatus: true,
  showEventAttendance: true,
}

export type DancerProfile = z.infer<typeof dancerProfileSchema>
export type ArtistProfile = z.infer<typeof artistProfileSchema>
export type OrganizerProfile = z.infer<typeof organizerProfileSchema>
export type VenueProfile = z.infer<typeof venueProfileSchema>
export type CommunityProfile = z.infer<typeof communityProfileSchema>
