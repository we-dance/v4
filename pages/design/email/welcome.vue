<script setup lang="ts">
import WelcomeEmail from '@/components/email/WelcomeEmail.vue'

// Mock data for preview
const mockData = {
  firstName: 'John',
  dashboardUrl: '/dashboard',
  profileUrl: '/profile/edit',
  classesUrl: '/classes',
  supportEmail: 'support@wedance.com'
}
</script>

<template>
  <div class="min-h-screen bg-muted p-8">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h1 class="text-2xl font-bold mb-2">Welcome Email Template</h1>
        <p class="text-muted-foreground">
          A responsive email template for welcoming new users to WeDance
        </p>
      </div>

      <!-- Email Preview -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <WelcomeEmail v-bind="mockData" />
      </div>

      <!-- Template Info -->
      <div class="mt-8 space-y-4">
        <h2 class="text-lg font-semibold">Template Features</h2>
        <ul class="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Responsive design that works on all devices</li>
          <li>Uses WeDance design system components</li>
          <li>Clear call-to-action buttons</li>
          <li>Key features overview with icons</li>
          <li>Support section with contact information</li>
        </ul>

        <h2 class="text-lg font-semibold mt-6">Props</h2>
        <div class="bg-muted/50 p-4 rounded-lg">
          <pre class="text-sm overflow-x-auto">{{ JSON.stringify(mockData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template> 