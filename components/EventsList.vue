<script setup>
import { useIntersectionObserver } from '@vueuse/core'
const { $client } = useNuxtApp()
const { isLoggedIn } = useAppAuth()

const searchQuery = ref('')
const city = ref(null)
const community = ref(null)
const view = ref('list')
const startDate = ref(null)
const type = ref('all')

// Current month for calendar view
const currentDate = ref(new Date())

const { isFetching, isError, data, error, fetchNextPage, hasNextPage } =
  useInfiniteQuery({
    queryKey: [
      'events',
      searchQuery,
      city,
      community,
      startDate,
      type,
      view,
      computed(() =>
        view.value === 'calendar' ? currentDate.value.getFullYear() : null
      ),
      computed(() =>
        view.value === 'calendar' ? currentDate.value.getMonth() : null
      ),
    ],
    queryFn: ({ pageParam = 0 }) =>
      $client.events.getAll.query({
        query: searchQuery.value,
        city: city.value?.id,
        community: community.value?.id,
        startDate: startDate.value,
        type: type.value,
        page: pageParam,
        limit: 10,
        // Add month/year for calendar view
        ...(view.value === 'calendar' && {
          year: currentDate.value.getFullYear(),
          month: currentDate.value.getMonth(),
        }),
      }),
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    initialPageParam: 0,
  })

const events = computed(
  () => data.value?.pages.flatMap((page) => page.events) ?? []
)

const loadMoreButton = useTemplateRef('load-more')

useIntersectionObserver(loadMoreButton, ([entry], observerElement) => {
  if (entry?.isIntersecting && hasNextPage.value && !isError.value) {
    fetchNextPage()
  }
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const selectDate = (date) => {
  startDate.value = date
  scrollToTop()
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
  >
    <div class="flex gap-2">
      <Input
        ref="searchInput"
        v-model="searchQuery"
        placeholder="Search by name..."
        type="search"
        class="w-full"
      />
      <CityInput v-model="city" />
      <CommunityInput
        v-model="community"
        variant="outline"
        class="w-auto"
        placeholder="Dance Style"
      />
      <Select v-model="type">
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all"> All Types </SelectItem>
            <SelectItem value="Party"> Party </SelectItem>
            <SelectItem value="Class"> Class </SelectItem>
            <SelectItem value="Festival"> Festival </SelectItem>
            <SelectItem value="Concert"> Concert </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ToggleGroup type="single" v-model="view">
        <ToggleGroupItem value="calendar">
          <Icon name="ph:calendar" class="w-4 h-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <Icon name="ph:list" class="w-4 h-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
    <Button variant="primary" as-child class="w-full sm:w-auto">
      <NuxtLink
        :to="
          isLoggedIn
            ? '/admin/events/import'
            : '/login?redirect=/admin/events/import'
        "
        class="flex items-center justify-center gap-2"
      >
        <Icon name="ph:plus" class="w-5 h-5" />
        Add Event
      </NuxtLink>
    </Button>
  </div>

  <ErrorMessage v-if="isError" :message="error" />

  <template v-if="events.length > 0">
    <EventCalendar
      v-if="view === 'calendar'"
      :events="events"
      :current-date="currentDate"
      @update:current-date="currentDate = $event"
    />
    <EventSchedule v-else :events="events" @select-date="selectDate" />
  </template>

  <div
    v-else-if="isFetching"
    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  >
    <Skeleton v-for="i in 9" :key="i" class="aspect-square w-full" />
  </div>

  <EmptyState v-else-if="events.length === 0" variant="no-results" />

  <div ref="load-more" class="text-center py-8">
    <Button v-if="hasNextPage" @click="fetchNextPage" :disabled="isFetching">
      <Icon
        v-if="isFetching"
        name="ph:spinner-gap"
        class="h-4 w-4 animate-spin mr-2"
      />
      <span v-if="isFetching">Loading...</span>
      <span v-else>Load More</span>
    </Button>
  </div>
</template>
