<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 5,
  },
})

const modelValue = useVModel(props, 'modelValue')
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon
      v-for="i in max"
      :key="i"
      :name="modelValue >= i ? 'ph:star-fill' : 'ph:star'"
      class="w-8 h-8 text-orange-500 cursor-pointer"
      @click="modelValue = i"
    />
  </div>
</template>
