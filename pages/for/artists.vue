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
                  <Icon name="ph:sparkle" class="w-4 h-4 mr-1" />
                  Early Access
                </Badge>
              </div>
              <h1
                class="text-4xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
              >
                The Future of Dance Business
              </h1>
              <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
                Be among the first artists to join our platform. Create online
                courses, get bookings, and grow your dance business globally.
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
                  <NuxtLink to="/courses/1">
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
                  <Icon name="ph:crown" class="w-5 h-5 text-green-400" />
                  <span>Founding member benefits</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="ph:star" class="w-5 h-5 text-green-400" />
                  <span>First month free</span>
                </div>
              </div>
            </div>

            <!-- Right: Value Proposition -->
            <div class="grid grid-cols-2 gap-6">
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Icon
                  name="ph:video-camera"
                  class="w-8 h-8 text-white/80 mb-4"
                />
                <div class="text-xl font-bold text-white mb-2">
                  Online Courses
                </div>
                <div class="text-white/80">
                  Create and sell dance courses to students worldwide
                </div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Icon
                  name="ph:users-three"
                  class="w-8 h-8 text-white/80 mb-4"
                />
                <div class="text-xl font-bold text-white mb-2">
                  Private Classes
                </div>
                <div class="text-white/80">
                  Get booked for private lessons and workshops
                </div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Icon name="ph:ticket" class="w-8 h-8 text-white/80 mb-4" />
                <div class="text-xl font-bold text-white mb-2">
                  Festival Gigs
                </div>
                <div class="text-white/80">
                  Perform and teach at international festivals
                </div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <Icon name="ph:chart-line" class="w-8 h-8 text-white/80 mb-4" />
                <div class="text-xl font-bold text-white mb-2">
                  Business Tools
                </div>
                <div class="text-white/80">
                  Everything you need to grow your dance business
                </div>
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
          Simple & Transparent Pricing
        </h2>
        <p
          class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          No hidden fees. No monthly charges. Only pay when you earn.
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-8">
            <Icon
              name="ph:video-camera"
              class="w-12 h-12 text-purple-600 mb-6"
            />
            <h3 class="text-xl font-semibold mb-4">Pre-recorded Courses</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Create unlimited courses</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Set your own prices</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Reach global audience</span>
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="text-sm text-gray-500">Platform fee</div>
              <div class="text-3xl font-bold text-purple-600">30%</div>
              <div class="text-sm text-gray-500 mt-1">per sale</div>
            </div>
          </div>

          <div class="bg-muted rounded-xl p-8">
            <Icon
              name="ph:users-three"
              class="w-12 h-12 text-purple-600 mb-6"
            />
            <h3 class="text-xl font-semibold mb-4">Live Classes</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Host Zoom classes</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Automatic ticketing</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Manage registrations</span>
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="text-sm text-gray-500">Platform fee</div>
              <div class="text-3xl font-bold text-purple-600">€0.25</div>
              <div class="text-sm text-gray-500 mt-1">per ticket</div>
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
                <span>Private classes</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Festival performances</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1 shrink-0"
                />
                <span>Workshop bookings</span>
              </li>
            </ul>
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="text-sm text-gray-500">Platform fee</div>
              <div class="text-3xl font-bold text-purple-600">5%</div>
              <div class="text-sm text-gray-500 mt-1">per booking</div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-sm text-gray-500 max-w-2xl mx-auto">
            All fees include payment processing, hosting, and platform tools.
            Get paid directly to your bank account every week.
          </p>
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
        <h2 class="text-3xl font-bold text-center mb-4">Join Our Vision</h2>
        <p
          class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Be among the first artists to shape the future of dance education
        </p>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-purple-100 rounded-full"></div>
              <div>
                <div class="font-semibold">For Dance Teachers</div>
                <div class="text-gray-600">Create & Sell Courses</div>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "I'm excited about the opportunity to reach students worldwide
              with my online courses. The platform makes it easy to start with
              zero tech experience."
            </p>
            <div class="text-sm text-purple-600 font-medium">
              🎓 Pre-recorded & live classes
            </div>
          </div>
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-purple-100 rounded-full"></div>
              <div>
                <div class="font-semibold">For Performers</div>
                <div class="text-gray-600">Get More Bookings</div>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "Looking forward to a platform that helps me manage bookings and
              grow my performance career. The tools look perfect for
              professional artists."
            </p>
            <div class="text-sm text-purple-600 font-medium">
              🎭 Private & festival bookings
            </div>
          </div>
          <div class="bg-muted rounded-xl p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 bg-purple-100 rounded-full"></div>
              <div>
                <div class="font-semibold">For Studio Owners</div>
                <div class="text-gray-600">Grow Your Business</div>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "Can't wait to use the business tools to streamline my studio
              operations and reach new students in my area."
            </p>
            <div class="text-sm text-purple-600 font-medium">
              🏢 Complete business solution
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-4">Why Choose WeDance?</h2>
        <p
          class="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          See how WeDance compares to platforms you might be using today
        </p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink to="/vs/instagram" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon
                  name="ph:instagram-logo"
                  class="w-8 h-8 text-purple-600"
                />
                <h3 class="text-2xl font-semibold">vs Instagram</h3>
              </div>
              <p class="text-gray-600">
                Better reach and direct student engagement vs social media
                algorithms
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/skool" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:student" class="w-8 h-8 text-purple-600" />
                <h3 class="text-2xl font-semibold">vs Skool</h3>
              </div>
              <p class="text-gray-600">
                Dance-specific features vs general course platform
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/tickettailor" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:ticket" class="w-8 h-8 text-purple-600" />
                <h3 class="text-2xl font-semibold">vs TicketTailor</h3>
              </div>
              <p class="text-gray-600">
                Specialized dance event tools vs generic ticketing
              </p>
            </div>
          </NuxtLink>
        </div>

        <div class="mt-8 text-center">
          <Button variant="outline" as-child>
            <NuxtLink to="/vs" class="flex items-center justify-center gap-2">
              See All Comparisons
              <Icon name="ph:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>

    <LandingGetStarted
      title="Be Among the First Artists"
      description="Join now and get exclusive founding member benefits"
      secondary="Founding Member Benefits"
      secondaryLink="/founding-members"
    />
  </div>
</template>
