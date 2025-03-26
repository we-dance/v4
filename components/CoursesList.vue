<template>
  <div class="space-y-8">
    <!-- Search and Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Input
          v-model="search"
          type="search"
          placeholder="Search courses..."
          class="w-full pl-9"
        />
        <Icon
          name="ph:magnifying-glass"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
        />
      </div>
      <div class="flex gap-3">
        <Button
          variant="outline"
          class="gap-2 flex-1 sm:flex-initial"
          @click="showFilters = !showFilters"
        >
          <Icon name="ph:funnel" class="w-4 h-4" />
          Filters
          <Badge v-if="activeFiltersCount" variant="secondary">
            {{ activeFiltersCount }}
          </Badge>
        </Button>
      </div>
    </div>

    <!-- Filters Panel -->
    <div v-if="showFilters" class="p-4 border rounded-lg space-y-6">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-2">
          <Label>Level</Label>
          <Select v-model="filters.level">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="AllLevels">All Levels</option>
          </Select>
        </div>
        <div class="space-y-2">
          <Label>Style</Label>
          <Select v-model="filters.style">
            <option value="">All Styles</option>
            <option value="salsa">Salsa</option>
            <option value="bachata">Bachata</option>
            <option value="kizomba">Kizomba</option>
          </Select>
        </div>
        <div class="space-y-2">
          <Label>Price Range</Label>
          <Select v-model="filters.priceRange">
            <option value="">Any Price</option>
            <option value="0-10">Under €10</option>
            <option value="10-20">€10-20</option>
            <option value="20+">Over €20</option>
          </Select>
        </div>
        <div class="space-y-2">
          <Label>Rating</Label>
          <Select v-model="filters.rating">
            <option value="">Any Rating</option>
            <option value="4.5+">4.5+ Stars</option>
            <option value="4+">4+ Stars</option>
            <option value="3.5+">3.5+ Stars</option>
          </Select>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="resetFilters">Reset Filters</Button>
        <Button @click="showFilters = false">Apply Filters</Button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center py-16 space-y-4"
    >
      <div class="relative">
        <div class="w-12 h-12 border-4 border-primary/30 rounded-full"></div>
        <div
          class="w-12 h-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full absolute top-0 left-0 animate-spin"
        ></div>
      </div>
      <p class="text-lg font-medium text-muted-foreground">
        Loading courses...
      </p>
    </div>

    <!-- Course Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-if="isRefetching"
        class="md:col-span-3 py-2 px-4 bg-primary/10 rounded-md text-center text-sm font-medium mb-4 flex items-center justify-center gap-2"
      >
        <div
          class="w-4 h-4 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"
        ></div>
        Updating results...
      </div>
      <Card v-for="course in filteredCourses" :key="course.id" class="group">
        <NuxtLink :to="`/courses/${course.slug}`">
          <CardHeader class="space-y-4">
            <div class="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                :src="course.imageUrl"
                :alt="course.name"
                class="w-full h-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div class="space-y-2">
              <h3 class="font-semibold text-xl group-hover:text-primary">
                {{ course.name }}
              </h3>
              <p class="text-sm text-muted-foreground line-clamp-2">
                {{ course.description }}
              </p>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <div v-if="course.instructor" class="flex items-center gap-3">
              <img
                :src="course.instructor.photo || '/img/default-avatar.png'"
                :alt="course.instructor.name"
                class="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div class="text-sm font-medium">
                  {{ course.instructor.name }}
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ course.educationalLevel }}
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-1">
                <Icon name="ph:star-fill" class="w-4 h-4 text-yellow-400" />
                <span>{{ getAverageRating(course) }}</span>
                <span class="text-muted-foreground"
                  >({{ course.reviews?.length || 0 }})</span
                >
              </div>
              <div class="font-medium">
                {{ getMonthlyPrice(course) }}
              </div>
            </div>
          </CardContent>
        </NuxtLink>
      </Card>
    </div>

    <!-- Empty State -->
    <div
      v-if="!isLoading && filteredCourses.length === 0"
      class="text-center py-12 space-y-4"
    >
      <div class="text-4xl">🎓</div>
      <h3 class="text-lg font-medium">No courses found</h3>
      <p class="text-muted-foreground">
        Try adjusting your filters or search terms
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { trpc } from '~/composables/trpc'
import { useQuery } from 'vue-query'

const search = ref('')
const showFilters = ref(false)
const filters = ref({
  level: '',
  style: '',
  priceRange: '',
  rating: '',
})

const limit = ref(12)

// Create a dependency array for useQuery to track
const searchTerm = ref(search.value)
const levelFilter = ref(filters.value.level)

// Watch for changes in the search and filters
watchEffect(() => {
  searchTerm.value = search.value
  levelFilter.value = filters.value.level
})

// Use direct values with useQuery
const {
  data: courseData,
  isLoading,
  isRefetching,
} = useQuery(
  ['courses.getAll', { search: searchTerm, level: levelFilter }],
  () => {
    return trpc.courses.getAll.query({
      limit: limit.value,
      filter: {
        search: search.value || undefined,
        educationalLevel: filters.value.level || undefined,
      },
    })
  },
  {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  }
)

const resetFilters = () => {
  filters.value = {
    level: '',
    style: '',
    priceRange: '',
    rating: '',
  }
}

const activeFiltersCount = computed(() => {
  return Object.values(filters.value).filter(Boolean).length
})

const getMonthlyPrice = (course: any) => {
  // Check for offerings
  if (course.offerings?.length) {
    const monthlyOffer = course.offerings.find(
      (offer: any) => offer.duration === 'P1M'
    )
    if (monthlyOffer) {
      // Use the correct field names from the CourseOffering model
      return `${monthlyOffer.price} ${monthlyOffer.currency || 'EUR'}`
    }
  }
  return 'Contact for pricing'
}

const getAverageRating = (course: any) => {
  if (!course.reviews || course.reviews.length === 0) {
    return 'N/A'
  }

  const totalRating = course.reviews.reduce(
    (total: number, review: any) => total + review.rating,
    0
  )
  const averageRating = totalRating / course.reviews.length
  return averageRating.toFixed(1)
}

const filteredCourses = computed(() => {
  if (!courseData.value?.courses) return []

  let result = [...courseData.value.courses]

  // Client-side filtering for fields not handled by the server
  if (filters.value.rating) {
    const ratingStr = filters.value.rating
    const minRating = parseFloat(ratingStr.substring(0, ratingStr.indexOf('+')))
    result = result.filter((course) => {
      if (!course.reviews || course.reviews.length === 0) {
        return false
      }

      const totalRating = course.reviews.reduce(
        (total: number, review: any) => total + review.rating,
        0
      )
      const averageRating = totalRating / course.reviews.length

      return averageRating >= minRating
    })
  }

  if (filters.value.priceRange) {
    // Skip price filtering if we're using mock data
    // In a real implementation, you would check the API structure
    // This is a temporary solution
    if (result.length > 0 && !('offerings' in result[0])) {
      return result
    }

    const [min, max] = filters.value.priceRange.split('-').map(Number)
    result = result.filter((course: any) => {
      if (!course.offerings?.length) return false

      const monthlyOffer = course.offerings.find(
        (offer: any) => offer.duration === 'P1M'
      )
      if (!monthlyOffer) return false

      const price = monthlyOffer.price
      if (max) {
        return price >= min && price <= max
      }
      return price >= min
    })
  }

  return result
})
</script>
