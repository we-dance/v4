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
          @input="updateSearchQuery"
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
          <Select v-model="filters.level" @update:model-value="refreshResults">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="AllLevels">All Levels</option>
          </Select>
        </div>
        <div class="space-y-2">
          <Label>Style</Label>
          <Select v-model="filters.style" @update:model-value="refreshResults">
            <option value="">All Styles</option>
            <option value="salsa">Salsa</option>
            <option value="bachata">Bachata</option>
            <option value="kizomba">Kizomba</option>
          </Select>
        </div>
        <div class="space-y-2">
          <Label>Price Range</Label>
          <Select v-model="filters.priceRange" @update:model-value="refreshResults">
            <option value="">Any Price</option>
            <option value="0-10">Under €10</option>
            <option value="10-20">€10-20</option>
            <option value="20+">Over €20</option>
          </Select>
        </div>
        <div class="space-y-2">
          <Label>Rating</Label>
          <Select v-model="filters.rating" @update:model-value="refreshResults">
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

    <!-- Course Grid -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>
    
    <div v-else-if="courses && courses.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card
        v-for="course in courses"
        :key="course.id"
        class="group"
      >
        <NuxtLink :to="`/courses/${course.slug}`">
          <CardHeader class="space-y-4">
            <div class="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                :src="getCourseImage(course)"
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
            <div class="flex items-center gap-3" v-if="course.instructor && course.instructor.name">
              <img
                :src="course.instructor.image || '/images/default-avatar.png'"
                :alt="course.instructor.name"
                class="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div class="text-sm font-medium">
                  {{ course.instructor.name }}
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ getInstructorTitle(course.instructor) }}
                </div>
              </div>
            </div>
            <div v-else class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-muted"></div>
              <div>
                <div class="text-sm font-medium">Course Instructor</div>
                <div class="text-xs text-muted-foreground">Expert Dancer</div>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-1">
                <Icon name="ph:star-fill" class="w-4 h-4 text-yellow-400" />
                <span>{{ getAverageRating(course) }}</span>
                <span class="text-muted-foreground">
                  ({{ course.aggregateRating?.reviewCount || course.review?.length || course.reviews?.length || 0 }})
                </span>
              </div>
              <div class="font-medium">
                {{ getMonthlyPrice(course) }}
              </div>
            </div>
          </CardContent>
        </NuxtLink>
      </Card>
    </div>

    <!-- Load More Button -->
    <div v-if="hasNextPage" class="flex justify-center mt-8">
      <Button variant="outline" @click="fetchNextPage" :disabled="isFetchingNextPage">
        <span v-if="isFetchingNextPage" class="mr-2">
          <span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
        </span>
        {{ isFetchingNextPage ? 'Loading more...' : 'Load more' }}
      </Button>
    </div>

    <!-- Empty State -->
    <div
      v-if="!isLoading && courses && courses.length === 0"
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
import { ref, computed } from 'vue'
import { useCoursesList } from '~/composables/trpc'

const search = ref('')
const searchQuery = ref('')
const showFilters = ref(false)
const filters = ref({
  level: '',
  style: '',
  priceRange: '',
  rating: '',
})

// Simple debounce function implementation
const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

const updateSearchQuery = debounce((event: Event) => {
  const target = event.target as HTMLInputElement
  searchQuery.value = target.value
  refreshResults()
}, 500)

// Refresh results when filters change
const refreshResults = () => {
  if (refetch) {
    refetch.value()
  }
}

const resetFilters = () => {
  filters.value = {
    level: '',
    style: '',
    priceRange: '',
    rating: '',
  }
  refreshResults()
}

const activeFiltersCount = computed(() => {
  return Object.values(filters.value).filter(Boolean).length
})

// tRPC query for courses
const { 
  data: coursesData,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  refetch
} = useCoursesList({
  limit: 12,
  level: filters.value.level,
  style: filters.value.style,
  priceRange: filters.value.priceRange,
  rating: filters.value.rating,
  searchQuery: searchQuery.value
})

// Extract flat list of courses from all pages
const courses = computed(() => {
  if (!coursesData.value) return []
  return coursesData.value.pages.flatMap(page => page.items)
})

// Helper to safely access course image
const getCourseImage = (course: any) => {
  // Используем поле image, добавленное в трансформации на сервере
  return course.image || '/images/default-course.jpg'
}

// Helper methods
const getAverageRating = (course: any) => {
  // Проверяем сначала aggregateRating, если есть - используем его
  if (course.aggregateRating?.ratingValue) {
    return course.aggregateRating.ratingValue.toFixed(1);
  }
  
  // Если есть review - рассчитываем среднее
  if (course.review && course.review.length > 0) {
    const sum = course.review.reduce(
      (acc: number, review: any) => acc + (review.reviewRating?.ratingValue || 0), 
      0
    );
    return (sum / course.review.length).toFixed(1);
  }
  
  // Проверяем reviews для совместимости с разными форматами данных
  if (course.reviews && course.reviews.length > 0) {
    const sum = course.reviews.reduce(
      (acc: number, review: any) => acc + (review.rating || review.reviewRating?.ratingValue || 0), 
      0
    );
    return (sum / course.reviews.length).toFixed(1);
  }
  
  return 'N/A';
}

const getMonthlyPrice = (course: any) => {
  // Проверяем наличие offers (как в mockCourses.ts)
  if (course.offers && course.offers.length > 0) {
    // Находим месячное предложение или первое
    const monthlyOffer = course.offers.find((offer: any) => 
      offer.duration === 'P1M' || (offer.name && offer.name.toLowerCase().includes('month'))
    ) || course.offers[0];
    
    return `${monthlyOffer.price} ${monthlyOffer.priceCurrency || 'EUR'}`;
  }
  
  // Проверяем offerings для совместимости с разными форматами данных
  if (course.offerings && course.offerings.length > 0) {
    // Находим месячное предложение или первое
    const monthlyOffer = course.offerings.find((offer: any) => 
      offer.duration === 'P1M' || (offer.name && offer.name.toLowerCase().includes('month'))
    ) || course.offerings[0];
    
    return `${monthlyOffer.price} ${monthlyOffer.currency || monthlyOffer.priceCurrency || 'EUR'}`;
  }
  
  return 'Contact for pricing';
}

const getInstructorTitle = (instructor: any) => {
  // Проверка на null/undefined
  if (!instructor) return 'Instructor';
  
  // Приоритет 1: Первое достижение из массива achievements
  if (instructor.experience?.achievements && instructor.experience.achievements.length > 0) {
    return instructor.experience.achievements[0];
  }
  
  // Приоритет 2: jobTitle
  if (instructor.jobTitle) {
    return instructor.jobTitle;
  }
  
  // Приоритет 3: teachingLevel
  if (instructor.teachingLevel) {
    return instructor.teachingLevel === 'master' ? 'Master Instructor' : instructor.teachingLevel;
  }
  
  // Запасной вариант
  return 'Instructor';
}
</script>
