<template>
  <div>
    <!-- Hero Section -->
    <section
      class="pt-32 pb-24 bg-gradient-to-br from-purple-600 to-purple-900 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
      ></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
            WeDance vs Instagram
          </h1>
          <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            A platform built for dancers, not influencers. Find events,
            partners, and your local dance community.
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
          Common Instagram Frustrations
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:calendar-x" class="w-10 h-10 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Missing Events</h3>
            <p class="text-gray-600">
              Events get lost in stories and posts, making it hard to find
              what's happening tonight
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon
              name="ph:users-three"
              class="w-10 h-10 text-purple-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Hard to Connect</h3>
            <p class="text-gray-600">
              No way to find dance partners or join practice groups in your area
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:funnel" class="w-10 h-10 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Content Overload</h3>
            <p class="text-gray-600">
              Dance content mixed with everything else, no focus on local scene
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
          <div class="bg-white rounded-xl p-8 shadow-sm">
            <div class="flex items-center gap-4 mb-6">
              <Icon
                name="simple-icons:instagram"
                class="w-8 h-8 text-pink-600"
              />
              <h3 class="text-2xl font-semibold">Instagram</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Events buried in stories and posts</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>No way to find dance partners</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Mixed with non-dance content</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Can't filter by dance style or level</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>No local dance community features</span>
              </li>
            </ul>
          </div>
          <div
            class="bg-white rounded-xl p-8 shadow-sm border-2 border-purple-600"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center"
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
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Organized calendar of dance events</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Find partners matching your style and level</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>100% focused on dance community</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Smart filters for styles, levels, and location</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Connect with your local dance scene</span>
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
          Built for Dancers Like You
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon
              name="ph:calendar-check"
              class="w-8 h-8 text-purple-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Event Discovery</h3>
            <p class="text-gray-600">
              Find socials, festivals, and workshops - all in one organized
              calendar
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-three" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Partner Finding</h3>
            <p class="text-gray-600">
              Connect with dancers who match your style, level, and availability
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:map-pin" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Local Scene</h3>
            <p class="text-gray-600">
              Join your city's dance community and stay updated with local news
            </p>
          </div>
          <div class="p-6">
            <Icon
              name="ph:graduation-cap"
              class="w-8 h-8 text-purple-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Learning Journey</h3>
            <p class="text-gray-600">
              Track your progress and find classes matching your level
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-four" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Practice Groups</h3>
            <p class="text-gray-600">
              Create or join practice groups to improve together
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:ticket" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Festival Planning</h3>
            <p class="text-gray-600">
              Share rides and accommodation, coordinate with dance friends
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Join Your Dance Community</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with dancers who share your passion and are looking to dance
          tonight
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
