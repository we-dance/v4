<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockCourses } from '~/data/mockCourses'
import { useDialog } from '~/composables/useDialog'
import { useRoute } from 'vue-router'
import type { Course } from '~/schemas/course'
import '@mux/mux-player'

const route = useRoute()
const course = ref(
  mockCourses.find((course) => String(course.identifier) === String(route.params.id))!
)
const dialog = useDialog()

const currentLesson = ref(course.value.hasPart[0].hasPart[0])

const progress = computed(() => {
  const totalLessons = course.value.hasPart.reduce(
    (acc: number, module) => acc + module.hasPart.length,
    0
  )
  const completedLessons = course.value.hasPart.reduce(
    (acc: number, module) =>
      acc + module.hasPart.filter((lesson) => lesson.completed).length,
    0
  )
  return Math.round((completedLessons / totalLessons) * 100)
})

const selectLesson = (lesson: any) => {
  currentLesson.value = lesson
}

const getMonthlyPrice = () => {
  const monthlyOffer = course.value.offers.find(offer => offer.duration === 'P1M')
  if (monthlyOffer) {
    return `${monthlyOffer.price} ${monthlyOffer.priceCurrency}`
  }
  return 'Contact for pricing'
}

const getPrivateClassPrice = () => {
  const privateOffer = course.value.instructor.availableService?.offers[0]
  if (privateOffer) {
    return `${privateOffer.price} ${privateOffer.priceCurrency}`
  }
  return 'Contact for pricing'
}

const getPrivateClassDuration = () => {
  const privateOffer = course.value.instructor.availableService?.offers[0]
  if (privateOffer?.duration) {
    // Convert ISO duration to minutes (assuming PT60M format)
    return privateOffer.duration.replace('PT', '').replace('M', '')
  }
  return '60'
}

const handleSubscribe = () => {
  dialog.open({
    component: 'CourseSubscriptionDialog',
    props: {
      course: course.value,
      onSelect: async (plan: { type: string; interval?: string }) => {
        try {
          await navigateTo(
            `/checkout/${route.params.id}?type=course&plan=${plan.type}${plan.interval ? `&interval=${plan.interval}` : ''}`
          )
        } catch (error) {
          console.error('Navigation error:', error)
        }
      },
    },
  })
}
</script>

