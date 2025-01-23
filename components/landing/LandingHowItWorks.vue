<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>

<template>
  <section class="py-24 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 text-foreground">
          {{ title }}
        </h2>
        <p class="text-xl text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <div class="relative">
        <!-- Connection Line (Desktop) -->
        <div
          class="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20"
        ></div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          <!-- Step 1 -->
          <div class="relative">
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 rounded-[40%_60%_60%_40%_/_70%_30%_70%_30%] bg-gradient-to-br from-fuchsia-500 to-accent shadow-lg flex items-center justify-center mb-6 transform transition-all hover:scale-110 hover:rotate-6"
              >
                <Icon name="ph:compass" class="w-10 h-10 text-white" />
              </div>
              <div class="text-center">
                <div class="text-accent font-medium mb-2">Step 1</div>
                <h3 class="text-xl font-bold mb-3 text-foreground">
                  Find Your Scene
                </h3>
                <p class="text-muted-foreground">
                  Choose your city and dance styles - we'll show you what's
                  happening tonight
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="relative">
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 rounded-[60%_40%_30%_70%_/_30%_30%_70%_70%] bg-gradient-to-br from-purple-500 to-accent shadow-lg flex items-center justify-center mb-6 transform transition-all hover:scale-110 hover:-rotate-6"
              >
                <Icon name="ph:users-three" class="w-10 h-10 text-white" />
              </div>
              <div class="text-center">
                <div class="text-accent font-medium mb-2">Step 2</div>
                <h3 class="text-xl font-bold mb-3 text-foreground">
                  Meet Dancers
                </h3>
                <p class="text-muted-foreground">
                  Join local groups, find dance buddies, and plan festival trips
                  together
                </p>
              </div>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="relative">
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 rounded-[40%_60%_30%_70%_/_60%_30%_70%_40%] bg-gradient-to-br from-orange-500 to-accent shadow-lg flex items-center justify-center mb-6 transform transition-all hover:scale-110 hover:rotate-6"
              >
                <Icon name="ph:calendar-check" class="w-10 h-10 text-white" />
              </div>
              <div class="text-center">
                <div class="text-accent font-medium mb-2">Step 3</div>
                <h3 class="text-xl font-bold mb-3 text-foreground">
                  Join Events
                </h3>
                <p class="text-muted-foreground">
                  Book classes, attend socials, and experience amazing festivals
                </p>
              </div>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="relative">
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 rounded-[30%_70%_70%_30%_/_50%_50%_50%_50%] bg-gradient-to-br from-pink-500 to-accent shadow-lg flex items-center justify-center mb-6 transform transition-all hover:scale-110 hover:-rotate-6"
              >
                <Icon name="ph:heart-fill" class="w-10 h-10 text-white" />
              </div>
              <div class="text-center">
                <div class="text-accent font-medium mb-2">Step 4</div>
                <h3 class="text-xl font-bold mb-3 text-foreground">
                  Fall in Love
                </h3>
                <p class="text-muted-foreground">
                  With the dance, the music, the community, and the lifestyle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
