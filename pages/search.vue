<script setup lang="ts">
const { $client } = useNuxtApp()
const route = useRoute()
const searchQuery = ref((route.query.q as string) || '')

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Events', value: 'event' },
  { name: 'Profiles', value: 'profile' },
  { name: 'Posts', value: 'post' },
]

const selectedCategory = ref('all')

const { data } = useQuery({
  queryKey: ['search', searchQuery],
  queryFn: () => $client.search.filter.query({ query: searchQuery.value }),
})

const searchResults = computed(() => data.value || [])

const resultsByType = computed(() => {
  const types = {} as Record<string, number>
  searchResults.value.forEach((result) => {
    types[result.type] = (types[result.type] || 0) + 1
  })
  return types
})

const filteredResults = computed(() => {
  if (!searchQuery.value) return []
  return searchResults.value.filter((result) =>
    selectedCategory.value === 'all'
      ? true
      : result.type === selectedCategory.value
  )
})
</script>

<template>
  <div class="container max-w-3xl py-6">
    <div class="flex flex-col gap-6">
      <!-- Search Header -->
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Search Results</h1>
        <div class="flex gap-4">
          <Input
            v-model="searchQuery"
            placeholder="Search everything..."
            class="w-full"
          >
            <template #prefix>
              <Icon
                name="ph:magnifying-glass"
                class="w-4 h-4 text-muted-foreground"
              />
            </template>
          </Input>
        </div>
      </div>

      <!-- Categories -->
      <div class="flex gap-2 flex-wrap">
        <Button
          v-for="category in categories"
          :key="category.value"
          :variant="selectedCategory === category.value ? 'primary' : 'outline'"
          size="sm"
          @click="selectedCategory = category.value"
        >
          {{ category.name }}
          <Badge
            v-if="resultsByType[category.value] || category.value === 'all'"
            variant="secondary"
            class="ml-2"
          >
            {{
              category.value === 'all'
                ? searchResults.length
                : resultsByType[category.value] || 0
            }}
          </Badge>
        </Button>
      </div>

      <!-- Results -->
      <div v-if="filteredResults.length" class="grid gap-4">
        <NuxtLink
          v-for="result in filteredResults"
          :key="result.to"
          :to="result.to"
          class="flex gap-4 items-start w-full hover:bg-muted p-4 rounded-lg"
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
            <p class="text-xs sm:text-sm text-muted-foreground line-clamp-2">
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

      <!-- Empty State -->
      <EmptyState v-else-if="searchQuery" variant="no-results">
        <template #description>
          We couldn't find anything for "{{ searchQuery }}". Try searching for
          something else.
        </template>
      </EmptyState>

      <!-- Initial State -->
      <EmptyState v-else variant="no-results">
        <template #description>
          Enter a search term to find events, artists, venues, courses, and
          posts.
        </template>
      </EmptyState>
    </div>
  </div>
</template>
