<template>
  <div>
    <!-- Hero Section -->
    <section
      class="pt-32 pb-24 relative overflow-hidden"
    >
      <GradientBackground />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center">
          <h1
            class="text-4xl md:text-6xl font-bold text-primary mb-6"
          >
            WeDance vs Others
          </h1>
          <p class="text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
            See how WeDance compares to other platforms and why it's the best
            choice for dancers
          </p>
        </div>
      </div>
    </section>

    <!-- Comparison Links Section -->
    <section class="py-16 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-4">Compare WeDance</h2>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
          See how WeDance compares to other platforms
        </p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink to="/vs/instagram" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:instagram-logo" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs Instagram</h3>
              </div>
              <p class="text-muted-foreground">
                Dance-focused platform vs social media
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/whatsapp" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:chat-circle-text" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs WhatsApp</h3>
              </div>
              <p class="text-muted-foreground">
                Organized dance community vs chat groups
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/fitogram" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:calendar-check" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs Fitogram</h3>
              </div>
              <p class="text-muted-foreground">
                Dance studio management and class booking
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/tickettailor" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:ticket" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs TicketTailor</h3>
              </div>
              <p class="text-muted-foreground">
                Dance-focused event platform vs generic ticketing
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/skool" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:student" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs Skool</h3>
              </div>
              <p class="text-muted-foreground">
                Dance education and community platform
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/salsaforums" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:chats-circle" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs SalsaForums</h3>
              </div>
              <p class="text-muted-foreground">
                Modern community features vs traditional forums
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/reddit" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:reddit-logo" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs Reddit</h3>
              </div>
              <p class="text-muted-foreground">
                Dedicated dance platform vs general discussion
              </p>
            </div>
          </NuxtLink>

          <NuxtLink to="/vs/website" class="group">
            <div
              class="bg-muted rounded-xl p-8 hover:bg-accent/10 transition-colors"
            >
              <div class="flex items-center gap-4 mb-4">
                <Icon name="ph:globe" class="w-8 h-8 text-primary" />
                <h3 class="text-2xl font-semibold">vs Own Website</h3>
              </div>
              <p class="text-muted-foreground">
                All-in-one platform vs custom development
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <LandingGetStarted
      title="Ready to Join WeDance?"
      description="Experience the best platform built specifically for dancers"
      secondary="Founding Member Benefits"
      secondaryLink="/founding-members"
    />
  </div>
</template>
