<script setup lang="ts">
import type { AnyEvent } from '~/schemas/event'
import { formatDate } from '~/utils/format'

const props = defineProps<{
  event: AnyEvent
  showBookmark?: boolean
}>()

const emit = defineEmits(['share', 'bookmark', 'book'])

const getPrice = (event: AnyEvent) => {
  if (!event.prices?.length) return ''

  const lowestPrice = event.prices.reduce(
    (min, p) => (p.amount < min.amount ? p : min),
    event.prices[0]
  )

  if (!lowestPrice) return 'Free'

  // If there is more than one price, show "From"
  const prefix = event.prices.length > 1 ? 'From ' : ''
  return `${prefix}${lowestPrice.amount} ${lowestPrice.currency}`
}
</script>

<template>
  <NuxtLink :to="`/events/${event.id}`" class="block">
    <article
      class="bg-background rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div class="aspect-[16/9] bg-primary/10 relative overflow-hidden">
        <img
          :src="event.image || '/images/event-placeholder.jpg'"
          :alt="event.name"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent"
        ></div>
        <div class="absolute bottom-4 left-4 right-4 text-foreground">
          <div class="text-sm font-medium mb-1">
            {{ formatDate(event.date.start) }}
          </div>
          <div class="font-bold truncate">{{ event.name }}</div>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-4">
          <div class="min-w-0">
            <div
              class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
            >
              <Icon name="ph:map-pin" class="w-4 h-4 flex-shrink-0" />
              <span class="truncate"
                >{{ event.location.name }}, {{ event.location.city }}</span
              >
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <div class="flex items-center gap-2">
                <Icon name="ph:ticket" class="w-4 h-4 flex-shrink-0" />
                <span class="truncate">{{ getPrice(event) }}</span>
              </div>
              <button
                v-if="showBookmark"
                class="flex items-center"
                @click.stop.prevent="emit('bookmark')"
              >
                <Icon
                  name="ph:bookmark-simple"
                  class="w-5 h-5 text-muted-foreground"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>
