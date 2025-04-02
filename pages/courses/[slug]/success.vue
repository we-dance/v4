<script setup lang="ts">
import { z } from 'zod'

const { $client } = useNuxtApp()
const route = useRoute()
const slug = z.string().parse(route.params.slug)
const router = useRouter()

// Fetch the course data
const course = await $client.courses.view.query({ slug })

// Check subscription status (can be added as needed)
// const subscription = await $client.subscriptions.getMySubscriptions.query()

// Redirect to course after 5 seconds
setTimeout(() => {
  router.push(`/courses/${slug}`)
}, 5000)
</script>

<template>
  <div class="min-h-screen bg-muted py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-background rounded-xl border p-8 text-center">
        <div
          class="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
        >
          <Icon name="ph:check-bold" class="text-primary w-8 h-8" />
        </div>
        <h1 class="text-3xl font-bold mb-2">Thank You for Your Purchase!</h1>
        <p class="text-muted-foreground text-lg mb-6">
          Your subscription to {{ course.name }} has been processed
          successfully.
        </p>

        <div class="space-y-6">
          <div class="p-4 bg-muted rounded-lg">
            <h3 class="font-medium mb-2">What's Next?</h3>
            <p class="text-sm text-muted-foreground">
              You now have full access to all course content. You'll be
              redirected to the course in a few seconds.
            </p>
          </div>

          <Button as-child class="w-full">
            <NuxtLink :to="`/courses/${slug}`"> Return to Course </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
