<template>
  <div>
    <!-- Hero Section -->
    <div class="relative min-h-[80vh] flex items-center overflow-hidden">
      <GradientBackground />

      <!-- Content -->
      <div class="relative w-full py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Left: Content -->
            <div class="text-center lg:text-left">
              <div
                class="flex items-center justify-center lg:justify-start gap-2 text-background/80 mb-4"
              >
                <Badge variant="secondary">
                  <Icon name="ph:sparkle" class="w-4 h-4 mr-1" />
                  Early Access
                </Badge>
              </div>
              <h1
                class="text-4xl lg:text-7xl font-extrabold text-background tracking-tight mb-6"
              >
                The Future of Dance Spaces
              </h1>
              <p
                class="text-xl text-background/80 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Be among the first venues to join our platform. Connect with
                organizers, manage bookings, and grow your dance business
                globally.
              </p>
              <div
                class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Button size="lg" variant="primary" as-child>
                  <NuxtLink to="/register">
                    Join Early Access
                    <Icon name="ph:arrow-right" class="w-5 h-5" />
                  </NuxtLink>
                </Button>
                <Button size="lg" variant="secondary" as-child>
                  <NuxtLink to="/events/200">
                    How It Works
                    <Icon name="ph:play-circle" class="w-5 h-5" />
                  </NuxtLink>
                </Button>
              </div>
              <div
                class="mt-8 flex items-center justify-center lg:justify-start gap-8 text-background/80"
              >
                <div class="flex items-center gap-2">
                  <Icon name="ph:check-circle" class="w-5 h-5 text-success" />
                  <span>5-minute setup</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="ph:crown" class="w-5 h-5 text-success" />
                  <span>Founding member benefits</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="ph:star" class="w-5 h-5 text-success" />
                  <span>First month free</span>
                </div>
              </div>
            </div>

            <!-- Right: Value Proposition -->
            <div class="grid grid-cols-2 gap-6">
              <div
                class="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20"
              >
                <Icon
                  name="ph:calendar"
                  class="w-8 h-8 text-background/80 mb-4"
                />
                <div class="text-xl font-bold text-background mb-2">
                  Smart Scheduling
                </div>
                <div class="text-background/80">
                  Manage multiple spaces and rooms with ease
                </div>
              </div>
              <div
                class="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20"
              >
                <Icon name="ph:users" class="w-8 h-8 text-background/80 mb-4" />
                <div class="text-xl font-bold text-background mb-2">
                  Event Discovery
                </div>
                <div class="text-background/80">
                  Connect with organizers looking for spaces
                </div>
              </div>
              <div
                class="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20"
              >
                <Icon
                  name="ph:credit-card"
                  class="w-8 h-8 text-background/80 mb-4"
                />
                <div class="text-xl font-bold text-background mb-2">
                  Simple Payments
                </div>
                <div class="text-background/80">
                  Secure payments and automatic payouts
                </div>
              </div>
              <div
                class="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-background/20"
              >
                <Icon
                  name="ph:chart-line"
                  class="w-8 h-8 text-background/80 mb-4"
                />
                <div class="text-xl font-bold text-background mb-2">
                  Business Tools
                </div>
                <div class="text-background/80">
                  Analytics and marketing tools included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-4">
          Simple & Transparent Pricing
        </h2>
        <p
          class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          No hidden fees. No monthly charges. Only pay when you get bookings.
        </p>
        <div class="max-w-lg mx-auto">
          <div class="bg-muted rounded-xl p-8">
            <Icon name="ph:buildings" class="w-12 h-12 text-primary mb-6" />
            <h3 class="text-xl font-semibold mb-4">Venue Management</h3>
            <ul class="space-y-3 text-muted-foreground">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Studio & venue bookings</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Calendar management</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Automated scheduling</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Marketing tools</span>
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-border">
              <div class="text-sm text-muted-foreground">Platform fee</div>
              <div class="text-3xl font-bold text-primary">5%</div>
              <div class="text-sm text-muted-foreground mt-1">per booking</div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-sm text-muted-foreground max-w-2xl mx-auto">
            All fees include payment processing, hosting, and platform tools.
            Get paid directly to your bank account every week.
          </p>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Maximize Your Space's Potential
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-8">
            <Icon name="ph:calendar" class="w-12 h-12 text-primary mb-6" />
            <h3 class="text-xl font-semibold mb-4">Smart Scheduling</h3>
            <ul class="space-y-3 text-muted-foreground">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Manage multiple spaces and rooms</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Handle booking requests efficiently</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Automated availability updates</span>
              </li>
            </ul>
          </div>

          <div class="bg-muted rounded-xl p-8">
            <Icon name="ph:users" class="w-12 h-12 text-primary mb-6" />
            <h3 class="text-xl font-semibold mb-4">Reach More Organizers</h3>
            <ul class="space-y-3 text-muted-foreground">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Get discovered by event organizers</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Showcase your space's features</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Build your venue's reputation</span>
              </li>
            </ul>
          </div>

          <div class="bg-muted rounded-xl p-8">
            <Icon name="ph:chart-line" class="w-12 h-12 text-primary mb-6" />
            <h3 class="text-xl font-semibold mb-4">Grow Revenue</h3>
            <ul class="space-y-3 text-muted-foreground">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Flexible pricing and packages</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Secure payment processing</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-success mt-1 shrink-0"
                />
                <span>Track bookings and revenue</span>
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
          Tools Built for Dance Venues
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon name="ph:calendar-check" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Booking Management</h3>
            <p class="text-muted-foreground">
              Handle reservations and scheduling with ease
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:image" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Venue Profile</h3>
            <p class="text-muted-foreground">
              Showcase your space with photos and details
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:credit-card" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Payment Processing</h3>
            <p class="text-muted-foreground">
              Accept payments and manage deposits securely
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:chat-circle" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Communication</h3>
            <p class="text-muted-foreground">
              Chat with organizers and manage inquiries
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:star" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Reviews & Ratings</h3>
            <p class="text-muted-foreground">
              Build trust with verified reviews
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:chart-bar" class="w-8 h-8 text-primary mb-4" />
            <h3 class="text-xl font-semibold mb-2">Analytics</h3>
            <p class="text-muted-foreground">
              Track occupancy and revenue metrics
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          What Venue Owners Say
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-accent rounded-full"></div>
              <div>
                <div class="font-semibold">James Wilson</div>
                <div class="text-muted-foreground">Dance Studio Owner</div>
              </div>
            </div>
            <p class="text-muted-foreground">
              "WeDance has helped us fill empty slots and connect with quality
              event organizers. Our booking rate has increased significantly."
            </p>
          </div>
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-accent rounded-full"></div>
              <div>
                <div class="font-semibold">Emma Rodriguez</div>
                <div class="text-muted-foreground">Event Space Manager</div>
              </div>
            </div>
            <p class="text-muted-foreground">
              "The booking management system is fantastic. It's streamlined our
              operations and reduced administrative work."
            </p>
          </div>
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-accent rounded-full"></div>
              <div>
                <div class="font-semibold">Thomas Lee</div>
                <div class="text-muted-foreground">
                  Community Center Director
                </div>
              </div>
            </div>
            <p class="text-muted-foreground">
              "Being part of WeDance has brought us a steady stream of dance
              events and helped us better serve our community."
            </p>
          </div>
        </div>
      </div>
    </section>

    <LandingGetStarted
      title="Be Among the First Venues"
      description="Join now and get exclusive founding member benefits"
      secondary="Founding Member Benefits"
      secondaryLink="/founding-members"
    />
  </div>
</template>
