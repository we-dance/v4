<script setup lang="ts">
const props = defineProps<{
  status: string
}>()

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'checked_in':
      return 'default'
    case 'registered':
      return 'secondary'
    case 'confirmed':
      return 'secondary'
    case 'no_show':
      return 'destructive'
    case 'cancelled':
      return 'outline'
    default:
      return 'outline'
  }
}

const formatStatus = (status: string) => {
  switch (status) {
    case 'checked_in':
      return 'Checked In'
    case 'registered':
      return 'Registered'
    case 'confirmed':
      return 'Confirmed'
    case 'no_show':
      return 'No Show'
    case 'cancelled':
      return 'Cancelled'
    case 'invited':
      return 'Invited'
    case 'waitlisted':
      return 'Waitlisted'
    case 'declined':
      return 'Declined'
    default:
      return status
  }
}
</script>

<template>
  <Badge
    :variant="getStatusBadgeVariant(props.status)"
    class="text-xs border flex-shrink-0"
  >
    {{ formatStatus(props.status) }}
  </Badge>
</template>
