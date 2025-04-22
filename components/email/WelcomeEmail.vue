<script setup lang="ts">
import { Button } from '@/components/ui/button'
import WeDanceLogo from '@/components/WeDanceLogo.vue'

defineProps<{
  firstName: string
  dashboardUrl: string
  profileUrl: string
  classesUrl: string
  supportEmail: string
}>()
</script>

<template>
  <div class="max-w-[600px] mx-auto bg-background p-8 rounded-lg shadow-sm">
    <!-- Header -->
    <div class="text-center mb-8">
      <WeDanceLogo class="h-12 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-foreground mb-2">
        Welcome to WeDance – Let's Get Started!
      </h1>
      <p class="text-muted-foreground">
        Hi {{ firstName }}, we're excited to have you join our dance community!
      </p>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      <!-- Registration Confirmation -->
      <div class="bg-muted/50 p-4 rounded-lg">
        <p class="text-sm text-muted-foreground">
          Your registration was successful. Your account is now ready to use.
        </p>
      </div>

      <!-- Key Features -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-foreground">Discover WeDance</h2>
        <div class="grid gap-4">
          <div class="flex items-start gap-3">
            <Icon name="ph:users" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 class="font-medium text-foreground">Find Dance Classes</h3>
              <p class="text-sm text-muted-foreground">
                Browse and join dance classes in your area or online
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Icon name="ph:heart" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 class="font-medium text-foreground">Connect with Dancers</h3>
              <p class="text-sm text-muted-foreground">
                Meet dance partners and join the global dance community
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Icon name="ph:sparkle" class="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 class="font-medium text-foreground">Premium Features</h3>
              <p class="text-sm text-muted-foreground">
                Access exclusive content and advanced features
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Actions -->
      <div class="space-y-3">
        <Button variant="primary" class="w-full" :href="dashboardUrl">
          Go to Dashboard
        </Button>
        <div class="grid grid-cols-2 gap-3">
          <Button variant="secondary" :href="classesUrl">
            Find Your First Dance Class
          </Button>
          <Button variant="secondary" :href="profileUrl">
            Complete Your Profile
          </Button>
        </div>
      </div>

      <!-- Support Section -->
      <div class="border-t pt-6">
        <h3 class="font-medium text-foreground mb-2">Need Help?</h3>
        <p class="text-sm text-muted-foreground">
          Our support team is here to help you get started. Contact us at
          <a
            :href="`mailto:${supportEmail}`"
            class="text-primary hover:underline"
          >
            {{ supportEmail }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
