import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../trpc';
import { mockEvents } from '~/data/mockEvents';
import { BaseEventSchema, type AnyEvent } from '~/schemas/event';

export const eventsRouter = router({
  // Get all events with optional filtering
  getAll: publicProcedure
    .input(
      z.object({
        type: z.enum(['party', 'workshop', 'concert', 'festival']).optional(),
        status: z.enum(['upcoming', 'ongoing', 'past']).optional(),
        limit: z.number().min(1).max(100).optional(),
        cursor: z.number().optional(), // For pagination
      })
    )
    .query(async ({ input }): Promise<{ items: AnyEvent[]; nextCursor?: number }> => {
      try {
        // Since mockEvents are already validated at import time,
        // we can safely use them without additional validation
        let events = [...mockEvents];

        // Apply filters
        if (input.type) {
          events = events.filter(event => event.type === input.type);
        }
        if (input.status) {
          events = events.filter(event => event.status === input.status);
        }

        // Handle pagination
        const limit = input.limit ?? 10;
        const cursor = input.cursor;
        let nextCursor: number | undefined = undefined;

        if (cursor) {
          events = events.filter(event => event.id > cursor);
        }

        if (events.length > limit) {
          nextCursor = events[limit - 1].id;
          events = events.slice(0, limit);
        }

        return {
          items: events as AnyEvent[], // Type assertion since we know the data is valid
          nextCursor,
        };
      } catch (error) {
        console.error('Error in getAll events:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch events',
          cause: error,
        });
      }
    }),
}); 