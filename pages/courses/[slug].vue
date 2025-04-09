<script setup lang="ts">
import { z } from 'zod'

const { $client } = useNuxtApp()
const route = useRoute()
const slug = z.string().parse(route.params.slug)
const course = await $client.courses.view.query({ slug })
const currentLesson = ref(course.modules[0].lessons[0])
const subscription = ref(
  course.offers
    .filter(
      (offer: any) => offer.subscriptions && offer.subscriptions.length > 0
    )
    .flatMap((offer: any) =>
      offer.subscriptions.map((subscription: any) => ({
        ...subscription,
        offer,
      }))
    )
    .find((subscription: any) => subscription.status === 'active')
)

const isUnlocked = computed(() => {
  return !subscription.value || subscription.value.status === 'active'
})

const dialog = useDialog()

const scrollToPlayer = () => {
  const player = document.querySelector('.player')
  if (player) {
    const headerOffset = 64
    const elementPosition = player.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const handleSelectLesson = (lesson: any) => {
  if (lesson.locked && !isUnlocked.value) {
    handleViewPricing()
    return
  }

  currentLesson.value = lesson
  scrollToPlayer()
}

const handleViewPricing = () => {
  dialog.open({
    component: 'CourseSubscriptionDialog',
    props: {
      course: course,
    },
  })
}
</script>

<template>
  <div class="min-h-screen bg-muted">
    <CourseHeader :course="course" />
    <CourseOverview :course="course" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[97%]">
        <div class="lg:col-span-2 space-y-8">
          <CourseVideoPlayer class="player" :lesson="currentLesson" />
          <CourseContent
            :course="course"
            :current-lesson="currentLesson"
            :is-unlocked="isUnlocked"
            @select-lesson="handleSelectLesson"
          />
          <CourseMaterials :course="course" />
          <InstructorProfile :profile="course.instructor" />
          <Reviews :course="course" />
          <CourseCommunity :course="course" />
        </div>

        <div class="lg:sticky lg:top-8 space-y-8">
          <CourseSidebarOverview :course="course" />
          <CourseSidebarSubscriptions
            v-if="subscription"
            :subscription="subscription"
          />
          <CourseSidebarPricing
            v-else
            :course="course"
            @view-pricing="handleViewPricing"
          />
          <CourseSidebarServices :profile="course.instructor" />
        </div>
      </div>
    </div>
  </div>
</template>
