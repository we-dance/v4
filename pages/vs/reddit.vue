<template>
  <div>
    <!-- Hero Section -->
    <section
      class="pt-32 pb-24 bg-gradient-to-br from-primary to-primary-foreground relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
      ></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            WeDance vs Reddit
          </h1>
          <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            A dedicated dance platform built for dancers, not just another
            subreddit
          </p>
          <div class="flex justify-center">
            <Button
              size="lg"
              variant="secondary"
              class="text-lg px-12"
              as-child
            >
              <NuxtLink
                to="/register"
                class="flex items-center justify-center gap-2"
              >
                Join the Dance Community
                <Icon name="ph:arrow-right" class="w-5 h-5" />
              </NuxtLink>
            </Button>
          </div>
          <div class="text-sm text-white/60 mt-4">
            ⚡️ 2-minute setup • No credit card required
          </div>
        </div>
      </div>
    </section>

    <!-- Pain Points Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Reddit Dance Community Limitations
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:shuffle" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Mixed Content</h3>
            <p class="text-muted-foreground">
              Dance discussions buried under memes and general content
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:map-pin" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">No Local Focus</h3>
            <p class="text-muted-foreground">
              Difficult to find events and dancers in your area
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:calendar" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Limited Event Tools</h3>
            <p class="text-muted-foreground">
              No dedicated features for organizing or discovering dance events
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Why Choose WeDance?
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-sm">
            <div class="flex items-center gap-4 mb-6">
              <Icon
                name="ph:reddit-logo"
                class="w-8 h-8 text-muted-foreground"
              />
              <h3 class="text-2xl font-semibold">Reddit</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>General discussion platform</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>No dance-specific features</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Limited local community focus</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>No event management tools</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Anonymous interactions</span>
              </li>
            </ul>
          </div>
          <div
            class="bg-white rounded-xl p-8 shadow-sm border-2 border-primary"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
              >
                <Icon
                  name="ph:heart-straight-fill"
                  class="w-5 h-5 text-white"
                />
              </div>
              <h3 class="text-2xl font-semibold">WeDance Platform</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Built specifically for dancers</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Partner finding & matching</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Active local dance communities</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Complete event platform</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Verified dancer profiles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Dance-Focused Features
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon name="ph:calendar-check" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Event Management</h3>
            <p class="text-muted-foreground">
              Create, discover, and manage dance events all in one place
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-three" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Dance Partner Search</h3>
            <p class="text-muted-foreground">
              Find partners based on style, level, and location
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:buildings" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Venue Directory</h3>
            <p class="text-muted-foreground">
              Discover and review local dance venues and studios
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Artist Profiles</h3>
            <p class="text-muted-foreground">
              Connect with instructors, performers, and DJs
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:map-pin" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Local Communities</h3>
            <p class="text-muted-foreground">
              Join active dance scenes in your city or region
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:share-network" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Festival Planning</h3>
            <p class="text-muted-foreground">
              Coordinate travel and accommodation with other dancers
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Join Your Dance Community</h2>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience a platform built by dancers, for dancers
        </p>
        <div class="flex justify-center">
          <Button size="lg" variant="secondary" class="text-lg px-12" as-child>
            <NuxtLink
              to="/register"
              class="flex items-center justify-center gap-2"
            >
              Get Started Free
              <Icon name="ph:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
