<template>
  <div>
    <!-- Hero Section -->
    <section
      class="pt-32 pb-24 bg-gradient-to-br from-primary to-primary/90 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
      ></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1
            class="text-4xl md:text-6xl font-bold text-primary-foreground mb-6"
          >
            WeDance vs SalsaForums
          </h1>
          <p class="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            A modern dance platform with real-time connections, local events,
            and active communities - not just forum threads
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
                Join the Community
                <Icon name="ph:arrow-right" class="w-5 h-5" />
              </NuxtLink>
            </Button>
          </div>
          <div class="text-sm text-primary-foreground/60 mt-4">
            ⚡️ 2-minute setup • No credit card required
          </div>
        </div>
      </div>
    </section>

    <!-- Pain Points Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Common Forum Frustrations
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-6">
            <Icon
              name="ph:clock-counter-clockwise"
              class="w-10 h-10 text-primary mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Outdated Information</h3>
            <p class="text-muted-foreground">
              Old threads with irrelevant or outdated dance scene information
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:chat-dots" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Slow Communication</h3>
            <p class="text-muted-foreground">
              Waiting for responses in threads instead of real-time connections
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:map-pin" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">No Local Focus</h3>
            <p class="text-muted-foreground">
              Hard to find relevant information for your specific city or area
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Why Choose WeDance?
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-background rounded-xl p-8 shadow-sm">
            <div class="flex items-center gap-4 mb-6">
              <Icon
                name="ph:chats-circle"
                class="w-8 h-8 text-muted-foreground"
              />
              <h3 class="text-2xl font-semibold">SalsaForums</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Static forum threads</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Outdated information</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>No real-time features</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Limited local content</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>No event management</span>
              </li>
            </ul>
          </div>
          <div
            class="bg-background rounded-xl p-8 shadow-sm border-2 border-primary"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
              >
                <Icon
                  name="ph:heart-straight-fill"
                  class="w-5 h-5 text-primary-foreground"
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
                <span>Live community interaction</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Real-time event updates</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Direct messaging & chat</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Active local communities</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Complete event platform</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Modern Dance Community Features
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon name="ph:calendar-check" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Live Events</h3>
            <p class="text-muted-foreground">
              Real-time updates on parties, classes, and festivals near you
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-three" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Partner Finding</h3>
            <p class="text-muted-foreground">
              Connect with dancers who match your style and level
            </p>
          </div>
          <div class="p-6">
            <Icon
              name="ph:chat-centered-dots"
              class="w-8 h-8 text-primary mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Instant Chat</h3>
            <p class="text-muted-foreground">
              Direct messaging and group chats for quick coordination
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:map-pin" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Local Communities</h3>
            <p class="text-muted-foreground">
              Find and join active dance scenes in your area
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:user-circle" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Rich Profiles</h3>
            <p class="text-muted-foreground">
              Showcase your dance styles, experience, and interests
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:share-network" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Social Planning</h3>
            <p class="text-muted-foreground">
              Coordinate festival trips and share rides with dance friends
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Join the Modern Dance Community</h2>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect with local dancers and never miss another dance opportunity
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
