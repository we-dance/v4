<script setup lang="ts">
import type { Course } from '~/schemas/course'
import { formatCurrencyCents, formatSubscriptionDuration } from '~/utils/format'

const router = useRouter()

const { course } = defineProps<{
  course: Course
}>()

const dialog = useDialog()

const getItems = (offer: any) => {
  return offer.items.split('\n')
}

const offers = computed(() => {
  return course.offers.sort((a, b) => a.price - b.price)
})

const handleSelect = (offer: any) => {
  router.push(`/checkout/${offer.id}`)
  dialog.close()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Choose Your Plan</DialogTitle>
    <DialogDescription>
      Select a subscription plan that best suits your learning goals
    </DialogDescription>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <button
      v-for="offer in offers"
      :key="offer.id"
      variant="secondary"
      class="flex w-full justify-between h-auto py-4 px-4 shadow-sm border rounded-md hover:border-accent hover:bg-muted hover:text-background-foreground text-sm font-medium"
      @click="handleSelect(offer)"
    >
      <div class="flex flex-wrap items-center gap-3">
        <div class="text-left">
          <div class="font-bold">{{ offer.name }}</div>
          <ul class="mt-2 text-sm text-muted-foreground">
            <li
              v-for="(item, index) in getItems(offer)"
              :key="index"
              class="flex gap-x-2 gap-y-2"
            >
              <Icon name="ph:check" class="w-4 h-4 text-accent flex-none" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="text-right flex-none">
        <div class="font-bold">
          {{ formatCurrencyCents(offer.price, offer.currency) }}
        </div>
        <div class="text-sm text-muted-foreground">
          {{ formatSubscriptionDuration(offer.duration) }}
        </div>
      </div>
    </button>

    <p class="text-xs text-center text-muted-foreground mt-4">
      All plans include 24-hours money-back guarantee. Cancel anytime.
    </p>
  </div>
</template>
