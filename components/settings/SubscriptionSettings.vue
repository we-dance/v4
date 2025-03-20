<script setup lang="ts">
import { ref } from 'vue'
import { formatDate } from '~/utils/format'

// Mock data - will be replaced with real subscription data later
const activeSubscriptions = ref([
  {
    id: 'sub_123456',
    name: 'Salsa Ladies Styling',
    plan: 'Premium',
    price: 60,
    currency: 'EUR',
    interval: 'month',
    nextBillingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
])

const hasActiveSubscription = computed(
  () => activeSubscriptions.value.length > 0
)
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-medium">Subscription</h2>
        <p class="text-sm text-muted-foreground mt-1">
          Manage your course and membership subscriptions
        </p>
      </div>
    </div>

    <!-- Active subscription -->
    <div v-if="hasActiveSubscription" class="space-y-4">
      <div
        v-for="subscription in activeSubscriptions"
        :key="subscription.id"
        class="bg-card rounded-md border shadow-sm"
      >
        <div class="p-4 md:p-6">
          <div class="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div
                class="flex items-center gap-2 text-sm text-muted-foreground mb-1"
              >
                <Icon name="ph:credit-card" class="w-4 h-4" />
                <span>Active subscription</span>
              </div>
              <h3 class="text-base font-medium">{{ subscription.name }}</h3>
              <div class="text-sm space-y-1 mt-2">
                <p class="text-foreground">
                  {{ subscription.plan }} plan • {{ subscription.price }}
                  {{ subscription.currency }}/{{ subscription.interval }}
                </p>
                <p class="text-muted-foreground">
                  Next billing date:
                  {{ formatDate(subscription.nextBillingDate.toISOString()) }}
                </p>
              </div>
            </div>
            <div class="flex items-center">
              <Button
                variant="outline"
                size="sm"
                class="text-destructive border-destructive hover:bg-destructive/10"
                @click="$emit('openCancelDialog', subscription)"
              >
                Cancel subscription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No subscription state -->
    <div v-else class="bg-card rounded-md border shadow-sm p-6 text-center">
      <Icon
        name="ph:credit-card-slash"
        class="w-10 h-10 text-muted-foreground mx-auto mb-2"
      />
      <h3 class="text-base font-medium mb-1">No active subscriptions</h3>
      <p class="text-sm text-muted-foreground mb-4">
        You don't have any active course or membership subscriptions.
      </p>
      <Button as-child variant="outline" size="sm">
        <NuxtLink to="/courses"> Browse courses </NuxtLink>
      </Button>
    </div>
  </section>
</template>
