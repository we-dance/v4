<script setup lang="ts">
const props = defineProps<{
  status: string
  checkedInAt?: Date | string | null
}>()

const isCheckedIn = computed(() => !!props.checkedInAt)

const getStatusBadgeVariant = (status: string, isCheckedIn: boolean) => {
  if (isCheckedIn) {
    return 'default'
  }
  switch (status) {
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

const formatStatus = (status: string, isCheckedIn: boolean) => {
  if (isCheckedIn) {
    return 'Checked In'
  }
  switch (status) {
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
    case 'interested':
      return 'Maybe'
    default:
      return status
  }
}
</script>

<template>
  <Badge
    :variant="getStatusBadgeVariant(props.status, isCheckedIn)"
    class="text-xs border flex-shrink-0"
  >
    {{ formatStatus(props.status, isCheckedIn) }}
  </Badge>
</template>
