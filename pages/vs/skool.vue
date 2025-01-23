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
            WeDance vs Skool
          </h1>
          <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            A platform built for dance education - connect with students, manage
            classes, and grow your dance community
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
                Start Teaching
                <Icon name="ph:arrow-right" class="w-5 h-5" />
              </NuxtLink>
            </Button>
          </div>
          <div class="text-sm text-white/60 mt-4">
            ⚡️ 5-minute setup • No credit card required
          </div>
        </div>
      </div>
    </section>

    <!-- Pain Points Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Common Dance Teacher Challenges
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:student" class="w-10 h-10 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Finding Students</h3>
            <p class="text-gray-600">
              Hard to reach dancers looking for classes in your style and level
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:calendar" class="w-10 h-10 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Class Management</h3>
            <p class="text-gray-600">
              Juggling schedules, bookings, and student communications across
              platforms
            </p>
          </div>
          <div class="bg-muted rounded-xl p-6">
            <Icon name="ph:users" class="w-10 h-10 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Building Community</h3>
            <p class="text-gray-600">
              No way to connect students and foster a supportive learning
              environment
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
              <Icon name="ph:graduation-cap" class="w-8 h-8 text-gray-600" />
              <h3 class="text-2xl font-semibold">Skool</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Generic course platform</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>No built-in dance audience</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>Limited in-person class features</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>No partner matching</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="ph:x-circle" class="w-5 h-5 text-red-500 mt-1" />
                <span>High monthly fees</span>
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
                <span>Dance-focused teaching tools</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Active local dance community</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>In-person & online class support</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Student-partner matching</span>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="ph:check-circle"
                  class="w-5 h-5 text-green-500 mt-1"
                />
                <span>Free to start teaching</span>
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
          Tools Built for Dance Teachers
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="p-6">
            <Icon
              name="ph:chalkboard-teacher"
              class="w-8 h-8 text-purple-600 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">Class Management</h3>
            <p class="text-gray-600">
              Schedule classes, manage registrations, and track attendance
              easily
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:users-three" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Student Community</h3>
            <p class="text-gray-600">
              Create practice groups, share updates, and foster student
              connections
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:chart-line" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p class="text-gray-600">
              Monitor student development and customize learning paths
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:video-camera" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Hybrid Teaching</h3>
            <p class="text-gray-600">
              Run in-person classes, online sessions, or both seamlessly
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:wallet" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Payment Handling</h3>
            <p class="text-gray-600">
              Accept payments, manage subscriptions, and track revenue
            </p>
          </div>
          <div class="p-6">
            <Icon name="ph:megaphone" class="w-8 h-8 text-purple-600 mb-4" />
            <h3 class="text-xl font-semibold mb-2">Marketing Tools</h3>
            <p class="text-gray-600">
              Promote classes to local dancers and grow your student base
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">
          Ready to Grow Your Dance Classes?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join teachers who are building thriving dance communities with WeDance
        </p>
        <div class="flex justify-center">
          <Button size="lg" variant="secondary" class="text-lg px-12" as-child>
            <NuxtLink
              to="/register"
              class="flex items-center justify-center gap-2"
            >
              Start Teaching
              <Icon name="ph:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>
