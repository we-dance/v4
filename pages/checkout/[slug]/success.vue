<script setup lang="ts">
import { z } from 'zod'
import { formatDate } from '~/utils/format'
import { useCourseProgress } from '~/composables/useCourseProgress'
import { watchEffect, ref } from 'vue'
import { toast } from 'vue-sonner'

const { updateLessonUnlockStatus } = useCourseProgress()
const isUpdating = ref(true)
const updateError = ref(false)
const subscriptionCreated = ref(false)

const { $client } = useNuxtApp()
const route = useRoute()
const slug = z.string().parse(route.params.slug)

const event = await $client.events.getAll.query({})
const course = await $client.courses.view.query({ slug })

const typeOfInstance = computed(() =>
  course ? 'course' : event ? 'event' : 'notFound'
)

watchEffect(async () => {
  if (
    typeOfInstance.value !== 'course' ||
    !course.id ||
    subscriptionCreated.value
  )
    return

  try {
    const sessionId = localStorage.getItem('stripe_session_id')
    if (!sessionId) {
      console.error('Stripe sessionId not found in localStorage')
      updateError.value = true
      return
    }
    const stripeData =
      await $client.subscriptions.getStripeSessionDetails.query({
        sessionId,
      })

    if (!stripeData?.stripePriceId) {
      console.error('Stripe session data not found')
      return
    }

    const offerId = localStorage.getItem('selected_offer_id')
    const offer = course.offers?.find(
      (o: { id: string | null }) => o.id === offerId
    )

    if (!offer) {
      console.error('Offer not matched with stripe price ID')
      return
    }

    await $client.subscriptions.create.mutate({
      name: course.name,
      plan: offer.name,
      price: offer.price,
      currency: offer.currency.toUpperCase(),
      interval: offer.duration === 'P1Y' ? 'year' : 'month',
      status: 'active',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      stripeCustomerId: stripeData.stripeCustomerId,
      stripeSubscriptionId: stripeData.stripeSubscriptionId,
      stripePriceId: stripeData.stripePriceId,
    })

    subscriptionCreated.value = true

    const result = await updateLessonUnlockStatus(course.id, false)

    if (result) {
      toast.info('Lessons unlocked successfully')
    } else {
      updateError.value = true
    }
  } catch (err) {
    toast.error('Error creating subscription or unlocking lessons:', err)
    updateError.value = true
  } finally {
    isUpdating.value = false
    localStorage.removeItem('selected_offer_id')
    localStorage.removeItem('stripe_session_id')
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
              :src="event?.cover || '/images/event-placeholder.jpg'"
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
              :src="course?.coverUrl || '/images/event-placeholder.jpg'"
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
          <NuxtLink :to="`/courses/${course.slug}`"
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
