<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDialog } from '~/composables/useDialog'
import { useCourseById, useCourseBySlug } from '~/composables/trpc'
import type { Course } from '~/schemas/course'
import '@mux/mux-player'

const route = useRoute()
const id = String(route.params.id)
const isLoading = ref(true)
const error = ref<string | null>(null)
const course = ref<Course | null>(null)
const activeLesson = ref<any>(null)
const { $client } = useNuxtApp();

onMounted(fetchCourseData)

async function fetchCourseData() {
  try {
    isLoading.value = true
    error.value = null
    
    const directResult = await $client.courses.bySlug.query(id)
    
    if (directResult) {
      course.value = {
        ...directResult,
        stats: directResult.stats || directResult.metadata?.stats || { enrolled: 0, completed: 0 },
        community: directResult.community || directResult.metadata?.community || {
          discussions: 0,
          activeStudents: 0,
          nextLiveQ_A: new Date().toISOString()
        }
      } as Course
      
      // Initialize course rating
      if (course.value.review?.length > 0) {
        const totalRating = course.value.review.reduce(
          (acc, review) => acc + review.reviewRating.ratingValue,
          0
        )
        if (!course.value.aggregateRating) {
          course.value.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: 0,
            reviewCount: 0,
            ratingCount: 0
          }
        }
        course.value.aggregateRating.ratingValue = +(
          totalRating / course.value.review.length
        ).toFixed(1)
        course.value.aggregateRating.reviewCount = course.value.review.length
        course.value.aggregateRating.ratingCount = course.value.review.length
      }
      
      isLoading.value = false
    }
  } catch (e: any) {
    console.error('Fetch error:', e)
    error.value = e.message || 'An error occurred while loading the course'
    isLoading.value = false
  }
}

const dialog = useDialog()

const currentLesson = computed(() => {
  if (activeLesson.value) return activeLesson.value;
  if (!course.value || !course.value.modules || !course.value.modules[0]?.lessons) return null;
  // Initialize activeLesson on first load
  if (course.value.modules[0].lessons[0] && !activeLesson.value) {
    activeLesson.value = course.value.modules[0].lessons[0];
  }
  return activeLesson.value || course.value.modules[0].lessons[0];
})

const progress = computed(() => {
  if (!course.value || !course.value.modules) return 0
  
  const totalLessons = course.value.modules.reduce(
    (acc: number, module) => acc + (module.lessons?.length || 0),
    0
  )
  
  const completedLessons = course.value.modules.reduce(
    (acc: number, module) =>
      acc + (module.lessons?.filter((lesson) => lesson.completed)?.length || 0),
    0
  )
  
  if (totalLessons === 0) return 0
  return Math.round((completedLessons / totalLessons) * 100)
})

const selectLesson = (lesson: any) => {
  if (!course.value) return;
  // Just update activeLesson
  activeLesson.value = lesson;
}

const getMonthlyPrice = () => {
  if (!course.value || !course.value.offers) return 'Contact for pricing'
  
  const monthlyOffer = course.value.offers.find(
    (offer) => offer.duration === 'P1M'
  )
  if (monthlyOffer) {
    return `${monthlyOffer.price} ${monthlyOffer.priceCurrency}`
  }
  return 'Contact for pricing'
}

const getPrivateClassPrice = () => {
  if (!course.value || !course.value.instructor?.availableService?.offers?.[0]) {
    return 'Contact for pricing'
  }
  
  const privateOffer = course.value.instructor.availableService.offers[0]
  if (privateOffer) {
    return `${privateOffer.price} ${privateOffer.priceCurrency}`
  }
  return 'Contact for pricing'
}

const getPrivateClassDuration = () => {
  if (!course.value || !course.value.instructor?.availableService?.offers?.[0]) {
    return '60'
  }
  
  const privateOffer = course.value.instructor.availableService.offers[0]
  if (privateOffer?.duration) {
    // Convert ISO duration to minutes (assuming PT60M format)
    return privateOffer.duration.replace('PT', '').replace('M', '')
  }
  return '60'
}

const handleSubscribe = () => {
  if (!course.value) return
  
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
        dialog.close()
        }
      },
    },
  })
}

