<script setup lang="ts">
const props = defineProps({
  error: Object,
})

console.log('error', { ...props.error })

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}

const message = computed(() => {
  if (props.error?.statusMessage) {
    return props.error.statusMessage
  }

  if (props.error?.statusCode === 404) {
    return "Looks like this dance floor doesn't exist. Let's get you back to the rhythm!"
  }

  return "Something went wrong while we were dancing. Let's try again!"
})
</script>

<template>
  <div class="min-h-screen bg-muted flex items-center justify-center px-4">
    <div class="text-center max-w-xl mx-auto">
      <div class="mb-8">
        <Icon
          name="ph:footprints"
          class="mx-auto h-24 w-24 text-accent animate-bounce"
        />
      </div>

      <h1 class="text-4xl font-bold text-foreground mb-4">Oops!</h1>

      <p class="text-lg text-muted-foreground mb-8">
        {{ message }}
      </p>

      <div class="space-x-4">
        <Button @click="handleGoHome" size="lg"> Back to Home </Button>
        <Button @click="router.back()" variant="secondary" size="lg">
          Go Back
        </Button>
      </div>
    </div>
  </div>
</template>
