import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import {
  postSchema,
  createPostSchema,
  updateStatsSchema,
} from "../schemas/post";
import { mockPosts } from "~/data/mockPosts";

export const postsRouter = router({
  // Get all posts with optional filtering
  list: publicProcedure
    .input(
      z.object({
        type: z.string(),
        limit: z.number(),
        cursor: z.number().optional(),
        authorId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { type, limit, cursor = 0, authorId } = input;
      const start = cursor * limit;
      const end = start + limit;

      // Filter posts by type and author
      const filtered = mockPosts.filter((post) => {
        const typeMatch = type === "all" || post.type === type;
        const authorMatch = typeof authorId === "undefined" || post.author.id === authorId;
        return typeMatch && authorMatch;
      });

      return {
        items: filtered.slice(start, end),
        nextCursor: end < filtered.length ? cursor + 1 : undefined,
      };
    }),

  // Get a single post by ID
  byId: publicProcedure.input(z.number()).query(async ({ input }) => {
    const post = mockPosts.find((p) => p.id === input);
    if (!post) throw new Error("Post not found");
    return post;
  }),

  // Create a new post
  create: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ input }) => {
      return {
        ...input,
        id: Math.random(),
        timestamp: new Date().toISOString(),
        stats: { likes: 0, shares: 0, comments: 0 },
        author: {
          id: "user-1",
          name: "John Doe",
          image: "/avatar.png",
          location: "San Francisco, CA",
        },
      };
    }),

  // Update post stats (like, comment, share)
  updateStats: publicProcedure
    .input(updateStatsSchema)
    .mutation(async ({ input }) => {
      const { postId, action } = input;
      console.log(`${action} post ${postId}`);
      return { success: true };
    }),
});
