<script setup lang="ts">
import { mockEvents } from '@/data/mockEvents'
import { mockCourses } from '@/data/mockCourses'
import type { AnyEvent } from '~/schemas/event'
import { formatDate } from '~/utils/format'
import { useCourseProgress } from '~/composables/useCourseProgress'
import { watchEffect, ref } from 'vue';
const { updateLessonUnlockStatus } = useCourseProgress()

const isUpdating = ref(true)
const updateError = ref(false)

const route = useRoute()
const event = computed(() =>
  mockEvents.find((e) => String(e.id) === String(route.params.slug))
)
const course = computed(() =>
  mockCourses.find((c) => String(c.id) === String(route.params.slug))
)

// judge if input is a event or course then navigate to the correct page
const typeOfInstance = computed(() =>
  course ? 'course' : event ? 'event' : 'notFound'
)

watchEffect(async () => {
  const courseId = course.value?.identifier
  if (!courseId) return
  try {
    console.log('check status:', courseId)
    const result = await updateLessonUnlockStatus(courseId, false)
    if (result) {
      console.log('successfully updated')
    } else {
      console.log('update failed')
      updateError.value = true
    }
  } catch (error) {
    console.error('update error:', error)
    updateError.value = true
  } finally {
    isUpdating.value = false
  }
})

</script>

<template>
  <!-- if input is a event -->
  <!-- leave event template for event subscription -->
  <div
    v-if="typeOfInstance === 'event'"
    class="min-h-screen bg-background-secondary py-12"
  >
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="ph:check-bold" class="w-8 h-8 text-success" />
        </div>
        <h1 class="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p class="text-muted-foreground mb-8">
          Thank you for your booking. We've sent the details to your email.
        </p>
      </div>

      Event Details
      <div class="bg-background rounded-xl border p-6 mb-8">
        <div class="flex gap-6">
          <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              :src="event?.image || '/images/event-placeholder.jpg'"
              :alt="event?.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ event?.name }}</h2>
            <div class="text-muted-foreground space-y-1 mt-2">
              <div class="flex items-center gap-2">
                <Icon name="ph:calendar" class="w-4 h-4" />
                <span>{{ formatDate(event?.date?.start || '') }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="ph:map-pin" class="w-4 h-4" />
                <span
                  >{{ event?.location.name }}, {{ event?.location.city }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center gap-4">
        <Button as-child variant="outline">
          <NuxtLink to="/events">Browse More Events</NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink :to="`/events/${event?.id}`">View Event Details</NuxtLink>
        </Button>
      </div>
    </div>
  </div>

  <!-- if input is a course -->
  <!-- course subscription confirmation and provide button back to course details -->
  <div
    v-else-if="typeOfInstance === 'course'"
    class="min-h-screen bg-background-secondary py-12"
  >
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="ph:check-bold" class="w-8 h-8 text-success" />
        </div>
        <h1 class="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p class="text-muted-foreground mb-8">
          Thank you for your booking. We've sent the details to your email.
        </p>
      </div>

      <!-- Event Details -->
      <div class="bg-background rounded-xl border p-6 mb-8">
        <div class="flex gap-6">
          <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              :src="course?.image?.url || '/images/event-placeholder.jpg'"
              :alt="course?.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ course?.name }}</h2>
            <div class="text-muted-foreground space-y-1 mt-2">
              <div class="flex items-center gap-2">
                <Icon name="ph:calendar" class="w-4 h-4" />
                <span>{{
                  formatDate(course?.courseInstance?.[0]?.startDate || '')
                }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="ph:map-pin" class="w-4 h-4" />
                <span
                  >{{
                    course?.courseInstance?.[0]?.location?.name ||
                    'WeDance Online Platform'
                  }}, {{ 'Online' }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-center gap-4">
        <Button as-child variant="outline">
          <NuxtLink to="/courses">Browse More Courses</NuxtLink>
        </Button>
        <Button as-child>
          <NuxtLink :to="`/courses/${course?.identifier}`"
            >View Course Details</NuxtLink
          >
        </Button>
      </div>
    </div>
  </div>
  <!-- Not found -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <Icon
        name="ph:calendar-x"
        class="w-16 h-16 text-muted-foreground mx-auto mb-4"
      />
      <h2 class="text-2xl font-bold text-foreground mb-2">
        Resource Not Found
      </h2>
      <p class="text-muted-foreground mb-6">
        The event you're looking for doesn't exist or has been removed.
      </p>
      <Button as-child>
        <NuxtLink to="/events">Browse Events</NuxtLink>
      </Button>
      <Button as-child>
        <NuxtLink to="/courses">Browse Courses</NuxtLink>
      </Button>
    </div>
  </div>
</template>
