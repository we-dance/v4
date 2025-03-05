import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { profileSchema, artistProfileSchema } from '~/schemas/profile'

// Create a complete schema for profile data from the database
const dbProfileSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  type: z.string(),
  image: z.string().nullable(),
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
        where: {
          type: 'Artist',
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          lastLoginAt: 'desc',
        },
        select: {
          id: true,
          type: true,
          name: true,
          username: true,
          image: true,
          bio: true,
          visibility: true,
          website: true,
          instagram: true,
          facebook: true,
          twitter: true,
          youtube: true,
          tiktok: true,
          telegram: true,
          spotify: true,
          linkedin: true,
          whatsapp: true,
          threads: true,
          vk: true,
          firebaseId: true,
          createdAt: true,
          updatedAt: true,
          lastLoginAt: true,
          styles: true,
          followers: true,
          following: true,
          oldCities: true,
          invitedBy: true,
          timezone: true,
          gender: true,
          birthday: true,
          daysUsed: true,
          pwaUsed: true,
          locales: true,
          step: true,
          cityId: true,
        }
      })

      // Преобразовать результаты, чтобы гарантировать наличие image
      const mappedItems = items.map(item => ({
        ...item,
        image: (item as any).image || (item as any).photo || null // Проверяем оба поля с безопасным приведением типов
      }));

      let nextCursor: typeof cursor | undefined = undefined
      if (mappedItems.length > limit) {
        const nextItem = mappedItems.pop()
        nextCursor = nextItem!.id
      }

      return {
        items: mappedItems,
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

      // Extract required fields first to ensure they exist
      const { username, name, type } = profileData;
      if (!username || !name || !type) {
        throw new Error("Required fields missing: username, name, and type are required");
      }

      // Create a properly typed object with known required fields
      const sanitizedData = {
        username,
        name, 
        type,
        // Add other fields with null->undefined conversion
        ...Object.fromEntries(
          Object.entries(profileData)
            .filter(([key]) => !['username', 'name', 'type'].includes(key))
            .map(([key, value]) => [key, value === null ? undefined : value])
        )
      } as any; // Use type assertion to avoid TypeScript errors

      // Handle followers/following separately if they're causing issues
      if ('followers' in sanitizedData) delete sanitizedData.followers;
      if ('following' in sanitizedData) delete sanitizedData.following;

      const newProfile = await ctx.prisma.profile.create({
        data: sanitizedData as any, // Use type assertion as last resort
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

      // Sanitize data by converting null to undefined
      const sanitizedData = Object.fromEntries(
        Object.entries(profileData).map(([key, value]) => [
          key, 
          value === null ? undefined : value
        ])
      ) as any;

      // Handle problematic relation fields
      if ('followers' in sanitizedData) delete sanitizedData.followers;
      if ('following' in sanitizedData) delete sanitizedData.following;

      // Update profile without changing styles
      const updatedProfile = await ctx.prisma.profile.update({
        where: { id },
        data: sanitizedData,
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

  getArtists: publicProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(10),
      filters: z.object({
        role: z.string().optional(),
        location: z.string().optional(),
        language: z.string().optional(),
        level: z.string().optional(),
        specialty: z.string().optional(),
        available: z.boolean().optional(),
      }).optional(),
    }))
    .output(z.object({
      items: z.array(z.any()),
      nextCursor: z.string().nullish(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        console.log('Input received:', input);
        
        const { cursor, limit, filters } = input

        const where: any = {
          type: 'Artist',
          ...(filters?.role && { roles: { has: filters.role } }),
          ...(filters?.language && { languages: { has: filters.language } }),
          ...(filters?.specialty && { specialties: { has: filters.specialty } }),
          ...(filters?.available && {
            OR: [
              {
                availability: {
                  path: ['privateClasses'],
                  equals: true
                }
              },
              {
                availability: {
                  path: ['workshops'],
                  equals: true
                }
              }
            ]
          }),
        };

        const dbItems = await ctx.prisma.profile.findMany({
          where,
          take: limit + 1,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            lastLoginAt: 'desc',
          },
          include: {
            styles: true,
            followers: true,
            following: true,
          }
        })

        // Transform items to match the artistProfileSchema
        const items = dbItems.map(item => {
          // Cast to any to work around type checking
          const dbItem = item as any;
          
          return {
            ...dbItem,
            type: 'Artist' as const,
            level: dbItem.level || undefined,
            location: dbItem.availability?.currentLocation || '',
            roles: dbItem.roles || [],
            languages: dbItem.languages || [],
            equipment: dbItem.equipment || [],
            instruments: dbItem.instruments || [],
            specialties: dbItem.specialties || [],
            image: dbItem.image || '',
          };
        });

        let nextCursor: typeof cursor | undefined = undefined
        if (items.length > limit) {
          const nextItem = items.pop()
          nextCursor = nextItem!.id
        }

        
        return {
          items,
          nextCursor,
        }
      } catch (error) {
        throw error;
      }
    }),
})
