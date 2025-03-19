<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  muted: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="py-16 bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground">
          {{ title }}
        </h2>
        <p class="text-muted-foreground mt-2">
          {{ description }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- For Dancers -->
        <div
          class="group bg-card hover:bg-accent/5 rounded-2xl p-8 shadow-lg border border-border transition-all duration-300 hover:scale-[1.02]"
        >
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-[40%_60%_60%_40%_/_70%_30%_70%_30%] bg-gradient-to-br from-fuchsia-500 to-accent transform transition-all duration-300 group-hover:rotate-6"
            >
              <Icon name="ph:users-three" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-foreground">For Dancers</h3>
            <p class="text-muted-foreground text-sm">
              Never dance alone - find your perfect partners, events, and
              community
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[60%_40%_30%_70%_/_30%_30%_70%_70%] bg-gradient-to-br from-fuchsia-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:users" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">
                  Dance Partners & Hangouts
                </h4>
                <p class="text-sm text-muted-foreground">
                  Find practice partners that match your style and level, join
                  social dance meetups
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[40%_60%_30%_70%_/_60%_30%_70%_40%] bg-gradient-to-br from-fuchsia-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:calendar" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">
                  Festival & Event Planning
                </h4>
                <p class="text-sm text-muted-foreground">
                  Share rides, split accommodation costs, and coordinate
                  festival trips with other dancers
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[30%_70%_70%_30%_/_50%_50%_50%_50%] bg-gradient-to-br from-fuchsia-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:money" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">Promote & Earn</h4>
                <p class="text-sm text-muted-foreground">
                  Share events and earn rewards, grow your dance influence
                  <NuxtLink
                    to="/for/dancers"
                    class="text-accent hover:text-accent/90 font-medium ml-1 whitespace-nowrap"
                  >
                    Learn more
                    <Icon
                      name="ph:arrow-right"
                      class="inline-block w-3.5 h-3.5 ml-0.5"
                    />
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- For Artists -->
        <div
          class="group bg-card hover:bg-accent/5 rounded-2xl p-8 shadow-lg border border-border transition-all duration-300 hover:scale-[1.02]"
        >
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-[60%_40%_30%_70%_/_30%_30%_70%_70%] bg-gradient-to-br from-purple-500 to-accent transform transition-all duration-300 group-hover:-rotate-6"
            >
              <Icon name="ph:microphone-stage" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-foreground">For Artists</h3>
            <p class="text-muted-foreground text-sm">
              Create courses, get bookings, and grow your dance business
              <NuxtLink
                to="/for/artists"
                class="text-accent hover:text-accent/90 font-medium ml-1"
              >
                Learn more
                <Icon
                  name="ph:arrow-right"
                  class="inline-block w-4 h-4 ml-0.5"
                />
              </NuxtLink>
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[40%_60%_60%_40%_/_70%_30%_70%_30%] bg-gradient-to-br from-purple-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:video-camera" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">Online Courses</h4>
                <p class="text-sm text-muted-foreground">
                  Create pre-recorded courses and live classes
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[30%_70%_70%_30%_/_50%_50%_50%_50%] bg-gradient-to-br from-purple-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:calendar-check" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">
                  Private Bookings
                </h4>
                <p class="text-sm text-muted-foreground">
                  Get booked for workshops, classes and professional performances
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[40%_60%_30%_70%_/_60%_30%_70%_40%] bg-gradient-to-br from-purple-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:money" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">Promote & Earn</h4>
                <p class="text-sm text-muted-foreground">
                  Let your students promote your classes and earn rewards
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- For Organizers -->
        <div
          class="group bg-card hover:bg-accent/5 rounded-2xl p-8 shadow-lg border border-border transition-all duration-300 hover:scale-[1.02]"
        >
          <div class="text-center mb-6">
            <div
              class="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-[40%_60%_30%_70%_/_60%_30%_70%_40%] bg-gradient-to-br from-orange-500 to-accent transform transition-all duration-300 group-hover:rotate-6"
            >
              <Icon name="ph:buildings" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-foreground">
              For Organizers
            </h3>
            <p class="text-muted-foreground text-sm">
              Create events, sell tickets, and grow your dance business
              <NuxtLink
                to="/for/organizers"
                class="text-accent hover:text-accent/90 font-medium ml-1"
              >
                Learn more
                <Icon
                  name="ph:arrow-right"
                  class="inline-block w-4 h-4 ml-0.5"
                />
              </NuxtLink>
            </p>
          </div>

          <div class="space-y-4">
            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[60%_40%_30%_70%_/_30%_30%_70%_70%] bg-gradient-to-br from-orange-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:ticket" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">
                  Events & Festivals
                </h4>
                <p class="text-sm text-muted-foreground">
                  Manage parties, courses, and festivals with simple ticketing
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[40%_60%_60%_40%_/_70%_30%_70%_30%] bg-gradient-to-br from-orange-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:users-three" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">
                  Resource Booking
                </h4>
                <p class="text-sm text-muted-foreground">
                  Book venues, teachers, DJs, and manage your resources
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 group/item">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-[30%_70%_70%_30%_/_50%_50%_50%_50%] bg-gradient-to-br from-orange-500/80 to-accent/80 flex-shrink-0 mt-0.5 transform transition-all duration-300 group-hover/item:scale-110"
              >
                <Icon name="ph:money" class="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 class="font-medium mb-1 text-foreground">
                  Community Growth
                </h4>
                <p class="text-sm text-muted-foreground">
                  Empower your community to promote events and earn rewards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
