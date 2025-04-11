<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()
</script>

<template>
  <Card class="group">
    <CardHeader class="space-y-4">
      <div class="aspect-video bg-muted rounded-lg overflow-hidden">
        <img
          v-if="course.coverUrl"
          :src="course.coverUrl"
          :alt="course.name"
          class="w-full h-full object-cover transition group-hover:scale-105"
        />
        <div
          v-else
          class="w-full h-full bg-muted flex items-center justify-center"
        >
          <Icon name="ph:image" class="w-8 h-8 text-muted-foreground" />
        </div>
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
          v-if="course.instructor?.photo"
          :src="course.instructor?.photo"
          :alt="course.instructor?.name"
          class="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <div class="text-sm font-medium">
            {{ course.instructor?.name }}
          </div>
          <div class="text-xs text-muted-foreground">
            {{ course.instructor?.bio.slice(0, 100) }}...
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between text-sm">
        <div
          v-if="course.aggregateRating?.ratingValue"
          class="flex items-center gap-1"
        >
          <Icon name="ph:star-fill" class="w-4 h-4 text-yellow-400" />
          <span>{{ course.aggregateRating?.ratingValue }}</span>
          <span
            v-if="course.aggregateRating?.reviewCount"
            class="text-muted-foreground"
            >({{ course.aggregateRating?.reviewCount }})</span
          >
        </div>
        <div></div>
        <div v-if="course.offers.length > 0" class="font-medium">
          from {{ getMinPrice(course.offers) }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>
