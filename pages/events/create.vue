<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppAuth } from '~/composables/useAppAuth'

const router = useRouter()
const { isLoggedIn } = useAppAuth()

// Redirect if not logged in
if (!isLoggedIn.value) {
  router.push('/login')
}

const handleSubmit = async (data: any) => {
  try {
    // TODO: Implement event creation logic using tRPC
    console.log('Creating event:', data)
    router.push('/events')
  } catch (error) {
    console.error('Error creating event:', error)
  }
}

const handleCancel = () => {
  router.push('/events')
}
</script>

<template>
  <div class="container mx-auto py-8">
    <EventForm @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>
