<script setup lang="ts">
import { z } from 'zod'
import { formatDate } from '~/utils/format'
import { useRegistration } from '~/composables/useRegistration'
import { useStripeCheckout } from '~/composables/useStripeCheckout'
import { useAppAuth } from '~/composables/useAppAuth'

const { redirectToCheckout } = useStripeCheckout()
const { checkEmail, createAccount, login, isLoading, error } = useRegistration()
const { user } = useAppAuth()

const { $client } = useNuxtApp()
const route = useRoute()
const slug = z.string().parse(route.params.slug)
// offerId
const offer = z.string().parse(route.query.offer)
// find course
const course = await $client.courses.view.query({ slug })
const checkoutState = ref<'email' | 'login' | 'register'>('email')

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  userType: 'dancer',
  terms: false,
})

const handleEmailCheck = async () => {
  if (!formData.email) return
  // was mock Promise
  const exists = await checkEmail(formData.email)
  checkoutState.value = exists ? 'login' : 'register'
  console.log(`checkout state: ${checkoutState.value}`)
}

const handleSubmit = async () => {
  if (!course?.id || !course?.name || !offer) {
    console.error('Missing course or offer information')
    return
  }

  try {
    let success = false

    if (checkoutState.value === 'login') {
      success = await login(formData.email, formData.password)
    } else {
      success = await createAccount(formData)
    }

    if (success) {
      const stripeUrl = await redirectToCheckout({
        courseId: course.id,
        courseName: course.name,
        offeringId: offer,
      })

      if (stripeUrl) {
        window.location.href = stripeUrl
      } else {
        console.error('Stripe checkout URL not found')
      }
    }
  } catch (e) {
    console.error('Checkout failed:', e)
  }
}
</script>

<template>
  <div v-if="course" class="min-h-screen bg-muted py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold">Checkout</h1>
          <p class="text-muted-foreground mt-2">Start your learning journey</p>
        </div>

        <div class="bg-background rounded-xl border p-6">
          <div class="flex gap-6">
            <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                :src="course.coverUrl || '/images/placeholder.jpg'"
                :alt="course.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 class="text-xl font-bold">{{ course.name }}</h2>
              <div class="text-muted-foreground mt-2">
                <div class="flex items-center gap-2">
                  <Icon name="ph:user" class="w-4 h-4" />
                  <span>Instructor: {{ course.instructor.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          @submit.prevent="
            checkoutState === 'email' ? handleEmailCheck() : handleSubmit()
          "
          class="bg-background rounded-xl border p-6"
        >
          <div class="space-y-6">
            <div v-if="checkoutState === 'email'">
              <label class="block text-sm font-medium text-foreground mb-2"
                >Email</label
              >
              <input
                v-model="formData.email"
                type="email"
                required
                class="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your email to continue"
              />
              <div class="mt-6">
                <Button type="submit" :disabled="isLoading" class="w-full">
                  <template v-if="isLoading">Checking...</template>
                  <template v-else>Continue</template>
                </Button>
              </div>
            </div>

            <div v-else-if="checkoutState === 'login'" class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Welcome back! Please log in to continue.
              </p>
              <label class="block text-sm font-medium text-foreground mb-2"
                >Password</label
              >
              <input
                v-model="formData.password"
                type="password"
                required
                class="w-full px-4 py-2 border rounded-lg"
              />
              <Button type="submit" :disabled="isLoading" class="w-full">
                <template v-if="isLoading">Logging in...</template>
                <template v-else>Log in</template>
              </Button>
            </div>

            <div v-else-if="checkoutState === 'register'" class="space-y-6">
              <p class="text-sm text-muted-foreground">
                Create your account to join our dance community
              </p>
              <UserTypeSelect v-model="formData.userType" />
              <NameFields
                v-model:firstName="formData.firstName"
                v-model:lastName="formData.lastName"
              />
              <label class="block text-sm font-medium text-foreground mb-2"
                >Phone</label
              >
              <input
                v-model="formData.phone"
                type="tel"
                required
                class="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your phone number"
              />
              <label class="block text-sm font-medium text-foreground mb-2"
                >Password</label
              >
              <input
                v-model="formData.password"
                type="password"
                required
                class="w-full px-4 py-2 border rounded-lg"
                placeholder="Create a password"
              />
              <TermsCheckbox v-model="formData.terms" />
              <div v-if="error" class="text-destructive text-sm">
                {{ error }}
              </div>
              <Button type="submit" :disabled="isLoading" class="w-full">
                <template v-if="isLoading">Processing...</template>
                <template v-else>Complete Booking</template>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <Icon
        name="ph:video-camera-slash"
        class="w-16 h-16 text-muted-foreground mx-auto mb-4"
      />
      <h2 class="text-2xl font-bold text-foreground mb-2">Course Not Found</h2>
      <p class="text-muted-foreground mb-6">
        The course you're looking for doesn't exist or has been removed.
      </p>
      <Button as-child>
        <NuxtLink to="/courses">Browse Courses</NuxtLink>
      </Button>
    </div>
  </div>
</template>
