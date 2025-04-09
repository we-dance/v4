<script setup lang="ts">
import {
  formatDateShort,
  formatCurrencyCents,
  formatSubscriptionDuration,
} from '~/utils/format'

const { $client } = useNuxtApp()

const subscriptions = await $client.subscriptions.list.query()

async function cancelSubscription(subscriptionId: string) {
  await $client.subscriptions.cancel.mutate({ subscriptionId })
}
</script>

<template>
  <EmptyState v-if="subscriptions.length === 0" variant="no-subscriptions" />
  <div
    v-else
    v-for="subscription in subscriptions"
    :key="subscription.id"
    class="p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <div class="flex flex-row gap-4 items-start text-sm text-gray-600">
      <img
        v-if="subscription.offer.course.coverUrl"
        :src="subscription.offer.course.coverUrl"
        alt="Course Cover"
        class="w-24 h-24 object-cover rounded-md"
      />
      <div>
        <h2 class="text-xl font-medium text-gray-800">
          {{ subscription.offer.course.name }}
        </h2>
        <p class="font-bold mb-2">
          {{ subscription.offer.name }}
        </p>
        <p>Status: {{ subscription.status }}</p>
        <p>
          {{
            formatCurrencyCents(
              subscription.offer.price,
              subscription.offer.currency
            )
          }}/{{ formatSubscriptionDuration(subscription.offer.duration) }}
        </p>
        <p>Start: {{ formatDateShort(subscription.createdAt) }}</p>
        <p v-if="subscription.nextBillingDate">
          Renewal: {{ formatDateShort(subscription.nextBillingDate) }}
        </p>
        <p v-if="subscription.endAt">
          End: {{ formatDateShort(subscription.endAt) }}
        </p>
        <Button
          v-if="subscription.status === 'active'"
          variant="destructive"
          class="mt-2"
          @click="cancelSubscription(subscription.id)"
          >Cancel</Button
        >
      </div>
    </div>
  </div>
</template>
