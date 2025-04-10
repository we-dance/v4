<script setup lang="ts">
import { formatDateShort } from '~/utils/format'

const { subscription } = defineProps<{
  subscription: any
}>()

const offer = computed(() => subscription.offer)
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-6">
      <h2 class="text-lg font-semibold">{{ offer.name }}</h2>
      <p class="text-sm text-muted-foreground mt-1">
        Subscribed since: {{ formatDateShort(subscription.createdAt) }}
      </p>
      <p
        v-if="subscription.nextBillingDate"
        class="text-sm text-muted-foreground"
      >
        Renewal Date: {{ formatDateShort(subscription.nextBillingDate) }}
      </p>
      <p class="text-sm text-muted-foreground">
        Status: {{ subscription.status }}
      </p>
      <div class="mt-4 flex space-x-2">
        <Button variant="outline" as-child>
          <NuxtLink :to="`/settings/billing`">Manage Subscriptions</NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
