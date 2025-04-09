<script setup lang="ts">
import { z } from 'zod'

const { $client } = useNuxtApp()
const route = useRoute()
const offerId = z.string().parse(route.params.offerId)
const offer = await $client.checkout.view.query({ offerId })
</script>

<template>
  <div v-if="offer?.course" class="min-h-screen bg-background-secondary py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Icon name="ph:check-bold" class="w-8 h-8 text-success" />
        </div>
        <h1 class="text-3xl font-bold mb-4">Purchase Successful!</h1>
        <p class="text-muted-foreground mb-8">
          Thank you for your purchase. We've sent the details to your email.
        </p>
      </div>

      <!-- Event Details -->
      <div class="bg-background rounded-xl border p-6 mb-8">
        <div class="flex gap-6">
          <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              :src="offer.course.coverUrl || '/images/event-placeholder.jpg'"
              :alt="offer.course.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ offer.course.name }}</h2>
            <div class="text-muted-foreground space-y-1 mt-2">
              {{ offer.course.description }}
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
          <NuxtLink :to="`/courses/${offer.course.slug}`">View Course</NuxtLink>
        </Button>
      </div>
    </div>
  </div>

  <EmptyState v-else variant="no-results" />
</template>
