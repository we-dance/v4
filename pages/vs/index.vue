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
            WeDance vs Others
          </h1>
          <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            See how WeDance compares to other platforms and why it's the best
            choice for dancers
          </p>
        </div>
      </div>
    </section>

    <!-- Comparison Links Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Dance-focused platform vs social media
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/whatsapp" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon
                  name="ph:chat-circle-text"
                  class="w-8 h-8 text-purple-600"
                />
                <h3 class="text-2xl font-semibold">vs WhatsApp</h3>
              </div>
              <p class="text-gray-600">
                Organized dance community vs chat groups
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/fitogram" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon
                  name="ph:calendar-check"
                  class="w-8 h-8 text-purple-600"
                />
                <h3 class="text-2xl font-semibold">vs Fitogram</h3>
              </div>
              <p class="text-gray-600">
                Dance studio management and class booking
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
                Dance-focused event platform vs generic ticketing
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
                Dance education and community platform
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/salsaforums" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:chats-circle" class="w-8 h-8 text-purple-600" />
                <h3 class="text-2xl font-semibold">vs SalsaForums</h3>
              </div>
              <p class="text-gray-600">
                Modern community features vs traditional forums
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/reddit" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:reddit-logo" class="w-8 h-8 text-purple-600" />
                <h3 class="text-2xl font-semibold">vs Reddit</h3>
              </div>
              <p class="text-gray-600">
                Dedicated dance platform vs general discussion
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/website" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:globe" class="w-8 h-8 text-purple-600" />
                <h3 class="text-2xl font-semibold">vs Own Website</h3>
              </div>
              <p class="text-gray-600">
                All-in-one platform vs custom development
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Join WeDance?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience the best platform built specifically for dancers
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
