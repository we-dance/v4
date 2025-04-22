<script setup>
import UserPoints from '~/components/common/UserPoints.vue'

const steps = [
  {
    title: 'Complete Your Profile',
    description:
      'Add your dance styles, experience level, and a profile photo to help others find you.',
    icon: 'ph:user-circle',
    action: 'Edit Profile',
    to: '/settings/profile',
    energy: '+5',
    energyLabel: 'for completion',
  },
  {
    title: 'Discover Local Events',
    description:
      'Find dance events, workshops, and socials happening in your city.',
    icon: 'ph:calendar',
    action: 'Browse Events',
    to: '/events',
    energy: '+1',
    energyLabel: 'per check-in',
  },
  {
    title: 'Connect with Dancers',
    description:
      'Meet dance partners, teachers, and join local dance communities.',
    icon: 'ph:users',
    action: 'Meet Dancers',
    to: '/feed',
    energy: '+2',
    energyLabel: 'per connection',
  },
]
</script>

<template>
  <div class="min-h-screen bg-muted py-32">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Success Message -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-6"
        >
          <Icon name="ph:check-bold" class="w-8 h-8 text-success" />
        </div>
        <h1 class="text-3xl font-bold text-foreground mb-4">
          Welcome to WeDance!
        </h1>
        <p class="text-lg text-muted-foreground">
          Your account has been successfully created. Let's get you started!
        </p>
      </div>

      <!-- Next Steps -->
      <div class="bg-background rounded-xl shadow-sm border p-8">
        <h2 class="text-xl font-semibold mb-8">Next Steps</h2>
        <div class="space-y-8">
          <div v-for="(step, index) in steps" :key="index" class="flex gap-6">
            <div class="flex-shrink-0">
              <div
                class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Icon :name="step.icon" class="w-6 h-6 text-primary" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-4 mb-1">
                <h3 class="text-lg font-medium">{{ step.title }}</h3>
                <div class="flex items-center gap-1">
                  <span class="text-sm text-muted-foreground">{{
                    step.energyLabel
                  }}</span>
                  <UserPoints :points="step.energy" />
                </div>
              </div>
              <p class="text-muted-foreground mb-4">{{ step.description }}</p>
              <Button variant="secondary" as-child>
                <NuxtLink :to="step.to" class="flex items-center gap-2">
                  {{ step.action }}
                  <Icon name="ph:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>

        <!-- Dance Energy Explanation -->
        <div class="mt-8 pt-8 border-t">
          <div class="flex items-center gap-2 text-sm text-warning mb-2">
            <Icon name="heroicons:fire" class="w-4 h-4" />
            <span class="font-medium">Dance Energy</span>
          </div>
          <p class="text-sm text-muted-foreground">
            Dance Energy is our community reward system. Earn energy by
            completing actions, participating in events, and connecting with
            other dancers. Higher energy levels unlock special features and show
            your active contribution to the dance community.
            <NuxtLink to="/energy" class="text-warning hover:text-warning ml-1">
              Learn more →
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Skip Option -->
      <div class="text-center mt-8">
        <NuxtLink to="/" class="text-muted-foreground hover:text-primary">
          Skip for now and go to homepage
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
