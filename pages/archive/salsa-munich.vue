<template>
  <!-- Hero Section - Keep existing but add city context -->
  <div class="pt-24 pb-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- City Context -->
      <div
        class="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm"
      >
        <div class="flex items-center gap-4">
          <button
            class="flex items-center gap-1 text-foreground-muted hover:text-primary"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            Munich, Germany
          </button>
          <span class="text-foreground-muted">·</span>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span class="text-foreground-muted">127 dancers online</span>
          </div>
        </div>
        <div class="flex items-center gap-2 text-foreground-muted">
          <span>Also popular in:</span>
          <div class="flex items-center gap-2">
            <a href="#" class="hover:text-primary">Berlin</a>
            <span>·</span>
            <a href="#" class="hover:text-primary">Vienna</a>
            <span>·</span>
            <a href="#" class="hover:text-primary">+12 cities</a>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left Column -->
        <div class="flex-1">
          <div class="mb-8">
            <h1 class="text-4xl font-bold mb-4">Salsa in Munich</h1>

            <!-- Value Proposition -->
            <div class="space-y-4 mb-6">
              <p class="text-xl text-foreground-muted">
                Join Munich's most vibrant dance community with daily events,
                dedicated teachers, and friendly dancers.
              </p>
              <div class="flex flex-wrap gap-4 text-sm">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>45+ weekly classes</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>1,200+ active dancers</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>12 verified teachers</span>
                </div>
              </div>
            </div>

            <!-- Today's Highlights -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div class="bg-primary/10 p-4 rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                  <div
                    class="w-2 h-2 bg-success rounded-full animate-pulse"
                  ></div>
                  <span class="text-sm font-medium text-primary"
                    >Happening Now</span
                  >
                </div>
                <div class="font-medium">Social Dancing</div>
                <div class="text-sm text-foreground-muted">
                  23 dancers at Havana Club
                </div>
                <button class="mt-2 text-primary text-sm font-medium">
                  Join now →
                </button>
              </div>

              <div class="bg-primary/10 p-4 rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                  <svg
                    class="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="text-sm font-medium text-primary"
                    >Next Class</span
                  >
                </div>
                <div class="font-medium">Beginner Salsa</div>
                <div class="text-sm text-foreground-muted">
                  In 2 hours · 6 spots left
                </div>
                <button class="mt-2 text-primary text-sm font-medium">
                  Book now →
                </button>
              </div>

              <div class="bg-primary/10 p-4 rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                  <svg
                    class="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="text-sm font-medium text-primary"
                    >Practice Partners</span
                  >
                </div>
                <div class="font-medium">12 Looking Today</div>
                <div class="text-sm text-foreground-muted">
                  All levels welcome
                </div>
                <button class="mt-2 text-primary text-sm font-medium">
                  Find partner →
                </button>
              </div>
            </div>

            <!-- Continue with existing content (About, Styles, etc) -->
          </div>
        </div>

        <!-- Right Column -->
        <div class="lg:w-[420px]">
          <div
            class="bg-white border rounded-xl shadow-sm overflow-hidden sticky top-24"
          >
            <div class="p-6">
              <!-- Success Story -->
              <div class="mb-6 bg-primary/10 rounded-lg p-4">
                <div class="flex items-center gap-3 mb-3">
                  <img
                    class="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                    alt="Maria"
                  />
                  <div>
                    <div class="font-medium">Maria</div>
                    <div class="text-sm text-foreground-muted">
                      Started 3 months ago
                    </div>
                  </div>
                </div>
                <p class="text-sm text-foreground-muted italic">
                  "Found amazing teachers and dance partners through WeDance.
                  Now I dance 3 times a week!"
                </p>
              </div>

              <!-- Continue with existing Start Dancing Today section -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Tabs -->
  <div class="border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex space-x-8 overflow-x-auto">
        <a
          href="/styles/salsa"
          class="border-b-2 border-primary px-1 pb-4 text-sm font-medium text-primary whitespace-nowrap"
          >Overview</a
        >
        <a
          href="/styles/salsa/events"
          class="border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-foreground-muted hover:text-foreground whitespace-nowrap"
          >Events</a
        >
        <a
          href="/styles/salsa/teachers"
          class="border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-foreground-muted hover:text-foreground whitespace-nowrap"
          >Teachers</a
        >
        <a
          href="/styles/salsa/learn"
          class="border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-foreground-muted hover:text-foreground whitespace-nowrap"
          >Learn</a
        >
        <a
          href="/styles/salsa/community"
          class="border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-foreground-muted hover:text-foreground whitespace-nowrap"
          >Community</a
        >
      </nav>
    </div>
  </div>

  <!-- Main Content -->
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Learning Path -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-6">Your Learning Path</h2>
              <div class="space-y-6">
                <!-- Completed Step -->
                <div class="flex items-center gap-4">
                  <div class="bg-success/10 p-2 rounded-full">
                    <svg
                      class="w-6 h-6 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-medium">Basic Steps</div>
                    <div class="text-sm text-foreground-muted">
                      Foundation patterns completed
                    </div>
                  </div>
                  <span class="text-success text-sm">Completed</span>
                </div>

                <!-- Current Step -->
                <div class="flex items-center gap-4">
                  <div class="bg-accent p-2 rounded-full">
                    <svg
                      class="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-medium">Partner Work</div>
                    <div class="text-sm text-foreground-muted">
                      Learn to dance with a partner
                    </div>
                    <div class="mt-2 w-full bg-secondary rounded-full h-2">
                      <div
                        class="bg-primary h-2 rounded-full"
                        style="width: 60%"
                      ></div>
                    </div>
                  </div>
                  <span class="text-primary text-sm">In Progress</span>
                </div>

                <!-- Locked Step -->
                <div class="flex items-center gap-4 opacity-50">
                  <div class="bg-muted p-2 rounded-full">
                    <svg
                      class="w-6 h-6 text-foreground-muted"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-medium">Advanced Patterns</div>
                    <div class="text-sm text-foreground-muted">
                      Complex combinations and styling
                    </div>
                  </div>
                  <span class="text-foreground-muted text-sm">Locked</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Global Scene -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-6">Global Salsa Scene</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-primary/10 p-4 rounded-lg">
                  <div class="text-sm text-primary mb-1">Featured Congress</div>
                  <div class="font-medium">Cuban Salsa Congress</div>
                  <div class="text-sm text-foreground-muted">
                    Havana, Dec 2024
                  </div>
                  <button class="mt-3 text-primary text-sm font-medium">
                    Learn more →
                  </button>
                </div>
                <div class="bg-primary/10 p-4 rounded-lg">
                  <div class="text-sm text-primary mb-1">Featured Festival</div>
                  <div class="font-medium">World Salsa Summit</div>
                  <div class="text-sm text-foreground-muted">
                    Miami, Jan 2025
                  </div>
                  <button class="mt-3 text-primary text-sm font-medium">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Safety Guidelines -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <div class="flex items-center gap-3 mb-6">
                <div class="bg-success/10 p-2 rounded-full">
                  <svg
                    class="w-6 h-6 text-success"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h2 class="text-xl font-bold">Community Guidelines</h2>
              </div>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-success mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <div class="font-medium">Verified Venues</div>
                    <p class="text-sm text-foreground-muted">
                      All partner venues follow our safety protocols
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-success mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <div class="font-medium">Certified Teachers</div>
                    <p class="text-sm text-foreground-muted">
                      Background-checked and skill-verified instructors
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg
                    class="w-5 h-5 text-success mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <div class="font-medium">Community Support</div>
                    <p class="text-sm text-foreground-muted">
                      24/7 support and dedicated safety officers at events
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Find Partners -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold">Find Partners</h2>
                <span
                  class="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
                  >12 online</span
                >
              </div>
              <div class="space-y-4">
                <div
                  class="flex items-center gap-4 p-3 bg-primary/10 rounded-lg"
                >
                  <img
                    class="w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
                    alt="Dancer"
                  />
                  <div class="flex-1">
                    <div class="font-medium">Maria</div>
                    <div class="text-sm text-foreground-muted">
                      Intermediate · 2km away
                    </div>
                  </div>
                  <button class="text-primary hover:text-primary/70">
                    Connect
                  </button>
                </div>
                <!-- More partner cards -->
              </div>
              <button
                class="w-full mt-4 text-primary hover:text-primary/70 text-sm font-medium"
              >
                View all partners →
              </button>
            </div>
          </div>

          <!-- Upcoming Events -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="p-6">
              <h2 class="text-xl font-bold mb-6">This Week</h2>
              <div class="space-y-4">
                <!-- Event Card -->
                <div class="flex gap-4">
                  <div class="text-center">
                    <div class="text-sm font-medium text-primary">THU</div>
                    <div class="text-2xl font-bold">15</div>
                  </div>
                  <div class="flex-1">
                    <div class="font-medium">Salsa Night</div>
                    <div class="text-sm text-foreground-muted">
                      Havana Club · 8 PM
                    </div>
                    <div class="mt-2 flex items-center gap-2">
                      <span class="text-sm text-primary">23 going</span>
                      <span class="text-foreground-muted">·</span>
                      <span class="text-sm text-foreground-muted"
                        >2.5km away</span
                      >
                    </div>
                  </div>
                </div>
                <!-- More event cards -->
              </div>
              <button
                class="w-full mt-4 text-primary hover:text-primary/70 text-sm font-medium"
              >
                View full calendar →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
