<script setup>
import { formatDate } from '~/utils/format'

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
})

const eventsWithCover = computed(() =>
  props.events.filter((event) => event.cover)
)

const column1 = computed(() =>
  eventsWithCover.value.filter((_, index) => index % 4 === 0)
)

const column2 = computed(() =>
  eventsWithCover.value.filter((_, index) => index % 4 === 1)
)

const column3 = computed(() =>
  eventsWithCover.value.filter((_, index) => index % 4 === 2)
)

const column4 = computed(() =>
  eventsWithCover.value.filter((_, index) => index % 4 === 3)
)
</script>

<template>
  <div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="column in [column1, column2, column3, column4]"
        :key="column.id"
        className="flex flex-col gap-4"
      >
        <NuxtLink
          v-for="event in column"
          :key="event.id"
          :to="`/events/${event.id}`"
          class="group relative"
        >
          <NuxtImg :src="event.cover" />
          <div
            class="absolute inset-0 invisible group-hover:visible bg-black/80 flex flex-col gap-2 p-4"
          >
            <h3 class="text-white text-lg leading-tight font-bold">
              {{ event.name }}
            </h3>
            <p class="text-white text-sm">
              {{ formatDate(event.startDate) }}
            </p>
            <p class="text-white text-sm">
              {{ event.venue.name
              }}<template v-if="event.venue.city"
                >, {{ event.venue.city.name }}</template
              >
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
