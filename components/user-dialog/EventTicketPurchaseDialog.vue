<script setup lang="ts">
import { formatCurrencyCents } from '~/utils/format'

const router = useRouter()

const { event } = defineProps<{
  event: any
}>()

const dialog = useDialog()

const getItems = (ticket: any) => {
  if (!ticket.items) return []
  return ticket.items.split('\n').filter((item: string) => item.trim())
}

const tickets = computed(() => {
  return event.tickets?.sort((a: any, b: any) => a.price - b.price) || []
})

const handleSelect = (ticket: any) => {
  router.push(`/checkout/ticket/${ticket.id}`)
  dialog.close()
}
</script>

<template>
  <DialogHeader>
    <DialogTitle>Choose Your Ticket</DialogTitle>
    <DialogDescription>
      Select a ticket type for {{ event.name }}
    </DialogDescription>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <div
      v-if="tickets.length === 0"
      class="text-center py-8 text-muted-foreground"
    >
      <p>No tickets available for this event.</p>
    </div>

    <button
      v-for="ticket in tickets"
      :key="ticket.id"
      variant="secondary"
      class="flex w-full justify-between h-auto py-4 px-4 shadow-sm border rounded-md hover:border-accent hover:bg-muted hover:text-background-foreground text-sm font-medium"
      @click="handleSelect(ticket)"
    >
      <div class="flex flex-wrap items-center gap-3">
        <div class="text-left">
          <div class="font-bold">{{ ticket.name }}</div>
          <ul
            v-if="getItems(ticket).length"
            class="mt-2 text-sm text-muted-foreground"
          >
            <li
              v-for="(item, index) in getItems(ticket)"
              :key="index"
              class="flex gap-x-2 gap-y-2"
            >
              <Icon name="ph:check" class="w-4 h-4 text-accent flex-none" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="text-right flex-none">
        <div class="font-bold">
          {{ formatCurrencyCents(ticket.price, ticket.currency) }}
        </div>
        <div class="text-sm text-muted-foreground">per ticket</div>
      </div>
    </button>

    <p class="text-xs text-center text-muted-foreground mt-4">
      Secure payment processing. Tickets will be sent to your email.
    </p>
  </div>
</template>
