<script setup lang="ts">
import { WelcomeEmail } from '#components'

definePageMeta({
  layout: 'design',
})

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

const mockData = {
  firstName: 'John',
  dashboardUrl: '/dashboard',
  profileUrl: '/profile/edit',
  classesUrl: '/classes',
  supportEmail: 'support@wedance.com',
}
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-8">Welcome Email</h1>

    <div class="space-y-8">
      <section>
        <h2 class="text-2xl font-semibold mb-4">Overview</h2>
        <p class="text-muted-foreground mb-6">
          A personalized welcome email sent to new users after registration.
        </p>

        <!-- Live Preview -->
        <div class="border rounded-lg p-6 mb-8">
          <h3 class="text-lg font-medium mb-4">Preview</h3>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <WelcomeEmail v-bind="mockData" />
          </div>
        </div>

        <!-- Props Table -->
        <div class="border rounded-lg p-6">
          <h3 class="text-lg font-medium mb-4">Props</h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2 px-4">Name</th>
                  <th class="text-left py-2 px-4">Type</th>
                  <th class="text-left py-2 px-4">Required</th>
                  <th class="text-left py-2 px-4">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prop in props" :key="prop.name" class="border-b">
                  <td class="py-2 px-4 font-mono">{{ prop.name }}</td>
                  <td class="py-2 px-4 font-mono">{{ prop.type }}</td>
                  <td class="py-2 px-4">{{ prop.required ? 'Yes' : 'No' }}</td>
                  <td class="py-2 px-4 text-muted-foreground">
                    {{ prop.description }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
