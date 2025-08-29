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
    question:
      typeof faq?.question === 'string'
        ? faq.question
        : (faq?.question?.loc?.source ?? ''),
    answer:
      typeof faq?.answer === 'string'
        ? faq.answer
        : (faq?.answer?.loc?.source ?? ''),
  }))
})

const open = ref<Record<number, boolean>>({})

function toggle(index: number) {
  open.value[index] = !open.value[index]
}
</script>

<template>
  <div class="container py-6 space-y-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      {{ title }}
    </h2>
    <dl class="space-y-4">
      <div v-for="(faq, index) in faqs" :key="index" class="pt-2 px-2">
        <dt>
          <button
            type="button"
            class="flex w-full items-start justify-between text-left text-gray-900"
            :aria-expanded="!!open[index]"
            :aria-controls="`faq-panel-${index}`"
            :id="`faq-button-${index}`"
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
          </button>
        </dt>
        <dd
          v-show="open[index]"
          class="mt-3 pt-3 border-t"
          role="region"
          :id="`faq-panel-${index}`"
          :aria-labelledby="`faq-button-${index}`"
        >
          <div class="text-sm text-muted-foreground">
            {{ faq.answer || 'No answer available' }}
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>
