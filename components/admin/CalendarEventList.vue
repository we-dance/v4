<script setup lang="ts">
const { $client } = useNuxtApp()

const props = defineProps<{ id: string }>()
const id = toRef(props, 'id')

const calendar = await $client.calendars.getById.query({ id: id.value })
</script>

<template>
  <div v-if="calendar" class="container py-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:calendar" class="w-5 h-5" />
      Events from {{ calendar.name || 'Selected Calendar' }}
    </h2>

    <div v-if="calendar && calendar.events?.length" class="space-y-4">
      <div v-for="event in calendar.events" :key="event.id">
        <EventImportPreview :item="event" show-date />
      </div>
    </div>

    <div v-else class="text-center py-12">
      <Icon
        name="heroicons:calendar"
        class="w-12 h-12 mx-auto text-muted-foreground mb-4"
      />
      <h3 class="text-lg font-medium mb-2">No upcoming events</h3>
      <p class="text-muted-foreground">
        This calendar doesn't have any upcoming events yet.
      </p>
    </div>
  </div>
</template>
