import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { profileSchema } from '~/schemas/profile'

// Create a complete schema for profile data from the database
const dbProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  type: z.string(),
  photo: z.string().nullable(),
  visibility: z.string(),
  website: z.string().nullable(),
  instagram: z.string().nullable(),
  facebook: z.string().nullable(),
  twitter: z.string().nullable(),
  youtube: z.string().nullable(),
  tiktok: z.string().nullable(),
  telegram: z.string().nullable(),
  invitedBy: z.string().nullable(),
  timezone: z.string().nullable(),
  gender: z.string().nullable(),
  birthday: z.date().nullable(),
  daysUsed: z.number().nullable(),
  pwaUsed: z.boolean().nullable(),
  locales: z.any().nullable(),
  objectives: z.any().nullable(),
  oldCities: z.any().nullable(),
  step: z.string().nullable(),
  cityId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const profileRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .output(
      z.object({
        items: z.array(dbProfileSchema), // Use the database schema
        nextCursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input
      const items = await ctx.prisma.profile.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }

      return {
        items,
        nextCursor,
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.profile.findUnique({
        where: { id: input.id },
      })
    }),

  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.profile.findUnique({
        where: { username: input.username },
      })
    }),

  create: publicProcedure
    .input(
      profileSchema.omit({ id: true, styles: true }).extend({
        username: z.string(),
        styleIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { styleIds, ...profileData } = input

      // Create profile without styles
      const newProfile = await ctx.prisma.profile.create({
        data: profileData,
      })

      // If style IDs are specified, add them separately
      if (styleIds && styleIds.length > 0) {
        // Convert string to number
        const numericStyleIds = styleIds.map((id) => parseInt(id, 10))

        const styles = await ctx.prisma.danceStyle.findMany({
          where: {
            id: { in: numericStyleIds },
          },
        })

        // Create a relationship with the profile for each style
        for (const style of styles) {
          await ctx.prisma.experience.create({
            data: {
              profile: { connect: { id: newProfile.id } },
              style: {
                connect: { id: style.id },
              },
              level: 'intermediate',
              highlighted: false,
            },
          })
        }

        // Get profile with relationships
        return await ctx.prisma.profile.findUnique({
          where: { id: newProfile.id },
          include: { styles: true },
        })
      }

      return newProfile
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: profileSchema
          .partial()
          .omit({ styles: true })
          .extend({
            styleIds: z.array(z.string()).optional(),
          }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input
      const { styleIds, ...profileData } = data

      // Update profile without changing styles
      const updatedProfile = await ctx.prisma.profile.update({
        where: { id },
        data: profileData,
      })

      // If styleIds are specified, update relationships
      if (styleIds) {
        // Delete current styles
        await ctx.prisma.experience.deleteMany({
          where: { profileId: id },
        })

        // Add new styles
        if (styleIds.length > 0) {
          const numericStyleIds = styleIds.map((styleId) =>
            parseInt(styleId, 10)
          )
          const styles = await ctx.prisma.danceStyle.findMany({
            where: { id: { in: numericStyleIds } },
          })

          for (const style of styles) {
            await ctx.prisma.experience.create({
              data: {
                profile: { connect: { id } },
                style: { connect: { id: style.id } },
                level: 'intermediate',
                highlighted: false,
              },
            })
          }
        }

        return await ctx.prisma.profile.findUnique({
          where: { id },
          include: { styles: true },
        })
      }

      return updatedProfile
    }),
})
