<script setup lang="ts">
import type { Course } from '~/schemas/course'
import { formatCurrencyCents } from '~/utils/format'

const { course } = defineProps<{
  course: Course
}>()

const emit = defineEmits<{
  (e: 'select', offer: any): void
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
      class="w-full justify-between h-auto py-4 hover:border-accent"
      as-child
    >
      <NuxtLink :to="`/checkout/${course.slug}?type=course&offer=${offer.id}`">
        <div class="flex items-center gap-3">
          <div class="text-left flex-1">
            <div class="font-bold">{{ offer.name }}</div>
            <ul class="mt-2 space-y-1">
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
        </div>
        <div class="text-right">
          <div class="font-bold">
            {{ formatCurrencyCents(offer.price, offer.currency) }}
          </div>
          <div class="text-sm text-muted-foreground">
            {{ offer.duration === 'P1M' ? 'Monthly' : 'Yearly' }}
          </div>
        </div>
      </NuxtLink>
    </Button>

    <p class="text-xs text-center text-muted-foreground mt-4">
      All plans include 24-hours money-back guarantee. Cancel anytime.
    </p>
  </div>
</template>
