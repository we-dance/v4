<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  title: string
}>()
const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen" class="space-y-2">
    <CollapsibleTrigger
      :class="
        cn(
          'flex w-full items-center justify-between rounded-lg border bg-card p-4 text-sm font-medium transition-all hover:bg-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'data-[state=open]:bg-muted'
        )
      "
    >
      <span>{{ props.title }}</span>
      <ChevronRight
        class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
        :class="{ 'rotate-90': isOpen }"
      />
    </CollapsibleTrigger>
    <CollapsibleContent class="pt-1">
      <div class="rounded-lg border bg-card p-4">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
