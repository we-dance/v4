<script setup lang="ts">
const props = defineProps({
  event: {
    type: Object as PropType<any>,
    required: true,
  },
})

const interested = computed(() => {
  return props.event.guests.filter(
    (guest: any) => guest.status === 'interested'
  ).length
})

const going = computed(() => {
  return props.event.guests.filter(
    (guest: any) => guest.status === 'registered'
  ).length
})

const guests = computed(() => {
  return props.event.guests
    .filter(
      (guest: any) =>
        guest.status === 'registered' || guest.status === 'interested'
    )
    .slice(0, 5)
})
</script>

<template>
  <div class="flex items-center gap-2 text-xs">
    <div v-if="guests.length > 0" class="relative flex ml-1">
      <div v-for="guest in guests" :key="guest.id" class="-ml-1">
        <Avatar :profile="guest.profile" class="w-4 h-4 rounded-full" />
      </div>
    </div>
    <div v-if="going > 0 || interested > 0">
      {{ going }} going · {{ interested }} maybe
    </div>
    <div v-else>No guests yet</div>
  </div>
</template>
