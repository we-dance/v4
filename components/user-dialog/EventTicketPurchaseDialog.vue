<script setup lang="ts">
const { event } = defineProps<{
  event: any
}>()
</script>

<template>
  <DialogHeader>
    <DialogTitle>Choose Your Ticket</DialogTitle>
    <DialogDescription>
      Select a ticket type for {{ event.name }}
    </DialogDescription>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <TicketOptions :event="event" />
  </div>
</template>
