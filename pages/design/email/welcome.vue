<script setup lang="ts">
import WelcomeEmail from '@/components/email/WelcomeEmail.vue'

// Mock data for preview
const mockData = {
  firstName: 'John',
  dashboardUrl: '/dashboard',
  profileUrl: '/profile/edit',
  classesUrl: '/classes',
  supportEmail: 'support@wedance.com',
}
</script>

<template>
  <div class="min-h-screen bg-muted p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Email Preview -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <WelcomeEmail v-bind="mockData" />
      </div>
    </div>
  </div>
</template>
