<script setup>
import { getYmd, getDate, getDay } from '~/utils'

const props = defineProps({
  events: Array,
})

const items = computed(() => props.events || [])

const itemsByDate = computed(() => {
  const result = {}

  for (const item of items.value) {
    const date = getYmd(item.startDate)
    result[date] = result[date] || []
    result[date].push(item)
  }

  return result
})

const $i18n = {
  locale: 'en',
}
</script>

<template>
  <section class="max-w-screen-sm mx-auto flex flex-col gap-4">
    <div
      v-for="(items, date) in itemsByDate"
      :key="date"
      class="flex flex-col gap-4"
    >
      <h2 class="sticky top-16 z-30 -ml-8">
        <div class="inline-block">
          <div
            class="flex flex-row gap-2 bg-background px-4 py-2 shadow-xl rounded-full items-center"
          >
            <div class="w-2 h-2 bg-accent rounded-full ml-1"></div>
            <span class="font-bold text-primary">{{ getDate(date) }} </span
            ><span class="text-foreground/50">{{ getDay(date) }}</span>
          </div>
        </div>
      </h2>
      <div class="flex flex-col gap-4">
        <EventCard2Cols
          v-for="item in items"
          :key="item.id"
          :event="item"
          class="rounded-lg"
        />
      </div>
    </div>
  </section>
</template>
