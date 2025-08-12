<template>
  <div class="container py-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      {{ title }}
    </h2>
    <div class="space-y-4">
      <div v-for="(faq, index) in faqs" :key="index" class="pt-2 px-2">
        <dt>
          <div
            class="flex w-full items-start justify-between text-left text-gray-900 cursor-pointer"
            @click="toggle(index)"
          >
            <span class="font-medium text-sm pr-4">{{ faq.question }}</span>
            <div class="flex-shrink-0">
              <Icon
                v-if="!open[index]"
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
        <div v-show="open[index]" class="mt-3 pt-3 border-t">
          <div class="text-sm text-muted-foreground">
            {{ faq.answer || 'No answer avalibale' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { tm } = useI18n()

interface FaqItem {
  question: string
  answer: string
}

const title = ref('FAQs')

const faqs = computed((): FaqItem[] => {
  const result = tm('faqs.calendars') as any[]

  if (!Array.isArray(result)) return []

  return result.map((faq: any) => ({
    question: faq.question?.loc?.source,
    answer: faq.answer?.loc?.source,
  }))
})

const open = ref<Record<number, boolean>>({})

function toggle(index: number) {
  open.value[index] = !open.value[index]
}
</script>
