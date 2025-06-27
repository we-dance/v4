<script setup lang="ts">
import GradientBackground from '~/components/common/GradientBackground.vue'
import { getDateTime } from '~/utils'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const { $client } = useNuxtApp()
const queryClient = useQueryClient()

const rsvp = async (status: 'registered' | 'interested' | 'cancelled') => {
  await $client.events.rsvp.mutate({
    eventId: props.event.id,
    status,
  })
  await queryClient.invalidateQueries({
    queryKey: ['events.byId', props.event.id],
  })
}

const { session } = useAppAuth()
const rsvpStatus = computed(() => {
  return props.event.guests?.find(
    (guest) => guest.profileId === session.value?.profile?.id
  )?.status
})

const navigation = computed(() => [
  {
    label: 'About',
    to: `/events/${props.event?.id}`,
    icon: 'ph:info',
  },
  {
    label: 'Feed',
    to: `/events/${props.event?.id}/feed`,
    icon: 'ph:newspaper',
  },
])
</script>

<template>
  <!-- Event Content -->
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="relative min-h-[50vh]">
      <div
        class="relative flex items-center overflow-hidden min-h-[50vh] py-12"
      >
        <GradientBackground />

        <!-- Content -->
        <div class="relative w-full">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-8 items-center">
              <!-- Left: Content -->
              <div class="text-center md:text-left text-muted-foreground">
                <div class="flex items-center gap-2 mb-4">
                  <Badge>{{ event.type }}</Badge>
                  <DateRange :start="event.startDate" :end="event.endDate" />
                  <div v-if="event.venue" class="font-bold">
                    {{ event.venue.city.name }},
                    {{ event.venue.city.country.name }}
                  </div>
                </div>

                <h1
                  class="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 md:mb-4"
                >
                  {{ event.name }}
                </h1>

                <div
                  class="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 text-muted-foreground mb-4 md:mb-6"
                >
                  <div v-if="event.venue" class="flex items-center gap-2">
                    <Icon name="ph:map-pin" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{
                      event.venue.name
                    }}</span>
                  </div>

                  <div v-if="event.price" class="flex items-center gap-2">
                    <Icon name="ph:ticket" class="w-4 h-4 md:w-5 md:h-5" />
                    <span class="text-sm md:text-base">{{ event.price }}</span>
                  </div>
                </div>

                <div
                  class="mb-8 flex flex-col gap-4 items-center md:items-start"
                >
                  <GuestsCount :event="event" />
                  <div>
                    Let others know if you're planning to attend this event
                  </div>
                  <div class="flex justify-center md:justify-start gap-2">
                    <Button
                      variant="secondary"
                      :color="
                        rsvpStatus === 'registered' ? 'success' : 'default'
                      "
                      @click="rsvp('registered')"
                    >
                      Going
                    </Button>
                    <Button
                      variant="secondary"
                      :color="
                        rsvpStatus === 'interested' ? 'warning' : 'default'
                      "
                      @click="rsvp('interested')"
                    >
                      Maybe
                    </Button>
                    <Button
                      variant="secondary"
                      :color="
                        rsvpStatus === 'cancelled' ? 'destructive' : 'default'
                      "
                      @click="rsvp('cancelled')"
                    >
                      Can't go
                    </Button>
                  </div>
                  <Button v-if="event.link" size="lg"
                    ><Icon name="ph:shopping-cart" />Buy Tickets</Button
                  >
                </div>
              </div>

              <!-- Right: Image -->
              <div
                v-if="event.cover"
                class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
              >
                <img
                  :src="event.cover"
                  :alt="event.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-muted">
      <div class="flex space-x-8 overflow-x-auto">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2 border-b-[3px] px-1 py-4 text-sm font-medium whitespace-nowrap -mb-[1px]"
          :class="[
            $route.path === item.to.split('#')[0]
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground',
          ]"
        >
          <Icon v-if="item.icon" :name="item.icon" class="w-4 h-4" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
    <!-- Main Content -->
    <div
      class="bg-background text-foreground max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        class="flex flex-col lg:flex-row justify-center gap-8 max-w-7xl mx-auto"
      >
        <!-- Left Column: Details -->
        <div class="lg:w-2/3">
          <slot>
            <!-- Description -->
            <div class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">About this event</h2>
              <TPreview :content="event.description" />
            </div>

            <!-- Schedule -->
            <div v-if="event.startDate" class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">Schedule</h2>
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div
                    class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon name="ph:clock" class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div class="font-medium">
                      {{ getDateTime(event.startDate) }}
                    </div>
                    <div class="text-muted-foreground">Start</div>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div
                    class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"
                  >
                    <Icon name="ph:clock" class="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div class="font-medium">
                      {{ getDateTime(event.endDate) }}
                    </div>
                    <div class="text-muted-foreground">End</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dance Styles -->
            <div v-if="event.styles?.length" class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">Dance Styles</h2>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="style in event.styles"
                  :key="style.id"
                  variant="secondary"
                  class="px-3 py-1 text-sm"
                >
                  {{ style.name }}
                </Badge>
              </div>
            </div>

            <!-- Organizers -->
            <div v-if="event.organizer || event.creator" class="p-6">
              <h2 class="text-xs uppercase font-bold mb-4">Organizers</h2>
              <div class="space-y-4">
                <ProfileCard
                  v-if="event.organizer"
                  :profile="event.organizer"
                />

                <div class="flex items-center gap-4">
                  <div>
                    <div class="text-sm">
                      Added
                      <template v-if="event.creator">
                        by
                        <NuxtLink
                          :to="`/@${event.creator.username}`"
                          class="font-bold"
                          >{{ event.creator.name }}</NuxtLink
                        >
                      </template>
                      on {{ formatDate(event.createdAt) }}
                    </div>
                    <div class="text-sm">
                      Last updated on {{ formatDate(event.updatedAt) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="space-y-6 mt-4 lg:w-1/3">
          <!-- Guests section -->
          <div class="rounded-xl border border-border shadow-sm p-6">
            <h3 class="text-xs uppercase font-bold mb-4">Guest List</h3>

            <div v-if="event.guests?.length" class="space-y-3">
              <div
                v-for="guest in event.guests.slice(0, 5)"
                :key="guest.id"
                class="flex items-center gap-3"
              >
                <div
                  class="w-10 h-10 rounded-full border-2 border-gray-200 overflow-hidden"
                >
                  <Avatar :profile="guest.profile" />
                </div>
                <div>
                  <div class="font-medium">
                    {{ guest.profile?.name || 'Guest' }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ guest.status }}
                  </div>
                </div>
              </div>

              <div
                v-if="event.guests.length > 5"
                class="text-sm text-gray-500 mt-2"
              >
                and {{ event.guests.length - 5 }} more guests
              </div>
            </div>

            <div v-else class="text-center text-gray-500 py-4">
              <p>Be the first to join!</p>
            </div>
          </div>

          <!-- Location -->
          <div v-if="event.venue" class="rounded-xl shadow-sm p-6">
            <h3 class="text-xs uppercase font-bold mb-4">Location</h3>
            <div class="space-y-4">
              <a :href="event.venue.mapUrl" target="_blank">
                <div class="flex items-start gap-3">
                  <Icon
                    name="ph:map-pin"
                    class="w-5 h-5 text-blue-600 flex-shrink-0 mt-1"
                  />
                  <div>
                    <div class="font-medium">{{ event.venue.name }}</div>
                    <div class="text-gray-500">
                      {{ event.venue.formattedAddress }}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
