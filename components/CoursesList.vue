<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const showFilters = ref(false)
const filters = ref({
  level: '',
  style: '',
  priceRange: '',
  rating: '',
})

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

const getMonthlyPrice = (course: Course) => {
  const monthlyOffer = course.offers?.find((offer) => offer.duration === 'P1M')
  if (monthlyOffer) {
    return `${monthlyOffer.price} ${monthlyOffer.priceCurrency}`
  }
  return 'Contact for pricing'
}

const courses = computed(() => {
  return []
})
</script>

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

    <!-- Course Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card v-for="course in courses" :key="course.identifier" class="group">
        <NuxtLink :to="`/courses/${course.identifier}`">
          <CardHeader class="space-y-4">
            <div class="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                :src="course.image?.url"
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
            <div class="flex items-center gap-3">
              <img
                :src="course.instructor.image"
                :alt="course.instructor.name"
                class="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div class="text-sm font-medium">
                  {{ course.instructor.name }}
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ course.instructor.jobTitle }}
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-1">
                <Icon name="ph:star-fill" class="w-4 h-4 text-yellow-400" />
                <span>{{ course.aggregateRating?.ratingValue }}</span>
                <span class="text-muted-foreground"
                  >({{ course.aggregateRating?.reviewCount }})</span
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
    <div v-if="courses.length === 0" class="text-center py-12 space-y-4">
      <div class="text-4xl">🎓</div>
      <h3 class="text-lg font-medium">No courses found</h3>
      <p class="text-muted-foreground">
        Try adjusting your filters or search terms
      </p>
    </div>
  </div>
</template>
