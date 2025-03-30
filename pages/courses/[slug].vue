<script setup lang="ts">
import { z } from 'zod'
import { toast } from 'vue-sonner'

const { $client } = useNuxtApp()
const route = useRoute()
const slug = z.string().parse(route.params.slug)
const course = await $client.courses.view.query({ slug })
const currentLesson = ref(course.modules[0].lessons[0])
const dialog = useDialog()

// Use the correct structure based on your actual implementation
const { stripeUrl, handleStripeCheckout } = useStripeCheckout()
// For loading state tracking
const isCheckoutLoading = ref(false)
const loadingStripeCourseId = ref<string | null>(null)

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
  if (lesson.locked) {
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
      onSubscribe: handleSubscribe,
    },
  })
}

const handleSubscribe = async (offerId: string) => {
  try {
    isCheckoutLoading.value = true
    loadingStripeCourseId.value = course.id

    // Using the actual implementation structure
    const { url } = await handleStripeCheckout(
      // These parameters might need adjustment based on your actual needs
      'current-user-id', // You should get this from auth
      course.instructor?.id || 'default-org-id',
      course.id
    )

    if (url) {
      window.location.href = url
    } else {
      throw new Error('Failed to create checkout session')
    }
  } catch (error) {
    console.error('Error during checkout:', error)
    toast.error('Error initiating checkout. Please try again.')
  } finally {
    isCheckoutLoading.value = false
    loadingStripeCourseId.value = null
  }
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
            @select-lesson="handleSelectLesson"
          />
          <CourseMaterials :course="course" />
          <InstructorProfile :profile="course.instructor" />
          <Reviews :course="course" />
          <CourseCommunity :course="course" />
        </div>

        <div class="lg:sticky lg:top-8 space-y-8">
          <CourseSidebarOverview :course="course" />
          <CourseSidebarPricing
            :course="course"
            @view-pricing="handleViewPricing"
          />
          <CourseSidebarServices :profile="course.instructor" />
        </div>
      </div>
    </div>
  </div>
</template>
