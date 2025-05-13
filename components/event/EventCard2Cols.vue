<script setup lang="ts">
import { Prisma } from '@prisma/client'
import { getTime } from '~/utils'

type EventDetails = Prisma.EventGetPayload<{
  include: {
    venue: true
    organizer: true
    styles: true
  }
}>

const props = withDefaults(
  defineProps<{
    event: EventDetails
    isEmbed?: boolean
    showRole?: boolean
    showOrganizer?: boolean
    side: 'date' | 'time'
  }>(),
  {
    isEmbed: false,
    showRole: false,
    showOrganizer: false,
    side: 'date',
  }
)
</script>

<template>
  <NuxtLink
    :to="`/events/${event.id}`"
    :target="isEmbed ? '_blank' : '_self'"
    class="bg-background border-solid border-2 border-background hover:border-gray-200 grid grid-cols-event p-4 gap-2 overflow-hidden whitespace-nowrap"
  >
    <div class="overflow-hidden flex flex-col gap-2">
      <div class="flex items-center text-foreground/50">
        {{ getTime(event.startDate) }}
      </div>
      <div class="font-bold overflow-hidden text-lg text-wrap leading-tight">
        {{ event.name }}
      </div>
      <div class="flex items-center gap-1 text-foreground/50">
        <Avatar :profile="event.organizer" class="w-4 h-4 rounded-full" />
        <span>By {{ event.organizer.name }}</span>
      </div>
      <div class="flex items-center gap-1 text-foreground/50">
        <Icon name="heroicons:map-pin" class="h-4 w-4" />
        <span class="truncate">{{ event.venue.name }}</span>
      </div>
      <div v-if="event.price">
        <span
          class="truncate bg-success/10 text-success px-2 py-1 rounded text-xs font-bold"
          >{{ event.price }}</span
        >
      </div>
    </div>
    <div>
      <NuxtImg
        v-if="event.cover"
        class="w-20 rounded"
        format="webp"
        width="68"
        height="68"
        fit="fill"
        loading="lazy"
        :src="event.cover"
        :alt="`${event.name} cover photo`"
      />
    </div>
  </NuxtLink>
</template>

<style scoped>
[data-error] {
  @apply hidden;
}
</style>