const handleAddReview = () => {
  if (!course.value) return
  
  dialog.open({
    component: 'CourseReviewDialog',
    props: {
      course: course.value,
      onSubmit: (review: { rating: number; reviewBody: string }) => {
  const newReview = {
    '@type': 'Review' as const,
          identifier: (course.value?.review?.length || 0) + 1,
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: review.rating,
      bestRating: 5,
            worstRating: 1,
    },
    author: {
      '@type': 'Person' as const,
            name: 'Current User',
    },
          reviewBody: review.reviewBody,
          datePublished: new Date().toISOString().split('T')[0],
  }

        if (!course.value!.review) {
          course.value!.review = []
  }
  
        course.value!.review.unshift(newReview)

  // Update aggregate rating
        const totalRating = course.value!.review.reduce(
          (acc, review) => acc + review.reviewRating.ratingValue,
          0
        )
        
        if (!course.value!.aggregateRating) {
          course.value!.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: 0,
            reviewCount: 0,
            ratingCount: 0
          }
        }
        
        course.value!.aggregateRating.ratingValue = +(
          totalRating / course.value!.review.length
        ).toFixed(1)
        course.value!.aggregateRating.reviewCount = course.value!.review.length
        course.value!.aggregateRating.ratingCount = course.value!.review.length

        dialog.close()
      },
    },
  })
}

const communityData = computed(() => (course.value as any)?.metadata?.community || {
  discussions: 0,
  activeStudents: 0,
  nextLiveQ_A: new Date().toISOString()
})

const statsData = computed(() => (course.value as any)?.metadata?.stats || {
  enrolled: 0,
  completed: 0
})
</script>

