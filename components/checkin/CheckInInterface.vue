<script setup lang="ts">
import { formatCurrencyCents } from '~/utils/format'

interface Props {
  profileId: string
}

const props = defineProps<Props>()

const { $client } = useNuxtApp()
const { isCheckInMode, currentEventId, eventName, disableCheckInMode } =
  useCheckInMode()
const router = useRouter()

const { data: event, refetch } = useQuery<any>({
  queryKey: ['events.byId', currentEventId.value],
  queryFn: () => $client.events.guests.query(currentEventId.value!),
  retry: false,
})

const guest = computed(() =>
  event.value?.guests.find((g: any) => g.profile.id === props.profileId)
)

// Check-in mutation
const checkInMutation = useMutation({
  mutationFn: (status: 'checked_in' | 'registered') =>
    $client.events.checkInGuest.mutate({
      guestId: guest.value?.id!,
      status,
    }),
  onSuccess: () => {
    refetch()
  },
})

const handleCheckIn = async () => {
  const newStatus =
    guest.value?.status === 'checked_in' ? 'registered' : 'checked_in'
  await checkInMutation.mutateAsync(newStatus)
}

const backToCheckInList = () => {
  router.push(`/admin/events/${currentEventId.value}`)
}

const exitCheckInMode = () => {
  disableCheckInMode()
}
</script>

<template>
  <div v-if="isCheckInMode && currentEventId" class="min-h-screen bg-muted">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold">Event Check-in</h1>
            <p class="text-sm text-muted-foreground">{{ eventName }}</p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" @click="backToCheckInList">
              <Icon name="lucide:arrow-left" class="w-4 h-4 mr-2" />
              Back to List
            </Button>
            <Button variant="ghost" @click="exitCheckInMode">
              <Icon name="lucide:x" class="w-4 h-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Check-in Content -->
    <div class="max-w-4xl mx-auto p-4">
      <div v-if="!guest" class="bg-white rounded-xl border p-8 text-center">
        <Icon
          name="lucide:user-x"
          class="w-16 h-16 text-muted-foreground mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Not Registered</h2>
        <p class="text-muted-foreground mb-4">
          This person is not registered for this event.
        </p>
        <div class="flex justify-center gap-2">
          <Button @click="backToCheckInList">Back to List</Button>
        </div>
      </div>

      <div v-else class="bg-white rounded-xl border overflow-hidden">
        <!-- Profile Header -->
        <div class="p-6 border-b">
          <div class="flex items-center gap-4">
            <Avatar :profile="guest.profile" class="w-20 h-20" />
            <div class="flex-1">
              <h2 class="text-2xl font-bold">
                {{ guest.profile?.name || 'Unnamed Guest' }}
              </h2>
              <p class="text-muted-foreground">
                @{{ guest.profile?.username || 'unknown' }}
              </p>
              <div class="flex items-center gap-2 mt-2">
                <GuestStatus :status="guest.status" />
                <span class="text-sm text-muted-foreground capitalize">
                  {{ guest.role }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ticket Information -->
        <div
          v-if="guest.ticketPurchases?.length"
          class="p-6 border-b bg-blue-50"
        >
          <h3 class="font-semibold mb-2 flex items-center gap-2">
            <Icon name="lucide:ticket" class="w-4 h-4" />
            Tickets Purchased
          </h3>
          <div class="space-y-2">
            <div
              v-for="purchase in guest.ticketPurchases"
              :key="purchase.id"
              class="flex justify-between text-sm"
            >
              <span
                >{{ purchase.quantity }} x {{ purchase.ticket.name }} -
                {{ purchase.status }}</span
              >
              <span class="font-medium">
                {{
                  formatCurrencyCents(purchase.totalAmount, purchase.currency)
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Check-in Actions -->
        <div class="p-6">
          <div class="flex justify-center">
            <Button
              size="lg"
              :variant="guest.status === 'checked_in' ? 'outline' : 'primary'"
              :class="[
                guest.status === 'checked_in'
                  ? 'border-green-200 text-green-700 hover:bg-green-50'
                  : 'bg-green-600 hover:bg-green-700 text-white',
                'px-8 py-4 text-lg',
              ]"
              @click="handleCheckIn"
              :disabled="checkInMutation.isPending.value"
            >
              <Icon
                :name="
                  guest.status === 'checked_in'
                    ? 'lucide:user-check'
                    : 'lucide:user-plus'
                "
                class="w-6 h-6 mr-3"
              />
              {{
                guest.status === 'checked_in' ? 'Checked In' : 'Check In Now'
              }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
