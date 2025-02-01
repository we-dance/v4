<template>
  <section
    class="py-16"
    :class="{ 'bg-muted': muted, 'bg-background': !muted }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-6 mb-12">
        <div>
          <h2 class="text-3xl font-bold text-foreground">{{ title }}</h2>
          <p
            class="mt-2"
            :class="{
              'text-muted-foreground': muted,
              'text-foreground': !muted,
            }"
          >
            {{ description }}
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="relative flex-1">
            <Input
              type="search"
              placeholder="Search courses..."
              :variant="muted ? 'on-muted' : 'default'"
              class="w-full pl-9"
            />
            <Icon
              name="ph:magnifying-glass"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
          </div>
          <div class="flex gap-3">
            <Button
              :variant="muted ? 'on-muted' : 'default'"
              as-child
              class="flex-1 sm:flex-initial"
            >
              <NuxtLink
                to="/courses"
                class="flex items-center justify-center gap-2"
              >
                Browse All
                <Icon name="ph:arrow-right" class="w-4 h-4" />
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card v-for="course in featuredCourses" :key="course.id" class="group">
          <NuxtLink :to="`/courses/${course.id}`">
            <CardHeader class="space-y-4">
              <div
                class="aspect-video rounded-lg overflow-hidden"
                :class="{
                  'bg-muted': muted,
                  'bg-background': !muted,
                }"
              >
                <img
                  :src="course.instructor.image"
                  :alt="course.title"
                  class="w-full h-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div class="space-y-2">
                <h3 class="font-semibold text-xl group-hover:text-primary">
                  {{ course.title }}
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
                    {{ course.instructor.credentials }}
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-1">
                  <Icon name="ph:star-fill" class="w-4 h-4 text-yellow-400" />
                  <span>{{ course.stats.avgRating }}</span>
                  <span class="text-muted-foreground"
                    >({{ course.stats.reviewCount }})</span
                  >
                </div>
                <div class="font-medium">
                  {{ course.pricing.regular.monthly.amount }}
                  {{ course.pricing.regular.monthly.currency }}/mo
                </div>
              </div>
            </CardContent>
          </NuxtLink>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mockCourses } from '@/data/mockCourses'

defineProps({
  title: {
    type: String,
    default: 'Dance Courses',
  },
  description: {
    type: String,
    default: 'Learn dance online with world-class instructors',
  },
  muted: {
    type: Boolean,
    default: false,
  },
})

const featuredCourses = computed(() => mockCourses.slice(0, 3))
</script>
