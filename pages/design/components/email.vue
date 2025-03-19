<script setup lang="ts">
definePageMeta({
  layout: 'design',
})

import WelcomeEmail from '@/components/email/WelcomeEmail.vue'

// Mock data for preview
const mockData = {
  firstName: 'John',
  dashboardUrl: '/dashboard',
  profileUrl: '/profile/edit',
  classesUrl: '/classes',
  supportEmail: 'support@wedance.com',
}

// Props documentation
const props = [
  {
    name: 'firstName',
    type: 'string',
    required: true,
    description: "User's first name for personalization",
  },
  {
    name: 'dashboardUrl',
    type: 'string',
    required: true,
    description: "URL to the user's dashboard",
  },
  {
    name: 'profileUrl',
    type: 'string',
    required: true,
    description: "URL to edit user's profile",
  },
  {
    name: 'classesUrl',
    type: 'string',
    required: true,
    description: 'URL to browse dance classes',
  },
  {
    name: 'supportEmail',
    type: 'string',
    required: true,
    description: 'Support email address for contact',
  },
]
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-16">
      <h1 class="text-4xl font-bold mb-4">Email Templates</h1>
      <p class="text-xl text-muted-foreground">
        Email templates for WeDance platform communications
      </p>
    </div>

    <div class="space-y-16">
      <!-- Welcome Email -->
      <section>
        <div class="mb-8">
          <h2 class="text-2xl font-semibold mb-2">Welcome Email</h2>
          <p class="text-muted-foreground">
            Sent to new users after registration to welcome them to the platform
          </p>
        </div>

        <div class="space-y-8">
          <!-- Preview -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <WelcomeEmail v-bind="mockData" />
          </div>

          <!-- Props -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Props</h3>
            <div class="rounded-md border">
              <table class="w-full">
                <thead>
                  <tr class="border-b bg-muted/50">
                    <th class="h-12 px-4 text-left align-middle font-medium">
                      Name
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium">
                      Type
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium">
                      Required
                    </th>
                    <th class="h-12 px-4 text-left align-middle font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="prop in props" :key="prop.name" class="border-b">
                    <td class="p-4 align-middle font-mono text-sm">
                      {{ prop.name }}
                    </td>
                    <td class="p-4 align-middle font-mono text-sm">
                      {{ prop.type }}
                    </td>
                    <td class="p-4 align-middle text-sm">
                      {{ prop.required ? 'Yes' : 'No' }}
                    </td>
                    <td class="p-4 align-middle text-sm text-muted-foreground">
                      {{ prop.description }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Features -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Features</h3>
            <ul class="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Responsive design that works on all email clients</li>
              <li>Uses WeDance design system components</li>
              <li>Clear call-to-action buttons</li>
              <li>Key features overview with icons</li>
              <li>Support section with contact information</li>
            </ul>
          </div>

          <!-- Usage -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Usage</h3>
            <div class="bg-muted/50 p-4 rounded-lg">
              <pre class="text-sm overflow-x-auto"><code>&lt;WelcomeEmail
  firstName="John"
  dashboardUrl="/dashboard"
  profileUrl="/profile/edit"
  classesUrl="/classes"
  supportEmail="support@wedance.com"
/&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
