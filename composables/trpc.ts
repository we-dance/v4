import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "~/server/trpc/routers";
import { useQuery, useMutation, useInfiniteQuery } from "vue-query";
import superjson from "superjson";
import type { CreatePost, UpdateStats } from "~/server/trpc/schemas/post";

// Create tRPC client
const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
  transformer: superjson,
});

// Export composables for use in components
export function usePostsList(params: { type: string; limit: number; authorId?: string }) {
  return useInfiniteQuery(
    ["posts.list", params],
    async ({ pageParam = 0 }) => {
      return client.posts.list.query({ ...params, cursor: pageParam });
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  );
}

export function usePostById(id: number) {
  return useQuery(
    ["posts.byId", id],
    async () => {
      return client.posts.byId.query(id);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60 * 2, // 2 hours
    }
  );
}

export function useCreatePost() {
  return useMutation(async (input: CreatePost) => {
    return client.posts.create.mutate(input);
  });
}

export function useUpdateStats() {
  return useMutation(async (input: UpdateStats) => {
    return client.posts.updateStats.mutate(input);
  });
}

// Export the client for direct usage if needed
export { client as trpc };
