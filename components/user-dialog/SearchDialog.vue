<script setup lang="ts">
const dialog = useDialog()
const router = useRouter()
const searchQuery = ref('')
const searchInput = ref()

const categories = [
  { name: 'Events', icon: 'ph:calendar', to: '/events' },
  { name: 'Artists', icon: 'ph:users', to: '/artists' },
  { name: 'Venues', icon: 'ph:map-pin', to: '/venues' },
  { name: 'Courses', icon: 'ph:graduation-cap', to: '/courses' },
  { name: 'Posts', icon: 'ph:newspaper', to: '/feed' },
]

const popularSearches = [
  { query: 'salsa', label: 'Salsa' },
  { query: 'bachata', label: 'Bachata' },
  { query: 'kizomba', label: 'Kizomba' },
  { query: 'workshop', label: 'Workshops' },
  { query: 'festival', label: 'Festivals' },
]

const handlePopularSearch = (query: string) => {
  searchQuery.value = query
}

const { $client } = useNuxtApp()

const { data } = useQuery({
  queryKey: ['search', searchQuery],
  queryFn: () => $client.search.filter.query({ query: searchQuery.value }),
})

const searchResults = computed(() => data.value || [])

const handleSearch = () => {
  if (!searchQuery.value) return

  dialog.close()

  router.push({
    path: '/search',
    query: { q: searchQuery.value },
  })
}

onMounted(() => {
  nextTick(() => {
    const input = searchInput.value?.$el?.querySelector('input')
    input?.focus()
  })
})
</script>

<template>
  <div class="w-full max-w-lg flex flex-col min-h-[420px] overflow-hidden">
    <DialogHeader>
      <DialogTitle>Search</DialogTitle>
    </DialogHeader>

    <div class="flex-1 py-4 px-2 flex flex-col min-h-0">
      <div class="flex-none">
        <Input
          ref="searchInput"
          v-model="searchQuery"
          placeholder="Search everything..."
          class="w-full"
          @keyup.enter="handleSearch"
        >
          <template #prefix>
            <Icon
              name="ph:magnifying-glass"
              class="w-4 h-4 text-muted-foreground"
            />
          </template>
        </Input>
      </div>

      <ScrollArea
        v-if="searchResults.length"
        :key="searchQuery"
        class="mt-4 max-h-[300px]"
      >
        <div class="space-y-2">
          <div
            v-for="result in searchResults"
            :key="result.to"
            class="flex gap-4"
          >
            <NuxtLink
              :to="result.to"
              class="flex gap-4 items-center w-full hover:bg-muted p-3 rounded-lg"
              @click="dialog.close()"
            >
              <div class="flex-1 min-w-0">
                <p
                  v-if="result.info"
                  class="text-xs sm:text-sm text-muted-foreground"
                >
                  {{ result.info }}
                </p>
                <p
                  class="font-medium truncate text-sm sm:text-base text-foreground"
                >
                  {{ result.title }}
                </p>
                <p
                  class="text-xs sm:text-sm text-muted-foreground line-clamp-2"
                >
                  {{ result.description }}
                </p>
              </div>
              <img
                v-if="result.image"
                :src="result.image"
                class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg shrink-0"
              />
            </NuxtLink>
          </div>
        </div>
      </ScrollArea>

      <div
        v-else-if="searchQuery"
        class="mt-4 flex-1 flex flex-col items-center justify-center text-center px-4"
      >
        <Icon
          name="ph:magnifying-glass"
          class="w-12 h-12 text-muted-foreground mb-4"
        />
        <p class="text-lg font-medium mb-2">No results found</p>
        <p class="text-sm text-muted-foreground mb-4">
          We couldn't find anything for "{{ searchQuery }}". Try searching for
          something else.
        </p>
        <Button variant="secondary" size="sm" @click="searchQuery = ''">
          Clear search
        </Button>
      </div>

      <div v-else class="mt-4 flex-1 flex flex-col min-h-0 max-h-[300px]">
        <div>
          <h3 class="mb-3 text-sm font-medium text-muted-foreground">
            Categories
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <NuxtLink
              v-for="category in categories"
              :key="category.name"
              :to="category.to"
              class="flex flex-col items-center gap-2 p-3 hover:bg-muted rounded-lg text-center"
              @click="dialog.close()"
            >
              <Icon
                :name="category.icon"
                class="w-6 h-6 text-muted-foreground"
              />
              <span class="text-sm text-muted-foreground">{{
                category.name
              }}</span>
            </NuxtLink>
          </div>
        </div>

        <div class="mt-6 flex-1 flex flex-col min-h-0">
          <h3 class="mb-3 text-sm font-medium text-muted-foreground">
            Popular Searches
          </h3>
          <div class="flex flex-col gap-1">
            <Button
              v-for="search in popularSearches"
              :key="search.query"
              variant="ghost"
              size="sm"
              class="justify-start text-sm h-9"
              @click="handlePopularSearch(search.query)"
            >
              <Icon
                name="ph:magnifying-glass"
                class="w-4 h-4 mr-2 text-muted-foreground"
              />
              {{ search.label }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