<template>
  <div class="min-h-screen bg-muted">
    <!-- Course Header -->
    <div class="bg-background border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold">{{ course.name }}</h1>
            <p class="text-sm text-muted-foreground">
              Instructor: {{ course.instructor.name }}
            </p>
          </div>
          <div class="text-right">
            <div class="text-sm text-muted-foreground">Progress</div>
            <div class="text-lg font-semibold">{{ progress }}%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Video Player -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="aspect-video">
              <mux-player
                v-if="currentLesson.video.playbackId"
                stream-type="on-demand"
                :playback-id="currentLesson.video.playbackId"
                :metadata-video-title="currentLesson.name"
                accent-color="#F1023D"
              />
              <iframe
                v-else
                :src="`https://www.youtube.com/embed/${currentLesson.video.identifier}`"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
            <div class="p-4">
              <h2 class="text-xl font-semibold mb-2">
                {{ currentLesson.name }}
              </h2>
              <p class="text-sm text-muted-foreground">
                Duration: {{ currentLesson.timeRequired }}
              </p>
            </div>
          </div>

          <!-- Course Content -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Course Content</h3>
            </div>
            <div class="divide-y">
              <div
                v-for="module in course.hasPart"
                :key="module.identifier"
                class="p-4"
              >
                <h4 class="font-medium mb-2">{{ module.name }}</h4>
                <ul class="space-y-2">
                  <li
                    v-for="lesson in module.hasPart"
                    :key="lesson.identifier"
                    @click="lesson.locked ? handleSubscribe() : selectLesson(lesson)"
                    class="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                    :class="{
                      'bg-accent/10': currentLesson.identifier === lesson.identifier,
                    }"
                  >
                    <Icon
                      :name="
                        lesson.completed
                          ? 'ph:check-circle-fill'
                          : lesson.locked
                          ? 'ph:lock-simple'
                          : 'ph:play-circle'
                      "
                      class="w-5 h-5"
                      :class="
                        lesson.completed
                          ? 'text-success'
                          : lesson.locked
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground'
                      "
                    />
                    <div class="flex-1">
                      <div
                        class="text-sm"
                        :class="{
                          'font-medium': currentLesson.identifier === lesson.identifier,
                        }"
                      >
                        {{ lesson.name }}
                      </div>
                      <div class="text-xs text-muted-foreground">
                        {{ lesson.timeRequired }}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Course Materials -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Course Materials</h3>
            </div>
            <div class="p-4">
              <ul class="space-y-3">
                <li
                  v-for="material in course.learningResources"
                  :key="material.id"
                  class="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                >
                  <Icon
                    :name="material.icon"
                    class="w-5 h-5 text-muted-foreground"
                  />
                  <div class="flex-1">
                    <div class="text-sm font-medium">{{ material.name }}</div>
                    <div class="text-xs text-muted-foreground">
                      {{ material.contentSize }}
                    </div>
                  </div>
                  <Icon
                    name="ph:download-simple"
                    class="w-5 h-5 text-muted-foreground"
                  />
                </li>
              </ul>
            </div>
          </div>

          <!-- Instructor Info -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">About the Instructor</h3>
            </div>
            <div class="p-4">
              <div class="flex items-start gap-4">
                <NuxtLink :to="`/artists/${course.instructor.artirstid}`" class="hover:text-accent">
                  <img
                  :src="course.instructor.image"
                  :alt="course.instructor.name"
                  class="w-24 h-24 rounded-lg object-cover"
                />
                    </NuxtLink>
                <div>
                  <h4 class="font-semibold text-lg">
                    <NuxtLink :to="`/artists/${course.instructor.artirstid}`" class="hover:text-accent">
                      {{ course.instructor.name }}
                    </NuxtLink>
                  </h4>
                  <p class="text-sm text-muted-foreground mb-2">
                    {{ course.instructor.teachingLevel }} instructor in
                    {{ course.instructor.location }}
                  </p>
                  <div
                    class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
                  >
                    <Icon name="ph:star-fill" class="w-4 h-4 text-warning" />
                    {{ course.instructor.aggregateRating?.ratingValue }} ({{
                      course.instructor.aggregateRating?.reviewCount
                    }}
                    reviews)
                  </div>
                  <div class="space-y-2">
                    <p class="text-sm text-muted-foreground">
                      <Icon name="ph:translate" class="w-4 h-4 inline mr-1" />
                      Languages: {{ course.instructor.knowsLanguage.join(', ') }}
                    </p>
                    <p class="text-sm text-muted-foreground" v-if="course.instructor.experience?.years">
                      <Icon name="ph:medal" class="w-4 h-4 inline mr-1" />
                      {{ course.instructor.experience.years }}+ years of experience
                    </p>
                    <div class="text-sm text-muted-foreground">
                      <Icon name="ph:trophy" class="w-4 h-4 inline mr-1" />
                      Achievements:
                      <ul class="list-disc list-inside ml-5">
                        <li
                          v-for="achievement in course.instructor.experience?.achievements"
                          :key="achievement"
                        >
                          {{ achievement }}
                        </li>
                      </ul>
                    </div>
                    <!-- Social Media Links -->
                    <div
                      class="flex items-center gap-4 mt-4"
                      v-if="course.instructor.socialMedia"
                    >
                      <a
                        v-if="course.instructor.socialMedia.instagram"
                        :href="`https://instagram.com/${course.instructor.socialMedia.instagram}`"
                        target="_blank"
                        class="text-muted-foreground hover:text-accent"
                      >
                        <Icon name="ph:instagram-logo" class="w-6 h-6" />
                      </a>
                      <a
                        v-if="course.instructor.socialMedia.youtube"
                        :href="`https://youtube.com/${course.instructor.socialMedia.youtube}`"
                        target="_blank"
                        class="text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="ph:youtube-logo" class="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Student Reviews</h3>
            </div>
            <div class="divide-y">
              <div
                v-for="review in course.review"
                :key="review.identifier"
                class="p-4"
              >
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex">
                    <Icon
                      v-for="i in review.reviewRating.ratingValue"
                      :key="i"
                      name="ph:star-fill"
                      class="w-4 h-4 text-warning"
                    />
                  </div>
                  <span class="text-sm text-muted-foreground">{{
                    review.author.name
                  }}</span>
                  <span class="text-xs text-muted-foreground">
                    {{ new Date(review.datePublished).toLocaleDateString() }}
                  </span>
                </div>
                <p class="text-sm text-muted-foreground">
                  {{ review.reviewBody }}
                </p>
              </div>
            </div>
          </div>

          <!-- Community -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Community</h3>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-accent">
                    {{ course.community.discussions }}
                  </div>
                  <div class="text-sm text-muted-foreground">Discussions</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-accent">
                    {{ course.community.activeStudents }}
                  </div>
                  <div class="text-sm text-muted-foreground">
                    Active Students
                  </div>
                </div>
              </div>
              <div class="bg-accent/10 rounded-lg p-4">
                <h4 class="font-medium mb-2">Next Live Q&A Session</h4>
                <p class="text-sm text-muted-foreground">
                  {{ new Date(course.community.nextLiveQ_A).toLocaleString() }}
                </p>
                <Button class="w-full mt-3" variant="outline"
                  >Join Community</Button
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:sticky lg:top-8 space-y-8">
          <!-- Course Overview -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 border-b">
              <h3 class="font-semibold">Course Overview</h3>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold">
                    {{ course.stats.enrolled }}
                  </div>
                  <div class="text-sm text-muted-foreground">Students</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold">
                    {{ course.stats.completed }}
                  </div>
                  <div class="text-sm text-muted-foreground">Completed</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold text-warning">
                    {{ course.aggregateRating.ratingValue || '?' }}
                  </div>
                  <div class="text-sm text-muted-foreground">Avg Rating</div>
                </div>
                <div class="text-center p-3 bg-muted rounded-lg">
                  <div class="text-2xl font-bold">
                    {{ course.aggregateRating.reviewCount }}
                  </div>
                  <div class="text-sm text-muted-foreground">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Subscription -->
          <div class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="p-4">
              <div class="space-y-4">
                <div>
                  <h3 class="font-semibold mb-2">Starting from</h3>
                  <div class="text-2xl font-bold">
                    {{ getMonthlyPrice() }}<span class="text-base font-normal text-muted-foreground">/month</span>
                    
                  </div>
                </div>

                <Button
                  class="w-full"
                  variant="primary"
                  @click="handleSubscribe"
                >
                  View Pricing Plans
                </Button>

                <p class="text-xs text-center text-muted-foreground">
                  24-hours money-back guarantee
                </p>
              </div>
            </div>
          </div>

          <!-- Private Class Booking -->
          <div
            class="bg-background rounded-xl shadow-sm overflow-hidden"
            v-if="course.instructor.availableService"
          >
            <div class="p-4 border-b">
              <h3 class="font-semibold">Book Private Class</h3>
            </div>
            <div class="p-4">
              <div class="text-2xl font-bold mb-1">
                {{ getPrivateClassPrice() }}
              </div>
              <p class="text-sm text-muted-foreground mb-4">
                {{ getPrivateClassDuration() }} minutes private lesson
              </p>
              <Button class="w-full" variant="primary" as-child>
                <NuxtLink
                  :to="`/checkout/${route.params.id}?type=private&instructor=${course.instructor.identifier}`"
                >
                  Book Private Class
                </NuxtLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
