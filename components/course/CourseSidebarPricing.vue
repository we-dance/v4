<script setup lang="ts">
import { getMinPrice } from '~/utils/format'

const { course } = defineProps<{
  course: any
}>()

const emit = defineEmits<{
  (e: 'viewPricing'): void
}>()
</script>

<template>
  <div class="bg-background rounded-xl shadow-sm overflow-hidden">
    <div class="p-4">
      <div class="space-y-4">
        <div>
          <h3 class="font-semibold mb-2">Starting from</h3>
          <div class="text-2xl font-bold">
            {{ getMinPrice(course.offers) }}
            <span class="text-base font-normal text-muted-foreground"></span>
          </div>
        </div>

        <Button class="w-full" variant="primary" @click="emit('viewPricing')">
          View Pricing Plans
        </Button>

        <p class="text-xs text-center text-muted-foreground">
          24-hours money-back guarantee
        </p>
      </div>
    </div>
  </div>
</template>
