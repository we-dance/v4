<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  position: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { $client } = useNuxtApp()
const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const isLoading = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (
    !formData.value.name ||
    !formData.value.email ||
    !formData.value.message
  ) {
    errorMessage.value = 'Please fill in all fields'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    await $client.applications.submitApplication.mutate({
      name: formData.value.name,
      email: formData.value.email,
      message: formData.value.message,
      position: props.position,
    })

    isSubmitted.value = true
  } catch (error) {
    console.error('Error submitting application:', error)
    errorMessage.value =
      error instanceof Error ? error.message : 'Failed to submit application'
  } finally {
    isLoading.value = false
  }
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div>
    <DialogHeader>
      <DialogTitle v-if="!isSubmitted">Apply to {{ position }}</DialogTitle>
      <DialogTitle v-else>Application Submitted!</DialogTitle>
      <DialogDescription v-if="!isSubmitted">
        Share your interest in this position
      </DialogDescription>
    </DialogHeader>

    <!-- Success State -->
    <div v-if="isSubmitted" class="space-y-4 py-8 text-center">
      <div class="flex justify-center mb-4">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <p class="text-lg font-semibold">Thank you for applying!</p>
      <p class="text-muted-foreground">
        We've received your application for the {{ position }} position. Our
        team will review it and get back to you soon.
      </p>
      <p class="text-sm text-muted-foreground">
        A confirmation email has been sent to {{ formData.email }}
      </p>
      <Button @click="handleClose" class="mt-6">Close</Button>
    </div>

    <!-- Form State -->
    <div v-else class="space-y-4 py-4">
      <div
        v-if="errorMessage"
        class="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm"
      >
        {{ errorMessage }}
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Full Name *</label>
        <Input
          v-model="formData.name"
          placeholder="John Doe"
          type="text"
          :disabled="isLoading"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Email Address *</label>
        <Input
          v-model="formData.email"
          placeholder="john@example.com"
          type="email"
          :disabled="isLoading"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Message *</label>
        <Textarea
          v-model="formData.message"
          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
          :disabled="isLoading"
          class="min-h-32"
        />
      </div>

      <div class="flex gap-2 pt-4">
        <Button @click="handleSubmit" :disabled="isLoading" class="flex-1">
          <span v-if="isLoading" class="flex items-center gap-2">
            <span class="animate-spin">⏳</span>
            Submitting...
          </span>
          <span v-else>Submit Application</span>
        </Button>
        <Button @click="handleClose" variant="outline" :disabled="isLoading">
          Cancel
        </Button>
      </div>
    </div>
  </div>
</template>
