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
            WeDance vs Own Website
          </h1>
          <p class="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get all the features you need without the hassle of building and
            maintaining your own website
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
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Common Website Challenges
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:money" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">High Costs</h3>
            <p class="text-muted-foreground">
              Expensive development, hosting, and maintenance fees
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:code" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Technical Complexity</h3>
            <p class="text-muted-foreground">
              Need for technical expertise to build and maintain features
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:users" class="w-10 h-10 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Limited Reach</h3>
            <p class="text-muted-foreground">
              No built-in community or connection to the wider dance scene
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
          <div class="bg-background rounded-xl p-8 shadow-sm">
            <div class="flex items-center gap-4 mb-6">
              <Icon name="ph:globe" class="w-8 h-8 text-muted-foreground" />
              <h3 class="text-2xl font-semibold">Own Website</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>High development and maintenance costs</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Need technical expertise</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Limited community features</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>No built-in dance network</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:x-circle"
                  class="w-5 h-5 text-destructive mt-1"
                />
                <span>Time-consuming updates</span>
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
                <span>Free to start, affordable plans</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>No technical skills needed</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Built-in dance community</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Regular feature updates</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1"
                />
                <span>Professional support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Everything You Need Built-In
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon name="ph:calendar-check" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Event Management</h3>
            <p class="text-muted-foreground">
              Create and manage events with built-in ticketing and RSVPs
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-three" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Community Features</h3>
            <p class="text-muted-foreground">
              Connect with dancers, share updates, and grow your audience
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:credit-card" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Payment Processing</h3>
            <p class="text-muted-foreground">
              Accept payments securely with multiple payment options
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:chart-line" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Analytics</h3>
            <p class="text-muted-foreground">
              Track attendance, engagement, and growth with detailed insights
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:device-mobile" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Mobile Optimized</h3>
            <p class="text-muted-foreground">
              Perfect experience on all devices without extra development
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:lifebuoy" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Expert Support</h3>
            <p class="text-muted-foreground">
              Get help when you need it from our dedicated support team
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of dance organizers who trust WeDance to grow their
          community
        </p>
        <div class="flex justify-center">
          <Button size="lg" variant="secondary" class="text-lg px-12" as-child>
            <NuxtLink
              to="/register"
              class="flex items-center justify-center gap-2"
            >
              Create Your Profile
              <Icon name="ph:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
