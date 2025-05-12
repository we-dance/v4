<script setup lang="ts">
import { toast } from 'vue-sonner'
const { course } = defineProps<{
  course: any
}>()

const currentLesson = ref(course?.modules[0]?.lessons[0])
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
    .find((subscription: any) =>
      ['active', 'pending'].includes(subscription.status)
    )
)

const isUnlocked = computed(() => {
  return subscription.value?.status === 'active'
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

const handleSelectLesson = (props: any) => {
  if (props.isLessonLocked) {
    handleViewPricing()
    return
  }

  if (!props.isLessonAvailable) {
    toast.error('This lesson is not available yet')
    return
  }

  if (props.lesson.fileUrl) {
    window.open(props.lesson.fileUrl, '_blank')
    return
  }

  currentLesson.value = props.lesson
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

    <div class="max-w-7xl mx-auto p-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 space-y-8">
          <CourseVideoPlayer
            v-if="currentLesson?.videoId"
            class="player"
            :lesson="currentLesson"
            :poster="course.coverUrl"
          />
          <CourseAbout :course="course" />
          <InstructorProfile
            v-if="course.instructor"
            :profile="course.instructor"
          />
          <Reviews :course="course" />
          <CourseCommunity :course="course" />
        </div>

        <div class="lg:sticky lg:top-8 space-y-8">
          <CourseSidebarSubscriptions
            v-if="subscription"
            :subscription="subscription"
          />
          <CourseSidebarPricing
            v-else
            :course="course"
            @view-pricing="handleViewPricing"
          />
          <CourseContent
            v-if="course.modules?.length"
            :course="course"
            :current-lesson="currentLesson"
            :is-unlocked="isUnlocked"
            @select-lesson="handleSelectLesson"
          />
          <CourseSidebarServices
            v-if="course.instructor"
            :profile="course.instructor"
          />
        </div>
      </div>
    </div>
  </div>
</template>
