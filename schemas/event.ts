import { z } from "zod";
import type { Post } from "./post";

// Common schemas
export const EventPriceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  type: z.enum(["per-person", "per-couple", "group"]).optional(),
});

export const EventScheduleItemSchema = z.object({
  time: z.string(),
  activity: z.string(),
  description: z.string().optional(),
});

export const EventLocationSchema = z.object({
  name: z.string(),
  city: z.string(),
  country: z.string(),
  address: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});

export const EventOrganizerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  image: z.string(),
  points: z.number().optional(),
});

export const EventStatsSchema = z.object({
  interested: z.number().default(0),
  saves: z.number().default(0),
  views: z.number().default(0),
  shares: z.number().default(0),
});

// Base event schema
export const BaseEventSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(["party", "workshop", "concert", "festival"]),
  date: z.object({
    start: z.string(),
    end: z.string(),
  }),
  location: EventLocationSchema,
  description: z.string(),
  image: z.string().optional(),
  prices: z.array(EventPriceSchema).optional(),
  tags: z.array(z.string()),
  status: z.enum(["upcoming", "ongoing", "past"]),
  artists: z.array(z.union([z.string(), z.number()])),
  organizer: EventOrganizerSchema,
  schedule: z.array(EventScheduleItemSchema).optional(),
  stats: EventStatsSchema.optional(),
});

// Specific event types
export const PartyEventSchema = BaseEventSchema.extend({
  type: z.literal("party"),
});

export const WorkshopEventSchema = BaseEventSchema.extend({
  type: z.literal("workshop"),
  level: z.enum(["beginner", "intermediate", "advanced", "all"]).optional()
});

export const ConcertEventSchema = BaseEventSchema.extend({
  type: z.literal("concert"),
  venue: z
    .object({
      capacity: z.number(),
      seating: z.boolean(),
    })
    .optional(),
});

export const FestivalEventSchema = BaseEventSchema.extend({
  type: z.literal("festival"),
  prices: z.array(EventPriceSchema),
});

// Export types
export type EventPrice = z.infer<typeof EventPriceSchema>;
export type EventLocation = z.infer<typeof EventLocationSchema>;
export type EventOrganizer = z.infer<typeof EventOrganizerSchema>;
export type EventStats = z.infer<typeof EventStatsSchema>;
export type BaseEvent = z.infer<typeof BaseEventSchema>;
export type PartyEvent = z.infer<typeof PartyEventSchema>;
export type WorkshopEvent = z.infer<typeof WorkshopEventSchema>;
export type ConcertEvent = z.infer<typeof ConcertEventSchema>;
export type FestivalEvent = z.infer<typeof FestivalEventSchema>;

export type AnyEvent = PartyEvent | WorkshopEvent | ConcertEvent | FestivalEvent;
export type Price = z.infer<typeof EventPriceSchema>;

// Conversion to feed post
export const eventToFeedPost = (event: AnyEvent): Post => ({
  id: event.id,
  type: "event",
  author: {
    id: event.organizer.id || String(event.id),
    name: event.organizer.name,
    image: event.organizer.image,
    location: event.location.city,
    points: event.organizer.points,
  },
  content: {
    title: event.name,
    description: event.description,
    image: event.image,
    date: event.date.start,
    location: `${event.location.name}, ${event.location.city}`,
    price: event.prices?.[0] && {
      amount: event.prices[0].amount,
      currency: event.prices[0].currency,
    },
    tags: event.tags,
  },
  timestamp: new Date(event.date.start).toLocaleString(),
  stats: {
    interested: event.stats?.interested || 0,
    comments: 0,
    bookmarks: event.stats?.saves || 0,
  },
});
