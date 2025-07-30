<script setup lang="ts">
import { getDateTime } from '~/utils'
import { computed, ref, watch } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const route = useRoute()
const { $client } = useNuxtApp()
const { enableCheckInMode } = useCheckInMode()

// Reactive state
const searchQuery = ref('')
const selectedStatusFilter = ref('all')

// Fetch event data
const {
  data: event,
  refetch,
  isLoading,
  isError,
  error,
} = useQuery<any>({
  queryKey: ['events.byId', route.params.id],
  queryFn: () => $client.events.guests.query(route.params.id as string),
  retry: false,
})

// Enable check-in mode when event data is loaded
watch(
  event,
  (newEvent) => {
    if (newEvent) {
      enableCheckInMode(newEvent.id, newEvent.name)
    }
  },
  { immediate: true }
)

// Check-in mutation
const checkInMutation = useMutation({
  mutationFn: ({
    guestId,
    checkedIn,
  }: {
    guestId: string
    checkedIn: boolean
  }) => $client.events.checkInGuest.mutate({ guestId, checkedIn }),
  onSuccess: () => {
    refetch()
  },
})

// Computed properties
const guests = computed(() => event.value?.guests || [])

const checkedInCount = computed(
  () => guests.value.filter((guest: any) => !!guest.checkedInAt).length
)

const statusFilters = [
  {
    value: 'all',
    label: 'All Statuses',
    count: computed(() => guests.value.length),
  },
  {
    value: 'checked_in',
    label: 'Checked In',
    count: computed(() => checkedInCount.value),
  },
  {
    value: 'registered',
    label: 'Pending',
    count: computed(
      () => guests.value.filter((g: any) => g.status === 'registered').length
    ),
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    count: computed(
      () => guests.value.filter((g: any) => g.status === 'cancelled').length
    ),
  },
]

const filteredGuests = computed(() => {
  let filtered = guests.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (guest: any) =>
        guest.profile?.name?.toLowerCase().includes(query) ||
        guest.profile?.username?.toLowerCase().includes(query) ||
        guest.profile?.user?.firstName?.toLowerCase().includes(query) ||
        guest.profile?.user?.lastName?.toLowerCase().includes(query)
    )
  }

  // Filter by status
  if (selectedStatusFilter.value !== 'all') {
    if (selectedStatusFilter.value === 'checked_in') {
      filtered = filtered.filter((guest: any) => !!guest.checkedInAt)
    } else {
      filtered = filtered.filter(
        (guest: any) => guest.status === selectedStatusFilter.value
      )
    }
  }

  return filtered
})

