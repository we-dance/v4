<script setup lang="ts">
import { ref } from 'vue'

const mockData = ref({
  firstName: 'Maria',
  className: 'Salsa Fundamentals',
  date: 'March 25, 2024',
  time: '19:00 - 20:30',
  location: 'Dance Studio XYZ, Hauptstraße 123, Munich',
  instructorName: 'Carlos Rodriguez',
  zoomLink: '',
  supportEmail: 'support@wedance.vip',
  websiteUrl: 'https://wedance.vip',
})

const isOnline = ref(false)

const toggleOnline = () => {
  isOnline.value = !isOnline.value
  if (isOnline.value) {
    mockData.value.zoomLink = 'https://zoom.us/j/123456789'
    mockData.value.location = 'Online via Zoom'
  } else {
    mockData.value.zoomLink = ''
    mockData.value.location = 'Dance Studio XYZ, Hauptstraße 123, Munich'
  }
}
</script>

<template>
  <div class="container py-8 space-y-8">
    <div>
      <h1 class="text-3xl font-bold mb-4">Class Reminder Email Template</h1>
      <p class="text-muted-foreground mb-6">
        This page showcases the email template used for class reminders. Toggle
        between online and in-person class scenarios.
      </p>

      <div class="flex items-center gap-2 mb-8">
        <Switch :checked="isOnline" @update:checked="toggleOnline" />
        <Label>Online Class</Label>
      </div>
    </div>

    <!-- Email Preview -->
    <div class="border rounded-lg overflow-hidden max-w-[600px] mx-auto">
      <div class="bg-muted p-4 border-b">
        <div class="text-sm text-muted-foreground">
          From: WeDance &lt;noreply@wedance.vip&gt;
        </div>
        <div class="text-sm text-muted-foreground">
          To: {{ mockData.firstName }} &lt;student@example.com&gt;
        </div>
        <div class="font-medium">
          Subject: Reminder: Your {{ mockData.className }} Starts Soon!
        </div>
      </div>

      <!-- Email Content -->
      <div class="bg-background">
        <div
          style="
            font-family:
              -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
          "
        >
          <div style="text-align: center; margin-bottom: 30px">
            <img
              src="https://wedance.vip/images/logo.png"
              alt="WeDance Logo"
              style="max-width: 150px; margin-bottom: 20px"
            />
          </div>

          <div
            style="
              background: #f9f9f9;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            "
          >
            <p style="margin-bottom: 20px">Dear {{ mockData.firstName }},</p>

            <p style="margin-bottom: 20px">
              Your upcoming dance class is just around the corner! We can't wait
              to see you on the dance floor. Here are the details of your class:
            </p>

            <div
              style="
                background: white;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
              "
            >
              <p style="margin: 10px 0">
                <span style="font-size: 18px">📅</span>
                <strong>Date & Time:</strong> {{ mockData.date }} at
                {{ mockData.time }}
              </p>
              <p style="margin: 10px 0">
                <span style="font-size: 18px">👨‍🏫</span>
                <strong>Instructor:</strong> {{ mockData.instructorName }}
              </p>
              <p style="margin: 10px 0">
                <span style="font-size: 18px">📍</span>
                <strong>Location:</strong> {{ mockData.location }}
              </p>
            </div>

            <p style="text-align: center; font-size: 20px; margin: 20px 0">
              ✨ Get Ready to Dance! ✨
            </p>

            <div style="text-align: center; margin: 30px 0">
              <a
                :href="isOnline ? mockData.zoomLink : '#'"
                style="
                  display: inline-block;
                  background-color: #f1023d;
                  color: white;
                  text-decoration: none;
                  padding: 12px 24px;
                  border-radius: 6px;
                  margin: 0 10px;
                  font-weight: bold;
                "
              >
                ➡️ {{ isOnline ? 'Join Class Now' : 'View Class Details' }}
              </a>
              <a
                href="#"
                style="
                  display: inline-block;
                  background-color: #4a5568;
                  color: white;
                  text-decoration: none;
                  padding: 12px 24px;
                  border-radius: 6px;
                  margin: 0 10px;
                  font-weight: bold;
                "
              >
                🔄 Reschedule Class
              </a>
            </div>

            <p style="margin: 20px 0">
              If you have any questions, feel free to reach out to our support
              team. We're always happy to help!
            </p>

            <div style="margin-top: 30px">
              <p style="margin: 5px 0">💃 Keep Dancing,</p>
              <p style="margin: 5px 0">The WeDance Team</p>
            </div>
          </div>

          <div
            style="
              text-align: center;
              border-top: 1px solid #eee;
              padding-top: 20px;
              margin-top: 20px;
              color: #666;
            "
          >
            <p style="margin: 10px 0">
              📧 Contact Support:
              <a
                :href="'mailto:' + mockData.supportEmail"
                style="color: #f1023d; text-decoration: none"
              >
                {{ mockData.supportEmail }}
              </a>
            </p>
            <p style="margin: 10px 0">
              🌐 Visit Us:
              <a
                :href="mockData.websiteUrl"
                style="color: #f1023d; text-decoration: none"
              >
                {{ mockData.websiteUrl }}
              </a>
            </p>
            <p style="margin-top: 20px; font-size: 12px">
              © {{ new Date().getFullYear() }} WeDance. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Email Data Editor -->
    <div class="border rounded-lg p-6 max-w-[600px] mx-auto mt-8">
      <h2 class="text-xl font-semibold mb-4">Edit Email Data</h2>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" :name="'firstName'">
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input v-model="mockData.firstName" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="'className'">
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input v-model="mockData.className" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="'date'">
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input v-model="mockData.date" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="'time'">
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input v-model="mockData.time" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="'location'">
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input v-model="mockData.location" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" :name="'instructorName'">
            <FormItem>
              <FormLabel>Instructor Name</FormLabel>
              <FormControl>
                <Input v-model="mockData.instructorName" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField
            v-if="isOnline"
            v-slot="{ componentField }"
            :name="'zoomLink'"
            class="md:col-span-2"
          >
            <FormItem>
              <FormLabel>Zoom Link</FormLabel>
              <FormControl>
                <Input v-model="mockData.zoomLink" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            :name="'supportEmail'"
            class="md:col-span-2"
          >
            <FormItem>
              <FormLabel>Support Email</FormLabel>
              <FormControl>
                <Input v-model="mockData.supportEmail" />
              </FormControl>
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            :name="'websiteUrl'"
            class="md:col-span-2"
          >
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input v-model="mockData.websiteUrl" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>
    </div>
  </div>
</template>
