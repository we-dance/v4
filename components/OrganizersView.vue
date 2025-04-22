<script setup lang="ts">
import EmptyState from '~/components/common/EmptyState.vue'
import OrganizerCard from '~/components/OrganizerCard.vue'
import { trpc } from '~/composables/trpc'

const isGridView = ref(true)
const organizers = ref<any[]>([])
const isLoading = ref(false)
const loadingMore = ref(false)

const page = ref(1)
const limit = ref(9)
const totalCount = ref(0)
const hasMore = ref(false)

async function fetchOrganizers(isLoadMore = false) {
  if (isLoading.value || loadingMore.value) return

  if (isLoadMore) {
    loadingMore.value = true
  } else {
    isLoading.value = true
    organizers.value = []
    page.value = 1
  }

  try {
    const data = await trpc.profiles.organisers.query({
      limit: limit.value,
      page: page.value,
    })

    if (data) {
      if (isLoadMore) {
        organizers.value = [...organizers.value, ...data.organizers]
      } else {
        organizers.value = data.organizers
      }
      totalCount.value = data.totalCount
      hasMore.value = data.hasMore
    }
  } catch (error) {
    console.error('Error fetching organizers:', error)
  } finally {
    if (isLoadMore) {
      loadingMore.value = false
    } else {
      isLoading.value = false
    }
  }
}

function loadMore() {
  if (hasMore.value) {
    page.value++
    fetchOrganizers(true)
  }
}

onMounted(() => {
  fetchOrganizers()
})
</script>

<template>
  <div>
    <!-- Controls -->
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6"
    >
      <div class="flex gap-2">
        <Button variant="secondary" @click="showLocationFilter = true">
          <Icon name="ph:map-pin" class="w-4 h-4 mr-2" />
          {{ filters.location || 'Any Location' }}
        </Button>
        <Button variant="secondary" @click="showFilters = !showFilters">
          <Icon name="ph:funnel" class="w-4 h-4 mr-2" />
          Filters
        </Button>
        <Button variant="secondary" @click="toggleView">
          <Icon
            :name="isGridView ? 'ph:grid-four' : 'ph:list'"
            class="w-4 h-4"
          />
        </Button>
      </div>
      <Button variant="primary" as-child class="w-full sm:w-auto">
        <NuxtLink to="/register" class="flex items-center justify-center gap-2">
          <Icon name="ph:plus-circle" class="w-5 h-5" />
          Add Your City's Groups
        </NuxtLink>
      </Button>
    </div>

    <!-- Loading State (Initial) -->
    <div
      v-if="isLoading && !organizers.length"
      class="py-10 flex justify-center"
    >
      <div
        class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
      ></div>
    </div>

    <!-- Results Grid View -->
    <div
      v-if="isGridView && organizers.length > 0"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <OrganizerCard
        v-for="organizer in organizers"
        :key="organizer.id"
        :organizer="organizer"
        view="grid"
      />
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !isLoading" class="text-center py-8">
      <Button @click="loadMore" :disabled="loadingMore">
        <Icon
          v-if="loadingMore"
          name="ph:spinner-gap"
          class="h-4 w-4 animate-spin mr-2"
        />
        <span v-if="loadingMore">Loading more...</span>
        <span v-else>Load More Organizers</span>
      </Button>
    </div>

    <!-- Empty State -->
    <div v-if="!organizers.length && !isLoading" class="text-center">
      <div class="max-w-md mx-auto">
        <EmptyState variant="no-results" />
        <p class="mt-4 text-muted-foreground">
          Don't see your city? Help grow the community by
          <Button variant="tertiary" class="px-1" as-child>
            <NuxtLink to="/register">adding your local dance groups</NuxtLink>
          </Button>
        </p>
      </div>
    </div>
  </div>
</template>
