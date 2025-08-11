<template>
  <div class="container py-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      {{ title }}
    </h2>
    <div class="space-y-4">
      <div v-for="faq in faqs" :key="faq.question" class="pt-2 px-2">
        <dt>
          <div
            class="flex w-full items-start justify-between text-left text-gray-900 cursor-pointer"
            @click="toggle(faq.question)"
          >
            <span class="font-medium text-sm pr-4">{{ faq.question }}</span>
            <div class="flex-shrink-0">
              <Icon
                v-if="!open[faq.question]"
                name="heroicons:plus"
                class="h-6 w-6"
                aria-hidden="true"
              />
              <Icon
                v-else
                name="heroicons:minus"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </div>
          </div>
        </dt>
        <div v-show="open[faq.question]" class="mt-3 pt-3 border-t">
          <TPreview
            :content="faq.answer"
            class="text-sm text-muted-foreground"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = ref('FAQs')
const faqs = ref([
  {
    question: 'How can I find my Facebook Calendar URL?',
    answer:
      'Open on your laptop https://www.facebook.com/events/calendar. Right-click on "Add to Calendar" and select "Copy link address" to get your Facebook Calendar URL.',
  },
  {
    question: 'Which calendars are supported?',
    answer:
      'We support calendars that use the iCal format. This includes most popular calendar services like Google Calendar, Apple Calendar, Facebook Events, Teamup, and others. If your calendar supports iCal, you can sync it with WeDance.',
  },
])

const open = ref<Record<string, boolean>>({})

function toggle(question: string) {
  open.value[question] = !open.value[question]
}
</script>
