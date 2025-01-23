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
                class="flex items-center justify-center lg:justify-start gap-2 text-white/80 mb-4"
              >
                <Badge variant="secondary">
                  <Icon name="ph:star" class="w-4 h-4 mr-1" />
                  Trusted by 500+ Artists
                </Badge>
              </div>
              <h1
                class="text-4xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
              >
                Turn Your Dance Skills Into Income
              </h1>
              <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
                Join 500+ dance artists earning €1000+ monthly through online
                classes, bookings, and performances
              </p>
              <div
                class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Button size="lg" variant="primary" as-child>
                  <NuxtLink to="/register">
                    Start Earning Now
                    <Icon name="ph:arrow-right" class="w-5 h-5" />
                  </NuxtLink>
                </Button>
                <Button size="lg" variant="secondary" as-child>
                  <NuxtLink to="#how-it-works">
                    How It Works
                    <Icon name="ph:play-circle" class="w-5 h-5" />
                  </NuxtLink>
                </Button>
              </div>
              <div
                class="mt-8 flex items-center justify-center lg:justify-start gap-8 text-white/80"
              >
                <div class="flex items-center gap-2">
                  <Icon name="ph:check-circle" class="w-5 h-5 text-green-400" />
                  <span>5-minute setup</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="ph:credit-card" class="w-5 h-5 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="ph:star" class="w-5 h-5 text-green-400" />
                  <span>First month free</span>
                </div>
              </div>
            </div>

            <!-- Right: Stats Grid -->
            <div class="grid grid-cols-2 gap-6">
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div class="text-4xl font-bold text-white mb-2">€800+</div>
                <div class="text-white/80">
                  Average monthly earnings from online courses
                </div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div class="text-4xl font-bold text-white mb-2">95%</div>
                <div class="text-white/80">Keep from your private bookings</div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div class="text-4xl font-bold text-white mb-2">15+</div>
                <div class="text-white/80">
                  Countries reached by our artists
                </div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div class="text-4xl font-bold text-white mb-2">10K+</div>
                <div class="text-white/80">Active students on the platform</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Streams Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-4">
          Multiple Ways to Earn
        </h2>
        <p
          class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Simple pricing, instant payouts, and all the tools you need to succeed
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-8">
            <Icon
              name="ph:video-camera"
              class="w-12 h-12 text-purple-600 mb-6"
            />
            <h3 class="text-xl font-semibold mb-4">Online Classes</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Pre-recorded courses (70% earnings)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Live Zoom classes (€0.25/ticket)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Unlimited students worldwide</span>
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="text-sm text-gray-500">Average monthly earnings</div>
              <div class="text-2xl font-bold text-purple-600">€800+</div>
            </div>
          </div>

          <div class="bg-muted rounded-xl p-8">
            <Icon
              name="ph:calendar-check"
              class="w-12 h-12 text-purple-600 mb-6"
            />
            <h3 class="text-xl font-semibold mb-4">Private Bookings</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Private classes (95% earnings)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Event performances (95% earnings)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Automatic scheduling & payments</span>
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="text-sm text-gray-500">Average monthly earnings</div>
              <div class="text-2xl font-bold text-purple-600">€1200+</div>
            </div>
          </div>

          <div class="bg-muted rounded-xl p-8">
            <Icon name="ph:megaphone" class="w-12 h-12 text-purple-600 mb-6" />
            <h3 class="text-xl font-semibold mb-4">Festival Gigs</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Festival teaching (95% earnings)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Show performances (95% earnings)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>International opportunities</span>
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="text-sm text-gray-500">Average per festival</div>
              <div class="text-2xl font-bold text-purple-600">€500+</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-4">All-in-One Platform</h2>
        <p
          class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Everything you need to run your dance business professionally
        </p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-xl">
            <Icon name="ph:video-camera" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Course Creator</h3>
            <p class="text-gray-600">
              Professional video hosting, curriculum builder, and student
              progress tracking
            </p>
          </div>
          <div class="p-6 bg-white rounded-xl">
            <Icon name="ph:credit-card" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Payment System</h3>
            <p class="text-gray-600">
              Secure payments, automatic payouts, and financial reporting
            </p>
          </div>
          <div class="p-6 bg-white rounded-xl">
            <Icon name="ph:users-three" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Student Portal</h3>
            <p class="text-gray-600">
              Student profiles, messaging, and progress tracking
            </p>
          </div>
          <div class="p-6 bg-white rounded-xl">
            <Icon name="ph:calendar" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Booking Calendar</h3>
            <p class="text-gray-600">
              Smart scheduling, availability management, and reminders
            </p>
          </div>
          <div class="p-6 bg-white rounded-xl">
            <Icon name="ph:chart-line" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Analytics</h3>
            <p class="text-gray-600">
              Revenue tracking, student engagement, and growth insights
            </p>
          </div>
          <div class="p-6 bg-white rounded-xl">
            <Icon name="ph:storefront" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Marketing Suite</h3>
            <p class="text-gray-600">
              SEO optimization, social sharing, and promotional tools
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-4">Success Stories</h2>
        <p
          class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Join hundreds of dance artists already growing their income
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-accent rounded-full"></div>
              <div>
                <div class="font-semibold">Sarah Johnson</div>
                <div class="text-gray-600">Salsa Instructor</div>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "My online courses now generate €2000/month passive income. The
              course creation tools made it easy to start with zero tech
              experience."
            </p>
            <div class="text-sm text-purple-600 font-medium">
              📈 €24,000+ earned in 2024
            </div>
          </div>
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-accent rounded-full"></div>
              <div>
                <div class="font-semibold">Michael Chen</div>
                <div class="text-gray-600">Dance Studio Owner</div>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "Private bookings increased 300% in 3 months. The platform brings
              me new students every week without any marketing effort."
            </p>
            <div class="text-sm text-purple-600 font-medium">
              🎯 80+ new students in 2024
            </div>
          </div>
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-accent rounded-full"></div>
              <div>
                <div class="font-semibold">Maria Garcia</div>
                <div class="text-gray-600">Bachata Performer</div>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "Got booked for 5 international festivals in my first month. The
              exposure and booking system is game-changing."
            </p>
            <div class="text-sm text-purple-600 font-medium">
              🌍 15+ countries reached
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Start Growing Your Income Today</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the fastest-growing platform for dance artists
        </p>
        <div class="flex justify-center gap-4">
          <Button size="lg" variant="secondary" class="text-lg px-12" as-child>
            <NuxtLink
              to="/register"
              class="flex items-center justify-center gap-2"
            >
              Create Free Account
              <Icon name="ph:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </Button>
        </div>
        <div class="mt-6 text-sm text-gray-500">
          Already used by 500+ dance artists in 20+ countries
        </div>
      </div>
    </section>
  </div>
</template>
