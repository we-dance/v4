import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { getDateTime } from '~/utils'

export const searchRouter = router({
  filter: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { query } = input
      let results: any[] = []

      if (!query) {
        return results
      }

      const profiles = await prisma.profile.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              bio: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        take: 5,
      })

      const sortedProfiles = profiles
        .map((profile) => ({
          ...profile,
          relevance: profile.name.toLowerCase().includes(query.toLowerCase())
            ? 1
            : 2,
        }))
        .sort((a, b) => a.relevance - b.relevance)

      results.push(
        ...sortedProfiles.map((profile) => ({
          type: 'profile',
          to: `/@${profile.username}`,
          image: profile.photo,
          title: profile.name,
          description: profile.bio,
          info: `${profile.type} joined on ${getDateTime(profile.createdAt)}`,
        }))
      )

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              summary: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        take: 5,
      })

      results.push(
        ...posts.map((post) => ({
          type: 'post',
          to: `/feed/`,
          image: post.image,
          title: post.title,
          description: post.summary,
          info: `Posted on ${getDateTime(post.createdAt)}`,
        }))
      )

      const events = await prisma.event.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        take: 5,
      })

      results.push(
        ...events.map((event) => ({
          type: 'event',
          to: `/events/${event.id}`,
          image: event.cover,
          title: event.name,
          info: `Event on ${getDateTime(event.startDate)}`,
          description: event.description,
        }))
      )

      return results
    }),
})