const toggleCheckIn = async (guest: any) => {
  const isCurrentlyCheckedIn = !!guest.checkedInAt

  try {
    await checkInMutation.mutateAsync({
      guestId: guest.id,
      checkedIn: !isCurrentlyCheckedIn,
    })
  } catch (error) {
    console.error('Failed to update guest status:', error)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedStatusFilter.value = 'all'
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header
      class="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white"
    >
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <NuxtLink to="/admin/events"> Manage Events </NuxtLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ event?.name }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div class="flex-1" />
      <Button variant="ghost" as-child class="hidden md:flex">
        <NuxtLink :to="`/admin/events/${event?.id}/edit`">
          <Icon name="lucide:pencil" class="w-4 h-4" />
          Edit
        </NuxtLink>
      </Button>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"
        ></div>
        <p class="text-muted-foreground">Loading event data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <Icon
          name="lucide:alert-circle"
          class="w-12 h-12 text-red-500 mx-auto mb-4"
        />
        <p class="text-red-600 font-medium">Failed to load event</p>
        <p class="text-muted-foreground text-sm">{{ error?.message }}</p>
        <Button @click="refetch()" class="mt-4">
          <Icon name="lucide:refresh-cw" class="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="flex-1 flex flex-col overflow-hidden">
      <!-- Search and Filters -->
      <div class="p-4 border-b bg-white">
        <div class="flex flex-row gap-3 sm:gap-4">
          <!-- Search -->
          <div class="relative flex-1">
            <Icon
              name="lucide:search"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
            <Input
              v-model="searchQuery"
              placeholder="Search by name, username, email..."
              class="pl-10 pr-10"
            />
            <Button
              v-if="searchQuery"
              variant="ghost"
              size="sm"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              @click="searchQuery = ''"
            >
              <Icon name="lucide:x" class="w-3 h-3" />
            </Button>
          </div>

          <!-- Status Filter -->
          <div class="flex-1">
            <Select class="w-full" v-model="selectedStatusFilter">
              <SelectTrigger class="w-full sm:w-[160px]">
                <SelectValue>
                  <div class="flex items-center gap-2">
                    <span>{{
                      statusFilters.find(
                        (f) => f.value === selectedStatusFilter
                      )?.label || 'All'
                    }}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="filter in statusFilters"
                  :key="filter.value"
                  :value="filter.value"
                >
                  <div class="flex items-center justify-between w-full">
                    <span>{{ filter.label }}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Guest List -->
      <div class="flex-1 overflow-y-auto">
        <div
          v-if="filteredGuests.length === 0"
          class="flex-1 flex items-center justify-center py-12"
        >
          <div class="text-center">
            <Icon
              name="lucide:users"
              class="w-12 h-12 text-muted-foreground mx-auto mb-4"
            />
            <p class="text-muted-foreground">
              {{
                searchQuery || selectedStatusFilter !== 'all'
                  ? 'No guests found matching your search'
                  : 'No guests for this event yet'
              }}
            </p>
            <Button
              v-if="searchQuery || selectedStatusFilter !== 'all'"
              variant="outline"
              size="sm"
              class="mt-2"
              @click="clearSearch()"
            >
              Clear Search
            </Button>
          </div>
        </div>

        <!-- Guest Cards -->
        <div v-else class="space-y-3 p-4">
          <div
            v-for="guest in filteredGuests"
            :key="guest.id"
            class="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div class="p-4">
              <!-- Header Row -->
              <div class="flex items-start gap-3 mb-3">
                <Avatar
                  :profile="guest.profile"
                  class="w-12 h-12 flex-shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <h3
                    class="font-semibold text-gray-900 text-base leading-tight mb-1"
                  >
                    {{
                      guest.profile?.name ||
                      guest.profile?.user?.firstName +
                        ' ' +
                        guest.profile?.user?.lastName ||
                      guest.profile?.username ||
                      'Unnamed Guest'
                    }}
                  </h3>
                  <div
                    class="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <NuxtLink
                      :to="`/@${guest.profile?.username}`"
                      class="hover:underline"
                    >
                      @{{ guest.profile?.username || 'unknown' }}
                    </NuxtLink>
                    <span>•</span>
                    <span class="capitalize">{{ guest.role }}</span>
                  </div>
                  <div
                    v-for="purchase in guest.ticketPurchases"
                    :key="purchase.id"
                    class="text-sm text-muted-foreground"
                  >
                    <span class="capitalize">{{ purchase.ticket.name }}</span>
                    <span> ({{ purchase.status }}) </span>
                  </div>
                </div>
                <GuestStatus
                  :status="guest.status"
                  :checkedInAt="guest.checkedInAt"
                />
              </div>

              <!-- Action Button -->
              <Button
                :variant="!!guest.checkedInAt ? 'outline' : 'primary'"
                :class="
                  !!guest.checkedInAt
                    ? 'border-green-200 text-green-700 hover:bg-green-50'
                    : 'bg-green-600 hover:bg-green-700'
                "
                class="w-full md:w-auto"
                @click="toggleCheckIn(guest)"
                :disabled="checkInMutation.isPending.value"
              >
                <Icon
                  :name="
                    !!guest.checkedInAt
                      ? 'lucide:user-check'
                      : 'lucide:user-plus'
                  "
                  class="w-5 h-5 mr-2"
                />
                {{ !!guest.checkedInAt ? 'Checked In' : 'Check In' }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
