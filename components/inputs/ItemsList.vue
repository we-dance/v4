<script setup lang="ts">
import { cn } from '@/utils'

const props = defineProps<{
  items: any[]
  modelValue: any
  itemKey: string
  itemLabel: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()
</script>

<template>
  <ul class="max-h-60 overflow-auto">
    <li
      v-for="item in items"
      :key="item[itemKey]"
      @click="() => emit('update:modelValue', item)"
      class="flex items-start p-2 gap-2 cursor-pointer hover:bg-gray-100"
    >
      <Icon
        name="heroicons:check"
        :class="
          cn(
            'h-4 w-4 shrink-0',
            modelValue === item[itemKey] ? 'opacity-100' : 'opacity-0'
          )
        "
      />
      {{ item[itemLabel] }}
    </li>
  </ul>
</template>
