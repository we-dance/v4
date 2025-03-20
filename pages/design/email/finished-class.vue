<script setup lang="ts">
import { ref } from 'vue'
import { generateClassFinishedEmail } from '~/server/utils/email/templates/classFinished'

interface SimilarClass {
  id: string
  name: string
  description?: string
}

// Sample data for preview
const sampleData = {
  firstName: 'John',
  className: 'Salsa Fundamentals',
  classDate: new Date().toLocaleDateString(),
  classTime: '19:00 - 20:30',
  instructorName: 'Maria Rodriguez',
  feedbackUrl: '/events/sample-id/feedback?userId=sample-user-id',
  similarClasses: [
    {
      id: 'class-1',
      name: 'Bachata Basics',
      description: 'Learn the fundamentals of Bachata dancing'
    },
    {
      id: 'class-2',
      name: 'Intermediate Salsa',
      description: 'Take your Salsa skills to the next level'
    }
  ],
  unsubscribeUrl: '/settings/notifications'
}

const email = generateClassFinishedEmail(sampleData)

const props = [
  {
    name: 'firstName',
    type: 'string',
    required: true,
    description: 'Attendee\'s first name for personalization'
  },
  {
    name: 'className',
    type: 'string',
    required: true,
    description: 'Name of the completed class'
  },
  {
    name: 'classDate',
    type: 'string',
    required: true,
    description: 'Date when the class took place'
  },
  {
    name: 'classTime',
    type: 'string',
    required: true,
    description: 'Time when the class took place'
  },
  {
    name: 'instructorName',
    type: 'string',
    required: true,
    description: 'Name of the class instructor'
  },
  {
    name: 'feedbackUrl',
    type: 'string',
    required: true,
    description: 'URL to the feedback form'
  },
  {
    name: 'similarClasses',
    type: 'SimilarClass[]',
    required: false,
    description: 'List of upcoming similar classes'
  },
  {
    name: 'unsubscribeUrl',
    type: 'string',
    required: true,
    description: 'URL to unsubscribe from notifications'
  }
]
</script>

<template>
  <div class="container mx-auto p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <NuxtLink to="/design" class="text-primary hover:underline">← Back to Design System</NuxtLink>
        <h1 class="text-2xl font-semibold">Finished Class Email</h1>
      </div>

      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4">Overview</h2>
        <p class="text-gray-600">
          A personalized email sent to attendees after a dance class to collect feedback and suggest similar upcoming classes.
        </p>
      </section>

      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4">Preview</h2>
        <div class="border rounded-lg overflow-hidden">
          <div class="bg-gray-50 border-b px-4 py-2 flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div class="p-8 bg-white">
            <div class="mb-8 text-center">
              <img src="https://wedance.vip/logo.svg" alt="WeDance Logo" class="h-8 mx-auto" />
            </div>
            <div v-html="email.html"></div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-xl font-semibold mb-4">Props</h2>
        <div class="border rounded-lg overflow-hidden">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50 border-b">
                <th class="py-2 px-4 text-left font-medium">Name</th>
                <th class="py-2 px-4 text-left font-medium">Type</th>
                <th class="py-2 px-4 text-left font-medium">Required</th>
                <th class="py-2 px-4 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in props" :key="prop.name" class="border-b last:border-0">
                <td class="py-2 px-4">{{ prop.name }}</td>
                <td class="py-2 px-4 font-mono text-sm">{{ prop.type }}</td>
                <td class="py-2 px-4">{{ prop.required ? 'Yes' : 'No' }}</td>
                <td class="py-2 px-4">{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template> 