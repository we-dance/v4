<script setup lang="ts">
import { getMinPrice } from '~/utils/format'

const { course } = defineProps<{
  course: any
}>()

const emit = defineEmits<{
  (e: 'viewPricing'): void
  (e: 'joinWaitlist'): void
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4">
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">Registration</h3>
          <div v-if="course.offers.length > 0" class="text-2xl font-bold">
            from {{ getMinPrice(course.offers) }}
            <span class="text-base font-normal text-muted-foreground"></span>
          </div>
        </div>

        <Button
          v-if="course.offers.length > 0"
          class="w-full"
          variant="primary"
          @click="emit('viewPricing')"
        >
          View Pricing Plans
        </Button>
        <Button
          v-else
          class="w-full"
          variant="primary"
          @click="emit('joinWaitlist')"
        >
          Join Waitlist
        </Button>

        <p
          v-if="course.offers.length > 0"
          class="text-xs text-center text-muted-foreground"
        >
          24-hours money-back guarantee
        </p>
      </div>
    </div>
  </div>
</template>
