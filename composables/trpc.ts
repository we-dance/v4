import type { CreatePost, UpdateStats } from '~/server/trpc/schemas/post'

const { $client } = useNuxtApp()

// Export composables for use in components
export function usePostsList(params: {
  type: string
  limit: number
  authorId?: string
}) {
  return useInfiniteQuery(
    ['posts.list', params],
    async ({ pageParam = 0 }) => {
      return $client.posts.list.query({ ...params, cursor: pageParam })
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  )
}

export function usePostById(id: number) {
  return useQuery(
    ['posts.byId', id],
    async () => {
      return $client.posts.byId.query(id)
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  )
}

export function useCreatePost() {
  return useMutation(async (input: CreatePost) => {
    return $client.posts.create.mutate(input)
  })
}

export function useUpdateStats() {
  return useMutation(async (input: UpdateStats) => {
    return $client.posts.updateStats.mutate(input)
  })
}

export function useEventById(id: string) {
  return useQuery(
    ['events.byId', id],
    async () => {
      return $client.events.byId.query(id)
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  )
}

export function useArtists() {
  return useQuery(
    ['profiles.artists'],
    async () => {
      return $client.profiles.artists.query()
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  )
}

// Export the client for direct usage if needed
export { client as trpc }
