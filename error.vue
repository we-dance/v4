<script setup lang="ts">
defineProps({
  error: Object,
})

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
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

      <h1 class="text-4xl font-bold text-foreground mb-4">
        {{ error?.statusCode === 404 ? 'Lost Your Dance Partner?' : 'Oops!' }}
      </h1>

      <p class="text-lg text-muted-foreground mb-8">
        {{
          error?.statusCode === 404
            ? "Looks like this dance floor doesn't exist. Let's get you back to the rhythm!"
            : "Something went wrong while we were dancing. Let's try again!"
        }}
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