<template>
  <div class="min-h-screen bg-muted">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
      <div class="h-8 w-64 mb-4 bg-muted animate-pulse rounded"></div>
      <div class="h-4 w-40 mb-12 bg-muted animate-pulse rounded"></div>
      <div class="flex justify-center">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p class="mt-6 text-muted-foreground">Loading course data...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex flex-col items-center justify-center py-12">
      <Icon name="ph:warning-circle" class="w-16 h-16 text-destructive mb-4" />
      <h2 class="text-xl font-bold mb-2">Loading Error</h2>
      <p class="text-muted-foreground mb-6">{{ error }}</p>
      <Button @click="fetchCourseData">Try again</Button>
    </div>

    <!-- Course content when loaded -->
    <template v-else-if="course">
      <!-- Course Header -->
      <div class="bg-background border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between w-[94%]">
            <div>
              <h1 class="text-2xl font-bold">{{ course.name }}</h1>
              <p class="text-sm text-muted-foreground">
                Instructor: {{ course.instructor?.name || 'Unknown' }}
              </p>
            </div>
            <div class="text-right">
              <div class="text-sm text-muted-foreground">Progress</div>
              <div class="text-lg font-semibold">{{ progress }}%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Overview -->
      <div class="bg-background border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col gap-4 w-[97%]">
            <div class="text-sm text-muted-foreground uppercase tracking-wide">
              {{ course.educationalLevel }} • {{ course.teaches?.[0]?.name }}
            </div>
            <p class="text-lg">{{ course.description }}</p>
            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <div class="flex items-center gap-2">
                <Icon name="ph:clock" class="w-4 h-4" />
                {{ course.timeRequired }}
              </div>
              <div class="flex items-center gap-2">
                <Icon name="ph:book-open" class="w-4 h-4" />
                {{ course.numberOfLessons }} lessons
              </div>
              </div>
            </div>
          </div>
        </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[97%]">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Video Player -->
            <div v-if="currentLesson" class="bg-background rounded-xl shadow-sm overflow-hidden">
            <div class="aspect-video">
              <mux-player
                  v-if="currentLesson.videoProvider === 'mux' || currentLesson.video?.playbackId"
                stream-type="on-demand"
                  :playback-id="currentLesson.video?.playbackId || currentLesson.videoId"
                :metadata-video-title="currentLesson.name"
                accent-color="#F1023D"
              />
              <iframe
                v-else
                  :src="`https://www.youtube.com/embed/${currentLesson.video?.identifier || currentLesson.videoId}`"
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
                  Duration: {{ currentLesson.timeRequired || currentLesson.videoDuration }}
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
                  v-for="module in course.modules"
                  :key="module.id"
              class="p-4"
            >
              <h4 class="font-medium mb-2">{{ module.name }}</h4>
              <ul class="space-y-2">
                <li
                      v-for="lesson in module.lessons"
                      :key="lesson.id"
                  @click="
                    lesson.locked ? handleSubscribe() : selectLesson(lesson)
                  "
                  class="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                  :class="{
                        'bg-accent/10':
                          currentLesson?.id === lesson.id,
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
                            'font-medium':
                              currentLesson?.id === lesson.id,
                      }"
                    >
                      {{ lesson.name }}
                    </div>
                    <div class="text-xs text-muted-foreground">
                          {{ lesson.timeRequired || lesson.videoDuration }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Course Materials -->
            <div class="bg-background rounded-xl shadow-sm overflow-hidden" v-if="course.learningResources && course.learningResources.length">
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
            <div class="bg-background rounded-xl shadow-sm overflow-hidden" v-if="course.instructor">
          <div class="p-4 border-b">
            <h3 class="font-semibold">About the Instructor</h3>
          </div>
          <div class="p-4">
            <div class="flex items-start gap-4">
              <NuxtLink
                    :to="`/artists/${course.instructor.identifier}`"
                class="hover:text-accent"
              >
                <img
                  :src="course.instructor.image"
                  :alt="course.instructor.name"
                  class="w-24 h-24 rounded-lg object-cover"
                />
              </NuxtLink>
              <div>
                <h4 class="font-semibold text-lg">
                  <NuxtLink
                        :to="`/artists/${course.instructor.identifier}`"
                    class="hover:text-accent"
                  >
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
                      <p class="text-sm text-muted-foreground" v-if="course.instructor.knowsLanguage">
                    <Icon name="ph:translate" class="w-4 h-4 inline mr-1" />
                    Languages:
                    {{ course.instructor.knowsLanguage.join(', ') }}
                  </p>
                  <p
                    class="text-sm text-muted-foreground"
                    v-if="course.instructor.experience?.years"
                  >
                    <Icon name="ph:medal" class="w-4 h-4 inline mr-1" />
                    {{ course.instructor.experience.years }}+ years of
                    experience
                  </p>
                      <div class="text-sm text-muted-foreground" v-if="course.instructor.experience?.achievements">
                    <Icon name="ph:trophy" class="w-4 h-4 inline mr-1" />
                    Achievements:
                    <ul class="list-disc list-inside ml-5">
                      <li
                            v-for="achievement in course.instructor.experience.achievements"
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
            <div class="bg-background rounded-xl shadow-sm overflow-hidden" v-if="course.review">
          <div class="p-4 border-b flex items-center justify-between">
            <h3 class="font-semibold">Student Reviews</h3>
                <Button @click="handleAddReview">Review</Button>
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
            <div class="bg-background rounded-xl shadow-sm overflow-hidden" v-if="course.community">
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
            <div class="bg-background rounded-xl shadow-sm overflow-hidden" v-if="course.stats">
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
                      {{ course.aggregateRating?.ratingValue || '?' }}
                </div>
                <div class="text-sm text-muted-foreground">Avg Rating</div>
              </div>
              <div class="text-center p-3 bg-muted rounded-lg">
                <div class="text-2xl font-bold">
                      {{ course.aggregateRating?.reviewCount || 0 }}
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
                  {{ getMonthlyPrice()
                  }}<span
                    class="text-base font-normal text-muted-foreground"
                  ></span>
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
              v-if="course.instructor?.availableService"
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
    </template>

    <!-- No course found -->
    <div v-else class="flex flex-col items-center justify-center py-12">
      <Icon name="ph:warning-circle" class="w-16 h-16 text-warning mb-4" />
      <h2 class="text-xl font-bold mb-2">Course not found</h2>
      <p class="text-muted-foreground mb-6">The requested course does not exist or has been deleted.</p>
      <RouterLink to="/courses">
        <Button>Back to courses</Button>
      </RouterLink>
    </div>
  </div>
</template>
