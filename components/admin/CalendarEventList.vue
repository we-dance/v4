<script setup lang="ts">
const { $client } = useNuxtApp()

const props = defineProps<{ id: string }>()
const id = toRef(props, 'id')

const { data: calendars } = await $client.calendars.getAll.useQuery()
const calendar = computed(
  () => (calendars.value ?? []).find((c) => c.id === id.value) ?? null
)
</script>

<template>
  <div v-if="calendar" class="container py-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:calendar" class="w-5 h-5" />
      Events from {{ calendar.name || 'Selected Calendar' }}
    </h2>
    <div class="space-y-4">
      <div v-for="event in calendar.events || []" :key="event.id">
        <EventImportPreview :item="event" show-date />
      </div>
    </div>
  </div>
</template>
