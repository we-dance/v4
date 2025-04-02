<script setup lang="ts">
import type { Course } from '~/schemas/course'
import { formatCurrencyCents } from '~/utils/format'

const { course } = defineProps<{
  course: Course
  onSelect?: () => void
}>()

const emit = defineEmits<{
  (e: 'select', offer: String): void
  (e: 'close'): void
}>()
</script>

<template>
  <DialogHeader>
    <DialogTitle>Choose Your Plan</DialogTitle>
    <DialogDescription>
      Select a subscription plan that best suits your learning goals
    </DialogDescription>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <Button
      v-for="offer in course.offers"
      :key="offer.id"
      variant="outline"
      @click="
        () => {
          onSelect?.()
          navigateTo(`/checkout/${course.slug}?type=course&offer=${offer.id}`)
        }
      "
      class="w-full h-auto p-4 text-left"
    >
      <div class="flex items-center justify-between w-full gap-4">
        <!-- Left: offer details -->
        <div class="flex-1">
          <div class="font-bold mb-2">{{ offer.name }}</div>
          <ul class="space-y-1">
            <li
              v-for="(item, index) in offer.items"
              :key="index"
              class="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon
                name="ph:check"
                class="w-3.5 h-3.5 text-accent flex-shrink-0"
              />
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Right: price -->
        <div class="text-right whitespace-nowrap">
          <div class="font-bold">
            {{ formatCurrencyCents(offer.price, offer.currency) }}
          </div>
          <div class="text-sm text-muted-foreground">
            {{ offer.duration === 'P1M' ? 'Monthly' : 'Yearly' }}
          </div>
        </div>
      </div>
    </Button>

    <p class="text-xs text-center text-muted-foreground mt-4">
      All plans include 24-hours money-back guarantee. Cancel anytime.
    </p>
  </div>
</template>
