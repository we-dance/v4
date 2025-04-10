<script setup lang="ts">
import {
  formatDateShort,
  formatCurrencyCents,
  formatSubscriptionDuration,
} from '~/utils/format'

const { $client } = useNuxtApp()

const subscriptions = ref<any[]>([])

async function loadSubscriptions() {
  subscriptions.value = await $client.subscriptions.list.query()
}

await loadSubscriptions()

async function cancelSubscription(subscriptionId: string) {
  await $client.subscriptions.cancel.mutate({ subscriptionId })
  await loadSubscriptions()
}
</script>

<template>
  <EmptyState v-if="subscriptions.length === 0" variant="no-subscriptions" />
  <div v-else class="space-y-4">
    <div
      v-for="subscription in subscriptions"
      :key="subscription.id"
      class="p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div class="flex flex-row gap-4 items-start text-sm">
        <img
          v-if="subscription.offer.course.coverUrl"
          :src="subscription.offer.course.coverUrl"
          alt="Course Cover"
          class="w-24 h-24 object-cover rounded-md"
        />
        <div class="w-full">
          <h2 class="text-xl font-medium">
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
          <div class="flex flex-row gap-2 mt-2 justify-end w-full">
            <Button
              v-if="subscription.status === 'active'"
              variant="destructive"
              @click="cancelSubscription(subscription.id)"
              >Cancel</Button
            >
            <Button as-child>
              <NuxtLink :to="`/courses/${subscription.offer.course.slug}`">
                View Course
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
