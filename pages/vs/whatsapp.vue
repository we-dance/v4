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
            WeDance vs WhatsApp Groups
          </h1>
          <p class="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Discover why dancers are switching from scattered WhatsApp groups to
            a unified dance platform
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
                Get Started Free
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
          Common WhatsApp Frustrations
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:chat-dots" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Too Many Groups</h3>
            <p class="text-muted-foreground">
              Separate groups for each style, city, and event make it hard to
              keep track of everything
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon
              name="ph:magnifying-glass"
              class="w-10 h-10 text-primary mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Hard to Find Info</h3>
            <p class="text-muted-foreground">
              Events, classes, and important updates get lost in endless chat
              messages
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:users" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Limited Discovery</h3>
            <p class="text-muted-foreground">
              You only see what's shared in your groups, missing out on many
              opportunities
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Why Switch to WeDance?
        </h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-background rounded-xl p-8 shadow-sm">
            <div class="flex items-center gap-4 mb-6">
              <img src="/whatsapp.svg" alt="WhatsApp" class="w-8 h-8" />
              <h3 class="text-2xl font-semibold">WhatsApp Groups</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Multiple groups to join and manage</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Important info gets buried in chat</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>No way to filter or search events</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Limited to group members only</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>No profiles or community features</span>
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
                <span>All dance info in one organized place</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Structured events with all details</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Smart filters for styles and locations</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Connect with entire dance community</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Rich profiles and social features</span>
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
          Everything You Need in One Place
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon name="ph:calendar-check" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Organized Events</h3>
            <p class="text-muted-foreground">
              Find all dance events with clear details, prices, and RSVP lists
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-three" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Dance Partners</h3>
            <p class="text-muted-foreground">
              Find practice partners and connect with dancers who match your
              style
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:map-pin" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">City Groups</h3>
            <p class="text-muted-foreground">
              Join your local dance scene and stay updated with community news
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:car" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Festival Planning</h3>
            <p class="text-muted-foreground">
              Share rides and accommodation for dance festivals and events
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:user-circle" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Dancer Profiles</h3>
            <p class="text-muted-foreground">
              Create your dance profile and connect with the community
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:chat-centered" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Focused Discussions</h3>
            <p class="text-muted-foreground">
              Chat about events and topics without the noise
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">
          Ready to Upgrade Your Dance Life?
        </h2>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of dancers who've already made the switch to a better
          way of connecting
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" class="text-lg px-12" as-child>
            <NuxtLink
              to="/events"
              class="flex items-center justify-center gap-2"
            >
              Browse Events
            </NuxtLink>
          </Button>
          <Button size="lg" variant="primary" class="text-lg" as-child>
            <NuxtLink
              to="/register"
              class="flex items-center justify-center gap-2"
            >
              Get Started Free
              <Icon name="ph:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </Button>
        </div>
        <div class="text-sm text-primary-foreground/60 mt-4">
          ⚡️ 2-minute setup • No credit card required
        </div>
      </div>
    </section>
  </div>
</template>
