<script setup lang="ts">
import { toast } from 'vue-sonner'
import { formatCurrencyCents, formatSubscriptionDuration } from '~/utils/format'

const { event } = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const dialog = useDialog()
const emit = defineEmits(['load'])

const { $client } = useNuxtApp()
const { session } = useAppAuth()

const tickets = computed(() => event.tickets)

const updateTicket = async (ticketId: string, values: any) => {
  const promise = $client.events.updateTicket.mutate({
    eventId: event.id,
    ticketId,
    ...values,
  })

  toast.promise(promise, {
    loading: 'Updating ticket...',
    success: 'Ticket updated successfully',
    error: 'Error updating ticket',
  })

  promise.then(() => {
    emit('load')
  })
}

const deleteTicket = async (ticketId: string) => {
  const promise = $client.events.deleteTicket.mutate({
    ticketId,
  })

  toast.promise(promise, {
    loading: 'Deleting ticket...',
    success: 'Ticket deleted successfully',
    error: 'Error deleting ticket',
  })

  promise.then(() => {
    emit('load')
  })
}

const router = useRouter()

const openTicketDialog = (ticket: any = null) => {
  if (!session?.value?.user?.stripeAccountId) {
    toast.error('Stripe not connected', {
      description: 'Please connect your Stripe account to create offers',
      action: {
        label: 'Connect Stripe',
        onClick: () => {
          router.push('/admin/integrations')
        },
      },
    })
    return
  }

  dialog.open({
    component: 'EventTicketDialog',
    props: {
      ticket,
      onSuccess: (values: any) => {
        const ticketId = ticket ? ticket.id : null
        updateTicket(ticketId, values)
      },
    },
  })
}
</script>

<template>
  <Button variant="secondary" @click="openTicketDialog()" class="mb-4"
    ><Icon name="lucide:plus" class="h-4 w-4" />Add Ticket</Button
  >
  <div v-if="tickets?.length" class="space-y-4">
    <div
      v-for="ticket in tickets"
      :key="ticket.id"
      class="flex items-center justify-between"
    >
      <div>
        <h4 class="font-medium">
          {{ ticket.name }}
          <Icon
            v-if="ticket.stripeProductId && ticket.stripePriceId"
            name="lucide:check"
            class="h-4 w-4 text-green-500"
          />
          <Icon
            v-else
            name="lucide:loader"
            class="h-4 w-4 text-muted-foreground"
          />
        </h4>
        <p class="text-sm text-muted-foreground">
          {{ formatCurrencyCents(ticket.price, ticket.currency) }} /
          {{ formatSubscriptionDuration(ticket.duration) }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button
          class="w-7 h-7"
          variant="ghost"
          size="icon"
          @click="openTicketDialog(ticket)"
        >
          <Icon name="lucide:pencil" class="h-4 w-4" />
          <span class="sr-only">Edit Resource</span>
        </Button>
        <Button
          @click="deleteTicket(ticket.id)"
          variant="ghost"
          size="icon"
          class="h-7 w-7 text-destructive hover:text-destructive"
          ><Icon name="lucide:trash" class="h-4 w-4" />
          <span class="sr-only">Delete Resource</span></Button
        >
      </div>
    </div>
  </div>
  <div v-else class="text-center py-4 text-muted-foreground">
    No tickets added yet
  </div>
</template>
