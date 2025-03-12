<script setup>
import { ref } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(["update:modelValue"]);

const results = ref([
  {
    placeId: "1",
    label: "New York",
  },
  {
    placeId: "2",
    label: "Los Angeles",
  },
]);
</script>

<template>
  <div class="flex flex-col gap-2">
    <button
      v-for="result in results"
      :key="result.placeId"
      class="border"
      :class="{ 'font-bold': modelValue?.placeId === result.placeId }"
      @click="emits('update:modelValue', result)"
    >
      {{ result.label }}
    </button>
  </div>
</template>
