import type { CreatePost, UpdateStats } from '~/server/trpc/schemas/post'

const { $client } = useNuxtApp()

// Export composables for use in components
export function usePostsList(params: {
  type: string
  limit: number
  authorId?: string
}) {
  return useInfiniteQuery({
    queryKey: ['posts.list', params],
    queryFn: ({ pageParam = 0 }) => {
      return $client.posts.list.query({ ...params, cursor: pageParam })
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  })
}

export function usePostById(id: number) {
  return useQuery({
    queryKey: ['posts.byId', id],
    queryFn: () => {
      return $client.posts.byId.query(id)
    },
  })
}

export function useCreatePost() {
  return useMutation({
    mutationFn: (input: CreatePost) => {
      return $client.posts.create.mutate(input)
    },
  })
}

export function useUpdateStats() {
  return useMutation({
    mutationFn: (input: UpdateStats) => {
      return $client.posts.updateStats.mutate(input)
    },
  })
}

export function useEventById(id: string) {
  return useQuery({
    queryKey: ['events.byId', id],
    queryFn: () => {
      return $client.events.byId.query(id)
    },
  })
}

export function useArtists() {
  return useQuery({
    queryKey: ['profiles.artists'],
    queryFn: () => {
      return $client.profiles.artists.query()
    },
  })
}
