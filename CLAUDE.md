## WeDance v4

Participatory network platform for dance communities — event discovery, profiles, chat, ticketing, calendar sync. Successor to v3.

- **Repo**: git@github.com:we-dance/v4.git
- **Live**: v4.wedance.vip
- **PostHog**: project 29269 (EU instance)

### Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS 4, shadcn-vue, Reka UI
- **Backend**: tRPC 11, Prisma 6 (PostgreSQL with cube/earthdistance extensions)
- **Auth**: NextAuth via @sidebase/nuxt-auth
- **Payments**: Stripe
- **Video**: Mux
- **Images**: Cloudinary
- **Email**: Mailgun + MJML templates
- **Search**: tRPC router (no external service)
- **Jobs**: Trigger.dev (calendar-sync, event import)
- **Analytics**: PostHog (nuxt-posthog)
- **i18n**: 11 languages
- **Testing**: Vitest (unit), Playwright (e2e)
- **Package manager**: pnpm
- **Database**: PostgreSQL via Docker Compose

### Commands

```bash
make dev              # Full local setup (install, db push, generate, dev)
make db-start         # Start PostgreSQL container
pnpm dev              # Nuxt dev server
pnpm build            # Prisma generate + nuxt build
pnpm test             # Lint + unit tests
pnpm format           # Prettier write
```

### Structure

```
pages/                # Routes (events, profiles, cities, checkout, chat, admin)
components/           # Vue components (ui/, common/, feature-specific)
server/
  api/                # HTTP endpoints (auth, chat, media, webhooks)
  trpc/               # tRPC routers (events, profiles, posts, courses, search, etc.)
  emails/             # Email templates
composables/          # Vue composables
schemas/              # Zod validation schemas
stores/               # Pinia state
locales/              # i18n (11 languages)
prisma/               # Schema + migrations
trigger/              # Trigger.dev jobs (calendar-sync, import-event)
cli/                  # Import and utility scripts
e2e/                  # Playwright tests
docker/               # PostgreSQL init scripts
```

### Key modules

- Events: discovery, creation, ticketing, calendar sync (Google, iCal, Facebook)
- Profiles: dancer profiles, city pages, geo-based discovery
- Chat: real-time streaming via server API
- Checkout: Stripe payments, ticket purchases, subscriptions
- Admin: dashboard, navigation
- Media: Mux video upload/playback, Cloudinary images
- Email: Mailgun with MJML templates, webhook tracking

### Deployment

- CI: GitHub Actions (lint + build on push to main)
- Docker: `docker-compose.yml` for PostgreSQL
- Trigger.dev: project `proj_vxbjanbirhxlqgzwzeyw`

### Org

Governance and ops docs: `~/Orgs/WeDance`
