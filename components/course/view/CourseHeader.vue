<script setup lang="ts">
const { course } = defineProps<{
  course: any
}>()

const { session } = useAppAuth()
const route = useRoute()

const canEdit = computed(() => {
  return (
    session?.value?.profile?.id === course.instructor?.id &&
    !route.path.includes('/admin')
  )
})

const duration = computed(() => {
  return course.modules.reduce((acc: number, module: any) => {
    return (
      acc +
      module.lessons.reduce((acc: number, lesson: any) => {
        return acc + lesson.duration
      }, 0)
    )
  }, 0)
})

const numberOfLessons = computed(() => {
  return course.modules.reduce((acc: number, module: any) => {
    return acc + module.lessons.length
  }, 0)
})

const reviews = computed(() => {
  return course.reviews.length
})

const averageRating = computed(() => {
  return (
    course.reviews
      .filter((review: any) => review.rating)
      .reduce((acc: number, review: any) => {
        return acc + review.rating
      }, 0) / course.reviews.length
  )
})
</script>

<template>
  <div class="bg-background border-b">
    <div class="max-w-7xl mx-auto p-4 flex gap-4">
      <div>
        <h1 class="text-2xl font-bold flex items-center gap-2">
          {{ course.name }}
          <Badge v-if="course.status === 'draft'" variant="outline">
            Draft
          </Badge>
          <Badge v-if="course.status === 'archived'" variant="destructive">
            Archived
          </Badge>
        </h1>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <p v-if="course.instructor" class="text-sm text-muted-foreground">
            with {{ course.instructor?.name }}
          </p>
          <div v-if="duration > 0" class="flex items-center gap-2">
            <Icon name="ph:clock" class="w-4 h-4" />
            {{ formatDuration(duration) }}
          </div>
          <div v-if="numberOfLessons > 0" class="flex items-center gap-2">
            <Icon name="ph:book-open" class="w-4 h-4" />
            {{ numberOfLessons }} lessons
          </div>
          <div v-if="reviews > 0" class="flex items-center gap-1">
            <Icon name="ph:star-fill" class="w-4 h-4 text-orange-500" />
            {{ averageRating }} ({{ reviews }} reviews)
          </div>
        </div>
      </div>
      <div class="flex-1 flex justify-end">
        <Button as-child>
          <NuxtLink :to="`/admin/courses/${course.slug}`">
            <Icon name="lucide:pencil" class="w-4 h-4" />
            Edit
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
