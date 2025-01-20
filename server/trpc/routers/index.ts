import { router } from "../trpc";
import { postsRouter } from "./posts";
import { eventsRouter } from "./events";

export const appRouter = router({
  posts: postsRouter,
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
