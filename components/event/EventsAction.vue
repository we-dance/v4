<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppAuth } from '~/composables/useAppAuth'
import { toast } from 'vue-sonner'
import { Plus as PlusIcon } from 'lucide-vue-next'

const router = useRouter()
const { isLoggedIn } = useAppAuth()

const navigateToCreate = () => {
  if (isLoggedIn.value) {
    router.push('/events/create')
  } else {
    toast.info('Please sign in to create an event')
    setTimeout(() => {
      router.push({
        name: 'auth-signin',
        query: { redirect: '/events/create' },
      })
    }, 1000)
  }
}
</script>

<template>
  <div class="flex justify-end mb-4">
    <Button variant="primary" @click="navigateToCreate">
      <PlusIcon class="w-4 h-4 mr-2" />
      Create Event
    </Button>
  </div>
</template>
