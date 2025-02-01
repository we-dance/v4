# Schema Organization

This document describes how schemas are organized in the codebase.

## Core Schemas

All core schemas are located in the `/schemas` directory:

- `post.ts`: Main post schema definitions
  - Defines the base structure for all post types
  - Contains type-specific content schemas
  - Exports TypeScript types for use in components
- `event.ts`: Event-related schemas
  - Defines event structures
  - Contains event-to-post conversion logic
- `profile.ts`: User profile schemas
  - Defines user profile structures
  - Contains role-specific profile extensions

## TRPC Schemas

API-specific schemas are located in `/server/trpc/schemas`:

- Extend from core schemas
- Simplified for API usage
- Include only necessary fields for API operations
- Define input/output types for TRPC procedures

## Schema Usage Guidelines

1. **Component Usage**

   - Import types directly from core schemas
   - Use TypeScript types for prop definitions
   - Example: `import type { Post } from '~/schemas/post'`

2. **API Endpoints**

   - Use TRPC schemas for validation
   - Import from `/server/trpc/schemas`
   - Example: `import { createPostSchema } from '~/server/trpc/schemas/post'`

3. **Data Conversion**

   - Keep conversion logic with related schemas
   - Example: Event-to-post conversion in `event.ts`

4. **Type Extensions**
   - Extend core types for specific features
   - Keep extensions close to usage
   - Document type relationships

## Schema Hierarchy

```
/schemas
├── post.ts       # Core post types
├── event.ts      # Event types and conversions
└── profile.ts    # User profile types

/server/trpc/schemas
└── post.ts       # API-specific schemas
```

## Best Practices

1. **Schema Location**

   - Core schemas in `/schemas`
   - API schemas in `/server/trpc/schemas`
   - Feature-specific schemas near feature code

2. **Type Safety**

   - Use Zod for runtime validation
   - Export TypeScript types for static typing
   - Keep validation and types in sync

3. **Documentation**

   - Document schema relationships
   - Explain validation rules
   - Note breaking changes

4. **Maintenance**
   - Keep schemas DRY
   - Update all related schemas when making changes
   - Consider backwards compatibility

## Schema Documentation

### Event Schema Refactoring

### Completed Steps

1. Schema Alignment with Mock Data

   - ✅ Changed ID type from string to number
   - ✅ Added support for "free" price type
   - ✅ Made schedule field optional
   - ✅ Added support for multiple prices (prices array)
   - ✅ Added support for mixed artist IDs (string | number)
   - ✅ Made organizer ID optional
   - ✅ Added FestivalEvent type
   - ✅ Extracted EventStatsSchema
   - ✅ Updated Post schema to support events
   - ✅ Fixed eventToFeedPost conversion

2. Schema Organization
   - ✅ Consolidated all event-related schemas in one file
   - ✅ Added proper type exports
   - ✅ Added proper schema validation

### Remaining Steps

1. Component Updates

   - [ ] Fix relatedEvents type casting in event detail page
   - [ ] Update price filtering in EventsList to handle multiple price formats
   - [ ] Update price sorting in EventsList to consider both price and prices fields
   - [ ] Add festival type handling in event detail page

2. Data Layer Migration
   - [ ] Migrate mocks to load from tRPC
   - [ ] Align interfaces with schema.org standards
   - [ ] Analyze schema differences between v3, prisma and v4
   - [ ] Plan data migration strategy
   - [ ] Set up Prisma + PostgreSQL database

### Schema.org Alignment (Pending)

The next major step will be aligning our schemas with schema.org standards. We will need to:

1. Research relevant schema.org types:

   - [ ] Event
   - [ ] MusicEvent
   - [ ] DanceEvent
   - [ ] Festival
   - [ ] Course

2. Map our fields to schema.org properties:
   - [ ] Basic properties (name, description, etc.)
   - [ ] Temporal properties (startDate, endDate, duration)
   - [ ] Spatial properties (location, venue)
   - [ ] Organizational properties (organizer, performer)
   - [ ] Commercial properties (offers, price)
