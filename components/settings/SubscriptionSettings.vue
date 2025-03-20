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
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="ph:credit-card" class="w-5 h-5" />
      Subscription
    </h2>

    <!-- Active subscription -->
    <div v-if="hasActiveSubscription" class="divide-y">
      <div
        v-for="subscription in activeSubscriptions"
        :key="subscription.id"
        class="py-4 first:pt-0 last:pb-0"
      >
        <div class="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div class="text-sm text-muted-foreground mb-1">
              Active subscription
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

    <!-- No subscription state -->
    <div v-else class="text-center py-6">
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
  </div>
</template>
